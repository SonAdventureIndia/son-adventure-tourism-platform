import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy · Son Adventure',
  description: 'Official privacy policy for Son Adventure Tours & Eco Tourism platform in accordance with global data protection and Google AdSense guidelines.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6 font-sans text-stone-800 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-stone-200 pb-4 space-y-1">
            <h1 className="text-3xl font-serif font-black text-[#0a1410]">Privacy Policy</h1>
            <p className="text-xs text-stone-500 font-mono">Last updated: November 12, 2026</p>
          </div>

          <p>
            Welcome to <strong>Son Adventure Tours & Eco Tourism</strong> ("we", "our", or "us"). We are dedicated to respecting your privacy regarding any information we may collect while operating our website (https://son-adventure.pages.dev). This Privacy Policy explains how we collect, use, and protect your information in full compliance with Google AdSense, GDPR, and Indian Information Technology laws.
          </p>

          <h2 className="text-lg font-serif font-bold text-[#0a1410] pt-2">1. Information We Collect</h2>
          <p>
            We collect information only when voluntarily submitted by users through our inquiry forms, newsletter subscription, or guide contact forms. This may include your name, email address, and phone number. When you access our Live GPS Compass, location coordinates are processed strictly client-side on your device and are never stored on external tracking servers without your consent.
          </p>

          <h2 className="text-lg font-serif font-bold text-[#0a1410] pt-2">2. Cookies and Google AdSense</h2>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
          </p>

          <h2 className="text-lg font-serif font-bold text-[#0a1410] pt-2">3. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please email us directly at <strong>son.doc.tourism@gmail.com</strong> or phone +91 73550 53822.
          </p>
        </main>
      </div>

      <Footer />
    </div>
  );
}
