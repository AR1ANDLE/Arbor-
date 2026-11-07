# `git show`
- **Category:** Inspection & comparison
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Show various types of objects
## Syntax
```text
git show [] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-show.html](../../public/git-docs/git-show.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-show/2.56.0.html).

Shows one or more objects (blobs, trees, tags and commits).

For commits it shows the log message and textual diff. It also
presents the merge commit in a special format as produced by
git diff-tree --cc.

For tags, it shows the tag message and the referenced objects.

For trees, it shows the names (equivalent to git ls-tree
with --name-only).

For plain blobs, it shows the plain contents.

Some options that git log command understands can be used to
control how the changes the commit introduces are shown.

This manual page describes only the most frequently used options.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.