import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden px-4">
      {/* Decorative premium gradients */}
      <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#0EA5A4]/10 blur-[100px]" />

      <div className="relative z-10 max-w-xl text-center">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Error Code 404
        </div>

        <h1 className="font-logo text-7xl md:text-8xl font-black uppercase text-foreground tracking-wider mb-4 leading-none">
          Lost In Space
        </h1>
        <p className="mx-auto max-w-md text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
          The link you followed may be broken, or the page has been moved. Let&apos;s get you back on track to scaling your digital systems.
        </p>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[#0a0a0c]/40 hover:bg-secondary/40 px-4 py-3 text-xs md:text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/45"
          >
            🏠 Home
          </Link>
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[#0a0a0c]/40 hover:bg-secondary/40 px-4 py-3 text-xs md:text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/45"
          >
            ⚙️ Services
          </Link>
          <Link
            href="/faq"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[#0a0a0c]/40 hover:bg-secondary/40 px-4 py-3 text-xs md:text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/45"
          >
            ❓ FAQs
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[#0a0a0c]/40 hover:bg-secondary/40 px-4 py-3 text-xs md:text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/45"
          >
            ✉️ Contact
          </Link>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02]"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
