# `git reset`
- **Category:** Patching & recovery
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Set `HEAD` or the index to a known state
## Syntax
```text
git reset [--soft | --mixed [-N] | --hard | --merge | --keep] [-q] []
git reset [-q] [] [--] …​
git reset [-q] [--pathspec-from-file= [--pathspec-file-nul]] []
git reset (--patch | -p) [] [--] […​]
DEPRECATED: git reset [-q] [--stdin [-z]] []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-reset.html](../../public/git-docs/git-reset.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-reset/2.56.0.html).

git reset does either of the following:

git reset [<mode>] <commit> changes which commit HEAD points to. This
makes it possible to undo various Git operations, for example commit, merge,
rebase, and pull.

When you specify files or directories or pass --patch, git reset updates
the staged version of the specified files.

git reset [<mode>] [<commit>]

Set the current branch head (HEAD) to point at <commit>.
Depending on <mode>, also update the working directory and/or index
to match the contents of <commit>.
<commit> defaults to HEAD.
Before the operation, ORIG_HEAD is set to the tip of the current branch.

The <mode> must be one of the following (default --mixed):

--mixed

Leave your working directory unchanged.
Update the index to match the new HEAD, so nothing will be staged.

If -N is specified, mark removed paths as intent-to-add (see
git-add(1)).

--soft

Leave your working tree files and the index unchanged.
For example, if you have no staged changes, you can use
git reset --soft HEAD~5; git commit
to combine the last 5 commits into 1 commit. This works even with
changes in the working tree, which are left untouched, but such usage
can lead to confusion.

--hard

Overwrite
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.