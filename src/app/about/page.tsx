'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const team = [
    { name: 'Niraj Dwivedi', role: 'Founder', bio: 'Pioneer of adventure eco-tourism in Sonbhadra since 2012, dedicated to establishing the region as India’s premier geo-heritage hub.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
    { name: 'Vikas Kumar Mishra', role: 'Technical Head', bio: 'Architect of our real-time GPS telemetry, digital mapping infrastructure, and mobile satellite navigation tools.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' },
    { name: 'Anil Dwivedi', role: 'Management Head', bio: 'Oversees hospitality standards, luxury geodesic dome camps, and strategic regional tourism partnerships.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop' },
    { name: 'Kuldeep', role: 'Operations Head', bio: 'Directs on-ground safety protocols, field equipment management, and certified local guide training.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Pioneering Responsible Tourism
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0a1410]">
              About Son Adventure
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans">
              Founded in 2012 to establish Sonbhadra as one of India's leading eco-tourism, adventure, and geological discovery destinations.
            </p>
          </div>

          {/* Geological Story */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3 text-xs font-sans text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-serif font-bold text-[#0a1410]">The Ancient Heart of the Vindhyan Basin</h2>
            <p>
              Sonbhadra is India’s only district bordering four states (Uttar Pradesh, Madhya Pradesh, Chhattisgarh, and Jharkhand). Beneath its dense teak and sal forests lie geological strata dating back to the Mesoproterozoic era (over 1,400,000,000 years ago).
            </p>
            <p>
              The fossilized stromatolite beds at Salkhan represent ancient microbial colonies that produced the very oxygen that transformed Earth’s prehistoric atmosphere. Beyond geology, the region has preserved medieval cliff citadels, prehistoric cave art, and indigenous tribal traditions (Gond, Baiga, Kharwar, Kol).
            </p>
          </div>

          {/* Leadership Team */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#0a1410]">Leadership Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {team.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="h-48 overflow-hidden">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 text-center space-y-1">
                    <h3 className="font-bold text-base font-serif text-[#0a1410]">{m.name}</h3>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full inline-block">{m.role}</span>
                    <p className="text-xs text-stone-600 font-sans pt-1 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
