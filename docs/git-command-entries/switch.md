# `git switch`
- **Category:** Branching & merging
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Switch branches
## Syntax
```text
git switch [] [--no-guess]
git switch [] --detach []
git switch [] (-c|-C)  []
git switch [] --orphan
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-switch.html](../../public/git-docs/git-switch.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-switch/2.56.0.html).

Switch to a specified branch. The working tree and the index are
updated to match the branch. All new commits will be added to the tip
of this branch.

Optionally a new branch could be created with either -c, -C,
automatically from a remote branch of same name (see --guess), or
detach the working tree from any branch with --detach, along with
switching.

Switching branches does not require a clean index and working tree
(i.e. no differences compared to HEAD). The operation is aborted
however if the operation leads to loss of local changes, unless told
otherwise with --discard-changes or --merge.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.