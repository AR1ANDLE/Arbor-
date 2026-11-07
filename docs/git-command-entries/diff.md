# `git diff`
- **Category:** Basic snapshotting
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Show changes between commits, commit and working tree, etc
## Syntax
```text
git diff [] [] [--] […​]
git diff [] --cached [--merge-base] [] [--] […​]
git diff [] [--merge-base]  […​]  [--] […​]
git diff [] ... [--] […​]
git diff []
git diff [] --no-index [--]   […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-diff.html](../../public/git-docs/git-diff.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-diff/2.56.0.html).

Show changes between the working tree and the index or a tree, changes
between the index and a tree, changes between two trees, changes resulting
from a merge, changes between two blob objects, or changes between two
files on disk.

git diff [<options>] [--] [<path>...]

This form is to view the changes you made relative to
the index (staging area for the next commit).  In other
words, the differences are what you could tell Git to
further add to the index but you still haven’t.  You can
stage these changes by using git-add(1).

git diff [<options>] --no-index [--] <path> <path> [<pathspec>...]

This form is to compare the given two paths on the
filesystem.  You can omit the --no-index option when
running the command in a working tree controlled by Git and
at least one of the paths points outside the working tree,
or when running the command outside a working tree
controlled by Git. This form implies --exit-code. If both
paths point to directories, additional pathspecs may be
provided. These will limit the files included in the
difference. All such pathspecs must be relative as they
apply to both sides of the diff.

git diff [<options>] --cached [--merge-base] [<commit>] [--] [<pat
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.