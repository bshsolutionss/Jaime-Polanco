import "server-only";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { locales, type Locale } from "@/config/site";
import type es from "../../messages/es.json";

// es.json is the reference shape: a key missing from en.json fails the type check.
export type Dictionary = typeof es;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("../../messages/es.json").then((m) => m.default),
  en: () => import("../../messages/en.json").then((m) => m.default),
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/** For contexts without root params (generateMetadata, sitemap). */
export function getDictionaryFor(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export async function getDictionary(): Promise<Dictionary> {
  return getDictionaryFor(await getLocale());
}
