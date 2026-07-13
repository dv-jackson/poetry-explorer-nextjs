import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/src/context/theme-context';
import { PoemCacheProvider } from '@/src/context/poem-cache-context';
import React from 'react';

export const metadata: Metadata = {
  title: 'Poetry Explorer',
  description: 'Explore poetry from around the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <PoemCacheProvider>{children}</PoemCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
