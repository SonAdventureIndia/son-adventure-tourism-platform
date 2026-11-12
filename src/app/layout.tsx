import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Son Adventure · Official Sonbhadra Tourism & Outdoor Exploration Portal',
  description: '1.4-billion-year fossils, cliffside forts, roaring waterfalls, live satellite compass, real-time weather radar, and offline jungle survival guide for Sonbhadra, Uttar Pradesh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    'name': 'Sonbhadra Tourism Ecosystem',
    'description': 'Premier geological, eco-tourism, and adventure travel portal for Sonbhadra, UP, India.',
    'url': 'https://son-adventure.pages.dev',
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 24.6856,
      'longitude': 83.0689
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body className="bg-[#fcfaf6] text-[#122118] font-sans antialiased selection:bg-[#c85a32] selection:text-white">
        {children}
      </body>
    </html>
  );
}
