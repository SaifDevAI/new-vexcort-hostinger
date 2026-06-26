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
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Cortvex" },
      { name: "description", content: "Get in touch with Cortvex. Book a meeting or send us a project brief." },
      { property: "og:title", content: "Contact Cortvex" },
      { property: "og:description", content: "Start a project, book a meeting or ask a question." },
    ],
    links: [{ rel: "canonical", href: "https://cortvex.com/contact" }],
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
const budgetOptions = ["< $2k", "$2k – $5k", "$5k – $15k", "$15k – $50k", "$50k+"];

const faqs = [
  { q: "How quickly do you respond?", a: "We reply within one business day, often the same day." },
  { q: "Do you sign NDAs?", a: "Yes — happy to sign your NDA or send ours before our first call." },
  { q: "Do you work with international clients?", a: "Yes. Most of our clients are remote across the US, EU and APAC." },
  { q: "What happens after I submit the form?", a: "Our team reviews your brief, then reaches out with a tailored plan, a rough estimate, or a calendar link for a call." },
];

const trustItems = [
  { icon: Clock, label: "1-day response" },
  { icon: Globe, label: "Remote-friendly" },
  { icon: ShieldCheck, label: "NDA available" },
  { icon: Zap, label: "Start in 7 days" },
];

// ─── Floating Particles (reused from About page pattern) ─────────────────────
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

// ─── Typewriter effect component for the header ────────────────────────
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

// ─── Animated word reveal (same pattern as About hero) ────────────────────────
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

// ─── Scroll-reveal wrapper ─────────────────────────────────────────────────────
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

// ─── Premium Input Field ───────────────────────────────────────────────────────
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

