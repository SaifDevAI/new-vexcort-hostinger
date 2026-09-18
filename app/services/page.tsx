'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { 
  ArrowUpRight, 
  Check, 
  Cpu, 
  Code2, 
  Palette, 
  MessageSquare, 
  Mic, 
  Smartphone, 
  Search, 
  Megaphone, 
  Share2 
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SiteLayout } from '@/components/SiteLayout';
import { CTASection } from '@/components/CTASection';

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  features: string[];
  gradient: string;
  tag: string;
}

const servicesList: ServiceItem[] = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Production-grade websites and web platforms engineered for speed, scalability, and long-term maintainability.",
    features: ["TanStack / Next.js", "Type-safe architecture", "Performance budgets", "CMS integrations"],
    gradient: "linear-gradient(135deg, #7F5AF0 0%, #4C6FFF 100%)",
    tag: "01",
  },
  {
    icon: Palette,
    title: "Web Design",
    desc: "Conversion-focused interfaces designed around your audience, brand voice, and high-intent user journeys.",
    features: ["UX research", "Design systems", "Interactive prototyping", "Brand-aligned UI"],
    gradient: "linear-gradient(135deg, #4F46E5 0%, #00C2FF 100%)",
    tag: "02",
  },
  {
    icon: Cpu,
    title: "AI Automation",
    desc: "Custom AI workflows that remove repetitive operations, increase team velocity, and unlock higher-value output.",
    features: ["Workflow design", "LLM integrations", "Internal tools", "Make / Zapier / n8n"],
    gradient: "linear-gradient(135deg, #00C897 0%, #00E0B8 100%)",
    tag: "03",
  },
  {
    icon: MessageSquare,
    title: "Web Chatbots",
    desc: "Code and no-code chatbots that qualify leads, answer product questions, and support visitors around the clock.",
    features: ["RAG over your docs", "CRM integration", "Multilingual support", "Built-in analytics"],
    gradient: "linear-gradient(135deg, #FF8A00 0%, #FFC837 100%)",
    tag: "04",
  },
  {
    icon: Mic,
    title: "Voice Bots",
    desc: "Natural-sounding voice agents for inbound support, appointment booking, and outbound follow-up calls.",
    features: ["Realtime voice flows", "Calendar booking", "Call summaries", "Smart human handoff"],
    gradient: "linear-gradient(135deg, #FF4D6D 0%, #C9184A 100%)",
    tag: "05",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "iOS and Android applications with refined UX, production-ready architecture, and measurable product outcomes.",
    features: ["React Native / Flutter", "Native modules", "Store submission", "Analytics + crash reports"],
    gradient: "linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)",
    tag: "06",
  },
  {
    icon: Search,
    title: "SEO Systems",
    desc: "Technical SEO and content systems that compound organic visibility and drive sustainable acquisition growth.",
    features: ["Technical audits", "Keyword strategy", "Content production", "Link building"],
    gradient: "linear-gradient(135deg, #7F5AF0 0%, #4F46E5 100%)",
    tag: "07",
  },
  {
    icon: Megaphone,
    title: "Paid Marketing",
    desc: "Performance marketing systems aligned to revenue targets with full-funnel visibility and rapid experimentation.",
    features: ["Paid social + search", "Landing page optimization", "Funnel analytics", "Creative testing"],
    gradient: "linear-gradient(135deg, #FF8A00 0%, #FF4D6D 100%)",
    tag: "08",
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Full-service social management that builds trust, consistency, and brand authority across key audience channels.",
    features: ["Content calendar", "Creative production", "Community management", "Performance reporting"],
    gradient: "linear-gradient(135deg, #00C897 0%, #00B4D8 100%)",
    tag: "09",
  },
];

export default function Page() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Vexcort Services",
    "numberOfItems": servicesList.length,
    "itemListElement": servicesList.map((service, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.desc,
        "provider": {
          "@type": "Organization",
          "name": "Vexcort"
        }
      }
    }))
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <div className="relative z-10 bg-[#FAF9F6] text-[#0B1324] min-h-screen overflow-hidden flex flex-col justify-between">
        
        {/* Header Hero Section */}
        <section className="container-x pt-32 pb-16 text-center">
          <TypewriterServicesHeading />
          <p className="mt-4 max-w-2xl mx-auto text-slate-500 text-sm md:text-base leading-relaxed">
            Build intelligent digital products powered by AI, automation, and modern engineering.
          </p>
        </section>

        {/* Custom Infinite Move Carousel Section */}
        <section className="w-full pb-32 overflow-hidden relative">
          <InfiniteCarousel list={servicesList} />
        </section>

        <CTASection />
      </div>
    </SiteLayout>
  );
}

