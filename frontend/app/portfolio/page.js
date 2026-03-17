"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API_BASE } from "utils/api";
import axios from 'axios';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [categories, setCategories] = useState([]);

  // build list of filter labels; start with "All"
  const filters = ['All', ...categories.map((c) => c.name)];

  useEffect(() => {
    // load categories to populate filters
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error('error loading categories', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let query = '';
        if (selectedFilter !== 'All') {
          const cat = categories.find((c) => c.name === selectedFilter);
          if (cat) query = `?category=${cat._id}`;
        }
        const res = await axios.get(`${API_BASE}/api/projects${query}`);
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, [selectedFilter, categories]); // Re-fetch when filter or categories change

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-6 py-12 border-b border-white/10 mb-12">
        <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-2 block">Our Work</span>
        <h1 className="text-5xl font-playfair text-white mb-6">Portfolio</h1>
        <p className="text-gray-400 font-light max-w-2xl leading-relaxed">
          Explore our collection of premium architectural and interior design projects that redefine luxury spaces across the globe.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-12">
          {filters.map((filter, index) => (
            <button 
              key={index} 
              onClick={() => setSelectedFilter(filter)}
              className={`text-sm uppercase tracking-wider px-4 py-2 border transition-all ${
                selectedFilter === filter ? 'border-gold text-gold' : 'border-white/20 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link href={`/portfolio/${project._id}`} key={project._id} className="group block overflow-hidden relative rounded-sm">
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
              <div 
                className="h-[400px] w-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url("http://localhost:5000${project.coverImage}")` }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-dark to-transparent">
                <span className="text-gold text-[10px] font-bold uppercase tracking-wider mb-2 block">{project.category?.name || project.category}</span>
                <h3 className="text-xl font-playfair text-white group-hover:text-gold transition-colors">{project.title}</h3>
                <p className="text-white/70 text-xs mt-1 font-light">{project.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}