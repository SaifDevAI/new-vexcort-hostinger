import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback } from "react";
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
    color: "#6366f1",
    bg: "from-indigo-500/10 to-purple-500/5",
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    logoAlt: "Figma logo",
    title: "Web Design",
    desc: "Conversion-focused interfaces designed around your audience, brand voice, and high-intent user journeys.",
    features: ["UX research", "Design systems", "Interactive prototyping", "Brand-aligned UI"],
    color: "#f43f5e",
    bg: "from-rose-500/10 to-pink-500/5",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg",
    logoAlt: "OpenAI logo",
    title: "AI Automation",
    desc: "Custom AI workflows that remove repetitive operations, increase team velocity, and unlock higher-value output.",
    features: ["Workflow design", "LLM integrations", "Internal tools", "Make / Zapier / n8n"],
    color: "#10b981",
    bg: "from-emerald-500/10 to-teal-500/5",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/intercom.svg",
    logoAlt: "Intercom logo",
    title: "Web Chatbots",
    desc: "Code and no-code chatbots that qualify leads, answer product questions, and support visitors around the clock.",
    features: ["RAG over your docs", "CRM integration", "Multilingual support", "Built-in analytics"],
    color: "#3b82f6",
    bg: "from-blue-500/10 to-cyan-500/5",
  },
  {
    logo: "/voice-agent-logo.png",
    logoAlt: "Voice agent logo",
    title: "Voice Bots",
    desc: "Natural-sounding voice agents for inbound support, appointment booking, and outbound follow-up calls.",
    features: ["Realtime voice flows", "Calendar booking", "Call summaries", "Smart human handoff"],
    color: "#8b5cf6",
    bg: "from-violet-500/10 to-purple-500/5",
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    logoAlt: "Flutter logo",
    title: "App Development",
    desc: "iOS and Android applications with refined UX, production-ready architecture, and measurable product outcomes.",
    features: ["React Native / Flutter", "Native modules", "Store submission", "Analytics + crash reports"],
    color: "#06b6d4",
    bg: "from-cyan-500/10 to-sky-500/5",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/google.svg",
    logoAlt: "Google logo",
    title: "SEO",
    desc: "Technical SEO and content systems that compound organic visibility and drive sustainable acquisition growth.",
    features: ["Technical audits", "Keyword strategy", "Content production", "Link building"],
    color: "#f59e0b",
    bg: "from-amber-500/10 to-orange-500/5",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/meta.svg",
    logoAlt: "Meta logo",
    title: "Marketing",
    desc: "Performance marketing systems aligned to revenue targets with full-funnel visibility and rapid experimentation.",
    features: ["Paid social + search", "Landing page optimization", "Funnel analytics", "Creative testing"],
    color: "#0ea5e9",
    bg: "from-sky-500/10 to-blue-500/5",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/instagram.svg",
    logoAlt: "Instagram logo",
    title: "Social Media",
    desc: "Full-service social management that builds trust, consistency, and brand authority across key audience channels.",
    features: ["Content calendar", "Creative production", "Community management", "Performance reporting"],
    color: "#ec4899",
    bg: "from-pink-500/10 to-rose-500/5",
  },
];

