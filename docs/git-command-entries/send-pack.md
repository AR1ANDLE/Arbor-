# `git send-pack`
- **Category:** Sharing & updating
- **Git help group:** Low-level Commands / Syncing Repositories
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Push objects over Git protocol to another repository
## Syntax
```text
git send-pack [--mirror] [--dry-run] [--force]
[--receive-pack=]
[--verbose] [--thin] [--atomic]
[--[no-]signed | --signed=(true|false|if-asked)]
[:] (--all | …​)
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-send-pack.html](../../public/git-docs/git-send-pack.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-send-pack/2.56.0.html).

Usually you would want to use git push, which is a
higher-level wrapper of this command, instead. See git-push(1).

Invokes git-receive-pack on a possibly remote repository, and
updates it from the current repository, sending named refs.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.