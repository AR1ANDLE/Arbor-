# `git checkout`
- **Category:** Branching & merging
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Switch branches or restore working tree files
## Syntax
```text
git checkout [-q] [-f] [-m] []
git checkout [-q] [-f] [-m] --detach []
git checkout [-q] [-f] [-m] [--detach]
git checkout [-q] [-f] [-m] [[-b|-B|--orphan] ] []
git checkout  [--] …​
git checkout  --pathspec-from-file= [--pathspec-file-nul]
git checkout [-f|--ours|--theirs|-m|--conflict=] [--] …​
git checkout [-f|--ours|--theirs|-m|--conflict=] --pathspec-from-file= [--pathspec-file-nul]
git checkout (-p|--patch) [] [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-checkout.html](../../public/git-docs/git-checkout.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-checkout/2.56.0.html).

git checkout has two main modes:

Switch branches, with git checkout <branch>

Restore a different version of a file, for example with
git checkout <commit> <filename> or git checkout <filename>

See ARGUMENT DISAMBIGUATION below for how Git decides which one to do.

git checkout [<branch>]

Switch to <branch>. This sets the current branch to <branch> and
updates the files in your working directory. The checkout will fail
if there are uncommitted changes to any files where <branch> and
your current commit have different content. Uncommitted changes will
otherwise be kept.

If <branch> is not found but there does exist a tracking branch in
exactly one remote (call it <remote>) with a matching name and
--no-guess is not specified, treat as equivalent to

$ git checkout -b <branch> --track <remote>/<branch>

Running git checkout without specifying a branch has no effect except
to print out the tracking information for the current branch.

git checkout -b <new-branch> [<start-point>]

Create a new branch named <new-branch>, start it at <start-point>
(defaults to the current commit), and check out the new branch.
You can use the --track or --no-track options to set the branch’s
upstream
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.