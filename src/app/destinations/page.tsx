'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DestinationsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const places = [
    {
      id: 'salkhan',
      cat: 'geology',
      name: 'Salkhan Fossils Geo-Park',
      elevation: '315m',
      distance: '12 km South of Robertsganj',
      highlight: '1.4 Billion-year-old pre-Cambrian stromatolite strata preserved in natural sandstone beds.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      tips: 'Carry drinking water. Extracting fossil stone is illegal.',
      link: '/destinations/salkhan-fossils'
    },
    {
      id: 'vijaygarh',
      cat: 'heritage',
      name: 'Vijaygarh Fort Citadel',
      elevation: '430m',
      distance: '30 km South-East of Robertsganj',
      highlight: 'Towering 5th-century cliff ramparts, perennial lakes (Mira Sagar) & rock art.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      tips: 'Ascend at dawn; descend before 05:30 PM to avoid wildlife trails.',
      link: '/destinations/vijaygarh-fort'
    },
    {
      id: 'rihand',
      cat: 'reservoir',
      name: 'Rihand Dam & Inland Sea',
      elevation: '275m',
      distance: '70 km South (Pipri)',
      highlight: 'One of Asia’s largest artificial lakes with vast scenic vistas and calm water breezes.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      tips: 'Swimming strictly forbidden due to deep undertows.',
      link: '/destinations/rihand-reservoir'
    },
    {
      id: 'mukha',
      cat: 'waterfall',
      name: 'Mukha Falls (Belan Gorge)',
      elevation: '210m',
      distance: '45 km West (Ghorawal)',
      highlight: 'Tiered cascades dropping into natural sandstone amphitheater gorge with cave shelters.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      tips: 'Flash currents can occur during heavy rains. Keep safe distance from rock edges.',
      link: '/destinations/mukha-waterfall'
    },
    {
      id: 'lakhaniya',
      cat: 'heritage',
      name: 'Lakhaniya Dari Canyon',
      elevation: '260m',
      distance: '20 km from Churk',
      highlight: 'Ancient red-oxide rock art shelters created by early humans in deep sandstone canyons.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      tips: 'Wear high-grip trail boots for bouldering across the canyon floor.',
      link: '/destinations/lakhaniya-dari'
    },
    {
      id: 'agori',
      cat: 'heritage',
      name: 'Agori Island Fort',
      elevation: '220m',
      distance: 'Confluence of Son, Rihand & Bijul',
      highlight: 'Secluded island fortress accessible only by chartered boat crossing deep jungle waters.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      tips: 'Arrange authorized boatman in advance from Obra base.',
      link: '/destinations/agori-fort'
    }
  ];

  const filteredPlaces = places.filter(p => {
    const matchCat = filter === 'all' || p.cat === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.highlight.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="space-y-3 mb-8 border-b border-stone-200 pb-6">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Verified Destinations & POI Directory
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#081710]">
              Destinations Directory
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans">
              Comprehensive, fact-checked field guide to prehistoric fossil beds, cliff fortresses, cascading gorges, and inland lakes in Sonbhadra.
            </p>

            {/* Instant Search Bar & Filter Buttons */}
            <div className="pt-4 space-y-3">
              <div className="relative max-w-md">
                <input 
                  type="text" 
                  placeholder="Search destinations, fossils, forts..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl py-2 px-4 pl-9 text-xs font-mono outline-none focus:border-[#c85a32]"
                />
                <i className="fas fa-search absolute left-3 top-3 text-stone-400 text-xs" />
              </div>

              <div className="flex flex-wrap gap-2">
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
                    className={`py-1.5 px-3.5 rounded-full text-xs font-mono font-bold transition ${filter === f.id ? 'bg-[#081710] text-[#e9c974]' : 'bg-white text-stone-700 border border-stone-200 hover:border-[#c85a32]'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map(p => (
              <div key={p.id} className="pro-card overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-48 relative overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    <span className="absolute top-2.5 left-2.5 bg-[#081710]/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                      {p.elevation}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">{p.distance}</span>
                    <h3 className="text-lg font-bold font-serif text-[#081710]">{p.name}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">{p.highlight}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-3 font-mono text-xs">
                  <div className="p-2 bg-stone-50 rounded-lg text-[10px] text-stone-600 border border-stone-200">
                    <strong>Field Tip:</strong> {p.tips}
                  </div>
                  <Link 
                    href={p.link}
                    className="w-full btn-terracotta py-2 text-center block text-xs"
                  >
                    Inspect Dedicated Dossier →
                  </Link>
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
