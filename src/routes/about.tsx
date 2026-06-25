import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Rocket, Sparkles, ShieldCheck, Linkedin } from "lucide-react";
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
  },
  {
    name: "Hassan",
    role: "Co-Founder & AI Developer",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/hassanxabbasi",
    image: "/hassan.jpeg",
  },
  {
    name: "Umer",
    role: "AI/ML Developer",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/umer-ahmed-87ba72361",
    image: "/umer.jpeg",
  },
  {
    name: "Husnain",
    role: "Web/App Developer",
    location: "Islamabad",
    linkedin: "https://www.linkedin.com/in/husnain-fazal-b0377b329",
    image: "/husnain.jpeg",
  },
  {
    name: "Fariz",
    role: "Business Development Manager",
    location: "Lahore",
    linkedin: "https://www.linkedin.com/in/muhammad-fariz-04512234b",
    image: "/fariz.jpeg",
  },
  {
    name: "Areeba",
    role: "UI UX Designer & SEO Expert",
    location: "Islamabad",
    linkedin: "#",
    image: "/areeba.jpeg",
  },
];

const highlights = [
  { value: "20+", label: "businesses automated" },
  { value: "80+", label: "projects delivered" },
  { value: "4.9/5", label: "avg client rating" },
  { value: "7 days", label: "average kickoff time" },
];

