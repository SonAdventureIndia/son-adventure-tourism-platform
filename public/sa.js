'use strict';
const SONBHADRA = { lat: 24.6856, lng: 83.0689 };
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============ TIME-AWARE THEME ============ */
function getSonbhadraHour() {
  try {
    const s = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
    return parseInt(s, 10);
  } catch (e) { return new Date().getHours(); }
}
function applyTheme() {
  const h = getSonbhadraHour();
  let theme = 'day';
  if (h >= 5 && h < 7) theme = 'dawn';
  else if (h >= 17 && h < 19) theme = 'dusk';
  else if (h >= 19 || h < 5) theme = 'night';
  document.body.setAttribute('data-theme', theme);
  let greeting = 'Welcome, Explorer';
  if (h >= 5 && h < 12) greeting = 'Good Morning, Explorer';
  else if (h >= 12 && h < 17) greeting = 'Good Afternoon, Explorer';
  else if (h >= 17 && h < 21) greeting = 'Good Evening, Explorer';
  else greeting = 'Good Night, Explorer';
  const hg = document.getElementById('heroGreeting');
  if (hg) hg.textContent = greeting;
  const lg = document.getElementById('loaderGreeting');
  if (lg) lg.textContent = theme === 'night' ? 'Night Awakens' : theme === 'dawn' ? 'Dawn Approaches' : theme === 'dusk' ? 'Dusk Falls' : 'Curating Experience';
  const bg = document.getElementById('heroBg');
  if (bg) {
    const imgs = {
      dawn: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2400&auto=format&fit=crop',
      day: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop',
      dusk: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2400&auto=format&fit=crop',
      night: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2400&auto=format&fit=crop'
    };
    bg.style.backgroundImage = `url('${imgs[theme]}')`;
  }
  updateSuggestion(h);
}
function updateSuggestion(h) {
  const config = {
    dawn: { icon:'fa-sun', text:'Sunrise Trek — Kaimur hills are glowing', label:'Perfect Right Now' },
    morning: { icon:'fa-hiking', text:'Morning Forest Trail — cool & clear', label:'Perfect Right Now' },
    noon: { icon:'fa-camera', text:'Heritage Photo Walk — Salkhan Fossils', label:'Perfect Right Now' },
    evening: { icon:'fa-mountain-sun', text:'Sunset at Vijaygarh Fort — above the clouds', label:'Perfect Right Now' },
    night: { icon:'fa-star', text:'Astro-Photography — clear night skies', label:'Perfect Right Now' }
  };
  let key = 'morning';
  if (h >= 5 && h < 8) key = 'dawn';
  else if (h >= 8 && h < 12) key = 'morning';
  else if (h >= 12 && h < 16) key = 'noon';
  else if (h >= 16 && h < 19) key = 'evening';
  else key = 'night';
  const c = config[key];
  const icon = document.getElementById('suggestIcon');
  const label = document.getElementById('suggestLabel');
  const text = document.getElementById('suggestText');
  if (icon) icon.className = 'fas ' + c.icon;
  if (label) label.textContent = c.label;
  if (text) text.textContent = c.text;
  const ba = document.getElementById('bestActivity');
  const br = document.getElementById('bestReason');
  const bi = document.getElementById('bestIcon');
  const map = {
    dawn: { a:'Sunrise Trek', r:'Cool air, soft light', i:'fa-sun' },
    morning: { a:'Forest Trekking', r:'Best weather window', i:'fa-hiking' },
    noon: { a:'Fossil Park Visit', r:'Great light for photos', i:'fa-camera' },
    evening: { a:'Fort Sunset Trek', r:'Golden hour above clouds', i:'fa-mountain-sun' },
    night: { a:'Astro-Photography', r:'Clear dark skies', i:'fa-star' }
  };
  if (ba) ba.textContent = map[key].a;
  if (br) br.textContent = map[key].r;
  if (bi) bi.className = 'fas ' + map[key].i;
}

