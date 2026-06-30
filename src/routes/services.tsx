import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Check, Star, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - Cortvex" },
      { name: "description", content: "Web development, web design, AI automation, chatbots, voice bots, app development, SEO, marketing and social media handling." },
      { property: "og:title", content: "Services - Cortvex" },
      { property: "og:description", content: "Premium digital services for modern brands." },
    ],
    links: [{ rel: "canonical", href: "https://cortvex.com/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    logoAlt: "React logo",
    title: "Web Development",
    desc: "Production-grade websites and web platforms engineered for speed, scalability, and long-term maintainability.",
    features: ["TanStack / Next.js", "Type-safe architecture", "Performance budgets", "CMS integrations"],
    color: "#1800AD",
    tag: "01",
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    logoAlt: "Figma logo",
    title: "Web Design",
    desc: "Conversion-focused interfaces designed around your audience, brand voice, and high-intent user journeys.",
    features: ["UX research", "Design systems", "Interactive prototyping", "Brand-aligned UI"],
    color: "#0EA5A4",
    tag: "02",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg",
    logoAlt: "OpenAI logo",
    title: "AI Automation",
    desc: "Custom AI workflows that remove repetitive operations, increase team velocity, and unlock higher-value output.",
    features: ["Workflow design", "LLM integrations", "Internal tools", "Make / Zapier / n8n"],
    color: "#1800AD",
    tag: "03",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/intercom.svg",
    logoAlt: "Intercom logo",
    title: "Web Chatbots",
    desc: "Code and no-code chatbots that qualify leads, answer product questions, and support visitors around the clock.",
    features: ["RAG over your docs", "CRM integration", "Multilingual support", "Built-in analytics"],
    color: "#0EA5A4",
    tag: "04",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/vapi.svg",
    logoAlt: "Voice agent logo",
    title: "Voice Bots",
    desc: "Natural-sounding voice agents for inbound support, appointment booking, and outbound follow-up calls.",
    features: ["Realtime voice flows", "Calendar booking", "Call summaries", "Smart human handoff"],
    color: "#1800AD",
    tag: "05",
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    logoAlt: "Flutter logo",
    title: "App Development",
    desc: "iOS and Android applications with refined UX, production-ready architecture, and measurable product outcomes.",
    features: ["React Native / Flutter", "Native modules", "Store submission", "Analytics + crash reports"],
    color: "#0EA5A4",
    tag: "06",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/google.svg",
    logoAlt: "Google logo",
    title: "SEO Systems",
    desc: "Technical SEO and content systems that compound organic visibility and drive sustainable acquisition growth.",
    features: ["Technical audits", "Keyword strategy", "Content production", "Link building"],
    color: "#1800AD",
    tag: "07",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/meta.svg",
    logoAlt: "Meta logo",
    title: "Paid Marketing",
    desc: "Performance marketing systems aligned to revenue targets with full-funnel visibility and rapid experimentation.",
    features: ["Paid social + search", "Landing page optimization", "Funnel analytics", "Creative testing"],
    color: "#0EA5A4",
    tag: "08",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/instagram.svg",
    logoAlt: "Instagram logo",
    title: "Social Media Handling",
    desc: "Full-service social management that builds trust, consistency, and brand authority across key audience channels.",
    features: ["Content calendar", "Creative production", "Community management", "Performance reporting"],
    color: "#1800AD",
    tag: "09",
  },
];

