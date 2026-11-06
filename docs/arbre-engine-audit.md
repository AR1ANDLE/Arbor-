# ARBOR engine and application audit

Audit date: 2026-11-06. Sources reviewed: the `Arbor.zip` application and the separate `arbor-git-engine.zip` package supplied with the project.

## Executive summary

The application is a Next.js 15 / React 19 / TypeScript prototype. It already runs real Git commands in temporary repositories and has a small editor, command terminal, lesson checks, command guide, settings, and responsive layouts. `lib/sandbox.ts` now adapts the supplied engine to the application's state contract.

The separate `arbre-engine` directory is a more complete Git command and sandbox package. It contains an allowlisted command registry, shell-free parser, bounded Git process runner, repository-state reader, isolated temporary sessions, and file operations. It does not contain a tree layout or renderer API. The supplied package is therefore a Git engine, not an existing botanical Arbre visualization engine. The application API routes use it through `lib/sandbox.ts`.

The application renders an event-driven 2D SVG tree. It starts as empty ground, plants roots on successful init, starts a leafless trunk at the first commit, adds limbs for branch refs, grafts real merge parents, and grows leaves only for commits published to the session's private local remote. Geometry and selectable commit markers derive from Git refs and hashes.

## Website architecture

- Next.js App Router with a single workspace route at `app/page.tsx`.
- `components/playground.tsx` contains the workspace, settings, command reference, and three introductory lesson checks.
- `app/api/playground/**` exposes create, read, reset, file, and action routes in the Node.js runtime.
- `lib/sandbox.ts` adapts the Git engine's parser, sandbox manager, state, and file API to the application's HTTP contracts.
- `types/git.ts` defines the state consumed by the current user interface.
- `components/tree-scene.tsx` is the shared tree renderer.
- Styling is centralized in `app/globals.css`; the interface is being aligned to the supplied warm retro editorial reference.

The app has no authentication, database, external API, durable accounts, or multi-instance session store. Browser local storage stores the temporary session identifier, theme, and lesson answers. Server memory owns session lookup; temporary working directories hold the repositories.

## Supplied Git engine capabilities

Reviewed public modules:

- `src/services/git/registry.ts`: supported commands, flags, examples, and risk classification.
- `src/services/git/parser.ts`: tokenizer and allowlist validation, including rejection of shell metacharacters and unsafe paths.
- `src/services/git/exec.ts`: `spawn` with `shell: false`, environment restrictions, timeout, and output cap.
- `src/services/git/state.ts`: branch, tag, commit ancestry, file status, stash count, in-progress operation, and conflict state.
- `src/services/sandbox/sandbox.ts`: queued per-session operations, file list/read/write/remove/rename, reset confirmation, TTL cleanup, and session limits.

The engine supports init, status, config, add, commit, diff, log, show, branch, switch, checkout, merge, restore, reset, revert, stash, tag, remote, push, rm, mv, reflog, and cherry-pick. `remote` and `push` are restricted to a session-local bare repository; network remotes and credentials are not supported. Rebase and other listed omissions remain unavailable. The included `tests/git-engine.test.ts` suite passes all 62 tests.

## Integration requirements and risks

1. Extend the UI state contract to expose detached HEAD, tags, stash, merge/rebase operation, and conflict details already available from `RepoState`.
2. Keep the parser boundary server-side. The browser sends a command line; only registry-approved tokens become Git arguments.
3. Destructive commands now require an explicit browser confirmation and are re-submitted with a confirmation flag.
4. The adapter preserves queued operations, file limits, and session TTL from the engine.
5. Reset and expiry should clear browser references if a server reset or sweep invalidates a session.
6. The engine now points Git at a session-local global config path, removes the POSIX-only askpass path, and selects a platform-specific editor no-op. A local Windows smoke check found and fixed the null-device incompatibility; Linux verification remains outstanding.
7. Keep the renderer independent from Git internals. It accepts the UI's typed repository snapshot, uses parent hashes for graph links, and provides a text alternative.
8. Add application-level engine integration tests and Windows plus Linux verification; package tests alone do not validate the HTTP adapter.

## Rendering and performance

The new renderer is native SVG and uses a fixed `viewBox`, so it scales without WebGL, a graphics context, camera controls, or device-specific 3D behavior. Each commit marker is keyboard-operable and labels its commit. Parent links use commit hashes. The current service exposes at most 40 commits; if the adapter exposes the engine's 2,000-commit snapshot, the renderer will need a visible-history limit or virtualization strategy and a corresponding textual history view.

The botanical silhouette is illustrative; branch layout is a readable projection of Git history, not a claim that every commit corresponds to a literal botanical growth event. Merge commits can have multiple parent links.

## Deployment and security

The existing security notes correctly classify the app as a local, trusted, single-user prototype. It has no authentication, authorization, CSRF/origin policy, rate limit, durable session ownership, container isolation, or multi-instance session coordination. Temporary directories and a random session identifier are not sufficient isolation for public service. The supplied engine also explicitly describes process-level isolation only.

No Vercel project or production credentials were supplied. Vercel deployment is not validated and should not be attempted until the architecture is changed for serverless execution and public multi-user isolation. Local subprocess Git execution with process-memory sessions is not a production Vercel design.

## Recommended sequence

1. Finish the retro design tokens and accessible responsive shell.
2. Validate the SVG renderer against real commit/branch/merge histories.
3. Expand the adapter's state contract and the user interface to use the engine's full verified repository state.
4. Verify the engine and adapter on Windows and Linux.
5. Expand the Academy and command reference from tested engine capabilities, with exercises that verify actual Git state.
6. Design authentication, worker isolation, quotas, observability, and persistence before choosing a public deployment target.
7. Run accessibility, responsive, security, and production tests; document measured results rather than inferred claims.
