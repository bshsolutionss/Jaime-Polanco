"use client";

import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/config/site";

type Props = {
  current: Locale;
  label: string;
  names: Record<Locale, string>;
};

export function LangSwitch({ current, label, names }: Props) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <ul aria-label={label} className="flex items-center rounded-md border border-rule text-sm font-semibold">
      {locales.map((l) => (
        <li key={l}>
          <a
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={l === current ? "true" : undefined}
            className={`grid h-10 min-w-11 place-items-center px-2 uppercase ${
              l === current ? "bg-ink text-white" : "text-muted hover:text-ink"
            } first:rounded-l-[5px] last:rounded-r-[5px]`}
          >
            <span aria-hidden="true">{l}</span>
            <span className="sr-only">{names[l]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
