# `git commit`
- **Category:** Basic snapshotting
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Record changes to the repository
## Syntax
```text
git commit [-a | --interactive | --patch] [-s] [-v] [-u[]] [--amend]
[--dry-run] [(-c | -C | --squash)  | --fixup [(amend|reword):]]
[-F  | -m ] [--reset-author] [--allow-empty]
[--allow-empty-message] [--no-verify] [-e] [--author=]
[--date=] [--cleanup=] [--[no-]status]
[-i | -o] [--pathspec-from-file= [--pathspec-file-nul]]
[(--trailer [(=|:)])…​] [-S[]]
[--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-commit.html](../../public/git-docs/git-commit.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-commit/2.56.0.html).

Create a new commit containing the current contents of the index and
the given log message describing the changes. The new commit is a
direct child of HEAD, usually the tip of the current branch, and the
branch is updated to point to it (unless no branch is associated with
the working tree, in which case HEAD is "detached" as described in
git-checkout(1)).

The content to be committed can be specified in several ways:

by using git-add(1) to incrementally "add" changes to the
index before using the commit command (Note: even modified files
must be "added");

by using git-rm(1) to remove files from the working tree
and the index, again before using the commit command;

by listing files as arguments to the commit command
(without --interactive or --patch switch), in which
case the commit will ignore changes staged in the index, and instead
record the current content of the listed files (which must already
be known to Git);

by using the -a switch with the commit command to automatically
"add" changes from all known files (i.e. all files that are already
listed in the index) and to automatically "rm" files in the index
that have been removed from the working tree, and then perform the
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.