"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

export type ServiceTabData = {
  id: string;
  icon: IconName;
  label: string;
  note: string;
  countLabel: string;
  items: { id: string; name: string; desc: string; askHref: string }[];
};

type Props = {
  tabs: ServiceTabData[];
  label: string;
  askLabel: string;
  newTabLabel: string;
  showAllLabel: string;
  showLessLabel: string;
};

// On phones, long categories show this many cards until "show all" is pressed.
const MOBILE_PREVIEW = 6;

/**
 * WAI-ARIA tabs with automatic activation. Stacked on phones, a row of cards from `sm` up.
 * All panels stay in the HTML so every service is crawlable.
 */
export function ServiceTabs({ tabs, label, askLabel, newTabLabel, showAllLabel, showLessLabel }: Props) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  function activate(index: number) {
    setActive(index);
    setExpanded(false);
  }

  function select(index: number) {
    const next = (index + tabs.length) % tabs.length;
    activate(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    // Left/Right for the row layout, Up/Down for the stacked phone layout.
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select(keys[e.key]);
  }

  return (
    <div className="reveal mt-12">
      <div role="tablist" aria-label={label} className="grid gap-2.5 sm:grid-cols-3 sm:gap-4">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(i)}
              onKeyDown={onKeyDown}
              className={`group relative flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300 sm:flex-col sm:items-start sm:gap-5 sm:p-6 ${
                selected
                  ? "on-dark border-ink-deep bg-ink-deep text-white shadow-[var(--shadow-deep)]"
                  : "border-rule bg-white text-ink shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[var(--shadow-lift)]"
              }`}
            >
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-full ring-1 transition-colors ${
                  selected ? "bg-white/5 text-gold ring-gold/70" : "bg-mist text-gold-text ring-rule group-hover:ring-gold/60"
                }`}
              >
                <Icon name={tab.icon} className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-[1.15rem] leading-snug sm:text-xl">{tab.label}</span>
                <span className={`mt-1 block text-sm ${selected ? "text-gold" : "text-muted"}`}>{tab.countLabel}</span>
              </span>
              {selected && <Icon name="check" className="size-5 shrink-0 text-gold sm:hidden" />}
              {/* Pointer toward the open panel (row layout only) */}
              {selected && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-10 hidden size-4 rotate-45 bg-ink-deep sm:block"
                />
              )}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          tabIndex={0}
          hidden={i !== active}
          className="panel-in mt-6 rounded-2xl sm:mt-8"
        >
          <div className="flex items-start gap-3 border-l-2 border-gold pl-4 sm:items-center">
            <p className="max-w-[62ch] font-serif text-lg italic leading-relaxed text-muted">{tab.note}</p>
          </div>

          <ul id={`${baseId}-list-${tab.id}`} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {tab.items.map((item, n) => (
              <li
                key={item.id}
                className={`card-in ${!expanded && n >= MOBILE_PREVIEW ? "max-sm:hidden" : ""}`}
                style={{ "--card-delay": `${Math.min(n, 8) * 45}ms` } as CSSProperties}
              >
                <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-white p-5 sm:p-6">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                  <div className="flex items-start gap-3">
                    <svg aria-hidden="true" viewBox="0 0 10 10" className="mt-2 size-2 shrink-0 fill-gold">
                      <path d="M5 0 10 5 5 10 0 5Z" />
                    </svg>
                    <h3 className="font-sans text-[1.05rem] font-semibold leading-snug text-ink">{item.name}</h3>
                  </div>
                  <p className="mt-2 pl-5 text-[0.97rem] leading-relaxed text-muted">{item.desc}</p>
                  <a
                    href={item.askHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start pl-5 pt-5 text-sm font-semibold text-gold-text transition-colors hover:text-ink"
                  >
                    <Icon name="whatsapp" className="size-4" />
                    <span className="underline decoration-gold/50 underline-offset-4 group-hover:decoration-gold">
                      {askLabel}
                    </span>
                    <span className="sr-only">
                      : {item.name} {newTabLabel}
                    </span>
                  </a>
                </article>
              </li>
            ))}
          </ul>

          {tab.items.length > MOBILE_PREVIEW && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`${baseId}-list-${tab.id}`}
              onClick={() => setExpanded((v) => !v)}
              className="btn-lift mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-ink/70 bg-white font-semibold text-ink sm:hidden"
            >
              {expanded ? showLessLabel : showAllLabel.replace("{n}", String(tab.items.length))}
              <Icon name="plus" className={`size-4 transition-transform ${expanded ? "rotate-45" : ""}`} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
