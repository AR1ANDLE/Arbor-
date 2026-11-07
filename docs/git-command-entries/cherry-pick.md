# `git cherry-pick`
- **Category:** Patching & recovery
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Apply the changes introduced by some existing commits
## Syntax
```text
git cherry-pick [--edit] [-n] [-m ] [-s] [-x] [--ff]
[-S[]] …​
git cherry-pick (--continue | --skip | --abort | --quit)
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-cherry-pick.html](../../public/git-docs/git-cherry-pick.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-cherry-pick/2.56.0.html).

Given one or more existing commits, apply the change each one
introduces, recording a new commit for each.  This requires your
working tree to be clean (no modifications from the HEAD commit).

When it is not obvious how to apply a change, the following
happens:

The current branch and HEAD pointer stay at the last commit
successfully made.

The CHERRY_PICK_HEAD ref is set to point at the commit that
introduced the change that is difficult to apply, unless the
--no-commit option was given.

Paths in which the change applied cleanly are updated both
in the index file and in your working tree.

For conflicting paths, the index file records up to three
versions, as described in the "TRUE MERGE" section of
git-merge(1).  The working tree files will include
a description of the conflict bracketed by the usual
conflict markers <<<<<<< and >>>>>>>.

No other modifications are made.

See git-merge(1) for some hints on resolving such
conflicts.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.