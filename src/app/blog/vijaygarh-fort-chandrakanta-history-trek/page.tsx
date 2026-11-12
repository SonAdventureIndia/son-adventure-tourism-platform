import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Trekking Vijaygarh Fort: History & Trail Guide · Son Adventure',
  description: 'Complete trekking, historical and archaeological guide to 5th-century Vijaygarh Fort in Sonbhadra, Uttar Pradesh.',
};

export default function ArticleVijaygarh() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 font-sans text-stone-800 space-y-6">
          <div className="space-y-2 border-b border-stone-200 pb-6">
            <Link href="/blog" className="text-xs font-mono font-bold text-[#c85a32] hover:underline">
              ← Back to Research Blog
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#0a1410] leading-tight">
              Trekking Vijaygarh Fort: The 5th-Century Citadel in the Clouds
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500 pt-1">
              <span>By Son Adventure Expedition Team</span>
              <span>·</span>
              <span>November 10, 2026</span>
              <span>·</span>
              <span>6 min read</span>
              <span>·</span>
              <span className="text-[#c85a32] font-bold">Fortresses & Trekking</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden my-6 border border-stone-200">
            <img src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80" alt="Vijaygarh Fort" className="w-full h-80 object-cover" />
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-700">
            <p>
              Towering over 400 meters above the fertile Son River valley, <strong>Vijaygarh Fort</strong> is one of the most enigmatic mountain fortresses in northern India. Located near Mau Kalan village in Sonbhadra, this cliff citadel gained literary fame through Babu Devaki Nandan Khatri's celebrated 19th-century fantasy novel <em>Chandrakanta</em>. But its true history spans back to the 5th century CE.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#0a1410] pt-4">Ancient Inscriptions and Perennial Waters</h2>
            <p>
              The fort preserves ancient rock-cut inscriptions from the Gupta era, along with later medieval reinforcements by Chandapradyota rulers and regional chieftains. Perhaps its most fascinating engineering marvel is the pair of mountain-top perennial freshwater reservoirs known as <strong>Mira Sagar</strong> and <strong>Ram Sagar</strong>. Despite their high elevation on an isolated sandstone plateau, these reservoirs never run dry, providing water throughout the hottest Vindhyan summers.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#0a1410] pt-4">The Trek: 500+ Stone Steps into History</h2>
            <p>
              The trail begins at the base village of Mau Kalan, approximately 30 km from Robertsganj. Trekkers ascend over 500 hand-hewn stone steps through deciduous dry forest. In the early morning hours, low-lying valley mists swirl around the bastions, creating the illusion of floating above the clouds.
            </p>

            <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 my-4 text-xs font-mono text-stone-800 space-y-1">
              <strong>Wildlife & Safety Precaution:</strong>
              <p>The slopes around Vijaygarh border corridors frequented by sloth bears and leopards. Trekkers should always begin their descent before 05:30 PM and travel in groups with authorized guides.</p>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
}
