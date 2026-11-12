'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ onOpenCompass, onOpenSos }: { onOpenCompass?: () => void; onOpenSos?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* TOP STATUS TICKER */}
      <div className="bg-[#0a1410] text-white text-[11px] font-mono py-1.5 px-4 flex flex-wrap justify-between items-center gap-2 border-b border-emerald-900/40">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider text-amber-400">SONBHADRA PORTAL</span>
          <span className="text-stone-300">· 24.6856° N, 83.0689° E</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-stone-200">Helpline: +91 73550 53822</span>
          {onOpenSos && (
            <button 
              onClick={onOpenSos}
              className="bg-[#c85a32] hover:bg-[#ac4a26] text-white px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase transition shadow-sm"
            >
              SOS Help
            </button>
          )}
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-stone-200/90 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-1">
            <span className="font-serif font-black text-2xl tracking-tight text-[#0a1410]">
              SON<span className="text-[#c85a32] italic">ADVENTURE</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-6 text-xs font-mono font-bold text-stone-700">
            <Link href="/" className="hover:text-[#c85a32] transition">Home</Link>
            <Link href="/destinations" className="hover:text-[#c85a32] transition">Destinations</Link>
            <Link href="/experiences" className="hover:text-[#c85a32] transition">Experiences</Link>
            <Link href="/plan-trip" className="hover:text-[#c85a32] transition">Plan Trip</Link>
            <Link href="/survival" className="hover:text-[#c85a32] transition">Survival Guide</Link>
            <Link href="/about" className="hover:text-[#c85a32] transition">About</Link>
            <Link href="/contact" className="hover:text-[#c85a32] transition">Contact</Link>
          </div>

          <div className="flex items-center space-x-2">
            {onOpenCompass && (
              <button 
                onClick={onOpenCompass}
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#0a1410] bg-white border border-stone-300 py-1.5 px-3 rounded-lg shadow-sm hover:border-[#c85a32] transition"
              >
                <i className="fas fa-compass text-[#c85a32]" />
                <span>Compass</span>
              </button>
            )}

            <a 
              href="https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20inquire%20about%20Sonbhadra%20Tours."
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#25D366] hover:bg-[#1fa851] text-white py-1.5 px-3 rounded-lg text-xs font-mono font-bold inline-flex items-center space-x-1 shadow-sm transition"
            >
              <i className="fab fa-whatsapp" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden text-stone-900 p-2 border border-stone-300 rounded-lg text-sm"
              aria-label="Navigation Menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[55px] left-0 right-0 z-50 bg-[#0a1410]/98 border-b border-amber-500/30 p-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            🏠 01. Flagship Home (Live Telemetry & Map)
          </Link>
          <Link href="/destinations" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            🏔️ 02. All Destinations Directory
          </Link>
          <Link href="/experiences" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            🧗 03. Guided Trails & Expeditions
          </Link>
          <Link href="/plan-trip" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            🚆 04. How to Reach & Transport Fares
          </Link>
          <Link href="/survival" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            🛡️ 05. Offline Jungle Survival Guide
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            📖 06. About Sonbhadra & Team
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800">
            📞 07. Contact Desk & Guide Verification
          </Link>
        </div>
      )}
    </>
  );
}
