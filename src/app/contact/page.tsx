import { Mail, Phone, MapPin, MessageSquare, ShieldCheck, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="border-b border-stone-800 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Official Helpdesk</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Contact & Expeditions Desk</h1>
        <p className="text-stone-400 text-sm leading-relaxed">
          Get in touch with the official Son Adventure team for customized travel itineraries, certified guide bookings, media inquiries, or operator registrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DIRECT CREDENTIALS */}
        <div className="bg-stone-900 p-8 rounded-3xl border border-stone-800 space-y-6">
          <h2 className="text-xl font-bold text-white">Verified Coordinates</h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-xs font-bold uppercase text-stone-500 tracking-wider block">Official Email</span>
              <a href="mailto:son.doc.tourism@gmail.com" className="text-emerald-400 font-semibold text-base hover:underline">
                son.doc.tourism@gmail.com
              </a>
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-stone-500 tracking-wider block">Official Phone & WhatsApp</span>
              <a href="tel:+917355053822" className="text-emerald-400 font-semibold text-base hover:underline">
                +91 7355053822
              </a>
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-stone-500 tracking-wider block">Headquarters Desk</span>
              <span className="text-stone-300">Robertsganj, Sonbhadra District, Uttar Pradesh 231216</span>
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-stone-500 tracking-wider block">Desk Hours</span>
              <span className="text-stone-300">08:00 AM – 08:00 PM IST (Daily)</span>
            </div>
          </div>

          <div className="pt-2">
            <a 
              href="https://wa.me/917355053822?text=Hello%20Son%20Adventure%20Team,%20I%20have%20an%20inquiry%20regarding%20Sonbhadra%20Tourism" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl w-full transition text-sm shadow-xl"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp Directly</span>
            </a>
          </div>
        </div>

        {/* GUIDELINES & PROTOCOL */}
        <div className="bg-stone-900/60 p-8 rounded-3xl border border-stone-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-emerald-400" /> Travel Advisory Notice
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Son Adventure verifies all information in accordance with regional forest, archaeological, and administrative regulations. We never recommend entering restricted biological zones without authorized local guides.
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              For corporate expeditions, academic geology field-trips, or foreign national travel advisories, please email us with prior notice.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400">
            <strong>Emergency Contact:</strong> Dial +91 7355053822 or message via WhatsApp for on-ground assistance between Robertsganj and Renukoot.
          </div>
        </div>
      </div>
    </div>
  );
}
