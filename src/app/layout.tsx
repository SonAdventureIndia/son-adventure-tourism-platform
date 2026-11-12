import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Son Adventure · Official Sonbhadra Tourism & Monsoon Wilderness Portal',
  description: 'Experience Sonbhadra: Prehistoric fossils, cascading waterfalls, live rainfall telemetry, satellite compass navigation, and offline jungle survival guide.',
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
      </head>
      <body className="bg-[#fdfbf7] text-[#122118] font-sans antialiased selection:bg-[#c85a32] selection:text-white">
        {children}
      </body>
    </html>
  );
}
