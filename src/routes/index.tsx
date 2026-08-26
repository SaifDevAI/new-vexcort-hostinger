import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Calendar, Check, Star, ShieldCheck, Zap, Globe, Bot, BarChart3, Smartphone, Palette } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import { NeuralSphere } from "@/components/NeuralSphere";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vexcort — Web Development, AI & Digital Agency" },
      {
        name: "description",
        content:
          "Vexcort is a full-service digital agency offering web development, web design, AI automation, chatbot engineering, app development, SEO and marketing services. Explore services built for modern brands.",
      },
      { property: "og:title", content: "Vexcort — Web Development, AI & Digital Agency" },
      {
        property: "og:description",
        content: "A premium digital agency offering web development, web design, app development, AI automation, custom chatbots, and SEO marketing services.",
      },
      { property: "og:image", content: "https://vexcort.com/textlogo.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Vexcort — Web Development, AI & Digital Agency" },
      { name: "twitter:description", content: "A premium digital agency offering web development, AI automation, app development, and SEO marketing services for modern brands." },
      { name: "twitter:image", content: "https://vexcort.com/textlogo.png" },
    ],
    links: [{ rel: "canonical", href: "https://vexcort.com/" }],
  }),
  component: Home,
});

/* ─────────────────────────────────────────────────────────────── Services ── */
const services = [
  {
    icon: Globe,
    color: "#1800AD",
    title: "Web Development",
    desc: "Fast, scalable websites and platforms built with modern stacks. React, Next.js, TypeScript.",
    features: ["TanStack / Next.js", "Type-safe architecture", "Performance budgets", "CMS integrations"],
    tag: "01",
  },
  {
    icon: Palette,
    color: "#0EA5A4",
    title: "Web Design",
    desc: "Conversion-focused interfaces designed around your brand and user journeys.",
    features: ["UX research", "Design systems", "Interactive prototyping", "Brand-aligned UI"],
    tag: "02",
  },
  {
    icon: Zap,
    color: "#1800AD",
    title: "AI Automation",
    desc: "Custom AI workflows that remove repetitive operational work and unlock velocity.",
    features: ["Workflow design", "LLM integrations", "Internal tools", "n8n / Make / Zapier"],
    tag: "03",
  },
  {
    icon: Bot,
    color: "#0EA5A4",
    title: "Web Chatbots",
    desc: "Code and no-code chatbots that qualify leads and support customers 24/7.",
    features: ["RAG over your docs", "CRM integration", "Multilingual support", "Built-in analytics"],
    tag: "04",
  },
  {
    icon: Smartphone,
    color: "#1800AD",
    title: "App Development",
    desc: "iOS and Android apps with refined product experiences and full-stack delivery.",
    features: ["React Native / Flutter", "Native modules", "Store submission", "Analytics + crash reports"],
    tag: "05",
  },
  {
    icon: BarChart3,
    color: "#0EA5A4",
    title: "SEO & Marketing",
    desc: "Technical SEO, content and performance campaigns wired to revenue, not vanity metrics.",
    features: ["Technical audits", "Keyword strategy", "Paid social + search", "Link building"],
    tag: "06",
  },
];

/* ─────────────────────────────────────────────────────────── Why Choose ── */
const reasons = [
  {
    num: "01",
    title: "Senior craft, end-to-end",
    desc: "A focused senior team handles strategy, design, engineering and growth - one roof, zero handoffs.",
  },
  {
    num: "02",
    title: "Ship in weeks, not quarters",
    desc: "Tight sprints, weekly demos, real product in your hands fast. No agency bloat.",
  },
  {
    num: "03",
    title: "Built to scale safely",
    desc: "Modern stacks, type-safe code, security and performance baked in from day one.",
  },
  {
    num: "04",
    title: "Measurable outcomes",
    desc: "Every engagement ties back to revenue, retention or efficiency. No vanity metrics.",
  },
];

