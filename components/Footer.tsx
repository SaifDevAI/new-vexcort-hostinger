'use client';

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  {
    heading: "Company",
    links: [
      { to: "/", label: "Home" },
      { to: "/portfolio", label: "Portfolio" },
      { to: "/faq", label: "FAQ" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { to: "/services", label: "Web Development" },
      { to: "/services", label: "Web Design" },
      { to: "/services", label: "AI Automation" },
      { to: "/services", label: "Chatbots & Voice Bots" },
      { to: "/services", label: "SEO & Marketing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { to: "/contact", label: "Contact Us" },
      { to: "/contact", label: "Ask a Question" },
    ],
  },
] as const;

const socials = [
  {
    href: "https://www.linkedin.com/company/Vexcort",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/Vexcort_official",
    icon: "https://cdn.simpleicons.org/instagram/E4405F",
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/Vexcort_official",
    icon: "https://cdn.simpleicons.org/facebook/1877F2",
    label: "Facebook",
  },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-foreground">
      <div className="container-x py-14">
        <div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-2">
              <Logo showText={false} className="-mt-2" />
              <p className="mt-4 max-w-xs text-base leading-relaxed text-foreground/70">
                Vexcort builds modern websites, apps, and AI systems that help teams grow with
                clarity and measurable outcomes.
              </p>
              <Link
                href="/contact"
                className="btn mt-6 bg-foreground text-white hover:opacity-90 rounded-full"
              >
                Contact Us <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {nav.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                  {col.heading}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.to}
                        className="text-[1.03rem] text-foreground/78 hover:text-[color:var(--brand)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Need Help?
              </h4>
              <div className="mt-4 space-y-3 text-[1.03rem] text-foreground/78">
                <p className="font-semibold text-foreground">Say Hi!</p>
                <a
                  href="mailto:connect@vexcort.com"
                  className="block hover:text-[color:var(--brand)]"
                >
                  connect@vexcort.com
                </a>
                <p>Islamabad, Pakistan</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Follow Us
              </h4>
              <ul className="mt-4 flex gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-[color:var(--color-border)] bg-white/85 transition hover:border-[color:var(--brand)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.icon}
                        alt={`${s.label} logo`}
                        className="h-5 w-5 object-contain"
                        loading="lazy"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Accent Footer Strip */}
      <div className="relative mt-16 border-t border-[color:var(--color-border)] bg-[#FAF9F6] py-16 pointer-events-none select-none overflow-hidden">
        {/* Organic centering radial gradient glows */}
        <div
          className="absolute left-1/2 top-1/2 z-0 h-[220px] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 filter blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(14,165,164,0.4) 0%, rgba(24,0,173,0.2) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 z-0 h-[100px] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 filter blur-[40px]"
          style={{
            background: "radial-gradient(circle, #0EA5A4 0%, transparent 70%)",
          }}
        />

        <div className="container-x relative z-10 flex flex-col items-center">
          {/* Centered Massive Wordmark */}
          <h2
            className="font-logo text-[12vw] font-black uppercase leading-none tracking-[0.06em] text-slate-800/12 sm:text-[14vw] md:text-[15vw] transition-all duration-700 hover:text-slate-800/20"
            style={{
              textShadow: "0 0 45px rgba(14,165,164,0.18), 0 0 90px rgba(24,0,173,0.12)",
            }}
          >
            VEXCORT
          </h2>

          {/* Clean Copyright & Tagline Row */}
          <div className="w-full mt-12 pt-8 border-t border-[color:var(--color-border)] flex flex-col items-center justify-between gap-4 text-xs text-foreground/60 md:flex-row pointer-events-auto">
            <p>&copy; {new Date().getFullYear()} Vexcort. All rights reserved.</p>
            <p className="font-logo text-[10px] tracking-[0.2em] uppercase text-[#0EA5A4] drop-shadow-[0_0_8px_rgba(14,165,164,0.25)]">
              METICULOUSLY CRAFTED • AI & DIGITAL SYSTEMS
            </p>
            <a
              href="mailto:connect@vexcort.com"
              className="text-foreground/60 hover:text-[#0EA5A4] transition-colors"
            >
              connect@vexcort.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