/* ============ LIVE CLOCK ============ */
function updateClock() {
  try {
    const now = new Date();
    const timeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
    const [time, ampm] = timeStr.split(' ');
    const lt = document.getElementById('liveTime');
    if (lt) lt.innerHTML = time + '<span id="liveAmPm">' + ampm + '</span>';
    const dateStr = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'long', day: 'numeric', month: 'short' });
    const ld = document.getElementById('liveDate');
    if (ld) ld.textContent = dateStr;
    const navT = document.getElementById('navTime');
    if (navT) {
      const secs = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', second: '2-digit' });
      navT.textContent = time + ':' + secs;
    }
  } catch (e) {}
}

/* ============ TIMEZONE INFO ============ */
function updateTimezone() {
  try {
    const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const city = userTZ.split('/').pop().replace(/_/g,' ');
    const isIndia = userTZ.includes('Kolkata') || userTZ.includes('Calcutta');
    const tzText = document.getElementById('tzText');
    if (tzText) {
      if (isIndia) {
        tzText.innerHTML = 'You are in India · Same time as Sonbhadra';
      } else {
        const now = new Date();
        const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const utc = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        const offsetHrs = (ist - utc) / 3600000;
        const userOffset = -now.getTimezoneOffset() / 60;
        const diff = offsetHrs - userOffset;
        const diffStr = diff === 0 ? 'same time' : diff > 0 ? `+${diff.toFixed(1)}h ahead` : `${diff.toFixed(1)}h behind`;
        tzText.innerHTML = `Greetings from <strong>${city}</strong> · India is ${diffStr}`;
      }
    }
  } catch (e) {
    const tzText = document.getElementById('tzText');
    if (tzText) tzText.textContent = 'Sonbhadra is in Indian Standard Time (IST)';
  }
}

