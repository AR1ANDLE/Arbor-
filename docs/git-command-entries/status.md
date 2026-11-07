# `git status`
- **Category:** Basic snapshotting
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Show the working tree status
## Syntax
```text
git status [] [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-status.html](../../public/git-docs/git-status.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-status/2.56.0.html).

Displays paths that have differences between the index file and the
current HEAD commit, paths that have differences between the working
tree and the index file, and paths in the working tree that are not
tracked by Git (and are not ignored by gitignore(5)). The first
are what you would commit by running git commit; the second and
third are what you could commit by running git add before running
git commit.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.