import type { CSSProperties } from "react";
import { sectionIds } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Steps({ t }: { t: Dictionary }) {
  return (
    <section id={sectionIds.steps} aria-labelledby="steps-title" className="bg-ink py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="steps-title" title={t.steps.title} intro={t.steps.intro} onDark />
        <ol className="relative mt-16 grid gap-14 md:grid-cols-3 md:gap-10">
          {/* Amber thread joining the three seals on wide screens */}
          <span
            aria-hidden="true"
            className="absolute left-10 right-10 top-10 hidden h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)] md:block"
          />
          {t.steps.items.map((step, i) => (
            <li
              key={step.title}
              className="reveal relative"
              style={{ "--reveal-index": i } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="relative grid size-20 place-items-center rounded-full bg-gold font-serif text-4xl font-bold text-white shadow-[var(--shadow-gold)] ring-4 ring-gold/30 ring-offset-4 ring-offset-ink"
              >
                {i + 1}
              </span>
              <h3 className="mt-8 text-2xl font-semibold tracking-wide text-white">{step.title}</h3>
              <p className="mt-3 max-w-[34ch] leading-relaxed text-on-dark">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
