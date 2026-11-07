# `git diff-tree`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Compares the content and mode of blobs found via two tree objects
## Syntax
```text
git diff-tree [--stdin] [-m] [-s] [-v] [--no-commit-id] [--pretty]
[-t] [-r] [-c | --cc] [--combined-all-paths] [--root] [--merge-base]
[]  [] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-diff-tree.html](../../public/git-docs/git-diff-tree.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-diff-tree/2.56.0.html).

Compare the content and mode of blobs found via two tree objects.

If there is only one <tree-ish> given, the commit is compared with its parents
(see --stdin below).

Note that git diff-tree can use the tree encapsulated in a commit object.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.