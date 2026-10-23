import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import { Icon, type IconName } from "@/components/ui/Icon";

// One icon per trust line in messages hero.trust, in order.
const icons: IconName[] = ["language", "lock", "doc"];

/** Navy band under the hero carrying the three trust promises. */
export function TrustBar({ t }: { t: Dictionary }) {
  return (
    <div className="on-dark relative bg-ink text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold" />
      <ul className="mx-auto grid max-w-6xl px-4 sm:grid-cols-3 sm:px-6">
        {t.hero.trust.map((item, i) => (
          <li
            key={item}
            className="reveal flex items-center gap-4 border-white/10 py-6 max-sm:border-b max-sm:last:border-0 sm:justify-center sm:border-l sm:first:border-0 sm:py-8"
            style={{ "--reveal-index": i } as CSSProperties}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold/15 ring-2 ring-gold">
              <Icon name={icons[i] ?? "check"} className="size-5 text-gold" />
            </span>
            <span className="font-semibold text-base leading-snug tracking-wide">{item}</span>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-gold/40" />
    </div>
  );
}
