import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Calendar, Check, Star, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/index/bak2")({
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

const services = [
  {
    logo: "https://cdn.simpleicons.org/react",
    logoAlt: "React logo",
    title: "Web Development",
    desc: "Fast, scalable websites and platforms built with modern stacks.",
    features: ["TanStack / Next.js", "Type-safe architecture", "Performance budgets", "CMS integrations"],
  },
  {
    logo: "https://cdn.simpleicons.org/figma",
    logoAlt: "Figma logo",
    title: "Web Design",
    desc: "Conversion-focused interfaces designed around your brand.",
    features: ["UX research", "Design systems", "Interactive prototyping", "Brand-aligned UI"],
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg",
    logoAlt: "OpenAI logo",
    title: "AI Automation",
    desc: "Custom AI workflows that remove repetitive operational work.",
    features: ["Workflow design", "LLM integrations", "Internal tools", "Make / Zapier / n8n"],
  },
  {
    logo: "https://cdn.simpleicons.org/dialogflow",
    logoAlt: "Dialogflow logo",
    title: "Web Chatbots",
    desc: "Code and no-code chatbots that qualify leads 24/7.",
    features: ["RAG over your docs", "CRM integration", "Multilingual support", "Built-in analytics"],
  },
  {
    logo: "/voice-agent-logo.png",
    logoAlt: "Voice agent logo",
    title: "Voice Bots",
    desc: "Natural voice agents for support, booking and outbound calls.",
    features: ["Realtime voice flows", "Calendar booking", "Call summaries", "Smart human handoff"],
  },
  {
    logo: "https://cdn.simpleicons.org/flutter",
    logoAlt: "Flutter logo",
    title: "App Development",
    desc: "iOS and Android apps with refined product experiences.",
    features: ["React Native / Flutter", "Native modules", "Store submission", "Analytics + crash reports"],
  },
  {
    logo: "https://cdn.simpleicons.org/google",
    logoAlt: "Google logo",
    title: "SEO",
    desc: "Technical SEO and content that compound traffic over time.",
    features: ["Technical audits", "Keyword strategy", "Content production", "Link building"],
  },
  {
    logo: "https://cdn.simpleicons.org/meta",
    logoAlt: "Meta logo",
    title: "Marketing",
    desc: "Performance campaigns wired to revenue, not vanity metrics.",
    features: ["Paid social + search", "Landing page optimization", "Funnel analytics", "Creative testing"],
  },
  {
    logo: "https://cdn.simpleicons.org/instagram",
    logoAlt: "Instagram logo",
    title: "Social Media",
    desc: "Full-service social handling that builds brand authority.",
    features: ["Content calendar", "Creative production", "Community management", "Performance reporting"],
  },
];

function Hero({ isStoryteller }: { isStoryteller?: boolean }) {
  return (
    <section className="relative overflow-hidden w-full h-full flex items-center">
      {!isStoryteller && (
        <>
          <div className="animate-hero-bg-slide-in pointer-events-none absolute inset-0 z-20 flex items-end justify-center">
            <div
              className="absolute h-[min(58vh,560px)] w-[min(58vw,620px)] rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--brand) 58%, transparent) 0%, color-mix(in srgb, var(--brand-accent) 30%, transparent) 42%, transparent 72%)",
              }}
            />
            <img
              src="/homerobo.png"
              alt=""
              className="relative z-10 h-[min(92vh,860px)] w-auto max-w-none object-contain"
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="container-x pointer-events-none absolute inset-x-0 top-[18%] z-10 flex justify-center">
            <h1 className="font-logo animate-fade-up text-center text-[4.8rem] font-black uppercase leading-[0.78] text-[#3a3a3d] sm:text-[7rem] md:text-[9.5rem] lg:text-[11rem]">
              Cortvex
            </h1>
          </div>
        </>
      )}
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

