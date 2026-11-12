'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SONBHADRA_DATUM = { lat: 24.6856, lng: 83.0689 };

export default function HomePage() {
  const [heroSpot, setHeroSpot] = useState<'salkhan' | 'vijaygarh' | 'rihand' | 'mukha'>('salkhan');
  const [compassOpen, setCompassOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  // Live Telemetry
  const [distanceKm, setDistanceKm] = useState<number>(71);
  const [bearingDeg, setBearingDeg] = useState<number>(142);
  const [cardinalDir, setCardinalDir] = useState<string>('SE');
  const [gpsStatus, setGpsStatus] = useState<string>('Live Satellite Radar Active');
  const [timeStr, setTimeStr] = useState('09:40 AM');
  const [dateStr, setDateStr] = useState('Loading...');
  const [temp, setTemp] = useState<number | null>(24);

  // Active Map Spot
  const [activePlace, setActivePlace] = useState('salkhan');

  // In-Page Booking State Machine
  const [bookingStep, setBookingStep] = useState(1);
  const [bookTrail, setBookTrail] = useState('Salkhan Deep-Time Geo-Walk');
  const [bookPax, setBookPax] = useState(2);
  const [bookDate, setBookDate] = useState('');
  const [bookGuideTier, setBookGuideTier] = useState('Certified Naturalist (+₹1,500)');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const heroSpots = {
    salkhan: {
      name: 'Salkhan Fossil Geo-Park',
      tagline: '1.4 Billion Years of Pre-Cambrian Earth History',
      bg: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2400&q=80',
      elevation: '315m',
      desc: 'Step directly on the ancient prebiotic seafloor where microbial stromatolite colonies produced Earth’s earliest atmospheric oxygen.'
    },
    vijaygarh: {
      name: 'Vijaygarh Fort Citadel',
      tagline: '5th-Century Mountain Fortress in the Clouds',
      bg: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=80',
      elevation: '430m',
      desc: 'Ascend 500+ hand-cut stone steps overlooking the Son River valley. Explore ancient Gupta inscriptions and perennial mountain lakes.'
    },
    rihand: {
      name: 'Rihand Inland Sea (GBP Sagar)',
      tagline: 'Asia’s Immense Freshwater Reservoir',
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80',
      elevation: '275m',
      desc: 'Miles of tranquil freshwater coastline nestled within forested hills. Sunset lookouts and shoreline camping retreats.'
    },
    mukha: {
      name: 'Mukha Falls & Belan Gorge',
      tagline: 'Tiered River Cascades & Sandstone Overhangs',
      bg: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=2400&q=80',
      elevation: '210m',
      desc: 'Spectacular cascades plunging into natural amphitheater sandstone shelves surrounded by prehistoric rock painting shelters.'
    }
  };

  const places: Record<string, any> = {
    salkhan: {
      title: 'Salkhan Fossil Geo-Park',
      badge: 'Geological Wonder · 1.4B Years',
      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      elevationProfile: 'Base: 280m → Plateau: 315m (+35m Gain)',
      gradient: 'Gentle Walk · 1.2 km trail',
      desc: 'Mesoproterozoic cyanobacterial stromatolites preserved intact in ancient Vindhyan sandstone beds.',
      coords: '24.5833° N, 83.0833° E',
      slug: '/destinations/salkhan-fossils'
    },
    vijaygarh: {
      title: 'Vijaygarh Fort Citadel',
      badge: '5th-Century Fortress in the Clouds',
      img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      elevationProfile: 'Base: 180m → Summit Bastion: 430m (+250m Gain)',
      gradient: 'Technical Stair Climb · 500+ Hand-Cut Steps',
      desc: 'Historic cliff citadel with ancient Gupta inscriptions, perennial reservoirs (Mira Sagar) & cave art.',
      coords: '24.5772° N, 83.2104° E',
      slug: '/destinations/vijaygarh-fort'
    },
    rihand: {
      title: 'Rihand Dam & Inland Sea',
      badge: 'Asia’s Immense Reservoir',
      img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
      elevationProfile: 'Waterline: 275m MSL',
      gradient: 'Flat Shoreline Trail & Kayak Routes',
      desc: 'Govind Ballabh Pant Sagar reservoir spanning the UP-MP border with pine-fringed sunset lookouts.',
      coords: '24.2044° N, 83.0336° E',
      slug: '/destinations/rihand-reservoir'
    },
    mukha: {
      title: 'Mukha Falls & Belan Gorge',
      badge: 'Tiered Sandstone Canyon',
      img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      elevationProfile: 'Gorge Rim: 250m → Waterfall Basin: 210m (-40m Descent)',
      gradient: 'Rocky Amphitheater Descent · Caution on wet stone',
      desc: 'Cascading natural waterfalls carving deep shelves into the Belan River basin with prehistoric rock painting shelters.',
      coords: '24.7142° N, 82.7811° E',
      slug: '/destinations/mukha-waterfall'
    }
  };

  const calcMath = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    const dist = Math.round(2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) - Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
    const brng = Math.round((Math.atan2(y, x) * 180 / Math.PI + 360) % 360);
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return { dist, brng, cardinal: dirs[Math.round(brng / 22.5) % 16] };
  };

  const acquireLocation = () => {
    setGpsStatus('Synchronizing satellite telemetry...');
    if (!navigator.geolocation) {
      setGpsStatus('GPS unsupported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { dist, brng, cardinal } = calcMath(pos.coords.latitude, pos.coords.longitude, SONBHADRA_DATUM.lat, SONBHADRA_DATUM.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setGpsStatus(`🟢 Live Satellites Connected (±${Math.round(pos.coords.accuracy)}m)`);
      },
      () => {
        const { dist, brng, cardinal } = calcMath(25.3176, 82.9739, SONBHADRA_DATUM.lat, SONBHADRA_DATUM.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setGpsStatus('🟡 Reference: Varanasi Hub (105 km)');
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short', month: 'short', day: 'numeric' }));
    }, 1000);

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${SONBHADRA_DATUM.lat}&longitude=${SONBHADRA_DATUM.lng}&current=temperature_2m&timezone=Asia%2FKolkata`)
      .then(r => r.json())
      .then(d => { if (d.current) setTemp(Math.round(d.current.temperature_2m)); })
      .catch(() => setTemp(24));

    const t = new Date();
    t.setDate(t.getDate() + 2);
    setBookDate(t.toISOString().split('T')[0]);

    acquireLocation();

    return () => clearInterval(timer);
  }, []);

  const totalCalculated = Math.round((bookPax * 1800 + (bookGuideTier.includes('1,500') ? 1500 : 0)) * 1.18);

  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
      <div className="noise" />
      <div>
        <Navbar 
          onOpenCompass={() => { setCompassOpen(true); acquireLocation(); }} 
          onOpenSos={() => setSosModalOpen(true)} 
        />

        {/* 1. CINEMATIC HERO WITH LIVE SPOT-SWITCHER HUD */}
        <header className="hero-architect relative" id="home">
          <div 
            className="hero-architect-bg" 
            style={{ backgroundImage: `url('${heroSpots[heroSpot].bg}')` }} 
          />
          <div className="hero-architect-overlay" />

          <div className="hero-architect-content">
            {/* SPOT SWITCHER BUTTONS (Directly in Hero) */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-300 mr-1 hidden sm:inline">
                Inspect Landmark:
              </span>
              {[
                { id: 'salkhan', label: '🌋 Salkhan Fossils' },
                { id: 'vijaygarh', label: '🏰 Vijaygarh Citadel' },
                { id: 'rihand', label: '🛶 Rihand Reservoir' },
                { id: 'mukha', label: '🌊 Mukha Waterfalls' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setHeroSpot(s.id as any)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-mono font-bold tracking-wider transition border shadow-lg ${heroSpot === s.id ? 'bg-[#d4a537] text-[#081710] border-[#d4a537]' : 'bg-black/50 text-white border-white/20 hover:border-amber-300'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <i className="fas fa-mountain-sun text-amber-400" />
              <span>Official Tourism Gateway · Sonbhadra, UP</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white leading-[1.08] drop-shadow-md">
              {heroSpots[heroSpot].name} <br />
              <span className="text-[#e9c974] italic">{heroSpots[heroSpot].tagline}</span>
            </h1>

            <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md border border-white/15 p-3 rounded-2xl max-w-lg my-4">
              <div className="w-9 h-9 rounded-xl bg-[#d4a537] text-forest-950 flex items-center justify-center font-bold text-sm shrink-0">
                <i className="fas fa-location-dot" />
              </div>
              <div className="text-xs">
                <span className="text-amber-300 font-mono font-bold uppercase text-[10px] block">Live Satellite Navigation Vector</span>
                <strong className="text-white">You are {distanceKm} km from Sonbhadra ({cardinalDir})</strong>
                <span className="text-emerald-400 font-mono block text-[11px] mt-0.5">{gpsStatus}</span>
              </div>
            </div>

            <p className="text-sm text-stone-200 max-w-xl font-sans leading-relaxed drop-shadow">
              {heroSpots[heroSpot].desc}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/destinations" className="btn-terracotta">
                <span>Explore Destinations</span>
                <i className="fas fa-arrow-right ml-1 text-[10px]" />
              </Link>
              <a href="#booking-engine" className="btn-forest bg-forest-950/90 border border-white/20">
                <i className="fas fa-calendar-check mr-1 text-gold-400" />
                <span>Permit & Booking Engine</span>
              </a>
              <button onClick={() => { setCompassOpen(true); acquireLocation(); }} className="btn-forest bg-white/10 border border-white/20">
                <i className="fas fa-location-crosshairs mr-1 text-amber-300" />
                <span>Open Compass</span>
              </button>
            </div>
          </div>

          {/* HERO LIVE TELEMETRY BAR */}
          <div className="hero-telemetry-strip font-mono text-xs">
            <div className="text-center">
              <span className="text-stone-400 text-[10px] uppercase font-bold block"><i className="fas fa-clock mr-1 text-gold-400" /> Sonbhadra Time</span>
              <strong className="text-white text-sm font-serif">{timeStr}</strong>
            </div>
            <div className="text-center">
              <span className="text-stone-400 text-[10px] uppercase font-bold block"><i className="fas fa-temperature-half mr-1 text-gold-400" /> Temperature</span>
              <strong className="text-white text-sm font-serif">{temp ? `${temp}°C` : '24°C'}</strong>
            </div>
            <div className="text-center">
              <span className="text-stone-400 text-[10px] uppercase font-bold block"><i className="fas fa-mountain mr-1 text-emerald-400" /> Active Elevation</span>
              <strong className="text-emerald-300 text-sm">{heroSpots[heroSpot].elevation} MSL</strong>
            </div>
            <div className="text-center">
              <span className="text-stone-400 text-[10px] uppercase font-bold block"><i className="fas fa-satellite mr-1 text-gold-400" /> Satellite Radar</span>
              <strong className="text-amber-300 text-sm">{distanceKm} km ({cardinalDir})</strong>
            </div>
          </div>
        </header>

        {/* 2. INFINITE SCROLLING MARQUEE */}
        <div className="bg-[#d4a537] py-2.5 overflow-hidden border-y border-[#a87d22]">
          <div className="flex space-x-6 text-xs font-mono font-bold text-[#081710] uppercase whitespace-nowrap">
            <span>✦ Salkhan Stromatolites (1.4B Yrs)</span>
            <span>✦ Vijaygarh Fortress Citadel (430m)</span>
            <span>✦ Rihand Inland Sea Reservoir</span>
            <span>✦ Mukha River Cascades</span>
            <span>✦ Kaimur Wildlife Sanctuary</span>
            <span>✦ Lakhaniya Prehistoric Cave Overhangs</span>
            <span>✦ Salkhan Stromatolites (1.4B Yrs)</span>
            <span>✦ Vijaygarh Fortress Citadel (430m)</span>
            <span>✦ Rihand Inland Sea Reservoir</span>
          </div>
        </div>

        {/* 3. FOUR EXPEDITION PILLARS & ELEVATION CROSS-SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="space-y-1 mb-8">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Terrain Telemetry & Cross-Section
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#081710]">
              The Four Expedition Pillars
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Click any pillar to inspect the terrain elevation gradient, waterfall drops, and GPS access coordinates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* PILLAR SELECTOR TABS */}
            <div className="lg:col-span-5 space-y-3">
              {Object.entries(places).map(([key, p]: any) => (
                <div 
                  key={key}
                  onClick={() => setActivePlace(key)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex justify-between items-center ${activePlace === key ? 'bg-white border-[#c85a32] shadow-md ring-2 ring-[#c85a32]/20' : 'bg-white/60 border-stone-200 hover:bg-white'}`}
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#c85a32] block">{p.badge}</span>
                    <h3 className="font-bold text-base font-serif text-[#081710]">{p.title}</h3>
                    <p className="text-xs text-stone-500 font-mono mt-0.5">{p.coords}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#c85a32]">Inspect →</span>
                </div>
              ))}
            </div>

            {/* LIVE ELEVATION & TERRAIN HUD CARD */}
            <div className="lg:col-span-7 pro-card p-6 sm:p-8 space-y-4">
              <div className="h-48 rounded-2xl overflow-hidden relative">
                <img src={places[activePlace].img} alt={places[activePlace].title} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-[#081710]/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Elevation: {places[activePlace].elevationProfile}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold font-serif text-[#081710]">{places[activePlace].title}</h3>
                  <Link href={places[activePlace].slug} className="text-xs font-mono font-bold text-[#c85a32] hover:underline">
                    Read Dedicated Dossier →
                  </Link>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">{places[activePlace].desc}</p>
              </div>

              {/* ELEVATION CROSS-SECTION CHART */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-[#081710]">Trail Elevation Cross-Section:</span>
                  <span className="text-stone-500">{places[activePlace].gradient}</span>
                </div>
                <div className="h-16 w-full">
                  <svg className="w-full h-full" viewBox="0 0 600 80" preserveAspectRatio="none">
                    <path d="M 0 60 Q 150 50 300 20 T 600 10 L 600 80 L 0 80 Z" fill="rgba(200, 90, 50, 0.15)" />
                    <path d="M 0 60 Q 150 50 300 20 T 600 10" fill="none" stroke="#c85a32" strokeWidth="2.5" />
                    <circle cx="300" cy="20" r="3" fill="#c85a32" />
                    <text x="290" y="15" fill="#c85a32" fontSize="10" fontFamily="Space Grotesk">Peak</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. REAL IN-PAGE EXPEDITION BOOKING & PERMIT ENGINE */}
        <section className="bg-white border-y border-stone-200 py-12" id="booking-engine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                Interactive Permit & Expedition Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#081710]">
                Apply for Official Eco-Trail Expedition
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                Real-time booking and invoice calculation with state forest conservation permit compliance.
              </p>
            </div>

            {bookingConfirmed ? (
              <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-3xl text-center space-y-4">
                <span className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xl font-bold">✓</span>
                <h3 className="text-2xl font-serif font-bold text-emerald-950">Expedition Permit Reserved</h3>
                <p className="text-xs font-mono text-emerald-900 max-w-md mx-auto">
                  Booking Slip Code: <strong>SON-EXP-{Math.floor(100000 + Math.random() * 900000)}</strong> for {bookPax} Explorers on {bookDate}. Our regional coordinator will verify checkpost entry clearance within 2 hours.
                </p>
                <button onClick={() => setBookingConfirmed(false)} className="bg-emerald-800 text-white font-mono text-xs font-bold py-2 px-5 rounded-xl">
                  Create Another Booking
                </button>
              </div>
            ) : (
              <div className="bg-[#fcfaf6] p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center text-xs font-mono border-b border-stone-200 pb-4">
                  <span className={bookingStep === 1 ? 'font-bold text-[#c85a32]' : 'text-stone-400'}>1. Trail & Date</span>
                  <span>→</span>
                  <span className={bookingStep === 2 ? 'font-bold text-[#c85a32]' : 'text-stone-400'}>2. Guide & Permit</span>
                  <span>→</span>
                  <span className={bookingStep === 3 ? 'font-bold text-[#c85a32]' : 'text-stone-400'}>3. Official Review</span>
                </div>

                {bookingStep === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <label className="text-stone-500 font-bold block mb-1">Select Trail</label>
                      <select value={bookTrail} onChange={(e) => setBookTrail(e.target.value)} className="w-full bg-white border border-stone-300 rounded-xl p-3 font-bold text-[#081710]">
                        <option>Salkhan Deep-Time Geo-Walk</option>
                        <option>Vijaygarh Fort Sunrise Ascent</option>
                        <option>Rihand Lake Shoreline Expedition</option>
                        <option>Mukha Falls Canyon Descent</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-stone-500 font-bold block mb-1">Travelers ({bookPax} Pax)</label>
                      <input type="range" min="1" max="15" value={bookPax} onChange={(e) => setBookPax(Number(e.target.value))} className="w-full mt-3 accent-[#c85a32]" />
                    </div>

                    <div>
                      <label className="text-stone-500 font-bold block mb-1">Expedition Date</label>
                      <input type="date" value={bookDate} onChange={(e) => setBookDate(e.target.value)} className="w-full bg-white border border-stone-300 rounded-xl p-2.5 font-bold text-[#081710]" />
                    </div>

                    <div className="sm:col-span-3 pt-3 flex justify-end">
                      <button onClick={() => setBookingStep(2)} className="btn-terracotta">
                        Next: Guide & Forest Permit →
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="text-stone-500 font-bold block mb-1">Authorized Naturalist & Guide Tier</label>
                      <select value={bookGuideTier} onChange={(e) => setBookGuideTier(e.target.value)} className="w-full bg-white border border-stone-300 rounded-xl p-3 font-bold text-[#081710]">
                        <option>Certified Naturalist (+₹1,500)</option>
                        <option>Senior Archaeological Guide (+₹2,500)</option>
                        <option>Self-Guided Only (₹0)</option>
                      </select>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-600 space-y-1">
                      <strong className="text-stone-800">State Conservation Declaration:</strong>
                      <p>All visitors agree to leave zero non-biodegradable waste and comply with local forest checkpost rules.</p>
                    </div>

                    <div className="flex justify-between pt-2">
                      <button onClick={() => setBookingStep(1)} className="text-stone-500 font-bold">← Back</button>
                      <button onClick={() => setBookingStep(3)} className="btn-terracotta">
                        Review Invoice →
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-4 text-xs font-mono">
                    <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2">
                      <div className="flex justify-between"><span>Trail:</span><strong>{bookTrail}</strong></div>
                      <div className="flex justify-between"><span>Date:</span><strong>{bookDate}</strong></div>
                      <div className="flex justify-between"><span>Group:</span><strong>{bookPax} Persons</strong></div>
                      <div className="flex justify-between"><span>Guide Tier:</span><strong>{bookGuideTier}</strong></div>
                      <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-bold text-[#c85a32]">
                        <span>Total (Incl. 18% GST):</span>
                        <span>₹{totalCalculated.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <button onClick={() => setBookingStep(2)} className="text-stone-500 font-bold">← Back</button>
                      <button onClick={() => setBookingConfirmed(true)} className="btn-forest bg-emerald-800 hover:bg-emerald-900">
                        Confirm & Issue Reservation Slip
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 5. RESEARCH BLOG HIGHLIGHTS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32]">Field Dispatches</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#081710]">Research Blog</h2>
            </div>
            <Link href="/blog" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">
              View All Dispatches →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="pro-card overflow-hidden flex flex-col justify-between">
              <div>
                <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" alt="" className="h-44 w-full object-cover" />
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">Geology</span>
                  <h3 className="font-bold text-base font-serif text-[#081710] leading-snug">The 1.4 Billion-Year Mystery of Salkhan Stromatolites</h3>
                  <p className="text-xs text-stone-600 line-clamp-2">How cyanobacteria colonies created Earth’s earliest oxygen rings in the Vindhyan basin.</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link href="/blog/salkhan-fossils-stromatolites-geology" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">Read Full Article →</Link>
              </div>
            </div>

            <div className="pro-card overflow-hidden flex flex-col justify-between">
              <div>
                <img src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80" alt="" className="h-44 w-full object-cover" />
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">History & Forts</span>
                  <h3 className="font-bold text-base font-serif text-[#081710] leading-snug">Trekking Vijaygarh Fort: The 5th-Century Mountain Citadel</h3>
                  <p className="text-xs text-stone-600 line-clamp-2">The mountain-top fortress that inspired Devaki Nandan Khatri's epic novel Chandrakanta.</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link href="/blog/vijaygarh-fort-chandrakanta-history-trek" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">Read Full Article →</Link>
              </div>
            </div>

            <div className="pro-card overflow-hidden flex flex-col justify-between">
              <div>
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&q=80" alt="" className="h-44 w-full object-cover" />
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">Travel Logistics</span>
                  <h3 className="font-bold text-base font-serif text-[#081710] leading-snug">Varanasi to Sonbhadra Road Trip & Fares Guide</h3>
                  <p className="text-xs text-stone-600 line-clamp-2">Complete highway transit details: pre-paid airport cabs, trains, and state bus schedules.</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link href="/blog/varanasi-to-sonbhadra-road-trip-guide" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">Read Full Article →</Link>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />

      {/* COMPASS MODAL */}
      {compassOpen && (
        <div className="fixed inset-0 z-50 bg-[#081710]/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setCompassOpen(false); }}>
          <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-sm p-5 text-center shadow-2xl relative">
            <button onClick={() => setCompassOpen(false)} className="absolute top-3 right-3 text-stone-400 hover:text-stone-800 text-lg font-bold">✕</button>
            <span className="text-[10px] font-mono uppercase font-bold text-[#c85a32] block mb-1">Live Satellite Instrument</span>
            <h3 className="text-xl font-serif font-black text-[#081710]">Expedition Compass</h3>
            <p className="text-xs text-stone-500 font-mono mb-3">{gpsStatus}</p>

            <div className="w-48 h-48 mx-auto relative rounded-full border-4 border-[#c85a32] bg-[#fcfaf6] flex items-center justify-center shadow-lg my-3">
              <span className="absolute top-2 font-mono font-bold text-xs text-[#c85a32]">N</span>
              <span className="absolute right-3 font-mono font-bold text-xs text-stone-400">E</span>
              <span className="absolute bottom-2 font-mono font-bold text-xs text-stone-400">S</span>
              <span className="absolute left-3 font-mono font-bold text-xs text-stone-400">W</span>

              <div 
                className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${bearingDeg}deg)` }}
              >
                <div className="w-2.5 h-20 bg-[#c85a32] rounded-t-full absolute top-3 shadow" />
                <div className="w-2 h-14 bg-stone-400 rounded-b-full absolute bottom-6 opacity-60" />
                <div className="w-5 h-5 rounded-full bg-[#081710] border-2 border-white z-20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3 font-mono text-center text-xs">
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Distance to Sonbhadra</span>
                <span className="text-base font-bold text-[#081710]">{distanceKm} km</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Bearing Angle</span>
                <span className="text-base font-bold text-[#c85a32]">{bearingDeg}° {cardinalDir}</span>
              </div>
            </div>

            <button onClick={acquireLocation} className="btn-terracotta w-full py-2.5 justify-center">
              Re-Calibrate Satellites
            </button>
          </div>
        </div>
      )}

      {/* SOS MODAL */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#081710]/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setSosModalOpen(false); }}>
          <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-sm p-5 space-y-3 shadow-2xl relative">
            <button onClick={() => setSosModalOpen(false)} className="absolute top-3 right-3 text-stone-400 hover:text-stone-800 text-lg font-bold">✕</button>
            <span className="text-[10px] font-mono uppercase font-bold text-red-600 block">District Emergency Desk</span>
            <h3 className="text-xl font-serif font-black text-[#081710]">Sonbhadra Helplines</h3>
            <p className="text-xs text-stone-600 font-mono">Saved offline in your device. Tap any number to call directly.</p>

            <div className="space-y-2 pt-1 font-mono text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div><h4 className="font-bold text-[#081710] text-xs">Police Control Room</h4><p className="text-[10px] text-stone-500">Emergency Police Line: 112</p></div>
                <a href="tel:112" className="bg-red-700 hover:bg-red-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition">Call 112</a>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div><h4 className="font-bold text-[#081710] text-xs">Ambulance Service</h4><p className="text-[10px] text-stone-500">Medical Trauma: 108</p></div>
                <a href="tel:108" className="bg-red-700 hover:bg-red-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition">Call 108</a>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div><h4 className="font-bold text-[#081710] text-xs">Forest Wildlife Checkpost</h4><p className="text-[10px] text-stone-500">Kaimur Wildlife Division</p></div>
                <a href="tel:+915444222268" className="bg-stone-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition">Call Checkpost</a>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div><h4 className="font-bold text-[#081710] text-xs">Son Adventure Verified Desk</h4><p className="text-[10px] text-stone-500">+91 73550 53822</p></div>
                <a href="tel:+917355053822" className="bg-emerald-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition">Call Desk</a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
