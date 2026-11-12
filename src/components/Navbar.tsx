'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ onOpenCompass, onOpenSos }: { onOpenCompass?: () => void; onOpenSos?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/experiences', label: 'Expeditions' },
    { href: '/plan-trip', label: 'Plan Trip' },
    { href: '/blog', label: 'Research Blog' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'Founder & Story' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <>
      {/* 1. TOP LIVE TICKER */}
      <div className="bg-[#081710] text-white text-[11px] font-mono py-1.5 px-4 flex flex-wrap justify-between items-center gap-2 border-b border-emerald-900/40">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">SONBHADRA EXPEDITION DESK</span>
          <span className="hidden sm:inline text-stone-300">· 24.6856° N, 83.0689° E</span>
        </div>
        <div className="ml-auto flex items-center space-x-3 text-xs">
          <span className="text-stone-300">Helpline: +91 73550 53822</span>
          {onOpenSos ? (
            <button 
              onClick={onOpenSos}
              className="bg-[#c85a32] hover:bg-[#ac4a26] text-white px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition shadow-sm"
            >
              SOS Help
            </button>
          ) : (
            <Link 
              href="/survival"
              className="bg-[#c85a32] hover:bg-[#ac4a26] text-white px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition shadow-sm"
            >
              SOS Guide
            </Link>
          )}
        </div>
      </div>

      {/* 2. MAIN NAV (With SA Monogram Logo) */}
      <header className="sticky top-0 z-40 bg-[#fcfaf6]/95 backdrop-blur-md border-b border-stone-200/90 px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2.5 group">
            {/* Styled SA Logo Monogram */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-amber-600 flex items-center justify-center shadow-md p-1 border border-white/40">
              <span className="font-serif font-black text-xl text-white tracking-tighter">SA</span>
            </div>
            <div>
              <span className="font-serif font-black text-xl tracking-tight text-[#081710]">
                SON<span className="text-[#c85a32] italic">ADVENTURE</span>
              </span>
              <span className="block text-[9px] font-mono uppercase tracking-widest text-emerald-800 font-bold -mt-1">
                Estd. 2012 · Sonbhadra
              </span>
            </div>
          </Link>

          {/* Desktop Links with Active State */}
          <nav className="hidden lg:flex space-x-6 text-xs font-mono font-bold text-stone-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`transition ${isActive ? 'text-[#c85a32] font-black border-b-2 border-[#c85a32]' : 'hover:text-[#c85a32]'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            {onOpenCompass && (
              <button 
                onClick={onOpenCompass}
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#081710] bg-white border border-stone-300 py-1.5 px-3 rounded-lg shadow-sm hover:border-[#c85a32] transition"
              >
                <i className="fas fa-compass text-[#c85a32]" />
                <span>Compass</span>
              </button>
            )}

            <Link 
              href="/experiences"
              className="bg-[#081710] hover:bg-[#112d1f] text-white py-1.5 px-3.5 rounded-lg text-xs font-mono font-bold transition shadow-sm"
            >
              Book Trail
            </Link>

            {/* Mobile Menu Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden text-stone-900 p-2 border border-stone-300 rounded-lg text-sm hover:bg-stone-100 transition"
              aria-label="Navigation Menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[55px] left-0 right-0 z-50 bg-[#081710]/98 border-b border-amber-500/30 p-5 space-y-2.5 shadow-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link, idx) => (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-xs font-mono font-bold text-white border-b border-stone-800 hover:text-amber-300"
            >
              0{idx + 1}. {link.label}
            </Link>
          ))}
          <div className="pt-2 flex gap-2">
            <Link 
              href="/survival"
              onClick={() => setMobileMenuOpen(false)} 
              className="flex-1 bg-red-700 text-white font-mono font-bold py-2 rounded-lg text-xs text-center"
            >
              <i className="fas fa-shield-heart mr-1" /> SOS Guide
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
