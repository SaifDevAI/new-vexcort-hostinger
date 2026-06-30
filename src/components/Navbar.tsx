import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
] as const;

const navActiveClass =
  "text-[color:var(--brand)] bg-[color:var(--brand-soft)] shadow-[0_10px_24px_-18px_rgba(24,0,173,0.45)] ring-1 ring-[color:var(--color-border)]";

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesInView, setServicesInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setServicesInView(false);
      setFaqInView(false);
      return;
    }

    const servicesEl = document.getElementById("home-services-section");
    const faqEl = document.getElementById("home-faq-section");
    if (!servicesEl && !faqEl) return;

    const servicesObserver = new IntersectionObserver(
      ([entry]) => setServicesInView(entry.isIntersecting),
      { root: null, threshold: 0.35, rootMargin: "-80px 0px -45% 0px" },
    );
    const faqObserver = new IntersectionObserver(([entry]) => setFaqInView(entry.isIntersecting), {
      root: null,
      threshold: 0.35,
      rootMargin: "-80px 0px -45% 0px",
    });

    if (servicesEl) servicesObserver.observe(servicesEl);
    if (faqEl) faqObserver.observe(faqEl);
    return () => {
      servicesObserver.disconnect();
      faqObserver.disconnect();
    };
  }, [location.pathname]);

  const isHomeRoute = location.pathname === "/";
  const activeNavLabel = !isHomeRoute
    ? location.pathname === "/services"
      ? "Services"
      : location.pathname === "/faq"
        ? "FAQ"
        : location.pathname === "/about"
          ? "About"
          : ""
    : servicesInView
      ? "Services"
      : "Home";

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex items-center justify-between gap-6 rounded-full transition-all duration-500 ease-out ${
          scrolled
            ? "w-full max-w-4xl border-transparent bg-white/58 px-4 py-2 shadow-[0_8px_18px_-14px_rgba(11,19,36,0.35)] backdrop-blur-xl"
            : "w-full max-w-6xl border-transparent bg-white/48 px-6 py-3 shadow-[0_8px_18px_-14px_rgba(11,19,36,0.28)] backdrop-blur-xl"
        }`}
      >
        <Logo showText={false} />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={`${l.to}-${l.label}`}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground ${
                  l.label === activeNavLabel ? navActiveClass : "text-foreground/70"
                }`}
                aria-current={l.label === activeNavLabel ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/contact"
            className="btn btn-primary px-5 py-2 text-sm rounded-full font-bold flex items-center gap-1"
          >
            Contact Us <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-border)] bg-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-x-4 top-20 z-40 origin-top rounded-2xl border bg-white/95 p-4 shadow-[0_24px_60px_-20px_rgba(24,0,173,0.25)] backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {links.map((l) => (
            <li key={`${l.to}-${l.label}`}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-[color:var(--color-surface)] ${
                  l.label === activeNavLabel
                    ? "bg-[color:var(--brand-soft)] text-[color:var(--brand)]"
                    : "text-foreground/80"
                }`}
                aria-current={l.label === activeNavLabel ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 pt-2 border-t border-slate-100">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full rounded-xl py-3 justify-center text-center font-bold flex items-center gap-1.5"
            >
              Contact Us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
