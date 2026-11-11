import Link from 'next/link';
import { VERIFIED_DESTINATIONS } from '@/data/destinations';

export default function HomePage() {
  return (
    <div>
      <section className="bg-stone-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            Official Destination Discovery
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold">Discover Sonbhadra</h1>
          <p className="text-stone-300 text-base md:text-lg">
            Home to 1.4-billion-year-old fossils, cliffside forts, serene cascades, and vast reservoirs.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/destinations" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded font-medium text-sm">
              Explore Destinations
            </Link>
            <Link href="/plan-trip" className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-5 py-2 rounded font-medium text-sm">
              How to Reach
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">Key Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERIFIED_DESTINATIONS.map((d) => (
            <div key={d.id} className="bg-white border border-stone-200 rounded-lg p-5 shadow-sm hover:shadow transition">
              <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">{d.category}</span>
              <h3 className="font-bold text-stone-900 text-lg mt-2">{d.name}</h3>
              <p className="text-xs text-stone-500 mt-1">{d.tagline}</p>
              <p className="text-xs text-stone-600 mt-3">{d.overview}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
