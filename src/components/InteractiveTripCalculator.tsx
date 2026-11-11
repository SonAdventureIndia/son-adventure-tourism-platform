'use client';

import { useState } from 'react';
import { Calculator, Users, Calendar, ShieldCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { VERIFIED_DESTINATIONS } from '@/data/destinations';

export default function InteractiveTripCalculator() {
  const [selectedDest, setSelectedDest] = useState(VERIFIED_DESTINATIONS[0].name);
  const [paxCount, setPaxCount] = useState(2);
  const [daysCount, setDaysCount] = useState(2);
  const [includeGuide, setIncludeGuide] = useState(true);

  // Dynamic estimate calculation
  const baseRatePerDay = 1500;
  const guideFeePerDay = 1200;
  const totalCost = (paxCount * baseRatePerDay * daysCount) + (includeGuide ? guideFeePerDay * daysCount : 0);

  const whatsAppMessage = `Hello Son Adventure Team,%0A%0AI want to book an expedition to Sonbhadra with the following details:%0A- Destination: ${encodeURIComponent(selectedDest)}%0A- Travelers: ${paxCount} Persons%0A- Duration: ${daysCount} Days%0A- Certified Guide: ${includeGuide ? 'Yes' : 'No'}%0A- Calculated Estimate: ₹${totalCost.toLocaleString('en-IN')}%0A%0APlease confirm availability and permit guidelines.`;

  return (
    <div className="bg-stone-900 rounded-3xl border border-stone-800 p-8 sm:p-10 shadow-2xl space-y-8">
      <div className="border-b border-stone-800 pb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Custom Journey Planner</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Expedition Budget Estimator</h3>
        </div>
        <span className="text-xs bg-stone-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-800/80 font-bold">
          Transparent District Pricing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DESTINATION SELECTION */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-300 uppercase">Primary Attraction</label>
          <select 
            value={selectedDest}
            onChange={(e) => setSelectedDest(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            {VERIFIED_DESTINATIONS.map(d => (
              <option key={d.id} value={d.name}>{d.name} ({d.category})</option>
            ))}
          </select>
        </div>

        {/* PAX COUNTER */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-300 uppercase">Travelers ({paxCount} Pax)</label>
          <input 
            type="range" 
            min="1" 
            max="15" 
            value={paxCount}
            onChange={(e) => setPaxCount(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-stone-500">
            <span>Solo (1)</span>
            <span>Family (4-6)</span>
            <span>Group (15)</span>
          </div>
        </div>

        {/* DURATION (DAYS) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-300 uppercase">Duration ({daysCount} Days)</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setDaysCount(d)}
                className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                  daysCount === d 
                    ? 'bg-emerald-600 border-emerald-500 text-white' 
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                {d} {d === 1 ? 'Day' : 'Days'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GUIDE TOGGLE & FINAL ESTIMATE STRIP */}
      <div className="p-6 bg-stone-950/80 rounded-2xl border border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-6">
        <label className="flex items-center space-x-3 cursor-pointer text-xs text-stone-300 font-semibold">
          <input 
            type="checkbox" 
            checked={includeGuide} 
            onChange={(e) => setIncludeGuide(e.target.checked)}
            className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
          />
          <span>Include Authorized District Naturalist / Trail Guide (+₹1,200/day)</span>
        </label>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <span className="text-[10px] text-stone-500 uppercase block font-bold">Estimated Base Package</span>
            <span className="text-3xl font-black text-emerald-400">₹{totalCost.toLocaleString('en-IN')}</span>
          </div>

          <a 
            href={`https://wa.me/917355053822?text=${whatsAppMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-emerald-950 active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Lock On WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