/* ============ WEATHER + AQI ============ */
const weatherCodes = {0:'Clear',1:'Mainly Clear',2:'Partly Cloudy',3:'Overcast',45:'Fog',48:'Fog',51:'Drizzle',53:'Drizzle',55:'Drizzle',61:'Light Rain',63:'Rain',65:'Rain',71:'Snow',73:'Snow',75:'Snow',80:'Showers',81:'Showers',82:'Showers',95:'Thunderstorm',96:'Storm'};
function aqiCategory(pm) {
  if (pm <= 12) return { label:'Good', cls:'good' };
  if (pm <= 35) return { label:'Moderate', cls:'mod' };
  if (pm <= 55) return { label:'Sensitive', cls:'poor' };
  if (pm <= 150) return { label:'Unhealthy', cls:'bad' };
  return { label:'Very Unhealthy', cls:'bad' };
}
let currentWeatherMode = 'clear';
function fetchWeather() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${SONBHADRA.lat}&longitude=${SONBHADRA.lng}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature&daily=sunrise,sunset&hourly=temperature_2m&timezone=Asia%2FKolkata&forecast_days=2`;
  fetch(url).then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(data => {
    const cur = data.current;
    const temp = Math.round(cur.temperature_2m);
    const feelsLike = Math.round(cur.apparent_temperature);
    const cond = weatherCodes[cur.weather_code] || 'Clear';
    const humidity = cur.relative_humidity_2m;
    const lt = document.getElementById('liveTemp');
    if (lt) lt.innerHTML = temp + '<span>°C</span>';
    const lw = document.getElementById('liveWeather');
    if (lw) lw.textContent = cond;
    const nt = document.getElementById('navTemp');
    if (nt) nt.textContent = temp + '°C';
    const dT = document.getElementById('dashTemp');
    if (dT) dT.innerHTML = temp + '<span>°C</span>';
    const dW = document.getElementById('dashWeather');
    if (dW) dW.textContent = `${cond} · feels ${feelsLike}° · ${humidity}%`;
    if (cur.weather_code >= 51 && cur.weather_code <= 67) currentWeatherMode = 'rain';
    else if (cur.weather_code >= 71 && cur.weather_code <= 77) currentWeatherMode = 'snow';
    else if (cur.weather_code >= 95) currentWeatherMode = 'rain';
    else if (getSonbhadraHour() >= 19 || getSonbhadraHour() < 5) currentWeatherMode = 'night';
    else currentWeatherMode = 'clear';
    initParticles();
    if (data.daily && data.daily.sunrise && data.daily.sunset) {
      const sr = new Date(data.daily.sunrise[0]);
      const ss = new Date(data.daily.sunset[0]);
      const srStr = sr.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true });
      const ssStr = ss.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true });
      const sre = document.getElementById('dashSunrise');
      const sse = document.getElementById('dashSunset');
      if (sre) sre.textContent = srStr.replace(' ','');
      if (sse) sse.textContent = ssStr.replace(' ','');
      const lss = document.getElementById('liveSunset');
      if (lss) lss.textContent = ssStr.replace(' ','');
      const mins = Math.round((ss - sr) / 60000);
      const hh = Math.floor(mins/60), mm = mins%60;
      const dl = document.getElementById('dashDayLen');
      if (dl) dl.textContent = `Day length · ${hh}h ${mm}m`;
      const golden = new Date(ss.getTime() - 60*60000);
      const gStr = golden.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true });
      const lg = document.getElementById('liveGolden');
      if (lg) lg.textContent = 'Golden · ' + gStr;
    }
    if (data.hourly && data.hourly.temperature_2m) {
      renderWeatherChart(data.hourly.temperature_2m);
    }
  }).catch(() => {});
}
function fetchAirQuality() {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${SONBHADRA.lat}&longitude=${SONBHADRA.lng}&current=pm2_5&timezone=Asia%2FKolkata`;
  fetch(url).then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(data => {
    const pm = Math.round(data.current.pm2_5);
    const cat = aqiCategory(pm);
    const la = document.getElementById('liveAqi');
    if (la) la.textContent = pm;
    const laL = document.getElementById('liveAqiLabel');
    if (laL) laL.textContent = cat.label;
    const dA = document.getElementById('dashAqi');
    if (dA) dA.innerHTML = pm + '<span>µg/m³</span>';
    const dAC = document.getElementById('dashAqiCat');
    if (dAC) dAC.innerHTML = `<span class="dash-aqi-badge ${cat.cls}">${cat.label}</span> · PM2.5`;
  }).catch(() => {});
}

/* ============ WEATHER CHART ============ */
function renderWeatherChart(temps) {
  const svg = document.getElementById('weatherChart');
  const loading = document.getElementById('chartLoading');
  if (!svg) return;
  if (loading) loading.style.display = 'none';
  const W = 800, H = 180, padX = 40, padY = 30;
  const now = new Date();
  const currentHour = parseInt(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }), 10);
  const startIdx = Math.min(currentHour, Math.max(0, temps.length - 24));
  const data = temps.slice(startIdx, startIdx + 24);
  if (data.length === 0) return;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = (W - padX*2) / (data.length - 1);
  const points = data.map((t, i) => {
    const x = padX + i * stepX;
    const y = H - padY - ((t - min) / range) * (H - padY*2);
    return { x, y, t };
  });
  const linePath = 'M ' + points.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ');
  const areaPath = linePath + ` L ${points[points.length-1].x.toFixed(1)} ${H} L ${padX} ${H} Z`;
  let svgHTML = `
    <defs>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(212,165,55,0.4)"/>
        <stop offset="100%" stop-color="rgba(212,165,55,0)"/>
      </linearGradient>
    </defs>
    <path d="${areaPath}" fill="url(#areaGrad)"/>
    <path d="${linePath}" fill="none" stroke="#d4a537" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `;
  points.forEach((p, i) => {
    if (i % 4 === 0 || i === points.length-1) {
      svgHTML += `<circle cx="${p.x}" cy="${p.y}" r="3" fill="#e9c974" stroke="#0a1410" stroke-width="1.5"/>`;
      svgHTML += `<text x="${p.x}" y="${H-8}" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="Space Grotesk,sans-serif" font-size="9" font-weight="600">${(currentHour + i) % 24}h</text>`;
    }
  });
  const maxP = points.reduce((a,b) => a.t > b.t ? a : b);
  const minP = points.reduce((a,b) => a.t < b.t ? a : b);
  svgHTML += `<text x="${maxP.x}" y="${maxP.y-10}" text-anchor="middle" fill="#e9c974" font-family="Space Grotesk,sans-serif" font-size="11" font-weight="700">${Math.round(maxP.t)}°</text>`;
  svgHTML += `<text x="${minP.x}" y="${minP.y+16}" text-anchor="middle" fill="#8fa8e0" font-family="Space Grotesk,sans-serif" font-size="11" font-weight="700">${Math.round(minP.t)}°</text>`;
  svg.innerHTML = svgHTML;
}

