import { sectionIds } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

/** Native <details>/<summary>: keyboard operable and announced correctly with no JS. */
export function Faq({ t }: { t: Dictionary }) {
  return (
    <section id={sectionIds.faq} aria-labelledby="faq-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[4fr_7fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" title={t.faq.title} intro={t.faq.intro} />
        </div>
        <div className="reveal border-t border-rule">
          {t.faq.items.map((item) => (
            <details key={item.q} name="faq" className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left transition-colors hover:text-gold-text">
                <h3 className="font-serif text-xl leading-snug sm:text-[1.4rem]">{item.q}</h3>
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-gold/70 text-ink transition-all duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-gold motion-reduce:transition-none">
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-7 pr-12 text-[1.05rem] leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
