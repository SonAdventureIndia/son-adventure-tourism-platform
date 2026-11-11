export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Official Contact</h1>
      <p className="text-sm text-stone-600 mb-6">Contact the Son Adventure team for travel queries or local guide coordination.</p>
      <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-4 text-sm">
        <div>
          <p className="text-xs uppercase text-stone-400 font-bold">Email</p>
          <a href="mailto:son.doc.tourism@gmail.com" className="text-emerald-700 font-semibold">son.doc.tourism@gmail.com</a>
        </div>
        <div>
          <p className="text-xs uppercase text-stone-400 font-bold">Phone / WhatsApp</p>
          <a href="tel:+917355053822" className="text-emerald-700 font-semibold">+91 7355053822</a>
        </div>
        <div>
          <p className="text-xs uppercase text-stone-400 font-bold">Location</p>
          <p className="text-stone-700">Robertsganj, Sonbhadra, Uttar Pradesh, India</p>
        </div>
      </div>
    </div>
  );
}
