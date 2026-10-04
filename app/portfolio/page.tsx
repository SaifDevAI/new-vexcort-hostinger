'use client';

import { useState, useRef, useEffect } from 'react';
import { SiteLayout } from '@/components/SiteLayout';
import { CTASection } from '@/components/CTASection';
import { ArrowUpRight, ExternalLink, Globe, Layout, Laptop, Sparkles, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tags: string[];
  metrics: string;
  category: "Web App" | "Dashboard" | "Marketplace" | "Corporate" | "AI Voice Agent";
  gradient: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Sonolynx",
    subtitle: "Premium Medical Ultrasound Portal & Website",
    description: "Bespoke company representation platform and service portal for advanced ultrasound tech. Designed with organic visual details and fast response structures.",
    url: "https://www.sonolynx.com/",
    tags: ["Product Showcase", "Medical Technology", "Custom Design", "SEO Optimized"],
    metrics: "B2B Medical Portal • Fast Performance",
    category: "Corporate",
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #0D9488 100%)",
    image: "/sonulynx.png", // Correct Sonolynx image matching the upload by name
  },
  {
    title: "Soul Imaging Voice Agent",
    subtitle: "Interactive AI Voice Agent Interface",
    description: "Intelligent autonomous AI voice response demonstration environment designed for healthcare and radiology intake processing.",
    url: "https://soul-imaging-voice-agent.fly.dev/orb/",
    tags: ["AI Voice Agent", "Websockets", "Interactive Orbit", "NextJS"],
    metrics: "Sub-1s Voice Response Latency • Live AI Agent",
    category: "AI Voice Agent",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #2563eb 100%)",
    image: "/soulimaging.png", // Correct Soul Imaging image matching the upload by name
  },
  {
    title: "Sanctuary Real Estate",
    subtitle: "Modern Luxury Property Listings & Search Engine",
    description: "A fast luxury real estate property discovery portal featuring beautiful cards, interactive filtering, and dynamic responsive map search workflows.",
    url: "https://real-estate-three-woad.vercel.app/",
    tags: ["React", "Vite", "Tailwind CSS", "Search UX"],
    metrics: "120+ Listings • sub-100ms Search Response",
    category: "Marketplace",
    gradient: "linear-gradient(135deg, #1E1B4B 0%, #1800AD 100%)",
    image: "/sanctuary.png", // Correct Sanctuary image
  },
  {
    title: "Sarah Mitchell Real Estate",
    subtitle: "High-End Professional Realtor Portfolio",
    description: "A premium marketing and property showcase site designed with cinematic hero sections, smooth interactive sliders, and built-in appointment scheduler workflows.",
    url: "https://react-sitr-x9l62.vercel.app/",
    tags: ["React", "Custom sliders", "Lead Generation", "Tailwind CSS"],
    metrics: "High Conversion • Smooth Transitions",
    category: "Dashboard",
    gradient: "linear-gradient(135deg, #022C22 0%, #0EA5A4 100%)",
    image: "/sarah_mitchell.png", // Correct Sarah Mitchell Real Estate image matching name
  },
  {
    title: "Astra Surgery",
    subtitle: "Bespoke Surgical Presentation & Booking Platform",
    description: "A medical clinic web platform presenting complex information in a comforting, premium presentation layer. Built with clean typography and conversion-optimized forms.",
    url: "https://precise-surgery.vercel.app/",
    tags: ["React", "Modern UI/UX", "Booking System", "Vanilla CSS"],
    metrics: "Responsive Layout • Fast Form Loadtime",
    category: "Corporate",
    gradient: "linear-gradient(135deg, #0F172A 0%, #334155 100%)",
    image: "/astra.png", // Correct Astra Surgery image matching name
  },
];

