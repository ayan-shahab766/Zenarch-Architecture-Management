import { Playfair_Display, Poppins, Great_Vibes } from 'next/font/google';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
});

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-great-vibes'
});

export const metadata = {
  title: 'Zenarch | Space You Deserves',
  description: 'Premium architecture portfolio and residential design studio.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable} antialiased bg-dark text-white selection:bg-gold selection:text-dark flex flex-col min-h-screen`}>
        <RootLayoutWrapper>
          {children}
        </RootLayoutWrapper>
      </body>
    </html>
  );
}
