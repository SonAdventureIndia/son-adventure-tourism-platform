'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ExperiencesPage() {
  const experiences = [
    {
      title: 'Deep-Time Mesoproterozoic Geo-Walk',
      cat: 'Geology Walk',
      duration: '4 Hours (Half Day)',
      difficulty: 'Easy',
      rate: '₹1,200',
      meeting: 'Salkhan Interpretation Center',
      desc: 'Led by certified local naturalists, decode the 1.4B year old cyanobacterial fossil rings and understand prebiotic Earth evolution.',
      inclusions: ['Authorized Geo-Guide', 'Safety Briefing', 'Printed Mineral Field Chart', 'Packaged Water']
    },
    {
      title: 'Vijaygarh Fort Sunrise Ascent & Cave Art',
      cat: 'Heritage Trek',
      duration: '6 Hours (Full Morning)',
      difficulty: 'Moderate (500+ Stone Steps)',
      rate: '₹1,850',
      meeting: 'Mau Kalan Base Trailhead',
      desc: 'Ascend before dawn to witness above-the-clouds sunrise. Explore 5th-century inscriptions and the perennial Mira Sagar reservoir.',
      inclusions: ['Mountain Guide', 'Breakfast Box', 'Forest Entry Fees', 'First-Aid Kit']
    },
    {
      title: 'Rihand Lake Shore Kayaking & Eco-Camp',
      cat: 'Water & Camping',
      duration: 'Overnight (2 Days / 1 Night)',
      difficulty: 'Easy to Moderate',
      rate: '₹3,500',
      meeting: 'Pipri / Renukoot Overlook Base',
      desc: 'Paddle on the vast inland freshwater sea of Govind Ballabh Pant Sagar, followed by night star-gazing in geodesic camping domes.',
      inclusions: ['Kayak Gear & Marshals', 'Dome Camp Stay', 'Dinner & Bonfire', 'Safety Lifejackets']
    },
    {
      title: 'Belan Gorge & Mukha Falls Nature Trail',
      cat: 'Waterfall Expedition',
      duration: '5 Hours',
      difficulty: 'Moderate',
      rate: '₹1,500',
      meeting: 'Ghorawal Checkpoint',
      desc: 'Hike through sandstone river shelves and natural cascades fringed by ancient rock shelters.',
      inclusions: ['Local Guide', 'Trail Refreshments', 'Waterfall Safety Briefing']
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-2 mb-8">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Authorized Eco-Tourism Guides
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0a1410]">
              Guided Trails & Expeditions
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans">
              All expeditions are conducted by verified regional guides adhering to archaeological protection laws and forest department protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#c85a32] font-bold uppercase">{exp.cat}</span>
                    <span className="bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded">{exp.difficulty}</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#0a1410]">{exp.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{exp.desc}</p>
                  
                  <div className="pt-2 text-xs font-mono space-y-1 text-stone-600">
                    <div><strong>Duration:</strong> {exp.duration}</div>
                    <div><strong>Meeting Point:</strong> {exp.meeting}</div>
                  </div>

                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block mb-1">Inclusions:</span>
                    <div className="flex flex-wrap gap-1 text-[11px] font-mono text-stone-700">
                      {exp.inclusions.map((inc, i) => (
                        <span key={i} className="bg-stone-50 border border-stone-200/80 px-2 py-0.5 rounded">✓ {inc}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">Fee per explorer</span>
                    <span className="text-2xl font-black font-serif text-[#0a1410]">{exp.rate}</span>
                  </div>
                  <a 
                    href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20reserve%20the%20${encodeURIComponent(exp.title)}.`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#25D366] hover:bg-[#1fa851] text-white font-mono text-xs font-bold py-2.5 px-4 rounded-xl flex items-center space-x-1.5 shadow-sm transition"
                  >
                    <i className="fab fa-whatsapp" />
                    <span>Reserve via WhatsApp</span>
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
