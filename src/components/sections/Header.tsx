import Image from "next/image";
import { sectionIds, siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { Icon } from "@/components/ui/Icon";
import { whatsappHref } from "@/lib/links";

export function navLinks(locale: Locale, t: Dictionary) {
  return (Object.keys(sectionIds) as (keyof typeof sectionIds)[]).map((key) => ({
    href: `/${locale}#${sectionIds[key]}`,
    label: t.nav[key],
  }));
}

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const links = navLinks(locale, t);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-gold/50 bg-white/95 shadow-[0_4px_20px_-8px_rgb(26_35_126/0.18)] backdrop-blur-md">
      <div className="relative mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href={`/${locale}`} className="flex shrink-0 items-center gap-3">
          <Image
            src={siteConfig.logo.mark.src}
            width={siteConfig.logo.mark.width}
            height={siteConfig.logo.mark.height}
            alt={siteConfig.legalName}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </a>

        <nav aria-label={t.nav.label} className="hidden lg:block">
          <ul className="flex gap-7 text-[0.94rem] font-semibold tracking-wide text-ink">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="underline-offset-8 hover:text-gold hover:underline hover:decoration-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch current={locale} label={t.common.language} names={t.common.languageNames} />
          <a
            href={whatsappHref(t.common.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift inline-flex h-10 items-center gap-2 rounded-md bg-ink px-3 text-sm font-semibold text-white hover:bg-ink-deep sm:px-4"
          >
            <Icon name="whatsapp" className="size-[18px] text-gold" />
            {t.common.whatsapp}
            <span className="sr-only"> {t.common.newTab}</span>
          </a>
          <MobileMenu links={links} openLabel={t.nav.menu} closeLabel={t.nav.close} navLabel={t.nav.label} />
        </div>
      </div>
    </header>
  );
}
