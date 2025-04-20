import { ReactNode } from 'react';
import './globals.css';

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
      </body>
    </html>
  );
}
