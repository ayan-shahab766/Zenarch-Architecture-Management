"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@/utils/api";

export default function ProjectDetailClient({ project }) {

  if (!project) return <p className="text-center mt-20 text-white">Loading...</p>;

  // If images are stored in backend/uploads, prepend server URL
  const coverImageURL = project.coverImage.startsWith("/uploads")
    ? `${API_BASE}${project.coverImage}`
    : project.coverImage;

  const galleryURLs = project.gallery.map((img) =>
    img.startsWith("/uploads") ? `${API_BASE}${img}` : img
  );

  return (
    <div className="pt-20 min-h-screen pb-24">
      {/* Hero */}
      <div className="h-[60vh] md:h-[80vh] w-full relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${coverImageURL}")` }}
        ></div>
        <div className="absolute inset-0 bg-dark/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-dark via-dark/80 to-transparent">
          <div className="container mx-auto">
            <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">
              {project.category?.name || project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair text-white mb-4">
              {project.title}
            </h1>
            <p className="text-gray-300 font-light flex items-center">
              <span className="w-4 h-[1px] bg-gold mr-3"></span> {project.location}
            </p>
          </div>
        </div>
      </div>

      {/* Overview & Details */}
      <div className="container mx-auto px-6 mt-16">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Main Description */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-playfair text-white mb-6">Project Overview</h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
              <p>{project.description}</p>
            </div>
          </div>

          {/* Project Details Sidebar */}
          <div className="md:w-1/3">
            <div className="glass-card">
              <h3 className="text-xl font-playfair text-white mb-6 border-b border-white/10 pb-4">
                Details
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500 text-sm">Category</span>
                  <span className="text-white text-sm">{project.category?.name || project.category}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500 text-sm">Location</span>
                  <span className="text-white text-sm">{project.location}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500 text-sm">Area</span>
                  <span className="text-white text-sm">{project.area}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500 text-sm">Year</span>
                  <span className="text-white text-sm">{project.year}</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span className="text-gray-500 text-sm">Architect</span>
                  <span className="text-white text-sm">{project.architect}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-24">
          <h2 className="text-2xl font-playfair text-white mb-8 text-center">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleryURLs.map((img, idx) => (
              <div key={idx} className={`h-[400px] md:h-[${idx === 0 ? "600" : "400"}px] relative overflow-hidden`}>
                <div
                  className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url("${img}")` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}