function ServicesPreview({ active, activeIndex }: { active?: boolean; activeIndex?: number }) {
  const servicesHeading = "Everything you need to grow online, under one roof.";
  const [typedServicesHeading, setTypedServicesHeading] = useState("");

  useEffect(() => {
    if (active !== undefined) {
      if (!active) {
        setTypedServicesHeading("");
        return;
      }
      let index = 0;
      const timer = window.setInterval(() => {
        index += 1;
        setTypedServicesHeading(servicesHeading.slice(0, index));
        if (index >= servicesHeading.length) {
          window.clearInterval(timer);
        }
      }, 28);
      return () => window.clearInterval(timer);
    }

    // Mobile fallback (mount trigger)
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedServicesHeading(servicesHeading.slice(0, index));
      if (index >= servicesHeading.length) {
        window.clearInterval(timer);
      }
    }, 28);
    return () => window.clearInterval(timer);
  }, [active]);

  if (active !== undefined && activeIndex !== undefined) {
    // Desktop Storyteller 3D Carousel Layout
    return (
      <section
        id="home-services-section"
        className="pt-20 pb-4 lg:py-0 lg:pt-20 w-full"
      >
        <div className="container-x grid lg:grid-cols-12 gap-8 items-center min-h-[500px]">
          {/* Left Column - Fixed Heading & Progress Indicator */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full pr-6">
            <div className="flex items-center gap-3">
              <p className="eyebrow">Services</p>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                0{activeIndex + 1} / 09
              </span>
            </div>
            <h2 className="h-display mt-4 text-4xl lg:text-5xl leading-tight">
              {typedServicesHeading}
              <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse align-[-0.1em] bg-[color:var(--brand)]" />
            </h2>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              We cover the full spectrum of digital products and automation. Scroll through to see how we build, optimize, and scale.
            </p>
            <div className="mt-8">
              <Link to="/services" className="btn btn-ghost px-5 py-2.5">
                All services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column - 3D Perspective Viewport */}
          <div className="lg:col-span-7 relative h-[480px] w-full flex items-center justify-center select-none" style={{ perspective: "1200px" }}>
            {services.map(({ logo, logoAlt, title, desc, features }, idx) => {
              const offset = idx - activeIndex;
              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isFarPrev = offset < -1;
              const isFarNext = offset > 1;

              // Calculate 3D transforms and opacity based on offsets
              let opacity = 0;
              let transform = "";
              let zIndex = 0;
              let pointerEvents: "auto" | "none" = "none";

              if (isActive) {
                opacity = 1;
                transform = "translateY(0) translateZ(0) rotateX(0deg)";
                zIndex = 30;
                pointerEvents = "auto";
              } else if (isNext) {
                opacity = 0.45;
                transform = "translateY(120px) translateZ(-160px) rotateX(-12deg)";
                zIndex = 20;
              } else if (isPrev) {
                opacity = 0;
                transform = "translateY(-140px) translateZ(-160px) rotateX(12deg)";
                zIndex = 10;
              } else if (isFarNext) {
                opacity = 0;
                transform = "translateY(240px) translateZ(-320px) rotateX(-24deg)";
                zIndex = 0;
              } else if (isFarPrev) {
                opacity = 0;
                transform = "translateY(-240px) translateZ(-320px) rotateX(24deg)";
                zIndex = 0;
              }

              return (
                <div
                  key={title}
                  className={`absolute w-full max-w-[480px] p-6 rounded-3xl border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between ${
                    isActive
                      ? "border-[color:var(--brand)]/28 bg-gradient-to-br from-white via-white to-[color:var(--brand-soft)]/22"
                      : "border-border/70 bg-white/94"
                  }`}
                  style={{
                    opacity,
                    transform,
                    zIndex,
                    pointerEvents,
                    filter: isActive ? "none" : "blur(1.5px)",
                    boxShadow: isActive
                      ? "0 25px 60px -15px rgba(24, 0, 173, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.95)"
                      : "0 10px 30px -15px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {/* Glowing background shadow similar to the robot */}
                  {isActive && (
                    <div
                      className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-60 blur-3xl pointer-events-none animate-pulse"
                      style={{
                        background:
                          "radial-gradient(circle, color-mix(in srgb, var(--brand) 70%, transparent) 0%, color-mix(in srgb, var(--brand-accent) 40%, transparent) 55%, transparent 80%)",
                        animationDuration: "4s"
                      }}
                    />
                  )}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--brand-soft)] shadow-sm">
                        <img src={logo} alt={logoAlt} className="h-6 w-6 object-contain" loading="lazy" />
                      </span>
                      <span className="text-xs font-mono text-muted-foreground/60">
                        STEP 0{idx + 1}
                      </span>
                    </div>
                    
                    <h3 className="mt-5 text-2xl font-bold text-foreground leading-tight">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>

                    {/* Features list */}
                    <ul className="mt-5 space-y-2.5">
                      {features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2.5 text-sm text-foreground/80">
                          <Check className="h-4 w-4 text-[color:var(--brand)] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand)] hover:underline"
                    >
                      Start Project <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/services"
                      className="text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      Explore service detail
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Mobile Render Mode (original 3x3 Grid)
  return (
    <section
      id="home-services-section"
      className="section w-full"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h2 className="h-display mt-3 text-4xl md:text-5xl">
              {typedServicesHeading}
              <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse align-[-0.1em] bg-[color:var(--brand)]" />
            </h2>
          </div>
          <Link to="/services" className="btn btn-ghost">
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 md:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ logo, logoAlt, title, desc }) => (
            <div
              key={title}
              className="service-card-glass opacity-100 translate-y-0"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 shadow-[0_8px_22px_-16px_rgba(24,0,173,0.55)]">
                <img src={logo} alt={logoAlt} className="h-5 w-5 object-contain" loading="lazy" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <Link
                to="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--brand)]"
              >
                Learn more <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose({ active }: { active?: boolean }) {
  const whyChooseText = "A partner that treats your product like our own.";
  const [typedWhyChoose, setTypedWhyChoose] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (active !== undefined) return;

    const el = document.getElementById("why-choose-section");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    if (active !== undefined) {
      if (!active) {
        setTypedWhyChoose("");
        return;
      }
      let index = 0;
      const timer = window.setInterval(() => {
        index += 1;
        setTypedWhyChoose(whyChooseText.slice(0, index));
        if (index >= whyChooseText.length) {
          window.clearInterval(timer);
        }
      }, 42);
      return () => window.clearInterval(timer);
    }

    // Mobile fallback trigger
    if (!startTyping) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedWhyChoose(whyChooseText.slice(0, index));
      if (index >= whyChooseText.length) {
        window.clearInterval(timer);
      }
    }, 42);
    return () => window.clearInterval(timer);
  }, [active, startTyping]);

  const items = [
    {
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/notion.svg",
      logoAlt: "Notion logo",
      title: "Senior craft, end-to-end",
      desc: "A small, senior team handles strategy, design, engineering and growth.",
    },
    {
      logo: "https://cdn.simpleicons.org/lightning",
      logoAlt: "Lightning logo",
      title: "Ship in weeks, not quarters",
      desc: "Tight sprints, weekly demos, real product in your hands fast.",
    },
    {
      logo: "https://cdn.simpleicons.org/cloudflare",
      logoAlt: "Cloudflare logo",
      title: "Built to scale safely",
      desc: "Modern stacks, type-safe code, security and performance baked in.",
    },
    {
      logo: "https://cdn.simpleicons.org/chartdotjs",
      logoAlt: "Chart.js logo",
      title: "Measurable outcomes",
      desc: "Every engagement ties back to revenue, retention or efficiency.",
    },
  ];
  return (
    <section
      id="why-choose-section"
      className={`${
        active !== undefined
          ? "pt-20 pb-4 lg:py-0 lg:pt-20"
          : "section"
      } bg-transparent w-full`}
    >
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Why Cortvex</p>
            <h2 className="h-display mt-3 text-4xl md:text-5xl">
              {typedWhyChoose}
              <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse align-[-0.1em] bg-[color:var(--brand)]" />
            </h2>
            <p className="mt-5 text-muted-foreground">
              We're not a content shop or a freelance marketplace. We're a focused team that ships
              premium digital products and measurable growth systems.
            </p>
            <Link to="/about" className="btn btn-dark mt-7">
              About Cortvex <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className={`grid gap-5 sm:grid-cols-2 lg:col-span-7 ${active !== undefined ? "lg:gap-3" : ""}`}>
            {items.map(({ logo, logoAlt, title, desc }, idx) => (
              <div
                key={title}
                className={`service-card-glass transition-all duration-700 ease-out transform ${
                  active !== undefined
                    ? `${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} lg:py-4 lg:px-5`
                    : "opacity-100 translate-y-0"
                }`}
                style={{ transitionDelay: active ? `${idx * 80}ms` : "0ms" }}
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 shadow-[0_8px_22px_-16px_rgba(24,0,173,0.55)]">
                  <img src={logo} alt={logoAlt} className="h-5 w-5 object-contain" loading="lazy" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AIHighlight() {
  const toolLogos = [
    { src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/n8n.svg", alt: "n8n logo" },
    { src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/make.svg", alt: "Make logo" },
    { src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/zapier.svg", alt: "Zapier logo" },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      alt: "JavaScript logo",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      alt: "Python logo",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      alt: "CSS3 logo",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      alt: "HTML5 logo",
    },
    {
      src: "https://cdn.jsdelivr.gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React logo",
    },
    {
      src: "https://cdn.jsdelivr.gh/devicons/devicon/icons/typescript/typescript-original.svg",
      alt: "TypeScript logo",
    },
    {
      src: "https://cdn.jsdelivr.gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      alt: "Google Cloud logo",
    },
    {
      src: "https://cdn.jsdelivr.gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      alt: "AWS logo",
    },
  ];

  const rowOne = [...toolLogos, ...toolLogos];
  const rowTwo = [
    ...toolLogos.slice(5),
    ...toolLogos.slice(0, 5),
    ...toolLogos.slice(5),
    ...toolLogos.slice(0, 5),
  ];

  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden py-2">
          <div className="logo-marquee-fade relative">
            <div className="logo-marquee-track logo-marquee-track-rtl">
              {rowOne.map((logo, index) => (
                <span key={`${logo.alt}-${index}`} className="logo-pill">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-16 w-16 object-contain"
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="logo-marquee-fade relative mt-5">
            <div className="logo-marquee-track logo-marquee-track-ltr logo-marquee-track-slow">
              {rowTwo.map((logo, index) => (
                <span key={`${logo.alt}-rev-${index}`} className="logo-pill">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-16 w-16 object-contain"
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "How fast can we start?",
    a: "Most engagements kick off within 7 days of the discovery call.",
  },
  {
    q: "Do you work with non-technical founders?",
    a: "Yes - most of our clients are founders or marketing leads. We translate complexity into clear actions.",
  },
  {
    q: "What stacks do you use?",
    a: "React, Next/TanStack, Node, Python, modern AI stacks. We choose what fits.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. Retainers cover maintenance, growth experiments and AI iteration.",
  },
  {
    q: "Can you improve an existing site instead of rebuilding?",
    a: "Absolutely. We can optimize UX, performance, SEO, and conversion paths without a full rebuild.",
  },
  {
    q: "How do you handle revisions and feedback?",
    a: "We work in weekly review cycles with clear checkpoints, so feedback gets integrated continuously.",
  },
  {
    q: "Do you integrate with CRMs and third-party tools?",
    a: "Yes. We regularly integrate HubSpot, Salesforce, Stripe, Make, Zapier, n8n, and custom APIs.",
  },
];

function FAQ({ active }: { active?: boolean }) {
  const [showMoreFaqs, setShowMoreFaqs] = useState(false);
  const visibleFaqs = showMoreFaqs ? faqs.slice(0, 7) : faqs.slice(0, 4);

  return (
    <section
      id="home-faq-section"
      className={`${active !== undefined ? "pt-20 pb-4 lg:py-0 lg:pt-20" : "section"} w-full`}
    >
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className={`lg:col-span-5 transition-all duration-1000 ease-out ${active !== undefined ? (active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8") : "opacity-100 translate-x-0"}`}>
            <p className="eyebrow">FAQ</p>
            <h2 className="h-display mt-3 text-4xl md:text-5xl">Answers, fast.</h2>
            <p className="mt-4 text-muted-foreground">
              Can't find what you need? Reach out and we'll respond within one business day.
            </p>
            <div className="mt-6 rounded-2xl border bg-white/70 p-5 shadow-[0_14px_40px_-28px_rgba(18,35,92,0.35)] backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">
                Have a specific question about your project, budget, or timeline?
              </p>
              <Link to="/contact" hash="question-form" className="btn btn-primary mt-4">
                Ask a question <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="divide-y rounded-2xl border bg-white shadow-[0_18px_50px_-30px_rgba(18,35,92,0.35)]">
              {visibleFaqs.map((f, idx) => (
                <details
                  key={f.q}
                  className={`group p-6 transition-all duration-700 ease-out transform ${
                    active !== undefined
                      ? `${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} lg:p-4`
                      : "opacity-100 translate-y-0"
                  }`}
                  style={{ transitionDelay: active ? `${idx * 70}ms` : "0ms" }}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
                    {f.q}
                    <span className="grid h-7 w-7 place-items-center rounded-full border text-[color:var(--brand)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
            {!showMoreFaqs && (
              <button
                type="button"
                onClick={() => setShowMoreFaqs(true)}
                className="btn btn-ghost mt-5"
              >
                Show more questions <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; color: string; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const generatedStars = Array.from({ length: 85 }).map((_, i) => {
      const isTeal = Math.random() > 0.5;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1, // 1px to 3px
        color: isTeal ? "#0EA5A4" : "#1800AD", // Teal or Blue
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2, // 2s to 5s
      };
    });
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      // Map progress to active slide (0 to 3)
      if (progress < 0.12) {
        // Slide 0: Hero
        setActiveSlide(0);
      } else if (progress < 0.68) {
        // Slide 1: Services Carousel (spanning 0.56 progress width)
        setActiveSlide(1);
        const relativeProgress = progress - 0.12;
        const activeIndex = Math.floor(relativeProgress / (0.56 / 9));
        setActiveServiceIndex(Math.min(Math.max(activeIndex, 0), 8));
      } else if (progress < 0.84) {
        // Slide 2: Why Choose
        setActiveSlide(2);
      } else {
        // Slide 3: FAQ
        setActiveSlide(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return (
      <SiteLayout>
        {/* Twinkling Stars Background for Mobile */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes star-twinkle {
            0%, 100% { opacity: 0.15; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          .animate-star {
            animation: star-twinkle 3s infinite ease-in-out;
          }
        `}} />
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
        <div className="relative z-10 bg-transparent">
          <Hero />
          <ServicesPreview />
          <WhyChoose />
          <AIHighlight />
          <FAQ />
          <CTASection />
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Twinkling Stars Background for Desktop */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-star {
          animation: star-twinkle 3s infinite ease-in-out;
        }
      `}} />
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

      <div ref={containerRef} className="relative h-[700vh] bg-transparent z-10">
        {/* Pinned Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          
          {/* Huge background logo text */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[18%] z-10 flex justify-center transition-opacity duration-1000 ease-in-out"
            style={{ opacity: activeSlide === 0 ? 0.85 : 0 }}
          >
            <h1 className="font-logo text-center text-[4.8rem] font-black uppercase leading-[0.78] text-[#e0e0e3] sm:text-[7rem] md:text-[9.5rem] lg:text-[11rem]">
              Cortvex
            </h1>
          </div>

          {/* Shared background/narrator robot */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div
              className="absolute rounded-full opacity-60 blur-3xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: activeSlide === 0 ? "58vw" : "36vw",
                height: activeSlide === 0 ? "58vh" : "36vh",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--brand) 58%, transparent) 0%, color-mix(in srgb, var(--brand-accent) 30%, transparent) 42%, transparent 72%)",
                transform:
                  activeSlide === 0
                    ? "translate(0px, 10vh)"
                    : activeSlide === 1
                      ? "translate(30vw, 22vh)"
                      : activeSlide === 2
                        ? "translate(-30vw, 22vh)"
                        : "translate(32vw, -20vh)",
              }}
            />
            <img
              src="/homerobo.png"
              alt=""
              className="relative z-10 w-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                height:
                  activeSlide === 0
                    ? "min(92vh, 860px)"
                    : activeSlide === 1
                      ? "min(50vh, 450px)"
                      : activeSlide === 2
                        ? "min(46vh, 420px)"
                        : "min(40vh, 360px)",
                transform:
                  activeSlide === 0
                    ? "translate(0px, 0px)"
                    : activeSlide === 1
                      ? "translate(30vw, 22vh)"
                      : activeSlide === 2
                        ? "translate(-30vw, 22vh)"
                        : "translate(32vw, -20vh)",
                opacity:
                  activeSlide === 0
                    ? 0.92
                    : activeSlide === 1
                      ? 0.25
                      : activeSlide === 2
                        ? 0.20
                        : 0.12,
              }}
            />
          </div>

          {/* Slide 0: Hero */}
          <div
            className={`absolute inset-0 z-20 flex items-center transition-all duration-1000 ease-in-out ${
              activeSlide === 0
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 pointer-events-none -translate-y-12"
            }`}
          >
            <div className="w-full">
              <Hero isStoryteller />
            </div>
          </div>

          {/* Slide 1: ServicesPreview (3D Carousel) */}
          <div
            className={`absolute inset-0 z-20 flex items-center transition-all duration-1000 ease-in-out ${
              activeSlide === 1
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : activeSlide > 1
                  ? "opacity-0 pointer-events-none -translate-y-12"
                  : "opacity-0 pointer-events-none translate-y-12"
            }`}
          >
            <div className="w-full">
              <ServicesPreview active={activeSlide === 1} activeIndex={activeServiceIndex} />
            </div>
          </div>

          {/* Slide 2: WhyChoose */}
          <div
            className={`absolute inset-0 z-20 flex items-center transition-all duration-1000 ease-in-out ${
              activeSlide === 2
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : activeSlide > 2
                  ? "opacity-0 pointer-events-none -translate-y-12"
                  : "opacity-0 pointer-events-none translate-y-12"
            }`}
          >
            <div className="w-full">
              <WhyChoose active={activeSlide === 2} />
            </div>
          </div>

          {/* Slide 3: FAQ */}
          <div
            className={`absolute inset-0 z-20 flex items-center transition-all duration-1000 ease-in-out ${
              activeSlide === 3
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 pointer-events-none translate-y-12"
            }`}
          >
            <div className="w-full">
              <FAQ active={activeSlide === 3} />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable CTA and Footer */}
      <div className="relative z-30 bg-white shadow-[0_-24px_60px_-15px_rgba(0,0,0,0.06)]">
        <AIHighlight />
        <CTASection />
      </div>
    </SiteLayout>
  );
}
