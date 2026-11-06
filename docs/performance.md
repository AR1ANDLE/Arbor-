# Performance notes

The application uses an SVG tree and no longer loads Three.js, React Three Fiber, or WebGL. The tree has a fixed `viewBox` and the current UI snapshot is limited to 40 commits, keeping the number of SVG links and markers bounded.

## Build snapshot

Measured with the local production build on 2026-11-06:

- Landing/workspace route: 18.2 kB route JavaScript; 121 kB first-load JavaScript.
- Shared first-load JavaScript: 103 kB.
- The build completed successfully after the Next.js output-directory write permission was granted.

These are build output sizes, not Core Web Vitals. No production URL exists, so LCP, INP, CLS, FCP, and real-device performance have not been measured.

## Remaining work

- Measure Core Web Vitals on a deployed, correctly isolated environment.
- Profile large commit sets and dense branch histories before increasing the snapshot limit.
- Verify lower-powered phones and browser zoom with the SVG and terminal panels.
- Add caching only after considering per-session authorization and state freshness.
