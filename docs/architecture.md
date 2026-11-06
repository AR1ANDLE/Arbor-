# Architecture

Arbor is a Next.js App Router application with a browser-based React interface and Node.js route handlers. The browser never invokes a shell. The server adapter passes user command text through the supplied engine's allowlist parser, then its process runner invokes Git with `shell: false`.

## Main areas

- `app/`: application shell, global styling, and typed HTTP route handlers.
- `components/playground.tsx`: playground workspace, terminal input parser, file editor, and learning/reference views.
- `components/tree-scene.tsx`: accessible SVG tree projection of commit parent links.
- `lib/sandbox.ts`: adapts the engine's temporary session manager, file operations, Git state, and command results to the app's types.
- `types/git.ts`: shared repository and Git-state contracts.

The `arbre-engine/` package contains the allowlisted Git engine used by the API routes through `lib/sandbox.ts`. See [the engine audit](./arbre-engine-audit.md) for capabilities, remaining integration gaps, and runtime constraints.

## Request flow

The browser creates a temporary playground with `POST /api/playground`, then uses the returned random session ID for state, file, and allowlisted action routes. After a successful Git operation, the API reads Git's current status, branch references, HEAD, commit history, and files. Only confirmed state is sent to the tree and inspector.

Sessions are process-local and stored under the operating system temporary directory. They are intentionally disposable; they are not a durable storage system or multi-instance session store.
