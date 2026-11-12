export default function HomePage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: String.raw`<a href="#main" class="skip-link">Skip to content</a>
<div class="noise" aria-hidden="true"></div>
<div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
<div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>
<div class="cursor-trail" id="cursorTrail" aria-hidden="true"></div>
<div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>

<!-- TICKER -->
<div class="ticker" id="ticker">
  <span class="ticker-pulse"></span>
  <span class="ticker-label">LIVE</span>
  <div class="ticker-track" id="tickerTrack"></div>
</div>

<!-- LOADER -->
<div class="loader" id="loader">
  <div class="loader-greeting" id="loaderGreeting">Curating Experience</div>
  <div class="loader-mark">Son<span>Adventure</span></div>
  <div class="loader-bar"><div class="loader-fill"></div></div>
  <div class="loader-sub">ROBERTSGANJ · SONBHADRA · UP</div>
</div>

<!-- NAV -->
<nav id="navbar">
  <a href="#home" class="logo">Son<span>Adventure</span></a>
  <ul class="nav-links" id="navLinks">
    <li><a href="#dashboard" data-section="dashboard">Live</a></li>
    <li><a href="#team" data-section="team">Team</a></li>
    <li><a href="#map" data-section="map">Map</a></li>
    <li><a href="#destinations" data-section="destinations">Places</a></li>
    <li><a href="#calculator" data-section="calculator">Book</a></li>
    <li><a href="#guide" data-section="guide">Guide</a></li>
  </ul>
  <div class="nav-right">
    <button class="cmd-trigger" onclick="openCommandPalette()" aria-label="Open command palette">
      <i class="fas fa-search"></i>
      <span>Search</span>
      <kbd>⌘K</kbd>
    </button>
    <div class="lang-toggle" id="langToggle">
      <button data-lang="en" class="active">EN</button>
      <button data-lang="hi">हिं</button>
    </div>
    <div class="live-badge"><span class="dot"></span><span id="navTime">--:--</span> IST · <span id="navTemp">--°C</span></div>
    <a href="https://wa.me/917355053822?text=Hi%20Son%20Adventure!%20I%20want%20to%20plan%20a%20trip." target="_blank" rel="noopener" class="nav-cta"><i class="fab fa-whatsapp"></i> WhatsApp</a>
    <button class="hamburger" id="hamburger" aria-label="Menu"><i class="fas fa-bars"></i></button>
  </div>
</nav>

<main id="main">

<header class="hero" id="home">
  <div class="hero-bg" id="heroBg" style="background-image:url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop')"></div>
  <canvas id="particles" aria-hidden="true"></canvas>
  <div class="hero-aurora" aria-hidden="true"><span></span></div>
  <div class="hero-overlay"></div>
  <div class="hero-inner">
    <div class="hero-greeting"><span class="dot"></span><span id="heroGreeting">Welcome, Explorer</span></div>
    <h1 class="hero-title">
      <span class="line"><span>Discover</span></span>
      <span class="line"><span style="animation-delay:.2s"><em>Sonbhadra.</em></span></span>
      <span class="line"><span style="animation-delay:.4s">Raw. Wild. <em>Unreal.</em></span></span>
    </h1>
    <div class="hero-suggest">
      <div class="ico"><i class="fas fa-compass" id="suggestIcon"></i></div>
      <div class="info">
        <span id="suggestLabel">Loading Live Conditions</span>
        <strong id="suggestText">Fetching real-time data...</strong>
        <div class="hero-distance" id="heroDistance"></div>
      </div>
    </div>
    <div class="hero-tz-pill" id="tzPill">
      <i class="fas fa-globe"></i>
      <span id="tzText">Detecting your timezone...</span>
    </div>
    <button class="hero-compass-cta" onclick="openCompass()">
      <i class="fas fa-location-crosshairs"></i>
      <span>Find Your Way · Live GPS</span>
    </button>
    <p class="hero-desc">Where 1.4 billion-year-old fossils meet misty forts in the clouds. Untamed rivers carve through ancient canyons. This is not a vacation — it is an expedition into the soul of Uttar Pradesh.</p>
    <div class="hero-btns">
      <a href="#adventures" class="btn btn-primary"><span>Explore Adventures</span><i class="fas fa-arrow-right"></i></a>
      <a href="#calculator" class="btn btn-ghost"><i class="fas fa-calculator"></i><span>Price Your Trip</span></a>
    </div>
  </div>
  <div class="hero-live">
    <div class="hero-live-item">
      <div class="lab"><i class="fas fa-clock"></i> Sonbhadra Time</div>
      <div class="val" id="liveTime">--:--<span id="liveAmPm">--</span></div>
      <div class="sub" id="liveDate">Loading...</div>
    </div>
    <div class="hero-live-item">
      <div class="lab"><i class="fas fa-thermometer-half"></i> Temperature</div>
      <div class="val" id="liveTemp">--<span>°C</span></div>
      <div class="sub" id="liveWeather">Fetching...</div>
    </div>
    <div class="hero-live-item">
      <div class="lab"><i class="fas fa-wind"></i> Air Quality</div>
      <div class="val" id="liveAqi">--</div>
      <div class="sub" id="liveAqiLabel">Fetching...</div>
    </div>
    <div class="hero-live-item">
      <div class="lab"><i class="fas fa-sun"></i> Sunset Today</div>
      <div class="val" id="liveSunset">--:--</div>
      <div class="sub" id="liveGolden">Loading</div>
    </div>
  </div>
</header>

<div class="marquee">
  <div class="marquee-track" id="marquee">
    <div class="marquee-item"><img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=100&auto=format&fit=crop" alt="">Salkhan Fossils</div>
    <div class="marquee-item"><img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=100&auto=format&fit=crop" alt="">Rihand Lake</div>
    <div class="marquee-item"><img src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=100&auto=format&fit=crop" alt="">Vijaygarh Fort</div>
    <div class="marquee-item"><img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=100&auto=format&fit=crop" alt="">Wyndham Falls</div>
    <div class="marquee-item"><img src="https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=100&auto=format&fit=crop" alt="">Kaimur Wilds</div>
    <div class="marquee-item"><img src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=100&auto=format&fit=crop" alt="">Agori Fort</div>
  </div>
</div>

<section class="dashboard" id="dashboard">
  <div class="dashboard-head">
    <div class="overline">Live · Real-Time</div>
    <h2>Sonbhadra <em>Right Now</em></h2>
    <p>यह website सोनभद्र के असली weather, sun, और air-quality से ज़िंदा है। हर 10 मिनट में update होती है।</p>
  </div>
  <div class="dash-grid">
    <div class="dash-card">
      <div class="dash-icon"><i class="fas fa-temperature-half"></i></div>
      <div class="dash-label">Temperature</div>
      <div class="dash-value" id="dashTemp">--<span>°C</span></div>
      <div class="dash-sub" id="dashWeather">Loading conditions</div>
    </div>
    <div class="dash-card">
      <div class="dash-icon"><i class="fas fa-wind"></i></div>
      <div class="dash-label">Air Quality (PM2.5)</div>
      <div class="dash-value" id="dashAqi">--<span>µg/m³</span></div>
      <div class="dash-sub" id="dashAqiCat">Loading</div>
    </div>
    <div class="dash-card">
      <div class="dash-icon"><i class="fas fa-cloud-sun"></i></div>
      <div class="dash-label">Sunrise / Sunset</div>
      <div class="dash-value" style="font-size:1.1rem"><span id="dashSunrise" style="color:#fff;font-weight:800;font-family:var(--serif);font-size:1.3rem">--:--</span> <span style="opacity:.4">→</span> <span id="dashSunset" style="color:#fff;font-weight:800;font-family:var(--serif);font-size:1.3rem">--:--</span></div>
      <div class="dash-sub" id="dashDayLen">Loading</div>
    </div>
    <div class="dash-card featured">
      <div class="dash-icon"><i class="fas fa-lightbulb" id="bestIcon"></i></div>
      <div class="dash-label">Perfect Right Now</div>
      <div class="dash-value" id="bestActivity" style="font-size:1.02rem">Analyzing...</div>
      <div class="dash-sub" id="bestReason">Based on time & weather</div>
    </div>
    <div class="chart-card">
      <div class="chart-head">
        <h4>Next 24 Hours · Temperature</h4>
        <div class="legend"><span class="dot"></span> °C in Sonbhadra</div>
      </div>
      <div class="chart-body">
        <svg id="weatherChart" viewBox="0 0 800 180" preserveAspectRatio="none"></svg>
        <div class="chart-loading" id="chartLoading">Loading 24h forecast...</div>
      </div>
    </div>
  </div>
</section>

<section class="team" id="team">
  <div class="section-head">
    <div class="overline">The Minds Behind</div>
    <h2>Leadership <em>Team</em></h2>
    <p>The people who turn wild ideas into world-class expeditions.</p>
  </div>
  <div class="team-grid">
    <div class="team-card">
      <div class="team-photo"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop" alt="Niraj Dwivedi"></div>
      <div class="team-info">
        <h3>Niraj Dwivedi</h3>
        <div class="team-role">Founder</div>
        <p class="team-bio">Visionary pioneer of adventure tourism in Sonbhadra. Founded Son Adventure in 2012 with a mission to put the district on the world map.</p>
      </div>
    </div>
    <div class="team-card">
      <div class="team-photo"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" alt="Vikas Kumar Mishra"></div>
      <div class="team-info">
        <h3>Vikas Kumar Mishra</h3>
        <div class="team-role">Technical Head</div>
        <p class="team-bio">Architect of our digital backbone. Ensures real-time systems, GPS integrations, and seamless tech experience.</p>
      </div>
    </div>
    <div class="team-card">
      <div class="team-photo"><img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" alt="Anil Dwivedi"></div>
      <div class="team-info">
        <h3>Anil Dwivedi</h3>
        <div class="team-role">Management Head</div>
        <p class="team-bio">Drives partnerships, hospitality standards, and strategic growth. The force behind our premium luxury camps.</p>
      </div>
    </div>
    <div class="team-card">
      <div class="team-photo"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" alt="Kuldeep"></div>
      <div class="team-info">
        <h3>Kuldeep</h3>
        <div class="team-role">Operations Head</div>
        <p class="team-bio">The man who makes it all happen on-ground. Leads safety protocols, guide training, and flawless execution.</p>
      </div>
    </div>
  </div>
</section>

<div class="trust-strip">
  <div>
    <div class="label">Trusted & Recognized By</div>
    <div class="trust-badges">
      <div><i class="fas fa-shield-halved"></i> ISO 9001:2015</div>
      <div><i class="fas fa-award"></i> Ministry of Tourism</div>
      <div><i class="fas fa-leaf"></i> Eco-Certified</div>
      <div><i class="fas fa-star"></i> 4.9★ · 2,400+ Reviews</div>
      <div><i class="fas fa-globe"></i> 15+ Countries</div>
    </div>
  </div>
</div>

<section class="map-section" id="map">
  <div class="section-head">
    <div class="overline">The Journey</div>
    <h2>Map of <em>Discoveries</em></h2>
    <p>Click any marker on the map — हर जगह की real जानकारी वहीं खुलेगी।</p>
  </div>
  <div class="map-wrap">
    <div class="map-svg-wrap">
      <svg class="map-svg" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-label="Map of Sonbhadra">
        <path class="map-district" d="M 150 100 Q 350 60 550 90 Q 700 120 720 280 Q 740 450 620 530 Q 480 590 320 550 Q 180 510 120 400 Q 80 280 150 100 Z"/>
        <path class="map-route" id="mapRoute" d="M 360 94 Q 420 130 466 171 Q 480 180 506 189 Q 530 200 533 342 Q 520 400 426 300 Q 380 250 240 325 Q 200 340 293 514"/>
        <g class="map-marker" data-place="robertsganj" transform="translate(360,94)"><circle class="dot" r="8"/><text class="lbl" y="-16">Robertsganj</text></g>
        <g class="map-marker" data-place="salkhan" transform="translate(466,171)"><circle class="dot" r="8"/><text class="lbl" y="-16">Salkhan</text></g>
        <g class="map-marker" data-place="lakhaniya" transform="translate(506,189)"><circle class="dot" r="8"/><text class="lbl" y="-16">Lakhaniya</text></g>
        <g class="map-marker" data-place="wyndham" transform="translate(533,342)"><circle class="dot" r="8"/><text class="lbl" y="-16">Wyndham</text></g>
        <g class="map-marker" data-place="vijaygarh" transform="translate(426,300)"><circle class="dot" r="8"/><text class="lbl" y="-16">Vijaygarh</text></g>
        <g class="map-marker" data-place="obra" transform="translate(240,325)"><circle class="dot" r="8"/><text class="lbl" y="-16">Obra</text></g>
        <g class="map-marker" data-place="rihand" transform="translate(293,514)"><circle class="dot" r="8"/><text class="lbl" y="24">Rihand</text></g>
        <g class="map-marker" data-place="shivdwar" transform="translate(666,43)"><circle class="dot" r="8"/><text class="lbl" y="-16">Shivdwar</text></g>
        <g class="map-marker" data-place="agori" transform="translate(66,214)"><circle class="dot" r="8"/><text class="lbl" y="-16">Agori</text></g>
      </svg>
    </div>
    <div class="map-info" id="mapInfo">
      <span class="badge" id="mapBadge">Select a Place</span>
      <h3 id="mapTitle">Click a Marker</h3>
      <p id="mapDesc">Sonbhadra के 9 iconic destinations में से किसी भी pin पर click करें — real facts, best-time, और access details वहीं दिखेंगी।</p>
      <div class="map-facts" id="mapFacts">
        <div><span>Region</span><span>Sonbhadra, UP</span></div>
        <div><span>Total Spots</span><span>9 Marked</span></div>
        <div><span>Best Season</span><span>Oct – Mar</span></div>
        <div><span>From Varanasi</span><span>~2 hrs</span></div>
      </div>
    </div>
  </div>
</section>

<section class="destinations" id="destinations">
  <div class="dest-header">
    <div class="section-head">
      <div class="overline">Explore</div>
      <h2>Destinations</h2>
      <p>From prehistoric fossil beds to island fortresses — every corner tells a story.</p>
    </div>
    <div class="dest-nav">
      <button id="destPrev" aria-label="Previous"><i class="fas fa-arrow-left"></i></button>
      <button id="destNext" aria-label="Next"><i class="fas fa-arrow-right"></i></button>
    </div>
  </div>
  <div class="dest-track" id="destTrack">
    <div class="dest-slide" data-place="salkhan">
      <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" alt="Salkhan">
      <div class="dest-info">
        <span class="dest-badge">Geological Wonder</span>
        <h3>Salkhan Fossil Park</h3>
        <p>1.4-billion-year-old stromatolites older than the Grand Canyon.</p>
      </div>
    </div>
    <div class="dest-slide" data-place="rihand">
      <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop" alt="Rihand">
      <div class="dest-info">
        <span class="dest-badge">Inland Sea</span>
        <h3>Rihand Dam</h3>
        <p>One of India's largest artificial lakes. Perfect for kayaking and lakeside glamping.</p>
      </div>
    </div>
    <div class="dest-slide" data-place="wyndham">
      <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200&auto=format&fit=crop" alt="Wyndham">
      <div class="dest-info">
        <span class="dest-badge">Cascade</span>
        <h3>Wyndham & Mukha Falls</h3>
        <p>Spectacular cascades plunging over limestone cliffs in wild tribal forests.</p>
      </div>
    </div>
    <div class="dest-slide" data-place="vijaygarh">
      <img src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop" alt="Vijaygarh">
      <div class="dest-info">
        <span class="dest-badge">5th Century</span>
        <h3>Vijaygarh Fort</h3>
        <p>Majestic citadel in the clouds, linked to the Chandrakanta era.</p>
      </div>
    </div>
  </div>
</section>

<section class="calculator-section" id="calculator">
  <div class="section-head">
    <div class="overline">Transparent Pricing</div>
    <h2>Price Your <em>Expedition</em></h2>
    <p>No hidden costs. Real prices. Instant estimate — बस dates चुनो।</p>
  </div>
  <div class="calc-wrap">
    <div class="calc-form">
      <div class="calc-field-row">
        <div class="calc-field"><label>Arrival Date</label><input type="date" id="calcStart"></div>
        <div class="calc-field"><label>Departure Date</label><input type="date" id="calcEnd"></div>
      </div>
      <div class="calc-field-row">
        <div class="calc-field"><label>Guests</label><input type="number" id="calcGuests" min="1" max="20" value="2"></div>
        <div class="calc-field"><label>Package</label>
          <select id="calcPackage">
            <option value="2500">Explorer · ₹2,500/night</option>
            <option value="4500" selected>Premium · ₹4,500/night</option>
            <option value="8000">Signature · ₹8,000/night</option>
          </select>
        </div>
      </div>
      <div class="calc-field"><label>Adventure Add-On</label>
        <select id="calcAddon">
          <option value="0">None</option>
          <option value="1500">Rock Climbing · ₹1,500</option>
          <option value="2000">Kayaking · ₹2,000</option>
          <option value="2500">Night Trek · ₹2,500</option>
        </select>
      </div>
      <div class="calc-field"><label>Transport</label>
        <select id="calcTransport">
          <option value="0">Self-arranged</option>
          <option value="3000">Varanasi Pickup & Drop · ₹3,000</option>
        </select>
      </div>
    </div>
    <div class="calc-total-box">
      <div class="lbl">Your Estimate</div>
      <div class="amount" id="calcAmount">₹0</div>
      <div class="per">Total (incl. GST)</div>
      <div class="calc-breakdown">
        <div><span>Nights</span><span id="calcNights">0</span></div>
        <div><span>Guests</span><span id="calcGuestsOut">0</span></div>
        <div><span>Base</span><span id="calcBase">₹0</span></div>
        <div><span>Total (incl. GST)</span><span id="calcTotalOut">₹0</span></div>
      </div>
    </div>
  </div>
</section>

<section class="cta" id="contact">
  <div class="cta-bg"></div>
  <div class="cta-inner">
    <div class="overline">Your Expedition Awaits</div>
    <h2>Sonbhadra is <em>Calling.</em></h2>
    <p>Let Son Adventure curate a seamless, perfectly safe, and deeply immersive premium expedition.</p>
    <div class="contact-quick">
      <a href="tel:+917355053822"><i class="fas fa-phone"></i> +91 73550 53822</a>
      <a href="https://wa.me/917355053822?text=Hi%20Son%20Adventure!" target="_blank" rel="noopener" class="wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
      <a href="mailto:son.doc.tourism@gmail.com"><i class="fas fa-envelope"></i> Email</a>
    </div>
  </div>
</section>

</main>

<footer>
  <div class="footer-inner">
    <div class="footer-bottom">
      <p>© 2026 Son Adventure™ · Robertsganj, Sonbhadra, UP · India</p>
      <p>Official Destination Discovery & Eco Tourism Platform</p>
    </div>
  </div>
</footer>

<!-- DOCK -->
<div class="dock" id="dock">
  <button class="dock-item compass" onclick="openCompass()" aria-label="Live compass">
    <span class="dock-icon"><i class="fas fa-location-crosshairs"></i></span>
    <span class="dock-label">Compass</span>
  </button>
  <a href="tel:+917355053822" class="dock-item call" aria-label="Call">
    <span class="dock-icon"><i class="fas fa-phone"></i></span>
    <span class="dock-label">Call</span>
  </a>
  <a href="https://wa.me/917355053822" target="_blank" rel="noopener" class="dock-item wa" aria-label="WhatsApp">
    <span class="dock-icon"><i class="fab fa-whatsapp"></i></span>
    <span class="dock-label">WhatsApp</span>
  </a>
  <button class="dock-item top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Top">
    <span class="dock-icon"><i class="fas fa-arrow-up"></i></span>
    <span class="dock-label">Top</span>
  </button>
</div>

<!-- COMPASS MODAL -->
<div class="compass-overlay" id="compassOverlay" onclick="if(event.target===this)closeCompass()">
  <div class="compass-box">
    <button class="compass-close" onclick="closeCompass()">&times;</button>
    <div class="compass-head">
      <h3>Find Your Way to Sonbhadra</h3>
      <p id="compassSubtitle">Live compass · Real-time GPS</p>
    </div>
    <div class="compass-rose">
      <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-label="Compass">
        <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(212,165,55,0.35)" stroke-width="1"/>
        <g id="compassRose">
          <text x="160" y="42" text-anchor="middle" fill="#e9c974" font-family="Space Grotesk,sans-serif" font-size="14" font-weight="700">N</text>
          <text x="290" y="166" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-family="Space Grotesk,sans-serif" font-size="12" font-weight="600">E</text>
          <text x="160" y="296" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-family="Space Grotesk,sans-serif" font-size="12" font-weight="600">S</text>
          <text x="30" y="166" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-family="Space Grotesk,sans-serif" font-size="12" font-weight="600">W</text>
        </g>
        <g id="compassNeedle">
          <polygon points="160,60 170,160 160,160 150,160" fill="#e9c974"/>
          <polygon points="160,260 170,160 160,160 150,160" fill="rgba(255,255,255,0.15)"/>
          <circle cx="160" cy="160" r="7" fill="#0a1410" stroke="#d4a537" stroke-width="2"/>
        </g>
      </svg>
    </div>
    <div class="compass-stats">
      <div class="compass-stat"><label>Distance</label><div class="val" id="compassDist">--</div></div>
      <div class="compass-stat"><label>Bearing</label><div class="val" id="compassBear">--</div></div>
      <div class="compass-stat full"><label>Your Location</label><div class="val" id="compassCoords">Waiting for GPS...</div></div>
      <div class="compass-stat full"><label>Status</label><div class="val" id="compassStatus">Tap Refresh to start</div></div>
    </div>
    <div class="compass-actions">
      <button class="refresh" onclick="requestLocation()"><i class="fas fa-location-crosshairs"></i> Refresh</button>
      <button class="close" onclick="closeCompass()">Close</button>
    </div>
  </div>
</div>

<!-- DESTINATION MODAL -->
<div class="modal-overlay" id="modalOverlay" onclick="if(event.target===this)closeModal()">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()">&times;</button>
    <div class="modal-img"><img id="modalImg" src="" alt=""></div>
    <div class="modal-body" id="modalBody"></div>
  </div>
</div>
` }} />
  );
}
