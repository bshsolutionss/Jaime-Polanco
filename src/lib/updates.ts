import type { Dictionary } from "@/i18n/dictionary";
import { intlLocale, type Locale } from "@/config/site";

export type Update = Dictionary["updates"]["items"][number];

/**
 * Placeholder posts from messages/*.json. When this becomes a blog, swap this
 * function for one that reads MDX frontmatter (slug, date, title, excerpt)
 * from src/content/updates/<locale>/*.mdx. Components only depend on `Update`.
 */
export function getUpdates(t: Dictionary): Update[] {
  return [...t.updates.items].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
