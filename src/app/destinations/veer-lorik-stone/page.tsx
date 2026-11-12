import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Veer Lorik Stone & Markundi Ghati · Son Adventure',
  description: 'Explore the legendary cleaved monolith of Veer Lorik Stone on Markundi Pass overlooking Son River valley in Sonbhadra, UP.',
};

export default function VeerLorikPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
          <div className="space-y-2 border-b border-stone-200 pb-6">
            <Link href="/destinations" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">
              ← Back to All Destinations
            </Link>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#081710]">
              Veer Lorik Stone (Son Eco Point)
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-mono">
              Markundi Pass · Elevation: 360m MSL · 5 km from Robertsganj
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" alt="Veer Lorik Stone" className="w-full h-80 object-cover" />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            <h2 className="text-2xl font-serif font-bold text-[#081710]">The Legend of Valour & Eternal Love</h2>
            <p>
              Perched atop the winding Markundi Pass along State Highway 5A, the <strong>Veer Lorik Stone</strong> is a massive sandstone monolith cleft cleanly into two halves. According to local folklore, folk warrior Veer Lorik sliced this giant boulder with a single stroke of his sword as a testament of his eternal love for Manjari before their legendary wedding battle.
            </p>
            <p>
              Today, the surrounding <strong>Son Eco Point</strong> offers breathtaking panoramic views of the Son River valley and the dense forest slopes of the Kaimur escarpment.
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
