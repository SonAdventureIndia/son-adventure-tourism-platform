export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs py-10 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-stone-200 font-bold mb-2">Son Adventure Tours & Eco Tourism</h4>
          <p className="leading-relaxed">Official destination discovery platform for Sonbhadra, Uttar Pradesh.</p>
        </div>
        <div>
          <h4 className="text-stone-200 font-bold mb-2">Contact Details</h4>
          <p>Email: son.doc.tourism@gmail.com</p>
          <p>WhatsApp / Call: +91 7355053822</p>
          <p>Robertsganj, Sonbhadra, UP</p>
        </div>
        <div>
          <h4 className="text-stone-200 font-bold mb-2">Responsible Travel</h4>
          <p>Protect ancient stromatolites at Salkhan. Take nothing but memories, leave nothing but footprints.</p>
        </div>
      </div>
      <div className="text-center text-stone-600 mt-8 pt-4 border-t border-stone-900">
        &copy; 2026 Son Adventure. All rights reserved.
      </div>
    </footer>
  );
}
