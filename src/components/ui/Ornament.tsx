/** The diamond divider from the logo (line, diamond, line). Decorative. */
export function Ornament({ className = "", align = "left" }: { className?: string; align?: "left" | "center" }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-2.5 text-gold ${align === "center" ? "justify-center" : ""} ${className}`}
    >
      <span className="h-px w-12 bg-current" />
      <svg viewBox="0 0 24 10" className="h-3.5 w-9 fill-current">
        <path d="M12 0 15 5 12 10 9 5Z" />
        <path d="M5 5 7 3.5 9 5 7 6.5Z" opacity="0.7" />
        <path d="M15 5 17 3.5 19 5 17 6.5Z" opacity="0.7" />
      </svg>
      <span className="h-px w-12 bg-current" />
    </div>
  );
}

/** Double ring echoing the circle around the LR monogram. Decorative. */
export function SealRings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none" stroke="currentColor">
      <circle cx="100" cy="100" r="98" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="92" strokeWidth="0.35" />
      <circle cx="100" cy="100" r="95" strokeWidth="1.4" strokeDasharray="0.6 5.4" />
    </svg>
  );
}
