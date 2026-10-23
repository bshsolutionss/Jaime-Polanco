/**
 * Single source of truth for business data.
 * To reskin for another client: edit this file, messages/*.json and public/brand/*.
 * All human-readable text lives in messages/*.json, keyed by the ids below.
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

// Region-specific tags for Intl formatting (dates, times). US Spanish uses 12-hour time.
export const intlLocale: Record<Locale, string> = { es: "es-US", en: "en-US" };

const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const isDemo = process.env.NEXT_PUBLIC_IS_DEMO !== "false";

if (!isDemo && new URL(publicSiteUrl).hostname === "example.com") {
  throw new Error("Set NEXT_PUBLIC_SITE_URL to the real public domain before disabling demo mode.");
}

export const siteConfig = {
  legalName: "Jaime's Help Club & Digital Notary",
  shortName: "Jaime's Help Club",
  brandLine: "Notary & Document Support",
  owner: "Jaime Polanco",

  url: publicSiteUrl,
  isDemo,

  // Phone in E.164 for tel: / wa.me links, plus the way people read it.
  phone: {
    e164: "+16464605360",
    display: "646-460-5360",
  },
  whatsapp: {
    number: "16464605360",
  },
  email: null as string | null,

  address: {
    locality: "Union City",
    region: "NJ",
    country: "US",
  },
  areaServed: "Union City & Hudson County, New Jersey",

  hours: [
    { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "09:00", closes: "18:00" },
    { days: ["Sa"], opens: "10:00", closes: "14:00" },
  ],

  // Site developer credit shown in the footer.
  credit: {
    name: "BSH Solutions",
    url: "https://bshsolutions.net",
  },

  social: {
    instagram: "https://www.instagram.com/jaime_digital_notary_/",
    instagramHandle: "@jaime_digital_notary_",
  },

  logo: {
    // Brand logo from uploaded asset: header, hero seal, footer, favicon.
    mark: { src: "/brand/jaime-logo.png", srcOnDark: "/brand/jaime-logo-light.png", width: 891, height: 629 },
    markGold: { src: "/brand/jaime-logo-light.png", width: 891, height: 629 },
    full: { src: "/brand/jaime-logo.png", srcOnDark: "/brand/jaime-logo-light.png", width: 891, height: 629 },
  },

  // Portrait shown in the hero (4:5). Original in brand-source/.
  heroImage: {
    src: "/brand/hero-jaime.jpg",
    width: 819,
    height: 1024,
  },

  // Brand tokens matched precisely to the Jaime's Help Club logo.
  // Navy Blue (#1A237E), Amber/Orange (#F5A700), Electric Blue (#1565C0).
  // Injected as CSS variables in the root layout and mapped in globals.css.
  colors: {
    ink: "#1A237E",     // Logo: 'JAIME\'S' deep navy blue — headings, buttons, nav
    inkDeep: "#0D1753", // Deeper navy for dark section backgrounds
    gold: "#F5A700",    // Logo: amber/orange chevron + 'HELP CLUB' — CTAs, highlights, accents
    goldText: "#B87400", // Accessible amber text on light backgrounds (WCAG AA)
    paper: "#FFFFFF",   // Pure white — crisp like the logo background
    mist: "#F0F4FF",    // Very light navy-tinted mist for alternating sections
    rule: "#C8D4F0",    // Soft navy-tinted border lines
    muted: "#4A5A8A",   // Muted navy-toned body text
    whatsapp: "#167A3E",
    error: "#C62828",
    onDark: "#C8D6F8",  // Body text on navy dark backgrounds
  },

  /**
   * Confirmed service categories for Jaime's Help Club (Notary Public, FOIA Record Requests, Document Preparation).
   */
  serviceCategories: [
    {
      id: "notary",
      icon: "stamp",
      services: ["notarizations", "mobileNotary", "certifiedCopies", "powers"],
    },
    {
      id: "foia",
      icon: "passport",
      services: ["foiaRequest", "agencyFollowup"],
    },
    {
      id: "docprep",
      icon: "doc",
      services: ["formAssistance", "checklists"],
    },
  ],
} as const;

export type ServiceCategoryId = (typeof siteConfig.serviceCategories)[number]["id"];
export type ServiceId = (typeof siteConfig.serviceCategories)[number]["services"][number];

export const allServiceIds: ServiceId[] = siteConfig.serviceCategories.flatMap(
  (c) => c.services,
);

export const sectionIds = {
  services: "servicios",
  steps: "como-funciona",
  about: "sobre-jaime",
  faq: "preguntas",
  updates: "noticias",
  contact: "contacto",
} as const;