export default function Page() {
  const [activeFrameUrl, setActiveFrameUrl] = useState<string | null>(null);
  const [activeFrameTitle, setActiveFrameTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkPortfolio",
    "name": "Vexcort Portfolio",
    "description": "Bespoke digital platforms, marketplaces, and SaaS dashboards built by Vexcort.",
    "provider": {
      "@type": "Organization",
      "name": "Vexcort",
      "url": "https://vexcort.com"
    }
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="relative z-10 bg-[#FAF9F6] text-[#0B1324] min-h-screen overflow-hidden flex flex-col justify-between">
        
        {/* Soft, aligned background decoration */}
        <div 
          className="absolute inset-x-0 top-0 h-[600px] pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 50% -100px, rgba(24,0,173,0.15) 0%, transparent 60%)"
          }}
        />

        {/* Modern Clean Portfolio Showcase Section */}
        <section className="relative w-full z-10 pt-32 pb-16">
          <div className="container-x max-w-7xl mx-auto">
            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#0EA5A4]/10 text-[#0EA5A4] border border-[#0EA5A4]/20 mb-4">
                Selected Work &amp; Case Studies
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
                Crafted Digital Systems &amp; Products
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
                Explore our portfolio of high-performance web applications, autonomous AI agents, luxury real estate platforms, and digital portals.
              </p>
            </div>

            {/* Filter Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {["All", "Corporate", "AI Voice Agent", "Marketplace", "Dashboard"].map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isSelected
                        ? "bg-[#1800AD] text-white shadow-md shadow-[#1800AD]/25"
                        : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Premium Clean Project Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.title}
                  className="group relative bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
                >
                  {/* Card Visual / Thumbnail */}
                  <div
                    className="relative h-60 w-full overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => {
                      setActiveFrameUrl(proj.url);
                      setActiveFrameTitle(proj.title);
                    }}
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/10">
                        {proj.category}
                      </span>
                    </div>

                    {/* Hover Quick Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-slate-900 shadow-lg">
                        <Eye className="w-3.5 h-3.5" /> Interactive Preview
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-[#0EA5A4] uppercase tracking-wider mb-1.5">
                        {proj.metrics}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1800AD] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {proj.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setActiveFrameUrl(proj.url);
                          setActiveFrameTitle(proj.title);
                        }}
                        className="text-xs font-bold text-slate-700 hover:text-[#1800AD] inline-flex items-center gap-1 transition-colors"
                      >
                        Preview <Eye className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1800AD] hover:text-[#0EA5A4] transition-colors"
                      >
                        Visit Live Site <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Projects Information on Scroll */}
        <section className="relative z-20 container-x py-24 border-t border-slate-200/40 bg-white">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-logo text-3xl md:text-4xl font-bold uppercase tracking-wider text-slate-800">
              System Specifications
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
              Explore the tech stacks, performance targets, and live preview links for each of our engineering achievements.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-24">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`grid gap-8 md:grid-cols-12 items-center ${
                  idx % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Visual Preview Frame */}
                <div className={`md:col-span-6 relative rounded-[2rem] overflow-hidden border border-slate-200/50 group cursor-pointer shadow-lg ${
                  idx % 2 === 0 ? "md:order-1" : "md:order-2"
                }`}
                  onClick={() => {
                    setActiveFrameUrl(proj.url);
                    setActiveFrameTitle(proj.title);
                  }}
                >
                  <div className="h-[280px] sm:h-[320px] overflow-hidden relative">
                    <img 
                      src={proj.image} 
                      alt={`${proj.title} Preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-white text-xs font-bold flex items-center gap-2">
                        <Eye className="h-4 w-4" /> Live Interactive Preview
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details text */}
                <div className={`md:col-span-6 flex flex-col justify-center ${
                  idx % 2 === 0 ? "md:order-2" : "md:order-1"
                }`}>
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                    {proj.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-1 leading-tight tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-4">
                    {proj.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {proj.tags.map(t => (
                      <span key={t} className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md border border-slate-100">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Metrics & Actions Row */}
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Metrics</span>
                      <span className="text-xs font-bold text-slate-700 mt-0.5">{proj.metrics}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setActiveFrameUrl(proj.url);
                          setActiveFrameTitle(proj.title);
                        }}
                        className="btn border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs rounded-full px-4 py-2 font-semibold"
                      >
                        Launch Preview
                      </button>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-teal-500 text-white transition-all hover:scale-105 hover:bg-teal-400"
                        aria-label={`Open ${proj.title}`}
                      >
                        <ExternalLink className="h-4.5 w-4.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Live Frame Preview Modal overlay */}
        <AnimatePresence>
          {activeFrameUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFrameUrl(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm pointer-events-auto cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 flex flex-col cursor-default"
              >
                {/* Modal Header */}
                <div className="h-14 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-6">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-400" />
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 ml-4 font-sans uppercase tracking-wider">
                      Live Preview: {activeFrameTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={activeFrameUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100"
                    >
                      Open Site <ExternalLink className="h-3 w-3" />
                    </a>
                    <button
                      onClick={() => setActiveFrameUrl(null)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Frame Content */}
                <div className="flex-1 bg-slate-100 relative">
                  <iframe
                    src={activeFrameUrl}
                    title={activeFrameTitle}
                    className="w-full h-full border-none bg-white"
                    allow="geolocation; microphone; camera; midi; encrypted-media;"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <CTASection />
      </div>
    </SiteLayout>
  );
}
