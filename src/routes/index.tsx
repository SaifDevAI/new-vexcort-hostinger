import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Calendar, Check, Star, ShieldCheck, Zap, Globe, Bot, BarChart3, Smartphone, Palette } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import { NeuralSphere } from "@/components/NeuralSphere";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cortvex — Web, AI, Apps, SEO & Marketing for Modern Brands" },
      {
        name: "description",
        content:
          "Cortvex helps businesses design, build, automate, market and scale digital products through web development, AI automation, chatbots, SEO and marketing.",
      },
      { property: "og:title", content: "Cortvex — Build smarter websites, apps & AI systems" },
      {
        property: "og:description",
        content: "A premium digital agency for web, AI automation, chatbots, SEO and marketing.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://cortvex.com/" }],
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
    desc: "A focused senior team handles strategy, design, engineering and growth — one roof, zero handoffs.",
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
        >
          <source src="/home.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container-x pointer-events-none absolute inset-x-0 top-[18%] z-20 flex justify-center">
        <h1 className="font-logo animate-fade-up text-center text-[4.8rem] font-black uppercase leading-[0.78] text-[#3a3a3d] sm:text-[7rem] md:text-[9.5rem] lg:text-[11rem]">
          Cortvex
        </h1>
      </div>
      <div className="container-x relative z-30 min-h-[700px] py-16 lg:min-h-screen lg:py-20 w-full flex items-center">
        <div className="pointer-events-none absolute inset-x-4 bottom-16 mx-auto max-w-3xl animate-fade-up text-center">
          <p className="font-logo text-[0.62rem] font-bold uppercase leading-[1.25] text-[#999999] sm:text-[0.72rem] md:text-[0.82rem]">
            Turn browsers into buyers. Cortvex integrates enterprise-grade artificial intelligence
            into custom web environments to transform your digital presence into an automated
            revenue system
          </p>
        </div>
        <div className="absolute left-4 top-1/2 flex -translate-y-1/2 animate-fade-up flex-col items-start gap-6 sm:left-8">
          <Link
            to="/signin"
            search={{ mode: "signup" }}
            className="inline-flex items-center gap-3 font-logo text-[1rem] uppercase tracking-[0.02em] text-[color:var(--brand)] transition-colors hover:text-[color:var(--brand-accent)] md:text-[1.12rem]"
          >
            <Calendar className="h-5 w-5" />{" "}
            <span className="italic underline underline-offset-4">Book a Meeting</span>
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-3 font-logo text-[1rem] uppercase tracking-[0.02em] text-[color:var(--brand)] transition-colors hover:text-[color:var(--brand-accent)] md:text-[1.12rem]"
          >
            <span className="italic underline underline-offset-4">Explore Services</span>{" "}
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-6 font-logo text-[0.62rem] uppercase tracking-[0.02em] text-[#7a7f82]">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#1800AD] text-[#1800AD]" />
                ))}
              </div>
              <span>Rated 4.9 by 80+ clients</span>
            </div>
            <div className="hidden items-center gap-1.5 md:flex">
              <ShieldCheck className="h-4 w-4 text-[color:var(--brand)]" /> ISO-aligned delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── Services Grid ── */
