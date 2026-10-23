import Image from "next/image";
import type { ReactNode } from "react";
import { siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { navLinks } from "@/components/sections/Header";
import { CallLink, WhatsAppLink } from "@/components/ui/ContactLinks";
import { Icon } from "@/components/ui/Icon";
import { Ornament, SealRings } from "@/components/ui/Ornament";
import { formatHours } from "@/lib/hours";
import { telHref, whatsappHref } from "@/lib/links";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const otherLocale = locale === "es" ? "en" : "es";
  const { footer } = t;

  return (
    <footer className="on-dark relative overflow-hidden bg-ink-deep text-on-dark">
      <SealRings className="spin-slow pointer-events-none absolute -right-40 -top-40 size-[34rem] text-gold/10" />

      {/* Closing call to action */}
      <div className="relative mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24">
        <div className="reveal flex flex-col gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl leading-[1.08] text-white sm:text-5xl">{footer.ctaTitle}</h2>
            <Ornament className="mt-5" />
            <p className="mt-5 text-lg leading-relaxed">{footer.ctaBody}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink
              greeting={t.common.whatsappGreeting}
              label={t.common.whatsappLong}
              newTabLabel={t.common.newTab}
              variant="gold"
            />
            <CallLink label={t.common.callLong} variant="outlineLight" />
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 lg:grid-cols-[1.3fr_0.8fr_1.1fr_1fr] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src={siteConfig.logo.full.srcOnDark}
              width={siteConfig.logo.full.width}
              height={siteConfig.logo.full.height}
              alt={siteConfig.legalName}
              sizes="10rem"
              className="h-auto w-40"
            />
            <p className="mt-6 font-serif text-xl italic text-gold">{t.meta.tagline}</p>
            <ul className="mt-5 flex gap-2">
              {t.about.languages.map((language) => (
                <li
                  key={language.code}
                  lang={language.code}
                  className="rounded-full border border-gold/50 px-3.5 py-1 text-sm text-white"
                >
                  {language.name}
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title={footer.exploreTitle} as="nav" label={t.nav.footerLabel}>
            <ul className="space-y-3">
              {navLinks(locale, t).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title={footer.contactTitle} className="col-span-2 max-lg:order-last lg:col-span-1">
            <ul className="space-y-4">
              <ContactRow icon="whatsapp">
                <a
                  href={whatsappHref(t.common.whatsappGreeting)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-gold"
                >
                  {siteConfig.phone.display}
                  <span className="sr-only"> WhatsApp {t.common.newTab}</span>
                </a>
              </ContactRow>
              <ContactRow icon="phone">
                <a href={telHref} className="text-white transition-colors hover:text-gold">
                  {siteConfig.phone.display}
                </a>
              </ContactRow>
              {siteConfig.email && (
                <ContactRow icon="mail">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all text-white transition-colors hover:text-gold"
                  >
                    {siteConfig.email}
                  </a>
                </ContactRow>
              )}
              <ContactRow icon="pin">
                <span className="text-white">
                  {siteConfig.address.locality}, {siteConfig.address.region}
                </span>
              </ContactRow>
            </ul>
          </FooterColumn>

          <FooterColumn title={footer.hoursTitle}>
            <dl className="space-y-3">
              {formatHours(locale, t.contact.direct.rangeWord).map((row) => (
                <div key={row.days}>
                  <dt className="text-white">{row.days}</dt>
                  <dd className="mt-0.5 text-sm tabular-nums">{row.time}</dd>
                </div>
              ))}
            </dl>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-gold/25 bg-black/25">
        <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 text-sm sm:px-6 md:pb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {siteConfig.legalName}. {footer.rights}
            </p>
            <ul className="flex gap-6">
              <li>
                <a href={`/${locale}/privacy`} className="underline-offset-4 hover:text-white hover:underline">
                  {footer.privacy}
                </a>
              </li>
              <li>
                <a href={`/${locale}/terms`} className="underline-offset-4 hover:text-white hover:underline">
                  {footer.terms}
                </a>
              </li>
              {siteConfig.social.instagram && (
                <li>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-white hover:underline"
                  >
                    {footer.instagram}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* New Jersey requires this notice in English and each advertised language. Keep both lines and have the Spanish translation reviewed before launch. */}
          <div className="mt-5 max-w-[78ch] space-y-2 text-sm leading-relaxed text-on-dark">
            <p>{footer.legalLine}</p>
            <p lang={otherLocale}>{footer.legalLineAlt}</p>
          </div>

          <p className="mt-6 border-t border-white/10 pt-5 text-xs text-on-dark/85">
            {footer.credit}{" "}
            <a
              href={siteConfig.credit.url}
              target="_blank"
              rel="noopener"
              className="font-semibold text-gold underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {siteConfig.credit.name}
              <span className="sr-only"> {t.common.newTab}</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

type ColumnProps = { title: string; children: ReactNode; as?: "div" | "nav"; label?: string; className?: string };

function FooterColumn({ title, children, as = "div", label, className }: ColumnProps) {
  const Tag = as;
  return (
    <Tag aria-label={as === "nav" ? label : undefined} className={className}>
      <h2 className="text-lg text-white">{title}</h2>
      <span aria-hidden="true" className="mt-3 mb-5 block h-px w-10 bg-gold" />
      {children}
    </Tag>
  );
}

function ContactRow({ icon, children }: { icon: "whatsapp" | "phone" | "mail" | "pin"; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ring-1 ring-gold/50">
        <Icon name={icon} className="size-4 text-gold" />
      </span>
      <span className="pt-1">{children}</span>
    </li>
  );
}
