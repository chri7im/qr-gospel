import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'QR Gospel',
  description: 'Spreading the greatest news!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
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
