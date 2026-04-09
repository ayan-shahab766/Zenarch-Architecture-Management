"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function RootLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}
