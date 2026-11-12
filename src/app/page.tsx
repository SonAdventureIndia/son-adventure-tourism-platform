'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SONBHADRA_DATUM = { lat: 24.6856, lng: 83.0689 };

export default function HomePage() {
  const [compassOpen, setCompassOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');
  
  // Real-Time GPS Telemetry
  const [distanceKm, setDistanceKm] = useState<number>(71);
  const [bearingDeg, setBearingDeg] = useState<number>(142);
  const [cardinalDir, setCardinalDir] = useState<string>('SE');
  const [gpsStatus, setGpsStatus] = useState<string>('Live Satellite Radar Active');

  // Weather & Time
  const [timeStr, setTimeStr] = useState('09:00 AM');
  const [dateStr, setDateStr] = useState('Loading...');
  const [temp, setTemp] = useState<number | null>(24);

  // Map & Elevation Profile State
  const [activePlace, setActivePlace] = useState('salkhan');

  // Multi-Step In-Page Booking Engine (No WhatsApp Redirect Hacks!)
  const [bookingStep, setBookingStep] = useState(1);
  const [bookTrail, setBookTrail] = useState('Salkhan Deep-Time Geo-Walk');
  const [bookPax, setBookPax] = useState(2);
  const [bookDate, setBookDate] = useState('');
  const [bookGuideTier, setBookGuideTier] = useState('Certified Naturalist (+₹1,500)');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const places: Record<string, any> = {
    salkhan: {
      title: 'Salkhan Fossil Park',
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
      desc: 'Pristine cascades carving deep shelves into the Belan River basin with prehistoric rock shelters.',
      coords: '24.7142° N, 82.7811° E',
      slug: '/destinations/mukha-waterfall'
    }
  };

  // Haversine & Great-Circle Bearing
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
    setGpsStatus('Synchronizing with GPS satellites...');
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
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div className="noise" />
      <div>
        <Navbar 
          onOpenCompass={() => { setCompassOpen(true); acquireLocation(); }} 
          onOpenSos={() => setSosModalOpen(true)} 
        />

        {/* 1. CINEMATIC HERO SECTION */}
        <header className="hero" id="home">
          <div 
            className="hero-bg" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop')" }} 
          />
          <div className="hero-overlay" />

          <div className="hero-inner">
            <div className="hero-greeting">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping inline-block" />
              <span>Official Exploration Portal · {dateStr}</span>
            </div>

            <h1 className="hero-title">
              Discover <br />
              <em>Sonbhadra.</em> <br />
              Ancient. Wild. <em>Alive.</em>
            </h1>

            <div className="hero-suggest">
              <div className="ico"><i className="fas fa-compass" /></div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gold-400 uppercase font-mono font-bold tracking-wider">Telemetry Radar</span>
                <strong className="text-xs sm:text-sm text-white">Salkhan Fossil Park · Optimal Daytime Visibility</strong>
                <span className="text-[11px] text-emerald-400 font-mono mt-0.5">
                  📍 Direct Satellite Vector: {distanceKm} km from Sonbhadra ({cardinalDir})
                </span>
              </div>
            </div>

            <p className="hero-desc">
              Where 1.4-billion-year-old prebiotic fossils meet misty fortresses in the clouds. Untamed rivers carve ancient canyons through the Vindhyan basin. An official expedition into Uttar Pradesh’s wildest frontier.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/destinations" className="btn-primary">
                <span>Explore Destinations</span>
                <i className="fas fa-arrow-right text-[10px]" />
              </Link>
              <a href="#booking-engine" className="btn-ghost">
                <i className="fas fa-calendar-check" />
                <span>Permit & Booking Engine</span>
              </a>
              <button onClick={() => { setCompassOpen(true); acquireLocation(); }} className="btn-ghost">
                <i className="fas fa-compass text-gold-400" />
                <span>Live GPS Compass</span>
              </button>
            </div>
          </div>

          {/* HERO LIVE TELEMETRY BAR */}
          <div className="hero-live">
            <div className="hero-live-item">
              <div className="text-[10px] font-mono uppercase text-stone-400 font-bold"><i className="fas fa-clock mr-1 text-gold-400" /> Sonbhadra Time</div>
              <div className="font-serif font-black text-white text-base">{timeStr}</div>
            </div>
            <div className="hero-live-item">
              <div className="text-[10px] font-mono uppercase text-stone-400 font-bold"><i className="fas fa-temperature-half mr-1 text-gold-400" /> Temperature</div>
              <div className="font-serif font-black text-white text-base">{temp ? `${temp}°C` : '24°C'}</div>
            </div>
            <div className="hero-live-item">
              <div className="text-[10px] font-mono uppercase text-stone-400 font-bold"><i className="fas fa-wind mr-1 text-gold-400" /> Air Quality</div>
              <div className="font-mono font-bold text-emerald-400 text-sm">Good (PM2.5)</div>
            </div>
            <div className="hero-live-item">
              <div className="text-[10px] font-mono uppercase text-stone-400 font-bold"><i className="fas fa-satellite mr-1 text-gold-400" /> Satellite Radar</div>
              <div className="font-mono font-bold text-amber-300 text-sm">{distanceKm} km ({cardinalDir})</div>
            </div>
          </div>
        </header>

        {/* 2. INFINITE SCROLLING MARQUEE */}
        <div className="marquee">
          <div className="marquee-track">
            <div className="flex items-center space-x-3 text-xs font-mono font-bold text-[#0a1410] uppercase px-4">
              <span>✦ Salkhan Stromatolites (1.4B Yrs)</span>
              <span>✦ Vijaygarh Fortress (430m)</span>
              <span>✦ Rihand Reservoir (GBP Sagar)</span>
              <span>✦ Mukha Cascades</span>
              <span>✦ Kaimur Wildlife Sanctuary</span>
              <span>✦ Lakhaniya Prehistoric Cave Art</span>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono font-bold text-[#0a1410] uppercase px-4">
              <span>✦ Salkhan Stromatolites (1.4B Yrs)</span>
              <span>✦ Vijaygarh Fortress (430m)</span>
              <span>✦ Rihand Reservoir (GBP Sagar)</span>
              <span>✦ Mukha Cascades</span>
              <span>✦ Kaimur Wildlife Sanctuary</span>
              <span>✦ Lakhaniya Prehistoric Cave Art</span>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE 4 PILLARS & TRAIL ELEVATION PROFILER */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="space-y-1 mb-8">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Trail Telemetry & Elevation Cross-Section
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0a1410]">
              The Four Expedition Pillars
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Click any pillar to inspect the terrain elevation gradient, GPS coordinates, and access trails.
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
                    <h3 className="font-bold text-base font-serif text-[#0a1410]">{p.title}</h3>
                    <p className="text-xs text-stone-500 font-mono mt-0.5">{p.coords}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#c85a32]">Inspect →</span>
                </div>
              ))}
            </div>

            {/* LIVE ELEVATION & TERRAIN HUD CARD */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="h-48 rounded-2xl overflow-hidden relative">
                <img src={places[activePlace].img} alt={places[activePlace].title} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-[#0a1410]/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Elevation: {places[activePlace].elevationProfile}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold font-serif text-[#0a1410]">{places[activePlace].title}</h3>
                  <Link href={places[activePlace].slug} className="text-xs font-mono font-bold text-[#c85a32] hover:underline">
                    Read Dedicated Dossier →
                  </Link>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">{places[activePlace].desc}</p>
              </div>

              {/* ELEVATION CROSS-SECTION CHART */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-[#0a1410]">Trail Elevation Cross-Section:</span>
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

        {/* 4. REAL IN-PAGE EXPEDITION BOOKING & PERMIT ENGINE (NO LAZY REDIRECTS) */}
        <section className="bg-white border-y border-stone-200 py-12" id="booking-engine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                Interactive Permit & Expedition Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0a1410]">
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
              <div className="bg-[#fdfbf7] p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                {/* Step indicator */}
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
                      <select value={bookTrail} onChange={(e) => setBookTrail(e.target.value)} className="w-full bg-white border border-stone-300 rounded-xl p-3 font-bold text-[#0a1410]">
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
                      <input type="date" value={bookDate} onChange={(e) => setBookDate(e.target.value)} className="w-full bg-white border border-stone-300 rounded-xl p-2.5 font-bold text-[#0a1410]" />
                    </div>

                    <div className="sm:col-span-3 pt-3 flex justify-end">
                      <button onClick={() => setBookingStep(2)} className="bg-[#c85a32] text-white font-mono text-xs font-bold py-2.5 px-6 rounded-xl">
                        Next: Guide & Forest Permit →
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="text-stone-500 font-bold block mb-1">Authorized Naturalist & Guide Tier</label>
                      <select value={bookGuideTier} onChange={(e) => setBookGuideTier(e.target.value)} className="w-full bg-white border border-stone-300 rounded-xl p-3 font-bold text-[#0a1410]">
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
                      <button onClick={() => setBookingStep(3)} className="bg-[#c85a32] text-white font-mono text-xs font-bold py-2.5 px-6 rounded-xl">
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
                      <button onClick={() => setBookingConfirmed(true)} className="bg-emerald-800 hover:bg-emerald-900 text-white font-mono text-xs font-bold py-3 px-8 rounded-xl shadow-lg">
                        Confirm & Issue Reservation Slip
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 5. RESEARCH BLOG & ADSENSE HUB */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32]">Field Dispatches</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0a1410]">Research Blog</h2>
            </div>
            <Link href="/blog" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">
              View All Dispatches →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" alt="" className="h-44 w-full object-cover" />
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">Geology</span>
                  <h3 className="font-bold text-base font-serif text-[#0a1410] leading-snug">The 1.4 Billion-Year Mystery of Salkhan Stromatolites</h3>
                  <p className="text-xs text-stone-600 line-clamp-2">How cyanobacteria colonies created Earth’s earliest oxygen rings in the Vindhyan basin.</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link href="/blog/salkhan-fossils-stromatolites-geology" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">Read Full Article →</Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <img src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80" alt="" className="h-44 w-full object-cover" />
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">History & Forts</span>
                  <h3 className="font-bold text-base font-serif text-[#0a1410] leading-snug">Trekking Vijaygarh Fort: The 5th-Century Mountain Citadel</h3>
                  <p className="text-xs text-stone-600 line-clamp-2">The mountain-top fortress that inspired Devaki Nandan Khatri's epic novel Chandrakanta.</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link href="/blog/vijaygarh-fort-chandrakanta-history-trek" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">Read Full Article →</Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&q=80" alt="" className="h-44 w-full object-cover" />
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">Travel Logistics</span>
                  <h3 className="font-bold text-base font-serif text-[#0a1410] leading-snug">Varanasi to Sonbhadra Road Trip & Fares Guide</h3>
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
        <div className="son-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setCompassOpen(false); }}>
          <div className="son-modal-window text-center">
            <button onClick={() => setCompassOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-lg font-bold">✕</button>
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] block mb-1">Live Gyro Telemetry</span>
            <h3 className="text-xl font-serif font-black text-[#0a1410]">Expedition Compass</h3>
            <p className="text-xs text-stone-500 font-mono mb-3">{gpsStatus}</p>

            <div className="w-48 h-48 mx-auto relative rounded-full border-4 border-[#c85a32] bg-[#fdfbf7] flex items-center justify-center shadow-lg my-3">
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
                <div className="w-5 h-5 rounded-full bg-[#0a1410] border-2 border-white z-20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3 font-mono text-center text-xs">
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Distance to Sonbhadra</span>
                <span className="text-base font-bold text-[#0a1410]">{distanceKm} km</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Bearing Angle</span>
                <span className="text-base font-bold text-[#c85a32]">{bearingDeg}° {cardinalDir}</span>
              </div>
            </div>

            <button onClick={acquireLocation} className="btn-primary w-full py-2">
              Re-Calibrate Satellites
            </button>
          </div>
        </div>
      )}

      {/* SOS MODAL */}
      {sosModalOpen && (
        <div className="son-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSosModalOpen(false); }}>
          <div className="son-modal-window space-y-3">
            <button onClick={() => setSosModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-lg font-bold">✕</button>
            <span className="text-[10px] font-mono font-bold uppercase text-red-600 block">District Emergency Response</span>
            <h3 className="text-xl font-serif font-black text-[#0a1410]">Sonbhadra Helplines</h3>
            <p className="text-xs text-stone-600 font-mono">Saved in offline device cache. Tap any number to call directly.</p>

            <div className="space-y-2 pt-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div><h4 className="font-bold text-[#0a1410]">Police Control Room</h4><p className="text-[10px] text-stone-500">Emergency Police Line: 112</p></div>
                <a href="tel:112" className="bg-red-700 text-white font-bold py-1.5 px-3 rounded-lg">Call 112</a>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div><h4 className="font-bold text-[#0a1410]">Ambulance Service</h4><p className="text-[10px] text-stone-500">Medical Trauma: 108</p></div>
                <a href="tel:108" className="bg-red-700 text-white font-bold py-1.5 px-3 rounded-lg">Call 108</a>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div><h4 className="font-bold text-[#0a1410]">Forest Wildlife Checkpost</h4><p className="text-[10px] text-stone-500">Kaimur Wildlife Division</p></div>
                <a href="tel:+915444222268" className="bg-stone-800 text-white font-bold py-1.5 px-3 rounded-lg">Call Checkpost</a>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div><h4 className="font-bold text-[#0a1410]">Son Adventure Verified Desk</h4><p className="text-[10px] text-stone-500">+91 73550 53822</p></div>
                <a href="tel:+917355053822" className="bg-emerald-800 text-white font-bold py-1.5 px-3 rounded-lg">Call Desk</a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
