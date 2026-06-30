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

        {/* Premium overlapping chat-style cards for Services */}
        <section className="container-x pb-24">
          <div className="grid gap-12 md:gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ logo, logoAlt, title, desc, features, color, tag }, idx) => (
              <div
                key={title}
                className="group relative flex flex-col justify-between rounded-[2rem] p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(24,0,173,0.12)] min-h-[580px]"
                style={{
                  background: color === "#1800AD" ? "rgba(24,0,173,0.03)" : "rgba(14,165,164,0.03)",
                  border: `3px dashed ${color}50`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(50px)",
                  transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${idx * 60}ms`,
                }}
              >
                {/* Floating skewed header chat bubble */}
                <div 
                  className="w-[90%] rounded-3xl p-6 bg-white border shadow-md relative -rotate-3 transition-transform duration-500 group-hover:rotate-0 self-center mt-2 z-10"
                  style={{
                    borderColor: `${color}15`,
                    background: idx % 3 === 0 ? "#FFF0F0" : idx % 3 === 1 ? "#FFFFF0" : "#FFF5FF",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-slate-900/5 pb-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Client Request</span>
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-white shadow-sm border border-slate-100">
                      <img src={logo} alt={logoAlt} className="h-4.5 w-4.5 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn.simpleicons.org/react" }} />
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-semibold text-slate-700 italic leading-relaxed bg-white border rounded-2xl p-3 shadow-inner">
                    "I want to explore {title} systems, outline a realistic strategy for scaling our operations."
                  </p>

                  <h3 className="mt-4 text-lg font-black leading-tight text-slate-900 tracking-tight">
                    {title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                    {desc}
                  </p>
                </div>

                {/* Overlapping middle chat bubble listing features */}
                <div 
                  className="w-[95%] rounded-3xl p-6 bg-white border border-slate-100 shadow-lg relative rotate-2 transition-transform duration-500 group-hover:rotate-0 -mt-10 self-center z-20"
                >
                  <span className="text-[9px] font-black tracking-widest text-[#1800AD] uppercase block mb-3">Core Deliverables</span>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                        <span
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{ background: "rgba(24,0,173,0.05)" }}
                        >
                          <Check className="h-2.5 w-2.5" style={{ color }} />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive bottom card button block */}
                <div 
                  className="w-[90%] rounded-2xl p-4 flex items-center justify-between transition-transform duration-500 rotate-1 group-hover:rotate-0 self-center z-10"
                  style={{
                    background: color,
                    boxShadow: `0 8px 24px -6px ${color}60`,
                  }}
                >
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-white transition-opacity hover:opacity-90">
                    Book Service <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className="text-[10px] font-black text-white/70 tracking-widest">
                    #{tag}
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
