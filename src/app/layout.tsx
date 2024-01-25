import type { Metadata } from 'next';
import { Viewport } from 'next';

import { Inter as FontSans } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import { Nav } from '@/components/Nav/nav';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

export const metadata: Metadata = {
  title: 'Weather Forecast | Wethr',
  description: 'Weather Forecast',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://wethr.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Wethr',
    description: 'Weather Forecast',
    url: 'https://wethr.vercel.app',
    siteName: 'Wethr',
    images: [
      {
        url: 'https://wethr.vercel.app/favicon.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Wethr',
    description: 'Weather Forecast',
    creator: '@martinval11_',
    images: ['https://wethr.vercel.app/favicon.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#09090B',
}

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
