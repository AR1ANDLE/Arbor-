# `git restore`
- **Category:** Basic snapshotting
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Restore working tree files
## Syntax
```text
git restore [] [--source=] [--staged] [--worktree] [--] …​
git restore [] [--source=] [--staged] [--worktree] --pathspec-from-file= [--pathspec-file-nul]
git restore (-p|--patch) [] [--source=] [--staged] [--worktree] [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-restore.html](../../public/git-docs/git-restore.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-restore/2.56.0.html).

Restore specified paths in the working tree with some contents from a
restore source. If a path is tracked but does not exist in the restore
source, it will be removed to match the source.

The command can also be used to restore the content in the index with
--staged, or restore both the working tree and the index with
--staged --worktree.

By default, if --staged is given, the contents are restored from HEAD,
otherwise from the index. Use --source to restore from a different commit.

See "Reset, restore and revert" in git(1) for the differences
between the three commands.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.