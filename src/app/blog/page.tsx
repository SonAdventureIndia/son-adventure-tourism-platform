import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Sonbhadra Research Blog & Field Notes · Son Adventure',
  description: 'In-depth geological research, travel guides, fortress history, and expedition dispatches from Sonbhadra, Uttar Pradesh.',
};

export default function BlogHubPage() {
  const posts = [
    {
      slug: 'salkhan-fossils-stromatolites-geology',
      title: 'The 1.4 Billion-Year Mystery of Salkhan: Pre-Cambrian Stromatolites in Uttar Pradesh',
      category: 'Geological Science',
      date: 'November 12, 2026',
      readTime: '8 min read',
      excerpt: 'How cyanobacteria colonies in the Vindhyan Supergroup produced Earth’s earliest oxygen rings billions of years before dinosaurs ever roamed.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    },
    {
      slug: 'vijaygarh-fort-chandrakanta-history-trek',
      title: 'Trekking Vijaygarh Fort: The 5th-Century Citadel That Inspired Chandrakanta',
      category: 'History & Trekking',
      date: 'November 10, 2026',
      readTime: '6 min read',
      excerpt: 'A comprehensive field guide to climbing 500+ stone steps into the Kaimur clouds, exploring ancient perennial reservoirs and prehistoric rock shelters.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    },
    {
      slug: 'varanasi-to-sonbhadra-road-trip-guide',
      title: 'Complete Varanasi to Sonbhadra Road Trip Itinerary: Route, Fares & Stays',
      category: 'Travel Logistics',
      date: 'November 05, 2026',
      readTime: '7 min read',
      excerpt: 'Step-by-step transportation breakdown: pre-paid airport cabs, local UPSRTC buses, train links, and best seasonal highway routes along State Highway 5A.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    },
    {
      slug: 'waterfalls-of-kaimur-belan-gorge',
      title: 'Hidden Cascades of the Kaimur Plateau: Mukha Falls, Wyndham & Belan Gorge',
      category: 'Eco-Tourism',
      date: 'October 28, 2026',
      readTime: '5 min read',
      excerpt: 'Explore the tiered rock shelves and natural amphitheaters of central Sonbhadra, including essential flash-flood safety protocols for hikers.',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1000&q=80',
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="space-y-3 mb-10 border-b border-stone-200 pb-6">
            <span className="text-[10px] font-mono font-bold uppercase text-[#c85a32] bg-white border border-stone-200 px-3 py-1 rounded-full">
              Field Dispatches & Research
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0a1410]">
              Sonbhadra Research & Travel Blog
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans">
              Authentic, thoroughly researched articles on geology, fortress heritage, and travel logistics in eastern Uttar Pradesh.
            </p>
          </div>

          {/* Featured Article */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm mb-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 h-72 lg:h-full relative overflow-hidden">
              <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-[#c85a32] font-bold uppercase">{posts[0].category}</span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500">{posts[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-bold font-serif text-[#0a1410] leading-snug">
                  <Link href={`/blog/${posts[0].slug}`} className="hover:text-[#c85a32] transition">
                    {posts[0].title}
                  </Link>
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {posts[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-xs font-mono">
                <span className="text-stone-400">{posts[0].date}</span>
                <Link href={`/blog/${posts[0].slug}`} className="text-[#c85a32] font-bold hover:underline">
                  Read Full Article →
                </Link>
              </div>
            </div>
          </div>

          {/* Grid of Other Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(1).map(post => (
              <div key={post.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-44 relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#c85a32] uppercase">{post.category} · {post.readTime}</span>
                    <h3 className="text-base font-bold font-serif text-[#0a1410] leading-snug">
                      <Link href={`/blog/${post.slug}`} className="hover:text-[#c85a32] transition">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-sans">{post.excerpt}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link href={`/blog/${post.slug}`} className="text-xs font-mono font-bold text-[#c85a32] hover:underline block pt-3 border-t border-stone-100">
                    Read Story →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
