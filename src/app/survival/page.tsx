'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SurvivalPage() {
  const sosContacts = [
    { name: 'Sonbhadra Police Control Room', num: '112', desc: 'Direct 24/7 District Police Dispatch' },
    { name: 'District Hospital Ambulance', num: '108', desc: 'Emergency trauma & medical response, Robertsganj' },
    { name: 'Kaimur Forest Range Checkpost', num: '+915444222268', desc: 'Forest rangers & wildlife emergency support' },
    { name: 'Son Adventure Emergency Desk', num: '+917355053822', desc: 'Local verified guide assistance & SOS help' },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              Offline Field Protocol & SOS
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0a1410]">
              Jungle Survival Manual
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans">
              Save this page to your home screen or bookmarks. In deep Kaimur forest zones where mobile signals drop to zero, these offline rules ensure your safety.
            </p>
          </div>

          {/* SOS 1-TAP CONTACTS */}
          <div className="bg-[#0a1410] text-white p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-lg font-bold font-serif text-amber-400">Direct 1-Tap Emergency Dials (Works without mobile data)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {sosContacts.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-xs">{c.name}</h4>
                    <p className="text-[10px] text-stone-400">{c.desc}</p>
                  </div>
                  <a href={`tel:${c.num}`} className="bg-red-700 hover:bg-red-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs shrink-0">
                    Dial {c.num}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* SURVIVAL GUIDELINES */}
          <div className="space-y-4 font-sans text-xs text-stone-700">
            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-sm">
              <strong className="text-sm font-serif font-bold text-[#0a1410] block">1. Satellite GPS Works Without Cell Reception</strong>
              <p className="leading-relaxed">Your mobile phone contains a dedicated GNSS/GPS silicon receiver that talks directly to orbiting satellites without consuming cellular data or needing signal bars. The trail compass on our homepage operates offline.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-sm">
              <strong className="text-sm font-serif font-bold text-[#0a1410] block">2. Waterfall Flash Surge Prevention</strong>
              <p className="leading-relaxed">At Mukha Falls and Belan River tributaries, heavy showers in catchment ridges 20 km away can cause gorge waters to rise 2 meters within 15 minutes. Never wade into rapids or sit on wet drop edges.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-sm">
              <strong className="text-sm font-serif font-bold text-[#0a1410] block">3. Night Wildlife Sanctuary Regulations</strong>
              <p className="leading-relaxed">Forests surrounding Vijaygarh Fort and Naugarh border the Kaimur Wildlife Sanctuary, home to sloth bears and leopards. Always conclude your mountain descent before 05:30 PM. Always carry a whistle and torch.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-sm">
              <strong className="text-sm font-serif font-bold text-[#0a1410] block">4. Snake Bite Emergency Protocol</strong>
              <p className="leading-relaxed">Keep the victim calm and still. Do not cut, tourniquet, or suction the wound. Splint the limb and immediately transport to District Hospital Robertsganj (anti-venom serum is stocked 24/7).</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
