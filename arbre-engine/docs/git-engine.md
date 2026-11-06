# ARBOR Git engine

Server-side service that runs the **real `git` binary** against disposable repositories and reports the
**confirmed** repository state. The 2D tree must only ever be driven by `RepoState`, never by what a command
"should" have done.

## Layout
| File | Responsibility |
|---|---|
| `src/services/git/registry.ts` | Single source of truth: every supported command, its flags, risk class, curriculum module, examples. |
| `src/services/git/parser.ts` | Shell-free tokenizer + allowlist validation → `argv` array. |
| `src/services/git/exec.ts` | Spawns git: `shell:false`, sanitized env, timeout, output cap. |
| `src/services/git/state.ts` | Reads branches, tags, commits (with parents), file states, stash, merge/rebase operation, conflicts. |
| `src/services/sandbox/sandbox.ts` | Per-session folders, serialized operations, file explorer API, reset, TTL cleanup, limits. |

## Supported commands (all tested against real git)
`init status config add commit diff log show branch switch checkout merge restore reset revert stash tag rm mv reflog cherry-pick`

`remote` and `push` are supported only for each session's private local bare remote. Add it with
`git remote add origin arbor-demo`; the engine maps that sentinel name to an isolated bare repository beside
the working tree. Arbitrary URLs and network transports remain blocked. `clone fetch pull`, rebase / interactive
rebase, `clean`, and `mergetool` remain unavailable.

## Risk classes
`informational` · `safe` · `history` (rewrites/moves references) · `destructive` (can discard work).
Computed per invocation, e.g. `git reset --hard` is destructive, `git reset --soft` is history,
`git restore --staged f` is safe, `git restore f` is destructive. `run(line, { requireConfirm: true })` refuses to
execute destructive commands until the caller re-sends with `confirmed: true`.

## Safety model
- No shell, ever: the line is tokenized in-process; `; & | < > $ ( ) \`` outside quotes are rejected.
- Only registry commands and flags pass. Global options (`-c`, `-C`, `--exec-path`) are rejected.
- Positionals reject absolute paths, `..` components, `.git` components, pathspec magic (`:`), backslashes.
- `config` is limited to `user.name`, `user.email`, `init.defaultBranch`, always `--local`.
- Forced config via environment: `core.hooksPath` points to a private, nonexistent per-session folder (hooks never run), `protocol.allow=never`,
  `user.useConfigOnly=true` (identity is never guessed), no system/global config, no prompts, no editor, no pager,
  `GIT_CEILING_DIRECTORIES` stops discovery above the session folder.
- Limits: 10 s timeout, 256 KB output, 256 KB per file, 200 files per session, 200 sessions, 30 min idle TTL.
- File API refuses traversal, `.git`, symlinks and binary reads. Session ids are 128-bit random hex.
- Every session has a queue: operations on one repository never run concurrently.
- `execGit`'s `bin` option exists only so tests can exercise the timeout with a slow process. It is not reachable
  from user input.

## Known limitations
- Process-level isolation only (separate folders, forced env, no shell). For hosted multi-user deployment, run the
  service in a container with a non-root user, read-only root filesystem and CPU/memory/pid limits (Phase 10).
- `RepoState.commits` is topologically ordered across all branches; use `head.sha` / parent links, not list
  position, to find a commit.
- Output is capped at 2000 commits per snapshot.

## Tests
`npm test` runs 62 tests, including real-git workflows (three areas, branching, fast-forward merge, a real
conflict and its resolution, merge --abort, reset/restore/stash/revert/tag/reflog, detached HEAD), 40 rejection
cases, path/symlink guards, limits, isolation, reset confirmation and TTL cleanup.
