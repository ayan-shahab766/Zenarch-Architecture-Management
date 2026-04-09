"use client";
import Link from 'next/link';
import Image from "next/image";
import { API_BASE } from "@/utils/api";
import * as motion from 'framer-motion/client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/projects/featured`);
        setFeaturedProjects(data);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        setFeaturedProjects([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProjects();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark z-10"></div>
          {/* Temporary placeholder background - user will replace with actual image */}
          <div
            className="w-full h-full bg-cover bg-center transform scale-105"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
              backgroundPosition: 'center', filter: 'brightness(0.7) contrast(1.1)'
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center container mx-auto px-6 mt-20">
          <div className="flex justify-center mb-12">
            <Image
              src="/logo.png"
              alt="Zenarch Logo"
              width={2104}
              height={2163}
              priority
              className="h-40 md:h-55 lg:h-70 w-auto drop-shadow-2xl"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/portfolio" className="btn-primary w-full sm:w-auto text-center">
              View Portfolio
            </Link>
            <Link href="/contact" className="btn-outline w-full sm:w-auto text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
            <div>
              <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-2 block">Our Work</span>
              <h2 className="text-4xl md:text-5xl font-playfair text-white">Featured Projects</h2>
            </div>
            <Link href="/portfolio" className="hidden md:flex items-center text-sm uppercase tracking-wider hover:text-gold transition-colors">
              Explore All <span className="ml-2">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 2).map((project) => (
              <Link key={project._id} href={`/portfolio/${project._id}`} className="group block overflow-hidden relative rounded-sm">
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                <div
                  className="h-[500px] w-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url("${API_BASE}${project.coverImage}")` }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-dark to-transparent">
                  <span className="text-gold text-xs font-bold uppercase tracking-wider mb-2 block">{project.category?.name || 'Project'}</span>
                  <h3 className="text-2xl font-playfair text-white group-hover:text-gold transition-colors">{project.title}</h3>
                  <p className="text-white/70 text-sm mt-2 font-light">{project.location}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/portfolio" className="btn-outline inline-block">
              Explore All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-dark-light border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center md:w-2/3 mx-auto mb-16">
            <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-2 block">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">Our Services</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              We provide comprehensive architectural and design services tailored to create exceptional spaces that blend aesthetics, functionality, and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card hover:-translate-y-2 transition-transform duration-300">
              <span className="text-gold text-4xl mb-6 block font-playfair italic">01.</span>
              <h3 className="text-xl font-playfair text-white mb-4">Architecture Design</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Conceptualization, space planning, and full architectural design for residential and commercial buildings.
              </p>
            </div>
            <div className="glass-card hover:-translate-y-2 transition-transform duration-300 group">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white group-hover:text-white group-hover:bg-none text-4xl mb-6 block font-playfair italic transition-all">02.</span>
              <h3 className="text-xl font-playfair text-white mb-4">Interior Synthesis</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Creating cohesive interior environments that seamlessly reflect the architectural language and client's lifestyle.
              </p>
            </div>
            <div className="glass-card hover:-translate-y-2 transition-transform duration-300">
              <span className="text-gold text-4xl mb-6 block font-playfair italic">03.</span>
              <h3 className="text-xl font-playfair text-white mb-4">Landscape Design</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Integrating the built structure with the natural surroundings to create beautiful, sustainable exterior living spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
