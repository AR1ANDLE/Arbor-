# `git write-tree`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Create a tree object from the current index
## Syntax
```text
git write-tree [--missing-ok] [--prefix=/]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-write-tree.html](../../public/git-docs/git-write-tree.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-write-tree/2.56.0.html).

Creates a tree object using the current index. The name of the new
tree object is printed to standard output.

The index must be in a fully merged state.

Conceptually, git write-tree sync()s the current index contents
into a set of tree files.
In order to have that match what is actually in your directory right
now, you need to have done a git update-index phase before you did the
git write-tree.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.