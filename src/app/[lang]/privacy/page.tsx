import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, getDictionaryFor, getLocale, hasLocale } from "@/i18n/dictionary";
import { buildMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

// TODO(client+attorney): placeholder policy. Replace with reviewed text before launch.

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionaryFor(lang);
  return buildMetadata(lang, "/privacy", { title: t.privacy.title, description: t.privacy.sections[0].p });
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const t = await getDictionary();
  return <LegalPage locale={locale} backLabel={t.common.backHome} {...t.privacy} />;
}
