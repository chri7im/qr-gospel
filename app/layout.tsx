import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QR Gospel',
  description: 'Spreading the greatest news!',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-100 min-h-screen flex items-center justify-center">
        {children}
        <Analytics /> {/* Add the Analytics component here */}
      </body>
    </html>
  );
}
