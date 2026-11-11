'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Instagram, 
  Youtube, 
  ShieldCheck,
  MapPin
} from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-xl border-b border-stone-800/80 shadow-2xl">
      {/* 1. TOP ANNOUNCEMENT & VERIFIED CREDENTIALS BAR */}
      <div className="bg-stone-900/90 border-b border-stone-800 text-[11px] text-stone-400 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-emerald-400 font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Official Destination Discovery Platform
            </span>
            <span className="hidden md:inline text-stone-600">•</span>
            <span className="hidden md:inline text-stone-300">Sonbhadra, Uttar Pradesh</span>
          </div>

          <div className="flex items-center space-x-6 text-stone-300">
            <a href="mailto:son.doc.tourism@gmail.com" className="hover:text-emerald-400 transition flex items-center">
              <Mail className="w-3 h-3 mr-1 text-emerald-400" />
              <span className="hidden sm:inline">son.doc.tourism@gmail.com</span>
            </a>
            <a href="tel:+917355053822" className="hover:text-emerald-400 transition flex items-center font-bold text-white">
              <Phone className="w-3 h-3 mr-1 text-emerald-400" />
              <span>+91 7355053822</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN CORPORATE NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-950/80 group-hover:scale-105 transition duration-300 border border-emerald-400/30">
            <Compass className="w-6 h-6 text-white stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-wider text-white">SON<span className="text-emerald-400">ADVENTURE</span></span>
              <span className="text-[10px] uppercase tracking-widest bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded font-black">
                U.P.
              </span>
            </div>
            <p className="text-[10px] text-stone-400 tracking-wider font-semibold uppercase">Eco Tourism & Discovery</p>
          </div>
        </Link>

        {/* DESKTOP MENUS */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-stone-200">
          <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
          <Link href="/destinations" className="hover:text-emerald-400 transition">Destinations</Link>
          <Link href="/experiences" className="hover:text-emerald-400 transition">Guided Trails</Link>
          <Link href="/plan-trip" className="hover:text-emerald-400 transition">Plan Trip</Link>
          <Link href="/about" className="hover:text-emerald-400 transition">About Sonbhadra</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">Contact Desk</Link>
        </nav>

        {/* SOCIAL & CTA ACTIONS */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 border-r border-stone-800 pr-4">
            <a 
              href="https://wa.me/917355053822?text=Hello%20Son%20Adventure%20Team,%20I%20want%20to%20plan%20a%20trip%20to%20Sonbhadra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-xl bg-stone-900 hover:bg-emerald-950 text-emerald-400 border border-stone-800 transition"
              title="Direct WhatsApp Helpline"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          <a 
            href="https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20would%20like%20to%20book%20a%20guided%20tour" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-950/80 transition active:scale-95"
          >
            <span>Book Expedition</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center space-x-3 lg:hidden">
          <a 
            href="tel:+917355053822" 
            className="p-2 rounded-xl bg-emerald-600 text-white"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE SLIDE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-semibold text-stone-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-900">Home</Link>
            <Link href="/destinations" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-900">Destinations (Salkhan, Vijaygarh, Rihand, Mukha)</Link>
            <Link href="/experiences" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-900">Guided Trails & Eco Tours</Link>
            <Link href="/plan-trip" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-900">Plan Trip from Varanasi</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-900">About Sonbhadra Heritage</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-emerald-400">Contact & Verification</Link>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a 
              href="https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20inquire%20about%20Sonbhadra%20Tours" 
              className="flex items-center justify-center space-x-2 bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Official Helpdesk</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
