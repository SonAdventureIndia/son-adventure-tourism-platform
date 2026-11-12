'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DestinationsPage() {
  const [filter, setFilter] = useState('all');

  const places = [
    {
      id: 'salkhan',
      cat: 'geology',
      name: 'Salkhan Fossils Geo-Park',
      elevation: '315m',
      distance: '12 km South of Robertsganj',
      highlight: '1.4 Billion-year-old pre-Cambrian stromatolite strata preserved in natural sandstone beds.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      tips: 'Carry drinking water. Extracting fossil stone is illegal.'
    },
    {
      id: 'vijaygarh',
      cat: 'heritage',
      name: 'Vijaygarh Fort Citadel',
      elevation: '430m',
      distance: '30 km South-East of Robertsganj',
      highlight: 'Towering 5th-century cliff ramparts, perennial lakes (Mira Sagar) & rock art.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      tips: 'Ascend at dawn; descend before 05:30 PM to avoid wildlife trails.'
    },
    {
      id: 'rihand',
      cat: 'reservoir',
      name: 'Rihand Dam & Inland Sea',
      elevation: '275m',
      distance: '70 km South (Pipri)',
      highlight: 'One of Asia’s largest artificial lakes with vast scenic vistas and calm water breezes.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      tips: 'Swimming strictly forbidden due to deep undertows.'
    },
    {
      id: 'mukha',
      cat: 'waterfall',
      name: 'Mukha Falls (Belan Gorge)',
      elevation: '210m',
      distance: '45 km West (Ghorawal)',
      highlight: 'Tiered cascades dropping into natural sandstone amphitheater gorge with cave shelters.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      tips: 'Flash currents can occur during heavy rains. Keep safe distance from rock edges.'
    },
    {
      id: 'lakhaniya',
      cat: 'heritage',
      name: 'Lakhaniya Dari Canyon',
      elevation: '260m',
      distance: '20 km from Churk',
      highlight: 'Ancient red-oxide rock art shelters created by early humans in deep sandstone canyons.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&q=80',
      tips: 'Wear high-grip trail boots for bouldering across the canyon floor.'
    },
    {
      id: 'agori',
      cat: 'heritage',
      name: 'Agori Island Fort',
      elevation: '220m',
      distance: 'Confluence of Son, Rihand & Bijul',
      highlight: 'Secluded island fortress accessible only by chartered boat crossing deep jungle waters.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&q=80',
      tips: 'Arrange authorized boatman in advance from Obra base.'
    }
  ];

  const filteredPlaces = filter === 'all' ? places : places.filter(p => p.cat === filter);

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-2 mb-8">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Verified Heritage & Natural Wonders
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0a1410]">
              Destinations Directory
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans">
              Comprehensive guide to the geological formations, fortresses, reservoirs, and canyons of Sonbhadra, Uttar Pradesh.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 pt-4">
              {[
                { id: 'all', label: 'All Places' },
                { id: 'geology', label: '🌋 Geological' },
                { id: 'heritage', label: '🏰 Forts & Heritage' },
                { id: 'waterfall', label: '🌊 Waterfalls' },
                { id: 'reservoir', label: '🛶 Lakes & Reservoirs' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`py-1.5 px-3.5 rounded-full text-xs font-mono font-bold transition ${filter === f.id ? 'bg-[#0a1410] text-[#e9c974]' : 'bg-white text-stone-700 border border-stone-200'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPlaces.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-48 relative overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 bg-[#0a1410]/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                      {p.elevation}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">{p.distance}</span>
                    <h3 className="text-lg font-bold font-serif text-[#0a1410]">{p.name}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{p.highlight}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2 font-mono text-xs">
                  <div className="p-2 bg-stone-50 rounded-lg text-[10px] text-stone-600 border border-stone-200/60">
                    <strong>Field Tip:</strong> {p.tips}
                  </div>
                  <a 
                    href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20plan%20a%20guided%20visit%20to%20${encodeURIComponent(p.name)}.`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-[#c85a32] hover:bg-[#ac4a26] text-white font-bold py-2 rounded-lg text-center block transition shadow-sm text-xs"
                  >
                    Inquire Guided Trail
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