// Custom 3D Infinite Carousel Component
function InfiniteCarousel({ list }: { list: ServiceItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Triplicate the list to allow infinite wrapping on both ends
  const duplicatedList = [...list, ...list, ...list];
  const totalCount = list.length;
  const cardWidth = 332; // 300px card width + 32px (2rem) gap

  // Scroll offset motion values
  const xOffset = useMotionValue(0);
  const springX = useSpring(xOffset, { damping: 40, stiffness: 200, mass: 0.5 });
  
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const isTabActive = useRef(true);
  const speed = 1.75; // Pixels per frame (automatic scroll rate)
  const dragStartOffset = useRef(0);
  const dragStartX = useRef(0);
  const lastDragTime = useRef(0);
  const lastDragX = useRef(0);
  const dragVelocity = useRef(0);

  useEffect(() => {
    // Tab visibility handling to pause loop when tab goes inactive
    const handleVisibility = () => {
      isTabActive.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animateLoop = () => {
      if (isTabActive.current && !isDragging.current && !isHovered.current) {
        // Automatic scrolling logic (move left to right)
        let nextX = xOffset.get() + speed;
        
        // Wrap offset when it exceeds one cycle (total list width)
        const maxScroll = totalCount * cardWidth;
        if (nextX > 0) {
          nextX = -maxScroll + (nextX % maxScroll);
        }
        
        xOffset.set(nextX);
      } else if (!isDragging.current && Math.abs(dragVelocity.current) > 0.05) {
        // Apply momentum deceleration after drag release
        dragVelocity.current *= 0.95; // Decay rate
        let nextX = xOffset.get() + dragVelocity.current;

        const maxScroll = totalCount * cardWidth;
        if (nextX > 0) {
          nextX = -maxScroll + (nextX % maxScroll);
        } else if (nextX < -maxScroll * 2) {
          nextX = -maxScroll + (nextX % maxScroll);
        }

        xOffset.set(nextX);
      }

      // Live 3D Arc Perspective Calculations based on Card Viewport Position
      if (trackRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const cardElements = trackRef.current.children;

        for (let i = 0; i < cardElements.length; i++) {
          const card = cardElements[i] as HTMLDivElement;
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const dist = cardCenter - containerCenter;

          // Calculate visual coefficients based on distance from center
          const maxDist = containerRect.width / 1.5;
          const ratio = Math.min(1, Math.max(-1, dist / maxDist));
          
          // Arc Layout Math:
          const scale = 1 - Math.abs(ratio) * 0.12;
          const translateY = Math.pow(Math.abs(ratio), 2) * 90; // Arc curves downwards on edges
          const rotateZ = ratio * -18; // Rotates/tilts cards inwards towards the center
          const opacity = 1 - Math.abs(ratio) * 0.35; // Soft opacity falloff

          card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotateZ}deg)`;
          card.style.opacity = `${opacity}`;
          card.style.filter = "none"; // Remove blur completely
        }
      }

      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [totalCount]);

  // Drag interaction handlers
  const handleStart = (clientX: number) => {
    isDragging.current = true;
    dragStartX.current = clientX;
    dragStartOffset.current = xOffset.get();
    lastDragX.current = clientX;
    lastDragTime.current = performance.now();
    dragVelocity.current = 0;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;
    const dx = clientX - dragStartX.current;
    let nextX = dragStartOffset.current + dx;

    // Modulo wrapping during drag
    const maxScroll = totalCount * cardWidth;
    if (nextX > 0) {
      nextX = -maxScroll + (nextX % maxScroll);
    } else if (nextX < -maxScroll * 2) {
      nextX = -maxScroll + (nextX % maxScroll);
    }

    xOffset.set(nextX);

    // Calculate real-time speed/velocity for momentum
    const now = performance.now();
    const dt = now - lastDragTime.current;
    if (dt > 10) {
      dragVelocity.current = (clientX - lastDragX.current) * 0.75;
      lastDragX.current = clientX;
      lastDragTime.current = now;
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full cursor-grab active:cursor-grabbing select-none py-10"
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; handleEnd(); }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      style={{ perspective: "1000px" }}
    >
      {/* Scrollable Track */}
      <motion.div 
        ref={trackRef}
        className="flex gap-8 will-change-transform"
        style={{ 
          x: springX, 
          width: `${duplicatedList.length * cardWidth}px`,
          transformStyle: "preserve-3d"
        }}
      >
        {duplicatedList.map((service, idx) => (
          <CarouselCard 
            key={`${service.title}-${idx}`} 
            service={service} 
          />
        ))}
      </motion.div>
    </div>
  );
}

// 3D Glassmorphic Interactive Card Component
function CarouselCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Custom spring tilt motion values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { damping: 25, stiffness: 200 });
  const springTiltY = useSpring(tiltY, { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Map coordinates to degrees of rotation (max 10deg)
    tiltX.set((mouseY / (height / 2)) * -10);
    tiltY.set((mouseX / (width / 2)) * 10);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative shrink-0 w-[300px] h-[430px] rounded-[28px] p-6 border border-white/30 bg-gradient-to-b from-white/80 to-white/45 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] flex flex-col justify-between overflow-hidden cursor-pointer"
      animate={{
        y: hovered ? -12 : 0,
        scale: hovered ? 1.04 : 1,
        boxShadow: hovered 
          ? "0 20px 40px rgba(0, 0, 0, 0.10), 0 0 24px rgba(24, 0, 173, 0.06)"
          : "0 8px 32px 0 rgba(0, 0, 0, 0.06)"
      }}
      style={{
        rotateX: springTiltX,
        rotateY: springTiltY,
        transformStyle: "preserve-3d"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Subtle background gradient fill */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.09] transition-opacity duration-500 group-hover:opacity-[0.14]"
        style={{ background: service.gradient }}
      />
      
      {/* Glowing cursor aura effect */}
      {hovered && (
        <motion.div 
          className="absolute pointer-events-none rounded-full blur-2xl opacity-30 z-0"
          style={{
            background: service.gradient,
            width: "160px",
            height: "160px",
            left: "70px",
            top: "130px",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Card Content wrapper */}
      <div className="z-10 flex flex-col h-full justify-between">
        
        {/* Top: Icon container */}
        <div className="flex justify-between items-start">
          <div 
            className="h-12 w-12 rounded-2xl flex items-center justify-center border border-white shadow-sm transition-transform duration-300"
            style={{ 
              background: service.gradient,
              boxShadow: "0 4px 14px 0 rgba(0,0,0,0.05)"
            }}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <span className="text-[10px] font-black tracking-widest text-[#0B1324]/30">
            #{service.tag}
          </span>
        </div>

        {/* Middle: Title & Description */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-[#0B1324] leading-snug tracking-tight">
            {service.title}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-500 max-w-[90%]">
            {service.desc}
          </p>
        </div>

        {/* Bottom: Springy CTA Button */}
        <div className="mt-6">
          <Link href="/contact">
            <motion.div 
              className="w-full py-2.5 rounded-full flex items-center justify-center text-xs font-bold transition-all border border-slate-200/60 bg-white text-[#0B1324] shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
              animate={{
                background: hovered ? service.gradient : "#ffffff",
                color: hovered ? "#ffffff" : "#0B1324",
                borderColor: hovered ? "transparent" : "rgba(11,19,36,0.08)",
                boxShadow: hovered 
                  ? "0 8px 20px rgba(24, 0, 173, 0.15)"
                  : "0 2px 10px rgba(0,0,0,0.03)",
                y: hovered ? -2 : 0
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
            >
              <span>Learn More</span>
              <ArrowUpRight className="h-4 w-4 ml-1.5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Typewriter heading component for Services Portfolio Page
function TypewriterServicesHeading() {
  const fullText = "Everything you need to grow online, under one roof.";
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="h-display mt-3 text-4xl md:text-5xl lg:text-6xl font-black text-center tracking-tight leading-tight">
      {text}
      <span className="inline-block w-[3px] h-[0.8em] bg-[#1800AD] animate-pulse ml-1 align-middle" />
    </h1>
  );
}
