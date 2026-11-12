'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PlanTripPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Transit & Logistics Dossier
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0a1410]">
              How to Reach Sonbhadra
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans">
              Practical transportation logistics, verified fares, and railheads for domestic and foreign visitors arriving via Varanasi or Prayagraj.
            </p>
          </div>

          {/* Transit options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2.5">
              <span className="text-2xl">✈️</span>
              <h3 className="font-bold text-base text-[#0a1410] font-serif">By Flight (Air)</h3>
              <p className="text-stone-600 font-sans leading-relaxed">
                Nearest airport: <strong>Lal Bahadur Shastri International Airport (VNS)</strong> in Babatpur, Varanasi (~105 km to Robertsganj).
              </p>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <div><strong>Pre-Paid Taxi:</strong> ₹2,800 – ₹3,500</div>
                <div><strong>Travel Duration:</strong> ~2.5 hrs via SH 5A</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2.5">
              <span className="text-2xl">🚆</span>
              <h3 className="font-bold text-base text-[#0a1410] font-serif">By Train (Railways)</h3>
              <p className="text-stone-600 font-sans leading-relaxed">
                Key stations: <strong>Sonbhadra (Robertsganj - LUSA/CUK)</strong>, <strong>Chopan</strong>, <strong>Renukoot</strong>.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <div><strong>Major Junction:</strong> Pt. Deen Dayal Upadhyaya (DDU)</div>
                <div><strong>Alternative Junction:</strong> Mirzapur (MZP)</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2.5">
              <span className="text-2xl">🚗</span>
              <h3 className="font-bold text-base text-[#0a1410] font-serif">By Road & Bus</h3>
              <p className="text-stone-600 font-sans leading-relaxed">
                4-lane Varanasi-Shaktinagar Expressway corridor (State Highway 5A / NH 39).
              </p>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <div><strong>UPSRTC Buses:</strong> Every 30 mins from Varanasi Cantt</div>
                <div><strong>Bus Fare:</strong> ₹120 – ₹240 (Ordinary to AC)</div>
              </div>
            </div>
          </div>

          {/* Seasonal Calendar */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-serif text-[#0a1410]">Best Seasonal Travel Windows</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <strong className="block text-sm">Winter (Oct to Mar) · Peak</strong>
                <p className="text-[11px] font-sans">Mild daytime temperatures (15°C–25°C). Ideal for Salkhan fossil explorations, rock climbing, and Vijaygarh ascents.</p>
              </div>
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 space-y-1">
                <strong className="block text-sm">Post-Monsoon (Aug to Oct)</strong>
                <p className="text-[11px] font-sans">Best for Mukha Falls cascades. The Kaimur hills turn vibrant emerald green. Caution needed around river rapids.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                <strong className="block text-sm">Summer (Apr to Jun)</strong>
                <p className="text-[11px] font-sans">Hot dry winds (35°C–44°C). Recommended only for early dawn fort treks or dusk reservoir breezes at Rihand.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
