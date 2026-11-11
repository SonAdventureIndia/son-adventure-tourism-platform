import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Son Adventure | Official Destination Discovery Platform for Sonbhadra, Uttar Pradesh',
  description: 'Discover Sonbhadra: Mesoproterozoic Salkhan Fossils (1.4B Years Old), 5th-century Vijaygarh Fortress, Rihand Reservoir (GBP Sagar), and Mukha Waterfalls.',
  keywords: ['Sonbhadra tourism', 'Salkhan fossil park', 'Vijaygarh fort', 'Rihand dam', 'Mukha waterfall', 'Varanasi day trips', 'eco tourism Uttar Pradesh'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-stone-950 text-stone-100 antialiased selection:bg-emerald-500 selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
