import type { Locale } from "@/config/site";

type Props = {
  locale: Locale;
  title: string;
  updated: string;
  sections: { h: string; p: string }[];
  backLabel: string;
};

/** Shared layout for the short Privacy and Terms pages. */
export function LegalPage({ locale, title, updated, sections, backLabel }: Props) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl leading-tight text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-muted">{updated}</p>
      <div aria-hidden="true" className="mt-6 h-px w-14 bg-gold" />
      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-2xl text-ink">{s.h}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
      </div>
      <a href={`/${locale}`} className="mt-14 inline-block font-semibold text-ink underline decoration-gold underline-offset-4">
        {backLabel}
      </a>
    </article>
  );
}
