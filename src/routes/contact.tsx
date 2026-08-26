import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Mail,
  MessageCircle,
  Send,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Globe,
  ShieldCheck,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Phone,
  Zap,
  Facebook,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Vexcort \u2014 Book a Meeting or Get a Quote" },
      { name: "description", content: "Get in touch with the Vexcort team. Book a meeting, send a project brief, or ask a question about our web development, AI automation, or digital marketing services." },
      { property: "og:title", content: "Contact Vexcort \u2014 Book a Meeting or Get a Quote" },
      { property: "og:description", content: "Start a project, book a free consultation, or ask a question. The Vexcort team is ready to help you design, build, and scale your digital presence." },
      { property: "og:image", content: "https://vexcort.com/textlogo.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contact Vexcort \u2014 Book a Meeting or Get a Quote" },
      { name: "twitter:description", content: "Start a project, book a free consultation, or ask a question. The Vexcort team is ready to help." },
      { name: "twitter:image", content: "https://vexcort.com/textlogo.png" },
    ],
    links: [{ rel: "canonical", href: "https://vexcort.com/contact" }],
  }),
  component: ContactPage,
});

const serviceOptions = [
  "Web Development",
  "Web Design",
  "AI Automation",
  "Web Chatbots",
  "Voice Bots",
  "App Development",
  "SEO",
  "Marketing",
  "Social Media",
];
const budgetOptions = ["< $2k", "$2k - $5k", "$5k - $15k", "$15k - $50k", "$50k+"];

