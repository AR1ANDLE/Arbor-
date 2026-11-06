# Security notes

## Scope

This implementation is suitable only for local development and trusted, single-user evaluation. It is not safe to deploy as a public or multi-user service. There is no authentication or authorization, durable ownership model, CSRF/origin policy, per-client rate limit, or isolation between operating-system users. A random session identifier is not a substitute for authorization.

## Existing safeguards

- Git is invoked through `spawn` with `shell: false`; the server parser converts allowlisted command text to argument arrays.
- Commands and options are registry-allowlisted, paths are validated, and shell metacharacters are rejected.
- File operations are rooted in a generated temporary directory; traversal, `.git` paths, symlinks, binary reads, and oversized files are rejected.
- Git subprocesses have a timeout and bounded output.
- Git author identity is configured locally inside the disposable repository.
- Destructive commands require explicit confirmation.
- Per-session commands and file operations are serialized; sessions expire after three hours and the process limits active session count.

## Required before hosting

Add authentication and per-session authorization, same-origin/CSRF defenses, request and operation rate limits, concurrency serialization, hardened OS/container sandboxing, disk quotas, startup/shutdown cleanup, durable session ownership, structured audit logging, and security testing. Run Git under a low-privilege account with no ambient credentials. Do not mount real user repositories into the playground. Re-review the threat model before adding any real-repository feature.
