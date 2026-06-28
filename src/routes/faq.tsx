import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowUpRight, Plus, HelpCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Cortvex" },
      { name: "description", content: "Frequently Asked Questions about Cortvex web development, design, and AI automation solutions." }
    ],
    links: [{ rel: "canonical", href: "https://cortvex.com/faq" }],
  }),
  component: FAQPage,
});

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

function FAQPage() {
  const [heroPhase, setHeroPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroPhase(1), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <SiteLayout>
      <div 
        className="relative overflow-hidden pt-32 pb-24"
        style={{
          background: "linear-gradient(160deg, #FFFFFF 0%, #F4F6FF 50%, #EBF0FF 100%)",
        }}
      >
        {/* Subtle grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(24,0,173,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(24,0,173,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <div className="container-x relative z-10">
          {/* Header section */}
          <div className="max-w-2xl">
            <span 
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full mb-6 transition-all duration-500"
              style={{
                background: "rgba(24,0,173,0.06)",
                color: "#1800AD",
                border: "1px solid rgba(24,0,173,0.12)",
                opacity: heroPhase >= 1 ? 1 : 0,
                transform: heroPhase >= 1 ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <HelpCircle className="h-3.5 w-3.5" /> Support Center
            </span>
            <h1 
              className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight transition-all duration-700"
              style={{
                letterSpacing: "-0.03em",
                opacity: heroPhase >= 1 ? 1 : 0,
                transform: heroPhase >= 1 ? "translateY(0)" : "translateY(20px)",
              }}
            >
              frequently asked <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1800AD] to-[#0EA5A4]">questions</span>
            </h1>
            <p 
              className="mt-6 text-base text-slate-500 max-w-lg leading-relaxed transition-all duration-700"
              style={{
                opacity: heroPhase >= 1 ? 1 : 0,
                transform: heroPhase >= 1 ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "150ms",
              }}
            >
              Quick answers to help you understand our services, stacks, workflows, and starting requirements.
            </p>
          </div>

          {/* Accordion List */}
          <div 
            className="mt-16 max-w-3xl space-y-4 transition-all duration-1000"
            style={{
              opacity: heroPhase >= 1 ? 1 : 0,
              transform: heroPhase >= 1 ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "300ms",
            }}
          >
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="group rounded-3xl bg-white transition-all duration-300 overflow-hidden"
                style={{
                  border: "1px solid rgba(24,0,173,0.08)",
                  boxShadow: "0 10px 30px -18px rgba(24,0,173,0.08)",
                }}
              >
                <summary 
                  className="flex cursor-pointer list-none items-center justify-between p-6 text-sm md:text-base font-bold text-slate-800 transition-colors hover:text-[#1800AD]"
                >
                  {f.q}
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 group-open:rotate-45"
                    style={{
                      background: "rgba(24,0,173,0.05)",
                      border: "1px solid rgba(24,0,173,0.1)",
                      color: "#1800AD",
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-xs md:text-sm leading-relaxed text-slate-500 border-t border-slate-50/50 pt-4">
                  {f.a}
                </div>
              </details>
            ))}
          </div>

          {/* CTA Footer */}
          <div 
            className="mt-16 rounded-3xl p-8 max-w-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-1000 bg-white"
            style={{
              border: "1px solid rgba(24,0,173,0.12)",
              boxShadow: "0 22px 56px -24px rgba(24,0,173,0.14)",
              opacity: heroPhase >= 1 ? 1 : 0,
              transform: heroPhase >= 1 ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "450ms",
            }}
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900">Still have questions?</h3>
              <p className="mt-1.5 text-xs text-slate-400 font-medium">We'll get back to you with next steps or a calendar link in 24 hours.</p>
            </div>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%)",
                color: "#ffffff",
                boxShadow: "0 8px 24px -8px rgba(24,0,173,0.45)",
              }}
            >
              Contact Us <ArrowUpRight className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
