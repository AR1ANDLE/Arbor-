# `git update-index`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Register file contents in the working tree to the index
## Syntax
```text
git update-index
[--add] [--remove | --force-remove] [--replace]
[--refresh] [-q] [--unmerged] [--ignore-missing]
[(--cacheinfo ,,)…​]
[--chmod=(+|-)x]
[--[no-]assume-unchanged]
[--[no-]skip-worktree]
[--[no-]ignore-skip-worktree-entries]
[--[no-]fsmonitor-valid]
[--ignore-submodules]
[--[no-]split-index]
[--[no-|test-|force-]untracked-cache]
[--[no-]fsmonitor]
[--really-refresh] [--unresolve] [--again | -g]
[--info-only] [--index-info]
[-z] [--stdin] [--index-version ]
[--show-index-version]
[--verbose]
[--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-update-index.html](../../public/git-docs/git-update-index.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-update-index/2.56.0.html).

Modifies the index. Each file mentioned is updated into the index and
any unmerged or needs updating state is cleared.

See also git-add(1) for a more user-friendly way to do some of
the most common operations on the index.

The way git update-index handles files it is told about can be modified
using the various options:
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.