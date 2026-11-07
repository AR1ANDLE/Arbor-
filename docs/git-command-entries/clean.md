# `git clean`
- **Category:** Administration & maintenance
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Remove untracked files from the working tree
## Syntax
```text
git clean [-d] [-f] [-i] [-n] [-q] [-e ] [-x | -X] [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-clean.html](../../public/git-docs/git-clean.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-clean/2.56.0.html).

Cleans the working tree by recursively removing files that are not
under version control, starting from the current directory.

Normally, only files unknown to Git are removed, but if the -x
option is specified, ignored files are also removed. This can, for
example, be useful to remove all build products.

If any optional <pathspec>... arguments are given, only those paths
that match the pathspec are affected.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.