function ServicesSection() {
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
    <section ref={ref} className="section w-full" style={{ background: "linear-gradient(180deg,#fff 0%,#F7F8FF 100%)" }}>
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div
            className="transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)" }}
          >
            <span className="eyebrow">Services</span>
            <h2 className="h-display mt-3 text-4xl md:text-5xl max-w-xl">
              Everything you need to grow online, under one roof.
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

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, color, title, desc, features, tag }, idx) => (
            <div
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(24,0,173,0.15)]"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(244,246,255,0.4) 100%)",
                border: "1px solid rgba(24,0,173,0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${idx * 80}ms`,
              }}
            >
              {/* Neon accent line at the top */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl transition-all duration-500 opacity-30 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, ${color} 0%, #0EA5A4 100%)` }}
              />

              {/* Radial gradient hover glow */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(120px circle at var(--x, 50%) var(--y, 50%), rgba(${color === "#1800AD" ? "24,0,173" : "14,165,164"}, 0.06), transparent 80%)`,
                }}
              />

              <div className="flex flex-col flex-1 p-8">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, rgba(${color === "#1800AD" ? "24,0,173" : "14,165,164"},0.08) 0%, rgba(255,255,255,0.9) 100%)`,
                      border: `1.5px solid rgba(${color === "#1800AD" ? "24,0,173" : "14,165,164"},0.12)`,
                      boxShadow: "0 8px 20px -6px rgba(24,0,173,0.1)",
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </span>
                  <span
                    className="text-[10px] font-black tracking-[0.2em] px-3 py-1 rounded-full text-slate-400 group-hover:text-[#1800AD] transition-colors duration-300"
                    style={{ background: "rgba(24,0,173,0.04)" }}
                  >
                    {tag}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold leading-tight text-slate-900 group-hover:text-[#1800AD] transition-colors duration-300"
                  style={{ letterSpacing: "-0.02em" }}>
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-500 flex-1">
                  {desc}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-xs text-slate-600">
                      <span
                        className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                        style={{ background: "rgba(24,0,173,0.05)" }}
                      >
                        <Check className="h-3 w-3" style={{ color }} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="mx-6 mb-6 flex items-center justify-between rounded-2xl px-5 py-3 transition-colors duration-300"
                style={{
                  background: "rgba(24,0,173,0.03)",
                  border: "1px solid rgba(24,0,173,0.06)",
                }}
              >
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
                  style={{ color: "#1800AD" }}>
                  Start Project <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link to="/services" className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                  Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────── Why Choose Cortvex ── */
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
    { value: "4.9★", label: "Average Rating" },
    { value: "5–7d", label: "Average Kickoff" },
    { value: "24h", label: "Response Time" },
  ];

  return (
    <section
      ref={ref}
      className="section w-full"
      style={{ background: "linear-gradient(160deg,#F4F6FF 0%,#fff 60%)" }}
    >
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left text */}
          <div
            className="transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-30px)" }}
          >
            <span className="eyebrow">Why Cortvex</span>
            <h2 className="h-display mt-3 text-4xl md:text-5xl leading-tight">
              A partner that treats your product like our own.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We are not a content shop or a freelance marketplace. We are a focused team that ships
              premium digital products and measurable growth systems — strategy, design, engineering and growth under one roof.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn btn-dark">
                About Cortvex <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Get in touch
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 transition-all duration-700"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(24,0,173,0.10)",
                    boxShadow: "0 4px 16px -6px rgba(24,0,173,0.09)",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${350 + i * 80}ms`,
                  }}
                >
                  <div className="text-2xl font-black" style={{ color: "#1800AD", letterSpacing: "-0.03em" }}>{s.value}</div>
                  <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map(({ num, title, desc }, i) => (
              <div
                key={num}
                className="group relative flex flex-col gap-3 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(24,0,173,0.09)",
                  boxShadow: "0 4px 20px -8px rgba(24,0,173,0.09)",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease",
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[#1800AD] to-[#0EA5A4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span
                  className="self-start rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase"
                  style={{ background: "rgba(24,0,173,0.07)", color: "#1800AD" }}
                >
                  {num}
                </span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1800AD] transition-colors duration-300">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
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
          <h2 className="h-display mt-3 text-3xl md:text-4xl">Tools we master</h2>
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
            What we ship for ambitious brands.
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
              <h3 className="mt-2 text-xl font-black leading-snug">High-performance platforms engineered for velocity and conversion.</h3>
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
                <h3 className="mt-1 text-base font-black leading-snug">Replace bottlenecks with 24/7 digital labor pipelines.</h3>
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
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; color: string; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 70 }).map((_, i) => {
      const isTeal = Math.random() > 0.5;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        color: isTeal ? "#0EA5A4" : "#1800AD",
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <SiteLayout>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-star {
          animation: star-twinkle 3s infinite ease-in-out;
        }
      `}} />

      {/* Star background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full animate-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: star.color,
              boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
              opacity: 0.65,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

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