function AboutPage() {
  const aboutHeading = "A modern digital studio for brands that care about craft and outcomes.";
  const [typedAboutHeading, setTypedAboutHeading] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedAboutHeading(aboutHeading.slice(0, index));
      if (index >= aboutHeading.length) {
        window.clearInterval(timer);
      }
    }, 34);

    return () => window.clearInterval(timer);
  }, []);

  const renderTeamCard = (m: (typeof team)[number]) => (
    <div key={m.name} className="team-showcase-card group">
      <div className="team-showcase-media">
        <img src={m.image} alt={`${m.name} portrait`} className="h-full w-full rounded-2xl object-cover" loading="lazy" />
      </div>
      <div className="team-showcase-overlay" />
      <div className="relative z-10 mt-5">
        <p className="text-3 leading-tight font-semibold text-white">{m.name}</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="text-sm text-white/88">{m.role}</p>
          <p className="shrink-0 text-xs font-medium text-white/80">{m.location}</p>
        </div>
      </div>
      <a
        href={m.linkedin}
        target="_blank"
        rel="noreferrer"
        className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-[#0A66C2] opacity-0 shadow-[0_12px_26px_-18px_rgba(10,102,194,0.7)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100"
        aria-label={`${m.name} LinkedIn profile`}
      >
        <Linkedin className="h-3.5 w-3.5" />
        LinkedIn
      </a>
      <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-[color:var(--brand)]/45" />
    </div>
  );

  const [businessesCount, setBusinessesCount] = useState(1);
  const [projectsCount, setProjectsCount] = useState(1);
  const [ratingCount, setRatingCount] = useState(1.0);
  const [kickoffCount, setKickoffCount] = useState(1);

  useEffect(() => {
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
    }, 55);

    const projectsTimer = window.setInterval(() => {
      setProjectsCount((prev) => {
        if (prev >= projectsTarget) {
          window.clearInterval(projectsTimer);
          return projectsTarget;
        }
        return prev + 1;
      });
    }, 18);

    const ratingTimer = window.setInterval(() => {
      setRatingCount((prev) => {
        if (prev >= ratingTarget) {
          window.clearInterval(ratingTimer);
          return ratingTarget;
        }
        return Math.min(Number((prev + 0.1).toFixed(1)), ratingTarget);
      });
    }, 80);

    const kickoffTimer = window.setInterval(() => {
      setKickoffCount((prev) => {
        if (prev >= kickoffTarget) {
          window.clearInterval(kickoffTimer);
          return kickoffTarget;
        }
        return prev + 1;
      });
    }, 120);

    return () => {
      window.clearInterval(businessesTimer);
      window.clearInterval(projectsTimer);
      window.clearInterval(ratingTimer);
      window.clearInterval(kickoffTimer);
    };
  }, []);

  return (
    <SiteLayout>
      <section className="container-x pb-6 pt-28 md:pt-32">
        <p className="eyebrow">About Cortvex</p>
        <h1 className="h-display mt-3 max-w-4xl text-5xl md:text-6xl">
          {typedAboutHeading}
          <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse align-[-0.1em] bg-[color:var(--brand)]" />
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Cortvex is a small, senior team building websites, apps and AI systems for
          companies that want to ship serious work - without the bloat of a traditional agency.
        </p>

        <div className="relative mt-8 overflow-hidden rounded-3xl border border-border/70 bg-white/65 p-6 shadow-[0_20px_60px_-38px_rgba(49,46,200,0.6)] backdrop-blur-sm">
          <img
            src="/logo.png"
            alt="Cortvex logo watermark"
            className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 h-28 w-28 opacity-15 md:h-36 md:w-36"
            loading="lazy"
          />
          <p className="eyebrow relative z-10">Our motto</p>
          <h2 className="relative z-10 mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
            Build Faster.
            <br />
            <span className="text-gradient">Automate Smarter.</span>
            <br />
            Grow Bigger.
          </h2>
        </div>
      </section>

      <section className="container-x section pt-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            { icon: Rocket, title: "Our mission", text: "Help ambitious teams design, build and scale digital products that actually move the business." },
            { icon: Sparkles, title: "What we build", text: "Premium websites, custom apps, AI automation, chatbots, voice bots and full growth systems." },
            { icon: ShieldCheck, title: "Why we are different", text: "Senior craft end-to-end, fast delivery, transparent pricing and a partnership model that scales with you." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="about-feature-card">
              <span className="about-feature-icon">
                <Icon className="h-5 w-5 text-[color:var(--brand)]" />
              </span>
              <h2 className="relative z-10 mt-4 text-xl font-semibold">{title}</h2>
              <p className="relative z-10 mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x section pt-2">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="about-feature-card">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Small team, high ownership.</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
              We keep teams lean, communication clear, and decision-making fast.
              Every engagement blends product thinking, strong engineering execution,
              and practical automation strategy from day one.
            </p>
            <ul className="mt-7 space-y-3.5 text-[1.02rem] leading-relaxed text-foreground/90">
              <li className="flex items-start gap-2.5">
                <span className="mt-[0.58rem] h-2.5 w-2.5 shrink-0 rounded-full bg-foreground/85" />
                <span>Senior specialists join every call, so context never gets lost.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-[0.58rem] h-2.5 w-2.5 shrink-0 rounded-full bg-foreground/85" />
                <span>Weekly demos keep progress visible and decisions aligned.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-[0.58rem] h-2.5 w-2.5 shrink-0 rounded-full bg-foreground/85" />
                <span>Performance, SEO, and analytics are built in from the first sprint.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-[0.58rem] h-2.5 w-2.5 shrink-0 rounded-full bg-foreground/85" />
                <span>Automation removes repetitive work and frees your team for higher-value tasks.</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="about-feature-card flex min-h-36 flex-col justify-center text-center">
              <p className="text-5xl font-semibold text-gradient">{businessesCount}+</p>
              <p className="mt-2 text-sm text-muted-foreground">{highlights[0].label}</p>
            </div>
            <div className="about-feature-card flex min-h-36 flex-col justify-center text-center">
              <p className="text-5xl font-semibold text-gradient">{projectsCount}+</p>
              <p className="mt-2 text-sm text-muted-foreground">{highlights[1].label}</p>
            </div>
            <div className="about-feature-card flex min-h-36 flex-col justify-center text-center">
              <p className="text-5xl font-semibold text-gradient">{ratingCount.toFixed(1)}/5</p>
              <p className="mt-2 text-sm text-muted-foreground">{highlights[2].label}</p>
            </div>
            <div className="about-feature-card flex min-h-36 flex-col justify-center text-center">
              <p className="text-5xl font-semibold text-gradient">{kickoffCount} days</p>
              <p className="mt-2 text-sm text-muted-foreground">{highlights[3].label}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface)] section">
        <div className="container-x team-lines-bg">
          <p className="eyebrow">Team</p>
          <h2 className="h-display mt-3 text-4xl md:text-5xl">A focused team you will actually meet.</h2>
          <div className="team-showcase-grid mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((m) => renderTeamCard(m))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
