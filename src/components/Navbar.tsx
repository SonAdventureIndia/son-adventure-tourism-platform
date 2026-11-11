import Link from 'next/link';
import { Compass, Phone, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-wider text-white">SON<span className="text-emerald-400">ADVENTURE</span></span>
              <span className="text-[10px] tracking-widest uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded font-bold">
                Official
              </span>
            </div>
            <p className="text-[11px] text-stone-400 tracking-wide font-medium">Sonbhadra Destination Discovery, U.P.</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-300">
          <Link href="/destinations" className="hover:text-emerald-400 transition">Destinations</Link>
          <Link href="/plan-trip" className="hover:text-emerald-400 transition">How to Reach</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">Contact & Verification</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <a 
            href="tel:+917355053822" 
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950 transition active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+91 7355053822</span>
            <span className="sm:hidden">Helpline</span>
          </a>
        </div>
      </div>
    </header>
  );
}
