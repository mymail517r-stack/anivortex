import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AniVortex - Hindi Anime Streaming',
  description: 'Stream your favorite Hindi anime with AniVortex. Discover thousands of anime series and movies.',
  keywords: 'anime, hindi anime, streaming, anivortex',
  openGraph: {
    title: 'AniVortex - Hindi Anime Streaming',
    description: 'Stream your favorite Hindi anime with AniVortex',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
