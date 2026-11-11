import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-emerald-400 tracking-tight text-lg">
          SON ADVENTURE <span className="text-xs text-stone-400 font-normal ml-1">Sonbhadra</span>
        </Link>
        <nav className="flex space-x-6 text-sm">
          <Link href="/destinations" className="hover:text-emerald-400">Destinations</Link>
          <Link href="/plan-trip" className="hover:text-emerald-400">Plan Trip</Link>
          <Link href="/contact" className="hover:text-emerald-400">Contact</Link>
        </nav>
        <a href="tel:+917355053822" className="hidden sm:inline-block bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 rounded font-semibold">
          +91 7355053822
        </a>
      </div>
    </header>
  );
}
