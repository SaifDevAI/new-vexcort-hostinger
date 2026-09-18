'use client';

import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";

export function CTASection() {
  return (
    <section className="section">
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] p-10 md:p-16"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="absolute inset-0 opacity-30 grid-bg" />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Let&apos;s build</p>
              <h2 className="h-display mt-3 text-4xl md:text-5xl">
                Ready to ship something your customers love?
              </h2>
              <p className="mt-4 text-white/80">
                Book a free 30-minute consultation. We&apos;ll map the fastest path from
                where you are today to a measurably better digital product.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn bg-white text-[color:var(--brand)] hover:opacity-95">
                <Calendar className="h-4 w-4" /> Book a Meeting
              </Link>
              <Link href="/services" className="btn border border-white/40 bg-white/10 text-white hover:bg-white/20">
                Explore Services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
