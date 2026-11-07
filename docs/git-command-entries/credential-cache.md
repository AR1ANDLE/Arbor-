# `git credential-cache`
- **Category:** Setup & configuration
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Helper to temporarily store passwords in memory
## Syntax
```text
git config credential.helper 'cache []'
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-credential-cache.html](../../public/git-docs/git-credential-cache.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-credential-cache/2.56.0.html).

This command caches credentials for use by future Git programs.
The stored credentials are kept in memory of the cache-daemon
process (instead of being written to a file) and are forgotten after a
configurable timeout. Credentials are forgotten sooner if the
cache-daemon dies, for example if the system restarts. The cache
is accessible over a Unix domain socket, restricted to the current
user by filesystem permissions.

You probably don’t want to invoke this command directly; it is meant to
be used as a credential helper by other parts of Git. See
gitcredentials(7) or EXAMPLES below.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.