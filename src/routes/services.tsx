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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.02 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SiteLayout>
      <div ref={ref} className="relative z-10 bg-slate-50 min-h-screen">
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

        {/* Premium Grid layout for Services */}
        <section className="container-x pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ logo, logoAlt, title, desc, features, color, tag }, idx) => (
              <div
                key={title}
                className="group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(24,0,173,0.12)]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(244,246,255,0.65) 100%)",
                  border: "1px solid rgba(24,0,173,0.08)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(50px)",
                  transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${idx * 60}ms`,
                }}
              >
                {/* Neon accent top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[4px] rounded-t-3xl transition-all duration-500 opacity-40 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${color} 0%, #0EA5A4 100%)` }}
                />

                <div className="flex flex-col flex-1 p-8">
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `linear-gradient(135deg, rgba(${color === "#1800AD" ? "24,0,173" : "14,165,164"},0.08) 0%, rgba(255,255,255,0.95) 100%)`,
                        border: `1.5px solid rgba(${color === "#1800AD" ? "24,0,173" : "14,165,164"},0.12)`,
                        boxShadow: "0 8px 20px -6px rgba(24,0,173,0.08)",
                      }}
                    >
                      <img src={logo} alt={logoAlt} className="h-6 w-6 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn.simpleicons.org/react" }} />
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
                  <span className="text-[11px] font-semibold text-slate-400">
                    Cortvex Premium
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTASection />
      </div>
    </SiteLayout>
  );
}
