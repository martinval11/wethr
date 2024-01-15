import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

import './globals.css';

export const metadata: Metadata = {
  title: 'Weather Forecast | Wethr',
  description: 'Weather Forecast',
};

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        </ThemeProvider>
      </body>
    </html>
  );
}
