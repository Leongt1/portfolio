<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Noel's HUD Portfolio - project guide

Personal portfolio for Noel George Thomas (full-stack dev, job-hunting) with a
tactical-shooter-HUD aesthetic - VALORANT-*inspired*, never cloned: no Riot
trademarks, logos, or copied layouts. The build spec is **`../PRD.md`** (design
tokens, section specs, seed content); `../ui-demos/` has reference screenshots.
Those live one directory up and may be absent if only this folder was cloned -
this file is self-sufficient for day-to-day work.

Deployed on Vercel from https://github.com/Leongt1/portfolio (the repo root is
THIS folder). Merge to `main` = production deploy.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

No test framework. Verification is done by driving the real app headlessly -
see "How to verify changes" below.

## Working agreements

- **Never commit directly to `main`.** The flow for every issue/task: create
  a branch (e.g. `fix/issue-1-contact-copy`), commit there, push the branch,
  open a PR with `gh pr create` (body ends with `Fixes #N` so the issue
  auto-closes). Noel reviews and merges the PR himself - merging is his
  approval step, so never merge or auto-merge a PR.
- **No Claude co-author trailers in commits.** Noel explicitly asked for this.
- **Never use em dashes or en dashes anywhere; use '-' instead.** Applies to
  site copy, code comments, docs, and commit messages.
- **Content lives in `data/*.ts`, never hardcoded in JSX.** Noel edits data,
  not markup.
- Dark theme only - never wire `prefers-color-scheme`.
- **Animations are always on for everyone**: `prefers-reduced-motion` is
  deliberately ignored site-wide (Noel's decision, 2026-07-07, issue #2 -
  trade-offs discussed and accepted). Do not add reduced-motion media
  queries or matchMedia checks back.

## Architecture

- Single-page scroll site: `app/page.tsx` composes Nav → Hero → Projects →
  Ticker → Experience → Skills → Education → Ticker(reversed) → Contact →
  Footer. Plus `/armory` (cursor-skin store), themed `not-found.tsx` /
  `error.tsx`, and two API routes.
- `data/` - profile, projects, experience, skills, education, cursors.
  Skills are `{ name, icon }` objects (icon: `IconType` from `react-icons` -
  Simple Icons `si` set, plus Tabler `tb` where Simple Icons has no entry:
  VS Code and PgAdmin). `Ticker.tsx` also consumes skills via `item.name`.
- `lib/` - likeStore (client), likesBackend + likeCookie (server).
- Client components only where needed: Nav, LikeButton, Reveal, CountUp,
  TiltCard, CursorProvider, Armory, ContactForm.
- Design tokens: Tailwind v4 `@theme` in `app/globals.css` (`--color-hud-*`);
  no tailwind.config. Fonts via `next/font/google`: Chakra Petch (display) +
  Share Tech Mono (HUD labels), exposed as `--font-display` / `--font-mono`.
- Signature CSS utilities in globals.css: `hud-clip`/`hud-clip-lg`/
  `hud-clip-btn` (clipped corners), `hud-btn` (white sweep hover;
  `hud-btn-inverse` = white base, red sweep), `hud-brackets`, `hud-underline`,
  `hud-reveal`+`Reveal.tsx`, `hud-boot` (hero stagger), `hud-ticker`,
  `hud-tilt`+`TiltCard.tsx`, `hud-grid-bg` (grid + scanline).

## Feature notes (how things actually work)

- **Like counter is server-authoritative** (`app/api/likes/route.ts`): count
  in Upstash Redis; "already liked" is a signed httpOnly cookie (`ngt_liked`,
  HMAC via `LIKE_COOKIE_SECRET`); POST reads no request body; per-IP rate
  limit 10/min. Dev without env vars uses an in-memory backend (full flow
  testable); prod without env vars → API reports unavailable and the client
  (`lib/likeStore.ts`) falls back to local-per-device mode. Two LikeButton
  instances (footer + floating pill in `app/layout.tsx`) share the store.
