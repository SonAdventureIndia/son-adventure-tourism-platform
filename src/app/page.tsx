'use client';

import React, { useState, useEffect } from 'react';

const SONBHADRA = { lat: 24.6856, lng: 83.0689 };

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [compassOpen, setCompassOpen] = useState(false);
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [bearingDeg, setBearingDeg] = useState<number>(0);
  const [cardinalDir, setCardinalDir] = useState<string>('N');
  const [compassStatus, setCompassStatus] = useState<string>('Calibrated with GPS Satellites');
  const [activePlace, setActivePlace] = useState('salkhan');
  const [gearCategory, setGearCategory] = useState<'trekker' | 'water' | 'camp'>('trekker');

  const [timeStr, setTimeStr] = useState('--:--');
  const [temp, setTemp] = useState<number | null>(null);

  // Calculator State
  const [calcDays, setCalcDays] = useState(2);
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcAddon, setCalcAddon] = useState(1500);

  const places: Record<string, any> = {
    salkhan: {
      name: 'Salkhan Fossils Geo-Park',
      elevation: '315 Meters',
      trailDifficulty: 'Easy Walking Trail',
      sunlight: 'Best: 07:00 AM – 11:30 AM',
      highlight: '1.4 Billion-Year-Old Stromatolite Strata (Pre-Cambrian)',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      description: 'Step directly on the ancient seafloor where life first began forming photosynthetic rings before complex multicellular animals ever existed.'
    },
    vijaygarh: {
      name: 'Vijaygarh Cliff Citadel',
      elevation: '430 Meters',
      trailDifficulty: 'Stair Trek (500+ Steps)',
      sunlight: 'Golden Hour: 05:45 AM (Sunrise)',
      highlight: 'Perennial Mountain Lakes & 5th-Century Inscriptions',
      image: 'https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?auto=format&fit=crop&w=1200&q=80',
      description: 'Towering stone ramparts above the Son River Valley offering 360-degree panoramic views of eastern Kaimur ridges.'
    },
    rihand: {
      name: 'Rihand Inland Sea (GBP Sagar)',
      elevation: '275 Meters',
      trailDifficulty: 'Water Expeditions & Trails',
      sunlight: 'Sunset: 05:15 PM',
      highlight: 'Miles of tranquil blue waters & shoreline camps',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      description: 'One of Asia’s largest inland freshwater bodies nestled in forested hills, ideal for peaceful kayaking and campfire retreats.'
    },
    mukha: {
      name: 'Mukha Falls & Belan Gorge',
      elevation: '210 Meters',
      trailDifficulty: 'Canyon Descent (Moderate)',
      sunlight: 'Mid-Morning Light',
      highlight: 'Natural tiered amphitheater cascades & rock shelters',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      description: 'Cascading natural waterfalls carving dramatic shelves into the sandstone canyon basin of central Sonbhadra.'
    }
  };

  const gearItems = {
    trekker: [
      { name: 'Sturdy Trail Footwear', tip: 'Essential for Vindhyan stone trails & Vijaygarh stairs' },
      { name: 'Refillable 2L Canteen', tip: 'Zero-plastic zone: clean drinking water is vital' },
      { name: 'UV Trail Hat & Polarized Lenses', tip: 'Bright daylight reflection on sandstone beds' },
      { name: 'Field Compass & GPS Device', tip: 'For off-grid ridge navigation' }
    ],
    water: [
      { name: 'Quick-Dry Ripstop Apparel', tip: 'Lightweight for Belan river spray & humidity' },
      { name: 'Dry Bag (20L Waterproof)', tip: 'Protects cameras & phones during boat crossings' },
      { name: 'High-Grip River Sandals', tip: 'Prevents slipping on wet Mukha river stones' },
      { name: 'Biodegradable Sunscreen', tip: 'Eco-safe for freshwater river ecosystems' }
    ],
    camp: [
      { name: 'Headlamp with Red Beam', tip: 'Preserves night-vision during star-gazing' },
      { name: 'Cotton Trail Blanket / Fleece', tip: 'Vindhyan plateau nights get crisp and cool' },
      { name: 'Field Notebook & Pencil', tip: 'Document fossil sketches & bird observations' },
      { name: 'Pocket First-Aid Kit', tip: 'Antiseptic, blister tape, and rehydration salts' }
    ]
  };

  // Math: Haversine Distance & Bearing
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
    const cardinal = dirs[Math.round(brng / 22.5) % 16];

    return { dist, brng, cardinal };
  };

  const acquireLocation = () => {
    setCompassStatus('Acquiring satellite lock...');
    if (!navigator.geolocation) {
      setCompassStatus('GPS not supported by browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { dist, brng, cardinal } = calcMath(pos.coords.latitude, pos.coords.longitude, SONBHADRA.lat, SONBHADRA.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setCompassStatus('🟢 Live Satellites Connected');
      },
      () => {
        // Varanasi Datum
        const { dist, brng, cardinal } = calcMath(25.3176, 82.9739, SONBHADRA.lat, SONBHADRA.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setCompassStatus('🟡 Reference: Varanasi Gateway (105 km)');
      },
      { timeout: 7000 }
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${SONBHADRA.lat}&longitude=${SONBHADRA.lng}&current=temperature_2m&timezone=Asia%2FKolkata`)
      .then(r => r.json())
      .then(data => {
        if (data.current) setTemp(Math.round(data.current.temperature_2m));
      })
      .catch(() => setTemp(26));

    return () => clearInterval(timer);
  }, []);

  const totalEstimate = Math.round((calcGuests * 2200 * calcDays + calcAddon * calcGuests) * 1.18);

  return (
    <div className="topo-pattern min-h-screen">
      {/* EXPEDITION TICKER */}
      <div className="bg-[#143525] text-[#fbf8f2] text-xs py-2 px-4 flex justify-between items-center font-mono">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold tracking-wider uppercase text-amber-300">FIELD EXPEDITION REGISTER</span>
          <span className="hidden md:inline text-stone-300">· Coordinates: 24.6856° N, 83.0689° E</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>{timeStr} IST</span>
          <span className="text-amber-300 font-bold">{temp ? `${temp}°C` : '26°C'} Sunlit</span>
        </div>
      </div>

      {/* TOP NAVIGATION */}
      <nav>
        <a href="#home" className="logo">
          SON<span>ADVENTURE</span>
        </a>

        <ul className="nav-links">
          <li><a href="#places">Expedition Sites</a></li>
          <li><a href="#map">Trail Map</a></li>
          <li><a href="#gear">Gear Checklist</a></li>
          <li><a href="#planner">Trip Cost</a></li>
        </ul>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => { setCompassOpen(true); acquireLocation(); }} 
            className="hidden sm:inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#143525] bg-[#143525]/5 border border-[#143525]/20 py-2 px-3.5 rounded-xl hover:bg-[#143525]/10 transition"
          >
            <i className="fas fa-compass text-[#c25e36]" />
            <span>Field Compass</span>
          </button>

          <a 
            href="https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20am%20ready%20to%20plan%20an%20outdoor%20expedition." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-adventure py-2.5 px-4 text-xs"
          >
            <i className="fab fa-whatsapp text-sm" />
            <span>WhatsApp Desk</span>
          </a>

          {/* HAMBURGER BUTTON */}
          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)} 
            className="hamburger text-stone-800 p-2 border border-stone-300 rounded-lg text-lg"
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-[#fbf8f2]/98 border-b border-stone-300 p-6 flex flex-col space-y-4 shadow-xl">
          <a href="#places" onClick={() => setMobileMenuOpen(false)} className="font-mono text-sm uppercase font-bold text-[#143525] py-2 border-b border-stone-200">
            🏔️ 01. Verified Expedition Sites
          </a>
          <a href="#map" onClick={() => setMobileMenuOpen(false)} className="font-mono text-sm uppercase font-bold text-[#143525] py-2 border-b border-stone-200">
            🗺️ 02. Interactive Trail Map
          </a>
          <a href="#gear" onClick={() => setMobileMenuOpen(false)} className="font-mono text-sm uppercase font-bold text-[#143525] py-2 border-b border-stone-200">
            🎒 03. Backpack Gear Checklist
          </a>
          <a href="#planner" onClick={() => setMobileMenuOpen(false)} className="font-mono text-sm uppercase font-bold text-[#143525] py-2 border-b border-stone-200">
            💰 04. Expedition Cost Planner
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); setCompassOpen(true); acquireLocation(); }} 
            className="btn-adventure w-full justify-center mt-2"
          >
            <i className="fas fa-location-crosshairs" />
            <span>Launch Live Field Compass</span>
          </button>
        </div>
      )}

      {/* HERO SECTION: SUNLIT EXPLORATION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="home">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT EDITORIAL HERO */}
          <div className="lg:col-span-7 space-y-6">
            <div className="expedition-stamp">
              <i className="fas fa-map-location-dot text-[#c25e36]" />
              <span>Official Expedition Gateway · Sonbhadra, UP</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#143525] leading-[1.05]">
              Step Out of the Routine. <br />
              <span className="text-[#c25e36] italic font-serif">Enter Wild Sonbhadra.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#576b60] max-w-xl leading-relaxed">
              Touch 1.4-billion-year-old prebiotic fossil beds. Trek the misty ramparts of 5th-century cliffside fortresses. Kayak across endless inland waters. An authentic outdoor adventure into Uttar Pradesh’s ancient plateau.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#places" className="btn-adventure">
                <span>Start Your Expedition</span>
                <i className="fas fa-arrow-right" />
              </a>

              <button 
                onClick={() => { setCompassOpen(true); acquireLocation(); }} 
                className="btn-forest"
              >
                <i className="fas fa-compass text-amber-300" />
                <span>Live Trail Compass</span>
              </button>
            </div>

            {/* LIVE SATELLITE READOUT PILL */}
            <div className="p-4 rounded-2xl bg-white border border-[#143525]/10 shadow-sm flex items-center justify-between max-w-lg mt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#143525]/5 flex items-center justify-center text-[#c25e36]">
                  <i className="fas fa-satellite-dish" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block">Satellite Distance</span>
                  <strong className="text-sm text-[#143525]">
                    {distanceKm > 0 ? `You are ${distanceKm.toLocaleString()} km from Sonbhadra` : 'Calibrating from Varanasi Datum...'}
                  </strong>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#c25e36] bg-[#c25e36]/10 px-2.5 py-1 rounded-md">
                100% Real Time
              </span>
            </div>
          </div>

          {/* RIGHT VISUAL HERO CARDS */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <div className="relative h-80 sm:h-96 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" 
                  alt="Sonbhadra Adventure" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#143525]/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase font-mono font-bold bg-[#c25e36] px-2.5 py-1 rounded-full inline-block mb-2">
                    Vindhyan Escarpment
                  </span>
                  <h3 className="text-2xl font-bold text-white">The High Ridges of Kaimur</h3>
                  <p className="text-xs text-stone-200 mt-1">Ancient pre-Cambrian sandstone corridors & wildlife belts.</p>
                </div>
              </div>

              {/* THREE OUTDOOR PILLARS */}
              <div className="grid grid-cols-3 divide-x divide-stone-100 p-4 bg-white text-center font-mono">
                <div>
                  <span className="text-lg font-bold text-[#143525] block">1.4B+</span>
                  <span className="text-[10px] text-stone-400 uppercase">Years Age</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-[#c25e36] block">430m</span>
                  <span className="text-[10px] text-stone-400 uppercase">Fort Peak</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-[#143525] block">105 km</span>
                  <span className="text-[10px] text-stone-400 uppercase">From VNS</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: VERIFIED EXPEDITION SITES (LIGHT CARDS) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="places">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="expedition-stamp">Verified Expedition Grounds</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#143525]">Four Pillars of Discovery</h2>
          <p className="text-[#576b60] text-sm">
            Fact-checked geographical marvels. Every site is mapped with verified elevations and daylight windows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(places).map(([key, p]: any) => (
            <div 
              key={key} 
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 left-3 bg-[#143525]/90 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md">
                    {p.elevation}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#c25e36] uppercase">{p.trailDifficulty}</span>
                  <h3 className="text-xl font-bold text-[#143525]">{p.name}</h3>
                  <p className="text-xs text-[#576b60] leading-relaxed line-clamp-3">{p.description}</p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-stone-100 flex justify-between items-center text-xs font-mono">
                <span className="text-stone-400">{p.sunlight}</span>
                <a 
                  href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20visit%20${encodeURIComponent(p.name)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-[#c25e36] hover:underline"
                >
                  Plan Visit →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE TRAIL MAP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="map">
        <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-stone-100 gap-4">
            <div>
              <span className="expedition-stamp">Terrain & Route Navigation</span>
              <h2 className="text-3xl font-black text-[#143525] mt-1">Interactive Sonbhadra Map</h2>
              <p className="text-[#576b60] text-sm mt-1">Click any marker pin on the map to open the live terrain dispatch sheet.</p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-stone-500">
              <span className="w-3 h-3 rounded-full bg-[#c25e36]" /> Click Pin to Inspect
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* SVG MAP */}
            <div className="lg:col-span-7 bg-[#fbf8f2] rounded-2xl p-6 border border-stone-200">
              <svg className="w-full h-auto" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <path className="map-district" d="M 150 100 Q 350 60 550 90 Q 700 120 720 280 Q 740 450 620 530 Q 480 590 320 550 Q 180 510 120 400 Q 80 280 150 100 Z" />
                <path className="map-route" d="M 360 94 Q 420 130 466 171 Q 480 180 506 189 Q 530 200 533 342 Q 520 400 426 300 Q 380 250 240 325 Q 200 340 293 514" />
                
                {/* 4 CORE PINS */}
                <g className="map-marker" onClick={() => setActivePlace('salkhan')} transform="translate(466,171)">
                  <circle className="dot" r="11" />
                  <text className="lbl" y="-18">Salkhan Fossils</text>
                </g>
                <g className="map-marker" onClick={() => setActivePlace('vijaygarh')} transform="translate(426,300)">
                  <circle className="dot" r="11" />
                  <text className="lbl" y="-18">Vijaygarh Fort</text>
                </g>
                <g className="map-marker" onClick={() => setActivePlace('rihand')} transform="translate(293,514)">
                  <circle className="dot" r="11" />
                  <text className="lbl" y="26">Rihand Dam</text>
                </g>
                <g className="map-marker" onClick={() => setActivePlace('mukha')} transform="translate(533,342)">
                  <circle className="dot" r="11" />
                  <text className="lbl" y="-18">Mukha Falls</text>
                </g>
              </svg>
            </div>

            {/* TERRAIN DISPATCH SHEET */}
            <div className="lg:col-span-5 bg-[#fbf8f2] rounded-2xl p-6 border border-[#c25e36]/30 space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase text-[#c25e36] tracking-wider block">
                Selected Landmark Telemetry
              </span>
              <h3 className="text-2xl font-black text-[#143525]">{places[activePlace].name}</h3>
              <p className="text-xs text-[#576b60] leading-relaxed">{places[activePlace].description}</p>
              
              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">Elevation:</span>
                  <span className="font-bold text-[#143525]">{places[activePlace].elevation}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">Trail Class:</span>
                  <span className="font-bold text-[#c25e36]">{places[activePlace].trailDifficulty}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200">
                  <span className="text-stone-500">Sunlight Window:</span>
                  <span className="font-bold text-[#143525]">{places[activePlace].sunlight}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-stone-500">Core Highlight:</span>
                  <span className="font-bold text-[#143525] text-right max-w-[55%]">{places[activePlace].highlight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE BACKPACK GEAR CHECKLIST */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="gear">
        <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="expedition-stamp">Field Readiness</span>
              <h2 className="text-3xl font-black text-[#143525] mt-1">What to Pack in Your Backpack</h2>
              <p className="text-[#576b60] text-sm mt-1">Recommended gear tailored to Sonbhadra’s unique Vindhyan terrain.</p>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex bg-[#fbf8f2] p-1.5 rounded-xl border border-stone-200 text-xs font-mono font-bold">
              <button 
                onClick={() => setGearCategory('trekker')} 
                className={`py-2 px-4 rounded-lg transition ${gearCategory === 'trekker' ? 'bg-[#143525] text-white' : 'text-stone-600'}`}
              >
                🥾 Day Trekker
              </button>
              <button 
                onClick={() => setGearCategory('water')} 
                className={`py-2 px-4 rounded-lg transition ${gearCategory === 'water' ? 'bg-[#143525] text-white' : 'text-stone-600'}`}
              >
                🛶 River & Falls
              </button>
              <button 
                onClick={() => setGearCategory('camp')} 
                className={`py-2 px-4 rounded-lg transition ${gearCategory === 'camp' ? 'bg-[#143525] text-white' : 'text-stone-600'}`}
              >
                🏕️ Night Camp
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gearItems[gearCategory].map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#fbf8f2] border border-stone-200/70 space-y-2">
                <span className="w-8 h-8 rounded-lg bg-[#c25e36]/10 text-[#c25e36] flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </span>
                <h4 className="font-bold text-base text-[#143525]">{g.name}</h4>
                <p className="text-xs text-[#576b60] leading-relaxed">{g.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: EXPEDITION COST CALCULATOR */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="planner">
        <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <span className="expedition-stamp">Transparent District Tariffs</span>
            <h2 className="text-3xl font-black text-[#143525]">Expedition Budget Estimator</h2>
            <p className="text-[#576b60] text-sm">Real pricing for verified eco-guides, local permits, and sanitized dome camps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-stone-500 uppercase">Expedition Days</label>
              <select 
                value={calcDays} 
                onChange={(e) => setCalcDays(Number(e.target.value))}
                className="w-full bg-[#fbf8f2] border border-stone-300 rounded-xl p-3 text-sm font-bold text-[#143525]"
              >
                <option value={1}>1 Day Expedition</option>
                <option value={2}>2 Days / 1 Night</option>
                <option value={3}>3 Days / 2 Nights</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-stone-500 uppercase">Travelers ({calcGuests} Pax)</label>
              <input 
                type="range" 
                min="1" 
                max="12" 
                value={calcGuests} 
                onChange={(e) => setCalcGuests(Number(e.target.value))}
                className="w-full mt-3 accent-[#c25e36]"
              />
              <span className="text-[11px] font-mono text-stone-400">{calcGuests} Explorers</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-stone-500 uppercase">Adventure Guide</label>
              <select 
                value={calcAddon} 
                onChange={(e) => setCalcAddon(Number(e.target.value))}
                className="w-full bg-[#fbf8f2] border border-stone-300 rounded-xl p-3 text-sm font-bold text-[#143525]"
              >
                <option value={1500}>Authorized Geo-Naturalist (+₹1,500)</option>
                <option value={2500}>Astro-Photography Night Guide (+₹2,500)</option>
                <option value={0}>Self-Guided Only</option>
              </select>
            </div>
          </div>

          {/* TOTAL STRIP */}
          <div className="p-6 rounded-2xl bg-[#143525] text-white flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block">Estimated Package (Incl. 18% GST)</span>
              <span className="text-3xl font-black text-white">₹{totalEstimate.toLocaleString('en-IN')}</span>
            </div>

            <a 
              href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20reserve%20a%20${calcDays}-Day%20expedition%20for%20${calcGuests}%20guests%20(Estimated%20₹${totalEstimate.toLocaleString('en-IN')}).`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-adventure bg-[#c25e36] text-white"
            >
              <i className="fab fa-whatsapp text-base" />
              <span>Lock Dates on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#143525] text-[#fbf8f2] py-12 px-6 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-xl font-serif font-black text-white">SON<span className="text-[#c25e36] italic">ADVENTURE</span></span>
            <p className="text-stone-300 text-xs mt-1">Official Destination Discovery Platform for Sonbhadra, Uttar Pradesh.</p>
          </div>
          <div className="flex space-x-6 text-stone-200 font-bold">
            <a href="tel:+917355053822"><i className="fas fa-phone mr-1.5 text-amber-300" /> +91 73550 53822</a>
            <a href="mailto:son.doc.tourism@gmail.com"><i className="fas fa-envelope mr-1.5 text-amber-300" /> son.doc.tourism@gmail.com</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 text-center text-stone-400 text-[11px]">
          © {new Date().getFullYear()} Son Adventure Tours & Eco Tourism · Built for Responsible Travel in Sonbhadra, UP.
        </div>
      </footer>

      {/* DOCK */}
      <div className="dock-outdoor">
        <button 
          onClick={() => { setCompassOpen(true); acquireLocation(); }} 
          className="dock-btn"
          aria-label="Open Live GPS Compass"
        >
          <i className="fas fa-compass text-[#c25e36] text-base" />
          <span>Trail Compass</span>
        </button>
        <a 
          href="https://wa.me/917355053822" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="dock-btn text-emerald-700"
        >
          <i className="fab fa-whatsapp text-emerald-600 text-base" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* BRASS EXPEDITION COMPASS MODAL */}
      {compassOpen && (
        <div 
          className="expedition-modal" 
          onClick={(e) => { if (e.target === e.currentTarget) setCompassOpen(false); }}
        >
          <div className="modal-content text-center">
            <button onClick={() => setCompassOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-xl font-bold">✕</button>
            
            <span className="expedition-stamp mb-2">Magnetic Field Orientation</span>
            <h3 className="text-2xl font-black text-[#143525]">Expedition Compass</h3>
            <p className="text-xs text-[#576b60] mb-6">{compassStatus}</p>

            {/* BRASS DIAL */}
            <div className="w-52 h-52 mx-auto relative rounded-full border-4 border-[#b45309] bg-[#fbf8f2] flex items-center justify-center shadow-xl">
              <span className="absolute top-3 font-mono font-bold text-xs text-[#c25e36]">N</span>
              <span className="absolute right-3 font-mono font-bold text-xs text-stone-400">E</span>
              <span className="absolute bottom-3 font-mono font-bold text-xs text-stone-400">S</span>
              <span className="absolute left-3 font-mono font-bold text-xs text-stone-400">W</span>

              {/* DYNAMIC ROTATING NEEDLE */}
              <div 
                className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${bearingDeg}deg)` }}
              >
                <div className="w-2.5 h-20 bg-[#c25e36] rounded-t-full absolute top-5 shadow-md" />
                <div className="w-2 h-14 bg-stone-400 rounded-b-full absolute bottom-7 opacity-70" />
                <div className="w-5 h-5 rounded-full bg-[#143525] border-2 border-white z-20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 font-mono text-center">
              <div className="bg-[#fbf8f2] p-3 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-400 uppercase block">Distance</span>
                <span className="text-lg font-bold text-[#143525]">{distanceKm > 0 ? `${distanceKm.toLocaleString()} km` : '--'}</span>
              </div>
              <div className="bg-[#fbf8f2] p-3 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-400 uppercase block">Heading</span>
                <span className="text-lg font-bold text-[#c25e36]">{bearingDeg}° {cardinalDir}</span>
              </div>
            </div>

            <button 
              onClick={acquireLocation} 
              className="btn-adventure w-full justify-center"
            >
              Re-Sync Satellite Coordinates
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
