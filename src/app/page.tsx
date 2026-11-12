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
  const [gpsStatus, setGpsStatus] = useState<string>('Satellite Link Calibrated');
  const [activePlaceKey, setActivePlaceKey] = useState('salkhan');

  const [timeStr, setTimeStr] = useState('08:33 AM');
  const [temp, setTemp] = useState<number | null>(22);
  const [humidity, setHumidity] = useState<number | null>(76);

  // Calculator State
  const [calcDays, setCalcDays] = useState(2);
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcGuide, setCalcGuide] = useState(1500);

  const emergencyContacts = [
    { title: 'Sonbhadra Police Control', number: '112', icon: 'fa-shield-halved', desc: 'Direct 24/7 Police Dispatch' },
    { title: 'District Hospital Ambulance', number: '108', icon: 'fa-truck-medical', desc: '24/7 Emergency & Medical Care' },
    { title: 'Kaimur Forest Range Office', number: '+915444222268', icon: 'fa-tree', desc: 'Checkpost & Wildlife Support' },
    { title: 'Son Adventure Helpdesk', number: '+917355053822', icon: 'fa-phone-volume', desc: 'On-ground Verified Guides' }
  ];

  const places: Record<string, any> = {
    salkhan: {
      name: 'Salkhan Fossils Geo-Park',
      elevation: '315m',
      distance: '12 km South of Robertsganj',
      highlight: '1.4 Billion-year-old pre-Cambrian stromatolite fossils.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      tips: 'Carry drinking water. Chipping fossil stone is strictly illegal.'
    },
    vijaygarh: {
      name: 'Vijaygarh Fort Citadel',
      elevation: '430m',
      distance: '30 km South-East',
      highlight: '5th-century cliff ramparts, perennial lakes & cave paintings.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      tips: 'Ascend at dawn; descend before 05:30 PM to avoid wildlife trails.'
    },
    rihand: {
      name: 'Rihand Dam & Reservoir',
      elevation: '275m',
      distance: '70 km South (Pipri)',
      highlight: 'Vast inland sea vistas, shoreline breezes & calm waters.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      tips: 'Swimming strictly forbidden due to deep undertows.'
    },
    mukha: {
      name: 'Mukha Falls (Belan Gorge)',
      elevation: '210m',
      distance: '45 km West (Ghorawal)',
      highlight: 'Natural tiered cascades in ancient sandstone river canyon.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      tips: 'Beware of flash currents during monsoon. Rocks are slippery.'
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
    setGpsStatus('Acquiring satellite lock...');
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
        setGpsStatus(`🟢 Satellite Locked (±${Math.round(pos.coords.accuracy)}m)`);
      },
      () => {
        const { dist, brng, cardinal } = calcMath(25.3176, 82.9739, SONBHADRA_HQ.lat, SONBHADRA_HQ.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setGpsStatus('🟡 Reference Datum: Varanasi (105 km)');
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${SONBHADRA_HQ.lat}&longitude=${SONBHADRA_HQ.lng}&current=temperature_2m,relative_humidity_2m&timezone=Asia%2FKolkata`)
      .then(r => r.json())
      .then(d => {
        if (d.current) {
          setTemp(Math.round(d.current.temperature_2m));
          setHumidity(Math.round(d.current.relative_humidity_2m));
        }
      })
      .catch(() => setTemp(22));

    acquireLocation();

    return () => clearInterval(timer);
  }, []);

  const totalEstimate = Math.round((calcGuests * 2000 * calcDays + calcGuide * calcGuests) * 1.18);

  return (
    <div className="min-h-screen bg-topo">
      
      {/* 1. TOP LIVE SATELLITE RADAR STRIP */}
      <div className="bg-pine-950 text-white text-[11px] font-mono py-2 px-4 flex flex-wrap justify-between items-center gap-2 border-b border-emerald-900/40">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider text-amber-400">LIVE GPS RADAR</span>
          <span className="text-stone-300">· 24.6856° N, 83.0689° E</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-stone-200">{timeStr} IST</span>
          <span className="font-bold text-amber-300">{temp ? `${temp}°C` : '22°C'}</span>
          <button 
            onClick={() => setSosModalOpen(true)}
            className="bg-canyon-600 hover:bg-canyon-700 text-white px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase transition shadow-sm"
          >
            SOS Help
          </button>
        </div>
      </div>

      {/* 2. SLIM GLASS NAVBAR */}
      <header className="sticky top-0 z-40 bg-sand-50/90 backdrop-blur-md border-b border-pine-900/10 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#home" className="flex items-center space-x-2 group">
            <span className="font-serif font-black text-2xl tracking-tight text-pine-900">
              SON<span className="text-canyon-600 italic">ADVENTURE</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex space-x-6 text-xs font-mono font-bold text-stone-600">
            <a href="#destinations" className="hover:text-canyon-600 transition">Destinations</a>
            <a href="#map" className="hover:text-canyon-600 transition">Trail Map</a>
            <a href="#guide" className="hover:text-canyon-600 transition">Transit Guide</a>
            <a href="#calculator" className="hover:text-canyon-600 transition">Pricing</a>
          </nav>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => { setCompassOpen(true); acquireLocation(); }} 
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-pine-900 bg-white border border-stone-300 py-1.5 px-3 rounded-lg shadow-sm hover:border-canyon-600 transition"
            >
              <i className="fas fa-compass text-canyon-600" />
              <span>Compass</span>
            </button>

            <a 
              href="https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20plan%20a%20trip%20to%20Sonbhadra."
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#25D366] hover:bg-[#1fa851] text-white py-1.5 px-3 rounded-lg text-xs font-mono font-bold inline-flex items-center space-x-1.5 shadow-sm transition"
            >
              <i className="fab fa-whatsapp text-sm" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile menu hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden text-pine-950 p-2 border border-stone-300 rounded-lg text-sm hover:bg-stone-100 transition"
              aria-label="Navigation Menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[57px] left-0 right-0 z-50 bg-white border-b border-stone-300 p-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
          <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-pine-900 border-b border-stone-100">
            🏔️ 01. Verified Destinations
          </a>
          <a href="#map" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-pine-900 border-b border-stone-100">
            🗺️ 02. Interactive Trail Map
          </a>
          <a href="#guide" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-pine-900 border-b border-stone-100">
            🚆 03. How to Reach & Fares
          </a>
          <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-pine-900 border-b border-stone-100">
            💰 04. Expedition Cost Calculator
          </a>
          <div className="pt-2 flex gap-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); setCompassOpen(true); acquireLocation(); }} 
              className="flex-1 bg-canyon-600 text-white font-mono font-bold py-2.5 rounded-lg text-xs"
            >
              <i className="fas fa-compass mr-1" /> Open Compass
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setSosModalOpen(true); }} 
              className="flex-1 bg-pine-900 text-white font-mono font-bold py-2.5 rounded-lg text-xs"
            >
              <i className="fas fa-phone-volume mr-1 text-amber-300" /> SOS Help
            </button>
          </div>
        </div>
      )}

      {/* 3. HERO DISPATCH (ULTRA-CLEAN & COMPACT) */}
      <section className="pt-6 pb-10 px-4 sm:px-6 max-w-6xl mx-auto" id="home">
        <div className="space-y-4">
          
          <div className="inline-flex items-center space-x-2 bg-pine-900/5 border border-pine-900/15 text-pine-900 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <i className="fas fa-mountain-sun text-canyon-600" />
            <span>Official Tourism Discovery · Sonbhadra, UP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-pine-900 leading-[1.08]">
            Where 1.4 Billion Years of Earth <br className="hidden sm:inline" />
            <span className="text-canyon-600 italic">Meet Untamed Wilderness.</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
            Walk on ancient prebiotic seafloors at Salkhan. Ascend Vijaygarh’s 5th-century cliff fortress. Witness Mukha Falls cascading into sandstone gorges. Built for travelers seeking authentic discovery.
          </p>

          {/* ACTION BUTTONS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-md pt-1">
            <a 
              href="#destinations" 
              className="bg-canyon-600 hover:bg-canyon-700 text-white text-xs font-mono font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 shadow-md shadow-canyon-600/20 transition active:scale-95"
            >
              <span>Explore Destinations</span>
              <i className="fas fa-arrow-right text-[10px]" />
            </a>

            <button 
              onClick={() => { setCompassOpen(true); acquireLocation(); }} 
              className="bg-pine-900 hover:bg-pine-800 text-white text-xs font-mono font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition active:scale-95"
            >
              <i className="fas fa-location-crosshairs text-amber-300" />
              <span>Live GPS Compass</span>
            </button>

            <button 
              onClick={() => setSosModalOpen(true)} 
              className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-mono font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition active:scale-95"
            >
              <i className="fas fa-shield-heart text-emerald-400" />
              <span>Jungle Survival Kit</span>
            </button>
          </div>

          {/* LIVE SATELLITE TELEMETRY CARD (PROPERLY SEPARATED) */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-4 max-w-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-400 tracking-wider block">
                Live Satellite Telemetry
              </span>
              <div className="text-sm font-bold text-pine-900 flex items-center space-x-1.5">
                <i className="fas fa-location-dot text-canyon-600" />
                <span>You are {distanceKm} km from Sonbhadra ({cardinalDir})</span>
              </div>
              <p className="text-[11px] font-mono text-stone-500">{gpsStatus}</p>
            </div>

            <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-1.5 text-left sm:text-right shrink-0">
              <span className="text-[10px] font-mono font-bold text-amber-800 block uppercase">Forecast Today</span>
              <span className="text-xs font-mono font-bold text-pine-900">
                {temp ? `${temp}°C` : '22°C'} · {humidity ? `${humidity}% Hum` : 'Clear'}
              </span>
            </div>
          </div>

          {/* HIGH-RES HERO PHOTOGRAPHY CARD */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-2 shadow-sm overflow-hidden mt-4">
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" 
                alt="Sonbhadra Kaimur Plateau" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-mono font-bold bg-canyon-600 px-2 py-0.5 rounded inline-block mb-1">
                  Kaimur Plateau Escarpment
                </span>
                <h3 className="text-xl font-bold font-serif">The Great Vindhyan Basin</h3>
                <p className="text-xs text-stone-200 mt-0.5">Border nexus of 4 States: UP, MP, Chhattisgarh, Jharkhand.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. DESTINATIONS (COMPACT CLEAN CARDS) */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto" id="destinations">
        <div className="mb-5 space-y-1">
          <span className="inline-flex items-center space-x-1.5 bg-pine-900/5 text-pine-900 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase">
            <i className="fas fa-compass text-canyon-600" />
            <span>Verified Heritage</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-pine-900">Core Destinations</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(places).map(([key, p]: any) => (
            <div key={key} className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 relative overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                  <span className="absolute top-2 left-2 bg-pine-950/90 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                    {p.elevation}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-canyon-600 uppercase tracking-wider">{p.distance}</span>
                  <h3 className="text-base font-bold text-pine-900 font-serif leading-snug">{p.name}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{p.highlight}</p>
                </div>
              </div>

              <div className="p-4 pt-0 space-y-2">
                <div className="p-2 bg-sand-100 rounded-lg text-[10px] font-mono text-stone-600 border border-stone-200/60">
                  <strong>Advice:</strong> {p.tips}
                </div>
                <a 
                  href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20visit%20${encodeURIComponent(p.name)}.`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-canyon-600 hover:bg-canyon-700 text-white font-mono text-xs font-bold py-2 rounded-lg text-center block transition shadow-sm"
                >
                  Plan Visit
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE MAP SECTION */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto" id="map">
        <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-canyon-600 tracking-wider">
                Interactive Exploration
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-pine-900 mt-0.5">Sonbhadra Trail Map</h2>
            </div>
            <span className="text-xs font-mono text-stone-500">Tap pin on map to inspect location</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-7 bg-sand-100 rounded-2xl p-4 border border-stone-200">
              <svg className="w-full h-auto" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <path d="M 150 100 Q 350 60 550 90 Q 700 120 720 280 Q 740 450 620 530 Q 480 590 320 550 Q 180 510 120 400 Q 80 280 150 100 Z" fill="rgba(20, 53, 37, 0.04)" stroke="rgba(20, 53, 37, 0.25)" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M 360 94 Q 420 130 466 171 Q 480 180 506 189 Q 530 200 533 342 Q 520 400 426 300 Q 380 250 240 325 Q 200 340 293 514" fill="none" stroke="#c85a32" strokeWidth="3" strokeLinecap="round" />
                
                <g className="cursor-pointer" onClick={() => setActivePlaceKey('salkhan')} transform="translate(466,171)">
                  <circle r="14" fill="#c85a32" stroke="#ffffff" strokeWidth="3" />
                  <text y="-20" fontFamily="Space Grotesk" fontSize="12" fontWeight="700" fill="#0e261a" textAnchor="middle">Salkhan Fossils</text>
                </g>
                <g className="cursor-pointer" onClick={() => setActivePlaceKey('vijaygarh')} transform="translate(426,300)">
                  <circle r="14" fill="#c85a32" stroke="#ffffff" strokeWidth="3" />
                  <text y="-20" fontFamily="Space Grotesk" fontSize="12" fontWeight="700" fill="#0e261a" textAnchor="middle">Vijaygarh Fort</text>
                </g>
                <g className="cursor-pointer" onClick={() => setActivePlaceKey('rihand')} transform="translate(293,514)">
                  <circle r="14" fill="#c85a32" stroke="#ffffff" strokeWidth="3" />
                  <text y="28" fontFamily="Space Grotesk" fontSize="12" fontWeight="700" fill="#0e261a" textAnchor="middle">Rihand Dam</text>
                </g>
                <g className="cursor-pointer" onClick={() => setActivePlaceKey('mukha')} transform="translate(533,342)">
                  <circle r="14" fill="#c85a32" stroke="#ffffff" strokeWidth="3" />
                  <text y="-20" fontFamily="Space Grotesk" fontSize="12" fontWeight="700" fill="#0e261a" textAnchor="middle">Mukha Falls</text>
                </g>
              </svg>
            </div>

            <div className="lg:col-span-5 bg-sand-100 rounded-2xl p-4 border border-canyon-600/30 space-y-2">
              <span className="text-[10px] font-mono font-bold text-canyon-600 uppercase tracking-wider block">
                Selected Landmark
              </span>
              <h3 className="text-xl font-bold font-serif text-pine-900">{places[activePlaceKey].name}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{places[activePlaceKey].highlight}</p>
              <div className="pt-2 text-xs font-mono space-y-1.5 text-stone-600 border-t border-stone-200">
                <div className="flex justify-between"><span>Elevation:</span><strong>{places[activePlaceKey].elevation}</strong></div>
                <div className="flex justify-between"><span>Distance from HQ:</span><strong>{places[activePlaceKey].distance}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW TO REACH & TRANSIT LOGISTICS */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto" id="guide">
        <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="space-y-1 pb-3 border-b border-stone-100">
            <span className="text-[10px] font-mono font-bold uppercase text-canyon-600 tracking-wider">Transit Logistics</span>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-pine-900">How to Reach Sonbhadra</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-sand-100 border border-stone-200 space-y-1.5">
              <span className="text-2xl">✈️</span>
              <h3 className="font-bold text-pine-900 text-sm">By Flight (Air)</h3>
              <p className="text-stone-600">Varanasi Airport (VNS) ~105 km. Pre-paid taxi costs ₹2,800–₹3,500 via SH 5A corridor.</p>
            </div>
            <div className="p-4 rounded-xl bg-sand-100 border border-stone-200 space-y-1.5">
              <span className="text-2xl">🚆</span>
              <h3 className="font-bold text-pine-900 text-sm">By Train (Rail)</h3>
              <p className="text-stone-600">Robertsganj (LUSA/CUK) or Renukoot. Nearest major junction: Pt. Deen Dayal Upadhyaya (DDU).</p>
            </div>
            <div className="p-4 rounded-xl bg-sand-100 border border-stone-200 space-y-1.5">
              <span className="text-2xl">🚗</span>
              <h3 className="font-bold text-pine-900 text-sm">By Road (Bus/Cab)</h3>
              <p className="text-stone-600">4-Lane Varanasi-Shaktinagar Expressway. Buses run every 30 mins from Varanasi Cantt (₹120–₹240).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EXPEDITION BUDGET CALCULATOR (PROPERLY STYLED) */}
      <section className="py-8 px-4 sm:px-6 max-w-3xl mx-auto" id="calculator">
        <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-canyon-600 tracking-wider">Budget Estimator</span>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-pine-900">Expedition Cost Calculator</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-stone-500 font-bold uppercase block">Duration</label>
              <select 
                value={calcDays} 
                onChange={(e) => setCalcDays(Number(e.target.value))} 
                className="w-full bg-sand-100 border border-stone-300 rounded-lg p-2.5 font-bold outline-none focus:border-canyon-600"
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
                className="w-full mt-3 accent-canyon-600 cursor-pointer" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-stone-500 font-bold uppercase block">Certified Guide</label>
              <select 
                value={calcGuide} 
                onChange={(e) => setCalcGuide(Number(e.target.value))} 
                className="w-full bg-sand-100 border border-stone-300 rounded-lg p-2.5 font-bold outline-none focus:border-canyon-600"
              >
                <option value={1500}>Verified Geo-Guide (+₹1,500)</option>
                <option value={0}>Self-Guided Only</option>
              </select>
            </div>
          </div>

          {/* TOTAL & WHATSAPP BUTTON */}
          <div className="p-4 rounded-xl bg-pine-900 text-white flex flex-col sm:flex-row justify-between items-center gap-3 font-mono">
            <div>
              <span className="text-[10px] text-amber-300 uppercase block font-bold">Estimated Budget (Incl. 18% GST)</span>
              <span className="text-2xl font-black">₹{totalEstimate.toLocaleString('en-IN')}</span>
            </div>

            <a 
              href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20calculated%20an%20estimate%20of%20₹${totalEstimate.toLocaleString('en-IN')}%20for%20${calcGuests}%20travelers%20for%20${calcDays}%20days.%20Please%20confirm%20availability.`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-canyon-600 hover:bg-canyon-700 text-white text-xs font-mono font-bold py-2.5 px-5 rounded-lg inline-flex items-center space-x-2 transition shadow-md"
            >
              <i className="fab fa-whatsapp text-sm" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-pine-950 text-stone-300 py-8 px-4 text-xs font-mono mt-10 border-t border-pine-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-serif font-black text-xl text-white">SON<span className="text-canyon-600 italic">ADVENTURE</span></span>
            <p className="text-stone-400 text-[11px] mt-0.5">Official Destination Discovery Platform · Sonbhadra, UP.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-white font-bold">
            <a href="tel:+917355053822" className="hover:text-amber-400 transition"><i className="fas fa-phone mr-1 text-canyon-600" /> +91 73550 53822</a>
            <a href="mailto:son.doc.tourism@gmail.com" className="hover:text-amber-400 transition"><i className="fas fa-envelope mr-1 text-canyon-600" /> son.doc.tourism@gmail.com</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-4 text-center text-stone-400 text-[10px]">
          © {new Date().getFullYear()} Son Adventure Tours & Eco Tourism · Robertsganj, Sonbhadra, UP, India.
        </div>
      </footer>

      {/* FLOATING ACTION DOCK */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-40">
        <button 
          onClick={() => { setCompassOpen(true); acquireLocation(); }} 
          className="flex items-center space-x-1.5 bg-white border border-stone-300 py-2 px-3 rounded-full shadow-lg text-pine-900 font-mono text-xs font-bold hover:border-canyon-600 transition"
        >
          <i className="fas fa-compass text-canyon-600 text-sm" />
          <span>Compass</span>
        </button>
        <button 
          onClick={() => setSosModalOpen(true)} 
          className="flex items-center space-x-1.5 bg-red-700 text-white py-2 px-3 rounded-full shadow-lg font-mono text-xs font-bold hover:bg-red-800 transition"
        >
          <i className="fas fa-truck-medical text-sm" />
          <span>SOS Help</span>
        </button>
      </div>

      {/* REAL GPS COMPASS MODAL */}
      {compassOpen && (
        <div className="fixed inset-0 z-50 bg-pine-950/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setCompassOpen(false); }}>
          <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-sm p-5 text-center shadow-2xl relative">
            <button onClick={() => setCompassOpen(false)} className="absolute top-3 right-3 text-stone-400 hover:text-stone-800 text-lg font-bold">✕</button>
            <span className="text-[10px] font-mono uppercase font-bold text-canyon-600 block mb-1">Satellite Navigation</span>
            <h3 className="text-xl font-serif font-black text-pine-900">Trail Gyro-Compass</h3>
            <p className="text-xs text-stone-500 mb-2 font-mono">{gpsStatus}</p>

            <div className="w-44 h-44 mx-auto relative rounded-full border-4 border-canyon-600 bg-sand-50 flex items-center justify-center shadow-md my-3">
              <span className="absolute top-2 font-mono font-bold text-xs text-canyon-600">N</span>
              <span className="absolute right-3 font-mono font-bold text-xs text-stone-400">E</span>
              <span className="absolute bottom-2 font-mono font-bold text-xs text-stone-400">S</span>
              <span className="absolute left-3 font-mono font-bold text-xs text-stone-400">W</span>

              <div 
                className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${bearingDeg}deg)` }}
              >
                <div className="w-2.5 h-16 bg-canyon-600 rounded-t-full absolute top-4 shadow" />
                <div className="w-2 h-12 bg-stone-400 rounded-b-full absolute bottom-6 opacity-60" />
                <div className="w-5 h-5 rounded-full bg-pine-900 border-2 border-white z-20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3 font-mono text-center text-xs">
              <div className="bg-sand-100 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Distance</span>
                <span className="text-base font-bold text-pine-900">{distanceKm} km</span>
              </div>
              <div className="bg-sand-100 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Bearing</span>
                <span className="text-base font-bold text-canyon-600">{bearingDeg}° {cardinalDir}</span>
              </div>
            </div>

            <button onClick={acquireLocation} className="w-full bg-canyon-600 hover:bg-canyon-700 text-white font-mono font-bold py-2 rounded-lg text-xs transition">
              Re-Calibrate Satellites
            </button>
          </div>
        </div>
      )}

      {/* SOS EMERGENCY NUMBERS MODAL */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-pine-950/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setSosModalOpen(false); }}>
          <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-sm p-5 space-y-3 shadow-2xl relative">
            <button onClick={() => setSosModalOpen(false)} className="absolute top-3 right-3 text-stone-400 hover:text-stone-800 text-lg font-bold">✕</button>
            <span className="text-[10px] font-mono uppercase font-bold text-red-600 block">District Emergency Desk</span>
            <h3 className="text-xl font-serif font-black text-pine-900">Sonbhadra Helplines</h3>
            <p className="text-xs text-stone-600 font-mono">Saved offline in your device. Tap any number to call directly.</p>

            <div className="space-y-2 pt-1 font-mono text-xs">
              {emergencyContacts.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-sand-100 border border-stone-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-pine-900 text-xs">{c.title}</h4>
                    <p className="text-[10px] text-stone-500 font-sans">{c.number}</p>
                  </div>
                  <a href={`tel:${c.number}`} className="bg-red-700 hover:bg-red-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition">
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
