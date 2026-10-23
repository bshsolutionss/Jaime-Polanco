import { Icon } from "@/components/ui/Icon";
import { telHref, whatsappHref } from "@/lib/links";

const base =
  "btn-lift inline-flex min-h-13 w-full min-w-0 items-center justify-center gap-2.5 rounded-md px-4 text-center text-base font-semibold leading-snug whitespace-normal sm:w-auto sm:shrink-0 sm:px-7 sm:whitespace-nowrap";

const variants = {
  primary: "btn-sheen bg-ink text-white shadow-[var(--shadow-soft)] hover:bg-ink-deep",
  secondary: "border border-ink/40 bg-white text-ink hover:border-ink hover:bg-white shadow-[var(--shadow-soft)]",
  gold: "btn-sheen bg-gold text-white font-bold tracking-wide shadow-[var(--shadow-gold)] hover:brightness-110",
  outlineLight: "border border-white/50 text-white hover:border-gold hover:text-gold",
} as const;

type Variant = keyof typeof variants;

type WhatsAppProps = {
  greeting: string;
  label: string;
  newTabLabel: string;
  variant?: Variant;
  className?: string;
};

export function WhatsAppLink({ greeting, label, newTabLabel, variant = "primary", className = "" }: WhatsAppProps) {
  return (
    <a
      href={whatsappHref(greeting)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <Icon name="whatsapp" className={`size-5 shrink-0 ${variant === "primary" ? "text-gold" : variant === "gold" ? "text-white" : ""}`} />
      <span className="min-w-0">{label}</span>
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}

type CallProps = { label: string; variant?: Variant; className?: string };

export function CallLink({ label, variant = "secondary", className = "" }: CallProps) {
  return (
    <a href={telHref} className={`${base} ${variants[variant]} ${className}`}>
      <Icon name="phone" className="size-5 shrink-0" />
      <span className="min-w-0">{label}</span>
    </a>
  );
}
