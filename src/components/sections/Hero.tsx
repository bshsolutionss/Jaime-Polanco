import Image from "next/image";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { CallLink, WhatsAppLink } from "@/components/ui/ContactLinks";
import { Ornament, SealRings } from "@/components/ui/Ornament";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-gradient-to-br from-white via-mist to-white">
      {/* Amber glow behind the portrait, matching the logo's top chevron */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-gold)_18%,transparent),transparent)] max-lg:-right-64 max-lg:top-[34rem]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-4 pb-20 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-14 lg:pb-28">
        <div>
          <h1
            id="hero-title"
            className="font-sans text-[2.85rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-[3.5rem]"
          >
            <span className="hero-line">
              <span>{t.hero.title}</span>
            </span>
          </h1>
          <Ornament className="rule-draw mt-7" />
          <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted sm:text-xl">{t.hero.lead}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink
              variant="gold"
              greeting={t.common.whatsappGreeting}
              label={t.common.whatsappLong}
              newTabLabel={t.common.newTab}
            />
            <CallLink label={t.common.callLong} />
          </div>
        </div>

        <HeroPortrait tab={t.hero.folderTab} alt={t.hero.photoAlt} caption={t.hero.folderCaption} />
      </div>
    </section>
  );
}

/** Jaime's portrait in a document folder, with the brand seal on the corner. */
function HeroPortrait({ tab, alt, caption }: { tab: string; alt: string; caption: string }) {
  return (
    <figure className="frame-in relative mx-auto w-full max-w-[19.5rem] pt-9 sm:max-w-sm lg:mr-0">
      <SealRings className="spin-slow pointer-events-none absolute -right-16 -top-10 size-[26rem] text-gold/45 sm:-right-24 sm:size-[30rem]" />

      {/* Document peeking out of the folder */}
      <div
        aria-hidden="true"
        className="absolute inset-x-5 top-1 h-1/2 rotate-[3deg] rounded-sm border border-rule bg-white shadow-[var(--shadow-soft)]"
      >
        <div className="mx-5 mt-5 space-y-2">
          <div className="h-1.5 w-1/3 rounded-full bg-ink/15" />
          <div className="h-1 w-3/4 rounded-full bg-ink/10" />
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -top-8 left-0 flex h-9 items-center rounded-t-lg bg-ink-deep px-5 font-serif text-sm italic text-gold"
        >
          {tab}
        </div>
        <div className="relative rounded-b-lg rounded-tr-lg bg-ink-deep p-2.5 shadow-[var(--shadow-deep)] sm:p-3">
          <Image
            src={siteConfig.heroImage.src}
            width={siteConfig.heroImage.width}
            height={siteConfig.heroImage.height}
            alt={alt}
            priority
            sizes="(min-width: 640px) 23rem, 18rem"
            className="aspect-[4/5] w-full rounded-md object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2.5 rounded-md ring-1 ring-inset ring-gold/40 sm:inset-3"
          />
        </div>

        <div
          aria-hidden="true"
          className="seal-press absolute -bottom-8 -left-4 grid size-24 place-items-center rounded-full bg-ink-deep shadow-[var(--shadow-gold)] ring-1 ring-gold/70 ring-offset-4 ring-offset-paper sm:-left-8 sm:size-28"
        >
          <Image
            src={siteConfig.logo.markGold.src}
            width={siteConfig.logo.markGold.width}
            height={siteConfig.logo.markGold.height}
            alt=""
            sizes="5rem"
            className="w-[4.25rem] sm:w-20"
          />
        </div>
      </div>

      <figcaption className="mt-5 pl-24 font-serif leading-snug text-ink">
        <span className="block text-lg">{siteConfig.owner}</span>
        <span className="block text-[0.95rem] italic text-muted">{caption}</span>
      </figcaption>
    </figure>
  );
}
