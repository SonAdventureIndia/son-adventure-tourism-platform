import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'The 1.4 Billion-Year Mystery of Salkhan Fossils · Son Adventure',
  description: 'In-depth scientific and travel analysis of the Mesoproterozoic stromatolites at Salkhan Fossil Park, Sonbhadra, Uttar Pradesh.',
};

export default function ArticleSalkhan() {
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
              The 1.4 Billion-Year Mystery of Salkhan: Pre-Cambrian Stromatolites in Uttar Pradesh
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500 pt-1">
              <span>By Son Adventure Research Team</span>
              <span>·</span>
              <span>November 12, 2026</span>
              <span>·</span>
              <span>8 min read</span>
              <span>·</span>
              <span className="text-[#c85a32] font-bold">Geology & Heritage</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden my-6 border border-stone-200">
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80" alt="Salkhan Fossils" className="w-full h-80 object-cover" />
            <div className="p-3 bg-stone-100 text-[11px] font-mono text-stone-600">
              Concentric stromatolite rings preserved in the Fawn Limestone of the Vindhyan Supergroup, Salkhan.
            </div>
          </div>

          {/* Long Form Editorial Content for AdSense */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-700">
            <p>
              Located just 12 kilometers south of Robertsganj along State Highway 5A lies one of the most astonishing geological windows on planet Earth: <strong>Salkhan Fossil Park (officially Sonbhadra Fossils Park)</strong>. While tourists frequently flock to fossil beds in the United States or Western Australia, few realize that eastern Uttar Pradesh harbors intact, beautifully preserved bio-sedimentary structures dating back approximately 1,400,000,000 years (Mesoproterozoic Era).
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#0a1410] pt-4">What Are Stromatolites?</h2>
            <p>
              Stromatolites are not bones or shells of ancient animals. In fact, when these fossils formed, multicellular animal life did not yet exist. Stromatolites are layered accretionary structures formed in shallow aquatic environments by colonies of photosynthetic cyanobacteria (blue-green algae). These microscopic colonies trapped and bound sediment grains while producing oxygen through photosynthesis, fundamentally reshaping our planet’s atmosphere during the Great Oxidation Event.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#0a1410] pt-4">Geological Context: The Vindhyan Supergroup</h2>
            <p>
              The rocks at Salkhan belong to the <em>Semri Group</em> of the Vindhyan Supergroup, specifically the Fawn Limestone formation. In 2002, geological surveys confirmed that the concentric rings visible across the rock beds represent colonies that thrived in an ancient shallow tropical sea that once covered central India. Unlike many fossil locations worldwide that have suffered intense tectonic deformation, the beds at Salkhan remain remarkably undisturbed, allowing visitors to walk on the prehistoric seafloor.
            </p>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 my-4 text-xs font-mono text-amber-950 space-y-1">
              <strong>Field Visitor Advisory:</strong>
              <p>Removing, chipping, or hammering fossil surfaces is strictly prohibited under Indian archaeological and state forest conservation acts. Always remain on marked walking paths and leave zero waste.</p>
            </div>

            <h2 className="text-2xl font-serif font-bold text-[#0a1410] pt-4">How to Visit Salkhan from Varanasi</h2>
            <p>
              Travelers based in Varanasi can easily embark on a day trip. Depart early morning along the 4-lane Varanasi-Shaktinagar Expressway. The drive to Robertsganj takes approximately 2 hours, followed by a 15-minute drive south along SH 5A to Salkhan village. Certified local guides can be arranged through the Son Adventure platform to explain the micro-structures and trail history.
            </p>
          </div>

          {/* Author Box */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 mt-10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-forest-950 text-gold-400 flex items-center justify-center font-bold text-lg shrink-0 font-serif">
              SA
            </div>
            <div className="text-xs">
              <strong className="text-forest-950 text-sm block">Son Adventure Editorial Desk</strong>
              <p className="text-stone-500 font-sans mt-0.5">Committed to publishing authentic, peer-referenced field dispatches on the natural and cultural heritage of Sonbhadra, Uttar Pradesh.</p>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
}