/* ============ PARTICLES ============ */
const canvas = document.getElementById('particles');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let particleAnimId = null;
function initParticles() {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  const count = currentWeatherMode === 'rain' ? 60 : 35;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: currentWeatherMode === 'rain' ? 3 + Math.random() * 3 : 0.15 + Math.random() * 0.35,
      size: currentWeatherMode === 'rain' ? 0.8 : 0.8 + Math.random() * 1.5,
      opacity: 0.15 + Math.random() * 0.45,
      twinkle: Math.random() * Math.PI * 2
    });
  }
  if (!particleAnimId && !prefersReducedMotion) animateParticles();
}
function animateParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.twinkle += 0.02;
    if (currentWeatherMode === 'rain') {
      ctx.strokeStyle = `rgba(143,168,224,${p.opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - 1, p.y + 12);
      ctx.stroke();
    } else {
      const factor = 0.7 + Math.sin(p.twinkle) * 0.3;
      ctx.fillStyle = `rgba(212,165,55,${p.opacity * factor})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
  });
  particleAnimId = requestAnimationFrame(animateParticles);
}

/* ============ GPS + COMPASS ============ */
let userLat = null, userLng = null, deviceHeading = null, bearingToSon = 0, distanceToSon = 0, orientationBound = false;
function toRad(d){return d*Math.PI/180}
function toDeg(r){return r*180/Math.PI}
function calcBearing(lat1,lon1,lat2,lon2){
  const p1=toRad(lat1),p2=toRad(lat2),dl=toRad(lon2-lon1);
  const y=Math.sin(dl)*Math.cos(p2);
  const x=Math.cos(p1)*Math.sin(p2)-Math.sin(p1)*Math.cos(p2)*Math.cos(dl);
  return (toDeg(Math.atan2(y,x))+360)%360;
}
function calcDistance(lat1,lon1,lat2,lon2){
  const R=6371,dLat=toRad(lat2-lat1),dLon=toRad(lon2-lon1);
  const a=Math.sin(dLat/2)**2+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return 2*R*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
function bearingLabel(b){
  const dirs=['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(b/22.5)%16];
}
function updateCompassDisplay(){
  if(userLat===null || userLng===null) return;
  bearingToSon = calcBearing(userLat,userLng,SONBHADRA.lat,SONBHADRA.lng);
  distanceToSon = calcDistance(userLat,userLng,SONBHADRA.lat,SONBHADRA.lng);
  const rose = document.getElementById('compassRose');
  const needle = document.getElementById('compassNeedle');
  const roseRot = deviceHeading !== null ? -deviceHeading : 0;
  const needleRot = bearingToSon - (deviceHeading !== null ? deviceHeading : 0);
  if(rose) rose.setAttribute('transform', `rotate(${roseRot} 160 160)`);
  if(needle) needle.setAttribute('transform', `rotate(${needleRot} 160 160)`);
  const distEl = document.getElementById('compassDist');
  if(distEl) distEl.textContent = Math.round(distanceToSon).toLocaleString() + ' km';
  const bearEl = document.getElementById('compassBear');
  if(bearEl) bearEl.textContent = bearingToSon.toFixed(0) + '° ' + bearingLabel(bearingToSon);
  const coordsEl = document.getElementById('compassCoords');
  if(coordsEl) coordsEl.textContent = userLat.toFixed(4) + ', ' + userLng.toFixed(4);
  const statusEl = document.getElementById('compassStatus');
  if(statusEl) statusEl.textContent = deviceHeading !== null ? '🟢 Live Compass Active' : '🟡 Bearing Mode';
  const heroDist = document.getElementById('heroDistance');
  if(heroDist){
    heroDist.style.display = 'flex';
    heroDist.innerHTML = `<i class="fas fa-location-dot"></i> You are <strong>${Math.round(distanceToSon).toLocaleString()} km</strong> from Sonbhadra`;
  }
}
function handleOrientation(e){
  let h = null;
  if(typeof e.webkitCompassHeading === 'number' && !isNaN(e.webkitCompassHeading)) h = e.webkitCompassHeading;
  else if(e.alpha !== null && e.alpha !== undefined) h = (360 - e.alpha) % 360;
  if(h !== null && !isNaN(h)) { deviceHeading = h; updateCompassDisplay(); }
}
function requestLocation(){
  const statusEl = document.getElementById('compassStatus');
  if(!navigator.geolocation){ if(statusEl) statusEl.textContent = '❌ Geolocation not supported'; return; }
  if(statusEl) statusEl.textContent = '📡 Getting your location...';
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLat = pos.coords.latitude; userLng = pos.coords.longitude;
      updateCompassDisplay();
    },
    () => {
      userLat = 25.3176; userLng = 82.9739;
      updateCompassDisplay();
      if(statusEl) statusEl.textContent = '🟡 Default: Varanasi Datum';
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
}
window.openCompass = function(){
  const ov = document.getElementById('compassOverlay');
  if(ov) ov.classList.add('active');
  document.body.style.overflow = 'hidden';
  if(!orientationBound){ window.addEventListener('deviceorientation', handleOrientation, true); orientationBound = true; }
  if(userLat === null) requestLocation();
  else updateCompassDisplay();
};
window.closeCompass = function(){
  const ov = document.getElementById('compassOverlay');
  if(ov) ov.classList.remove('active');
  document.body.style.overflow = '';
};

/* ============ PLACE DATA & MAP ============ */
const placeData = {
  robertsganj:{title:'Robertsganj — District HQ',badge:'Gateway · Basecamp',img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',desc:'The bustling district headquarters of Sonbhadra and the natural start point for every expedition.',details:[['Type','District HQ'],['Best For','Basecamp & Supplies'],['Elevation','~330 m']]},
  salkhan:{title:'Salkhan Fossil Park',badge:'Geological Wonder · 1.4 Billion Years',img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',desc:'Spread over 25 hectares, this protected park hosts stromatolites dating back 1.4 billion years.',details:[['Best For','Geology & Astro-Photography'],['Signature','Stargazing on prehistoric rock'],['Access','Robertsganj + 12 km']]},
  lakhaniya:{title:'Lakhaniya Dari',badge:'Canyon · Prehistoric Rock Art',img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',desc:'Deep sandstone canyons carved by ancient streams with prehistoric rock paintings.',details:[['Best For','Bouldering & Trekkers'],['Signature','Waterfall & cave art walk'],['Access','Near Churk, 20 km']]},
  wyndham:{title:'Wyndham & Mukha Falls',badge:'Cascade · Photography',img:'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200&auto=format&fit=crop',desc:'Located on the Belan River where the river plunges over jagged limestone cliffs.',details:[['Best For','Photographers & Couples'],['Signature','Canyon trek & tribal walks'],['Access','~45 km from Robertsganj']]},
  vijaygarh:{title:'Vijaygarh Fort',badge:'5th Century · Citadel in the Clouds',img:'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',desc:'Perched atop a steep hill in the Kaimur range with 360° views and ancient reservoirs.',details:[['Best For','History & Trekkers'],['Signature','Above-the-clouds sunrise'],['Access','Robertsganj ~30 km']]},
  obra:{title:'Obra & Rihand Nagar',badge:'Industrial Heritage',img:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',desc:'Home to one of north India thermal power complexes ringed by green hills.',details:[['Best For','Transit & Industry History'],['Access','NH-75A']]},
  rihand:{title:'Rihand Dam & Govind Ballabh Pant Sagar',badge:'Inland Sea · Water Sports',img:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',desc:'One of India largest artificial lakes — an endless inland sea with camping shores.',details:[['Best For','Water Sports & Families'],['Signature','Lakeside glamping'],['Access','Piperaha, ~30 km']]},
  shivdwar:{title:'Shivdwar Valley',badge:'11th Century · Pastoral Peace',img:'https://images.unsplash.com/photo-1545126178-862cdb469409?q=80&w=1200&auto=format&fit=crop',desc:'Famous for its ancient temple housing a unique black-stone idol of Lord Shiva & Parvati.',details:[['Best For','Peace & Folklore'],['Access','~50 km from Robertsganj']]},
  agori:{title:'Agori Fort',badge:'Island Fortress · Boat Access Only',img:'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',desc:'Hidden in jungle near Obra at the confluence of Son, Rihand, and Bijul rivers.',details:[['Best For','Ultimate Seclusion'],['Signature','Jungle fortress survival'],['Access','Chartered boat only']]}
};

window.openModalData = function(d){
  const modalOverlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImg');
  const modalBody = document.getElementById('modalBody');
  if(!d || !modalOverlay || !modalImg || !modalBody) return;
  modalImg.src = d.img;
  modalImg.alt = d.title;
  modalBody.innerHTML = `<span class="badge">${d.badge}</span><h2>${d.title}</h2><p>${d.desc}</p><div class="modal-details">${d.details.map(x => `<div><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('')}</div>`;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};
window.closeModal = function(){
  const modalOverlay = document.getElementById('modalOverlay');
  if(modalOverlay) modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
};

/* ============ COMMAND PALETTE ============ */
window.openCommandPalette = function(){
  const ov = document.getElementById('cmdOverlay');
  if(ov){
    ov.classList.add('active');
    document.body.style.overflow = 'hidden';
    const inp = document.getElementById('cmdInput');
    if(inp){ inp.value=''; inp.focus(); }
  }
};
window.closeCommandPalette = function(){
  const ov = document.getElementById('cmdOverlay');
  if(ov) ov.classList.remove('active');
  document.body.style.overflow = '';
};

/* ============ BOOT ENGINE ============ */
function boot() {
  applyTheme();
  updateClock();
  updateTimezone();
  fetchWeather();
  fetchAirQuality();

  setTimeout(() => {
    const l = document.getElementById('loader');
    if(l) l.classList.add('hide');
    const dock = document.getElementById('dock');
    if(dock) setTimeout(() => dock.classList.add('ready'), 300);
  }, 1900);
  setTimeout(initParticles, 2200);

  // Ticker Loop
  const track = document.getElementById('tickerTrack');
  const msgs = [
    '✨ &nbsp; <strong>Aarav from Delhi</strong> booked Salkhan Star-Dome',
    '⭐ &nbsp; <strong>Priya from Bangalore</strong> left a 5-star review',
    '📡 &nbsp; Live GPS satellite radar active',
    '🌙 &nbsp; Next clear night for stargazing: <strong>Tonight</strong>'
  ];
  let tidx = 0;
  if(track) {
    track.innerHTML = `<div class="ticker-item active">${msgs[0]}</div>`;
    setInterval(() => {
      tidx = (tidx + 1) % msgs.length;
      track.innerHTML = `<div class="ticker-item active">${msgs[tidx]}</div>`;
    }, 4500);
  }

  // Cursors
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let cx=0, cy=0, rx=0, ry=0;
  if(!window.matchMedia('(hover:none)').matches && dot && ring){
    document.addEventListener('mousemove', e => {
      cx=e.clientX; cy=e.clientY;
      dot.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    });
    (function anim(){
      rx += (cx-rx)*0.16; ry += (cy-ry)*0.16;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(anim);
    })();
  }

  // Calculator
  const startEl = document.getElementById('calcStart');
  const endEl = document.getElementById('calcEnd');
  const guestsEl = document.getElementById('calcGuests');
  const pkgEl = document.getElementById('calcPackage');
  const addonEl = document.getElementById('calcAddon');
  const transEl = document.getElementById('calcTransport');
  if(startEl && endEl && guestsEl && pkgEl && addonEl && transEl){
    const today = new Date();
    const tom = new Date(today); tom.setDate(tom.getDate()+1);
    const two = new Date(today); two.setDate(two.getDate()+3);
    startEl.value = tom.toISOString().split('T')[0];
    endEl.value = two.toISOString().split('T')[0];
    function calc(){
      const s = new Date(startEl.value), e = new Date(endEl.value);
      if(isNaN(s.getTime()) || isNaN(e.getTime()) || e<=s) return;
      const n = Math.max(1, Math.round((e-s)/86400000));
      const g = parseInt(guestsEl.value,10)||1;
      const b = (parseInt(pkgEl.value,10)||0) * g * n;
      const a = (parseInt(addonEl.value,10)||0) * g;
      const tr = parseInt(transEl.value,10)||0;
      const tot = Math.round((b + a + tr) * 1.18);
      const set = (id,v)=>{ const el=document.getElementById(id); if(el) el.textContent=v; };
      set('calcNights', n); set('calcGuestsOut', g);
      set('calcBase', '₹'+b.toLocaleString('en-IN'));
      set('calcAddonOut', '₹'+a.toLocaleString('en-IN'));
      set('calcTransportOut', '₹'+tr.toLocaleString('en-IN'));
      set('calcTotalOut', '₹'+tot.toLocaleString('en-IN'));
      set('calcAmount', '₹'+tot.toLocaleString('en-IN'));
    }
    [startEl, endEl, guestsEl, pkgEl, addonEl, transEl].forEach(x => { x.addEventListener('input', calc); x.addEventListener('change', calc); });
    calc();
  }

  // Markers
  document.querySelectorAll('.map-marker').forEach(m => {
    m.addEventListener('click', () => {
      const p = m.dataset.place;
      if(p && placeData[p]){
        const d = placeData[p];
        const b = document.getElementById('mapBadge'); if(b) b.textContent=d.badge;
        const t = document.getElementById('mapTitle'); if(t) t.textContent=d.title;
        const ds = document.getElementById('mapDesc'); if(ds) ds.textContent=d.desc;
        const f = document.getElementById('mapFacts'); if(f) f.innerHTML=d.details.map(x=>`<div><span>${x[0]}</span><span>${x[1]}</span></div>`).join('');
      }
    });
  });

  // Destinations Track
  const dt = document.getElementById('destTrack');
  document.getElementById('destPrev')?.addEventListener('click', () => dt?.scrollBy({left:-420, behavior:'smooth'}));
  document.getElementById('destNext')?.addEventListener('click', () => dt?.scrollBy({left:420, behavior:'smooth'}));
  document.querySelectorAll('.dest-slide').forEach(sl => {
    sl.addEventListener('click', () => {
      const p = sl.dataset.place;
      if(p && placeData[p]) openModalData(placeData[p]);
    });
  });

  // Scroll
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
    const sp = document.getElementById('scrollProgress'); if(sp) sp.style.width=pct+'%';
    const nb = document.getElementById('navbar'); if(nb) nb.classList.toggle('scrolled', h.scrollTop>50);
  }, {passive:true});

  setInterval(updateClock, 1000);
}

if(document.readyState==='complete'||document.readyState==='interactive'){
  boot();
} else {
  window.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('load', boot);
}
