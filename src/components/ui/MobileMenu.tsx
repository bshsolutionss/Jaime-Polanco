"use client";

import { useEffect, useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Props = {
  links: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
  navLabel: string;
};

export function MobileMenu({ links, openLabel, closeLabel, navLabel }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-md text-ink hover:bg-mist"
      >
        <Icon name={open ? "close" : "menu"} className="size-6" />
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
      </button>

      <nav
        id={panelId}
        aria-label={navLabel}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-rule bg-paper shadow-[0_12px_24px_-16px_rgb(6_20_42/0.35)]"
      >
        <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
          {links.map((link) => (
            <li key={link.href} className="border-b border-rule last:border-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-serif text-xl text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
