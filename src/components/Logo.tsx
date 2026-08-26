import { Link } from "@tanstack/react-router";

export function Logo({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <Link to="/" aria-label="Vexcort home" className={`group inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="grid h-11 place-items-center px-1 transition-transform duration-300 group-hover:scale-105"
      >
        <img src="/textlogo.png?v=4" alt="Vexcort" className="h-7 w-auto max-w-[140px] object-contain" />
      </span>
      {showText && <span className="logo-mark text-[15px] text-foreground">Vexcort</span>}
    </Link>
  );
}
