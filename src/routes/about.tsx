import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Rocket, Sparkles, ShieldCheck, Linkedin, ArrowUpRight, Check, X } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Cortvex" },
      { name: "description", content: "Cortvex is a modern digital solutions company building premium websites, apps and AI systems for ambitious brands." },
      { property: "og:title", content: "About Cortvex" },
      { property: "og:description", content: "A focused, senior team building modern digital products and growth systems." },
    ],
    links: [{ rel: "canonical", href: "https://cortvex.com/about" }],
  }),
  component: AboutPage,
});

const team = [
  {
    name: "Saif",
    role: "Founder & CEO",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/msaifurrehman1",
    image: "/saif.png",
    philosophy: "We build products that outlive trends.",
    sizeClass: "col-span-1 md:row-span-2 md:h-[480px]", // Large featured card
  },
  {
    name: "Hassan",
    role: "Co-Founder & AI Developer",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/hassanxabbasi",
    image: "/hassan.jpeg",
    philosophy: "Make code simple and intelligence accessible.",
    sizeClass: "col-span-1 md:h-[280px]",
  },
  {
    name: "Umer",
    role: "AI/ML Developer",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/umer-ahmed-87ba72361",
    image: "/umer.jpeg",
    philosophy: "Volumetric models should be built to perform.",
    sizeClass: "col-span-1 md:h-[280px]",
  },
  {
    name: "Husnain",
    role: "Web/App Developer",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/husnain-fazal-b0377b329",
    image: "/husnain.jpeg",
    philosophy: "Details matter. Craft clean user interfaces.",
    sizeClass: "col-span-1 md:h-[280px]",
  },
  {
    name: "Fariz",
    role: "Business Development Manager",
    location: "Lahore",
    linkedin: "https://www.linkedin.com/in/muhammad-fariz-04512234b",
    image: "/fariz.jpeg",
    philosophy: "True partnership is based on alignment.",
    sizeClass: "col-span-1 md:h-[280px]",
  },
  {
    name: "Areeba",
    role: "UI UX Designer & SEO Expert",
    location: "Islamabad",
    linkedin: "#",
    image: "/areeba.jpeg",
    philosophy: "Design systems must be functional and gorgeous.",
    sizeClass: "col-span-1 md:h-[280px]",
  },
];

