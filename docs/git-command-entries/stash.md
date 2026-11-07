# `git stash`
- **Category:** Patching & recovery
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Stash the changes in a dirty working directory away
## Syntax
```text
git stash list []
git stash show [-u | --include-untracked | --only-untracked] [] []
git stash drop [-q | --quiet] []
git stash pop [--index] [-q | --quiet] []
git stash apply [--index] [-q | --quiet] [--label-ours=] [--label-theirs=] [--label-base=] []
git stash branch  []
git stash [push] [-p | --patch] [-S | --staged] [-k | --[no-]keep-index] [-q | --quiet]
[-u | --include-untracked] [-a | --all] [(-m | --message) ]
[--pathspec-from-file= [--pathspec-file-nul]]
[--] […​]
git stash save [-p | --patch] [-S | --staged] [-k | --[no-]keep-index] [-q | --quiet]
[-u | --include-untracked] [-a | --all] []
git stash clear
git stash create []
git stash store [(-m | --message) ] [-q | --quiet]
git stash export (--print | --to-ref ) […​]
git stash import
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-stash.html](../../public/git-docs/git-stash.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-stash/2.56.0.html).

Use git stash when you want to record the current state of the
working directory and the index, but want to go back to a clean
working directory.  The command saves your local modifications away
and reverts the working directory to match the HEAD commit.

The modifications stashed away by this command can be listed with
git stash list, inspected with git stash show, and restored
(potentially on top of a different commit) with git stash apply.
Calling git stash without any arguments is equivalent to git stash push.
A stash is by default listed as "WIP on <branchname> …​", but
you can give a more descriptive message on the command line when
you create one.

The latest stash you created is stored in refs/stash; older
stashes are found in the reflog of this reference and can be named using
the usual reflog syntax (e.g. stash@{0} is the most recently
created stash, stash@{1} is the one before it, stash@{2.hours.ago}
is also possible). Stashes may also be referenced by specifying just the
stash index (e.g. the integer <n> is equivalent to stash@{<n>}).
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.