/* Helper: compute per-card transform based on distance from center */
function getCardStyle(offset: number): React.CSSProperties {
  // offset: -4 (far left) to +4 (far right), 0 = center
  const absOff = Math.abs(offset);
  const sign = offset < 0 ? -1 : 1;

  // Scale: center = 1, each step shrinks by 18%
  const scale = Math.max(0.48, 1 - absOff * 0.17);
  // Height: center 560px → shrinks proportionally
  const height = Math.max(220, 560 - absOff * 80);
  // Horizontal translate (spread them out)
  const spreadPx = sign * absOff * 300;
  // Z depth: side cards pushed back
  const translateZ = -(absOff * absOff * 28);
  // Rotation
  const rotateY = sign * absOff * 12;
  // Opacity
  const opacity = Math.max(0.25, 1 - absOff * 0.22);
  // Vertical drop
  const translateY = absOff * absOff * 14;
  // Blur
  const blur = absOff > 1 ? absOff * 1.5 : 0;

  return {
    position: "absolute",
    width: "380px",
    height: `${height}px`,
    transform: `translateX(calc(-50% + ${spreadPx}px)) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    filter: blur > 0 ? `blur(${blur}px)` : "none",
    zIndex: 10 - Math.round(absOff),
    transition: "all 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    pointerEvents: absOff > 2.5 ? "none" : "auto",
    left: "50%",
    top: "50%",
    marginTop: `-${height / 2}px`,
    willChange: "transform, opacity",
  };
}

function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const scrollToCard = useCallback((targetIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;

    isProgrammaticScrollRef.current = true;
    setActiveIndex(targetIndex);

    const rect = section.getBoundingClientRect();
    const absoluteSectionTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScrollY = absoluteSectionTop + (targetIndex / (services.length - 1)) * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });

    if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 800);
  }, []);

  const navigate = useCallback((dir: number) => {
    const next = Math.max(0, Math.min(services.length - 1, activeIndex + dir));
    if (next === activeIndex) return;
    scrollToCard(next);
  }, [activeIndex, scrollToCard]);

  // Sync scroll position with active card index
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const index = Math.round(progress * (services.length - 1));

      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeIndex]);

  const activeService = services[activeIndex];

  // Visible window: show 5 cards centered on active
  const visibleRange = 4; // cards on each side

  return (
    <section
      ref={sectionRef}
      className="relative w-full select-none"
      style={{ minHeight: "100vh" }}
    >
      {/* Sticky carousel viewport */}
      <div className="sticky top-0 w-full h-screen flex flex-col overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #faf5ff 100%)",
        }}
      >
        {/* Animated background aura that matches active card color */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${activeService.color}18 0%, transparent 70%)`,
          }}
        />

        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 z-50 bg-slate-100">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${((activeIndex + 1) / services.length) * 100}%`,
              background: activeService.color,
            }}
          />
        </div>

        {/* Header */}
        <div className="relative z-20 pt-8 pb-4 text-center px-6">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-slate-400">
            Scroll to explore
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span
              className="text-sm font-bold tabular-nums transition-all duration-300"
              style={{ color: activeService.color }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-sm text-slate-400">{String(services.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* 3D Card Stage */}
        <div
          className="relative flex-1 w-full"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
        >
          {services.map((svc, idx) => {
            const offset = idx - activeIndex;
            if (Math.abs(offset) > visibleRange) return null;
            const style = getCardStyle(offset);
            const isActive = offset === 0;

            return (
              <div
                key={svc.title}
                style={style}
                onClick={() => {
                  if (!isActive) scrollToCard(idx);
                }}
              >
                <div
                  className={`relative w-full h-full rounded-3xl overflow-hidden flex flex-col ${isActive ? "cursor-default" : "cursor-pointer"}`}
                  style={{
                    background: isActive
                      ? "white"
                      : "rgba(255,255,255,0.75)",
                    border: `1.5px solid ${isActive ? svc.color + "50" : "rgba(226,232,240,0.6)"}`,
                    boxShadow: isActive
                      ? `0 32px 80px -20px ${svc.color}30, 0 0 0 1px ${svc.color}15, inset 0 1px 0 rgba(255,255,255,0.9)`
                      : "0 8px 24px -10px rgba(0,0,0,0.08)",
                    backdropFilter: isActive ? "none" : "blur(4px)",
                  }}
                >
                  {/* Gradient top stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl transition-all duration-700"
                    style={{ background: svc.color }}
                  />

                  {/* Card background gradient blob */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none transition-all duration-700"
                    style={{
                      background: `radial-gradient(circle, ${svc.color}12 0%, transparent 70%)`,
                      transform: "translate(30%, -30%)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full p-7">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${svc.color}20, ${svc.color}10)`,
                          border: `1px solid ${svc.color}30`,
                        }}
                      >
                        <img
                          src={svc.logo}
                          alt={svc.logoAlt}
                          className="h-7 w-7 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <span
                        className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          background: `${svc.color}12`,
                          color: svc.color,
                          border: `1px solid ${svc.color}25`,
                        }}
                      >
                        SERVICE {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="mt-5 font-extrabold leading-tight tracking-tight"
                      style={{
                        fontSize: isActive ? "1.7rem" : "1.25rem",
                        color: "#0B1324",
                        transition: "font-size 0.5s ease",
                      }}
                    >
                      {svc.title}
                    </h2>

                    {/* Desc – only full on active */}
                    <p
                      className="mt-3 text-sm leading-relaxed text-slate-500 transition-all duration-500"
                      style={{
                        WebkitLineClamp: isActive ? undefined : 2,
                        overflow: isActive ? "visible" : "hidden",
                        display: isActive ? "block" : "-webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {svc.desc}
                    </p>

                    {/* Features – only on active */}
                    {isActive && (
                      <ul className="mt-5 space-y-2.5">
                        {svc.features.map((f, fi) => (
                          <li
                              key={f}
                              className="flex items-center gap-2.5 text-sm text-slate-700"
                              style={{
                                animation: `fadeSlideIn 0.4s ease forwards`,
                                animationDelay: `${fi * 60}ms`,
                                opacity: 0,
                              }}
                            >
                              <span
                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                                style={{ background: `${svc.color}18`, color: svc.color }}
                              >
                                <Check className="h-3 w-3" />
                              </span>
                              <span className="font-medium">{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                    {/* CTA – only on active */}
                    {isActive && (
                      <div
                        className="mt-6"
                        style={{ animation: "fadeSlideIn 0.4s ease forwards 0.3s", opacity: 0 }}
                      >
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:gap-3 hover:shadow-lg"
                          style={{
                            background: svc.color,
                            color: "white",
                            boxShadow: `0 8px 24px -8px ${svc.color}60`,
                          }}
                        >
                          Start Project <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom nav dots */}
        <div className="relative z-20 pb-8 flex flex-col items-center gap-5">
          {/* Arrow buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              disabled={activeIndex === 0}
              className="group flex h-11 w-11 items-center justify-center rounded-full border bg-white/80 shadow-md backdrop-blur-sm transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ borderColor: activeService.color + "30" }}
              aria-label="Previous"
            >
              <svg className="h-5 w-5 rotate-180 transition-transform group-hover:-translate-x-0.5" style={{ color: activeService.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {services.map((_, i) => {
                const dist = Math.abs(i - activeIndex);
                return (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    className="rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: i === activeIndex ? "28px" : dist === 1 ? "8px" : "5px",
                      height: i === activeIndex ? "8px" : dist === 1 ? "8px" : "5px",
                      background: i === activeIndex ? activeService.color : i < activeIndex ? activeService.color + "50" : "rgba(203,213,225,0.8)",
                    }}
                    aria-label={`Go to service ${i + 1}`}
                  />
                );
              })}
            </div>

            <button
              onClick={() => navigate(1)}
              disabled={activeIndex === services.length - 1}
              className="group flex h-11 w-11 items-center justify-center rounded-full border bg-white/80 shadow-md backdrop-blur-sm transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ borderColor: activeService.color + "30" }}
              aria-label="Next"
            >
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" style={{ color: activeService.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Scroll hint (only at last card) */}
          {activeIndex === services.length - 1 && (
            <p className="text-xs text-slate-400 animate-bounce" style={{ animation: "fadeSlideIn 0.5s ease forwards" }}>
              ↓ Scroll to continue
            </p>
          )}
        </div>
      </div>

      {/* Spacer: gives the sticky element room to scroll through all cards  */}
      {/* Each card needs ~60vh of scroll travel */}
      <div style={{ height: `${services.length * 60}vh` }} aria-hidden="true" />

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="container-x pb-2 pt-28 md:pt-32">
        <p className="eyebrow">Services</p>
        <h1 className="h-display mt-3 max-w-4xl text-5xl md:text-6xl">
          Premium digital services, delivered by a focused senior team.
        </h1>
        <p className="mt-5 max-w-3xl text-muted-foreground">
          From websites and apps to AI automation, chatbots, and growth programs, Cortvex covers
          the full stack of capabilities a modern brand needs to compete and scale confidently.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6 font-logo text-[0.62rem] uppercase tracking-[0.02em] text-[#7a7f82]">
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

      <ServicesCarousel />

      {/* Services Detail List */}
      <section className="bg-[color:var(--color-surface)] section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          {services.slice(0, 4).map(({ logo, logoAlt, title, desc, features }) => (
            <div key={title} id={title.toLowerCase().replace(/\s+/g, "-")} className="service-detail-pop">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/90 shadow-[0_10px_28px_-20px_rgba(24,0,173,0.55)]">
                <img src={logo} alt={logoAlt} className="h-6 w-6 object-contain" loading="lazy" />
              </span>
              <h2 className="h-display mt-5 text-3xl">{title}</h2>
              <p className="mt-3 text-muted-foreground">{desc}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {features.map((f) => (
                  <div key={f} className="service-pill-pop">{f}</div>
                ))}
              </div>
              <Link to="/contact" className="btn btn-dark mt-7">Book a Meeting <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
