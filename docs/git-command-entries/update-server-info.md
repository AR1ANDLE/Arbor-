# `git update-server-info`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Syncing Repositories
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Update auxiliary info file to help dumb servers
## Syntax
```text
git update-server-info [-f | --force]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-update-server-info.html](../../public/git-docs/git-update-server-info.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-update-server-info/2.56.0.html).

A dumb server that does not do on-the-fly pack generations must
have some auxiliary information files in $GIT_DIR/info and
$GIT_OBJECT_DIRECTORY/info directories to help clients discover
what references and packs the server has.  This command
generates such auxiliary files.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.