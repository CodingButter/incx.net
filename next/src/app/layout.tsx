import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getGlobalConfig } from '@/lib/config';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const config = getGlobalConfig();

export const metadata: Metadata = {
  title: `${config.company.name} - ${config.company.tagline}`,
  description: `Enterprise-grade dedicated servers, VPS, and colocation services with ${config.network.bandwidth} unmetered bandwidth and 24/7 support.`,
  icons: {
    icon: config.branding.favicon,
    shortcut: config.branding.favicon,
    apple: config.branding.favicon,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
