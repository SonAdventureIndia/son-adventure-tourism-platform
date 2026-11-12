import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#081710] text-stone-300 py-12 px-4 text-xs font-mono border-t border-stone-900 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/10 pb-10">
        
        {/* Brand Description */}
        <div className="space-y-3">
          <Link href="/" className="inline-block">
            <span className="font-serif font-black text-2xl text-white">SON<span className="text-[#c85a32] italic">ADVENTURE</span></span>
          </Link>
          <p className="text-stone-400 text-xs leading-relaxed font-sans">
            Official destination discovery & responsible travel platform for Sonbhadra, Uttar Pradesh. Showcasing 1.4-billion-year-old stromatolites, mountain fortresses, and community eco-tourism.
          </p>
          <div className="pt-1 text-[11px] text-amber-400 font-bold">
            District Headquarters, Robertsganj, UP 231216
          </div>
        </div>

        {/* Dedicated Destinations */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs text-amber-400">Expedition Sites</h4>
          <ul className="space-y-2 text-stone-400 text-xs">
            <li><Link href="/destinations" className="hover:text-white transition">All Destinations</Link></li>
            <li><Link href="/destinations/salkhan-fossils" className="hover:text-white transition">Salkhan Fossil Park</Link></li>
            <li><Link href="/destinations/vijaygarh-fort" className="hover:text-white transition">Vijaygarh Fort Citadel</Link></li>
            <li><Link href="/destinations/rihand-reservoir" className="hover:text-white transition">Rihand Inland Sea</Link></li>
            <li><Link href="/destinations/mukha-waterfall" className="hover:text-white transition">Mukha Falls Gorge</Link></li>
            <li><Link href="/experiences" className="hover:text-white transition">Guided Nature Expeditions</Link></li>
          </ul>
        </div>

        {/* Research Blog & Logistics */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs text-amber-400">Field Research & Plans</h4>
          <ul className="space-y-2 text-stone-400 text-xs">
            <li><Link href="/blog" className="hover:text-white transition text-emerald-300 font-bold">Research Blog & Notes</Link></li>
            <li><Link href="/plan-trip" className="hover:text-white transition">How to Reach (Road & Rail)</Link></li>
            <li><Link href="/survival" className="hover:text-white transition">Offline Jungle Survival Guide</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition">High-Res Photo Gallery</Link></li>
            <li><Link href="/about" className="hover:text-white transition">Geological History & Team</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Official Contact Desk</Link></li>
          </ul>
        </div>

        {/* Legal & Google AdSense Compliance */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs text-amber-400">Compliance & Legal</h4>
          <ul className="space-y-2 text-stone-400 text-xs">
            <li><Link href="/privacy-policy" className="hover:text-white transition font-bold text-stone-300">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition font-bold text-stone-300">Terms of Service</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white transition font-bold text-stone-300">Travel Safety Disclaimer</Link></li>
            <li><a href="tel:+917355053822" className="hover:text-white transition block pt-2 text-white font-bold">📞 +91 73550 53822</a></li>
            <li><a href="mailto:son.doc.tourism@gmail.com" className="hover:text-white transition block text-amber-300">✉️ son.doc.tourism@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-stone-400 text-[11px] gap-2">
        <p>© {new Date().getFullYear()} Son Adventure Tours & Eco Tourism. Built in strict compliance with UP Tourism & Wildlife Guidelines.</p>
        <p className="text-stone-500">Official digital gateway for Sonbhadra, UP, India.</p>
      </div>
    </footer>
  );
}
