import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Salkhan Fossil Park · Deep Time Geo-Heritage · Son Adventure',
  description: 'Complete visitor dossier, coordinates, best visiting times, and scientific background for Salkhan Fossil Park in Sonbhadra, UP.',
};

export default function SalkhanDetailPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 font-sans">
          <div className="space-y-2 border-b border-stone-200 pb-6">
            <Link href="/destinations" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">
              ← Back to All Destinations
            </Link>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0a1410]">
              Salkhan Fossils Geo-Park
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-mono">
              GPS Coordinates: 24.5833° N, 83.0833° E · Elevation: 315m · Semri Group Limestone
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80" alt="Salkhan" className="w-full h-80 object-cover" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
              <span className="text-stone-400 uppercase text-[10px] block">Distance from HQ</span>
              <strong className="text-sm text-forest-950">12 km South</strong>
            </div>
            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
              <span className="text-stone-400 uppercase text-[10px] block">Optimal Visiting Window</span>
              <strong className="text-sm text-forest-950">07:30 AM – 11:30 AM</strong>
            </div>
            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
              <span className="text-stone-400 uppercase text-[10px] block">Geological Age</span>
              <strong className="text-sm text-[#c85a32]">1.4 Billion Years</strong>
            </div>
          </div>

          <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-serif font-bold text-[#0a1410]">Overview & Significance</h2>
            <p>
              Located in Salkhan village, this 25-hectare protected site preserves ancient microbial colonies formed by photosynthetic cyanobacteria. These colonies produced the oxygen that transformed Earth's atmosphere during the Mesoproterozoic Era. The circular concentric rings embedded in sandstone and limestone represent one of the most intact prebiotic windows on Earth.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <strong className="text-sm text-forest-950 block">Interested in a Guided Geo-Walk?</strong>
              <p className="text-xs text-stone-500">Authorized naturalists explain fossil formation and provide mineral field charts.</p>
            </div>
            <Link href="/contact" className="bg-[#c85a32] hover:bg-[#ac4a26] text-white font-mono text-xs font-bold py-2.5 px-5 rounded-xl transition">
              Inquire Guided Trail
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
