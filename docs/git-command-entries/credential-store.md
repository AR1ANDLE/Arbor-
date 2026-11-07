# `git credential-store`
- **Category:** Setup & configuration
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Helper to store credentials on disk
## Syntax
```text
git config credential.helper 'store []'
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-credential-store.html](../../public/git-docs/git-credential-store.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-credential-store/2.56.0.html).

Note

Using this helper will store your passwords unencrypted on disk,
protected only by filesystem permissions. If this is not an acceptable
security tradeoff, try git-credential-cache(1), or find a helper
that integrates with secure storage provided by your operating system.

This command stores credentials indefinitely on disk for use by future
Git programs.

You probably don’t want to invoke this command directly; it is meant to
be used as a credential helper by other parts of git. See
gitcredentials(7) or EXAMPLES below.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.