# Feature: cybercore-portfolio

## Objective
Personal developer portfolio for Maximiliano González: Next.js (App Router) + TypeScript + Tailwind CSS v4, static export, cybercore "Terminal / Hacker" visual direction (phosphor green + amber), light/dark mode.

## Problem / Why
The user needs a professional portfolio deployable for free (GitHub Pages / Vercel / Netlify), with all copy editable from one data file and the palette editable from a few base color variables whose variations/gradients derive automatically.

## Scope
- Sections: hero, about, experience (timeline), featured projects, skills, education, contact (mailto/LinkedIn/GitHub, no backend form).
- All copy in `src/content/es.ts`, typed by `src/content/types.ts`; `getContent(locale)` ready to add `en`.
- Palette: base colors in `src/styles/theme.css`; every shade, glow and gradient derived via `color-mix()`.
- SEO: title, meta description, Open Graph.
- Accessibility: semantic HTML, AA contrast, keyboard nav, skip link, `prefers-reduced-motion`.
- Deploy instructions + GitHub Pages workflow.

## Constraints
- Do not invent data, metrics, projects or links; use visible `[COMPLETAR]` placeholders.
- Never publish the phone number.
- Work projects have no demo/repo links; `links` is optional for future personal projects.
- Employer "Kronogram" name editable in one place (may become "Plhain (ex Kronogram)").
- Node 22 via nvm (system default is v16; Next requires >= 20.9).
- Artifacts (code, comments) in English; UI copy in Spanish.

## TDD
- Mode: strict (source: user global config "Strict TDD Mode: enabled").
- Runner: Vitest + Testing Library (`npm test`).

## Delivery
- Strategy: ask-on-risk. Forecast exceeds ~400 lines (greenfield scaffold); single-author new repo, no PR yet, work-unit commits on `feat/cybercore-portfolio`.

## Tasks
- [ ] T1 Scaffold Next.js + TS + Tailwind v4 + Vitest, static export config — route: delegated writer (2+ non-trivial files)
- [ ] T2 Theme tokens (`theme.css`) with derived variations + global cybercore effects — route: delegated writer
- [ ] T3 Content model (`types.ts`, `es.ts`, `index.ts`) with tests — route: delegated writer
- [ ] T4 UI primitives + sections with tests — route: delegated writer
- [ ] T5 SEO metadata, OG image, theme toggle (no flash) — route: delegated writer
- [ ] T6 README with deploy instructions + GitHub Pages workflow — route: delegated writer

## Acceptance criteria
- `npm run build` produces static `out/`; `npm test`, `npm run lint`, `tsc --noEmit` pass.
- Changing `--c-accent` in `theme.css` changes all accent shades/glows/gradients.
- No phone number anywhere; no links on work project cards.

## Progress / Evidence
_(pending)_

## Next step
T1 via delegated writer.
