import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Mail, MessageCircle, Send } from "lucide-react";
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

const services = ["Web Development", "Web Design", "AI Automation", "Web Chatbots", "Voice Bots", "App Development", "SEO", "Marketing", "Social Media"];
const budgets = ["< $2k", "$2k – $5k", "$5k – $15k", "$15k – $50k", "$50k+"];
const faqs = [
  { q: "How quickly do you respond?", a: "We reply within one business day, often the same day." },
  { q: "Do you sign NDAs?", a: "Yes — happy to sign your NDA or send ours before our first call." },
  { q: "Do you work with international clients?", a: "Yes. Most of our clients are remote across the US, EU and APAC." },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="container-x pb-6 pt-8">
        <p className="eyebrow">Contact</p>
        <h1 className="h-display mt-3 max-w-4xl text-5xl md:text-6xl">Tell us about your project.</h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Share a few details and we'll get back within one business day with next steps,
          a rough estimate or a link to book a discovery call.
        </p>
      </section>

      <section className="container-x section grid gap-10 pt-12 lg:grid-cols-12">
        <form
          id="question-form"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl border bg-white p-8 md:p-10 lg:col-span-7"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" />
            <Field label="Company" name="company" />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Service interested in</label>
              <select className="mt-2 w-full rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-sm focus:border-[color:var(--brand)] focus:outline-none">
                {services.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Budget range</label>
              <select className="mt-2 w-full rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-sm focus:border-[color:var(--brand)] focus:outline-none">
                {budgets.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Message</label>
            <textarea rows={5} required className="mt-2 w-full rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-sm focus:border-[color:var(--brand)] focus:outline-none" placeholder="Tell us what you'd like to build…" />
          </div>
          <button type="submit" className="btn btn-primary mt-6">
            <Send className="h-4 w-4" /> {sent ? "Sent — we'll be in touch" : "Send message"}
          </button>
        </form>

        <aside className="space-y-6 lg:col-span-5">
          <div className="card-premium">
            <Calendar className="h-6 w-6 text-[color:var(--brand)]" />
            <h2 className="mt-4 text-lg font-semibold">Book a Meeting</h2>
            <p className="mt-2 text-sm text-muted-foreground">Prefer to talk? Grab a 30-minute discovery slot on the calendar.</p>
            <a href="#" className="btn btn-dark mt-5 w-full">Open calendar</a>
          </div>
          <div className="card-premium">
            <Mail className="h-6 w-6 text-[color:var(--brand)]" />
            <h2 className="mt-4 text-lg font-semibold">Email us directly</h2>
            <p className="mt-2 text-sm text-muted-foreground">hello@cortvex.com</p>
          </div>
          <div className="card-premium">
            <MessageCircle className="h-6 w-6 text-[color:var(--brand)]" />
            <h2 className="mt-4 text-lg font-semibold">Follow Cortvex</h2>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {["Twitter", "LinkedIn", "Instagram", "GitHub"].map((s) => (
                <a key={s} href="#" className="rounded-full border border-[color:var(--color-border)] bg-white px-3 py-1.5 text-foreground/80 hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]">{s}</a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-[color:var(--color-surface)] section">
        <div className="container-x">
          <p className="eyebrow">FAQ</p>
          <h2 className="h-display mt-3 text-4xl">Quick answers.</h2>
          <div className="mt-8 divide-y rounded-2xl border bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
                  {f.q}
                  <span className="grid h-7 w-7 place-items-center rounded-full border text-[color:var(--brand)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
        {label}{required && <span className="text-[color:var(--brand)]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-sm focus:border-[color:var(--brand)] focus:outline-none"
      />
    </div>
  );
}
