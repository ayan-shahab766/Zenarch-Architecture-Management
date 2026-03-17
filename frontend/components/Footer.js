"use client";
import Link from 'next/link';
import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaFacebook } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { API_BASE } from "@/utils/api";
import axios from 'axios';

const Footer = () => {
    const [settings, setSettings] = useState({
        email: '',
        whatsapp: '',
        address: '',
        instagram: '',
        facebook: '',
        linkedin: ''
    });
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get(`${API_BASE}/api/settings`);
                setSettings(data);
            } catch (error) {
                console.error('Error fetching footer settings:', error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="bg-dark-light pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1 border-l border-gold pl-6">
                        <Link href="/" className="flex flex-col items-start mb-6 group">
                            <Image
                                src="/footer-logo.png"
                                alt="Zenarch Logo"
                                width={200}
                                height={70}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Creating exceptional luxury spaces that define modern architecture and premium living.
                        </p>
                        <div className="flex space-x-4">
                            <a href={settings.instagram || "#"} target="_blank">
                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-gold hover:text-dark hover:border-gold transition-all">
                                    <FaInstagram size={14} />
                                </div>
                            </a>

                            <a href={settings.linkedin || "#"} target="_blank">
                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-gold hover:text-dark hover:border-gold transition-all">
                                    <FaLinkedinIn size={14} />
                                </div>
                            </a>

                            <a href={settings.facebook || "#"} target="_blank">
                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-gold hover:text-dark hover:border-gold transition-all">
                                    <FaFacebook size={14} />
                                </div>
                            </a>

                        </div>
                    </div>

                    <div>
                        <h4 className="font-playfair text-lg text-white mb-6 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-gray-400 hover:text-gold text-sm transition-colors">About Studio</Link></li>
                            <li><Link href="/portfolio" className="text-gray-400 hover:text-gold text-sm transition-colors">Portfolio</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-gold text-sm transition-colors">Our Services</Link></li>
                            <li><Link href="/careers" className="text-gray-400 hover:text-gold text-sm transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-playfair text-lg text-white mb-6 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-3">
                            <li className="text-gray-400 text-sm whitespace-pre-wrap">{settings.address}</li>
                            <li><a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-gold text-sm transition-colors">{settings.email}</a></li>
                            <li><a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} className="text-gray-400 hover:text-gold text-sm transition-colors">WhatsApp: {settings.whatsapp}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-playfair text-lg text-white mb-6 uppercase tracking-wider">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest updates on our projects.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-dark/50 border border-white/10 px-4 py-2 w-full text-sm focus:outline-none focus:border-gold text-white"
                            />
                            <button type="submit" className="bg-gold text-dark px-4 py-2 font-medium hover:bg-white transition-colors">
                                &rarr;
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} Zenarch Studio. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
