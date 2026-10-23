import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, getDictionaryFor, getLocale, hasLocale } from "@/i18n/dictionary";
import { buildMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

// TODO(client+attorney): placeholder terms. Replace with reviewed text before launch.

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionaryFor(lang);
  return buildMetadata(lang, "/terms", { title: t.terms.title, description: t.terms.sections[0].p });
}

export default async function TermsPage() {
  const locale = await getLocale();
  const t = await getDictionary();
  return <LegalPage locale={locale} backLabel={t.common.backHome} {...t.terms} />;
}
