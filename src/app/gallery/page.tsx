'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images = [
    { cat: 'nature', title: 'Kaimur Hills Escarpment', src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' },
    { cat: 'water', title: 'Wyndham Cascades', src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200&auto=format&fit=crop' },
    { cat: 'nature', title: 'Sal Forest Ridge', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop' },
    { cat: 'water', title: 'Rihand Inland Sea Coast', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop' },
    { cat: 'heritage', title: 'Vijaygarh Fort Bastions', src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop' },
    { cat: 'nature', title: 'Sunset over Son Valley', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop' },
    { cat: 'adventure', title: 'Wildlife Belt Canopy', src: 'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1200&auto=format&fit=crop' },
    { cat: 'adventure', title: 'Geodesic Night Camp', src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1200&auto=format&fit=crop' }
  ];

  const filtered = filter === 'all' ? images : images.filter(i => i.cat === filter);

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Visual Field Dispatches
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0a1410]">
              Sonbhadra Photo Gallery
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              High-resolution photography capturing pre-Cambrian geology, water bodies, and citadel summits.
            </p>

            <div className="flex gap-2 pt-2">
              {['all', 'nature', 'water', 'heritage', 'adventure'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`py-1.5 px-3 rounded-full text-xs font-mono font-bold uppercase transition ${filter === f ? 'bg-[#0a1410] text-amber-300' : 'bg-white text-stone-600 border border-stone-200'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {filtered.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setLightbox(img.src)}
                className="h-52 rounded-2xl overflow-hidden relative group cursor-pointer border border-stone-200 shadow-sm"
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                  <span className="text-white text-xs font-mono font-bold">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white text-2xl font-bold">✕</button>
          <img src={lightbox} alt="Enlarged" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/20" />
        </div>
      )}

      <Footer />
    </div>
  );
}
