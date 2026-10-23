import { siteConfig } from "@/config/site";

export function whatsappHref(greeting: string): string {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(greeting)}`;
}

export const telHref = `tel:${siteConfig.phone.e164}`;
