import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Son Adventure · Official Sonbhadra Tourism & Outdoor Platform',
  description: 'Official destination discovery platform for Sonbhadra, Uttar Pradesh. Live GPS navigation, 1.4B year fossils, fortresses, waterfalls and offline survival.',
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
                    terracotta: { 600: '#c85a32', 700: '#ac4a26' }
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
      <body>
        {children}
      </body>
    </html>
  );
}
