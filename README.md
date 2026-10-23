# Lilian Reyes Paralegal & Notary Services

Bilingual (es/en) one-page site. Next.js 16, Tailwind v4, pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev          # http://localhost:3000 → redirects to /es or /en
pnpm build && pnpm start
pnpm lint && pnpm typecheck
```

| Env var | Meaning |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical, hreflang, sitemap, OG and JSON-LD |
| `NEXT_PUBLIC_IS_DEMO` | `true` = noindex and "Demo preview" ribbon. `false` = indexable |

Architecture and content rules are in [CLAUDE.md](CLAUDE.md).
