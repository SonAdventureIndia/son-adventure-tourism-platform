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
  CheckCircle2
} from 'lucide-react';
import { VERIFIED_DESTINATIONS } from '@/data/destinations';

export default function HomePage() {
  const destinationImages: Record<string, string> = {
    'salkhan-fossils': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    'vijaygarh-fort': 'https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?auto=format&fit=crop&w=1200&q=80',
    'rihand-reservoir': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'mukha-falls': 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
  };

  return (
    <div className="editorial-gradient min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Discover The Hidden Heart of Uttar Pradesh</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Ancient Stones. Sacred Waters. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-200 bg-clip-text text-transparent">
              Wild Sonbhadra.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Step beyond conventional tourist trails. Experience 1.4-billion-year-old fossil beds, cliffside medieval citadels, and sprawling inland reservoirs on an official responsible travel platform.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Link 
              href="/destinations" 
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-emerald-950/60 transition active:scale-95 text-sm"
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

          {/* QUICK CREDIBILITY STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-xl text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">1.4B+</span>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-1 font-semibold">Years Fossil Age</p>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-300">5th Cent.</span>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-1 font-semibold">Vijaygarh Citadel</p>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center">
              <span className="text-2xl sm:text-3xl font-black text-teal-400">105 km</span>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-1 font-semibold">From Varanasi Airport</p>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center">
              <span className="text-2xl sm:text-3xl font-black text-white">100%</span>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-1 font-semibold">Verified Coordinates</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Curated Expedition Highlights</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Verified Wonders of Sonbhadra</h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl">
              Authentic geological, historical, and reservoir expeditions fact-checked against district geographical survey data.
            </p>
          </div>
          <Link href="/destinations" className="mt-4 md:mt-0 text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center">
            View all destinations &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VERIFIED_DESTINATIONS.map((dest) => (
            <div 
              key={dest.id} 
              className="group relative bg-stone-900/80 rounded-2xl border border-stone-800 overflow-hidden hover:border-emerald-500/50 transition duration-300 flex flex-col shadow-2xl"
            >
              {/* IMAGE HEADER */}
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={destinationImages[dest.id] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 brightness-90 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-stone-900/90 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full backdrop-blur-md">
                    {dest.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition">{dest.name}</h3>
                    <p className="text-xs text-amber-200/90 font-medium flex items-center mt-1">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Best Season: {dest.bestSeason}
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">{dest.tagline}</p>
                <p className="text-sm text-stone-300 leading-relaxed">{dest.overview}</p>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center text-stone-300 font-medium">
                    <MapPin className="w-4 h-4 mr-1 text-emerald-400" />
                    {dest.distanceFromVaranasi}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    GPS: {dest.coordinates.lat}°N, {dest.coordinates.lng}°E
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESPONSIBLE EXPEDITION CHARTER */}
      <section className="max-w-4xl mx-auto py-20 px-4 text-center space-y-6">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-white">The Son Adventure Responsible Travel Code</h2>
        <p className="text-sm text-stone-400 max-w-2xl mx-auto leading-relaxed">
          Sonbhadra&apos;s natural and geological environments are fragile. We urge every traveler, photographer, and researcher to commit to zero-impact exploration.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-4">
          <div className="glass-panel p-4 rounded-xl flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-stone-300">Strictly no collection or damaging of fossils at Salkhan Fossil Park.</span>
          </div>
          <div className="glass-panel p-4 rounded-xl flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-stone-300">Carry out all non-biodegradable plastics and packaging.</span>
          </div>
          <div className="glass-panel p-4 rounded-xl flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-stone-300">Stay strictly on demarcated paths on Vijaygarh Fort cliffs.</span>
          </div>
          <div className="glass-panel p-4 rounded-xl flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-stone-300">Honor local tribal customs and respect residential privacy.</span>
          </div>
        </div>

        <div className="pt-8">
          <Link 
            href="/contact" 
            className="inline-flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 px-6 py-3 rounded-xl text-xs font-semibold transition"
          >
            <span>Have Questions or Want to Collaborate? Speak With Our Team</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
