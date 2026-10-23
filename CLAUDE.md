@AGENTS.md

# Lilian Reyes site: architecture rules

Single-page bilingual (es/en) marketing site for a Florida paralegal and Notary Public.
It is also a **reusable template**: reskinning for another client must only touch config, messages and brand assets.

## Stack
- Next.js 16 (App Router, `cacheComponents` on), React 19, Tailwind v4, zod, pnpm.
- Read `node_modules/next/dist/docs/` before using a Next API. This version differs from older docs:
  `proxy.ts` replaces middleware, `next/root-params` gives the locale, `dynamicParams` is not allowed.

## Where things live
| What | Where |
|---|---|
| Business data (name, phone, WhatsApp, hours, area, social, logo paths, colors, service ids/categories) | `src/config/site.ts` |
| All visible text, per locale | `messages/es.json` (reference shape), `messages/en.json` |
| Logo, OG image | `public/brand/` (originals in `brand-source/`) |
| Sections (one per file) | `src/components/sections/` |
| Small shared UI | `src/components/ui/` |
| i18n loader | `src/i18n/dictionary.ts` |
| Locale redirect (`/` → `/es`, Spanish always default) | `src/proxy.ts` |
| Contact Server Action / schema | `src/actions/contact.ts`, `src/lib/contact-schema.ts` |
| SEO helpers (metadata, JSON-LD) | `src/lib/metadata.ts`, `src/lib/jsonld.ts` |

## Rules
1. **No hard-coded business text or hex colors in components.** Text comes from the dictionary (`t`), data from `siteConfig`, colors from Tailwind tokens (`ink`, `gold`, `gold-text`, `paper`, `mist`, `rule`, `muted`, `on-dark`, `whatsapp`, `error`) that map to `siteConfig.colors` via CSS variables.
2. Adding a message key: add it to `es.json` first, then `en.json`. A missing key in `en.json` fails `tsc`.
3. Adding a service: add the id to a category in `siteConfig.serviceCategories`, then `services.items.<id>` in both message files.
4. `NEXT_PUBLIC_IS_DEMO=true` means noindex/nofollow, robots disallow, and a "Demo preview" ribbon. `false` makes the site indexable.
5. Components stay small and typed. No `any`. No unused code.
6. Gold `#C9A24B` is for decoration or text on navy only. On light backgrounds use `text-gold-text` (AA).
7. Keep it mobile-first (375px). Keep one `h1` per page and ordered headings.

## Legal and compliance (do not weaken)
- Never use "notario", "notaria" or "notaría". Use "Notary Public" in Spanish too (Fla. Stat. s.117.05).
- Never offer "asesoría" or legal advice; services are document *preparation and organization*.
- No guarantees, testimonials, reviews, client counts, or government seals or logos.
- The footer bottom bar must keep the short notice: "not a law firm" plus the s.117.05 notary sentence in BOTH English and Spanish (`footer.legalLine` / `legalLineAlt`). Its TODO for attorney review sits in `Footer.tsx`.
- Copy for asylum, TPS, visas, adjustment of status and family petitions is flagged for attorney review (see `site.ts`).

## Design language: "the case folder", black and brass
The palette comes from the real logo (black) and the client's banner (brass gold on white): ink black, brass gold,
near-white paper and warm stone (`mist`) bands. Libre Caslon Text for headings, Hanken Grotesk for body text.
Recurring motifs, both taken from the logo: the diamond divider (`Ornament`) and the double ring (`SealRings`).
Shadows are ink-tinted tokens (`--shadow-soft`, `--shadow-lift`, `--shadow-deep`, `--shadow-gold`) defined in globals.css.

Motion (all of it is turned off under prefers-reduced-motion):
- Hero entrance: the headline lines rise in, the ornament draws, the portrait settles, and the gold seal presses on. It is transform-only, so it never delays paint.
- Scroll reveal: add the `reveal` class (optionally with `style={{ "--reveal-index": n }}` for a stagger). It is pure CSS (`animation-timeline: view()`) with no JS, so it cannot cause hydration mismatches. Never toggle classes on server-rendered elements from an effect.
- Hover: `btn-lift` / `btn-sheen` on buttons, and `card-lift` on cards.
- Ambient: slowly rotating seal rings, and a WhatsApp button pulse on mobile.

Don't add uppercase eyebrow labels, gradient washes, or identical card grids.

## Brand assets
The official logo is `brand-source/logo-real.jpeg` (black). The transparent version is
`logo-real-transparent.png`. Every web asset is generated from the transparent file, tinted to the
brand navy (`colors.ink`) or to white:
- `public/brand/mark.png` / `mark-light.png` hold the emblem only (LR circle, quill, stamp, scales). They are used in the header, the hero seal and the favicon.
- `public/brand/logo-full.png` / `logo-full-light.png` hold the full lockup with the wordmark. They are used in the footer and JSON-LD.
- `public/brand/og.png` is the white lockup on navy, 1200×630.
- `src/app/icon.png` / `apple-icon.png` are the emblem on the paper background.
- `public/brand/hero.jpg` is the hero portrait, cropped to 4:5 (original in `brand-source/heroimage.png`, with the Instagram tag icon cropped off).

The old gold-swoosh "LR" files in `brand-source/` (`logo.png`, `logo_bg_re.png`) are **not** the real logo. Don't use them.
To reskin, replace these files and update the sizes in `siteConfig.logo`.

## Checks before finishing
`pnpm build && pnpm lint && pnpm typecheck` must all pass with zero errors.
