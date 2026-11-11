import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-extrabold text-white tracking-wider">SON<span className="text-emerald-400">ADVENTURE</span></span>
            <span className="text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-bold">ECO TOURISM</span>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed max-w-md">
            The official digital gateway and destination promotion platform for Sonbhadra, Uttar Pradesh. Promoting 1.4-billion-year-old geological wonders, pristine water reservoirs, and ancient Vindhyan heritage while safeguarding local community interests.
          </p>
          <div className="flex items-center space-x-4 pt-2 text-xs text-stone-500">
            <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-emerald-500" /> Fact-Checked Data</span>
            <span className="flex items-center"><HeartHandshake className="w-4 h-4 mr-1 text-emerald-500" /> Community-Led</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200">Official Contact</h4>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <a href="mailto:son.doc.tourism@gmail.com" className="hover:text-emerald-300 transition text-stone-300">son.doc.tourism@gmail.com</a>
            </li>
            <li className="flex items-start space-x-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <a href="tel:+917355053822" className="hover:text-emerald-300 transition text-stone-300">+91 7355053822</a>
            </li>
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-stone-400">Robertsganj, Sonbhadra, Uttar Pradesh 231216</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200">Responsible Tourism</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Preserve fossil beds at Salkhan. Zero littering near water bodies. Engage certified local forest guides for high-elevation trails.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500">
        <p>© {new Date().getFullYear()} Son Adventure Tours & Eco Tourism. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link href="/plan-trip" className="hover:text-stone-300 transition">How to Reach</Link>
          <Link href="/destinations" className="hover:text-stone-300 transition">Destinations</Link>
          <Link href="/contact" className="hover:text-stone-300 transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
