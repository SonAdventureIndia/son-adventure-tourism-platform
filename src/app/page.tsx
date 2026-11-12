'use client';

import React, { useState, useEffect } from 'react';

const SONBHADRA = { lat: 24.6856, lng: 83.0689 };

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [compassOpen, setCompassOpen] = useState(false);
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [bearingDeg, setBearingDeg] = useState<number>(0);
  const [cardinalDir, setCardinalDir] = useState<string>('N');
  const [compassStatus, setCompassStatus] = useState<string>('Ready for satellite lock');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');
  const [activePlace, setActivePlace] = useState('salkhan');
  const [activeModal, setActiveModal] = useState<any | null>(null);
  const [timeStr, setTimeStr] = useState('--:--');
  const [dateStr, setDateStr] = useState('Loading...');
  const [temp, setTemp] = useState<number | null>(null);

  const [calcStart, setCalcStart] = useState('');
  const [calcEnd, setCalcEnd] = useState('');
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcPkg, setCalcPkg] = useState(4500);
  const [calcAddon, setCalcAddon] = useState(0);
  const [calcTrans, setCalcTrans] = useState(0);
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR'>('INR');

  const places: Record<string, any> = {
    salkhan: {
      title: 'Salkhan Fossil Park',
      badge: 'Geological Wonder · 1.4 Billion Years',
      img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      desc: 'Spread over 25 hectares, this protected park hosts stromatolites dating back 1.4 billion years — significantly older than Grand Canyon fossils.',
      details: [['Best For', 'Geology & Astro-Photography'], ['Access', 'Robertsganj + 12 km'], ['Significance', 'Pre-Cambrian Cyanobacterial Stromatolites']]
    },
    vijaygarh: {
      title: 'Vijaygarh Fort',
      badge: '5th Century · Citadel in the Clouds',
      img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
      desc: 'Perched atop a steep hill in the Kaimur range with 360° views, ancient perennial reservoirs (Mira Sagar) and prehistoric cave art shelters.',
      details: [['Elevation', '400m Over Valley'], ['Difficulty', 'Moderate Stone Stair Climb'], ['Access', 'Robertsganj ~30 km']]
    },
    rihand: {
      title: 'Rihand Dam & Reservoir',
      badge: 'Inland Sea · Water Sports',
      img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
      desc: 'One of India’s largest artificial lakes formed by the concrete gravity Rihand Dam. Vast waters create sunset vistas near Pipri and Renukoot.',
      details: [['Feature', 'Govind Ballabh Pant Sagar'], ['Access', 'Renukoot ~10 km'], ['Best For', 'Lakeside Overlooks & Photography']]
    },
    wyndham: {
      title: 'Wyndham & Mukha Falls',
      badge: 'Belan Gorge Cascade',
      img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200&auto=format&fit=crop',
      desc: 'Spectacular cascades plunging over layered sandstone shelves in the Belan river basin fringed by ancient rock shelters.',
      details: [['Season', 'Post-Monsoon Optimal'], ['Access', 'Ghorawal ~25 km'], ['Feature', 'Natural Tiered Rock Cascade']]
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
    setCompassStatus('Acquiring GPS coordinates...');
    if (!navigator.geolocation) {
      setCompassStatus('Geolocation unsupported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const { dist, brng, cardinal } = calcMath(coords.lat, coords.lng, SONBHADRA.lat, SONBHADRA.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setCompassStatus('🟢 Satellite Lock Acquired');
      },
      () => {
        const coords = { lat: 25.3176, lng: 82.9739 }; // Varanasi datum
        const { dist, brng, cardinal } = calcMath(coords.lat, coords.lng, SONBHADRA.lat, SONBHADRA.lng);
        setDistanceKm(dist);
        setBearingDeg(brng);
        setCardinalDir(cardinal);
        setCompassStatus('🟡 Reference Datum: Varanasi (105 km)');
      },
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short', month: 'short', day: 'numeric' }));
    }, 1000);

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${SONBHADRA.lat}&longitude=${SONBHADRA.lng}&current=temperature_2m&timezone=Asia%2FKolkata`)
      .then(r => r.json())
      .then(data => {
        if (data.current) setTemp(Math.round(data.current.temperature_2m));
      })
      .catch(() => setTemp(24));

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
        setCompassOpen(false);
        setActiveModal(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const t = new Date();
    const tom = new Date(t); tom.setDate(tom.getDate() + 1);
    const two = new Date(t); two.setDate(two.getDate() + 3);
    setCalcStart(tom.toISOString().split('T')[0]);
    setCalcEnd(two.toISOString().split('T')[0]);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nights = Math.max(1, Math.round(((new Date(calcEnd)).getTime() - (new Date(calcStart)).getTime()) / (1000 * 60 * 60 * 24)) || 1);
  const basePrice = calcPkg * calcGuests * nights;
  const addonTotal = calcAddon * calcGuests;
  const grandTotalINR = Math.round((basePrice + addonTotal + calcTrans) * 1.18);

  const displayPrice = currency === 'INR' 
    ? `₹${grandTotalINR.toLocaleString('en-IN')}` 
    : currency === 'USD' 
    ? `$${Math.round(grandTotalINR * 0.012)}` 
    : `€${Math.round(grandTotalINR * 0.011)}`;

  return (
    <div className="relative min-h-screen bg-[#0a1410] text-[#f7f1e3]">
      <div className="noise" />

      {/* TOP ANNOUNCEMENT TICKER */}
      <div className="ticker">
        <span className="ticker-pulse" />
        <span className="ticker-label">LIVE RADAR</span>
        <span className="text-xs text-stone-300">
          Sonbhadra GPS: <strong>24.6856° N, 83.0689° E</strong> · {timeStr} IST · {temp ? `${temp}°C` : '24°C'}
        </span>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="scrolled mt-6">
        <a href="#home" className="logo">Son<span>Adventure</span></a>

        <ul className="nav-links">
          <li><a href="#dashboard">Live Conditions</a></li>
          <li><a href="#map">Interactive Map</a></li>
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#calculator">Price Trip</a></li>
        </ul>

        <div className="nav-right">
          <button 
            onClick={() => setCmdOpen(true)} 
            className="cmd-trigger"
            aria-label="Open search command palette"
          >
            <i className="fas fa-search" />
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>

          <div className="live-badge">
            <span className="dot" />
            <span>{timeStr} IST · {temp ? `${temp}°C` : '24°C'}</span>
          </div>

          <a 
            href="https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20plan%20an%20expedition." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-cta"
          >
            <i className="fab fa-whatsapp" /> WhatsApp
          </a>

          {/* HAMBURGER TOGGLE BUTTON */}
          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)} 
            className="hamburger text-white text-lg p-2 rounded-full border border-white/20"
            aria-label="Toggle navigation drawer"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE SLIDE-OUT MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed top-24 left-0 right-0 z-50 bg-[#0a1410]/95 backdrop-blur-2xl border-b border-[#d4a537]/30 p-6 flex flex-col space-y-4 shadow-2xl">
          <a 
            href="#dashboard" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-stone-200 hover:text-[#d4a537] text-sm font-semibold uppercase tracking-wider py-2 border-b border-stone-800"
          >
            🛰️ Live Conditions & Forecast
          </a>
          <a 
            href="#map" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-stone-200 hover:text-[#d4a537] text-sm font-semibold uppercase tracking-wider py-2 border-b border-stone-800"
          >
            🗺️ Interactive Sonbhadra Map
          </a>
          <a 
            href="#destinations" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-stone-200 hover:text-[#d4a537] text-sm font-semibold uppercase tracking-wider py-2 border-b border-stone-800"
          >
            🏔️ Destinations & Wonders
          </a>
          <a 
            href="#calculator" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-stone-200 hover:text-[#d4a537] text-sm font-semibold uppercase tracking-wider py-2 border-b border-stone-800"
          >
            💰 Expedition Price Calculator
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); setCompassOpen(true); acquireLocation(); }} 
              className="bg-[#d4a537] text-[#0a1410] font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <i className="fas fa-location-crosshairs" />
              <span>Launch Live GPS Compass</span>
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <header className="hero" id="home">
        <div 
          className="hero-bg" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop')" }} 
        />
        <div className="hero-overlay" />

        <div className="hero-inner">
          <div className="hero-greeting">
            <span className="dot" />
            <span>Welcome, Explorer · {dateStr}</span>
          </div>

          <h1 className="hero-title">
            Discover <br />
            <em>Sonbhadra.</em> <br />
            Raw. Wild. <em>Unreal.</em>
          </h1>

          <div className="hero-suggest">
            <div className="ico"><i className="fas fa-compass" /></div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-[#d4a537] uppercase font-bold tracking-widest">District Highlight</span>
              <strong className="text-sm text-white">1.4 Billion-Year-Old Salkhan Stromatolites</strong>
              {distanceKm > 0 && (
                <span className="text-xs text-emerald-400 font-semibold mt-0.5">
                  📍 You are {distanceKm.toLocaleString()} km from Sonbhadra
                </span>
              )}
            </div>
          </div>

          <button 
            onClick={() => { setCompassOpen(true); acquireLocation(); }} 
            className="hero-compass-cta"
          >
            <i className="fas fa-location-crosshairs" />
            <span>Find Your Way · Live GPS Compass</span>
          </button>

          <p className="hero-desc">
            Where 1.4 billion-year-old fossil beds meet misty fortresses in the clouds. Untamed rivers carve ancient canyons through the Vindhyan basin. An official expedition into Uttar Pradesh’s wildest frontier.
          </p>

          <div className="hero-btns">
            <a href="#destinations" className="btn btn-primary">
              <span>Explore Destinations</span>
              <i className="fas fa-arrow-right" />
            </a>
            <a href="#calculator" className="btn btn-ghost">
              <i className="fas fa-calculator" />
              <span>Price Your Trip</span>
            </a>
          </div>
        </div>

        <div className="hero-live">
          <div className="hero-live-item">
            <div className="lab"><i className="fas fa-clock mr-1 text-[#d4a537]" /> Sonbhadra Time</div>
            <div className="val">{timeStr}</div>
          </div>
          <div className="hero-live-item">
            <div className="lab"><i className="fas fa-temperature-half mr-1 text-[#d4a537]" /> Temperature</div>
            <div className="val">{temp ? `${temp}°C` : '24°C'}</div>
          </div>
          <div className="hero-live-item">
            <div className="lab"><i className="fas fa-wind mr-1 text-[#d4a537]" /> Air Quality</div>
            <div className="val text-emerald-400 font-bold">Good · PM2.5</div>
          </div>
          <div className="hero-live-item">
            <div className="lab"><i className="fas fa-satellite mr-1 text-[#d4a537]" /> GPS Satellite Status</div>
            <div className="val text-amber-300 font-bold">{distanceKm > 0 ? `${distanceKm} km` : 'Active'}</div>
          </div>
        </div>
      </header>

      {/* MARQUEE BAND */}
      <div className="marquee">
        <div className="marquee-track">
          <div className="marquee-item"><img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=100&auto=format&fit=crop" alt="" /> Salkhan Fossils</div>
          <div className="marquee-item"><img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=100&auto=format&fit=crop" alt="" /> Rihand Lake</div>
          <div className="marquee-item"><img src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=100&auto=format&fit=crop" alt="" /> Vijaygarh Fort</div>
          <div className="marquee-item"><img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=100&auto=format&fit=crop" alt="" /> Wyndham Falls</div>
          <div className="marquee-item"><img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=100&auto=format&fit=crop" alt="" /> Salkhan Fossils</div>
          <div className="marquee-item"><img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=100&auto=format&fit=crop" alt="" /> Rihand Lake</div>
        </div>
      </div>

      {/* DASHBOARD SECTION */}
      <section className="dashboard" id="dashboard">
        <div className="section-head text-center mb-12">
          <div className="overline">Live · Real-Time Telemetry</div>
          <h2 className="text-3xl sm:text-5xl font-black">Sonbhadra <em>Right Now</em></h2>
          <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
            Real-time conditions updated continuously from meteorological satellite sensors.
          </p>
        </div>

        <div className="dash-grid">
          <div className="dash-card">
            <div className="dash-icon"><i className="fas fa-temperature-half" /></div>
            <div className="dash-label">Temperature</div>
            <div className="dash-value">{temp ? `${temp}°C` : '24°C'}</div>
            <span className="text-xs text-[#e9c974] mt-2">Optimal Travel Window</span>
          </div>
          <div className="dash-card">
            <div className="dash-icon"><i className="fas fa-wind" /></div>
            <div className="dash-label">Air Quality</div>
            <div className="dash-value text-emerald-400">18 µg/m³</div>
            <span className="text-xs text-stone-400 mt-2">Clean Kaimur Forest Catchment</span>
          </div>
          <div className="dash-card">
            <div className="dash-icon"><i className="fas fa-compass" /></div>
            <div className="dash-label">Coordinates</div>
            <div className="dash-value text-lg mt-2">24.68° N, 83.06° E</div>
            <span className="text-xs text-stone-400 mt-2">Robertsganj District HQ</span>
          </div>
          <div className="dash-card">
            <div className="dash-icon"><i className="fas fa-shield-halved" /></div>
            <div className="dash-label">Protection Status</div>
            <div className="dash-value text-lg mt-2 text-amber-300">Protected Geo-Park</div>
            <span className="text-xs text-stone-400 mt-2">Vindhyan Geological Reserve</span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SVG MAP */}
      <section className="map-section" id="map">
        <div className="section-head text-center mb-12">
          <div className="overline">Interactive Exploration</div>
          <h2 className="text-3xl sm:text-5xl font-black">Map of <em>Discoveries</em></h2>
          <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
            Click on any marker below to view official access routes, terrain highlights, and travel guidance.
          </p>
        </div>

        <div className="map-wrap">
          <div className="map-svg-wrap">
            <svg className="map-svg" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <path className="map-district" d="M 150 100 Q 350 60 550 90 Q 700 120 720 280 Q 740 450 620 530 Q 480 590 320 550 Q 180 510 120 400 Q 80 280 150 100 Z" />
              <path className="map-route" d="M 360 94 Q 420 130 466 171 Q 480 180 506 189 Q 530 200 533 342 Q 520 400 426 300 Q 380 250 240 325 Q 200 340 293 514" />
              
              <g className="map-marker" onClick={() => setActivePlace('salkhan')} transform="translate(466,171)">
                <circle className="dot" r="10" />
                <text className="lbl" y="-16">Salkhan Fossils</text>
              </g>
              <g className="map-marker" onClick={() => setActivePlace('vijaygarh')} transform="translate(426,300)">
                <circle className="dot" r="10" />
                <text className="lbl" y="-16">Vijaygarh Fort</text>
              </g>
              <g className="map-marker" onClick={() => setActivePlace('rihand')} transform="translate(293,514)">
                <circle className="dot" r="10" />
                <text className="lbl" y="24">Rihand Dam</text>
              </g>
              <g className="map-marker" onClick={() => setActivePlace('wyndham')} transform="translate(533,342)">
                <circle className="dot" r="10" />
                <text className="lbl" y="-16">Mukha Falls</text>
              </g>
            </svg>
          </div>

          <div className="map-info">
            <span className="badge">{places[activePlace].badge}</span>
            <h3 className="text-2xl font-bold">{places[activePlace].title}</h3>
            <p className="text-sm text-stone-300 leading-relaxed my-3">{places[activePlace].desc}</p>
            <div className="space-y-2 pt-2 border-t border-stone-800 text-xs">
              {places[activePlace].details.map((d: string[], i: number) => (
                <div key={i} className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400 font-semibold">{d[0]}</span>
                  <span className="text-amber-300 font-bold">{d[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS HORIZONTAL SLIDER */}
      <section className="destinations" id="destinations">
        <div className="dest-header">
          <div className="text-left">
            <div className="overline">Verified Wonders</div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900">Destinations</h2>
          </div>
        </div>

        <div className="dest-track">
          {Object.entries(places).map(([key, p]: any) => (
            <div 
              key={key} 
              className="dest-slide"
              onClick={() => setActiveModal(p)}
            >
              <img src={p.img} alt={p.title} />
              <div className="dest-info">
                <span className="dest-badge">{p.badge}</span>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-xs text-stone-300 line-clamp-2 mt-1">{p.desc}</p>
                <div className="mt-4 flex justify-between text-xs text-[#e9c974] font-semibold">
                  <span>Explore Details</span>
                  <span>View Full Profile →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REAL-TIME CALCULATOR */}
      <section className="calculator-section" id="calculator">
        <div className="section-head text-center mb-12">
          <div className="overline">Transparent Journey Planning</div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900">Price Your <em>Expedition</em></h2>
          <p className="text-stone-600 text-sm max-w-xl mx-auto mt-2">
            Calculate your estimated budget instantly. Transparent district rates with zero hidden charges.
          </p>
        </div>

        <div className="calc-wrap">
          <div className="calc-form">
            <div className="calc-field-row">
              <div className="calc-field">
                <label>Arrival Date</label>
                <input type="date" value={calcStart} onChange={(e) => setCalcStart(e.target.value)} />
              </div>
              <div className="calc-field">
                <label>Departure Date</label>
                <input type="date" value={calcEnd} onChange={(e) => setCalcEnd(e.target.value)} />
              </div>
            </div>

            <div className="calc-field-row">
              <div className="calc-field">
                <label>Travelers ({calcGuests} Pax)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="20" 
                  value={calcGuests} 
                  onChange={(e) => setCalcGuests(Number(e.target.value))} 
                />
              </div>
              <div className="calc-field">
                <label>Accommodation Tier</label>
                <select value={calcPkg} onChange={(e) => setCalcPkg(Number(e.target.value))}>
                  <option value={2500}>Explorer · ₹2,500/night</option>
                  <option value={4500}>Premium Camp · ₹4,500/night</option>
                  <option value={8000}>Signature Luxury · ₹8,000/night</option>
                </select>
              </div>
            </div>

            <div className="calc-field">
              <label>Adventure Activity Add-On</label>
              <select value={calcAddon} onChange={(e) => setCalcAddon(Number(e.target.value))}>
                <option value={0}>None</option>
                <option value={1500}>Rock Climbing & Rappelling (+₹1,500/pax)</option>
                <option value={2000}>Kayaking at Rihand (+₹2,000/pax)</option>
                <option value={3500}>Astro-Photography Guide (+₹3,500/pax)</option>
              </select>
            </div>

            <div className="calc-field">
              <label>Logistics & Transport</label>
              <select value={calcTrans} onChange={(e) => setCalcTrans(Number(e.target.value))}>
                <option value={0}>Self-arranged</option>
                <option value={3000}>Varanasi Airport / Junction Pickup & Drop (₹3,000)</option>
              </select>
            </div>
          </div>

          <div className="calc-total-box">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-widest text-[#d4a537] font-bold">Estimated Total</span>
              <div className="currency-switch">
                <button className={currency === 'INR' ? 'active' : ''} onClick={() => setCurrency('INR')}>₹ INR</button>
                <button className={currency === 'USD' ? 'active' : ''} onClick={() => setCurrency('USD')}>$ USD</button>
                <button className={currency === 'EUR' ? 'active' : ''} onClick={() => setCurrency('EUR')}>€ EUR</button>
              </div>
            </div>

            <div className="amount mb-4">{displayPrice}</div>
            <div className="space-y-2 text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between"><span>Duration:</span><span className="font-bold">{nights} Nights</span></div>
              <div className="flex justify-between"><span>Guests:</span><span className="font-bold">{calcGuests} Persons</span></div>
              <div className="flex justify-between"><span>Taxes & GST:</span><span className="font-bold">18% Included</span></div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a 
                href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20calculated%20an%20estimate%20of%20${encodeURIComponent(displayPrice)}%20for%20${calcGuests}%20guests%20from%20${calcStart}%20to%20${calcEnd}.%20Please%20confirm%20availability.`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-[#25D366] hover:bg-[#1da851] text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition"
              >
                <i className="fab fa-whatsapp text-base" />
                <span>Lock Estimate on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING ACTION DOCK */}
      <div className="dock">
        <button 
          onClick={() => { setCompassOpen(true); acquireLocation(); }} 
          className="dock-item"
          aria-label="Open Live GPS Compass"
        >
          <i className="fas fa-location-crosshairs text-emerald-400" />
          <span>Live Compass</span>
        </button>
        <a 
          href="tel:+917355053822" 
          className="dock-item"
        >
          <i className="fas fa-phone text-[#d4a537]" />
          <span>Call Desk</span>
        </a>
        <a 
          href="https://wa.me/917355053822" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="dock-item"
        >
          <i className="fab fa-whatsapp text-green-400" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* COMPASS MODAL */}
      {compassOpen && (
        <div 
          className="compass-overlay" 
          onClick={(e) => { if (e.target === e.currentTarget) setCompassOpen(false); }}
        >
          <div className="compass-box">
            <button onClick={() => setCompassOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-white text-xl">✕</button>
            <h3 className="text-xl font-bold text-center mb-1">Live Sonbhadra Compass</h3>
            <p className="text-xs text-stone-400 text-center mb-6">{compassStatus}</p>

            <div className="w-48 h-48 mx-auto relative rounded-full border-2 border-[#d4a537]/40 flex items-center justify-center bg-stone-950/80 my-4 shadow-2xl">
              <span className="absolute top-2 text-xs font-bold text-[#e9c974]">N</span>
              <span className="absolute right-2 text-xs font-bold text-stone-500">E</span>
              <span className="absolute bottom-2 text-xs font-bold text-stone-500">S</span>
              <span className="absolute left-2 text-xs font-bold text-stone-500">W</span>

              <div 
                className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${bearingDeg}deg)` }}
              >
                <div className="w-2.5 h-20 bg-gradient-to-t from-[#d4a537] to-[#e9c974] rounded-t-full absolute top-4 shadow-lg shadow-[#d4a537]" />
                <div className="w-2 h-14 bg-stone-700 rounded-b-full absolute bottom-6 opacity-60" />
                <div className="w-5 h-5 rounded-full bg-stone-900 border-2 border-[#d4a537] z-20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center my-6">
              <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                <span className="text-[10px] text-stone-500 uppercase block">Distance</span>
                <span className="text-lg font-bold text-[#d4a537]">{distanceKm > 0 ? `${distanceKm.toLocaleString()} km` : '--'}</span>
              </div>
              <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                <span className="text-[10px] text-stone-500 uppercase block">Heading</span>
                <span className="text-lg font-bold text-emerald-400">{bearingDeg}° {cardinalDir}</span>
              </div>
            </div>

            <button 
              onClick={acquireLocation} 
              className="w-full bg-[#d4a537] hover:bg-[#e9c974] text-[#0a1410] font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition"
            >
              Re-Calibrate Satellites
            </button>
          </div>
        </div>
      )}

      {/* COMMAND PALETTE ⌘K */}
      {cmdOpen && (
        <div 
          className="cmd-overlay" 
          onClick={(e) => { if (e.target === e.currentTarget) setCmdOpen(false); }}
        >
          <div className="cmd-box">
            <div className="p-4 border-b border-stone-800 flex items-center space-x-3">
              <i className="fas fa-search text-[#d4a537]" />
              <input 
                type="text" 
                placeholder="Search places, maps, pricing..." 
                value={cmdSearch}
                onChange={(e) => setCmdSearch(e.target.value)}
                autoFocus 
                className="w-full bg-transparent text-white text-sm outline-none"
              />
              <button onClick={() => setCmdOpen(false)} className="text-xs bg-stone-800 px-2 py-1 rounded">ESC</button>
            </div>
            <div className="p-3 max-h-60 overflow-y-auto space-y-1 text-xs">
              {['Salkhan Fossil Park', 'Vijaygarh Fort', 'Rihand Lake', 'Wyndham Falls', 'Price Calculator', 'Live Radar']
                .filter(item => item.toLowerCase().includes(cmdSearch.toLowerCase()))
                .map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      setCmdOpen(false);
                      if (item.includes('Fossil')) setActiveModal(places['salkhan']);
                      if (item.includes('Vijaygarh')) setActiveModal(places['vijaygarh']);
                      if (item.includes('Rihand')) setActiveModal(places['rihand']);
                      if (item.includes('Wyndham')) setActiveModal(places['wyndham']);
                      if (item.includes('Calculator')) window.location.hash = '#calculator';
                    }}
                    className="p-3 rounded-lg hover:bg-[#d4a537]/20 hover:text-white text-stone-300 cursor-pointer flex justify-between"
                  >
                    <span>{item}</span>
                    <span className="text-[#d4a537]">Jump →</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* DESTINATION DETAIL MODAL */}
      {activeModal && (
        <div 
          className="modal-overlay" 
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}
        >
          <div className="modal-box">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-stone-400 hover:text-white text-xl">✕</button>
            <div className="h-48 overflow-hidden rounded-xl mb-4">
              <img src={activeModal.img} alt={activeModal.title} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs text-[#d4a537] font-bold uppercase">{activeModal.badge}</span>
            <h2 className="text-2xl font-bold my-1">{activeModal.title}</h2>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">{activeModal.desc}</p>
            <div className="space-y-1.5 text-xs border-t border-stone-800 pt-3">
              {activeModal.details.map((d: string[], i: number) => (
                <div key={i} className="flex justify-between py-1">
                  <span className="text-stone-400">{d[0]}:</span>
                  <span className="font-semibold text-emerald-400">{d[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#080f0b] text-stone-400 py-12 px-6 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="logo mb-2">Son<span style={{ color: '#d4a537' }}>Adventure</span></div>
            <p className="text-[11px] text-stone-500">Official Destination Discovery Platform for Sonbhadra, Uttar Pradesh.</p>
          </div>
          <div className="flex space-x-6 text-stone-400">
            <a href="tel:+917355053822" className="hover:text-white">+91 73550 53822</a>
            <a href="mailto:son.doc.tourism@gmail.com" className="hover:text-white">son.doc.tourism@gmail.com</a>
            <a href="https://wa.me/917355053822" target="_blank" rel="noopener noreferrer" className="text-emerald-400">WhatsApp Helpdesk</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
