# `git fetch-pack`
- **Category:** Sharing & updating
- **Git help group:** Low-level Commands / Syncing Repositories
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Receive missing objects from another repository
## Syntax
```text
git fetch-pack [--all] [--quiet|-q] [--keep|-k] [--thin] [--include-tag]
[--upload-pack=]
[--depth=] [--no-progress]
[-v]  […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-fetch-pack.html](../../public/git-docs/git-fetch-pack.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-fetch-pack/2.56.0.html).

Usually you would want to use git fetch, which is a
higher level wrapper of this command, instead.

Invokes git-upload-pack on a possibly remote repository
and asks it to send objects missing from this repository, to
update the named heads.  The list of commits available locally
is found out by scanning the local refs/ hierarchy and sent to
git-upload-pack running on the other end.

This command degenerates to download everything to complete the
asked refs from the remote side when the local side does not
have a common ancestor commit.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.