const highlights = [
  { value: "20+", label: "businesses automated" },
  { value: "80+", label: "projects delivered" },
  { value: "4.9/5", label: "avg client rating" },
  { value: "7 days", label: "average kickoff time" },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AboutPage() {
  const aboutHeading = "We don't build websites. We build digital companies that grow.";
  const [typedAboutHeading, setTypedAboutHeading] = useState("");
  const heroReveal = useScrollReveal();
  const problemReveal = useScrollReveal();
  const missionReveal = useScrollReveal();
  const build1Reveal = useScrollReveal();
  const build2Reveal = useScrollReveal();
  const build3Reveal = useScrollReveal();
  const build4Reveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const impactReveal = useScrollReveal();
  const teamReveal = useScrollReveal();
  const whyReveal = useScrollReveal();
  const closeReveal = useScrollReveal();
  const [isHovered, setIsHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!heroReveal.isVisible) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedAboutHeading(aboutHeading.slice(0, index));
      if (index >= aboutHeading.length) {
        window.clearInterval(timer);
      }
    }, 25);

    return () => window.clearInterval(timer);
  }, [heroReveal.isVisible]);

  // Animated counters for metrics
  const [businessesCount, setBusinessesCount] = useState(1);
  const [projectsCount, setProjectsCount] = useState(1);
  const [ratingCount, setRatingCount] = useState(1.0);
  const [kickoffCount, setKickoffCount] = useState(1);

  useEffect(() => {
    if (!impactReveal.isVisible) return;

    const businessesTarget = 20;
    const projectsTarget = 80;
    const ratingTarget = 4.9;
    const kickoffTarget = 7;

    const businessesTimer = window.setInterval(() => {
      setBusinessesCount((prev) => {
        if (prev >= businessesTarget) {
          window.clearInterval(businessesTimer);
          return businessesTarget;
        }
        return prev + 1;
      });
    }, 45);

    const projectsTimer = window.setInterval(() => {
      setProjectsCount((prev) => {
        if (prev >= projectsTarget) {
          window.clearInterval(projectsTimer);
          return projectsTarget;
        }
        return prev + 1;
      });
    }, 15);

    const ratingTimer = window.setInterval(() => {
      setRatingCount((prev) => {
        if (prev >= ratingTarget) {
          window.clearInterval(ratingTimer);
          return ratingTarget;
        }
        return Math.min(Number((prev + 0.1).toFixed(1)), ratingTarget);
      });
    }, 60);

    const kickoffTimer = window.setInterval(() => {
      setKickoffCount((prev) => {
        if (prev >= kickoffTarget) {
          window.clearInterval(kickoffTimer);
          return kickoffTarget;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      window.clearInterval(businessesTimer);
      window.clearInterval(projectsTimer);
      window.clearInterval(ratingTimer);
      window.clearInterval(kickoffTimer);
    };
  }, [impactReveal.isVisible]);

  return (
    <SiteLayout>
      {/* Decorative Gradient Background Blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-[30%] left-[-10%] h-[600px] w-[600px] rounded-full bg-violet-500/5 blur-[140px]" />
      </div>

      <div className="relative z-10 select-none">
        
        {/* Section 1 — Hero Story */}
        <section ref={heroReveal.ref} className="container-x min-h-[90vh] pt-32 pb-16 flex flex-col justify-center">
          <div className={`grid gap-12 lg:grid-cols-12 items-center transition-all duration-1000 transform ${heroReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="lg:col-span-7">
              <p className="eyebrow">Our Story</p>
              <h1 className="h-display mt-3 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-slate-900">
                {typedAboutHeading}
                <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse align-[-0.1em] bg-[color:var(--brand)]" />
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-500 leading-relaxed">
                Cortvex is a premium digital studio that replaces bloated agency teams with a focused, senior-first roster. We combine design, deep engineering, and AI automation to help companies scale faster and capture sustainable growth.
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm rounded-3xl border border-white/60 bg-white/45 p-8 shadow-[0_24px_60px_-30px_rgba(24,0,173,0.22)] backdrop-blur-xl">
                <p className="eyebrow mb-5 text-[10px]">The Philosophy</p>
                <div className="space-y-6">
                  {[
                    { title: "Build Faster.", color: "text-slate-900", delay: "delay-100" },
                    { title: "Automate Smarter.", color: "text-[color:var(--brand)]", delay: "delay-200" },
                    { title: "Grow Bigger.", color: "text-slate-900", delay: "delay-300" }
                  ].map((line) => (
                    <div key={line.title} className={`transform transition-all duration-700 ${heroReveal.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"} ${line.delay}`}>
                      <h3 className={`text-3xl font-black ${line.color}`}>{line.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — The Problem */}
        <section ref={problemReveal.ref} className="container-x py-24 border-t border-slate-100">
          <div className={`transition-all duration-1000 transform ${problemReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="eyebrow text-center">The Challenge</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl text-center max-w-3xl mx-auto">
              Most agencies sell hours. <span className="text-[color:var(--brand)]">We deliver outcomes.</span>
            </h2>
            <div className="mt-16 grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <p className="text-lg text-slate-500 leading-relaxed">
                  Traditional digital partners are incentivized to move slowly, padding timelines with bloated project management layers, endless revision loops, and delegating your build to junior developers.
                </p>
                <p className="text-lg text-slate-500 leading-relaxed">
                  Cortvex was founded to disrupt this model. We focus on lean timelines, high ownership, and direct communication with specialists who translate your commercial goals into shipping code.
                </p>
              </div>
              <div className="relative p-6 rounded-3xl border border-rose-500/10 bg-rose-500/[0.02] shadow-[0_20px_48px_-28px_rgba(239,68,68,0.15)] backdrop-blur-sm">
                <p className="eyebrow text-rose-500 mb-6 font-semibold">The Friction Checklist</p>
                <ul className="space-y-4">
                  {[
                    "Layers of account management (context lost)",
                    "Vague timelines that continuously slip",
                    "Unoptimized code and poor technical performance",
                    "Delegation of work to junior resources",
                    "Lack of proactive strategic guidance"
                  ].map((f, fi) => (
                    <li
                      key={f}
                      className={`flex items-center gap-3.5 text-slate-600 transition-all duration-500`}
                      style={{
                        opacity: problemReveal.isVisible ? 1 : 0,
                        transform: problemReveal.isVisible ? "translateX(0)" : "translateX(-15px)",
                        transitionDelay: `${fi * 100}ms`
                      }}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                        <X className="h-3 w-3" />
                      </span>
                      <span className="text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Our Mission */}
        <section ref={missionReveal.ref} className="container-x py-24 border-t border-slate-100 bg-slate-50/[0.3]">
          <div className={`transition-all duration-1000 transform ${missionReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="eyebrow">Our Vision</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl max-w-3xl">
              We built the studio we always wished existed.
            </h2>
            <p className="mt-5 max-w-xl text-slate-500">
              We focus on the core disciplines required to design, ship, and scale products for high-growth brands.
            </p>

            {/* Horizontal Staggered Timeline */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
              {[
                { step: "01", title: "Design", desc: "Conversion-centric UI UX built around consumer intent.", color: "from-indigo-500 to-purple-500" },
                { step: "02", title: "Engineering", desc: "Clean, type-safe development optimized for speed.", color: "from-blue-500 to-indigo-500" },
                { step: "03", title: "Automation", desc: "AI workflows and custom bots that remove overhead.", color: "from-teal-500 to-emerald-500" },
                { step: "04", title: "Growth", desc: "Technical SEO and performance systems built for traffic.", color: "from-amber-500 to-orange-500" }
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className="relative p-6 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between"
                  style={{
                    opacity: missionReveal.isVisible ? 1 : 0,
                    transform: missionReveal.isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${idx * 150}ms`
                  }}
                >
                  <div>
                    <span className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-br ${item.color} px-2.5 py-1 text-[10px] font-mono font-bold text-white uppercase`}>
                      Step {item.step}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — What We Build */}
        <section className="py-24 border-t border-slate-100">
          <div className="container-x">
            <p className="eyebrow text-center mb-16">The Core Capabilities</p>
            
            <div className="space-y-32">
              
              {/* Row 1 — Web Development */}
              <div ref={build1Reveal.ref} className={`grid gap-12 lg:grid-cols-2 items-center transition-all duration-1000 transform ${build1Reveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-3xl font-extrabold text-slate-900">Web Development</h3>
                  <p className="mt-4 text-slate-500 leading-relaxed">
                    We engineer production-grade websites using modern, type-safe frameworks like Next.js and TanStack. Built for peak lighthouse scores, robust CMS management, and seamless performance.
                  </p>
                </div>
                <div className="relative group overflow-hidden rounded-3xl border border-slate-100 shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--brand)]/10 to-transparent z-10 pointer-events-none" />
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200" alt="Code mockup screen" className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
              </div>

              {/* Row 2 — Mobile Apps */}
              <div ref={build2Reveal.ref} className={`grid gap-12 lg:grid-cols-2 items-center transition-all duration-1000 transform ${build2Reveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                <div className="lg:order-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
                    <Rocket className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-3xl font-extrabold text-slate-900">App Development</h3>
                  <p className="mt-4 text-slate-500 leading-relaxed">
                    High-fidelity native and cross-platform apps built on React Native and Flutter. Designed with responsive, tactile interfaces that scale beautifully on iOS and Android platforms.
                  </p>
                </div>
                <div className="lg:order-1 relative group overflow-hidden rounded-3xl border border-slate-100 shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent z-10 pointer-events-none" />
                  <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200" alt="Mobile app screens" className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
              </div>

              {/* Row 3 — AI Automation */}
              <div ref={build3Reveal.ref} className={`grid gap-12 lg:grid-cols-2 items-center transition-all duration-1000 transform ${build3Reveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-3xl font-extrabold text-slate-900">AI Automation</h3>
                  <p className="mt-4 text-slate-500 leading-relaxed">
                    Custom large language model (LLM) integrations, workflow automation, and voice agents. We map your operations and automate manual pipelines to scale output without increasing headcount.
                  </p>
                </div>
                <div className="relative group overflow-hidden rounded-3xl border border-slate-100 shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent z-10 pointer-events-none" />
                  <img src="https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200" alt="AI nodes illustration" className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
              </div>

              {/* Row 4 — Growth Systems */}
              <div ref={build4Reveal.ref} className={`grid gap-12 lg:grid-cols-2 items-center transition-all duration-1000 transform ${build4Reveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                <div className="lg:order-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-3xl font-extrabold text-slate-900">Growth & Analytics</h3>
                  <p className="mt-4 text-slate-500 leading-relaxed">
                    Built-in performance marketing tracking, programmatic SEO setups, and client portals. We build systems that directly align with your business growth and customer analytics dashboard.
                  </p>
                </div>
                <div className="lg:order-1 relative group overflow-hidden rounded-3xl border border-slate-100 shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent z-10 pointer-events-none" />
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200" alt="Analytics metrics dashboard" className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 5 — Our Process */}
        <section ref={processReveal.ref} className="container-x py-24 border-t border-slate-100 bg-slate-50/[0.2]">
          <div className={`transition-all duration-1000 transform ${processReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="eyebrow text-center">Our Process</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl text-center max-w-2xl mx-auto">
              How we take projects from zero to scale.
            </h2>
            
            {/* Vertical storytelling timeline */}
            <div className="mt-20 relative max-w-xl mx-auto">
              {/* Glowing vertical line connector */}
              <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-slate-100 overflow-hidden">
                <div className="w-full h-[60%] bg-[color:var(--brand)] shadow-[0_0_8px_rgba(24,0,173,0.5)] transition-all duration-1000" />
              </div>

              <div className="space-y-16">
                {[
                  { step: "01", title: "Discover", desc: "Collaborative strategy session mapping your goals and technical roadmap." },
                  { step: "02", title: "Design", desc: "High-fidelity UX interactive prototyping and brand ui layouts." },
                  { step: "03", title: "Build", desc: "Lean development sprints, type-safe systems, and weekly visual builds." },
                  { step: "04", title: "Launch", desc: "Performance audits, production-grade scaling deployment, and launch checklist." },
                  { step: "05", title: "Scale", desc: "Continuous strategic automation updates, technical SEO expansion, and analytics." }
                ].map((item, idx) => (
                  <div key={item.step} className="flex gap-8 relative z-10 items-start">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white font-mono text-sm font-black text-slate-800 shadow-sm">
                      {item.step}
                    </span>
                    <div className="pt-2">
                      <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 — Impact Numbers */}
        <section ref={impactReveal.ref} className="py-24 border-t border-slate-100 overflow-hidden relative">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-500/[0.02] to-violet-500/[0.01] pointer-events-none" />
          <div className={`container-x relative z-10 transition-all duration-1000 transform ${impactReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="eyebrow text-center mb-16">Impact Numbers</p>
            
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 text-center">
              {[
                { val: `${businessesCount}+`, label: "Businesses Automated" },
                { val: `${projectsCount}+`, label: "Projects Delivered" },
                { val: `${ratingCount.toFixed(1)}★`, label: "Client Rating" },
                { val: `${kickoffCount} Days`, label: "Average Kickoff" }
              ].map((h, hi) => (
                <div key={h.label} className="flex flex-col items-center">
                  <p className="text-6xl md:text-7xl font-black text-gradient leading-none tracking-tight">
                    {h.val}
                  </p>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7 — Meet the Team */}
        <section ref={teamReveal.ref} className="bg-slate-50/[0.1] py-32 border-t border-slate-100 overflow-hidden">
          <div className={`container-x relative flex flex-col items-center transition-all duration-1000 transform ${teamReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="eyebrow text-center">Team</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl text-center max-w-2xl mx-auto">
              A focused team you will actually meet.
            </h2>
            <p className="mt-4 text-slate-500 text-center max-w-lg mx-auto">
              Behind every successful launch is a small team obsessed with quality.
            </p>

            {/* Orbit Showcase Container */}
            <div className="relative mt-24 w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center">
              
              {/* Center "V" Logo */}
              <div className="relative z-20 h-16 w-16 md:h-20 md:w-20 rounded-full border border-[color:var(--brand)]/20 bg-white/90 shadow-[0_12px_36px_-12px_rgba(24,0,173,0.35)] flex items-center justify-center">
                <img src="/logo.png" alt="Cortvex V Logo" className="h-8 w-8 object-contain" />
              </div>

              {/* Orbit paths (decorative rings) */}
              <div className="absolute inset-4 rounded-full border border-dashed border-slate-200 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-slate-100 pointer-events-none" />

              {/* Orbiting Members Container */}
              <div 
                className="absolute inset-0 transition-transform"
                style={{
                  animation: "orbit 35s linear infinite",
                  animationPlayState: isHovered !== null ? "paused" : "running"
                }}
              >
                {team.map((m, idx) => {
                  const angle = idx * 60; // 6 members = 60 deg spacing
                  const isCurrentHovered = isHovered === idx;

                  return (
                    <div
                      key={m.name}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translate(min(185px, 35vw)) rotate(${-angle}deg)`,
                      }}
                    >
                      {/* Reverse rotation wrapper to keep content upright */}
                      <div
                        style={{
                          animation: "counter-orbit 35s linear infinite",
                          animationPlayState: isHovered !== null ? "paused" : "running"
                        }}
                      >
                        <div
                          onMouseEnter={() => setIsHovered(idx)}
                          onMouseLeave={() => setIsHovered(null)}
                          className={`relative rounded-full transition-all duration-500 ease-out cursor-pointer ${
                            isCurrentHovered 
                              ? "h-64 w-64 md:h-72 md:w-72 rounded-2xl z-30 shadow-[0_24px_60px_-16px_rgba(11,19,36,0.3)] border border-[color:var(--brand)]/35 bg-white p-5" 
                              : "h-16 w-16 md:h-20 md:w-20 rounded-full z-10 shadow-md border-2 border-white hover:border-[color:var(--brand)] bg-slate-100 overflow-hidden"
                          }`}
                          style={{
                            transform: isCurrentHovered ? "scale(1.05)" : "scale(1)",
                          }}
                        >
                          {/* Normal orbiting portrait (black and white circle) */}
                          {!isCurrentHovered ? (
                            <img
                              src={m.image}
                              alt={m.name}
                              className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                              loading="lazy"
                            />
                          ) : (
                            // Hovered detailed pop-up card
                            <div className="flex flex-col h-full justify-between animate-fade-in">
                              <div className="flex gap-3.5 items-center">
                                <img
                                  src={m.image}
                                  alt={m.name}
                                  className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border-2 border-[color:var(--brand)]/30"
                                />
                                <div className="text-left">
                                  <h4 className="text-sm md:text-base font-extrabold text-slate-900">{m.name}</h4>
                                  <p className="text-[11px] text-[color:var(--brand)] font-semibold mt-0.5">{m.role}</p>
                                  <p className="text-[9px] text-slate-400 font-medium">{m.location}</p>
                                </div>
                              </div>

                              <p className="mt-3 text-[11px] italic text-slate-500 leading-relaxed text-left">
                                "{m.philosophy}"
                              </p>

                              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                                <a
                                  href={m.linkedin}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0A66C2] hover:underline"
                                >
                                  <Linkedin className="h-3 w-3" />
                                  LinkedIn
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Orbit animation keyframe declarations */}
          <style>{`
            @keyframes orbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes counter-orbit {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            .animate-fade-in {
              animation: fadeIn 0.3s ease-out forwards;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </section>

        {/* Section 8 — Why Clients Choose Us */}
        <section ref={whyReveal.ref} className="container-x py-24 border-t border-slate-100 bg-slate-50/[0.2]">
          <div className={`transition-all duration-1000 transform ${whyReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="eyebrow text-center">Comparisons</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl text-center max-w-3xl mx-auto">
              How Cortvex stacks up.
            </h2>

            <div className="mt-16 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
              
              {/* Traditional Agency Column */}
              <div className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm">
                <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  Traditional Agency
                </h4>
                <ul className="space-y-4">
                  {[
                    "Layers of management context delays",
                    "Apathetic junior staff developers",
                    "Unclear and bloated delivery billing",
                    "Slower timeline execution iterations"
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-3.5 text-slate-500">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500 mt-1">
                        <X className="h-3 w-3" />
                      </span>
                      <span className="text-sm font-medium">{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cortvex Column */}
              <div className="p-8 rounded-3xl border border-indigo-500/10 bg-indigo-500/[0.01] shadow-[0_20px_48px_-28px_rgba(24,0,173,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
                <h4 className="text-xl font-bold text-[color:var(--brand)] mb-6 flex items-center gap-2">
                  Cortvex Studio
                </h4>
                <ul className="space-y-4">
                  {[
                    "Direct communication with senior specialists",
                    "Rapid iterative weekly visual builds",
                    "Predictable outcome-driven transparent pricing",
                    "AI workflow automation built natively"
                  ].map((check) => (
                    <li key={check} className="flex items-start gap-3.5 text-slate-700">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mt-1">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm font-semibold">{check}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Section 9 — Closing Story */}
        <section ref={closeReveal.ref} className="container-x py-24 border-t border-slate-100 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-indigo-500/[0.03] to-transparent blur-3xl pointer-events-none" />
          <div className={`relative z-10 max-w-2xl mx-auto transition-all duration-1000 transform ${closeReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="eyebrow">The Closing Word</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Every ambitious business deserves world-class digital products.
            </h2>
            <p className="mt-6 text-slate-500 text-lg leading-relaxed">
              Whether you're launching your first startup or scaling your next growth milestone, we're here to help you move faster with exceptional design, engineering, and automation.
            </p>
          </div>
        </section>

        {/* Final CTA Area */}
        <CTASection />

      </div>
    </SiteLayout>
  );
}
