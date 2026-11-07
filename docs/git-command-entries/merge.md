# `git merge`
- **Category:** Branching & merging
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Join two or more development histories together
## Syntax
```text
git merge [-n] [--stat] [--compact-summary] [--no-commit] [--squash] [--[no-]edit]
[--no-verify] [-s ] [-X ] [-S[]]
[--[no-]allow-unrelated-histories]
[--[no-]rerere-autoupdate] [-m ] [-F ]
[--into-name ] […​]
git merge (--continue | --abort | --quit)
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-merge.html](../../public/git-docs/git-merge.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-merge/2.56.0.html).

Incorporates changes from the named commits (since the time their
histories diverged from the current branch) into the current
branch.  This command is used by git pull to incorporate changes
from another repository and can be used by hand to merge changes
from one branch into another.

Assume the following history exists and the current branch is
master:

A---B---C topic
/
D---E---F---G master

Then git merge topic will replay the changes made on the
topic branch since it diverged from master (i.e., E) until
its current commit (C) on top of master, and record the result
in a new commit along with the names of the two parent commits and
a log message from the user describing the changes. Before the operation,
ORIG_HEAD is set to the tip of the current branch (G).

A---B---C topic
/         \
D---E---F---G---H master

A merge stops if there’s a conflict that cannot be resolved
automatically or if --no-commit was provided when initiating the
merge. At that point you can run git merge --abort or git merge
--continue.

git merge --abort will abort the merge process and try to reconstruct
the pre-merge state. However, if there were uncommitted changes when the
merge started (and especia
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.