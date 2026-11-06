# Arbor — the living Git playground

Arbor is a local-first learning playground that runs real Git commands in temporary repositories and pairs them with an accessible 2D tree. Commit markers and parent links are based on repository history; Git remains the source of truth.

## Run locally

Requirements: Node.js 20.9 or newer and Git available on `PATH`.

```powershell
npm install
npm run dev
```

Open the local address printed by Next.js. The first visit creates a temporary repository in the operating system's temporary directory. Playground files and history are removed when the session is reset or expires after three hours.

## What works today

- An isolated, real Git repository per playground session.
- A server-side allowlist of Git operations drawn from the engine registry, including staging, history inspection, branches, merges, undo tools, stashes, and tags.
- A text file explorer/editor whose files live in the sandbox working directory.
- An event-driven SVG tree: init plants roots, commits extend wood, branches create limbs, merges graft actual parents, and only pushed commits grow leaves.
- A small command guide and introductory learning path.
- Light/dark appearance, responsive layout, keyboard terminal history, and reduced-motion styling.

The current application is a local learning prototype, not a hosted multi-user Git service. It supports a private, per-session bare remote for `git push` practice; arbitrary network remotes, credentials, `pull`, authentication, durable user accounts, full conflict editing, server-backed learning progress, real-workspace access, and a completed WCAG audit are not implemented. Public deployment still needs a different session and isolation architecture. See [docs/arbre-engine-audit.md](./docs/arbre-engine-audit.md), [docs/security.md](./docs/security.md), and [docs/deployment.md](./docs/deployment.md) before exposing it beyond a trusted local machine.

## Useful commands

```powershell
npm run dev
npm run typecheck
npm run lint
npm run build
npm start
```

## Documentation

- [Architecture](./docs/architecture.md)
- [Engine audit](./docs/arbre-engine-audit.md)
- [Design system](./docs/design-system.md)
- [Git engine](./docs/git-engine.md)
- [Tree visualization](./docs/tree-visualization.md)
- [Tree layout and themes](./docs/tree-layout.md)
- [2D tree rendering](./docs/2d-tree-rendering.md)
- [Git playground](./docs/git-playground.md)
- [Learning system](./docs/learning-system.md)
- [Command reference](./docs/command-reference.md)
- [Security](./docs/security.md)
- [Accessibility](./docs/accessibility.md)
- [Deployment](./docs/deployment.md)
- [Performance](./docs/performance.md)
- [Production release report](./docs/production-release-report.md)
- [Contributing](./docs/contributing.md)
