# `git mktree`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Build a tree-object from ls-tree formatted text
## Syntax
```text
git mktree [-z] [--missing] [--batch]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-mktree.html](../../public/git-docs/git-mktree.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-mktree/2.56.0.html).

Reads standard input in non-recursive ls-tree output format, and creates
a tree object.  The order of the tree entries is normalized by mktree so
pre-sorting the input is not required.  The object name of the tree object
built is written to the standard output.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.