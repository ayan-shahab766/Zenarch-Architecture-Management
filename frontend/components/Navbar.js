"use client";
import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-dark/90 backdrop-blur-md border-b border-white/5 py-3.5">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex flex-col items-center group">
                    <Image
                        src="/logo.png"
                        alt="Zenarch Logo"
                        width={70}
                        height={60}
                        className="object-contain"
                    />
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-sm font-medium hover:text-gold transition-colors">Home</Link>
                    <Link href="/portfolio" className="text-sm font-medium hover:text-gold transition-colors">Portfolio</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-gold transition-colors">About</Link>
                </div>

                <div className="hidden md:flex items-center">
                    <Link href="/contact" className="text-xs font-semibold uppercase tracking-wider border border-gold text-gold px-5 py-2 hover:bg-gold hover:text-dark transition-all">
                        Consultation
                    </Link>
                </div>

                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="md:hidden text-white hover:text-gold"
                    aria-label="Toggle navigation menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-dark border-t border-white/10">
                    <div className="container mx-auto px-6 py-4 space-y-3">
                        <Link href="/" className="block text-sm font-medium text-white hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link href="/portfolio" className="block text-sm font-medium text-white hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>Portfolio</Link>
                        <Link href="/about" className="block text-sm font-medium text-white hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="block text-sm font-medium text-gold border border-gold px-4 py-2 rounded-md hover:bg-gold hover:text-dark transition-all" onClick={() => setMenuOpen(false)}>
                            Consultation
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