function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.02 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SiteLayout>
      {/* Premium Animated Mesh Gradient Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(40px, -50px) scale(1.08) rotate(120deg); }
          66% { transform: translate(-30px, 30px) scale(0.95) rotate(240deg); }
        }
        @keyframes float-slow-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          50% { transform: translate(-60px, 40px) scale(1.05) rotate(-180deg); }
        }
        @keyframes float-slow-3 {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          40% { transform: translate(50px, 60px) scale(0.96) rotate(90deg); }
          75% { transform: translate(-40px, -30px) scale(1.04) rotate(-90deg); }
        }
      `}} />

      <div ref={ref} className="relative z-10 bg-transparent min-h-screen overflow-hidden">
        {/* Full-Screen GPU-Accelerated Parallax Mesh Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-transparent opacity-90">
          {/* Layer 1: Foreground parallax (0.3x scroll speed) */}
          <div 
            className="absolute inset-0 transition-transform duration-100 ease-out"
            style={{ 
              transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
              filter: 'blur(180px)'
            }}
          >
            <div 
              className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#1800AD]/25"
              style={{ animation: 'float-slow-1 25s infinite ease-in-out' }}
            />
            <div 
              className="absolute top-[50%] right-[10%] w-[550px] h-[550px] rounded-full bg-[#0EA5A4]/25"
              style={{ animation: 'float-slow-2 35s infinite ease-in-out' }}
            />
          </div>

          {/* Layer 2: Background parallax (0.1x scroll speed) */}
          <div 
            className="absolute inset-0 transition-transform duration-100 ease-out"
            style={{ 
              transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
              filter: 'blur(200px)'
            }}
          >
            <div 
              className="absolute top-[30%] right-[30%] w-[650px] h-[650px] rounded-full bg-[#1800AD]/20"
              style={{ animation: 'float-slow-3 45s infinite ease-in-out', animationDelay: '-5s' }}
            />
            <div 
              className="absolute bottom-[10%] left-[25%] w-[600px] h-[600px] rounded-full bg-[#0EA5A4]/20"
              style={{ animation: 'float-slow-1 30s infinite ease-in-out', animationDelay: '-12s' }}
            />
          </div>
        </div>

        {/* Header Hero Section */}
        <section className="container-x pb-12 pt-28 md:pt-36">
          <span className="eyebrow">Services Portfolio</span>
          <h1 className="h-display mt-3 max-w-4xl text-5xl md:text-6xl">
            Everything you need to grow online, under one roof.
          </h1>
          <p className="mt-5 max-w-3xl text-muted-foreground text-base md:text-lg leading-relaxed">
            From performant React systems and apps to n8n AI workflows, custom chatbots, and technical growth marketing, Cortvex delivers senior craft without the agency fluff.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 font-logo text-[0.62rem] uppercase tracking-[0.02em] text-[#7a7f82]">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#1800AD] text-[#1800AD]" />
                ))}
              </div>
              <span>Rated 4.9 by 80+ clients</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#1800AD]" /> ISO-aligned delivery
            </div>
          </div>
        </section>

        {/* Interactive centered card stack section */}
        <section className="container-x pb-32 flex flex-col items-center justify-center relative min-h-[680px]">
          <div className="relative w-full max-w-[420px] h-[600px] flex items-center justify-center">
            <CardStack services={services} />
          </div>
        </section>

        <CTASection />
      </div>
    </SiteLayout>
  );
}

