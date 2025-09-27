import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FairChain Draws',
  description: 'Transparent, Blockchain-Verified Draws with Seamless Prize Fulfillment',
  keywords: ['blockchain', 'draws', 'prizes', 'Web3', 'Base', 'Farcaster'],
  authors: [{ name: 'FairChain Draws Team' }],
  openGraph: {
    title: 'FairChain Draws',
    description: 'Transparent, Blockchain-Verified Draws with Seamless Prize Fulfillment',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FairChain Draws',
    description: 'Transparent, Blockchain-Verified Draws with Seamless Prize Fulfillment',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
