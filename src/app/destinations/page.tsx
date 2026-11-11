import { VERIFIED_DESTINATIONS } from '@/data/destinations';
import { MapPin, Clock, ShieldCheck, Mountain, Navigation, Compass } from 'lucide-react';

export default function DestinationsPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* HEADER */}
      <div className="border-b border-stone-800 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Official Directory</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Sonbhadra Destinations</h1>
        <p className="text-stone-400 text-sm max-w-2xl leading-relaxed">
          Comprehensive, fact-checked guide to the geological formations, fortresses, reservoirs, and waterfalls across Sonbhadra district, Uttar Pradesh.
        </p>
      </div>

      {/* DESTINATION CARDS */}
      <div className="space-y-12">
        {VERIFIED_DESTINATIONS.map((dest) => (
          <div 
            key={dest.id} 
            id={dest.slug}
            className="bg-stone-900/90 rounded-3xl border border-stone-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
          >
            {/* IMAGE */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img 
                src={dest.imageUrl} 
                alt={dest.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-bold uppercase tracking-wider bg-stone-950/90 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full">
                  {dest.category}
                </span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-3xl font-extrabold text-white">{dest.name}</h2>
                  <span className="text-xs text-amber-300 font-semibold bg-amber-950/60 border border-amber-800 px-3 py-1 rounded-lg">
                    {dest.bestSeason}
                  </span>
                </div>
                <p className="text-xs text-emerald-400 uppercase font-semibold tracking-wide">{dest.tagline}</p>
                <p className="text-sm text-stone-300 leading-relaxed">{dest.description}</p>
                
                {/* HIGHLIGHT BOX */}
                <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800 text-xs text-stone-300 flex items-start space-x-3">
                  <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Primary Highlight:</strong> {dest.highlight}</span>
                </div>
              </div>

              {/* LOGISTICS & RULES */}
              <div className="pt-4 border-t border-stone-800 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-400">
                  <p className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> {dest.distanceFromVaranasi}</p>
                  <p className="flex items-center"><Navigation className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> GPS: {dest.coordinates?.lat}°N, {dest.coordinates?.lng}°E</p>
                </div>

                {dest.safetyTips && (
                  <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/40 space-y-1.5">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">Safety & Regulation Code:</span>
                    <ul className="list-disc list-inside text-stone-300 space-y-1">
                      {dest.safetyTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