// Center Stack card rotator component
function CardStack({ services }: { services: typeof import("./services").services }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlattened, setIsFlattened] = useState(false);

  // Auto rotation and flattening cycle effect
  useEffect(() => {
    if (isDragging || isHovered) return;
    const interval = setInterval(() => {
      // Toggle flattened layout, then shift index on stack
      setIsFlattened((prev) => {
        if (prev) {
          // transition from flat -> stacked: change card index
          handleNext();
          return false;
        } else {
          // transition from stacked -> flat
          return true;
        }
      });
    }, 2400);
    return () => clearInterval(interval);
  }, [currentIndex, isDragging, isHovered]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setDragOffset({ x: 0, y: 0 });
  };

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setDragOffset({ x: dx, y: dy });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const dx = upEvent.clientX - startX;
      const dy = upEvent.clientY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 120) {
        // Animate off screen then cycle
        handleNext();
      } else {
        // Reset offset back to center
        setDragOffset({ x: 0, y: 0 });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Touch interaction handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const startX = e.touches[0].clientX;
    const startY = e.touches[0].clientY;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const dx = moveEvent.touches[0].clientX - startX;
      const dy = moveEvent.touches[0].clientY - startY;
      setDragOffset({ x: dx, y: dy });
    };

    const handleTouchEnd = (endEvent: TouchEvent) => {
      setIsDragging(false);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      const dx = endEvent.changedTouches[0].clientX - startX;
      const dy = endEvent.changedTouches[0].clientY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 100) {
        handleNext();
      } else {
        setDragOffset({ x: 0, y: 0 });
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
  };

  // Stack rendering (max 3 cards shown at once)
  const visibleCards = [
    services[currentIndex],
    services[(currentIndex + 1) % services.length],
    services[(currentIndex + 2) % services.length],
  ];

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {visibleCards.map((service, index) => {
        const isTop = index === 0;
        const depth = index; // 0 is top, 1 is middle, 2 is bottom

        // Card transform equations based on depth & flat vs stacked states
        const scale = isTop 
          ? (isDragging ? 1.02 : 1) 
          : (isFlattened ? 0.95 : 1 - depth * 0.05);

        // Translate cards horizontally side-by-side if flattened (left, middle, right)
        const flatOffsetX = index === 0 ? -240 : index === 1 ? 0 : 240;
        const translateX = isTop 
          ? dragOffset.x 
          : (isFlattened ? flatOffsetX : 0);

        const translateY = isTop 
          ? dragOffset.y 
          : (isFlattened ? 0 : depth * 25);

        const rotation = isTop 
          ? (dragOffset.x * 0.04) 
          : (isFlattened ? (index === 0 ? -3 : index === 1 ? 0 : 3) : 0);

        const zIndex = 30 - depth;

        return (
          <div
            key={service.title}
            className={`absolute inset-0 cursor-grab active:cursor-grabbing select-none`}
            style={{
              transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`,
              zIndex,
              transition: isDragging && isTop ? "none" : "transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1.1), opacity 0.25s ease",
              pointerEvents: isTop ? "auto" : "none",
              opacity: isFlattened ? 1 : 1 - depth * 0.25,
            }}
            onMouseDown={isTop ? handleMouseDown : undefined}
            onTouchStart={isTop ? handleTouchStart : undefined}
            onClick={isTop ? () => { if (Math.abs(dragOffset.x) < 5 && Math.abs(dragOffset.y) < 5) handleNext(); } : undefined}
          >
            {/* Preserved card inner design exactly */}
            <div
              className="relative flex flex-col justify-between rounded-[2rem] p-6 shadow-[0_30px_60px_rgba(24,0,173,0.18)] min-h-[560px] h-full w-full border-2 bg-slate-50"
              style={{
                borderColor: `${service.color}15`,
                boxShadow: isTop ? `0 25px 60px -15px ${service.color}35` : "none",
              }}
            >
              {/* Floating skewed header chat bubble */}
              <div 
                className="w-[90%] rounded-3xl p-5 bg-white border shadow-md relative -rotate-3 transition-transform duration-500 group-hover:rotate-0 self-center mt-2 z-10"
                style={{
                  borderColor: `${service.color}15`,
                  background: index % 3 === 0 ? "#FFF0F0" : index % 3 === 1 ? "#FFFFF0" : "#FFF5FF",
                }}
              >
                <div className="flex items-center justify-between border-b border-slate-900/5 pb-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Client Request</span>
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-white shadow-sm border border-slate-100">
                    <img src={service.logo} alt={service.logoAlt} className="h-4.5 w-4.5 object-contain" />
                  </span>
                </div>

                <p className="mt-4 text-xs font-semibold text-slate-700 italic leading-relaxed bg-white border rounded-2xl p-3 shadow-inner">
                  "I want to explore {service.title} systems, outline a realistic strategy for scaling our operations."
                </p>

                <h3 className="mt-4 text-base font-black leading-tight text-slate-900 tracking-tight">
                  {service.title}
                </h3>

                <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
                  {service.desc}
                </p>
              </div>

              {/* Overlapping middle chat bubble listing features */}
              <div 
                className="w-[95%] rounded-3xl p-5 bg-white border border-slate-100 shadow-lg relative rotate-2 transition-transform duration-500 group-hover:rotate-0 -mt-8 self-center z-20"
              >
                <span className="text-[9px] font-black tracking-widest text-[#1800AD] uppercase block mb-2">Core Deliverables</span>
                <ul className="space-y-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[10px] text-slate-600 font-medium">
                      <span
                        className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: "rgba(24,0,173,0.05)" }}
                      >
                        <Check className="h-2 w-2" style={{ color: service.color }} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive bottom card button block */}
              <div 
                className="w-[90%] rounded-xl p-3 flex items-center justify-between transition-transform duration-500 rotate-1 self-center z-10"
                style={{
                  background: service.color,
                  boxShadow: `0 8px 24px -6px ${service.color}60`,
                }}
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                  Swipe/Click Card <ArrowUpRight className="h-3 w-3" />
                </span>
                <span className="text-[9px] font-black text-white/70 tracking-widest">
                  #{service.tag}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
