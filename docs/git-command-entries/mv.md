# `git mv`
- **Category:** Basic snapshotting
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Move or rename a file, a directory, or a symlink
## Syntax
```text
git mv [-v] [-f] [-n] [-k]
git mv [-v] [-f] [-n] [-k] …​
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-mv.html](../../public/git-docs/git-mv.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-mv/2.56.0.html).

Move or rename a file, directory, or symlink.

In the first form, it renames <source>, which must exist and be either
a file, symlink or directory, to <destination>.
In the second form, <destination-directory> has to be an existing
directory; the given sources will be moved into this directory.

The index is updated after successful completion, but the change must still be
committed.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.