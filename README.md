# Jaime's Help Club & Digital Notary

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
| `NEXT_PUBLIC_SITE_URL` | Real public URL used for canonical, hreflang, sitemap, OG and JSON-LD before launch |
| `NEXT_PUBLIC_IS_DEMO` | Defaults to demo/noindex. Set to `false` only with a real `NEXT_PUBLIC_SITE_URL` |

Architecture and content rules are in [CLAUDE.md](CLAUDE.md).
