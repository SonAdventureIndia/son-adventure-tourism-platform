import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Varanasi to Sonbhadra Road Trip & Fares Guide · Son Adventure',
  description: 'Detailed highway travel guide from Varanasi to Sonbhadra including taxi rates, bus schedules, train links, and best scenic routes.',
};

export default function ArticleRoadTrip() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 font-sans text-stone-800 space-y-6">
          <div className="space-y-2 border-b border-stone-200 pb-6">
            <Link href="/blog" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">
              ← Back to Research Blog
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#0a1410] leading-tight">
              Complete Varanasi to Sonbhadra Road Trip Itinerary: Routes, Fares & Stays
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500 pt-1">
              <span>By Logistics & Transport Desk</span>
              <span>·</span>
              <span>November 05, 2026</span>
              <span>·</span>
              <span>7 min read</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden my-6 border border-stone-200">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80" alt="Varanasi Sonbhadra Highway" className="w-full h-80 object-cover" />
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-700">
            <p>
              For centuries, travelers visiting Varanasi have focused primarily on its sacred ghats and silk weavers. However, just 90 kilometers south lies Uttar Pradesh’s second-largest and most forested district: <strong>Sonbhadra</strong>. With the completion of the 4-lane Varanasi-Shaktinagar highway (State Highway 5A), accessing this wilderness has never been easier.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#0a1410] pt-4">Highway Route & Driving Times</h2>
            <p>
              The recommended driving route departs Varanasi Cantt, crossing Chunar or Mirzapur junction, and ascending the Vindhyan plateau. The entire distance to Robertsganj (District Headquarters) is approximately 90 to 105 km, taking around 2 to 2.5 hours by private car.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#0a1410] pt-4">Verified Transport Fares (2026)</h2>
            <ul className="list-disc list-inside space-y-1.5 text-xs font-mono">
              <li><strong>Pre-paid Taxi from Varanasi Airport (VNS):</strong> ₹2,800 to ₹3,500 (one-way sedan)</li>
              <li><strong>UPSRTC Ordinary Bus:</strong> ₹120 (Departs every 20-30 mins from Varanasi Cantt Bus Station)</li>
              <li><strong>UPSRTC AC Janrath Bus:</strong> ₹240 (Air-conditioned express service)</li>
              <li><strong>Local Passenger Trains:</strong> Available from DDU Junction to Churk / Robertsganj</li>
            </ul>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
}
