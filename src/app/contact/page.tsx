'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Official Helpdesk
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0a1410]">
              Contact & Inquiry Desk
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans">
              Connect directly with our regional coordinators for customized trip planning, local guide verification, or group bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Credentials Card */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 font-mono text-xs">
              <h3 className="font-serif font-bold text-lg text-[#0a1410]">Verified Office Coordinates</h3>
              
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block uppercase text-[10px] font-bold">Official Phone & WhatsApp</span>
                  <a href="tel:+917355053822" className="text-sm font-bold text-[#0a1410] hover:text-[#c85a32]">+91 73550 53822</a>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block uppercase text-[10px] font-bold">Official Email</span>
                  <a href="mailto:son.doc.tourism@gmail.com" className="text-sm font-bold text-[#0a1410] hover:text-[#c85a32]">son.doc.tourism@gmail.com</a>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block uppercase text-[10px] font-bold">Base Office</span>
                  <p className="text-stone-700 text-xs">Robertsganj, Sonbhadra District, Uttar Pradesh 231216, India</p>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20have%20an%20inquiry%20regarding%20Sonbhadra%20Tours."
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-[#25D366] hover:bg-[#1fa851] text-white py-3 px-4 rounded-xl font-bold text-center block transition shadow-sm"
                >
                  <i className="fab fa-whatsapp mr-1.5" /> Direct WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#0a1410]">Send an Inquiry</h3>
              {submitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-mono">
                  ✓ Thank you! Your inquiry has been received. Our team will contact you within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
                  <div>
                    <label className="text-stone-500 font-bold uppercase block mb-1">Your Name</label>
                    <input type="text" required placeholder="Full Name" className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 outline-none" />
                  </div>
                  <div>
                    <label className="text-stone-500 font-bold uppercase block mb-1">Email or Phone</label>
                    <input type="text" required placeholder="Email / Phone number" className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 outline-none" />
                  </div>
                  <div>
                    <label className="text-stone-500 font-bold uppercase block mb-1">Message / Travel Dates</label>
                    <textarea rows={4} required placeholder="Where do you want to explore?" className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 outline-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#0a1410] hover:bg-[#1b432e] text-white font-bold py-2.5 rounded-xl uppercase tracking-wider transition">
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
