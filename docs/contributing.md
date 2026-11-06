# Contributing

1. Use Node.js 20.9 or newer and Git.
2. Install dependencies with `npm install`.
3. Keep Git execution in the server-side allowlisted service. Never add shell-string execution or accept a client-supplied repository path.
4. Validate inputs at API boundaries and surface operational failures instead of inventing success output.
5. Run `npm run typecheck`, `npm run lint`, and `npm run build` before submitting changes.

Keep the tree illustrative and the Git state authoritative. Document any capability that is intentionally local-only or not yet implemented.
