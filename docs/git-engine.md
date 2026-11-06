# Git engine

The app's API routes now call the separate `arbre-engine` package through `lib/sandbox.ts`. The adapter maps the engine's repository snapshot into the UI contract. Terminal input is parsed by the engine allowlist and passed to Git as an argument array; destructive commands ask for confirmation in the UI. New repositories receive a local learner identity so the first commit works without reading identity from the host.

The engine package's own documentation remains the source for its command registry, parser, process runner, and limitations. The application adapter has not yet been verified with a typecheck or browser journey. See [the audit](./arbre-engine-audit.md) for deployment and integration constraints.

The engine calls the installed `git` executable with `spawn` and `shell: false`, a fixed working directory, a ten-second timeout, and bounded output. The browser sends one command line; the server parser validates it against the registry and constructs the argument array. The browser cannot supply an executable name or raw arguments.

Every new playground receives starter text files but is not initialized until the learner runs `git init`. Initialization sets a sandbox-local author identity. Status, current branch, HEAD, branches, commit parents, recent commits, and tracked/untracked file names are queried from Git rather than simulated.

## Supported actions

The command guide reads from the same registry used for parsing, so availability and examples stay aligned. Current support includes init, status, config, add, commit, diff, log, show, branch, switch, checkout, merge, restore, reset, revert, stash, tag, remote, push, rm, mv, reflog, and cherry-pick. Remote access is limited to an isolated per-session bare repository; file reads and writes are separate sandbox APIs.

Mutating Git and file operations are serialized per playground session. An unsuccessful Git process returns an error response and its state is re-read where possible. A merge conflict is left in Git's real conflict state; no success animation is emitted.

## Current limits

The engine provides a private, per-session local bare remote for `git push` practice. Configure it with `git remote add origin arbor-demo`; arbitrary URLs, network transport, credentials, clone, fetch, and pull are not available. The prototype has no durable repository database, rebase, real-repository mode, or interactive conflict editor. Destructive commands require in-product confirmation. Tree growth events are emitted only after successful commands and are calculated from Git-confirmed snapshots.
