# `git read-tree`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Reads tree information into the index
## Syntax
```text
git read-tree [(-m [--trivial] [--aggressive] | --reset | --prefix=)
[-u | -i]] [--index-output=] [--no-sparse-checkout]
(--empty |  [ []])
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-read-tree.html](../../public/git-docs/git-read-tree.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-read-tree/2.56.0.html).

Reads the tree information given by <tree-ish> into the index,
but does not actually update any of the files it "caches". (see:
git-checkout-index(1))

Optionally, it can merge a tree into the index, perform a
fast-forward (i.e. 2-way) merge, or a 3-way merge, with the -m
flag.  When used with -m, the -u flag causes it to also update
the files in the work tree with the result of the merge.

Only trivial merges are done by git read-tree itself.  Only conflicting paths
will be in an unmerged state when git read-tree returns.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.