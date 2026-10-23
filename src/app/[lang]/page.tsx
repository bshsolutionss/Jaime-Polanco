import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, getDictionaryFor, getLocale, hasLocale } from "@/i18n/dictionary";
import { buildMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Steps } from "@/components/sections/Steps";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Updates } from "@/components/sections/Updates";
import { Contact } from "@/components/sections/Contact";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionaryFor(lang);
  return buildMetadata(lang, "", { title: t.meta.title, description: t.meta.description });
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getDictionary();

  return (
    <>
      <Hero t={t} />
      <TrustBar t={t} />
      <Services t={t} />
      <Steps t={t} />
      <About t={t} />
      <Faq t={t} />
      <Updates locale={locale} t={t} />
      <Contact locale={locale} t={t} />
    </>
  );
}
