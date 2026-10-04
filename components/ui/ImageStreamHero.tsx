'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Sparkles, Eye, ShieldCheck, ChevronRight } from 'lucide-react';

export interface StreamProject {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tags: string[];
  metrics: string;
  category: string;
  image: string;
}

interface ImageStreamHeroProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  projects: StreamProject[];
  onOpenPreview?: (url: string, title: string) => void;
  ctaText?: string;
  ctaLink?: string;
}

export function ImageStreamHero({
  badge = 'SELECTED PROJECTS',
  headline = 'ENGINEERED DIGITAL EXPERIENCES',
  subheadline = 'Explore our featured portfolio: high-performance web systems, autonomous AI voice workflows, and luxury platforms.',
  projects,
  onOpenPreview,
  ctaText = 'Explore All Specs',
  ctaLink = '#system-specifications',
}: ImageStreamHeroProps) {
  // Support reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Split projects into two streams (Left Rail and Right Rail)
  const leftRail = projects.filter((_, idx) => idx % 2 === 0);
  const rightRail = projects.filter((_, idx) => idx % 2 !== 0);

  // Duplicate items for seamless continuous looping stream
  const repeatedLeft = [...leftRail, ...leftRail, ...leftRail];
  const repeatedRight = [...rightRail, ...rightRail, ...rightRail];

  return (
    <section 
      aria-label="Portfolio Showcase Hero"
      className="relative w-full overflow-hidden bg-[#070b19] text-white pt-28 pb-20 md:pt-36 md:pb-28 border-b border-[#1800AD]/30"
    >
      {/* Background Ambience: Navy / Deep Blue with subtle Teal highlights */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(24, 0, 173, 0.45) 0%, rgba(14, 165, 164, 0.08) 45%, rgba(7, 11, 25, 1) 85%)',
        }}
      />

      {/* Decorative Subtle Grid Lines */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
        }}
      />

      {/* Vanishing Point Glow at Center */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none blur-[90px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #0EA5A4 0%, #1800AD 65%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Header Text Overlay: Readable, High Contrast */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-[#1800AD]/40 text-[#0EA5A4] border border-[#0EA5A4]/30 backdrop-blur-md mb-5 shadow-[0_0_20px_-5px_rgba(14,165,164,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-[#0EA5A4]" />
            <span>{badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            {headline}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {subheadline}
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1800AD] text-white hover:bg-[#1f05ce] border border-[#0EA5A4]/40 shadow-lg shadow-[#1800AD]/30 transition-all hover:scale-105"
            >
              <span>{ctaText}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#0EA5A4]" />
            </a>
          </div>
        </div>

        {/* 3D Image Stream Container with vanishing point perspective */}
        <div 
          className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] overflow-hidden rounded-3xl border border-white/10 bg-[#060914]/80 backdrop-blur-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          tabIndex={0}
          aria-label="Image Stream Carousel: pause on hover or focus"
        >
          {/* Subtle vignette and vanishing point radial mask */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-b from-[#070b19]/60 via-transparent to-[#070b19]/80" />
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 z-20 pointer-events-none bg-gradient-to-r from-[#060914] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 z-20 pointer-events-none bg-gradient-to-l from-[#060914] to-transparent" />

          {/* Perspective viewport: 2 Rails sweeping outwards */}
          <div 
            className="w-full h-full flex flex-col justify-center gap-5 sm:gap-6"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Top Stream Rail: rides from vanishing point leftward */}
            <div 
              className="flex gap-5 sm:gap-6 will-change-transform"
              style={{
                animation: prefersReducedMotion
                  ? 'none'
                  : `stream-flow-left 32s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
                transform: 'rotateX(8deg) rotateY(-4deg)',
              }}
            >
              {repeatedLeft.map((proj, idx) => (
                <StreamCard 
                  key={`left-${proj.title}-${idx}`} 
                  project={proj} 
                  onOpenPreview={onOpenPreview} 
                />
              ))}
            </div>

            {/* Bottom Stream Rail: rides from vanishing point rightward */}
            <div 
              className="flex gap-5 sm:gap-6 will-change-transform"
              style={{
                animation: prefersReducedMotion
                  ? 'none'
                  : `stream-flow-right 36s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
                transform: 'rotateX(-8deg) rotateY(4deg)',
              }}
            >
              {repeatedRight.map((proj, idx) => (
                <StreamCard 
                  key={`right-${proj.title}-${idx}`} 
                  project={proj} 
                  onOpenPreview={onOpenPreview} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stream Helper / Accessibility note */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 px-2">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5A4] animate-pulse" />
            Live Project Stream • Hover to pause
          </span>
          <span className="hidden sm:inline">
            Click any project card to launch instant preview
          </span>
        </div>
      </div>

      {/* Keyframe animations for continuous stream */}
      <style jsx global>{`
        @keyframes stream-flow-left {
          0% {
            transform: translateX(0%) rotateX(6deg) rotateY(-3deg);
          }
          100% {
            transform: translateX(-50%) rotateX(6deg) rotateY(-3deg);
          }
        }
        @keyframes stream-flow-right {
          0% {
            transform: translateX(-50%) rotateX(-6deg) rotateY(3deg);
          }
          100% {
            transform: translateX(0%) rotateX(-6deg) rotateY(3deg);
          }
        }
      `}</style>
    </section>
  );
}

function StreamCard({
  project,
  onOpenPreview,
}: {
  project: StreamProject;
  onOpenPreview?: (url: string, title: string) => void;
}) {
  return (
    <div
      onClick={() => onOpenPreview?.(project.url, project.title)}
      className="group relative flex-shrink-0 w-[260px] sm:w-[320px] h-[155px] sm:h-[185px] rounded-2xl overflow-hidden bg-[#0B1324] border border-white/15 cursor-pointer shadow-lg hover:border-[#0EA5A4] hover:shadow-[0_15px_35px_-10px_rgba(14,165,164,0.35)] transition-all duration-300 hover:scale-[1.03]"
    >
      {/* Real Project Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={`Preview of ${project.title}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
      />

      {/* Dark overlay with deep-blue gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-[#070b19]/60 to-transparent pointer-events-none" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-black/60 text-[#0EA5A4] border border-white/10 backdrop-blur-md">
          {project.category}
        </span>
        <button
          type="button"
          aria-label={`Preview ${project.title}`}
          className="w-7 h-7 rounded-full bg-white/15 hover:bg-[#0EA5A4] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Content Metadata */}
      <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
        <div className="text-[9px] font-bold uppercase tracking-wider text-[#0EA5A4] truncate mb-0.5">
          {project.metrics}
        </div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-black tracking-tight text-white group-hover:text-[#0EA5A4] transition-colors truncate">
            {project.title}
          </h3>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white shrink-0" />
        </div>
      </div>
    </div>
  );
}
