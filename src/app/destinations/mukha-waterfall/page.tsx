import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Mukha Falls & Belan Gorge · Son Adventure',
  description: 'Tiered cascades dropping into natural amphitheater sandstone shelves in Sonbhadra, UP.',
};

export default function MukhaPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <Link href="/destinations" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">← Back to Destinations</Link>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#081710]">Mukha Falls & Belan River Gorge</h1>
            <p className="text-xs font-mono text-stone-600">Ghorawal Region · Elevation: 210m MSL · 45 km West of Robertsganj</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80" alt="Mukha Falls" className="w-full h-80 object-cover" />
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <h2 className="text-xl font-serif font-bold text-[#081710]">Canyon Amphitheater Cascades</h2>
            <p>Carved by the tributaries of the Belan River basin, Mukha Falls cascades through tiered sandstone shelves into a serene natural pool. Adjacent rock shelters preserve ancient red-oxide rock art.</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
