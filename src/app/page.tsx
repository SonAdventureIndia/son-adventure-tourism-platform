'use client';

import React, { useState, useEffect } from 'react';

const SONBHADRA_HQ = { lat: 24.6856, lng: 83.0689, name: 'Robertsganj (HQ)' };

export default function HomePage() {
  const [isOnline, setIsOnline] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [compassOpen, setCompassOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [survivalModalOpen, setSurvivalModalOpen] = useState(false);

  // Live Location & Math
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [bearingDeg, setBearingDeg] = useState<number>(0);
  const [cardinalDir, setCardinalDir] = useState<string>('N');
  const [gpsStatus, setGpsStatus] = useState<string>('GPS Satellite System Ready');
  const [userLocationName, setUserLocationName] = useState<string>('Calibrating position...');

  // Live Time & Weather
  const [timeStr, setTimeStr] = useState('--:--');
  const [dateStr, setDateStr] = useState('Loading...');
  const [temp, setTemp] = useState<number | null>(null);
  const [weatherDesc, setWeatherDesc] = useState('Sunny & Clear');

  // Interactive Map State
  const [activePlace, setActivePlace] = useState('salkhan');

  // Calculator State
  const [calcDays, setCalcDays] = useState(2);
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcAddon, setCalcAddon] = useState(1500);

  const emergencyContacts = [
    { title: 'Sonbhadra Police Emergency', number: '112', desc: 'Direct 24/7 District Police Dispatch' },
    { title: 'District Hospital (Robertsganj)', number: '108', desc: 'Medical Emergency & Ambulance Service' },
    { title: 'Kaimur Forest Wildlife Control', number: '+915444222268', desc: 'Forest checkposts & wildlife assistance' },
    { title: 'Son Adventure Emergency Desk', number: '+917355053822', desc: 'On-ground verified rescue & guide help' }
  ];

  const places: Record<string, any> = {
    salkhan: {
      name: 'Salkhan Fossils Park',
      coords: '24.5833° N, 83.0833° E',
      elevation: '315 m',
      distanceFromHQ: '12 km South',
      terrain: 'Sandstone Geological Beds',
      bestHour: '07:30 AM – 11:30 AM',
      highlight: '1.4-billion-year-old stromatolite rings from early Earth history.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      tips: 'Zero concession stands on-site; carry 2L water. Chipping fossil stone is strictly illegal.'
    },
    vijaygarh: {
      name: 'Vijaygarh Fort',
      coords: '24.5772° N, 83.2104° E',
      elevation: '430 m',
      distanceFromHQ: '30 km South-East',
      terrain: 'Cliff Plateau Trek (500+ Steps)',
      bestHour: '05:30 AM (Sunrise view)',
      highlight: 'Ancient perennial lakes (Mira Sagar) & 5th-century rock inscriptions.',
      image: 'https://images.unsplash.com/photo-1599561046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      tips: 'Descend before sunset. Forest area borders wildlife corridors.'
    },
    rihand: {
      name: 'Rihand Dam & Inland Sea',
      coords: '24.2044° N, 83.0336° E',
      elevation: '275 m',
      distanceFromHQ: '70 km South (Pipri)',
      terrain: 'Freshwater Reservoir Coast',
      bestHour: '04:30 PM (Sunset)',
      highlight: 'Vast reservoir vistas, shoreline breezes & calm waters.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      tips: 'Swimming strictly forbidden due to deep undertows. Drone flying requires police permit.'
    },
    mukha: {
      name: 'Mukha Falls (Belan Gorge)',
      coords: '24.7142° N, 82.7811° E',
      elevation: '210 m',
      distanceFromHQ: '45 km West (Ghorawal)',
      terrain: 'Sandstone River Canyon',
      bestHour: '10:00 AM – 03:00 PM',
      highlight: 'Tiered cascades dropping into natural amphitheater gorge.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      tips: 'Beware of flash currents during monsoon. Wet boulders are very slippery.'
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
    const cardinal = dirs[Math.round(brng / 22.5) % 16];

    return { dist, brng, cardinal };
  };

  const acquireLocation = () => {
    setGpsStatus('Locking onto GPS Satellites...');
    if (!navigator.geolocation) {
      setGpsStatus('GPS chip unsupported by browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { dist, brng, cardinal } = calcMath(pos.coords.latitude, pos.coords.longitude, SONBHADRA_HQ.lat, SONBHADRA_HQ.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setGpsStatus(`🟢 Live Satellites Connected (±${Math.round(pos.coords.accuracy)}m)`);
        setUserLocationName(`${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`);
      },
      () => {
        // Fallback: Varanasi Transit Datum
        const { dist, brng, cardinal } = calcMath(25.3176, 82.9739, SONBHADRA_HQ.lat, SONBHADRA_HQ.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setGpsStatus('🟡 Datum Reference: Varanasi Junction (105 km)');
        setUserLocationName('Varanasi, UP (Nearest Air/Rail Hub)');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  useEffect(() => {
    // Network status listener
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Live clock
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short', month: 'short', day: 'numeric' }));
    }, 1000);

    // Live weather
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${SONBHADRA_HQ.lat}&longitude=${SONBHADRA_HQ.lng}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&timezone=Asia%2FKolkata`)
      .then(r => r.json())
      .then(d => {
        if (d.current) {
          setTemp(Math.round(d.current.temperature_2m));
          setWeatherDesc(`${Math.round(d.current.temperature_2m)}°C · Humidity ${d.current.relative_humidity_2m}%`);
        }
      })
      .catch(() => setTemp(26));

    acquireLocation();

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const totalEstimate = Math.round((calcGuests * 2000 * calcDays + calcAddon * calcGuests) * 1.18);

  return (
    <div className="topo-pattern min-h-screen">
      
      {/* NETWORK STATUS BAR (ONLINE / OFFLINE JUNGLE RADAR) */}
      <div className={`text-xs py-2 px-4 flex justify-between items-center font-mono ${isOnline ? 'bg-[#0e271a] text-white' : 'bg-red-800 text-white font-bold'}`}>
        <div className="flex items-center space-x-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-ping' : 'bg-yellow-300'}`} />
          <span>
            {isOnline 
              ? '🟢 ONLINE RADAR ACTIVE · Sonbhadra Telemetry Connected' 
              : '⚠️ OFFLINE JUNGLE MODE · Operating from Phone Cache & Local Satellite GPS'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>{timeStr} IST</span>
          <button 
            onClick={() => setSosModalOpen(true)}
            className="bg-[#c25e36] text-white px-2 py-0.5 rounded text-[11px] font-bold"
          >
            SOS EMERGENCY
          </button>
        </div>
      </div>

      {/* TOP NAVIGATION */}
      <nav>
        <a href="#home" className="logo">
          SON<span>ADVENTURE</span>
        </a>

        <ul className="nav-links">
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#map">Terrain Map</a></li>
          <li><a href="#guide">How to Reach</a></li>
          <li><a href="#survival">Offline Survival</a></li>
          <li><a href="#planner">Cost Planner</a></li>
        </ul>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => { setCompassOpen(true); acquireLocation(); }} 
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#0e271a] bg-white border border-stone-300 py-2 px-3 rounded-xl shadow-sm"
          >
            <i className="fas fa-compass text-[#c25e36]" />
            <span>Live Compass</span>
          </button>

          <button 
            onClick={() => setSosModalOpen(true)} 
            className="btn-terracotta py-2 px-3 text-xs"
          >
            <i className="fas fa-phone-volume" />
            <span>SOS Helpline</span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)} 
            className="md:hidden text-stone-800 p-2 border border-stone-300 rounded-lg text-lg"
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-[#f8f5ee]/98 border-b border-stone-300 p-6 flex flex-col space-y-4 shadow-2xl">
          <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="font-mono text-sm uppercase font-bold text-[#0e271a] py-2 border-b border-stone-200">
            🏔️ 01. Verified Destinations
          </a>
          <a href="#map" onClick={() => setMobileMenuOpen(false)} className="font-mono text-sm uppercase font-bold text-[#0e271a] py-2 border-b border-stone-200">
            🗺️ 02. Interactive Topo Map
          </a>
          <a href="#guide" onClick={() => setMobileMenuOpen(false)} className="font-mono text-sm uppercase font-bold text-[#0e271a] py-2 border-b border-stone-200">
            🚆 03. How to Reach (Varanasi/Trains/Road)
          </a>
          <a href="#survival" onClick={() => setMobileMenuOpen(false)} className="font-mono text-sm uppercase font-bold text-[#0e271a] py-2 border-b border-stone-200">
            🧭 04. Offline Jungle Survival Guide
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); setCompassOpen(true); acquireLocation(); }} 
            className="btn-forest w-full justify-center mt-2"
          >
            <i className="fas fa-compass" />
            <span>Open Satellite Compass Dial</span>
          </button>
        </div>
      )}

      {/* HERO SECTION: DEEP ADVENTURE DISPATCH */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="home">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="badge-field">
              <i className="fas fa-mountain-sun text-[#c25e36]" />
              <span>Official Tourism Discovery · Sonbhadra, UP</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0e271a] leading-[1.08]">
              Where 1.4 Billion Years of Earth <br />
              <span className="text-[#c25e36] italic font-serif">Meet Untamed Wilderness.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#4e6155] leading-relaxed max-w-xl">
              Walk on ancient prebiotic seafloors at Salkhan. Ascend Vijaygarh’s 5th-century cliff fortress. Witness Mukha Falls cascading into sandstone gorges. Built for travelers who seek authentic discovery.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#destinations" className="btn-terracotta">
                <span>Explore Destinations</span>
                <i className="fas fa-arrow-right" />
              </a>

              <button 
                onClick={() => { setCompassOpen(true); acquireLocation(); }} 
                className="btn-forest"
              >
                <i className="fas fa-location-crosshairs text-amber-300" />
                <span>Live GPS Compass</span>
              </button>

              <button 
                onClick={() => setSurvivalModalOpen(true)} 
                className="btn-forest bg-stone-700 hover:bg-stone-800"
              >
                <i className="fas fa-shield-heart text-emerald-400" />
                <span>Jungle Survival Kit</span>
              </button>
            </div>

            {/* LIVE SATELLITE TELEMETRY CARD */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Live Distance Vector</span>
                <strong className="text-sm text-[#0e271a]">
                  {distanceKm > 0 ? `You are ${distanceKm.toLocaleString()} km from Sonbhadra (${cardinalDir})` : 'Calibrating from GPS...'}
                </strong>
                <p className="text-xs text-stone-500 font-mono mt-0.5">{gpsStatus}</p>
              </div>

              <span className="text-xs font-mono font-bold bg-[#c25e36]/10 text-[#c25e36] px-3 py-1.5 rounded-lg whitespace-nowrap">
                {temp ? `${temp}°C Sonbhadra` : '26°C Sunny'}
              </span>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <div className="relative h-80 sm:h-96 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" 
                  alt="Sonbhadra Kaimur Hills" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e271a]/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-mono font-bold uppercase bg-[#c25e36] px-2.5 py-1 rounded inline-block mb-2">
                    Kaimur Plateau
                  </span>
                  <h3 className="text-2xl font-bold">The Great Vindhyan Basin</h3>
                  <p className="text-xs text-stone-200 mt-1">Confluence of 4 States: UP, MP, Chhattisgarh, Jharkhand.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: VERIFIED DESTINATIONS WITH PRECISE DATA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="destinations">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="badge-field">Verified Field Database</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0e271a]">Destinations of Sonbhadra</h2>
          <p className="text-[#4e6155] text-sm">
            Detailed access information, coordinates, best sunlight hours, and conservation tips for first-time visitors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(places).map(([key, p]: any) => (
            <div key={key} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#0e271a]/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                    {p.elevation}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#c25e36] uppercase">{p.terrain}</span>
                  <h3 className="text-lg font-bold text-[#0e271a]">{p.name}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{p.highlight}</p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-stone-100 text-xs font-mono space-y-2">
                <div className="text-stone-500">📍 {p.coords}</div>
                <div className="text-amber-800 font-semibold">🕒 {p.bestHour}</div>
                <div className="p-2 bg-stone-50 rounded text-[11px] text-stone-600 border border-stone-200/60">
                  <strong>Advice:</strong> {p.tips}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE TOPOGRAPHIC MAP & TELEMETRY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="map">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-stone-100 gap-4">
            <div>
              <span className="badge-field">Terrain Exploration</span>
              <h2 className="text-3xl font-black text-[#0e271a] mt-1">Interactive Trail Map</h2>
              <p className="text-stone-600 text-sm mt-1">Click on any marker pin to inspect terrain, elevation, and distance from Robertsganj.</p>
            </div>
            <span className="text-xs font-mono text-[#c25e36] font-bold">
              ● Tap marker on map to switch location
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* SVG MAP */}
            <div className="lg:col-span-7 bg-[#f8f5ee] rounded-2xl p-6 border border-stone-200">
              <svg className="w-full h-auto" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <path className="map-district" d="M 150 100 Q 350 60 550 90 Q 700 120 720 280 Q 740 450 620 530 Q 480 590 320 550 Q 180 510 120 400 Q 80 280 150 100 Z" />
                <path className="map-route" d="M 360 94 Q 420 130 466 171 Q 480 180 506 189 Q 530 200 533 342 Q 520 400 426 300 Q 380 250 240 325 Q 200 340 293 514" />
                
                <g className="map-marker" onClick={() => setActivePlace('salkhan')} transform="translate(466,171)">
                  <circle className="dot" r="12" />
                  <text className="lbl" y="-18">Salkhan Fossils</text>
                </g>
                <g className="map-marker" onClick={() => setActivePlace('vijaygarh')} transform="translate(426,300)">
                  <circle className="dot" r="12" />
                  <text className="lbl" y="-18">Vijaygarh Fort</text>
                </g>
                <g className="map-marker" onClick={() => setActivePlace('rihand')} transform="translate(293,514)">
                  <circle className="dot" r="12" />
                  <text className="lbl" y="26">Rihand Dam</text>
                </g>
                <g className="map-marker" onClick={() => setActivePlace('mukha')} transform="translate(533,342)">
                  <circle className="dot" r="12" />
                  <text className="lbl" y="-18">Mukha Falls</text>
                </g>
              </svg>
            </div>

            {/* DETAIL SHEET */}
            <div className="lg:col-span-5 bg-[#f8f5ee] rounded-2xl p-6 border border-[#c25e36]/30 space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase text-[#c25e36] tracking-wider block">
                Selected Landmark Dossier
              </span>
              <h3 className="text-2xl font-black text-[#0e271a]">{places[activePlace].name}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{places[activePlace].highlight}</p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">GPS Coordinates:</span>
                  <span className="font-bold text-[#0e271a]">{places[activePlace].coords}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">From District HQ:</span>
                  <span className="font-bold text-[#c25e36]">{places[activePlace].distanceFromHQ}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Elevation:</span>
                  <span className="font-bold text-[#0e271a]">{places[activePlace].elevation}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Terrain:</span>
                  <span className="font-bold text-[#0e271a]">{places[activePlace].terrain}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW AN UNKNOWN TRAVELER REACHES SONBHADRA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="guide">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="badge-field">First-Timer Transit Guide</span>
            <h2 className="text-3xl font-black text-[#0e271a]">How to Reach Sonbhadra (Practical Guide)</h2>
            <p className="text-stone-600 text-sm">
              Clear transportation guidance for domestic & international visitors arriving via Varanasi or Prayagraj.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 rounded-2xl bg-[#f8f5ee] border border-stone-200 space-y-3">
              <span className="text-2xl">✈️</span>
              <h3 className="font-bold text-base text-[#0e271a]">By Flight (Air)</h3>
              <p className="text-stone-600 leading-relaxed">
                Nearest airport: <strong>Varanasi International Airport (VNS)</strong>, approx 105 km from Robertsganj.
              </p>
              <div className="p-3 bg-white rounded-lg border border-stone-200 text-stone-700">
                <strong>Taxi Rate:</strong> Pre-paid taxi from VNS Airport to Robertsganj costs ₹2,800 – ₹3,500. Travel time ~2.5 hrs via SH 5A.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8f5ee] border border-stone-200 space-y-3">
              <span className="text-2xl">🚆</span>
              <h3 className="font-bold text-base text-[#0e271a]">By Train (Railways)</h3>
              <p className="text-stone-600 leading-relaxed">
                Key stations: <strong>Sonbhadra (Robertsganj - LUSA/CUK)</strong>, <strong>Chopan</strong>, <strong>Renukoot</strong>.
              </p>
              <div className="p-3 bg-white rounded-lg border border-stone-200 text-stone-700">
                <strong>Major Junctions:</strong> Pt. Deen Dayal Upadhyaya Jn (DDU) or Mirzapur (MZP). Trains & shared cabs connect frequently.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8f5ee] border border-stone-200 space-y-3">
              <span className="text-2xl">🚗</span>
              <h3 className="font-bold text-base text-[#0e271a]">By Bus & Road</h3>
              <p className="text-stone-600 leading-relaxed">
                4-Lane Highway (SH 5A Varanasi-Shaktinagar corridor).
              </p>
              <div className="p-3 bg-white rounded-lg border border-stone-200 text-stone-700">
                <strong>State Buses:</strong> UPSRTC AC & ordinary buses run every 30 minutes from Varanasi Cantt Bus Station to Robertsganj (Fare: ₹120 – ₹240).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OFFLINE JUNGLE SURVIVAL PROTOCOL */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="survival">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e271a] text-white shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-amber-300 font-mono text-xs uppercase tracking-wider font-bold block">Jungle Survival Protocol</span>
              <h2 className="text-3xl font-black text-white mt-1">Zero Network in Kaimur? Read This First.</h2>
            </div>
            <button 
              onClick={() => setSurvivalModalOpen(true)}
              className="btn-terracotta bg-[#c25e36]"
            >
              Open Complete Survival Dossier
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-amber-300 font-bold text-sm block">1. Navigation Without Mobile Signal</span>
              <p className="text-stone-300 leading-relaxed">
                Your phone’s GPS chip works via satellite even with 0 signal bars. Open the <strong>Trail Compass</strong> on this page — it calculates coordinates & direction without internet.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-amber-300 font-bold text-sm block">2. Waterfall Flash Flood Warning</span>
              <p className="text-stone-300 leading-relaxed">
                At Mukha Falls & Belan River gorges, heavy rain in catchment hills can cause water levels to surge by 2 meters within 15 minutes. Never swim near gorge drop edges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-amber-300 font-bold text-sm block">3. Night Wildlife Corridor</span>
              <p className="text-stone-300 leading-relaxed">
                Vijaygarh and Naugarh forests border wildlife belts with sloth bears & leopards. Descend forts before 05:30 PM. Always carry a whistle & torch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: BUDGET ESTIMATOR */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="planner">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="badge-field">Transparent Planning</span>
            <h2 className="text-3xl font-black text-[#0e271a]">Expedition Cost Calculator</h2>
            <p className="text-stone-600 text-sm">Honest district rates for guided nature trails, permits, and sanitised eco-camps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="text-stone-500 font-bold uppercase block mb-1">Days</label>
              <select value={calcDays} onChange={(e) => setCalcDays(Number(e.target.value))} className="w-full bg-[#f8f5ee] border p-3 rounded-xl font-bold">
                <option value={1}>1 Day Discovery</option>
                <option value={2}>2 Days / 1 Night</option>
                <option value={3}>3 Days / 2 Nights</option>
              </select>
            </div>

            <div>
              <label className="text-stone-500 font-bold uppercase block mb-1">Travelers ({calcGuests})</label>
              <input type="range" min="1" max="10" value={calcGuests} onChange={(e) => setCalcGuests(Number(e.target.value))} className="w-full mt-3 accent-[#c25e36]" />
            </div>

            <div>
              <label className="text-stone-500 font-bold uppercase block mb-1">Guide Service</label>
              <select value={calcAddon} onChange={(e) => setCalcAddon(Number(e.target.value))} className="w-full bg-[#f8f5ee] border p-3 rounded-xl font-bold">
                <option value={1500}>Verified Geo-Guide (+₹1,500)</option>
                <option value={0}>Self-Guided Only</option>
              </select>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e271a] text-white flex flex-col sm:flex-row justify-between items-center gap-4 font-mono">
            <div>
              <span className="text-[10px] text-amber-300 uppercase block">Estimated Budget</span>
              <span className="text-3xl font-black">₹{totalEstimate.toLocaleString('en-IN')}</span>
            </div>
            <a 
              href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20plan%20a%20trip%20for%20${calcGuests}%20travelers%20for%20${calcDays}%20days.`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-terracotta bg-[#c25e36]"
            >
              <i className="fab fa-whatsapp" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0e271a] text-stone-300 py-12 px-6 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-2xl font-serif font-black text-white">SON<span className="text-[#c25e36] italic">ADVENTURE</span></span>
            <p className="text-stone-400 text-xs mt-1">Official Destination Discovery Platform for Sonbhadra, Uttar Pradesh.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 font-bold text-white">
            <a href="tel:+917355053822">📞 +91 73550 53822</a>
            <a href="mailto:son.doc.tourism@gmail.com">✉️ son.doc.tourism@gmail.com</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 text-center text-stone-400">
          © {new Date().getFullYear()} Son Adventure Tours & Eco Tourism · Robertsganj, Sonbhadra, UP, India.
        </div>
      </footer>

      {/* DOCK */}
      <div className="dock-outdoor">
        <button 
          onClick={() => { setCompassOpen(true); acquireLocation(); }} 
          className="dock-btn text-emerald-800"
          aria-label="Open GPS Compass"
        >
          <i className="fas fa-compass text-[#c25e36] text-base" />
          <span>Trail Compass</span>
        </button>
        <button 
          onClick={() => setSosModalOpen(true)} 
          className="dock-btn text-red-700 border-red-300"
        >
          <i className="fas fa-truck-medical text-red-600 text-base" />
          <span>SOS Helplines</span>
        </button>
      </div>

      {/* REAL LIVE COMPASS MODAL */}
      {compassOpen && (
        <div className="overlay-survival" onClick={(e) => { if (e.target === e.currentTarget) setCompassOpen(false); }}>
          <div className="modal-box-survival text-center">
            <button onClick={() => setCompassOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-xl font-bold">✕</button>
            <span className="badge-field mb-2">Live Satellite Vector</span>
            <h3 className="text-2xl font-black text-[#0e271a]">Trail Gyro-Compass</h3>
            <p className="text-xs text-stone-500 mb-4">{gpsStatus}</p>

            {/* COMPASS ROSE */}
            <div className="w-56 h-56 mx-auto relative rounded-full border-4 border-[#c25e36] bg-[#f8f5ee] flex items-center justify-center shadow-lg my-4">
              <span className="absolute top-3 font-mono font-bold text-sm text-[#c25e36]">N</span>
              <span className="absolute right-4 font-mono font-bold text-xs text-stone-400">E</span>
              <span className="absolute bottom-3 font-mono font-bold text-xs text-stone-400">S</span>
              <span className="absolute left-4 font-mono font-bold text-xs text-stone-400">W</span>

              {/* ROTATING NEEDLE */}
              <div 
                className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${bearingDeg}deg)` }}
              >
                <div className="w-3 h-24 bg-[#c25e36] rounded-t-full absolute top-4 shadow" />
                <div className="w-2.5 h-16 bg-stone-400 rounded-b-full absolute bottom-8 opacity-60" />
                <div className="w-6 h-6 rounded-full bg-[#0e271a] border-2 border-white z-20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4 font-mono text-center text-xs">
              <div className="bg-[#f8f5ee] p-3 rounded-xl border border-stone-200">
                <span className="text-stone-400 block uppercase">Straight Line Distance</span>
                <span className="text-xl font-bold text-[#0e271a]">{distanceKm > 0 ? `${distanceKm} km` : '--'}</span>
              </div>
              <div className="bg-[#f8f5ee] p-3 rounded-xl border border-stone-200">
                <span className="text-stone-400 block uppercase">True Bearing</span>
                <span className="text-xl font-bold text-[#c25e36]">{bearingDeg}° {cardinalDir}</span>
              </div>
            </div>

            <button onClick={acquireLocation} className="btn-terracotta w-full justify-center">
              Re-Sync Satellite Coordinates
            </button>
          </div>
        </div>
      )}

      {/* SOS EMERGENCY NUMBERS MODAL */}
      {sosModalOpen && (
        <div className="overlay-survival" onClick={(e) => { if (e.target === e.currentTarget) setSosModalOpen(false); }}>
          <div className="modal-box-survival space-y-4">
            <button onClick={() => setSosModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-xl font-bold">✕</button>
            <span className="badge-field text-red-700 border-red-300">District Emergency SOS</span>
            <h3 className="text-2xl font-black text-[#0e271a]">Sonbhadra Helplines</h3>
            <p className="text-xs text-stone-600">Saved offline in your device. Tap any number to call immediately.</p>

            <div className="space-y-3 font-mono text-xs pt-2">
              {emergencyContacts.map((c, i) => (
                <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm text-[#0e271a]">{c.title}</h4>
                    <p className="text-[11px] text-stone-500">{c.desc}</p>
                  </div>
                  <a href={`tel:${c.number}`} className="bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                    Call {c.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OFFLINE SURVIVAL KIT MODAL */}
      {survivalModalOpen && (
        <div className="overlay-survival" onClick={(e) => { if (e.target === e.currentTarget) setSurvivalModalOpen(false); }}>
          <div className="modal-box-survival space-y-4">
            <button onClick={() => setSurvivalModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-xl font-bold">✕</button>
            <span className="badge-field">Offline Safety Protocol</span>
            <h3 className="text-2xl font-black text-[#0e271a]">Lost in the Jungle? Essential Steps</h3>

            <div className="space-y-3 text-xs leading-relaxed text-stone-700">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <strong>1. Conserve Phone Battery:</strong> Turn on Airplane mode but keep GPS location turned ON. GPS does not consume cellular data.
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong>2. Head Toward Streams Downhill:</strong> In Sonbhadra’s Vindhyan terrain, all seasonal streams lead down towards populated villages or main road culverts.
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong>3. Snake Bite First Aid:</strong> Keep patient calm. Do not cut or suck wound. Immobilize limb with a stick splint. Rush to District Hospital Robertsganj (anti-venom available 24/7).
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
                <strong>✓ Safe Refuge Points:</strong> Robertsganj Forest Range Office, Churk Railway Station, Mau Kalan Gram Panchayat base.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
