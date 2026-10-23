import type { Metadata } from "next";
import { locales, defaultLocale, siteConfig, type Locale } from "@/config/site";

const ogLocale: Record<Locale, string> = { es: "es_US", en: "en_US" };

type PageMeta = { title: string; description: string };

/** Per-locale metadata with hreflang alternates. `path` is the route after the locale, e.g. "/privacy". */
export function buildMetadata(locale: Locale, path: string, page: PageMeta): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]));

  return {
    metadataBase: new URL(siteConfig.url),
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...languages, "x-default": `/${defaultLocale}${path}` },
    },
    openGraph: {
      type: "website",
      url: `/${locale}${path}`,
      siteName: siteConfig.legalName,
      title: page.title,
      description: page.description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: siteConfig.legalName }],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/brand/jaime-logo.png", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    robots: siteConfig.isDemo ? { index: false, follow: false } : { index: true, follow: true },
  };
}
