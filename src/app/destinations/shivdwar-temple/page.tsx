import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Shivdwar Valley Temple · Son Adventure',
  description: 'Ancient 11th-century monolithic black stone idol of Lord Shiva and Parvati in Sonbhadra, UP.',
};

export default function ShivdwarPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <Link href="/destinations" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">← Back to Destinations</Link>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#081710]">Shivdwar Valley Temple</h1>
            <p className="text-xs font-mono text-stone-600">Ghorawal Region · 50 km from Robertsganj · 11th Century</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1545126178-862cdb469409?auto=format&fit=crop&w=1200&q=80" alt="Shivdwar Temple" className="w-full h-80 object-cover" />
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <h2 className="text-xl font-serif font-bold text-[#081710]">Pastoral Serenity & Spiritual Heritage</h2>
            <p>Famous for its ancient temple enshrining a unique, beautifully carved black-stone sculpture of Lord Shiva and Goddess Parvati in an embrace. It represents an anchor of peace and folklore in the western valleys.</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
