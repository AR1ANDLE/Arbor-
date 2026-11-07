# `git revert`
- **Category:** Patching & recovery
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Revert some existing commits
## Syntax
```text
git revert [--[no-]edit] [-n] [-m ] [-s] [-S[]] …​
git revert (--continue | --skip | --abort | --quit)
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-revert.html](../../public/git-docs/git-revert.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-revert/2.56.0.html).

Given one or more existing commits, revert the changes that the
related patches introduce, and record some new commits that record
them.  This requires your working tree to be clean (no modifications
from the HEAD commit).

Note: git revert is used to record some new commits to reverse the
effect of some earlier commits (often only a faulty one).  If you want to
throw away all uncommitted changes in your working directory, you
should see git-reset(1), particularly the --hard option.  If
you want to extract specific files as they were in another commit, you
should see git-restore(1), specifically the --source
option. Take care with these alternatives as
both will discard uncommitted changes in your working directory.

See "Reset, restore and revert" in git(1) for the differences
between the three commands.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.