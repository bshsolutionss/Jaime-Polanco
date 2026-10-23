import { Icon } from "@/components/ui/Icon";
import { telHref, whatsappHref } from "@/lib/links";

const base =
  "btn-lift inline-flex min-h-13 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-md px-7 text-base font-semibold";

const variants = {
  primary: "btn-sheen bg-ink text-white shadow-[var(--shadow-soft)] hover:bg-ink-deep",
  secondary: "border-2 border-ink/25 bg-white text-ink font-semibold hover:border-gold hover:text-gold shadow-[var(--shadow-soft)]",
  gold: "btn-sheen bg-gold text-white font-bold tracking-wide shadow-[var(--shadow-gold)] hover:brightness-110",
  outlineLight: "border-2 border-white/50 text-white font-semibold hover:border-gold hover:text-gold",
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
      <Icon name="whatsapp" className={`size-5 ${variant === "primary" ? "text-gold" : variant === "gold" ? "text-white" : ""}`} />
      {label}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}

type CallProps = { label: string; variant?: Variant; className?: string };

export function CallLink({ label, variant = "secondary", className = "" }: CallProps) {
  return (
    <a href={telHref} className={`${base} ${variants[variant]} ${className}`}>
      <Icon name="phone" className="size-5" />
      {label}
    </a>
  );
}
