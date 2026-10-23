@AGENTS.md

# Jaime's Help Club site: architecture rules

Single-page bilingual (es/en) marketing site for a New Jersey Notary Public and document-assistance business.
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
4. Demo mode is the default when `NEXT_PUBLIC_IS_DEMO` is unset. Demo means noindex/nofollow, robots disallow, and a "Demo preview" ribbon. Set it to `false` only with a real `NEXT_PUBLIC_SITE_URL`; the app rejects the `example.com` placeholder in live mode.
5. Components stay small and typed. No `any`. No unused code.
6. Gold `#C9A24B` is for decoration or text on navy only. On light backgrounds use `text-gold-text` (AA).
7. Keep it mobile-first (375px). Keep one `h1` per page and ordered headings.

## Legal and compliance (do not weaken)
- Do not imply that the business is a government agency, law firm, or attorney, and do not offer legal advice or immigration consulting. Services are document preparation and organization.
- Because this site advertises notary services in English and Spanish, keep the New Jersey-required notary notice in both languages in the footer (`footer.legalLine` / `legalLineAlt`). Required English wording: “I am not an attorney licensed to practice law and may not give legal advice about immigration or any other legal matter or accept fees for legal advice.” See the [New Jersey Notary Public Manual](https://www.nj.gov/treasury/revenue/pdf/notarypublicmanual.pdf). Keep the Spanish translation aligned with that notice and have the business/attorney review it before launch.
- Keep the clear “not a government agency / not a law firm” notice. Do not add guarantees, testimonials, reviews, client counts, or government seals or logos.
- The privacy and terms pages are drafts; have the business and an attorney review them before launch.
- Copy for asylum, TPS, visas, adjustment of status and family petitions is flagged for attorney review (see `site.ts`).

## Design language: "the case folder", navy and amber
The palette comes from Jaime's logo: navy, amber, white and pale blue (`mist`) bands. Oswald for section headings and Inter for body text; the hero headline also uses Inter to keep the long bilingual copy balanced.
Recurring motifs, both taken from the logo: the diamond divider (`Ornament`) and the double ring (`SealRings`).
Shadows are ink-tinted tokens (`--shadow-soft`, `--shadow-lift`, `--shadow-deep`, `--shadow-gold`) defined in globals.css.

Motion (all of it is turned off under prefers-reduced-motion):
- Hero entrance: the headline lines rise in, the ornament draws, the portrait settles, and the gold seal presses on. It is transform-only, so it never delays paint.
- Scroll reveal: add the `reveal` class (optionally with `style={{ "--reveal-index": n }}` for a stagger). It is pure CSS (`animation-timeline: view()`) with no JS, so it cannot cause hydration mismatches. Never toggle classes on server-rendered elements from an effect.
- Hover: `btn-lift` / `btn-sheen` on buttons, and `card-lift` on cards.
- Ambient: slowly rotating seal rings, and a WhatsApp button pulse on mobile.

Don't add uppercase eyebrow labels, gradient washes, or identical card grids.

## Brand assets
The original brand files are in `brand-source/`; active site assets are in `public/brand/` and referenced from `src/config/site.ts`.
- `public/brand/jaime-logo.png` and `jaime-logo-light.png` are used on light and dark backgrounds.
- `public/brand/hero-jaime.jpg` is the hero portrait, cropped to 4:5 from `brand-source/heroimage.png`.
- `public/brand/og.png` is the social preview image; `src/app/icon.png` and `apple-icon.png` are the site icons.

The old “LR” logo files in `brand-source/` belong to the previous client and must not be used for Jaime's site.
To reskin, replace these files and update the sizes in `siteConfig.logo`.

## Checks before finishing
`pnpm build && pnpm lint && pnpm typecheck` must all pass with zero errors.