// ─── Main Page ─────────────────────────────────────────────────────────────────
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Web Development");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [focusedTextarea, setFocusedTextarea] = useState(false);
  const [heroPhase, setHeroPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroPhase(1), 80);
    const t2 = setTimeout(() => setHeroPhase(2), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <SiteLayout>
      {/* ── Keyframes ── */}
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

      <div className="font-sans">
        {/* ── HERO SECTION ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #FFFFFF 0%, #F4F6FF 50%, #EBF0FF 100%)",
            paddingTop: "100px",
            paddingBottom: "80px",
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

            {/* Trust chips */}
            <div
              className="mt-8 flex flex-wrap gap-3"
              style={{
                opacity: heroPhase >= 2 ? 1 : 0,
                transform: heroPhase >= 2 ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s",
              }}
            >
              {trustItems.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.82)",
                    border: "1px solid rgba(24,0,173,0.12)",
                    boxShadow: "0 4px 14px -8px rgba(24,0,173,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#1800AD", display: "block" }} />
                  <span className="text-xs font-semibold leading-none" style={{ color: "rgba(11,19,36,0.7)", display: "inline-block" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORM + SIDEBAR ── */}
        <section className="section container-x">
          <div className="grid gap-8 lg:grid-cols-12">

            {/* ─ FORM ─ */}
            <FadeUp delay={0} className="lg:col-span-7">
              <form
                id="question-form"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="relative overflow-hidden rounded-3xl"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(24,0,173,0.14)",
                  boxShadow: "0 32px 72px -20px rgba(24,0,173,0.18), 0 12px 32px -16px rgba(14,165,164,0.12)",
                }}
              >
                {/* Gradient top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: "linear-gradient(90deg, #1800AD 0%, #0EA5A4 100%)" }}
                />

                <div className="p-8 md:p-10">
                  {/* Form header */}
                  <div className="mb-8">
                    <p className="eyebrow">Project Brief</p>
                    <h2 className="mt-2 text-2xl font-bold" style={{ color: "#0B1324", letterSpacing: "-0.02em" }}>
                      Let's start your project
                    </h2>
                  </div>

                  {/* Name + Email */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Name" name="name" required placeholder="John Smith" />
                    <Field label="Email" name="email" type="email" required placeholder="john@company.com" />
                    <Field label="Phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    <Field label="Company" name="company" placeholder="Acme Inc." />
                  </div>

                  {/* Service selector — pill chips */}
                  <div className="mt-7">
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

                  {/* Budget selector — pill chips */}
                  <div className="mt-7">
                    <label className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(11,19,36,0.55)" }}>
                      Budget range
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
                            boxShadow: selectedBudget === b ? "0 6px 18px -8px rgba(14,165,164,0.45)" : "none",
                            transform: selectedBudget === b ? "scale(1.04)" : "scale(1)",
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="budget" value={selectedBudget} />
                  </div>

                  {/* Message */}
                  <div className="mt-7">
                    <label className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: focusedTextarea ? "#1800AD" : "rgba(11,19,36,0.55)" }}>
                      Message <span style={{ color: "#0EA5A4" }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us what you'd like to build, the problem you're solving, and any timeline or budget constraints…"
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
                        className="btn btn-primary relative overflow-hidden group"
                        style={{ paddingLeft: "28px", paddingRight: "28px" }}
                      >
                        {/* shimmer */}
                        <span
                          className="pointer-events-none absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                            animation: "shimmer-bar 1.6s ease-in-out infinite",
                          }}
                        />
                        <Send className="relative z-10 h-4 w-4" />
                        <span className="relative z-10">Send message</span>
                      </button>
                    )}
                    <p className="text-xs" style={{ color: "rgba(11,19,36,0.4)" }}>
                      We respond within 1 business day
                    </p>
                  </div>
                </div>
              </form>
            </FadeUp>

            {/* ─ SIDEBAR ─ */}
            <aside className="space-y-5 lg:col-span-5">

              {/* Book a Meeting Card */}
              <FadeUp delay={100}>
                <div
                  className="relative overflow-hidden rounded-3xl p-7 transition-all duration-300 group"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(24,0,173,0.14)",
                    boxShadow: "0 28px 60px -20px rgba(24,0,173,0.18)",
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
                        border: "1px solid rgba(24,0,173,0.15)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Calendar className="h-6 w-6 text-[#1800AD]" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold text-[#0B1324] leading-tight" style={{ letterSpacing: "-0.02em" }}>
                      Book a discovery call
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Prefer to talk? Grab a 30-minute slot and we'll map the fastest path to your goal.
                    </p>
                    <Link
                      to="/signin"
                      search={{ mode: "signup" }}
                      className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:gap-3"
                      style={{
                        background: "linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%)",
                        color: "#ffffff",
                        boxShadow: "0 8px 24px -8px rgba(24,0,173,0.45)",
                      }}
                    >
                      Open calendar <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </FadeUp>

              {/* Email + Social */}
              <FadeUp delay={180}>
                <div
                  className="relative overflow-hidden rounded-3xl p-7 transition-all duration-300"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(24,0,173,0.12)",
                    boxShadow: "0 18px 48px -20px rgba(24,0,173,0.16)",
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
                        href="mailto:hello@cortvex.com"
                        className="mt-1 block text-sm font-medium transition-colors hover:text-[#1800AD]"
                        style={{ color: "rgba(11,19,36,0.55)" }}
                      >
                        hello@cortvex.com
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
                        href="https://wa.me/923001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm font-medium transition-colors hover:text-[#1800AD]"
                        style={{ color: "rgba(11,19,36,0.55)" }}
                      >
                        +92 300 123 4567
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Follow Cortvex */}
              <FadeUp delay={260}>
                <div
                  className="relative overflow-hidden rounded-3xl p-7"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(24,0,173,0.12)",
                    boxShadow: "0 18px 48px -20px rgba(24,0,173,0.14)",
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
                    <h3 className="text-sm font-bold" style={{ color: "#0B1324", letterSpacing: "-0.01em" }}>Follow Cortvex</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Twitter / X", icon: Twitter, href: "#", color: "#1DA1F2" },
                      { label: "LinkedIn", icon: Linkedin, href: "#", color: "#0A66C2" },
                      { label: "Instagram", icon: Instagram, href: "#", color: "#E1306C" },
                      { label: "GitHub", icon: Github, href: "#", color: "#333333" },
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

        {/* ── FAQ SECTION ── */}
        <section className="section">
          <div className="container-x">
            <FadeUp>
              <div className="mb-10">
                <p className="eyebrow">FAQ</p>
                <h2 className="h-display mt-3 text-4xl md:text-5xl">Quick answers.</h2>
                <p className="mt-3 text-muted-foreground max-w-lg">
                  Can't find what you need? Reach out and we'll respond within one business day.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={80}>
              <div
                className="divide-y rounded-3xl overflow-hidden"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(24,0,173,0.12)",
                  boxShadow: "0 22px 56px -24px rgba(24,0,173,0.18)",
                  divideColor: "rgba(24,0,173,0.07)",
                }}
              >
                {faqs.map((f, i) => (
                  <details
                    key={f.q}
                    className="group"
                    style={{ borderBottom: i < faqs.length - 1 ? "1px solid rgba(24,0,173,0.07)" : "none" }}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-5 text-base font-semibold transition-colors hover:text-[#1800AD]" style={{ color: "#0B1324" }}>
                      {f.q}
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 group-open:rotate-45"
                        style={{
                          background: "rgba(24,0,173,0.07)",
                          border: "1px solid rgba(24,0,173,0.12)",
                          color: "#1800AD",
                          fontSize: "1.2rem",
                          fontWeight: 300,
                        }}
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-7 pb-5 text-sm leading-relaxed" style={{ color: "rgba(11,19,36,0.58)" }}>
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
