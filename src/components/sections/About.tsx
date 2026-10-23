import Image from "next/image";
import { sectionIds, siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { Ornament, SealRings } from "@/components/ui/Ornament";

export function About({ t }: { t: Dictionary }) {
  return (
    <section id={sectionIds.about} aria-labelledby="about-title" className="bg-mist py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 md:grid-cols-[5fr_7fr] md:gap-16">
        {/* Brand plaque; add a second portrait here if the client supplies one. */}
        <div
          aria-hidden="true"
          className="reveal on-dark relative mx-auto grid aspect-[4/5] w-full max-w-[17rem] place-items-center overflow-hidden rounded-xl bg-ink-deep shadow-[var(--shadow-deep)] sm:max-w-sm"
        >
          <div className="absolute inset-3 rounded-lg border border-gold/35" />
          <SealRings className="spin-slow absolute size-[130%] text-gold/20" />
          <div className="relative flex flex-col items-center px-8 text-center">
            <Image
              src={siteConfig.logo.markGold.src}
              width={siteConfig.logo.markGold.width}
              height={siteConfig.logo.markGold.height}
              alt=""
              sizes="(min-width: 640px) 14rem, 11rem"
              className="w-44 sm:w-56"
            />
            <Ornament className="mt-7" align="center" />
            <p className="mt-4 font-serif text-sm italic text-on-dark">{siteConfig.brandLine}</p>
          </div>
        </div>

        <div className="reveal">
          <h2 id="about-title" className="text-4xl leading-[1.08] text-ink sm:text-[3.25rem]">
            {t.about.title}
          </h2>
          <p className="mt-4 font-serif text-xl italic text-gold-text">{t.about.role}</p>
          <Ornament className="mt-6" />
          <div className="mt-6 max-w-[58ch] space-y-4 text-lg leading-relaxed text-muted">
            {t.about.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted">{t.about.languagesLabel}</span>
            <ul className="flex gap-2">
              {t.about.languages.map((language) => (
                <li
                  key={language.code}
                  lang={language.code}
                  className="rounded-full border border-gold bg-white px-4 py-1.5 text-sm font-semibold text-ink shadow-[var(--shadow-soft)]"
                >
                  {language.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
