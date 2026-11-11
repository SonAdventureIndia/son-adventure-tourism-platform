import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Calendar, 
  Mountain, 
  Clock, 
  ShieldCheck, 
  Compass, 
  Footprints,
  Trees,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Radio
} from 'lucide-react';
import { VERIFIED_DESTINATIONS, VERIFIED_EXPERIENCES } from '@/data/destinations';
import LiveGeoCompass from '@/components/LiveGeoCompass';
import InteractiveTripCalculator from '@/components/InteractiveTripCalculator';

export default function HomePage() {
  return (
    <div className="min-h-screen space-y-20 pb-20">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Official Destination Discovery Platform • Sonbhadra, Uttar Pradesh</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Prehistoric Stones. Sacred Waters. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-200 bg-clip-text text-transparent">
              Wild Sonbhadra.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            From 1.4-billion-year-old fossil beds and 5th-century cliffside fortresses to Asia&apos;s massive reservoirs and Belan river cascades. Travel responsibly through Uttar Pradesh&apos;s wildest frontier.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Link 
              href="/destinations" 
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-emerald-950/70 transition active:scale-95 text-sm"
            >
              <span>Explore Verified Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/plan-trip" 
              className="flex items-center space-x-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 font-semibold px-7 py-4 rounded-xl transition text-sm"
            >
              <span>How to Reach from Varanasi</span>
            </Link>
          </div>

          {/* CREDIBILITY METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
            <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 backdrop-blur-sm">
              <span className="text-3xl font-black text-emerald-400">1.4B+</span>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-1 font-bold">Years Fossil Age</p>
            </div>
            <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 backdrop-blur-sm">
              <span className="text-3xl font-black text-amber-300">5th Cent.</span>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-1 font-bold">Vijaygarh Citadel</p>
            </div>
            <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 backdrop-blur-sm">
              <span className="text-3xl font-black text-teal-400">105 km</span>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-1 font-bold">From Varanasi (VNS)</p>
            </div>
            <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 backdrop-blur-sm">
              <span className="text-3xl font-black text-white">4 States</span>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-1 font-bold">Border Nexus (UP/MP/JH/CH)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CROWN JEWEL: LIVE GEOLOCATION & COMPASS WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveGeoCompass />
      </section>

      {/* 3. VERIFIED DESTINATIONS DIRECTORY TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Core Expedition Sites</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Four Pillars of Sonbhadra</h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl">
              Authentic geographical and historical documentation verified against district administrative survey records.
            </p>
          </div>
          <Link href="/destinations" className="mt-4 md:mt-0 text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center">
            View full directory &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VERIFIED_DESTINATIONS.map((dest) => (
            <div 
              key={dest.id} 
              className="group bg-stone-900/90 rounded-2xl border border-stone-800 overflow-hidden hover:border-emerald-500/50 transition duration-300 flex flex-col shadow-2xl"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <img 
                  src={dest.imageUrl} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 brightness-90 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-stone-950/90 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full backdrop-blur-md">
                    {dest.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition">{dest.name}</h3>
                  <p className="text-xs text-amber-200/90 font-medium flex items-center mt-1">
                    <Clock className="w-3.5 h-3.5 mr-1" /> Best Season: {dest.bestSeason}
                  </p>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">{dest.tagline}</p>
                <p className="text-sm text-stone-300 leading-relaxed">{dest.overview}</p>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center text-stone-300 font-medium">
                    <MapPin className="w-4 h-4 mr-1 text-emerald-400" />
                    {dest.distanceFromVaranasi}
                  </span>
                  <Link href={`/destinations#${dest.slug}`} className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center">
                    Full Profile <ChevronRight className="w-4 h-4 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE BUDGET & TRAVEL CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveTripCalculator />
      </section>

      {/* 5. 3-DAY CURATED CIRCUIT TIMELINE */}
      <section className="bg-stone-900/50 border-y border-stone-800/80 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Curated Travel Blueprint</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">The 3-Day Sonbhadra Discovery Circuit</h2>
            <p className="text-stone-400 text-sm max-w-xl mx-auto">
              How to experience pre-Cambrian geology, medieval citadels, and vast reservoir sunsets on a single journey from Varanasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 relative space-y-3">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60 inline-block">Day 1: Geo Heritage</span>
              <h3 className="text-xl font-bold text-white">Salkhan Fossil Discovery</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Depart Varanasi early morning via SH 5A. Arrive in Robertsganj and explore the 1.4-billion-year-old stromatolite beds at Salkhan. Afternoon walk through local cultural villages.
              </p>
              <span className="block text-[11px] text-stone-500 pt-2 border-t border-stone-800">Stay: Robertsganj Base Hotel</span>
            </div>

            <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 relative space-y-3">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800/60 inline-block">Day 2: Citadel Trek</span>
              <h3 className="text-xl font-bold text-white">Vijaygarh Fortress Ascent</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Early morning ascent of Vijaygarh Fort stone ramparts. Discover 5th-century rock inscriptions and the perennial waters of Mira Sagar. Transfer south towards Renukoot.
              </p>
              <span className="block text-[11px] text-stone-500 pt-2 border-t border-stone-800">Stay: Renukoot / Pipri Rest Area</span>
            </div>

            <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 relative space-y-3">
              <span className="text-xs font-black uppercase text-teal-400 tracking-wider bg-teal-950/80 px-2.5 py-1 rounded-md border border-teal-800/60 inline-block">Day 3: Sacred Waters</span>
              <h3 className="text-xl font-bold text-white">Rihand & Mukha Falls</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Sunrise viewpoint over Govind Ballabh Pant Sagar reservoir. Return journey via Belan Gorge to witness Mukha Falls cascades before heading back to Varanasi.
              </p>
              <span className="block text-[11px] text-stone-500 pt-2 border-t border-stone-800">Return: Varanasi Airport / Junction</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESPONSIBLE TRAVEL CHARTER */}
      <section className="bg-emerald-950/30 border-t border-emerald-900/40 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-800">
            <Trees className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">The Son Adventure Conservation Charter</h2>
          <p className="text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Sonbhadra&apos;s fossil formations and forest catchments are irreplaceable natural treasures. Every visitor must respect strict zero-impact principles:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-4">
            <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-stone-300">Never chip or extract rock samples at Salkhan Fossil Park.</span>
            </div>
            <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-stone-300">Pack out 100% of non-biodegradable waste and plastic bottles.</span>
            </div>
            <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-stone-300">Stick strictly to established stone trails on Vijaygarh cliffs.</span>
            </div>
            <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-stone-300">Support verified local community guides and indigenous hospitality.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
