import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Calendar, UserRound } from "lucide-react";
import { Logo } from "./Logo";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const navActiveClass =
  "text-[color:var(--brand)] bg-[color:var(--brand-soft)] shadow-[0_10px_24px_-18px_rgba(24,0,173,0.45)] ring-1 ring-[color:var(--color-border)]";

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesInView, setServicesInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    const syncAuthState = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(Boolean(data.session));
    };

    syncAuthState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut({ scope: "global" });
    } finally {
      window.location.href = "/signin?mode=login";
    }
  };

  const isHomeRoute = location.pathname === "/";
  const activeNavLabel = !isHomeRoute
    ? location.pathname === "/services"
      ? "Services"
      : location.pathname === "/faq"
        ? "FAQ"
        : location.pathname === "/about"
          ? "About"
          : location.pathname === "/contact"
            ? "Contact"
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
            <li key={`${l.to}-${l.hash ?? l.label}`}>
              <Link
                to={l.to}
                hash={l.hash}
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
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-border)] bg-white text-foreground/80 transition-colors hover:text-[color:var(--brand)]"
                  aria-label="Open profile menu"
                >
                  <UserRound className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild>
                  <Link to="/book-meeting">
                    <Calendar className="h-4 w-4" /> Book a Meeting
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(event) => {
                    event.preventDefault();
                    void handleSignOut();
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                to="/signin"
                search={{ mode: "login" }}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  location.pathname === "/signin"
                    ? "text-[color:var(--brand)] bg-[color:var(--brand-soft)] ring-1 ring-[color:var(--color-border)]"
                    : "text-foreground/72 hover:text-[color:var(--brand)]"
                }`}
              >
                Log In
              </Link>
              <Link
                to="/signin"
                search={{ mode: "signup" }}
                className="btn btn-primary px-4 py-2 text-sm"
              >
                <Calendar className="h-4 w-4" /> Book a Meeting
              </Link>
            </>
          )}
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
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={`${l.to}-${l.hash ?? l.label}`}>
              <Link
                to={l.to}
                hash={l.hash}
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
          {isAuthenticated ? (
            <>
              <li className="mt-2">
                <Link
                  to="/book-meeting"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  <Calendar className="h-4 w-4" /> Book a Meeting
                </Link>
              </li>
              <li className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    void handleSignOut();
                  }}
                  className="btn w-full border border-[color:var(--color-border)] bg-white text-foreground/85"
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mt-2">
                <Link
                  to="/signin"
                  search={{ mode: "login" }}
                  onClick={() => setOpen(false)}
                  className="btn w-full border border-[color:var(--color-border)] bg-white text-foreground/85"
                >
                  Log In
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to="/signin"
                  search={{ mode: "signup" }}
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  <Calendar className="h-4 w-4" /> Book a Meeting
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
