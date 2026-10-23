import { siteConfig, type Locale } from "@/config/site";

/**
 * schema.org data for search engines. Uses ProfessionalService (a LocalBusiness
 * subtype) on purpose: LegalService would suggest a law firm.
 */
export function localBusinessJsonLd(locale: Locale, description: string): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.legalName,
    description,
    url: `${siteConfig.url}/${locale}`,
    logo: `${siteConfig.url}${siteConfig.logo.full.src}`,
    image: `${siteConfig.url}/brand/og.png`,
    telephone: siteConfig.phone.e164,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    areaServed: siteConfig.areaServed,
    knowsLanguage: ["es", "en"],
    openingHoursSpecification: siteConfig.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${dayNames[d]}`),
      opens: h.opens,
      closes: h.closes,
    })),
    ...(siteConfig.social.instagram ? { sameAs: [siteConfig.social.instagram] } : {}),
  };

  // Escape "<" so the payload can't close the script tag.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const dayNames = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
} as const;
