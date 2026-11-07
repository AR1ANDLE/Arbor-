# `git history`
- **Category:** Specialized & interoperability
- **Git help group:** Main Porcelain Commands
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** yes
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
EXPERIMENTAL: Rewrite history
## Syntax
```text
git history drop  [--dry-run] [--update-refs=(branches|head)] [--empty=(drop|keep|abort)]
git history fixup  [--dry-run] [--update-refs=(branches|head)] [--reedit-message] [--empty=(drop|keep|abort)]
git history reword  [--dry-run] [--update-refs=(branches|head)]
git history split  [--dry-run] [--update-refs=(branches|head)] [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-history.html](../../public/git-docs/git-history.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-history/2.56.0.html).

Rewrite history by rearranging or modifying specific commits in the
history.

THIS COMMAND IS EXPERIMENTAL. THE BEHAVIOR MAY CHANGE.

This command is related to git-rebase(1) in that both commands can be
used to rewrite history. There are a couple of major differences though:

Most subcommands of git-history(1) can work in a bare repository as
they do not need to touch either the index or the worktree. The fixup
subcommand is an exception to this, as it reads staged changes from the index.

git-history(1) does not execute any githooks(5) at the
current point in time. This may change in the future.

git-history(1) by default updates all branches that are descendants
of the original commit to point to the rewritten commit.

Overall, git-history(1) aims to provide a more opinionated way to modify
your commit history that is simpler to use compared to git-rebase(1) in
general.

Use git-rebase(1) if you want to reapply a range of commits onto a
different base, or interactive rebases if you want to edit a range of commits
at once.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.