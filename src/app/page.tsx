'use client';

import React, { useState, useEffect } from 'react';

const SONBHADRA_HQ = { lat: 24.6856, lng: 83.0689 };

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [compassOpen, setCompassOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [distanceKm, setDistanceKm] = useState<number>(71);
  const [bearingDeg, setBearingDeg] = useState<number>(142);
  const [cardinalDir, setCardinalDir] = useState<string>('SE');
  const [gpsStatus, setGpsStatus] = useState<string>('Live Satellite GPS Calibrated');
  const [activePlaceKey, setActivePlaceKey] = useState('salkhan');

  const [timeStr, setTimeStr] = useState('08:30 AM');
  const [temp, setTemp] = useState<number | null>(24);

  // Calculator State
  const [calcDays, setCalcDays] = useState(2);
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcGuide, setCalcGuide] = useState(1500);

  const emergencyContacts = [
    { title: 'Sonbhadra Police Dispatch', number: '112', icon: 'fa-shield-halved' },
    { title: 'District Hospital Ambulance', number: '108', icon: 'fa-truck-medical' },
    { title: 'Kaimur Forest Range Checkpost', number: '+915444222268', icon: 'fa-tree' },
    { title: 'Son Adventure Verified Helpdesk', number: '+917355053822', icon: 'fa-phone-volume' }
  ];

  const places: Record<string, any> = {
    salkhan: {
      name: 'Salkhan Fossils Geo-Park',
      elevation: '315m',
      distance: '12 km South',
      highlight: '1.4 Billion-year-old pre-Cambrian stromatolite strata.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      tips: 'Carry drinking water. Extracting fossil rock is illegal.'
    },
    vijaygarh: {
      name: 'Vijaygarh Fort Citadel',
      elevation: '430m',
      distance: '30 km South-East',
      highlight: 'Ancient cliff ramparts, perennial lakes & cave paintings.',
      image: 'https://images.unsplash.com/photo-1599561046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      tips: 'Ascend at dawn; descend before sunset to avoid wildlife corridors.'
    },
    rihand: {
      name: 'Rihand Reservoir (GBP Sagar)',
      elevation: '275m',
      distance: '70 km South',
      highlight: 'Vast inland sea vistas, shoreline walks & calm waters.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      tips: 'Swimming is strictly prohibited due to deep currents.'
    },
    mukha: {
      name: 'Mukha Falls (Belan Gorge)',
      elevation: '210m',
      distance: '45 km West',
      highlight: 'Natural tiered amphitheater cascades and sandstone canyon.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      tips: 'Watch for sudden monsoon water surges. Keep away from drop edges.'
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
    const cardinal = dirs[Math.round(brng / 22.5) % 16];

    return { dist, brng, cardinal };
  };

  const acquireLocation = () => {
    setGpsStatus('Connecting to GPS Satellites...');
    if (!navigator.geolocation) {
      setGpsStatus('GPS unsupported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { dist, brng, cardinal } = calcMath(pos.coords.latitude, pos.coords.longitude, SONBHADRA_HQ.lat, SONBHADRA_HQ.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setGpsStatus(`🟢 Satellites Locked (±${Math.round(pos.coords.accuracy)}m)`);
      },
      () => {
        // Fallback: Varanasi datum
        const { dist, brng, cardinal } = calcMath(25.3176, 82.9739, SONBHADRA_HQ.lat, SONBHADRA_HQ.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setGpsStatus('🟡 Datum Reference: Varanasi Hub (105 km)');
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${SONBHADRA_HQ.lat}&longitude=${SONBHADRA_HQ.lng}&current=temperature_2m&timezone=Asia%2FKolkata`)
      .then(r => r.json())
      .then(d => {
        if (d.current) setTemp(Math.round(d.current.temperature_2m));
      })
      .catch(() => setTemp(24));

    acquireLocation();

    return () => clearInterval(timer);
  }, []);

  const totalEstimate = Math.round((calcGuests * 2000 * calcDays + calcGuide * calcGuests) * 1.18);

  return (
    <div className="min-h-screen bg-[#f9f8f5] text-[#1a2620]">
      
      {/* 1. COMPACT TOP STATUS STRIP */}
      <div className="bg-[#102a1c] text-white text-[11px] font-mono py-1.5 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider text-amber-300">SONBHADRA TELEMETRY</span>
          <span className="hidden sm:inline text-stone-300">· 24.6856° N, 83.0689° E</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>{timeStr} IST</span>
          <span className="font-bold text-amber-300">{temp ? `${temp}°C` : '24°C'}</span>
          <button 
            onClick={() => setSosModalOpen(true)}
            className="bg-[#c85a32] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
          >
            SOS Help
          </button>
        </div>
      </div>

      {/* 2. SLIM NAVBAR */}
      <header className="header-nav py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#home" className="flex items-center space-x-1.5">
            <span className="font-serif font-black text-xl tracking-tight text-[#102a1c]">
              SON<span className="text-[#c85a32] italic">ADVENTURE</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex space-x-6 text-xs font-mono font-bold text-stone-600">
            <a href="#destinations" className="hover:text-[#c85a32] transition">Destinations</a>
            <a href="#map" className="hover:text-[#c85a32] transition">Trail Map</a>
            <a href="#guide" className="hover:text-[#c85a32] transition">Transit Guide</a>
            <a href="#calculator" className="hover:text-[#c85a32] transition">Pricing</a>
          </nav>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => { setCompassOpen(true); acquireLocation(); }} 
              className="hidden sm:inline-flex items-center space-x-1 text-xs font-mono font-bold text-[#102a1c] bg-white border border-stone-200 py-1.5 px-3 rounded-lg shadow-sm"
            >
              <i className="fas fa-compass text-[#c85a32]" />
              <span>Compass</span>
            </button>

            <a 
              href="https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20plan%20a%20trip."
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#25D366] text-white py-1.5 px-3 rounded-lg text-xs font-mono font-bold inline-flex items-center space-x-1 shadow-sm"
            >
              <i className="fab fa-whatsapp" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden text-stone-800 p-2 border border-stone-300 rounded-lg text-sm"
              aria-label="Menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 p-4 space-y-3 shadow-xl">
          <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-[#102a1c] border-b border-stone-100">
            🏔️ 01. Verified Destinations
          </a>
          <a href="#map" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-[#102a1c] border-b border-stone-100">
            🗺️ 02. Interactive Trail Map
          </a>
          <a href="#guide" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-[#102a1c] border-b border-stone-100">
            🚆 03. How to Reach & Transport
          </a>
          <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-[#102a1c] border-b border-stone-100">
            💰 04. Expedition Cost Calculator
          </a>
          <div className="pt-2 flex gap-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); setCompassOpen(true); acquireLocation(); }} 
              className="flex-1 btn-primary py-2 text-xs"
            >
              <i className="fas fa-compass" />
              <span>Open Compass</span>
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setSosModalOpen(true); }} 
              className="flex-1 btn-secondary py-2 text-xs bg-red-800"
            >
              <i className="fas fa-truck-medical" />
              <span>SOS Helplines</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. HERO DISPATCH SECTION (COMPACT & CLEAN) */}
      <section className="pt-6 pb-12 px-4 sm:px-6 max-w-6xl mx-auto" id="home">
        <div className="space-y-4">
          
          <div className="badge-pill">
            <i className="fas fa-mountain-sun text-[#c85a32]" />
            <span>Official Tourism Discovery · Sonbhadra, UP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#102a1c] leading-tight">
            Where 1.4 Billion Years of Earth <br className="hidden sm:inline" />
            <span className="text-[#c85a32] italic font-serif">Meet Untamed Wilderness.</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
            Walk on ancient prebiotic seafloors at Salkhan. Ascend Vijaygarh’s 5th-century cliff fortress. Witness Mukha Falls cascading into sandstone gorges. Built for travelers seeking authentic discovery.
          </p>

          {/* ACTION BUTTONS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-md pt-1">
            <a href="#destinations" className="btn-primary w-full">
              <span>Explore Destinations</span>
              <i className="fas fa-arrow-right text-[10px]" />
            </a>

            <button 
              onClick={() => { setCompassOpen(true); acquireLocation(); }} 
              className="btn-secondary w-full"
            >
              <i className="fas fa-location-crosshairs text-amber-300" />
              <span>Live GPS Compass</span>
            </button>

            <button 
              onClick={() => setSosModalOpen(true)} 
              className="btn-secondary w-full bg-stone-700 hover:bg-stone-800"
            >
              <i className="fas fa-shield-heart text-emerald-400" />
              <span>SOS Helpline</span>
            </button>
          </div>

          {/* SATELLITE VECTOR RADAR CARD (FIXED CLEAN LAYOUT) */}
          <div className="outdoor-card p-3.5 sm:p-4 max-w-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-400 tracking-wider block">
                Live Satellite Vector
              </span>
              <div className="text-sm font-bold text-[#102a1c] flex items-center space-x-1.5">
                <i className="fas fa-location-dot text-[#c85a32]" />
                <span>You are {distanceKm} km from Sonbhadra ({cardinalDir})</span>
              </div>
              <p className="text-[11px] font-mono text-stone-500">{gpsStatus}</p>
            </div>

            <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-1.5 text-right shrink-0">
              <span className="text-[10px] font-mono font-bold text-amber-800 block uppercase">Real-Time Forecast</span>
              <span className="text-xs font-mono font-bold text-[#102a1c]">
                {temp ? `${temp}°C Sonbhadra` : '24°C Pleasant'}
              </span>
            </div>
          </div>

          {/* HIGH-RES HERO IMAGE */}
          <div className="outdoor-card overflow-hidden mt-4">
            <div className="relative h-60 sm:h-80 w-full">
              <img 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" 
                alt="Sonbhadra Adventure" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102a1c]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-mono font-bold bg-[#c85a32] px-2 py-0.5 rounded inline-block mb-1">
                  Vindhyan Escarpment
                </span>
                <h3 className="text-xl font-bold text-white">The High Ridges of Kaimur</h3>
                <p className="text-xs text-stone-200 mt-0.5">Confluence of 4 States: UP, MP, Chhattisgarh, Jharkhand.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. DESTINATIONS (COMPACT GRID) */}
      <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto" id="destinations">
        <div className="mb-6 space-y-1">
          <span className="badge-pill">Verified Sites</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#102a1c]">Core Destinations</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(places).map(([key, p]: any) => (
            <div key={key} className="outdoor-card overflow-hidden flex flex-col justify-between">
              <div>
                <div className="h-40 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-[#102a1c]/90 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {p.elevation}
                  </span>
                </div>
                <div className="p-3.5 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">{p.distance}</span>
                  <h3 className="text-base font-bold text-[#102a1c] leading-snug">{p.name}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{p.highlight}</p>
                </div>
              </div>

              <div className="p-3.5 pt-0">
                <div className="p-2 bg-stone-50 rounded-lg text-[10px] font-mono text-stone-600 border border-stone-200/60 mb-2">
                  <strong>Advice:</strong> {p.tips}
                </div>
                <a 
                  href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20visit%20${encodeURIComponent(p.name)}.`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full btn-primary py-1.5 text-[11px]"
                >
                  Plan Visit
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE MAP SECTION */}
      <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto" id="map">
        <div className="outdoor-card p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 pb-3 border-b border-stone-100">
            <div>
              <span className="badge-pill">Interactive Exploration</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#102a1c] mt-1">Sonbhadra Trail Map</h2>
            </div>
            <span className="text-xs font-mono text-stone-500">Tap pin on map to inspect location</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-7 bg-stone-50 rounded-xl p-3 border border-stone-200">
              <svg className="w-full h-auto" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <path className="map-district" d="M 150 100 Q 350 60 550 90 Q 700 120 720 280 Q 740 450 620 530 Q 480 590 320 550 Q 180 510 120 400 Q 80 280 150 100 Z" />
                <path className="map-route" d="M 360 94 Q 420 130 466 171 Q 480 180 506 189 Q 530 200 533 342 Q 520 400 426 300 Q 380 250 240 325 Q 200 340 293 514" />
                
                <g className="map-marker" onClick={() => setActivePlaceKey('salkhan')} transform="translate(466,171)">
                  <circle className="dot" r="14" />
                  <text className="lbl" y="-20">Salkhan Fossils</text>
                </g>
                <g className="map-marker" onClick={() => setActivePlaceKey('vijaygarh')} transform="translate(426,300)">
                  <circle className="dot" r="14" />
                  <text className="lbl" y="-20">Vijaygarh Fort</text>
                </g>
                <g className="map-marker" onClick={() => setActivePlaceKey('rihand')} transform="translate(293,514)">
                  <circle className="dot" r="14" />
                  <text className="lbl" y="28">Rihand Dam</text>
                </g>
                <g className="map-marker" onClick={() => setActivePlaceKey('mukha')} transform="translate(533,342)">
                  <circle className="dot" r="14" />
                  <text className="lbl" y="-20">Mukha Falls</text>
                </g>
              </svg>
            </div>

            <div className="lg:col-span-5 bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">Selected Landmark</span>
              <h3 className="text-lg font-bold text-[#102a1c]">{places[activePlaceKey].name}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{places[activePlaceKey].highlight}</p>
              <div className="pt-2 text-xs font-mono space-y-1 text-stone-600 border-t border-stone-200">
                <div className="flex justify-between"><span>Elevation:</span><strong>{places[activePlaceKey].elevation}</strong></div>
                <div className="flex justify-between"><span>Distance from HQ:</span><strong>{places[activePlaceKey].distance}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW TO REACH & TRANSPORT */}
      <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto" id="guide">
        <div className="outdoor-card p-4 sm:p-6 space-y-4">
          <div className="space-y-1 pb-3 border-b border-stone-100">
            <span className="badge-pill">Transit Logistics</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#102a1c]">How to Reach Sonbhadra</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <span className="text-xl">✈️</span>
              <h3 className="font-bold text-[#102a1c] text-sm">By Flight (Air)</h3>
              <p className="text-stone-600">Varanasi Airport (VNS) ~105 km. Pre-paid taxi costs ₹2,800–₹3,500.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <span className="text-xl">🚆</span>
              <h3 className="font-bold text-[#102a1c] text-sm">By Train (Rail)</h3>
              <p className="text-stone-600">Robertsganj (LUSA/CUK) or Renukoot. Nearest major hub: Pt. Deen Dayal Upadhyaya (DDU).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <span className="text-xl">🚗</span>
              <h3 className="font-bold text-[#102a1c] text-sm">By Road (Bus/Cab)</h3>
              <p className="text-stone-600">4-Lane Varanasi-Shaktinagar Expressway. Buses run every 30 mins from Varanasi Cantt (₹120–₹240).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EXPEDITION BUDGET CALCULATOR (COMPACT STYLED) */}
      <section className="py-10 px-4 sm:px-6 max-w-3xl mx-auto" id="calculator">
        <div className="outdoor-card p-4 sm:p-6 space-y-4">
          <div className="text-center space-y-1">
            <span className="badge-pill">Budget Estimator</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#102a1c]">Expedition Cost Calculator</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-stone-500 font-bold uppercase block">Duration</label>
              <select 
                value={calcDays} 
                onChange={(e) => setCalcDays(Number(e.target.value))} 
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 font-bold"
              >
                <option value={1}>1 Day Discovery</option>
                <option value={2}>2 Days / 1 Night</option>
                <option value={3}>3 Days / 2 Nights</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-stone-500 font-bold uppercase block">Travelers: {calcGuests} Pax</label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={calcGuests} 
                onChange={(e) => setCalcGuests(Number(e.target.value))} 
                className="w-full mt-2 accent-[#c85a32]" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-stone-500 font-bold uppercase block">Certified Guide</label>
              <select 
                value={calcGuide} 
                onChange={(e) => setCalcGuide(Number(e.target.value))} 
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 font-bold"
              >
                <option value={1500}>Verified Geo-Guide (+₹1,500)</option>
                <option value={0}>Self-Guided Only</option>
              </select>
            </div>
          </div>

          {/* TOTAL & WHATSAPP BUTTON */}
          <div className="p-4 rounded-xl bg-[#102a1c] text-white flex flex-col sm:flex-row justify-between items-center gap-3 font-mono">
            <div>
              <span className="text-[10px] text-amber-300 uppercase block">Estimated Budget (Incl. 18% GST)</span>
              <span className="text-2xl font-black">₹{totalEstimate.toLocaleString('en-IN')}</span>
            </div>

            <a 
              href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20calculated%20an%20estimate%20of%20₹${totalEstimate.toLocaleString('en-IN')}%20for%20${calcGuests}%20travelers%20for%20${calcDays}%20days.%20Please%20confirm%20availability.`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary w-full sm:w-auto"
            >
              <i className="fab fa-whatsapp" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#102a1c] text-stone-300 py-8 px-4 text-xs font-mono mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-serif font-black text-lg text-white">SON<span className="text-[#c85a32] italic">ADVENTURE</span></span>
            <p className="text-stone-400 text-[11px]">Official Destination Discovery Platform · Sonbhadra, UP.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-white font-bold">
            <a href="tel:+917355053822"><i className="fas fa-phone mr-1 text-[#c85a32]" /> +91 73550 53822</a>
            <a href="mailto:son.doc.tourism@gmail.com"><i className="fas fa-envelope mr-1 text-[#c85a32]" /> son.doc.tourism@gmail.com</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-4 text-center text-stone-400 text-[10px]">
          © {new Date().getFullYear()} Son Adventure Tours & Eco Tourism · Robertsganj, Sonbhadra, UP, India.
        </div>
      </footer>

      {/* REAL GPS COMPASS MODAL */}
      {compassOpen && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setCompassOpen(false); }}>
          <div className="modal-window text-center">
            <button onClick={() => setCompassOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-lg font-bold">✕</button>
            <span className="badge-pill mb-1">Live Satellite Telemetry</span>
            <h3 className="text-xl font-black text-[#102a1c]">Trail Gyro-Compass</h3>
            <p className="text-xs text-stone-500 mb-2">{gpsStatus}</p>

            <div className="w-44 h-44 mx-auto relative rounded-full border-4 border-[#c85a32] bg-[#f9f8f5] flex items-center justify-center shadow-md my-3">
              <span className="absolute top-2 font-mono font-bold text-xs text-[#c85a32]">N</span>
              <span className="absolute right-3 font-mono font-bold text-xs text-stone-400">E</span>
              <span className="absolute bottom-2 font-mono font-bold text-xs text-stone-400">S</span>
              <span className="absolute left-3 font-mono font-bold text-xs text-stone-400">W</span>

              <div 
                className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${bearingDeg}deg)` }}
              >
                <div className="w-2.5 h-18 bg-[#c85a32] rounded-t-full absolute top-3 shadow" />
                <div className="w-2 h-12 bg-stone-400 rounded-b-full absolute bottom-6 opacity-60" />
                <div className="w-5 h-5 rounded-full bg-[#102a1c] border-2 border-white z-20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3 font-mono text-center text-xs">
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Distance</span>
                <span className="text-base font-bold text-[#102a1c]">{distanceKm} km</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Bearing</span>
                <span className="text-base font-bold text-[#c85a32]">{bearingDeg}° {cardinalDir}</span>
              </div>
            </div>

            <button onClick={acquireLocation} className="btn-primary w-full py-2">
              Re-Calibrate Satellites
            </button>
          </div>
        </div>
      )}

      {/* SOS EMERGENCY NUMBERS MODAL */}
      {sosModalOpen && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setSosModalOpen(false); }}>
          <div className="modal-window space-y-3">
            <button onClick={() => setSosModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-lg font-bold">✕</button>
            <span className="badge-pill text-red-700 border-red-200 bg-red-50">District SOS Helpline</span>
            <h3 className="text-xl font-black text-[#102a1c]">Sonbhadra Emergency Desk</h3>
            <p className="text-xs text-stone-600">Saved offline in your device. Tap any number to call directly.</p>

            <div className="space-y-2 pt-1 font-mono text-xs">
              {emergencyContacts.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-[#102a1c] text-xs">{c.title}</h4>
                    <p className="text-[10px] text-stone-500 font-sans">{c.number}</p>
                  </div>
                  <a href={`tel:${c.number}`} className="bg-red-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs">
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
