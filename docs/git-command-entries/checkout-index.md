# `git checkout-index`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Copy files from the index to the working tree
## Syntax
```text
git checkout-index [-u] [-q] [-a] [-f] [-n] [--prefix=]
[--stage=|all]
[--temp]
[--ignore-skip-worktree-bits]
[-z] [--stdin]
[--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-checkout-index.html](../../public/git-docs/git-checkout-index.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-checkout-index/2.56.0.html).

Copies all listed files from the index to the working directory
(not overwriting existing files).
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.