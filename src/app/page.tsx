'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SONBHADRA_DATUM = { lat: 24.6856, lng: 83.0689 };

export default function HomePage() {
  const [heroSpot, setHeroSpot] = useState<'salkhan' | 'vijaygarh' | 'rihand' | 'mukha' | 'veerlorik'>('salkhan');
  const [compassOpen, setCompassOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  // Live Telemetry
  const [distanceKm, setDistanceKm] = useState<number>(71);
  const [bearingDeg, setBearingDeg] = useState<number>(142);
  const [cardinalDir, setCardinalDir] = useState<string>('SE');
  const [gpsStatus, setGpsStatus] = useState<string>('Live Satellite Radar Active');
  const [timeStr, setTimeStr] = useState('09:40 AM');
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
    },
    veerlorik: {
      name: 'Veer Lorik Stone & Markundi Ghati',
      tagline: 'Legendary Monolith of Eternal Love & Valour',
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80',
      elevation: '360m',
      desc: 'The iconic cleft monolith on Markundi Pass where folk hero Veer Lorik cleaved the rock in a single sword stroke.'
    }
  };

  const allDestinations = [
    { id: 'salkhan', name: 'Salkhan Fossil Park', category: 'Geological (1.4B Yrs)', elevation: '315m', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', link: '/destinations/salkhan-fossils' },
    { id: 'vijaygarh', name: 'Vijaygarh Fort', category: '5th-Century Citadel', elevation: '430m', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80', link: '/destinations/vijaygarh-fort' },
    { id: 'mukha', name: 'Mukha Falls (Belan)', category: 'River Gorge Cascade', elevation: '210m', img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80', link: '/destinations/mukha-waterfall' },
    { id: 'rihand', name: 'Rihand Dam (GBP Sagar)', category: 'Inland Sea Reservoir', elevation: '275m', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', link: '/destinations/rihand-reservoir' },
    { id: 'veerlorik', name: 'Veer Lorik Stone (Eco Point)', category: 'Monolith Heritage', elevation: '360m', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', link: '/destinations/veer-lorik-stone' },
    { id: 'agori', name: 'Agori Island Fort', category: 'Tri-River Confluence', elevation: '220m', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80', link: '/destinations/agori-fort' },
    { id: 'lakhaniya', name: 'Lakhaniya Dari Canyon', category: 'Prehistoric Rock Art', elevation: '260m', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', link: '/destinations/lakhaniya-dari' },
    { id: 'shivdwar', name: 'Shivdwar Valley Temple', category: '11th-Century Black Idol', elevation: '240m', img: 'https://images.unsplash.com/photo-1545126178-862cdb469409?auto=format&fit=crop&w=800&q=80', link: '/destinations/shivdwar-temple' }
  ];

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

        {/* 1. CINEMATIC HERO (WITH DYNAMIC SPOT SWITCHER HUD) */}
        <header className="relative min-h-[92vh] flex items-center px-4 sm:px-6 lg:px-8 bg-[#081710] overflow-hidden" id="home">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center filter brightness-[0.42] saturate-[1.2] transition-all duration-700" 
            style={{ backgroundImage: `url('${heroSpots[heroSpot].bg}')` }} 
          />
          <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#081710] via-transparent to-[#081710]/40 pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto w-full pt-16 pb-28 space-y-4">
            
            {/* SPOT SWITCHER BUTTONS */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-300 mr-1 hidden sm:inline">
                Inspect Landmark:
              </span>
              {[
                { id: 'salkhan', label: '🌋 Salkhan Fossils' },
                { id: 'vijaygarh', label: '🏰 Vijaygarh Fort' },
                { id: 'mukha', label: '🌊 Mukha Falls' },
                { id: 'rihand', label: '🛶 Rihand Sea' },
                { id: 'veerlorik', label: '⚔️ Veer Lorik Stone' }
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

            <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <i className="fas fa-mountain-sun text-amber-400" />
              <span>Official Tourism Discovery · Sonbhadra, UP</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white leading-[1.08] drop-shadow-md">
              {heroSpots[heroSpot].name} <br />
              <span className="text-[#e9c974] italic">{heroSpots[heroSpot].tagline}</span>
            </h1>

            {/* LIVE SATELLITE VECTOR CARD */}
            <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md border border-white/15 p-3 rounded-2xl max-w-lg my-3">
              <div className="w-9 h-9 rounded-xl bg-[#d4a537] text-[#081710] flex items-center justify-center font-bold text-sm shrink-0">
                <i className="fas fa-location-dot" />
              </div>
              <div className="text-xs">
                <span className="text-amber-300 font-mono font-bold uppercase text-[10px] block">Live Satellite Telemetry Vector</span>
                <strong className="text-white">You are {distanceKm} km from Sonbhadra ({cardinalDir})</strong>
                <span className="text-emerald-400 font-mono block text-[11px] mt-0.5">{gpsStatus}</span>
              </div>
            </div>

            <p className="text-sm text-stone-200 max-w-xl font-sans leading-relaxed drop-shadow">
              {heroSpots[heroSpot].desc}
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <Link href="/destinations" className="bg-[#c85a32] hover:bg-[#ac4a26] text-white text-xs font-mono font-bold uppercase tracking-wider py-3 px-6 rounded-xl shadow-lg transition">
                <span>Explore All 10+ Destinations</span>
                <i className="fas fa-arrow-right ml-1.5 text-[10px]" />
              </Link>
              <a href="#founder" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-mono font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition backdrop-blur-md">
                <i className="fas fa-user-tie mr-1 text-gold-400" />
                <span>Founder's Story</span>
              </a>
              <button onClick={() => { setCompassOpen(true); acquireLocation(); }} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-mono font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition backdrop-blur-md">
                <i className="fas fa-location-crosshairs mr-1 text-amber-300" />
                <span>Live Compass</span>
              </button>
            </div>
          </div>

          {/* TELEMETRY BAR */}
          <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-2 sm:grid-cols-4 bg-[#081710]/90 backdrop-blur-md border-t border-white/10 p-3 text-center text-xs font-mono">
            <div>
              <span className="text-stone-400 text-[10px] uppercase font-bold block"><i className="fas fa-clock mr-1 text-gold-400" /> Sonbhadra Time</span>
              <strong className="text-white text-sm font-serif">{timeStr} IST</strong>
            </div>
            <div>
              <span className="text-stone-400 text-[10px] uppercase font-bold block"><i className="fas fa-temperature-half mr-1 text-gold-400" /> Temperature</span>
              <strong className="text-white text-sm font-serif">{temp ? `${temp}°C` : '24°C'}</strong>
            </div>
            <div>
              <span className="text-stone-400 text-[10px] uppercase font-bold block"><i className="fas fa-mountain mr-1 text-emerald-400" /> Landmark Elevation</span>
              <strong className="text-emerald-300 text-sm">{heroSpots[heroSpot].elevation} MSL</strong>
            </div>
            <div>
              <span className="text-stone-400 text-[10px] uppercase font-bold block"><i className="fas fa-compass mr-1 text-gold-400" /> Bearing Vector</span>
              <strong className="text-amber-300 text-sm">{distanceKm} km ({cardinalDir})</strong>
            </div>
          </div>
        </header>

        {/* 2. FOUNDER'S TRIBUTE SECTION (NEERAJ DWIVEDI JI) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14" id="founder">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            <div className="md:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border-4 border-amber-500/20 shadow-xl">
                {/* Neeraj Dwivedi ji photo inside rock cave */}
                <img 
                  src="https://sonadventure.com/wp-content/uploads/2025/12/1000086797-1.jpg" 
                  alt="Neeraj Dwivedi - Founder of Son Adventure" 
                  className="w-full h-80 object-cover object-top"
                  onError={(e: any) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#081710] text-amber-400 font-mono text-[11px] font-bold py-1.5 px-3.5 rounded-xl shadow-lg border border-amber-500/30">
                Estd. 2012
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase text-[#c85a32] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                <i className="fas fa-award" />
                <span>The Pioneer Behind Son Adventure</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#081710]">
                Neeraj Dwivedi
              </h2>
              <p className="text-xs font-mono text-stone-500 -mt-2">
                Founder & Visionary · Son Adventure Tours & Eco Tourism
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans pt-1">
                <p>
                  Established in 2012 by <strong>Mr. Neeraj Kumar Dwivedi</strong>, Son Adventure was born with a pioneering mission: to transform the unexplored, ancient landscapes of Sonbhadra into structured, safe, and world-class adventure spaces.
                </p>
                <p>
                  With a rare blend of legal discipline, deep outdoor experience, and passion for the Vindhya-Son valley heritage, Neeraj ji has spent over a decade documenting prehistoric cave art, mapping mountain trails, and training local tribal youths as certified naturalists.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                <Link href="/about" className="bg-[#081710] hover:bg-[#112d1f] text-white font-bold py-2.5 px-5 rounded-xl transition">
                  Read Full Mission Charter →
                </Link>
                <a href="tel:+917355053822" className="text-[#c85a32] font-bold flex items-center space-x-1.5 pt-2 hover:underline">
                  <i className="fas fa-phone" />
                  <span>Direct Desk: +91 73550 53822</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 10+ DESTINATIONS DIRECTORY PREVIEW */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10" id="destinations">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
                Complete Field Catalog
              </span>
              <h2 className="text-3xl font-serif font-black text-[#081710] mt-1">
                Explore All Sonbhadra Wonders
              </h2>
            </div>
            <Link href="/destinations" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">
              View Detailed Directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allDestinations.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="h-44 relative overflow-hidden">
                    <img src={d.img} alt={d.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    <span className="absolute top-2.5 left-2.5 bg-[#081710]/90 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                      {d.elevation}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">{d.category}</span>
                    <h3 className="text-base font-bold font-serif text-[#081710]">{d.name}</h3>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link href={d.link} className="text-xs font-mono font-bold text-[#c85a32] hover:underline block pt-2 border-t border-stone-100">
                    Inspect Dossier →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. REAL IN-PAGE BOOKING ENGINE */}
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
                        <option>Veer Lorik Monolith & Markundi Pass</option>
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

      </div>

      <Footer />

      {/* COMPASS MODAL */}
      {compassOpen && (
        <div className="fixed inset-0 z-50 bg-[#081710]/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setCompassOpen(false); }}>
          <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-sm p-5 text-center shadow-2xl relative">
            <button onClick={() => setCompassOpen(false)} className="absolute top-3 right-3 text-stone-400 hover:text-stone-800 text-lg font-bold">✕</button>
            <span className="text-[10px] font-mono uppercase font-bold text-[#c85a32] block mb-1">Live Satellite Telemetry</span>
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
                <span className="text-stone-400 block text-[10px]">Distance</span>
                <span className="text-base font-bold text-[#081710]">{distanceKm} km</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Bearing Angle</span>
                <span className="text-base font-bold text-[#c85a32]">{bearingDeg}° {cardinalDir}</span>
              </div>
            </div>

            <button onClick={acquireLocation} className="bg-[#c85a32] hover:bg-[#ac4a26] text-white font-mono text-xs font-bold py-2.5 px-6 rounded-xl w-full shadow-md transition">
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