- **Cursor skins** are cosmetic-by-design (client-side only, tampering is
  harmless). `CursorProvider` sets `data-cursor-skin` + `--cursor-skin` on
  `<html>`; a rule in globals.css applies it to interactive elements so it
  overrides `cursor: pointer`. SVG cursors don't work in Safari (falls back
  to normal cursor - accepted). Skins carry `price` fields for a future
  credit system; if credits ever become "earned", ownership must move
  server-side.
- **Contact form** → Neon Postgres (`app/api/contact/route.ts`,
  `@neondatabase/serverless`, tagged-template = parameterized). The
  `contact_messages` table is auto-created on first insert. Honeypot field
  `company` (bots get fake success). Graceful 503 when `DATABASE_URL` unset.
  Chosen over Supabase because Neon free tier auto-wakes; Supabase free
  pauses whole projects after ~7 days idle.
- **Résumé**: `/resume` redirect in `next.config.ts` → Google Drive
  direct-download URL. Noel updates it via Drive "Manage versions" (same file
  ID, link never breaks) - never re-add a PDF to the repo. `RESUME_URL` env
  var overrides the baked-in link.

## Hard-won gotchas

- **`mask-image` on a container masks its children too.** The hero grid fade
  once made the whole hero content invisible. Grid + scanline live on
  `.hud-grid-bg::before/::after` pseudo-elements for exactly this reason.
- **Noel's Windows has reduced-motion ON system-wide.** Headless probes on
  this machine report `prefers-reduced-motion: reduce`. The site ignores
  that setting since 2026-07-07, so animations show for him and in default
  headless tests - no `emulateMediaFeatures` workaround needed anymore.
- **Tailwind v4 preflight gives buttons `cursor: default`** - globals.css has
  the `button { cursor: pointer }` fix; don't remove it.
- **Two `a[href="#projects"]` exist** (nav + hero CTA) - scope selectors
  (`main a[...]`) in tests.
- The eslint config forbids `setState` directly in effects
  (`react-hooks/set-state-in-effect`) - use `useSyncExternalStore` for
  external/localStorage state (see likeStore/CursorProvider pattern) or
  set state inside observer/event callbacks (see CountUp).
- **Simple Icons (react-icons `si`) has no VS Code or PgAdmin icons** -
  use Tabler's `TbBrandVscode` / `TbDatabaseCog` instead. Verify an icon
  export exists (grep `node_modules/react-icons/si/index.d.ts`) before
  importing; a missing export only fails at build-time type check.
- **`next dev` refuses to start if another instance owns port 3000** - a
  previous session's server can linger even after its task was stopped.
  Find it with the error message's PID and `taskkill /PID <pid> /F`, or
  just drive the existing server (it hot-reloads current code).

## How to verify changes (no test framework)

Drive the real app with puppeteer-core + the locally installed Edge -
`chromium-cli` is NOT available on this Windows machine, and Edge's bare
`--headless --screenshot` captures before animations/hydration settle
(useless for this site). Pattern that works:

```js
const puppeteer = require("puppeteer-core"); // npm i puppeteer-core in a scratch dir
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const b = await puppeteer.launch({ executablePath: edge, headless: "new", args: ["--disable-gpu"] });
// goto, wait ~1s, screenshot/evaluate
```

Start dev server in background, poll the port (don't sleep blindly). After UI
changes: screenshot and actually LOOK at it; also `npm run build && npm run lint`.

## Environment

`.env` (gitignored, exists locally; mirror in Vercel project settings):
`DATABASE_URL` (Neon), `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`,
`LIKE_COOKIE_SECRET`, optional `RESUME_URL`. `.env.example` documents them.
All backends were live-tested 2026-07-06; test data cleaned (likes reset to 0,
contact table emptied).

## Known TODOs

- Repo links for FinAI / Shepherd Pathways in `data/projects.ts` (or mark private).
- `metadataBase` + OG image in `app/layout.tsx` once the final Vercel URL is
  chosen (matters for LinkedIn link previews).
  `public/thumbs/portfolio-thumbnail.png` (hero screenshot) is committed but
  referenced nowhere yet - candidate for the OG image or a projects entry.
- Aim trainer (`// FIRING RANGE`, PRD §7.4) - optional phase 3, never built.
- Credit system for cursor skins (armory copy already teases it).
- Classified project slot awaits Noel's next project.
