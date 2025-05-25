// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner'; // <--- Import Toaster from shadcn/ui if you added it via shadcn add sonner
                                                // OR directly from 'sonner' if you installed it manually and want default styling
                                                // For consistency with shadcn, let's assume you do:
                                                // npx shadcn-ui@latest add sonner
                                                // This will create src/components/ui/sonner.tsx

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'College Landing Page',
  description: 'Attract prospective students to our college.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>

        <main className="flex-grow"> {/* Removed container mx-auto px-4 py-8 from here as HeroSection manages its own, and other sections will too */}
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-right" /> {/* Or your preferred position/style */}
      </body>
    </html>
  );
}