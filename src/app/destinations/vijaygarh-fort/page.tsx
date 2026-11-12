import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Vijaygarh Fort Citadel · Son Adventure',
  description: 'Complete trail details, historical context, elevation, and safety guidelines for Vijaygarh Fort in Sonbhadra, UP.',
};

export default function VijaygarhDetailPage() {
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
              Vijaygarh Fort Citadel
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-mono">
              GPS Coordinates: 24.5772° N, 83.2104° E · Elevation: 430m · 5th-Century Fortress
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80" alt="Vijaygarh" className="w-full h-80 object-cover" />
          </div>

          <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-serif font-bold text-[#0a1410]">The Mountain Citadel in the Clouds</h2>
            <p>
              Towering 400 meters above the Son River valley, Vijaygarh Fort features stone battlements, ancient rock-cut inscriptions from the Gupta era, and the perennial Mira Sagar reservoir. Climbing the 500+ hand-carved stone steps is one of the premier trekking experiences in eastern Uttar Pradesh.
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
