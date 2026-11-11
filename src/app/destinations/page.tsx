import { VERIFIED_DESTINATIONS } from '@/data/destinations';

export default function DestinationsPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-stone-900">Sonbhadra Destinations</h1>
      <p className="text-sm text-stone-600">Official, verified directory of natural and heritage wonders.</p>
      <div className="space-y-6 mt-6">
        {VERIFIED_DESTINATIONS.map((d) => (
          <div key={d.id} className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
            <span className="text-xs font-semibold text-emerald-700 uppercase">{d.category}</span>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">{d.name}</h2>
            <p className="text-sm text-emerald-600 mb-3">{d.tagline}</p>
            <p className="text-sm text-stone-700 leading-relaxed">{d.description}</p>
            <div className="mt-4 p-3 bg-stone-50 rounded text-xs space-y-1 text-stone-600">
              <p><strong>Best Season:</strong> {d.bestSeason}</p>
              <p><strong>Transit Distance:</strong> {d.distanceFromVaranasi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
