import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Agori Island Fort · Son Adventure',
  description: 'Jungle fortress accessible only by boat at the tri-river confluence in Sonbhadra, UP.',
};

export default function AgoriPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <Link href="/destinations" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">← Back to Destinations</Link>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#081710]">Agori Island Fort</h1>
            <p className="text-xs font-mono text-stone-600">Confluence of Son, Rihand & Bijul Rivers · Chartered Boat Access Only</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80" alt="Agori Fort" className="w-full h-80 object-cover" />
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <h2 className="text-xl font-serif font-bold text-[#081710]">Secluded Jungle Citadel</h2>
            <p>Surrounded by three rivers near Obra, Agori Fort was an ancient strategic stronghold hidden within the dense forest. Visitors reach it by local wooden boats across the calm waters of the river confluence.</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
