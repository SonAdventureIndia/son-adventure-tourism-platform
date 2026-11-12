import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Founder & Mission · Neeraj Dwivedi · Son Adventure',
  description: 'Founded in 2012 by Neeraj Dwivedi with a mission to develop safe, structured, and responsible adventure tourism in Sonbhadra, Uttar Pradesh.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {/* Header */}
          <div className="space-y-2 border-b border-stone-200 pb-6">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Foundation & Vision Since 2012
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#081710]">
              The Story of Son Adventure
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans">
              Transforming unexplored prehistoric landscapes into meaningful, safe, and world-class adventure spaces.
            </p>
          </div>

          {/* Founder Feature Box */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden border-4 border-amber-500/20 shadow-xl">
                <img 
                  src="https://sonadventure.com/wp-content/uploads/2025/12/1000086797-1.jpg" 
                  alt="Neeraj Dwivedi - Founder" 
                  className="w-full h-80 object-cover object-top"
                  onError={(e: any) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>
            <div className="md:col-span-7 space-y-3 font-sans text-stone-700 text-xs sm:text-sm leading-relaxed">
              <span className="text-xs font-mono font-bold uppercase text-[#c85a32] block">
                Founder's Message
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#081710]">
                Mr. Neeraj Kumar Dwivedi
              </h2>
              <p>
                <strong>Mr. Neeraj Dwivedi</strong> is the Founder of Son Adventure, established in 2012, with a strong vision to develop safe, structured, and responsible adventure tourism in the Sonbhadra region of Uttar Pradesh.
              </p>
              <p>
                With a rare combination of legal expertise, leadership discipline, and a deep-rooted passion for nature and outdoor exploration, he laid the foundation of Son Adventure to bring global recognition to Sonbhadra’s 1.4-billion-year-old geo-heritage.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-mono text-amber-950">
                "Sonbhadra is not just a destination — it is an ancient classroom of Earth history. Travel responsibly, respect the tribal forests, and explore with discipline."
              </div>
            </div>
          </div>

          {/* Geological Story */}
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            <h2 className="text-2xl font-serif font-bold text-[#081710]">The Ancient Vindhyan Basin</h2>
            <p>
              Sonbhadra borders four Indian states: Madhya Pradesh, Chhattisgarh, Jharkhand, and Bihar. Beneath its dense teak forests lie undisturbed Mesoproterozoic sedimentary strata holding the famous Salkhan stromatolites — structures that witnessed the dawn of oxygen-producing microbial life on planet Earth.
            </p>
            <p>
              Beyond geology, Sonbhadra houses medieval citadels like Vijaygarh and Agori, alongside indigenous tribal communities (Gond, Baiga, Kol, Kharwar) whose folklore, music, and ecological wisdom have protected these hills for generations.
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
