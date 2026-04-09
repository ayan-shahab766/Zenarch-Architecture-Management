"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AdminSidebar from '@/components/AdminSidebar';
import LoadingScreen from '@/components/LoadingScreen';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userInfo = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('userInfo') || 'null')
      : null;

    if (userInfo?.role === 'admin' && userInfo?.token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    setAuthChecked(true);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    router.replace('/login');
  };

  if (!authChecked || !authorized) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex bg-dark min-h-screen">
      <AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 overflow-x-hidden pt-20 pb-10">
        <div className="fixed top-0 left-0 right-0 z-40 bg-dark/90 border-b border-white/10 backdrop-blur-md px-4 py-3 md:left-72 md:px-8 md:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="text-white hover:text-gold md:hidden"
              aria-label="Toggle admin menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <button
                onClick={handleSignOut}
                className="text-white hover:text-gold text-sm px-3 py-1 border border-white/20 rounded hover:border-gold transition-colors"
                aria-label="Sign out"
              >
                Sign Out
              </button>
              <Image
                src="/logo.png"
                alt="Zenarch Logo"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <main className="p-8 md:p-8 pt-24 md:pt-24">
          {children}
        </main>
      </div>
    </div>
  );
}
