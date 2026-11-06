# Production release report

**Status: not released.** No Vercel project, production URL, deployment identifier, or production Git commit was supplied or verified. This document records the local implementation and verification performed on 2026-11-06; it is not a deployment claim.

## Local verification

- App TypeScript check: passed (`npm run typecheck`).
- App lint: passed (`npm run lint`).
- App production build: passed (`npm run build`).
- Git engine TypeScript check: passed (`npm run typecheck --prefix arbre-engine`).
- Git engine suite: passed, 62 tests (`npm test --prefix arbre-engine`).
- Local HTTP workflow: passed session creation, `git init`, `git add .`, commit creation, branch creation, and repository-state synchronization.
- Safety smoke check: destructive reset requested confirmation and left history unchanged; shell metacharacter input was rejected.

The first Windows smoke attempt found Git for Windows rejected the Win32 null-device global config path. The engine now uses a session-local global config path, and the workflow passed after rebuilding.

## Release blockers

- No authentication or session authorization.
- Process-local session registry and temporary repositories do not work across server restarts or multiple instances.
- No hardened worker/container isolation, CPU/memory/disk quotas, or public multi-user threat model.
- Local Git subprocess execution is not a verified Vercel serverless architecture.
- No production credentials, Vercel project, or monitoring configuration.
- Accessibility, browser journey, viewport matrix, security, and real-device performance audits remain incomplete.
- Linux engine verification and a full UI journey in a browser remain outstanding.

## Monitoring

There is no production monitoring configuration because there is no production deployment. Add health checks, structured logs, error reporting, and alerts only after the hosting and session architecture are selected.

## Tree layout and theme refinement — 2026-11-06

- Root causes: branch names previously mapped into a small repeated side/slot set; nested branch placement depended on alphabetical processing; labels used a fixed offset; the SVG painted a fixed cream panel and the growth layers used hardcoded light colors.
- Changes: deterministic candidate directions with sampled collision scoring; parent-ref-first placement; expanding-ring label and milestone placement; per-session persisted limb directions; bounds-aware SVG viewBox; pan, zoom, fit, and branch focus; mobile branch key; shared light/dark tree tokens and transparent SVG surface; a pre-paint theme preference script.
- Added 8 tree-layout tests for 2, 3, 5, 10, and 16 sibling refs, label and milestone separation, nested fork accuracy, cached layout stability, long branches, and merge ancestry; added 3 theme/responsive token checks.
- Browser inspection: checked light and dark appearance, active branch isolation, and widths 320, 375, 430, 640, 768, 1024, 1280, 1440, and 1920 pixels. `documentElement.scrollWidth` matched `clientWidth` at every size after removing a stale 320px minimum width. Desktop branch labels and the mobile scrollable branch key were visually reviewed.
- Remaining limits: no automated screenshot-diff suite or formal accessibility audit; geometry collision checks approximate Bézier curves with sampled line segments; very dense history can still need branch focus and zoom. The 40-commit UI cap remains.
