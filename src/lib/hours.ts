import { intlLocale, siteConfig, type Locale } from "@/config/site";

const dayIndex = { Mo: 0, Tu: 1, We: 2, Th: 3, Fr: 4, Sa: 5, Su: 6 } as const;

// 2024-01-01 was a Monday, so day offsets map to weekday names.
const weekday = (code: keyof typeof dayIndex, locale: Locale) =>
  new Intl.DateTimeFormat(intlLocale[locale], { weekday: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(2024, 0, 1 + dayIndex[code])),
  );

const time = (hhmm: string, locale: Locale) => {
  const [h, m] = hhmm.split(":").map(Number);
  return new Intl.DateTimeFormat(intlLocale[locale], { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(
    new Date(Date.UTC(2024, 0, 1, h, m)),
  );
};

/** Human-readable rows from siteConfig.hours, e.g. "lunes a viernes" / "9:00 a. m. – 6:00 p. m.". */
export function formatHours(locale: Locale, rangeWord: string) {
  return siteConfig.hours.map((h) => {
    const first = weekday(h.days[0], locale);
    const last = weekday(h.days[h.days.length - 1], locale);
    const days = h.days.length > 1 ? `${first} ${rangeWord} ${last}` : first;
    return {
      days: days.charAt(0).toUpperCase() + days.slice(1),
      time: `${time(h.opens, locale)} – ${time(h.closes, locale)}`,
    };
  });
}
