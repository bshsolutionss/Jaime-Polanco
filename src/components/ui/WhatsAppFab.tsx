"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { whatsappHref } from "@/lib/links";

export function WhatsAppFab({ label, greeting }: { label: string; greeting: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('[aria-labelledby="hero-title"], #contacto, footer');
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const overlapping = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) overlapping.add(entry.target);
          else overlapping.delete(entry.target);
        }
        setHidden(overlapping.size > 0);
      },
      { threshold: 0.01 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappHref(greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`fab-pulse fixed bottom-5 right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white transition-opacity md:hidden ${
        hidden ? "pointer-events-none invisible opacity-0" : "visible opacity-100"
      }`}
    >
      <Icon name="whatsapp" className="size-7" />
    </a>
  );
}
