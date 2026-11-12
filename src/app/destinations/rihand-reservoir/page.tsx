import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Rihand Dam & Reservoir (GBP Sagar) · Son Adventure',
  description: 'Complete guide to Govind Ballabh Pant Sagar inland sea reservoir in Sonbhadra, UP.',
};

export default function RihandPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <Link href="/destinations" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">← Back to Destinations</Link>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#081710]">Rihand Dam & Inland Sea</h1>
            <p className="text-xs font-mono text-stone-600">Pipri / Renukoot · Elevation: 275m MSL · 70 km from Robertsganj</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80" alt="Rihand Reservoir" className="w-full h-80 object-cover" />
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <h2 className="text-xl font-serif font-bold text-[#081710]">Asia’s Premier Inland Freshwater Sea</h2>
            <p>Formed by the concrete gravity Rihand Dam on the Rihand River, Govind Ballabh Pant Sagar spans the border of Uttar Pradesh and Madhya Pradesh. It is an extraordinary expanse of tranquil waters fringed by sal and pine forests.</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
