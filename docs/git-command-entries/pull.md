# `git pull`
- **Category:** Sharing & updating
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Fetch from and integrate with another repository or a local branch
## Syntax
```text
git pull [] [ […​]]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-pull.html](../../public/git-docs/git-pull.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-pull/2.56.0.html).

Integrate changes from a remote repository into the current branch.

First, git pull runs git fetch with the same arguments
(excluding merge options) to fetch remote branch(es).
Then it decides which remote branch to integrate: if you run git pull
with no arguments this defaults to the upstream
for the current branch.
Then it integrates that branch into the current branch.

There are 4 main options for integrating the remote branch:

git pull --ff-only will only do "fast-forward" updates: it
fails if your local branch has diverged from the remote branch.
This is the default.

git pull --rebase runs git rebase

git pull --no-rebase runs git merge.

git pull --squash runs git merge --squash

You can also set the configuration options pull.rebase, pull.squash,
or pull.ff with your preferred behaviour.

If there’s a merge conflict during the merge or rebase that you don’t
want to handle, you can safely abort it with git merge --abort or
git rebase --abort.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.