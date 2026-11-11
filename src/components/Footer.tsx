import Link from 'next/link';
import { 
  Compass, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Trees
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* COL 1 & 2: CORPORATE IDENTITY */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-wider">SON<span className="text-emerald-400">ADVENTURE</span></span>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Tours & Eco Tourism</span>
            </div>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            Son Adventure is the official destination discovery platform dedicated to showcasing the 1.4-billion-year-old geological heritage, sacred waters, and ancient Vindhyan fortresses of Sonbhadra, Uttar Pradesh.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-xs">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> District Verified Data
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
              <Trees className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Responsible Eco-Travel
            </span>
          </div>
        </div>

        {/* COL 3: DESTINATION DIRECTORY */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200">Destinations</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/destinations" className="hover:text-emerald-400 transition">Salkhan Fossil Park</Link></li>
            <li><Link href="/destinations" className="hover:text-emerald-400 transition">Vijaygarh Citadel</Link></li>
            <li><Link href="/destinations" className="hover:text-emerald-400 transition">Rihand Reservoir (GBP Sagar)</Link></li>
            <li><Link href="/destinations" className="hover:text-emerald-400 transition">Mukha Falls (Belan Gorge)</Link></li>
            <li><Link href="/destinations" className="hover:text-emerald-400 transition">Kaimur Forest Belts</Link></li>
          </ul>
        </div>

        {/* COL 4: LOGISTICS & EXPEDITIONS */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200">Travel Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/plan-trip" className="hover:text-emerald-400 transition">How to Reach from Varanasi</Link></li>
            <li><Link href="/experiences" className="hover:text-emerald-400 transition">Certified Guided Trails</Link></li>
            <li><Link href="/about" className="hover:text-emerald-400 transition">Prehistoric Geological Heritage</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400 transition">Operator Verification Portal</Link></li>
            <li><a href="https://wa.me/917355053822" target="_blank" rel="noopener noreferrer" className="text-emerald-400 flex items-center">WhatsApp Helpdesk <ExternalLink className="w-3 h-3 ml-1" /></a></li>
          </ul>
        </div>

        {/* COL 5: VERIFIED DESK & CONTACT */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200">Official Helpdesk</h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start space-x-2">
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <a href="mailto:son.doc.tourism@gmail.com" className="hover:text-white transition break-all">
                son.doc.tourism@gmail.com
              </a>
            </div>
            <div className="flex items-start space-x-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <a href="tel:+917355053822" className="hover:text-white transition font-semibold text-stone-200">
                +91 7355053822
              </a>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-stone-400 leading-tight">
                District Headquarters, Robertsganj, Sonbhadra, Uttar Pradesh 231216
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL & COMPLIANCE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 gap-4">
        <p>© {new Date().getFullYear()} Son Adventure Tours & Eco Tourism. Positioned under Uttar Pradesh Eco-Tourism & Heritage guidelines.</p>
        <div className="flex items-center space-x-6">
          <Link href="/about" className="hover:text-stone-300 transition">Mission Charter</Link>
          <Link href="/plan-trip" className="hover:text-stone-300 transition">Safety Protocol</Link>
          <Link href="/contact" className="hover:text-stone-300 transition">Contact Desk</Link>
        </div>
      </div>
    </footer>
  );
}
