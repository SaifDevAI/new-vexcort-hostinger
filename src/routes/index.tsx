import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Calendar, Check, Star, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import { InteractiveParticles } from "@/components/InteractiveParticles";

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

const services = [
  {
    logo: "https://cdn.simpleicons.org/react",
    logoAlt: "React logo",
    title: "Web Development",
    desc: "Fast, scalable websites and platforms built with modern stacks.",
  },
  {
    logo: "https://cdn.simpleicons.org/figma",
    logoAlt: "Figma logo",
    title: "Web Design",
    desc: "Conversion-focused interfaces designed around your brand.",
  },
  {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg",
    logoAlt: "OpenAI logo",
    title: "AI Automation",
    desc: "Custom AI workflows that remove repetitive operational work.",
  },
  {
    logo: "https://cdn.simpleicons.org/dialogflow",
    logoAlt: "Dialogflow logo",
    title: "Web Chatbots",
    desc: "Code and no-code chatbots that qualify leads 24/7.",
  },
  {
    logo: "/voice-agent-logo.png",
    logoAlt: "Voice agent logo",
    title: "Voice Bots",
    desc: "Natural voice agents for support, booking and outbound calls.",
  },
  {
    logo: "https://cdn.simpleicons.org/flutter",
    logoAlt: "Flutter logo",
    title: "App Development",
    desc: "iOS and Android apps with refined product experiences.",
  },
  {
    logo: "https://cdn.simpleicons.org/google",
    logoAlt: "Google logo",
    title: "SEO",
    desc: "Technical SEO and content that compound traffic over time.",
  },
  {
    logo: "https://cdn.simpleicons.org/meta",
    logoAlt: "Meta logo",
    title: "Marketing",
    desc: "Performance campaigns wired to revenue, not vanity metrics.",
  },
  {
    logo: "https://cdn.simpleicons.org/instagram",
    logoAlt: "Instagram logo",
    title: "Social Media",
    desc: "Full-service social handling that builds brand authority.",
  },
];

function Hero() {
  return (
    <section className="relative overflow-hidden w-full h-full flex items-center">
      <div
        className="animate-hero-bg-slide-in pointer-events-none absolute inset-0 z-20 flex items-end justify-center"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 90%)"
        }}
      >
        <div
          className="absolute h-[min(58vh,560px)] w-[min(58vw,620px)] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--brand) 58%, transparent) 0%, color-mix(in srgb, var(--brand-accent) 30%, transparent) 42%, transparent 72%)",
          }}
        />
        {/* Abstract Fluid Particle Flow Background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: "url('/particle_bg.png')",
            maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
            WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
          }}
        />
        <img
          src="/homerobo.png"
          alt=""
          className="relative z-10 h-[min(92vh,860px)] w-auto max-w-none object-contain"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 90%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 90%)",
          }}
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

function ServicesPreview() {
  const servicesHeading = "Everything you need to grow online, under one roof.";
  const [typedServicesHeading, setTypedServicesHeading] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      if (rect.top < window.innerHeight * 0.8 && !hasStartedTyping) {
        setHasStartedTyping(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasStartedTyping]);

  useEffect(() => {
    if (!hasStartedTyping) return;

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedServicesHeading(servicesHeading.slice(0, index));
      if (index >= servicesHeading.length) {
        window.clearInterval(timer);
      }
    }, 25);

    return () => window.clearInterval(timer);
  }, [hasStartedTyping]);

  return (
    <section ref={sectionRef} id="home-services-section" className="relative w-full" style={{ minHeight: "100vh" }}>
      {/* Sticky container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden py-10">
        <div className="container-x w-full flex flex-col h-full justify-between">
          
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-6 pt-16">
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

          {/* Cards Area */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 my-auto w-full">
            {Array.from({ length: 4 }).map((_, idx) => {
              const rowOne = services.slice(0, 4);
              const rowTwo = services.slice(4, 8);
              const card1 = rowOne[idx];
              const card2 = rowTwo[idx];

              // Calculate transition for this specific column/index with a slight stagger
              const columnDelay = idx * 0.12;
              const t = Math.max(0, Math.min(1, (scrollProgress - 0.15 - columnDelay) / 0.55));

              return (
                <div key={idx} className="relative grid grid-cols-1 grid-rows-1">
                  {/* Card 1 */}
                  <div
                    className="col-start-1 row-start-1"
                    style={{
                      opacity: 1 - t,
                      transform: `translateY(${-t * 70}px) scale(${1 - t * 0.05})`,
                      pointerEvents: t > 0.8 ? "none" : "auto",
                      transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
                    }}
                  >
                    <div className="service-card-glass flex flex-col justify-between h-full w-full">
                      <div>
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 shadow-[0_8px_22px_-16px_rgba(24,0,173,0.55)]">
                          <img src={card1.logo} alt={card1.logoAlt} className="h-5 w-5 object-contain" loading="lazy" />
                        </span>
                        <h3 className="mt-5 text-lg font-semibold">{card1.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{card1.desc}</p>
                      </div>
                      <Link
                        to="/services"
                        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--brand)]"
                      >
                        Learn more <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div
                    className="col-start-1 row-start-1"
                    style={{
                      opacity: t,
                      transform: `translateY(${(1 - t) * 70}px) scale(${0.95 + t * 0.05})`,
                      pointerEvents: t < 0.2 ? "none" : "auto",
                      transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
                    }}
                  >
                    <div className="service-card-glass flex flex-col justify-between h-full w-full">
                      <div>
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 shadow-[0_8px_22px_-16px_rgba(24,0,173,0.55)]">
                          <img src={card2.logo} alt={card2.logoAlt} className="h-5 w-5 object-contain" loading="lazy" />
                        </span>
                        <h3 className="mt-5 text-lg font-semibold">{card2.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{card2.desc}</p>
                      </div>
                      <Link
                        to="/services"
                        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--brand)]"
                      >
                        Learn more <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Indicator */}
          <div className="w-full flex items-center justify-center gap-2 pb-6">
            <span className="text-[10px] font-mono tracking-widest text-[#7a7f82] uppercase">
              Scroll to reveal
            </span>
            <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[color:var(--brand)] transition-all duration-300"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Spacer for scroll volume */}
      <div style={{ height: "180vh" }} aria-hidden="true" />
    </section>
  );
}

function WhyChoose() {
  const whyChooseText = "A partner that treats your product like our own.";
  const [typedWhyChoose, setTypedWhyChoose] = useState("");
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedWhyChoose(whyChooseText.slice(0, index));
      if (index >= whyChooseText.length) {
        window.clearInterval(timer);
      }
    }, 42);

    return () => window.clearInterval(timer);
  }, [isVisible]);

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
    <section id="why-choose-section" className="section bg-[color:var(--color-surface)]">
      <div
        ref={ref}
        className={`container-x transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
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
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {items.map(({ logo, logoAlt, title, desc }) => (
              <div key={title} className="service-card-glass">
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
      src: "https://cdn.jsdelivr.gh/devicons/devicon/icons/css3/css3-original.svg",
      alt: "CSS3 logo",
    },
    {
      src: "https://cdn.jsdelivr.gh/devicons/devicon/icons/html5/html5-original.svg",
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

function FAQ() {
  const [showMoreFaqs, setShowMoreFaqs] = useState(false);
  const visibleFaqs = showMoreFaqs ? faqs.slice(0, 7) : faqs.slice(0, 4);

  return (
    <section id="home-faq-section" className="section">
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
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
              {visibleFaqs.map((f) => (
                <details key={f.q} className="group p-6">
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
  return (
    <SiteLayout>
      <InteractiveParticles />
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
