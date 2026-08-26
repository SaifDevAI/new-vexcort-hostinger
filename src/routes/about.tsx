import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowUpRight, Linkedin, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vexcort \u2014 Digital Agency, Team & Story" },
      { name: "description", content: "Vexcort is a modern digital solutions company building premium websites, apps and AI systems for ambitious brands. Meet the team behind the work." },
      { property: "og:title", content: "About Vexcort \u2014 Digital Agency, Team & Story" },
      { property: "og:description", content: "A focused, senior team building modern digital products, AI systems, and growth engines for ambitious brands worldwide." },
      { property: "og:image", content: "https://vexcort.com/textlogo.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "About Vexcort \u2014 Digital Agency, Team & Story" },
      { name: "twitter:description", content: "Meet the senior team at Vexcort building premium web, AI, and digital growth systems for ambitious brands." },
      { name: "twitter:image", content: "https://vexcort.com/textlogo.png" },
    ],
    links: [{ rel: "canonical", href: "https://vexcort.com/about" }],
  }),
  component: AboutPage,
});

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Team Data Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const team = [
  {
    name: "Saif",
    role: "Founder & CEO",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/msaifurrehman1",
    image: "/saif.png",
    philosophy: "We build products that outlive trends.",
    featured: true,
  },
  {
    name: "Hassan",
    role: "Co-Founder & AI Developer",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/hassanxabbasi",
    image: "/hassan.jpeg",
    philosophy: "Make code simple and intelligence accessible.",
    featured: false,
  },
  {
    name: "Umer",
    role: "AI/ML Developer",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/umer-ahmed-87ba72361",
    image: "/umer.jpeg",
    philosophy: "Volumetric models should be built to perform.",
    featured: false,
  },
  {
    name: "Husnain",
    role: "Web/App Developer",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/husnain-fazal-b0377b329",
    image: "/husnain.jpeg",
    philosophy: "Details matter. Craft clean user interfaces.",
    featured: false,
  },
  {
    name: "Fariz",
    role: "Business Development",
    location: "Lahore",
    linkedin: "https://www.linkedin.com/in/muhammad-fariz-04512234b",
    image: "/fariz.jpeg",
    philosophy: "True partnership is based on alignment.",
    featured: false,
  },
  {
    name: "Areeba",
    role: "UI/UX & SEO Expert",
    location: "Islamabad",
    linkedin: "#",
    image: "/areeba.jpeg",
    philosophy: "Design systems must be functional and gorgeous.",
    featured: false,
  },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Hooks Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold, rootMargin: "0px 0px -8% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const start = useCallback(() => setStarted(true), []);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      setCount(parseFloat(value.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration, decimals]);
  return { count, start };
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Sub-Components Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            background: i % 3 === 0
              ? "rgba(14,165,164,0.4)"
              : i % 3 === 1
              ? "rgba(24,0,173,0.3)"
              : "rgba(24,0,173,0.15)",
            left: `${5 + (i * 5.3) % 90}%`,
            top: `${10 + (i * 7.1) % 80}%`,
            animation: `particle-float ${4 + (i % 5)}s ease-in-out ${(i * 0.4) % 3}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

function AnimatedWord({ word, delay, className = "" }: { word: string; delay: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span
      className={`inline-block transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {word}
    </span>
  );
}

function SentenceReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.3);
  return (
    <div
      ref={ref}
      className={`transition-all duration-900 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        transitionDuration: "900ms",
      }}
    >
      {children}
    </div>
  );
}

function ScrollRevealSentence({ text, align = "left" }: { text: string; align?: "left" | "center" }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        rootMargin: "-42% 0px -42% 0px", // Trigger when the line is in the middle part of the screen
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={`font-display font-black leading-[1] tracking-tight transition-all duration-500 text-${align}`}
      style={{
        fontSize: "clamp(36px, 6vw, 88px)",
        color: isActive ? "#1800AD" : "rgba(15,23,42,0.15)",
        opacity: isActive ? 1 : 0.45,
        transform: isActive ? "scale(1.02)" : "scale(1)",
        transformOrigin: align === "center" ? "center center" : "left center",
      }}
    >
      {text}
    </p>
  );
}

function NeuralNetwork() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="nodeGrad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0EA5A4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1800AD" stopOpacity="0.4" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Connections */}
      {[
        [60,80,160,60],[60,80,160,140],[60,80,160,220],
        [160,60,260,80],[160,60,260,180],
        [160,140,260,80],[160,140,260,180],[160,140,260,240],
        [160,220,260,180],[160,220,260,240],
        [260,80,340,150],[260,180,340,150],[260,240,340,150],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="url(#nodeGrad1)" strokeWidth="1"
          strokeOpacity="0.5"
          style={{ animation: `line-pulse ${2+i*0.3}s ease-in-out ${i*0.15}s infinite` }}
        />
      ))}
      {/* Nodes */}
      {[
        [60,80],[160,60],[160,140],[160,220],
        [260,80],[260,180],[260,240],[340,150],
      ].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="10" fill="url(#nodeGrad1)" filter="url(#glow)"
            style={{ animation: `node-pulse ${2.5+i*0.2}s ease-in-out ${i*0.25}s infinite` }}
          />
          <circle cx={cx} cy={cy} r="4" fill="#1800AD" fillOpacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Main Component Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // Hero word animation timings
  const [heroPhase, setHeroPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setHeroPhase(1), 100),
      setTimeout(() => setHeroPhase(2), 600),
      setTimeout(() => setHeroPhase(3), 1100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Mouse parallax on hero
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(${mousePos.current.x * 30}px, ${mousePos.current.y * 20}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${mousePos.current.x * -20}px, ${mousePos.current.y * -15}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Intersection reveals
  const problemReveal = useInView(0.05);
  const missionReveal = useInView(0.1);
  const servicesReveal = useInView(0.1);
  const processReveal = useInView(0.1);
  const statsReveal = useInView(0.2);
  const teamReveal = useInView(0.1);
  const comparisonReveal = useInView(0.1);
  const futureReveal = useInView(0.2);

  // Counters
  const c1 = useCounter(20, 1800);
  const c2 = useCounter(80, 1600);
  const c3 = useCounter(4.9, 1400, 1);
  const c4 = useCounter(2, 1200);

  useEffect(() => {
    if (statsReveal.inView) { c1.start(); c2.start(); c3.start(); c4.start(); }
  }, [statsReveal.inView]);

  // Team hover
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  // Process step active tracking
  const processStepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(-1);
  useEffect(() => {
    if (!processReveal.inView) return;
    const observers = processStepRefs.current.map((el, idx) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setActiveStep(idx);
      }, { threshold: 0.6, rootMargin: "-30% 0px -30% 0px" });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [processReveal.inView]);

  const processSteps = [
    { num: "01", title: "Discover", desc: "We map your goals, tech stack, and growth vision in a focused strategy session. Zero jargon." },
    { num: "02", title: "Design", desc: "High-fidelity UI prototypes with conversion-centric UX, built for real human behavior." },
    { num: "03", title: "Build", desc: "Lean sprints. Type-safe code. Weekly visual builds. You see progress every single week." },
    { num: "04", title: "Launch", desc: "Performance audits, production-grade infrastructure, and a pre-launch checklist perfected." },
    { num: "05", title: "Scale", desc: "AI workflows, technical SEO, and analytics pipelines continuously compounding your growth." },
  ];

  return (
    <SiteLayout>
      <style>{`
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Particles Ã¢â€â‚¬Ã¢â€â‚¬ */
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
          33% { transform: translateY(-18px) translateX(6px); opacity: 1; }
          66% { transform: translateY(-8px) translateX(-8px); opacity: 0.8; }
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Neural Ã¢â€â‚¬Ã¢â€â‚¬ */
        @keyframes node-pulse {
          0%, 100% { r: 10; opacity: 0.8; }
          50% { r: 13; opacity: 1; }
        }
        @keyframes line-pulse {
          0%, 100% { stroke-opacity: 0.2; }
          50% { stroke-opacity: 0.6; }
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Gradient border Ã¢â€â‚¬Ã¢â€â‚¬ */
        @keyframes gradient-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Glow pulse Ã¢â€â‚¬Ã¢â€â‚¬ */
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Float Ã¢â€â‚¬Ã¢â€â‚¬ */
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Shimmer Ã¢â€â‚¬Ã¢â€â‚¬ */
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Line draw Ã¢â€â‚¬Ã¢â€â‚¬ */
        @keyframes line-draw {
          from { height: 0; }
          to { height: 100%; }
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Scale in Ã¢â€â‚¬Ã¢â€â‚¬ */
        @keyframes scale-in {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Blob slow move Ã¢â€â‚¬Ã¢â€â‚¬ */
        @keyframes blob-move-1 {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes blob-move-2 {
          0%, 100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
          50% { border-radius: 60% 40% 30% 70% / 40% 60% 30% 70%; }
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Hero text Ã¢â€â‚¬Ã¢â€â‚¬ */
        .hero-line {
          display: block;
          overflow: hidden;
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Service image float Ã¢â€â‚¬Ã¢â€â‚¬ */
        .service-img-float { animation: float-gentle 5s ease-in-out infinite; }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Process line Ã¢â€â‚¬Ã¢â€â‚¬ */
        .process-line-fill {
          animation: line-draw 1.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Gradient border CTA Ã¢â€â‚¬Ã¢â€â‚¬ */
        .cta-gradient-border {
          background: linear-gradient(135deg, #1E3A8A, #1800AD, #0EA5A4, #1800AD, #1E3A8A);
          background-size: 300% 300%;
          animation: gradient-rotate 4s ease infinite;
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Stat glow Ã¢â€â‚¬Ã¢â€â‚¬ */
        .stat-glow { animation: glow-pulse 3s ease-in-out infinite; }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Hover shimmer Ã¢â€â‚¬Ã¢â€â‚¬ */
        .portrait-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: none;
        }
        .portrait-shimmer:hover::after {
          animation: shimmer-slide 0.6s ease forwards;
        }
        /* Ã¢â€â‚¬Ã¢â€â‚¬ Scrollbar Ã¢â€â‚¬Ã¢â€â‚¬ */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(24,0,173,0.3); border-radius: 2px; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
          CHAPTER 1 Ã¢â‚¬â€ CINEMATIC HERO
      Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section
        ref={heroRef}
        className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12"
        style={{
          background: "linear-gradient(160deg, #FFFFFF 0%, #F5F7FF 40%, #EBF0FF 100%)",
        }}
        aria-label="Hero section"
      >
        {/* Background blobs with parallax */}
        <div
          ref={blob1Ref}
          className="pointer-events-none absolute"
          style={{
            width: "700px",
            height: "700px",
            top: "-10%",
            right: "-5%",
            background: "radial-gradient(circle, rgba(14,165,164,0.18) 0%, rgba(24,0,173,0.12) 50%, transparent 70%)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            animation: "blob-move-1 12s ease-in-out infinite",
            transition: "transform 0.1s ease-out, opacity 1.8s ease-out, scale 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: "blur(40px)",
            opacity: heroPhase >= 1 ? 1 : 0,
            scale: heroPhase >= 1 ? 1 : 0.4,
          }}
          aria-hidden
        />
        <div
          ref={blob2Ref}
          className="pointer-events-none absolute"
          style={{
            width: "600px",
            height: "600px",
            bottom: "-10%",
            left: "-5%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(14,165,164,0.08) 50%, transparent 70%)",
            borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%",
            animation: "blob-move-2 15s ease-in-out infinite",
            transition: "transform 0.1s ease-out, opacity 1.8s ease-out, scale 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: "blur(50px)",
            opacity: heroPhase >= 1 ? 1 : 0,
            scale: heroPhase >= 1 ? 1 : 0.4,
          }}
          aria-hidden
        />

        <FloatingParticles />

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(24,0,173,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(24,0,173,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
          aria-hidden
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="font-display font-black text-slate-900 leading-[0.95] tracking-[-0.04em]" aria-label="We don't build websites. We build companies. Powered by AI.">
            <span
              className="block"
              style={{
                fontSize: "clamp(48px, 9vw, 130px)",
                opacity: heroPhase >= 1 ? 1 : 0,
                transform: heroPhase >= 1 ? "translateY(0)" : "translateY(40px)",
                transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              we don't build
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(90px, 18vw, 240px)",
                fontFamily: '"Wistania", sans-serif',
                background: "linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                opacity: heroPhase >= 2 ? 1 : 0,
                transform: heroPhase >= 2 ? "translateY(0)" : "translateY(40px)",
                transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
                fontWeight: "normal",
                lineHeight: "0.9",
                marginTop: "-20px",
                marginBottom: "-60px",
              }}
            >
              websites.
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(40px, 7.5vw, 110px)",
                color: "#0A0E22",
                opacity: heroPhase >= 3 ? 1 : 0,
                transform: heroPhase >= 3 ? "translateY(0)" : "translateY(40px)",
                transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              we build <span className="relative inline-block" style={{ color: "#0EA5A4", fontFamily: '"Wistania", sans-serif', fontSize: "clamp(64px, 12vw, 160px)", fontWeight: "bold", transform: "translateY(12px)" }}>
                companies.
                <svg
                  className="absolute left-0 bottom-[-4px] w-full h-[12px]"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  style={{ overflow: "visible" }}
                >
                  <path
                    d="M0,5 Q50,9 100,5"
                    fill="none"
                    stroke="#0EA5A4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 100,
                      strokeDashoffset: heroPhase >= 3 ? 0 : 100,
                      transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.5s",
                    }}
                  />
                </svg>
              </span>
            </span>
          </h1>




        </div>
      </section>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
          CHAPTER 2 Ã¢â‚¬â€ THE PROBLEM
      Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section
        ref={problemReveal.ref}
        className="relative py-32 md:py-48 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F5F7FF 100%)" }}
        aria-label="The problem"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(14,165,164,0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(24,0,173,0.08) 0%, transparent 50%)",
          }}
          aria-hidden
        />

        <div className="container-x relative z-10">
          <SentenceReveal className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#0EA5A4" }}>The Challenge</span>
          </SentenceReveal>

          <div className="space-y-6 md:space-y-8">
            {[
              { text: "Agencies move slowly.", highlight: false },
              { text: "Freelancers disappear.", highlight: false },
              { text: "Junior devs ship broken code.", highlight: false },
              { text: "Projects become expensive.", highlight: false },
              { text: "Growth stalls.", highlight: false },
            ].map((item, i) => (
              <SentenceReveal key={i} delay={i * 120}>
                <ScrollRevealSentence text={item.text} />
              </SentenceReveal>
            ))}
          </div>

          <SentenceReveal delay={700} className="mt-16 md:mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-12" style={{ background: "rgba(14,165,164,0.4)" }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: "#0EA5A4" }}>Until now</span>
            </div>
            <p
              className="font-display font-black leading-[1.02] tracking-tight"
              style={{
                fontSize: "clamp(42px, 7vw, 100px)",
                background: "linear-gradient(135deg, #1800AD 0%, #6366f1 40%, #0EA5A4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Vexcort changes that.
            </p>
          </SentenceReveal>
        </div>
      </section>



      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
          CHAPTER 4 Ã¢â‚¬â€ WHAT WE BUILD (BENTO GRID)
      Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section
        ref={servicesReveal.ref}
        className="relative overflow-hidden bg-slate-50/50 py-24 md:py-36 border-y border-slate-100"
        aria-label="What we build"
      >
        <div className="container-x">
          {/* Header grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-9">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1800AD]">Capabilities</span>
              <h2 className="font-display font-black text-slate-900 mt-4 leading-[1.05] tracking-tight text-[clamp(32px,5.2vw,76px)]">
                we build tools that <span className="font-light text-[#1800AD] font-sans italic">dominate</span> markets.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-5 leading-relaxed">
                We design and engineer bespoke web platforms, deploy intelligent autonomous AI systems, and script hyper-optimized search systems that turn cold traffic into compounding revenue.
              </p>
            </div>
            <div className="lg:col-span-3 lg:text-right pt-6 lg:pt-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-slate-950 text-white px-6 py-3.5 text-sm font-semibold transition-all hover:bg-slate-800 hover:shadow-lg"
              >
                Book Discovery <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid md:grid-cols-12 gap-6 items-stretch">
            {/* Left large card */}
            <div
              className="md:col-span-4 relative rounded-[2rem] overflow-hidden bg-white border border-slate-200/50 flex flex-col justify-end p-8 min-h-[460px] group shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img
                src="/web_dev_showcase.png"
                alt="Vexcort Web Development Portfolio"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="relative z-10 text-white">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold hover:bg-white hover:text-slate-900 transition-all"
                >
                  Explore Engineering <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <h3 className="text-xl sm:text-2xl font-black mt-4 leading-snug">
                  High-Performance Web: Platforms engineered for absolute velocity, retention, and conversion.
                </h3>
              </div>
            </div>

            {/* Center column */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Product spotlight center card */}
              <div
                className="relative rounded-[2rem] overflow-hidden bg-white border border-slate-200/50 p-8 flex-1 flex flex-col justify-end min-h-[220px] group shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src="/ai_auto_showcase.png"
                  alt="AI Automation"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-950/35 group-hover:bg-slate-950/50 transition-colors duration-500" />
                <div className="relative z-10 text-white">
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0EA5A4] bg-[#0EA5A4]/10 rounded px-2.5 py-1 mb-3">AI Automation</span>
                    <h3 className="text-xl sm:text-2xl font-black leading-snug mb-4">
                      AI Workflow Automations: Replace human bottlenecks with 24/7 digital labor pipelines.
                    </h3>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-950 px-4 py-2 text-xs font-semibold hover:scale-105 transition-all"
                    >
                      Deploy AI Workflows <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="md:col-span-3 flex flex-col gap-6">
              {/* Right small card 1 */}
              <div
                className="relative rounded-[2rem] overflow-hidden bg-[#F4F6FF] border border-[#1800AD]/10 p-7 min-h-[220px] flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src="/app_dev_showcase.png"
                  alt="Vexcort App Development — iOS and Android"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-white/40 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#1800AD]">App Development</span>
                    <h4 className="text-lg font-black text-slate-900 mt-3 leading-snug" style={{ letterSpacing: "-0.01em" }}>
                      Bespoke iOS & Android environments tailored to scale.
                    </h4>
                  </div>
                  <Link
                    to="/services"
                    className="self-start inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-slate-900 hover:text-white text-slate-950 px-4 py-2 text-xs font-bold transition-all shadow-sm border border-slate-200/50 mt-6"
                  >
                    Details <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Stats bento block */}
              <div
                className="rounded-[2rem] border border-slate-200/50 bg-slate-50/50 p-6 flex flex-col justify-center min-h-[160px] shadow-sm"
              >
                <span className="text-3xl font-black text-slate-900 leading-none">0.8s</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1.5">Average Load Speed</span>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  Engineered with strict code splitting to guarantee instant content delivery and minimize bounce rates.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom row: Heading text & twin product grids */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch mt-16 pt-16 border-t border-slate-200/60">
            {/* Left title card */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-4">
              <h2 className="font-display font-black text-slate-900 leading-[1.05] tracking-tight text-[clamp(28px,4.5vw,52px)]">
                traffic is vanity. conversions are sanity.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Build high-intent organic search pipelines combined with high-fidelity customer experiences that turn visitors into pipeline revenue.
              </p>
              <Link
                to="/services"
                className="self-start inline-flex items-center gap-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white px-6 py-3.5 text-sm font-semibold transition-all"
              >
                Explore Services <span className="translate-x-0.5">&rarr;</span>
              </Link>
            </div>

            {/* Middle product grid card */}
            <div
              className="lg:col-span-4 relative rounded-[2rem] overflow-hidden bg-white border border-slate-200/50 flex flex-col justify-end p-8 min-h-[380px] group shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img
                src="/growth_sys_showcase.png"
                alt="Growth Systems"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="relative z-10 flex flex-col gap-3">
                <Link
                  to="/services"
                  className="self-start inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white hover:text-slate-900 transition-all"
                >
                  See Details <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <div className="flex gap-2 mt-4 text-[10px] font-bold text-white/70 uppercase">
                  <span>#SearchSystems</span>
                  <span>#DemandGen</span>
                </div>
              </div>
            </div>

            {/* Right product grid card */}
            <div
              className="lg:col-span-4 relative rounded-[2rem] overflow-hidden bg-white border border-slate-200/50 flex flex-col justify-end p-8 min-h-[380px] group shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img
                src="/web_dev_showcase.png"
                alt="Vexcort Web Development Services"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="relative z-10 flex flex-col gap-3">
                <Link
                  to="/services"
                  className="self-start inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white hover:text-slate-900 transition-all"
                >
                  See Details <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <div className="flex gap-2 mt-4 text-[10px] font-bold text-white/70 uppercase">
                  <span>#CoreWebVitals</span>
                  <span>#UXEngineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
          CHAPTER 5 Ã¢â‚¬â€ OUR PROCESS
      Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section
        ref={processReveal.ref}
        className="relative py-32 md:py-48 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F5F7FF 100%)" }}
        aria-label="Our process"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(24,0,173,0.08) 0%, transparent 60%)" }}
          aria-hidden
        />

        <div className="container-x relative z-10">
          <div className="max-w-4xl mx-auto">
            <SentenceReveal>
              <div className="text-center mb-20">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#0EA5A4" }}>How We Work</span>
                <h2
                  className="font-display font-black text-white mt-3 leading-[1.02] tracking-tight"
                  style={{ fontSize: "clamp(36px, 5vw, 70px)" }}
                >
                  Zero to scale.
                </h2>
              </div>
            </SentenceReveal>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
                style={{
                  background: "rgba(24,0,173,0.08)",
                  transform: "md:translateX(-50%)",
                }}
                aria-hidden
              >
                {processReveal.inView && (
                  <div
                    className="w-full process-line-fill"
                    style={{
                      background: "linear-gradient(180deg, #1800AD 0%, #0EA5A4 100%)",
                      boxShadow: "0 0 12px rgba(14,165,164,0.4)",
                    }}
                  />
                )}
              </div>

              <div className="space-y-0">
                {processSteps.map((step, i) => (
                  <div
                    key={step.num}
                    ref={el => { processStepRefs.current[i] = el; }}
                    className="relative grid md:grid-cols-2 gap-8 md:gap-16 py-12 md:py-16"
                  >
                    {/* Step number dot */}
                    <div
                      className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full transition-all duration-500"
                      style={{
                        background: activeStep >= i ? "linear-gradient(135deg, #1800AD, #0EA5A4)" : "rgba(24,0,173,0.2)",
                        boxShadow: activeStep === i ? "0 0 20px rgba(14,165,164,0.6)" : "none",
                        transform: "md:-translate-x-1/2 -translate-y-1/2",
                      }}
                      aria-hidden
                    />

                    {/* Left Ã¢â‚¬â€ number (desktop only) */}
                    <div className={`hidden md:flex items-center ${i % 2 === 0 ? "justify-end" : "justify-start md:order-2"}`}>
                      <div
                        className="transition-all duration-700"
                        style={{
                          opacity: activeStep >= i ? 1 : 0.25,
                          transform: activeStep >= i ? "translateX(0)" : i % 2 === 0 ? "translateX(20px)" : "translateX(-20px)",
                        }}
                      >
                        <span
                          className="font-display font-black"
                          style={{
                            fontSize: "clamp(60px, 8vw, 120px)",
                            color: activeStep === i ? "transparent" : "rgba(24,0,173,0.08)",
                            background: activeStep === i ? "linear-gradient(135deg, #1800AD, #0EA5A4)" : "none",
                            WebkitBackgroundClip: activeStep === i ? "text" : "unset",
                            backgroundClip: activeStep === i ? "text" : "unset",
                            lineHeight: 1,
                          }}
                        >
                          {step.num}
                        </span>
                      </div>
                    </div>

                    {/* Right Ã¢â‚¬â€ content */}
                    <div
                      className={`pl-16 md:pl-0 transition-all duration-700 ${i % 2 === 0 ? "" : "md:order-1"}`}
                      style={{
                        opacity: activeStep >= i ? 1 : 0.3,
                        transform: activeStep >= i ? "translateY(0)" : "translateY(16px)",
                      }}
                    >
                      <div className="md:hidden font-mono font-black text-lg mb-2" style={{ color: "rgba(14,165,164,0.6)" }}>{step.num}</div>
                      <h3
                        className="font-display font-black text-slate-900 leading-tight transition-all duration-500"
                        style={{ fontSize: activeStep === i ? "clamp(28px, 3.5vw, 48px)" : "clamp(22px, 2.5vw, 36px)" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-slate-500 leading-relaxed mt-3"
                        style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
          CHAPTER 6 Ã¢â‚¬â€ RESULTS
      Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section
        ref={statsReveal.ref}
        className="relative py-32 md:py-48 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F5F7FF 50%, #EBF0FF 100%)" }}
        aria-label="Impact results"
      >
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="stat-glow absolute rounded-full"
            style={{
              width: "600px", height: "600px",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(14,165,164,0.07) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="stat-glow absolute rounded-full"
            style={{
              width: "400px", height: "400px",
              top: "20%", left: "20%",
              background: "radial-gradient(circle, rgba(24,0,173,0.06) 0%, transparent 70%)",
              filter: "blur(60px)",
              animationDelay: "1.5s",
            }}
          />
        </div>

        <div className="container-x relative z-10">
          <SentenceReveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest mb-20" style={{ color: "#0EA5A4" }}>Impact</p>
          </SentenceReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
            {[
              { count: c1.count, suffix: "+", label: "Businesses Automated", decimals: 0 },
              { count: c2.count, suffix: "+", label: "Projects Delivered", decimals: 0 },
              { count: c3.count, suffix: "\u2605", label: "Client Rating", decimals: 1 },
            ].map((stat, i) => (
              <SentenceReveal key={i} delay={i * 120}>
                <div className="text-center">
                  <p
                    className="font-display font-black leading-none tracking-tight"
                    style={{
                      fontSize: "clamp(56px, 8vw, 110px)",
                      background: "linear-gradient(135deg, #1800AD 0%, rgba(14,165,164,0.8) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {stat.decimals > 0 ? stat.count.toFixed(stat.decimals) : Math.floor(stat.count)}{stat.suffix}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#1800AD]">{stat.label}</p>
                </div>
              </SentenceReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
          CHAPTER 7 Ã¢â‚¬â€ MEET THE TEAM
      Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section
        ref={teamReveal.ref}
        className="relative py-32 md:py-48 overflow-hidden bg-white"
        aria-label="Meet the team"
      >
        <div className="container-x relative z-10">
          <SentenceReveal>
            <div className="mb-16 md:mb-24">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#1800AD" }}>The Team</span>
              <h2
                className="font-display font-black text-slate-900 mt-3 leading-[1.02] tracking-tight"
                style={{ fontSize: "clamp(36px, 5vw, 70px)" }}
              >
                People you'll actually
                <br />
                <span style={{ color: "#1800AD" }}>work with.</span>
              </h2>
              <p className="mt-4 text-slate-500 text-lg max-w-lg">
                No account managers. No delegation. Direct access to the specialists building your product.
              </p>
            </div>
          </SentenceReveal>

          {/* Editorial portrait grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, i) => {
              const isHovered = hoveredMember === i;

              return (
                <SentenceReveal key={member.name} delay={i * 80}>
                  <div
                    className="portrait-shimmer relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer aspect-[3/4] w-full"
                    onMouseEnter={() => setHoveredMember(i)}
                    onMouseLeave={() => setHoveredMember(null)}
                    style={{
                      transform: isHovered ? "scale(1.02)" : "scale(1)",
                      transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                      boxShadow: isHovered
                        ? "0 32px 64px -16px rgba(24,0,173,0.3)"
                        : "0 8px 24px -8px rgba(0,0,0,0.12)",
                    }}
                  >
                    {/* Portrait image */}
                    <img
                      src={member.image}
                      alt={`${member.name} — ${member.role} at Vexcort`}
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        transition: "filter 0.6s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                      }}
                      loading="lazy"
                    />

                    {/* Gradient overlay always */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isHovered
                          ? "linear-gradient(180deg, transparent 30%, rgba(4,6,26,0.92) 100%)"
                          : "linear-gradient(180deg, transparent 40%, rgba(4,6,26,0.7) 100%)",
                        transition: "background 0.5s ease",
                      }}
                      aria-hidden
                    />

                    {/* Name always visible */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-5"
                      style={{
                        transform: isHovered ? "translateY(0)" : "translateY(0)",
                      }}
                    >
                      <p className="font-display font-black text-white text-lg md:text-xl leading-tight">{member.name}</p>
                      <p
                        className="text-xs font-medium mt-0.5 transition-all duration-500"
                        style={{ color: "#0EA5A4", opacity: isHovered ? 1 : 0.7 }}
                      >
                        {member.role}
                      </p>

                      {/* Expanded info on hover */}
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{ maxHeight: isHovered ? "120px" : "0px", opacity: isHovered ? 1 : 0 }}
                      >
                        <p className="text-white/60 text-xs leading-relaxed mt-2 italic">"{member.philosophy}"</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-white/40 text-xs">{member.location}</span>
                          {member.linkedin !== "#" && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                              style={{ color: "#5b9bd5" }}
                              onClick={e => e.stopPropagation()}
                            >
                              <Linkedin className="h-3 w-3" />
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SentenceReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
          CHAPTER 8 Ã¢â‚¬â€ WHY CLIENTS STAY
      Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}


      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
          CHAPTER 9 Ã¢â‚¬â€ THE FUTURE
      Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section
        ref={futureReveal.ref}
        className="relative py-32 md:py-48 overflow-hidden bg-white"
        aria-label="The future"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 80%, rgba(14,165,164,0.07) 0%, transparent 60%)",
          }}
          aria-hidden
        />

        <div className="container-x relative z-10 text-center max-w-5xl mx-auto">
          <SentenceReveal>
            <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: "#1800AD" }}>The Future</p>
            <div className="space-y-4 md:space-y-6">
              <ScrollRevealSentence text="The future belongs to" align="center" />
              <ScrollRevealSentence text="companies that" align="center" />
              <p
                className="font-display font-black leading-[1] tracking-tight transition-all duration-500 text-center"
                style={{
                  fontSize: "clamp(32px, 5.5vw, 88px)",
                  background: "linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  transformOrigin: "center center",
                }}
              >
                build faster & scale.
              </p>
            </div>
          </SentenceReveal>

          <SentenceReveal delay={300}>
            <p 
              className="mt-12 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-semibold text-slate-600"
              style={{
                letterSpacing: "-0.015em",
              }}
            >
              The companies delivering{" "}
              <span 
                className="italic font-normal text-[#1800AD]"
                style={{ 
                  fontFamily: '"Wistania", sans-serif',
                  fontSize: "1.25em",
                  borderBottom: "1.5px solid rgba(24,0,173,0.25)",
                  paddingBottom: "2px",
                  display: "inline-block"
                }}
              >
                high-fidelity quality
              </span>{" "}
              at startup velocity will lead the next decade of business.
            </p>
          </SentenceReveal>
        </div>
      </section>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
          FINAL CTA Ã¢â‚¬â€ THE DESTINATION
      Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section
        className="relative py-24 md:py-36 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #F8F9FF 100%)" }}
        aria-label="Call to action"
      >
        <div className="container-x relative z-10">
          <div className="relative max-w-4xl mx-auto">
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{ 
                padding: "1px",
                background: "linear-gradient(135deg, rgba(24,0,173,0.2) 0%, rgba(14,165,164,0.2) 100%)",
                boxShadow: "0 30px 60px -15px rgba(24,0,173,0.12), 0 12px 30px -10px rgba(14,165,164,0.08)",
              }}
              aria-hidden
            >
              <div className="absolute inset-0 rounded-3xl" style={{ background: "white" }} />
            </div>

            <div
              className="relative rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(24,0,173,0.08)",
              }}
            >
              {/* Glow behind */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ 
                  background: "radial-gradient(circle at 50% 100%, rgba(24,0,173,0.06) 0%, rgba(14,165,164,0.04) 50%, transparent 80%)",
                }}
                aria-hidden
              />

              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#0EA5A4" }}>Let's Build</p>
                <h2
                  className="font-display font-black text-slate-900 leading-[1.02] tracking-tight"
                  style={{ fontSize: "clamp(36px, 5.5vw, 76px)" }}
                >
                  Let's build something
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    incredible.
                  </span>
                </h2>
                <p className="mt-6 text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
                  Get in touch with us today. We'll map the fastest path from where you are today to a measurably better digital product.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white overflow-hidden transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #1800AD, #0EA5A4)",
                      boxShadow: "0 12px 40px -8px rgba(24,0,173,0.45)",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px -8px rgba(14,165,164,0.55)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px -8px rgba(24,0,173,0.45)"; }}
                  >
                    Contact Us
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold transition-all duration-300"
                    style={{ borderColor: "rgba(24,0,173,0.2)", color: "#1800AD", background: "rgba(24,0,173,0.03)" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(24,0,173,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(24,0,173,0.4)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(24,0,173,0.03)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(24,0,173,0.2)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    Explore Services <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
