import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Son Adventure | Discover Sonbhadra, Uttar Pradesh',
  description: 'Official destination discovery and eco-tourism platform for Sonbhadra. Salkhan Fossils, Vijaygarh Fort, Mukha Falls, and Rihand Lake.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
