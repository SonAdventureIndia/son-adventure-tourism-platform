import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Son Adventure · Official Tourism Discovery & Outdoor Platform for Sonbhadra, UP',
  description: 'Explore Sonbhadra: Mesoproterozoic Salkhan Fossils (1.4 Billion Years Old), Vijaygarh Fort, Rihand Dam, Mukha Falls, live GPS satellite radar and offline jungle survival guide.',
  keywords: ['Sonbhadra tourism', 'Salkhan fossil park', 'Vijaygarh fort trek', 'Rihand reservoir', 'Mukha waterfall', 'Varanasi day trips', 'eco tourism Uttar Pradesh'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    forest: { 950: '#0a1410', 900: '#0e261a', 800: '#1b432e' },
                    gold: { 400: '#e9c974', 500: '#d4a537', 600: '#a87d22' },
                    canyon: { 500: '#d9653b', 600: '#c85a32', 700: '#ac4a26' },
                    sand: { 50: '#fdfbf7', 100: '#f8f5ee', 200: '#f1ebd9' }
                  },
                  fontFamily: {
                    serif: ['Fraunces', 'serif'],
                    sans: ['Manrope', 'sans-serif'],
                    mono: ['Space Grotesk', 'monospace']
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body className="bg-[#fdfbf7] text-[#122118] font-sans antialiased selection:bg-[#c85a32] selection:text-white">
        {children}
      </body>
    </html>
  );
}
