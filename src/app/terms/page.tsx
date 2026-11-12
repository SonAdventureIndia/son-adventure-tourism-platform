import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service · Son Adventure',
  description: 'Terms and conditions governing the use of Son Adventure Tours & Eco Tourism platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6 font-sans text-stone-800 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-stone-200 pb-4 space-y-1">
            <h1 className="text-3xl font-serif font-black text-[#0a1410]">Terms of Service</h1>
            <p className="text-xs text-stone-500 font-mono">Last updated: November 12, 2026</p>
          </div>

          <p>
            By accessing or using the <strong>Son Adventure</strong> platform, you agree to be bound by these Terms of Service, all applicable laws and regulations in Uttar Pradesh, India, and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h2 className="text-lg font-serif font-bold text-[#0a1410] pt-2">1. Eco-Tourism & Conservation Ethics</h2>
          <p>
            Sonbhadra contains sensitive geological reserves (such as Salkhan Fossil Park) and protected wildlife zones (Kaimur Wildlife Sanctuary). Users agree never to damage, extract, or deface geological fossils or archaeological structures. Violation of state protection laws carries severe penal consequences under Indian law.
          </p>

          <h2 className="text-lg font-serif font-bold text-[#0a1410] pt-2">2. Accuracy of Travel Information</h2>
          <p>
            While our platform strives to provide fact-checked fares, weather telemetry, and route guidance, travel conditions may vary due to weather or administrative restrictions. We strongly recommend verifying with authorized local guides before entering deep forest trails.
          </p>
        </main>
      </div>

      <Footer />
    </div>
  );
}
