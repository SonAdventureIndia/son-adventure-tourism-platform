import { Plane, Train, Car, ShieldAlert, CheckCircle, MapPin, Calendar } from 'lucide-react';

export default function PlanTripPage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="border-b border-stone-800 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Visitor Logistics</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">How to Reach Sonbhadra</h1>
        <p className="text-stone-400 text-sm max-w-2xl leading-relaxed">
          Comprehensive transportation, best seasonal windows, and safety advisories for domestic and international travelers visiting from Varanasi.
        </p>
      </div>

      {/* TRANSIT MODES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center">
            <Plane className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">By Air (Flight)</h2>
          <p className="text-xs text-stone-300 leading-relaxed">
            The primary gateway is <strong>Lal Bahadur Shastri International Airport (VNS)</strong> in Babatpur, Varanasi (approx. 105 km to Robertsganj). Pre-paid cabs and rental services operate directly from VNS to Sonbhadra.
          </p>
        </div>

        <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center">
            <Train className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">By Train (Railways)</h2>
          <p className="text-xs text-stone-300 leading-relaxed">
            Key district railheads are <strong>Sonbhadra (Robertsganj - LUSA/CUK)</strong> and <strong>Renukoot (RNQ)</strong>. Major high-speed junctions nearby include <strong>Pt. Deen Dayal Upadhyaya Jn (DDU)</strong> and <strong>Mirzapur (MZP)</strong>.
          </p>
        </div>

        <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-950 text-teal-400 flex items-center justify-center">
            <Car className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">By Road (Highways)</h2>
          <p className="text-xs text-stone-300 leading-relaxed">
            Connected via the 4-lane <strong>Varanasi-Shaktinagar Expressway (SH 5A)</strong> and <strong>NH 39</strong>. Daily UPSRTC state transport air-conditioned and standard buses connect Varanasi Cantt, Prayagraj, and Mirzapur with Robertsganj.
          </p>
        </div>
      </div>

      {/* SEASONS CALENDAR */}
      <div className="bg-stone-900 p-8 rounded-3xl border border-stone-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-emerald-400" /> Optimal Visiting Seasons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
            <span className="font-bold text-emerald-400 block mb-1">Winter (October to March)</span>
            <p className="text-stone-300 leading-relaxed">Peak tourist season. Mild daytime temperatures (15°C - 26°C), ideal for Salkhan geological explorations and Vijaygarh hiking.</p>
          </div>
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
            <span className="font-bold text-teal-400 block mb-1">Post-Monsoon (August to October)</span>
            <p className="text-stone-300 leading-relaxed">Best for Mukha Falls and cascades. The Vindhyan hills turn vibrant emerald green. Caution needed around slippery trails.</p>
          </div>
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
            <span className="font-bold text-amber-400 block mb-1">Summer (April to June)</span>
            <p className="text-stone-300 leading-relaxed">Hot and dry (35°C - 44°C). Recommended only for dawn or dusk reservoir visits at Rihand with hydration precautions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