const trustItems = [
  { icon: Clock, label: "1-day response" },
  { icon: Globe, label: "Remote-friendly" },
  { icon: ShieldCheck, label: "NDA available" },
  { icon: Zap, label: "Start in 7 days" },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Floating Particles (reused from About page pattern) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background:
              i % 3 === 0
                ? "rgba(14,165,164,0.5)"
                : i % 3 === 1
                ? "rgba(24,0,173,0.4)"
                : "rgba(24,0,173,0.18)",
            left: `${5 + (i * 6.7) % 90}%`,
            top: `${10 + (i * 7.3) % 80}%`,
            animation: `particle-float ${4 + (i % 5)}s ease-in-out ${(i * 0.5) % 3}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Typewriter effect component for the header Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function TypewriterHeading() {
  const fullText = "tell us about your project.";
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Split into components to color highlight the word "about" specifically
  const parts = text.split(" ");
  return (
    <h1
      className="mt-5 font-display font-black leading-[0.95] tracking-[-0.04em] lowercase"
      style={{ fontSize: "clamp(40px, 7vw, 96px)", color: "#0B1324" }}
    >
      {parts.map((word, idx) => {
        const isAbout = word.toLowerCase().includes("about");
        return (
          <span key={idx} className="inline-block mr-4">
            {isAbout ? (
              <span
                style={{
                  background: "linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {word}
              </span>
            ) : (
              word
            )}
          </span>
        );
      })}
      <span className="inline-block w-[3px] h-[0.8em] bg-[color:var(--brand)] animate-pulse ml-1 align-middle" />
    </h1>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Animated word reveal (same pattern as About hero) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {word}
    </span>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Scroll-reveal wrapper Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Premium Input Field Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[11px] font-bold uppercase tracking-[0.16em]"
        style={{ color: focused ? "#1800AD" : "rgba(11,19,36,0.55)" }}
      >
        {label}
        {required && <span style={{ color: "#0EA5A4" }}> *</span>}
      </label>
      <div className="relative mt-2">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
          style={{
            background: focused ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
            border: focused ? "1.5px solid rgba(24,0,173,0.55)" : "1.5px solid rgba(24,0,173,0.14)",
            boxShadow: focused
              ? "0 0 0 4px rgba(24,0,173,0.08), 0 4px 14px -6px rgba(24,0,173,0.18)"
              : "0 2px 8px -4px rgba(24,0,173,0.08)",
            color: "#0B1324",
          }}
        />
        {focused && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(24,0,173,0.03), rgba(14,165,164,0.03))",
            }}
          />
        )}
      </div>
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Main Page Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Web Development");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [focusedTextarea, setFocusedTextarea] = useState(false);
  const [heroPhase, setHeroPhase] = useState(0);
  const [inquiryType, setInquiryType] = useState<string>("Get Service");

  useEffect(() => {
    const t1 = setTimeout(() => setHeroPhase(1), 80);
    const t2 = setTimeout(() => setHeroPhase(2), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <SiteLayout>
      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Keyframes Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.7; }
          33% { transform: translateY(-14px) translateX(6px); opacity: 1; }
          66% { transform: translateY(-6px) translateX(-8px); opacity: 0.6; }
        }
        @keyframes contact-blob-1 {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg); }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(8deg); }
        }
        @keyframes contact-blob-2 {
          0%, 100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; transform: rotate(0deg); }
          50% { border-radius: 60% 40% 40% 60% / 30% 60% 40% 70%; transform: rotate(-6deg); }
        }
        @keyframes shimmer-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />

      <div className="font-sans bg-[#F8F9FF]">
        {/* Ã¢â€â‚¬Ã¢â€â‚¬ HERO SECTION Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #FFFFFF 0%, #F4F6FF 50%, #EBF0FF 100%)",
            paddingTop: "100px",
            paddingBottom: "32px",
          }}
        >
          {/* Blobs */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: "520px", height: "520px",
              top: "-12%", right: "-6%",
              background: "radial-gradient(circle, rgba(14,165,164,0.18) 0%, rgba(24,0,173,0.12) 50%, transparent 70%)",
              animation: "contact-blob-1 14s ease-in-out infinite",
              filter: "blur(50px)",
              opacity: heroPhase >= 1 ? 1 : 0,
              transition: "opacity 1.6s ease-out",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute"
            style={{
              width: "420px", height: "420px",
              bottom: "-8%", left: "-4%",
              background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(14,165,164,0.08) 50%, transparent 70%)",
              animation: "contact-blob-2 18s ease-in-out infinite",
              filter: "blur(60px)",
              opacity: heroPhase >= 1 ? 1 : 0,
              transition: "opacity 1.8s ease-out",
            }}
            aria-hidden
          />

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

          <FloatingParticles />

          <div className="container-x relative z-10">
            {/* Headline */}
            <TypewriterHeading />

            {/* Sub text */}
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed"
              style={{
                color: "rgba(11,19,36,0.58)",
                opacity: heroPhase >= 2 ? 1 : 0,
                transform: heroPhase >= 2 ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s",
              }}
            >
              Share a few details and we'll get back within one business day with next steps,
              a rough estimate or a link to book a discovery call.
            </p>

          </div>
        </section>

        {/* Ã¢â€â‚¬Ã¢â€â‚¬ FORM + SIDEBAR Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <section className="py-8 container-x">
          <div className="grid gap-8 lg:grid-cols-12">

            {/* Ã¢â€â‚¬ FORM CARD Ã¢â€â‚¬ */}
            <FadeUp delay={0} className="lg:col-span-8">
              <div
                className="relative overflow-hidden rounded-[2rem] bg-white grid md:grid-cols-12"
                style={{
                  border: "1px solid rgba(24,0,173,0.12)",
                  boxShadow: "0 32px 72px -20px rgba(24,0,173,0.18), 0 12px 32px -16px rgba(14,165,164,0.12)",
                }}
              >
                {/* Left Inner Sidebar: Category Selectors */}
                <div 
                  className="md:col-span-4 p-8 md:p-10 flex flex-col justify-start border-b md:border-b-0 md:border-r gap-8"
                  style={{
                    background: "linear-gradient(135deg, rgba(24,0,173,0.02) 0%, rgba(14,165,164,0.02) 100%)",
                    borderColor: "rgba(24,0,173,0.08)"
                  }}
                >
                  <div>
                    <span 
                      className="inline-block px-3.5 py-1.5 text-xs font-bold rounded-full mb-6"
                      style={{
                        background: "rgba(24,0,173,0.06)",
                        color: "#1800AD",
                        border: "1px solid rgba(24,0,173,0.12)"
                      }}
                    >
                      Inquire Now
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">
                      forge a <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1800AD] to-[#0EA5A4]">connection</span>
                    </h3>
                    <p className="mt-3 text-[11px] font-semibold leading-relaxed text-slate-500">
                      Select your inquiry type to customize the brief layout.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Get Service",
                      "Outsourcing"
                    ].map((type) => {
                      const isSelected = inquiryType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setInquiryType(type);
                            // Clear budget validation message when type changes
                          }}
                          className="w-full text-left px-5 py-4 rounded-xl text-xs font-bold transition-all duration-300 border"
                          style={{
                            background: isSelected 
                              ? "linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%)" 
                              : "rgba(255,255,255,0.7)",
                            color: isSelected ? "#FFFFFF" : "#3B475D",
                            borderColor: isSelected ? "transparent" : "rgba(24,0,173,0.08)",
                            boxShadow: isSelected ? "0 8px 24px -10px rgba(24,0,173,0.4)" : "none",
                            transform: isSelected ? "scale(1.02)" : "scale(1)"
                          }}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Inner Form Content */}
                <form
                  id="question-form"
                  onSubmit={async (e) => { 
                    e.preventDefault(); 
                    if (!selectedBudget) {
                      alert("Please select a budget range.");
                      return;
                    }
                    setIsSubmitting(true);
                    try {
                      const fd = new FormData(e.currentTarget);
                      const payload = {
                        name: fd.get("name"),
                        email: fd.get("email"),
                        company: fd.get("company") || "",
                        service: selectedService,
                        budget: selectedBudget,
                        description: fd.get("message") || ""
                      };
                      
                      const cleanPath = window.location.pathname.replace(/\/contact\/?$/, "");
                      const endpoint = `${window.location.origin}${cleanPath}/submit.php`;
                      
                      const response = await fetch(endpoint, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                      });
                      
                      if (response.ok) {
                        setSent(true);
                      } else {
                        const errData = await response.json();
                        alert(errData.error || "Failed to submit inquiry. Please try again.");
                      }
                    } catch (error) {
                      console.error("Submission error:", error);
                      alert("An error occurred. Please try again or email us directly at connect@vexcort.com.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="md:col-span-8 p-8 md:p-10 flex flex-col justify-start"
                >
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Detailed Inquiry</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1">Fill out the specific details below.</p>

                    {/* Name + Email */}
                    <div className="grid gap-4 md:grid-cols-2 mt-8">
                      <Field label="Name" name="name" required placeholder="John Smith" />
                      <Field label="Email" name="email" type="email" required placeholder="john@company.com" />
                      <Field label="Phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                      <Field label="Company" name="company" placeholder="Acme Inc." />
                    </div>
                  </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <h4 className="text-xs font-black text-[#1800AD] uppercase tracking-wider flex items-center">
                        <span className="w-6 h-[2px] bg-gradient-to-r from-[#1800AD] to-[#0EA5A4] mr-2"></span>
                        Details for: {inquiryType}
                      </h4>

                      {/* Service selector Ã¢â‚¬â€ pill chips (Only for specific types) */}
                      {inquiryType !== "Contact Sales" && inquiryType !== "Outsourcing" ? (
                        <div className="mt-6">
                          <label className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(11,19,36,0.55)" }}>
                            Service interested in
                          </label>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {serviceOptions.map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setSelectedService(s)}
                                className="rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                                style={{
                                  background: selectedService === s ? "linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%)" : "rgba(24,0,173,0.06)",
                                  color: selectedService === s ? "#fff" : "rgba(24,0,173,0.75)",
                                  border: selectedService === s ? "1px solid transparent" : "1px solid rgba(24,0,173,0.14)",
                                  boxShadow: selectedService === s ? "0 6px 18px -8px rgba(24,0,173,0.45)" : "none",
                                  transform: selectedService === s ? "scale(1.04)" : "scale(1)",
                                }}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                          <input type="hidden" name="service" value={selectedService} />
                        </div>
                      ) : null}

                      {/* Budget selector Ã¢â‚¬â€ pill chips */}
                      <div className="mt-6">
                        <label className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(11,19,36,0.55)" }}>
                          Budget range <span style={{ color: "#0EA5A4" }}>*</span>
                        </label>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {budgetOptions.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setSelectedBudget(b)}
                              className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
                              style={{
                                  background: selectedBudget === b ? "linear-gradient(135deg, #0EA5A4 0%, #1800AD 100%)" : "rgba(14,165,164,0.06)",
                                  color: selectedBudget === b ? "#fff" : "rgba(14,165,164,0.85)",
                                  border: selectedBudget === b ? "1px solid transparent" : "1px solid rgba(14,165,164,0.18)",
                                  boxShadow: selectedBudget === b ? "0 6px 18px -8px rgba(14,164,164,0.45)" : "none",
                                  transform: selectedBudget === b ? "scale(1.04)" : "scale(1)",
                              }}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="budget" value={selectedBudget} />
                      </div>
                    </div>

                  {/* Message */}
                  <div className="mt-6">
                      <label className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: focusedTextarea ? "#1800AD" : "rgba(11,19,36,0.55)" }}>
                        Message <span style={{ color: "#0EA5A4" }}>*</span>
                      </label>
                      <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us what you'd like to build, the problem you're solving, and any timeline or budget constraintsÃ¢â‚¬Â¦"
                      onFocus={() => setFocusedTextarea(true)}
                      onBlur={() => setFocusedTextarea(false)}
                      className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                      style={{
                        background: focusedTextarea ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
                        border: focusedTextarea ? "1.5px solid rgba(24,0,173,0.55)" : "1.5px solid rgba(24,0,173,0.14)",
                        boxShadow: focusedTextarea
                          ? "0 0 0 4px rgba(24,0,173,0.08), 0 4px 14px -6px rgba(24,0,173,0.18)"
                          : "0 2px 8px -4px rgba(24,0,173,0.08)",
                        color: "#0B1324",
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <div className="mt-8 flex items-center gap-4">
                    {sent ? (
                      <div
                        className="flex items-center gap-3 rounded-2xl px-6 py-3"
                        style={{
                          background: "linear-gradient(135deg, rgba(14,165,164,0.12), rgba(24,0,173,0.08))",
                          border: "1px solid rgba(14,165,164,0.25)",
                        }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-[#0EA5A4]" />
                        <span className="text-sm font-semibold" style={{ color: "#0B1324" }}>
                          Sent! We'll be in touch within 24 hours.
                        </span>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ paddingLeft: "28px", paddingRight: "28px" }}
                      >
                        {/* shimmer */}
                        {!isSubmitting && (
                          <span
                            className="pointer-events-none absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                              animation: "shimmer-bar 1.6s ease-in-out infinite",
                            }}
                          />
                        )}
                        <Send className="relative z-10 h-4 w-4" />
                        <span className="relative z-10">{isSubmitting ? "Sending..." : "Send message"}</span>
                      </button>
                    )}
                    <p className="text-xs" style={{ color: "rgba(11,19,36,0.4)" }}>
                      We respond within 1 business day
                    </p>
                  </div>
                </form>
              </div>
            </FadeUp>

            {/* Ã¢â€â‚¬ SIDEBAR Ã¢â€â‚¬ */}
            <aside className="space-y-5 lg:col-span-4">

              {/* Book a Meeting Card */}
              <FadeUp delay={100}>
                <div
                  className="relative overflow-hidden rounded-3xl p-7 transition-all duration-300 group bg-white"
                  style={{
                    border: "1px solid rgba(24,0,173,0.12)",
                    boxShadow: "0 28px 60px -20px rgba(24,0,173,0.14)",
                  }}
                >
                  {/* Grid pattern */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "linear-gradient(rgba(24,0,173,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(24,0,173,0.1) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="relative z-10">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl"
                      style={{
                        background: "rgba(24,0,173,0.06)",
                        border: "1.5px solid rgba(24,0,173,0.12)",
                      }}
                    >
                      <Calendar className="h-5 w-5 text-[#1800AD]" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-slate-900 leading-tight tracking-tight">Book a 1:1 Call</h3>
                    <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
                      Prefer talking face-to-face? Schedule a video call with our lead developer to clarify requirements.
                    </p>
                    <a
                      href="https://cal.com/Vexcort"
                      target="_blank"
                      rel="noreferrer"
                      className="btn mt-6 w-full rounded-2xl py-3 justify-center text-center font-bold flex items-center gap-1.5 bg-[#1800AD] text-white hover:opacity-90"
                    >
                      Schedule Video Meeting <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </FadeUp>

              {/* Social Channels Widget Box */}
              <FadeUp delay={200}>
                <div
                  className="relative overflow-hidden rounded-3xl p-7 bg-white"
                  style={{
                    border: "1px solid rgba(24,0,173,0.12)",
                    boxShadow: "0 28px 60px -20px rgba(24,0,173,0.14)",
                  }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1800AD]/5 border border-[#1800AD]/10">
                      <MessageCircle className="h-5 w-5 text-[#1800AD]" />
                    </span>
                    <h3 className="text-base font-bold text-slate-900">Follow Vexcort</h3>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a
                      href="https://www.linkedin.com/company/Vexcort"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn logo" className="h-4.5 w-4.5 object-contain" />
                      <span className="text-xs font-bold text-slate-700">LinkedIn</span>
                    </a>

                    <a
                      href="https://www.instagram.com/Vexcort_official"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram logo" className="h-4.5 w-4.5 object-contain" />
                      <span className="text-xs font-bold text-slate-700">Instagram</span>
                    </a>

                    <a
                      href="https://www.facebook.com/Vexcort_official"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors col-span-2"
                    >
                      <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook logo" className="h-4.5 w-4.5 object-contain" />
                      <span className="text-xs font-bold text-slate-700">Facebook</span>
                    </a>
                  </div>
                </div>
              </FadeUp>

              {/* Email + Social */}
              <FadeUp delay={180}>
                <div
                  className="relative overflow-hidden rounded-3xl p-7 transition-all duration-300 bg-white"
                  style={{
                    border: "1px solid rgba(24,0,173,0.12)",
                    boxShadow: "0 18px 48px -20px rgba(24,0,173,0.12)",
                  }}
                >
                  {/* Gradient top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: "linear-gradient(90deg, rgba(24,0,173,0.4) 0%, rgba(14,165,164,0.4) 100%)" }}
                  />
                  <div className="flex items-start gap-4">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                      style={{
                        background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(235,244,255,0.85))",
                        border: "1px solid rgba(24,0,173,0.14)",
                        boxShadow: "0 8px 22px -12px rgba(24,0,173,0.45), inset 0 1px 0 rgba(255,255,255,0.95)",
                      }}
                    >
                      <Mail className="h-5 w-5" style={{ color: "#1800AD" }} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: "#0B1324", letterSpacing: "-0.01em" }}>Email us directly</h3>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@vexcort.com&su=Project%20Inquiry%20%E2%80%94%20Vexcort"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm font-medium transition-colors hover:text-[#1800AD]"
                        style={{ color: "rgba(11,19,36,0.55)" }}
                      >
                        connect@vexcort.com
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-4">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                      style={{
                        background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(235,244,255,0.85))",
                        border: "1px solid rgba(24,0,173,0.14)",
                        boxShadow: "0 8px 22px -12px rgba(24,0,173,0.45), inset 0 1px 0 rgba(255,255,255,0.95)",
                      }}
                    >
                      <Phone className="h-5 w-5" style={{ color: "#1800AD" }} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: "#0B1324", letterSpacing: "-0.01em" }}>WhatsApp / Call</h3>
                      <a
                        href="https://wa.me/923107735262"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm font-medium transition-colors hover:text-[#1800AD]"
                        style={{ color: "rgba(11,19,36,0.55)" }}
                      >
                        +92 310 773 5262
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Follow Vexcort */}
              <FadeUp delay={260}>
                <div
                  className="relative overflow-hidden rounded-3xl p-7 bg-white"
                  style={{
                    border: "1px solid rgba(24,0,173,0.12)",
                    boxShadow: "0 18px 48px -20px rgba(24,0,173,0.12)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: "linear-gradient(90deg, rgba(14,165,164,0.4) 0%, rgba(24,0,173,0.4) 100%)" }}
                  />
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-2xl"
                      style={{
                        background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(235,244,255,0.85))",
                        border: "1px solid rgba(24,0,173,0.14)",
                        boxShadow: "0 8px 22px -12px rgba(24,0,173,0.45), inset 0 1px 0 rgba(255,255,255,0.95)",
                      }}
                    >
                      <MessageCircle className="h-5 w-5" style={{ color: "#1800AD" }} />
                    </span>
                    <h3 className="text-sm font-bold" style={{ color: "#0B1324", letterSpacing: "-0.01em" }}>Follow Vexcort</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/Vexcort", color: "#0A66C2" },
                      { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/Vexcort_official", color: "#E1306C" },
                      { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/Vexcort_official", color: "#1877F2" },
                    ].map(({ label, icon: Icon, href, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          background: "rgba(255, 255, 255, 0.9)",
                          border: `1px solid ${color}25`,
                          color: "rgba(11,19,36,0.65)",
                        }}
                      >
                        <Icon className="h-3.5 w-3.5 transition-colors" style={{ color }} />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </aside>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
