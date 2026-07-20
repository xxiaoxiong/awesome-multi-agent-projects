# Deployment

The site is a static Astro build deployed from the repository root.

## Vercel settings

- Root Directory: `.`
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm build:site`
- Output Directory: `site/dist`
- Framework: Astro
- Runtime services: none

`vercel.json` contains the same configuration. Do not configure the root as `site/`; the build reads canonical data and scripts from the repository root.

## Local release check

```bash
pnpm install
pnpm validate
pnpm render
pnpm render:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build:site
```

## Production URL backfill

After Vercel returns and verifies a stable production alias, update `data/site.yaml`, `site/astro.config.ts`, `site/public/robots.txt`, README output through `pnpm render`, canonical/OG/JSON-LD values in the layout, and workflow smoke-test URLs. Rebuild, redeploy, and verify `/`, `/zh/`, `/projects`, one project page, one category page, sitemap, robots, and static assets.

Never claim deployment from a successful command alone. Inspect deployment state and issue HTTP checks against the stable alias.
