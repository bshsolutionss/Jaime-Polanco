import type { CSSProperties } from "react";
import { sectionIds, type Locale } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate, getUpdates } from "@/lib/updates";

export function Updates({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id={sectionIds.updates} aria-labelledby="updates-title" className="bg-mist py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="updates-title" title={t.updates.title} intro={t.updates.intro} />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {getUpdates(t).map((post, i) => (
            <li key={post.slug} className="reveal" style={{ "--reveal-index": i } as CSSProperties}>
              <article className="card-lift group relative h-full overflow-hidden rounded-xl border border-rule bg-white p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.18] bg-gold transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <time dateTime={post.date} className="text-sm font-medium text-gold-text">
                  {formatDate(post.date, locale)}
                </time>
                <h3 className="mt-3 text-[1.5rem] leading-snug text-ink">{post.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{post.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
