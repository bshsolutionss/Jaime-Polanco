import type { MetadataRoute } from "next";
import { locales, siteConfig } from "@/config/site";

const paths = ["", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.3,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])),
      },
    })),
  );
}
