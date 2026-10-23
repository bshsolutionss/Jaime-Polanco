import { Inter, Oswald } from "next/font/google";
import { locales, siteConfig } from "@/config/site";
import { getDictionary, getLocale } from "@/i18n/dictionary";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { DemoRibbon } from "@/components/ui/DemoRibbon";
import "../globals.css";

// Oswald: Bold condensed section headings matching the logo's strong lettering.
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

// Inter: Modern, clean body text that pairs well with Oswald.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const brandVars = `:root{${Object.entries(siteConfig.colors)
  .map(([key, value]) => `--brand-${kebab(key)}:${value}`)
  .join(";")}}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const t = await getDictionary();

  return (
    // suppressHydrationWarning: browser extensions (e.g. ColorZilla, Grammarly) add attributes to <html>/<body> before React hydrates.
    <html lang={locale} className={`${oswald.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/brand/jaime-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <style>{brandVars}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: localBusinessJsonLd(locale, t.meta.description) }}
        />
      </head>
      <body className="min-h-dvh" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
        >
          {t.common.skip}
        </a>
        <Header locale={locale} t={t} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
        <WhatsAppFab label={t.common.whatsappAria} greeting={t.common.whatsappGreeting} />
        {siteConfig.isDemo && <DemoRibbon label={t.common.demo} />}
      </body>
    </html>
  );
}
