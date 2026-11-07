# `git http-push`
- **Category:** Internal helpers
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Push objects over HTTP/DAV to another repository
## Syntax
```text
git http-push [--all] [--dry-run] [--force] [--verbose]   […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-http-push.html](../../public/git-docs/git-http-push.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-http-push/2.56.0.html).

Sends missing objects to the remote repository, and updates the
remote branch.

NOTE: This command is temporarily disabled if your libcurl
is older than 7.16, as the combination has been reported
not to work and sometimes corrupts the repository.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.