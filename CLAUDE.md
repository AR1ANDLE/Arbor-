# ARBOR project notes

Read `README.md`, `docs/architecture.md`, `docs/security.md`, and `docs/arbre-engine-audit.md` before changing core behavior.

- Keep Git command execution on the server. Use the registry parser and engine API; never run user input through a shell.
- Keep the tree genuinely 2D. Map markers and links from actual commit hashes and parent relationships.
- Preserve keyboard access, text alternatives, visible focus, reduced motion, and responsive behavior.
- Keep temporary session ownership and the public-deployment limitations explicit. Do not add real-repository access without a separate security design.
- Update the command reference from the engine registry rather than duplicating command availability by hand.
- Run `npm run typecheck`, `npm run lint`, `npm run build`, and, when changing the engine, `npm test --prefix arbre-engine` plus `npm run typecheck --prefix arbre-engine`.

The product has not been deployed. Do not state that a Vercel deployment, WCAG audit, or public multi-user service is complete unless it has been verified and the release report updated.
