import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a1410] text-stone-300 py-10 px-4 text-xs font-mono border-t border-stone-900 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <span className="font-serif font-black text-xl text-white">SON<span className="text-[#c85a32] italic">ADVENTURE</span></span>
          <p className="text-stone-400 text-[11px] leading-relaxed">Official Destination Discovery Platform for Sonbhadra, Uttar Pradesh.</p>
          <div className="pt-2 text-stone-400 text-[11px]">
            Robertsganj, Sonbhadra, UP, India
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px] text-amber-400">Pages</h4>
          <ul className="space-y-2 text-stone-400 text-[11px]">
            <li><Link href="/" className="hover:text-white transition">Home Telemetry</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Destinations Directory</Link></li>
            <li><Link href="/experiences" className="hover:text-white transition">Guided Expeditions</Link></li>
            <li><Link href="/plan-trip" className="hover:text-white transition">How to Reach</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px] text-amber-400">Safety & Support</h4>
          <ul className="space-y-2 text-stone-400 text-[11px]">
            <li><Link href="/survival" className="hover:text-white transition">Offline Jungle Survival</Link></li>
            <li><Link href="/about" className="hover:text-white transition">Heritage & Leadership</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Official Helpdesk</Link></li>
            <li><a href="tel:112" className="text-red-400 font-bold">Police Emergency: 112</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px] text-amber-400">Verified Contacts</h4>
          <ul className="space-y-2 text-stone-400 text-[11px]">
            <li><a href="tel:+917355053822" className="hover:text-white transition">📞 +91 73550 53822</a></li>
            <li><a href="mailto:son.doc.tourism@gmail.com" className="hover:text-white transition">✉️ son.doc.tourism@gmail.com</a></li>
            <li><a href="https://wa.me/917355053822" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold">WhatsApp Direct Link</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 text-center text-stone-500 text-[10px]">
        © {new Date().getFullYear()} Son Adventure Tours & Eco Tourism · Built under UP Eco-Tourism guidelines.
      </div>
    </footer>
  );
}
