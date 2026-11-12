import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Travel Safety Disclaimer · Son Adventure',
  description: 'Safety advisories and official disclaimers for adventure and eco-tourism activities in Sonbhadra.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6 font-sans text-stone-800 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-stone-200 pb-4 space-y-1">
            <h1 className="text-3xl font-serif font-black text-[#0a1410]">Travel & Safety Disclaimer</h1>
            <p className="text-xs text-stone-500 font-mono">Last updated: November 12, 2026</p>
          </div>

          <p>
            Outdoor adventure sports including trekking, rock climbing, and river canyon exploration involve inherent physical risks. Visitors are advised to assess their own physical fitness, carry necessary hydration, wear certified footwear, and engage only authorized regional guides.
          </p>

          <h2 className="text-lg font-serif font-bold text-[#0a1410] pt-2">Flash Floods & Water Bodies</h2>
          <p>
            Water levels at Mukha Falls, Wyndham, and Belan river gorges can surge rapidly during post-monsoon periods. Swimming is strictly prohibited in reservoir waters including Govind Ballabh Pant Sagar (Rihand) due to deep undertows. Son Adventure bears no liability for unguided trespassing into restricted forest perimeters.
          </p>
        </main>
      </div>

      <Footer />
    </div>
  );
}
