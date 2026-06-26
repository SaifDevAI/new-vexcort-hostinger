import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  {
    heading: "Company",
    links: [
      { to: "/", label: "Home" },
      { to: "/", hash: "home-faq-section", label: "FAQ" },
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
      { to: "/signin", search: { mode: "signup" }, label: "Book a Meeting" },
      { to: "/contact", label: "Ask a Question" },
    ],
  },
] as const;

const socials = [
  {
    href: "https://www.linkedin.com/company/cortvex",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/cortvex_official",
    icon: "https://cdn.simpleicons.org/instagram/E4405F",
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/cortvex_official",
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
                Cortvex builds modern websites, apps, and AI systems that help teams grow with
                clarity and measurable outcomes.
              </p>
              <Link
                to="/signin"
                search={{ mode: "signup" }}
                className="btn mt-6 bg-foreground text-white hover:opacity-90"
              >
                Book a Meeting <ArrowUpRight className="h-4 w-4" />
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
                        to={l.to}
                        hash={"hash" in l ? l.hash : undefined}
                        search={"search" in l ? l.search : undefined}
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
                  href="mailto:connect@cortvex.com"
                  className="block hover:text-[color:var(--brand)]"
                >
                  connect@cortvex.com
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

        <div className="mt-7 flex flex-col items-start justify-between gap-3 text-sm text-foreground/60 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} Cortvex. All rights reserved.</p>
          <p>connect@cortvex.com</p>
        </div>
      </div>
    </footer>
  );
}
