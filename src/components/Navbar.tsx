'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* TOP LIVE STRIP */}
      <div className="bg-[#0a1410] text-white text-[11px] font-mono py-1.5 px-4 flex flex-wrap justify-between items-center gap-2 border-b border-emerald-900/40">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider text-amber-400">SONBHADRA OFFICIAL PORTAL</span>
          <span className="hidden sm:inline text-stone-300">· 24.6856° N, 83.0689° E</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-stone-300">Helpline: +91 73550 53822</span>
          <Link href="/survival" className="bg-[#c85a32] hover:bg-[#ac4a26] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition">
            SOS / Offline Guide
          </Link>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-stone-200/90 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-1 group">
            <span className="font-serif font-black text-2xl tracking-tight text-[#0a1410]">
              SON<span className="text-[#c85a32] italic">ADVENTURE</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-6 text-xs font-mono font-bold text-stone-700">
            <Link href="/" className="hover:text-[#c85a32] transition">Home</Link>
            <Link href="/destinations" className="hover:text-[#c85a32] transition">Destinations</Link>
            <Link href="/experiences" className="hover:text-[#c85a32] transition">Expeditions</Link>
            <Link href="/plan-trip" className="hover:text-[#c85a32] transition">Plan Trip</Link>
            <Link href="/blog" className="hover:text-[#c85a32] transition text-emerald-800 font-extrabold">Research & Blog</Link>
            <Link href="/gallery" className="hover:text-[#c85a32] transition">Gallery</Link>
            <Link href="/about" className="hover:text-[#c85a32] transition">About</Link>
            <Link href="/contact" className="hover:text-[#c85a32] transition">Contact</Link>
          </div>

          <div className="flex items-center space-x-2">
            <Link 
              href="/plan-trip"
              className="bg-[#0a1410] hover:bg-[#1b432e] text-white py-1.5 px-3.5 rounded-lg text-xs font-mono font-bold transition shadow-sm"
            >
              Book Trail
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden text-stone-900 p-2 border border-stone-300 rounded-lg text-sm hover:bg-stone-100 transition"
              aria-label="Navigation Menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[55px] left-0 right-0 z-50 bg-[#0a1410]/98 border-b border-amber-500/30 p-5 space-y-2.5 shadow-2xl animate-in slide-in-from-top-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            🏠 01. Flagship Home (Live Telemetry & Map)
          </Link>
          <Link href="/destinations" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            🏔️ 02. Destinations Directory
          </Link>
          <Link href="/experiences" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            🧗 03. Guided Expeditions & Packages
          </Link>
          <Link href="/plan-trip" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            🚆 04. How to Reach & Transit Fares
          </Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-amber-300 border-b border-stone-800">
            📰 05. Research Blog & Field Notes (AdSense)
          </Link>
          <Link href="/survival" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-red-400 border-b border-stone-800">
            🛡️ 06. Offline Jungle Survival & SOS
          </Link>
          <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            📸 07. High-Res Photo Gallery
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            📖 08. About Sonbhadra Heritage & Team
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            📞 09. Contact Desk & Verification
          </Link>
        </div>
      )}
    </>
  );
}
