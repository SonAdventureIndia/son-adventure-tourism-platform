import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Lakhaniya Dari Canyon & Cave Art · Son Adventure',
  description: 'Prehistoric red-oxide rock art shelters and canyon trekking in Sonbhadra, UP.',
};

export default function LakhaniyaPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <Link href="/destinations" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">← Back to Destinations</Link>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#081710]">Lakhaniya Dari Canyon</h1>
            <p className="text-xs font-mono text-stone-600">Near Churk · 20 km from Robertsganj · Elevation: 260m MSL</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80" alt="Lakhaniya Dari" className="w-full h-80 object-cover" />
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <h2 className="text-xl font-serif font-bold text-[#081710]">Prehistoric Rock Shelters</h2>
            <p>Deep sandstone canyons carved by ancient streams, preserving 4,000-year-old rock paintings created by early human hunters depicting wild fauna and community rituals.</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