/* ─────────────────────────────────────────────────────────────────── Hero ── */
function Hero() {
  return (
    <section className="relative overflow-hidden w-full h-screen flex items-center">
      <div className="absolute inset-0 w-full h-full z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white z-25 pointer-events-none" />
        <div className="absolute inset-0 bg-slate-950/20 z-20 pointer-events-none" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90 scale-[1.08]"
          style={{ filter: "brightness(0.92) saturate(1.02)", transformOrigin: "center center" }}
          aria-hidden="true"
        >
          <source src="/home.mp4?v=2" type="video/mp4" />
        </video>
      </div>
      <div className="container-x pointer-events-none absolute inset-x-0 top-[22%] z-20 flex justify-center">
        <h1 className="font-logo animate-fade-up text-center text-[4.8rem] font-black uppercase leading-none text-[#3a3a3d] sm:text-[7rem] md:text-[9.5rem] lg:text-[11rem]">
          Vexcort
          <span className="sr-only"> — Web Development, AI Automation & Digital Services Agency</span>
        </h1>
      </div>
      <div className="container-x relative z-30 min-h-[700px] py-16 lg:min-h-screen lg:py-20 w-full flex items-center">
        <div className="pointer-events-none absolute inset-x-4 bottom-16 mx-auto max-w-3xl animate-fade-up text-center">
          <p className="font-logo text-[0.62rem] font-bold uppercase leading-[1.25] text-[#999999] sm:text-[0.72rem] md:text-[0.82rem]">
            Turn browsers into buyers. Vexcort integrates enterprise-grade artificial intelligence
            into custom web environments to transform your digital presence into an automated
            revenue system
          </p>
        </div>
        <div className="absolute left-4 top-1/2 flex -translate-y-1/2 animate-fade-up flex-col items-start gap-6 sm:left-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 font-logo text-[1rem] uppercase tracking-[0.02em] text-[#1E293B] transition-colors hover:text-primary md:text-[1.12rem]"
          >
            <Calendar className="h-5 w-5" />{" "}
            <span className="italic underline underline-offset-4">Book a Meeting</span>
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-3 font-logo text-[1rem] uppercase tracking-[0.02em] text-[#1E293B] transition-colors hover:text-primary md:text-[1.12rem]"
          >
            <span className="italic underline underline-offset-4">Explore Services</span>{" "}
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── Services Slideshow ── */
function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 9 Slides matching all core website services with realistic deep metrics
  const slides = [
    {
      category: "Web Development",
      badge: "Scale-Ready",
      statValue: "99%",
      statSub: "Lighthouse Speed Score",
      highlightText: "High-performance React architectures",
      subText: "built with TanStack and Next.js to maximize conversion rates and compounding user engagement.",
      iconText: "React / Node / TS",
      color: "#1800AD"
    },
    {
      category: "Web Design",
      badge: "Conversion-Led",
      statValue: "40%",
      statSub: "Average Conversion Lift",
      highlightText: "Bespoke user-focused interfaces",
      subText: "designed in Figma around high-intent buyer journeys and tailored brand aesthetics.",
      iconText: "UX / Prototyping",
      color: "#0EA5A4"
    },
    {
      category: "AI Automation",
      badge: "Efficiency Labs",
      statValue: "18h",
      statSub: "Saved per Team Sprint",
      highlightText: "Custom autonomous agent pipelines",
      subText: "engineered with n8n and Make to eliminate manual operational bottlenecks 24/7.",
      iconText: "n8n / LLM / Workflows",
      color: "#1800AD"
    },
    {
      category: "Web Chatbots",
      badge: "Automation",
      statValue: "94%",
      statSub: "First-Response Accuracy",
      highlightText: "Intelligent customer service agents",
      subText: "integrating custom vector databases (RAG) over your support docs for immediate solutions.",
      iconText: "OpenAI / Pinecone",
      color: "#0EA5A4"
    },
    {
      category: "Voice Bots",
      badge: "Operations",
      statValue: "2.8x",
      statSub: "Booking Velocity Increase",
      highlightText: "Natural real-time voice agents",
      subText: "qualified for inbound customer inquiries, call scheduling, and automated reminders.",
      iconText: "Vapi / Twilio",
      color: "#1800AD"
    },
    {
      category: "App Development",
      badge: "Mobile Apps",
      statValue: "4.9★",
      statSub: "Average Store Rating",
      highlightText: "Refined native mobile platforms",
      subText: "compiled with React Native and Flutter for lightning-fast iOS & Android performance.",
      iconText: "Flutter / Native",
      color: "#0EA5A4"
    },
    {
      category: "SEO Systems",
      badge: "Acquisition",
      statValue: "340%",
      statSub: "Organic Traffic Increase",
      highlightText: "Technical and content SEO systems",
      subText: "wired to acquisition pipelines and compounding organic leads that scale without paid ad spend.",
      iconText: "Audits / Backlinks",
      color: "#1800AD"
    },
    {
      category: "Paid Marketing",
      badge: "Growth Engine",
      statValue: "4.2x",
      statSub: "Average Ad Spend ROI",
      highlightText: "Full-funnel traffic management",
      subText: "combining landing page testing and programmatic ads to acquire high-value customers.",
      iconText: "Meta / Google / Ads",
      color: "#0EA5A4"
    },
    {
      category: "Social Media Handling",
      badge: "Brand Voice",
      statValue: "10x",
      statSub: "Audience Growth Rate",
      highlightText: "Consistency-first community growth",
      subText: "leveraging high-quality custom asset creation and full-service community handling pipelines.",
      iconText: "Creatives / Handling",
      color: "#1800AD"
    }
  ];

  // Auto cycle slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <section ref={ref} className="section w-full py-20 bg-slate-50 flex items-center justify-center">
      <div className="container-x max-w-6xl w-full">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div
            className="transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)" }}
          >
            <span className="eyebrow">Capabilities</span>
            <h2 className="h-display mt-3 text-5xl md:text-6xl max-w-xl">
              Web Development & Digital Services to Grow Online
            </h2>
          </div>
          <div
            className="transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transitionDelay: "150ms" }}
          >
            <Link to="/services" className="btn btn-ghost">
              All services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Premium Interactive Slideshow Card - Wider and Shorter */}
        <div
          className="relative w-full rounded-[2.5rem] overflow-hidden p-8 md:p-10 text-white shadow-[0_30px_70px_rgba(24,0,173,0.14)] transition-all duration-700"
          style={{
            background: `linear-gradient(-45deg, #10101b, #1800AD, #0EA5A4, #10101b)`,
            backgroundSize: "400% 400%",
            animation: "moving-gradient-flow 15s ease infinite",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
          }}
        >
          {/* Moving Gradient Keyframe Injection */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes moving-gradient-flow {
              0% { background-position: 0% 50% }
              50% { background-position: 100% 50% }
              100% { background-position: 0% 50% }
            }
          `}} />

          {/* Ambient decorative glowing orb */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#0EA5A4]/20 blur-[80px] pointer-events-none" />

          {/* Top category indicator bar */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black tracking-widest uppercase text-white">{current.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                {current.iconText}
              </span>
              <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                {current.badge}
              </span>
            </div>
          </div>

          {/* 2-Column Responsive Layout: Left Stat, Right Content Copy */}
          <div className="grid md:grid-cols-12 gap-8 items-center mt-8">
            {/* Left side: Large dynamic metrics */}
            <div className="md:col-span-5 flex flex-col justify-center">
              <div className="flex items-start gap-1">
                <span className="text-7xl md:text-8xl font-black tracking-tighter leading-none">{current.statValue}</span>
                <ArrowUpRight className="h-7 w-7 text-[#0EA5A4] mt-1 shrink-0" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0EA5A4] mt-2">{current.statSub}</p>
            </div>

            {/* Right side: Catchy description content block */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <p className="text-lg md:text-xl font-semibold leading-relaxed">
                <span className="font-extrabold text-white text-2xl block mb-2">{current.highlightText}</span>
                <span className="text-white/80 text-sm md:text-base font-normal">{current.subText}</span>
              </p>
            </div>
          </div>

          {/* Footer: Slide Navigation dots & Start action */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
            {/* Horizontal Slide Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => setActiveSlide(sIdx)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: sIdx === activeSlide ? "32px" : "10px",
                    background: sIdx === activeSlide ? "#0EA5A4" : "rgba(255,255,255,0.25)"
                  }}
                  aria-label={`Go to slide ${sIdx + 1}`}
                />
              ))}
            </div>

            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white text-[#1800AD] px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all hover:bg-slate-100 hover:scale-105 shadow-sm">
              Start Project &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────── Why Choose Vexcort ── */
function WhyChooseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: "80+", label: "Happy Clients" },
    { value: "4.9 Rating", label: "Average Rating" },
    { value: "5-7 days", label: "Average Kickoff" },
    { value: "24h", label: "Response Time" },
  ];

  return (
    <section
      ref={ref}
      className="w-full min-h-screen lg:h-screen flex items-center py-10 lg:py-0"
      style={{
        background: "radial-gradient(circle at 5% 10%, rgba(24,0,173,0.03) 0%, transparent 50%), radial-gradient(circle at 95% 90%, rgba(14,165,164,0.03) 0%, transparent 50%), #FAF9F6",
        borderTop: "1px solid rgba(24,0,173,0.05)",
        borderBottom: "1px solid rgba(24,0,173,0.05)",
      }}
    >
      <div className="container-x w-full py-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left text */}
          <div
            className="transition-all duration-700 lg:col-span-5"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)" }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
              Why Vexcort
            </span>
            <h2 className="h-display mt-4 text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-black text-[#0B1324] tracking-tight">
              Strategy, Design & Engineering — Built Around Your Product
            </h2>
            <p className="mt-4 text-[#475569] text-sm leading-relaxed max-w-xl">
              We are not a content shop or a freelance marketplace. We are a focused team that ships
              premium digital products and measurable growth systems — delivering strategy, design, engineering, and growth under one roof.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/about" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1324] px-5 py-3 text-xs font-bold text-white transition-all duration-300 hover:bg-[#0B1324]/90 hover:scale-[1.02] shadow-md shadow-slate-950/10">
                About Vexcort <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 py-3 text-xs font-bold text-slate-800 transition-all duration-300 hover:border-slate-300">
                Get in touch
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 transition-all duration-700 hover:scale-[1.02] hover:border-primary/25"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    borderLeft: i % 2 === 0 ? "4px solid #1800AD" : "4px solid #0EA5A4",
                    borderTop: "1px solid rgba(24,0,173,0.06)",
                    borderRight: "1px solid rgba(24,0,173,0.06)",
                    borderBottom: "1px solid rgba(24,0,173,0.06)",
                    boxShadow: "0 10px 25px -10px rgba(24,0,173,0.06)",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${300 + i * 60}ms`,
                  }}
                >
                  <div className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: "#0B1324" }}>{s.value}</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {[
              {
                num: "01",
                title: "Senior craft, end-to-end",
                desc: "A focused senior team handles strategy, design, engineering and growth — one roof, zero handoffs.",
                icon: Globe,
                accent: "#1800AD"
              },
              {
                num: "02",
                title: "Ship in weeks, not quarters",
                desc: "Tight sprints, weekly demos, real product in your hands fast. No agency bloat.",
                icon: Zap,
                accent: "#0EA5A4"
              },
              {
                num: "03",
                title: "Built to scale safely",
                desc: "Modern stacks, type-safe code, security and performance baked in from day one.",
                icon: ShieldCheck,
                accent: "#1800AD"
              },
              {
                num: "04",
                title: "Measurable outcomes",
                desc: "Every engagement ties back to revenue, retention or efficiency. No vanity metrics.",
                icon: BarChart3,
                accent: "#0EA5A4"
              }
            ].map(({ num, title, desc, icon: Icon, accent }, i) => (
              <div
                key={num}
                className="group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-slate-300"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(24,0,173,0.07)",
                  boxShadow: "0 10px 30px -15px rgba(24,0,173,0.05)",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(25px)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{ background: `linear-gradient(90deg, ${accent}, #0EA5A4)` }}
                />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${accent}10`, color: accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 tracking-wider font-mono">
                      /{num}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-[#0B1324] group-hover:text-primary transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── Tool Logo Marquee ── */
function ToolsMarquee() {
  const toolLogos = [
    { src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/n8n.svg", alt: "n8n" },
    { src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/make.svg", alt: "Make" },
    { src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/zapier.svg", alt: "Zapier" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", alt: "JavaScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", alt: "Google Cloud" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" },
  ];
  const row1 = [...toolLogos, ...toolLogos];
  const row2 = [...toolLogos.slice(5), ...toolLogos.slice(0, 5), ...toolLogos.slice(5), ...toolLogos.slice(0, 5)];

  return (
    <section className="section">
      <div className="container-x">
        <div className="text-center mb-10">
          <span className="eyebrow">Tech Stack</span>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">Web Development & AI Automation Tools We Master</h2>
        </div>
        <div className="relative overflow-hidden py-2">
          <div className="logo-marquee-fade relative">
            <div className="logo-marquee-track logo-marquee-track-rtl">
              {row1.map((logo, i) => (
                <span key={`r1-${i}`} className="logo-pill">
                  <img src={logo.src} alt={logo.alt} className="h-12 w-12 object-contain" loading="lazy" />
                </span>
              ))}
            </div>
          </div>
          <div className="logo-marquee-fade relative mt-5">
            <div className="logo-marquee-track logo-marquee-track-ltr logo-marquee-track-slow">
              {row2.map((logo, i) => (
                <span key={`r2-${i}`} className="logo-pill">
                  <img src={logo.src} alt={logo.alt} className="h-12 w-12 object-contain" loading="lazy" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── Bento Grid ── */
function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section w-full"
      style={{ background: "linear-gradient(180deg,#fff 0%,#F4F6FF 100%)" }}
    >
      <div className="container-x">
        <div
          className="mb-12 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)" }}
        >
          <span className="eyebrow">Work</span>
          <h2 className="h-display mt-3 text-4xl md:text-5xl max-w-2xl">
            Digital Products & Services We Ship for Ambitious Brands
          </h2>
        </div>

        <div
          className="grid md:grid-cols-12 gap-5 items-stretch transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "150ms" }}
        >
          {/* Large card */}
          <div className="md:col-span-5 relative rounded-3xl overflow-hidden min-h-[380px] group shadow-sm hover:shadow-xl transition-all duration-500">
            <img src="/web_dev_showcase.png" alt="Web Development" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0EA5A4]">Web Development</span>
              <h3 className="mt-2 text-xl font-black leading-snug">Web Development Platforms Engineered for Velocity & Conversion</h3>
              <Link to="/services" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md px-4 py-1.5 text-xs font-semibold hover:bg-white hover:text-slate-900 transition-all">
                Explore Engineering <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Center column */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div className="relative rounded-3xl overflow-hidden flex-1 min-h-[180px] group shadow-sm hover:shadow-xl transition-all duration-500">
              <img src="/ai_auto_showcase.png" alt="AI Automation" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/55 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0EA5A4]">AI Automation</span>
                <h3 className="mt-1 text-base font-black leading-snug">AI Automation — Replace Bottlenecks With 24/7 Digital Pipelines</h3>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden flex-1 min-h-[180px] group shadow-sm hover:shadow-xl transition-all duration-500">
              <img src="/app_dev_showcase.png" alt="App Development" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/65 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0EA5A4]">App Development</span>
                <h3 className="mt-1 text-base font-black leading-snug">iOS & Android apps built to scale.</h3>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <div className="relative rounded-3xl overflow-hidden flex-1 min-h-[180px] group shadow-sm hover:shadow-xl transition-all duration-500">
              <img src="/growth_sys_showcase.png" alt="Growth Systems" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-slate-950/45 group-hover:bg-slate-950/60 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0EA5A4]">SEO & Growth</span>
                <h3 className="mt-1 text-sm font-black leading-snug">Compound organic traffic systems.</h3>
              </div>
            </div>
            <div
              className="rounded-3xl p-6 flex flex-col justify-center min-h-[160px]"
              style={{ background: "rgba(24,0,173,0.05)", border: "1px solid rgba(24,0,173,0.12)" }}
            >
              <div className="text-3xl font-black" style={{ color: "#1800AD", letterSpacing: "-0.04em" }}>0.8s</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Avg Load Speed</div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">Strict code splitting for instant content delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── Home ── */
function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vexcort",
    "url": "https://vexcort.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://vexcort.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Vexcort",
    "url": "https://vexcort.com",
    "logo": "https://vexcort.com/logo.png",
    "image": "https://vexcort.com/textlogo.png",
    "description": "Vexcort is a premium digital agency providing web development, web design, app development, AI automation, custom chatbots, and SEO marketing services.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Islamabad",
      "addressCountry": "PK"
    },
    "sameAs": [
      "https://www.linkedin.com/company/vexcort"
    ]
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      {/* Page content */}
      <div className="relative z-10">
        <Hero />
        <NeuralSphere />
        <ServicesSection />
        <WhyChooseSection />
        <BentoGrid />
        <ToolsMarquee />
        <CTASection />
      </div>
    </SiteLayout>
  );
}
