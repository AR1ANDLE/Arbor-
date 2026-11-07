# `git worktree`
- **Category:** Sharing & updating
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Manage multiple working trees
## Syntax
```text
git worktree add [-f] [--detach] [--checkout] [--lock [--reason ]]
[--orphan] [(-b | -B) ]  []
git worktree list [-v | --porcelain [-z]]
git worktree lock [--reason ]
git worktree move
git worktree prune [-n] [-v] [--expire ]
git worktree remove [-f]
git worktree repair […​]
git worktree unlock
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-worktree.html](../../public/git-docs/git-worktree.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-worktree/2.56.0.html).

Manage multiple working trees attached to the same repository.

A git repository can support multiple working trees, allowing you to check
out more than one branch at a time.  With git worktree add a new working
tree is associated with the repository, along with additional metadata
that differentiates that working tree from others in the same repository.
The working tree, along with this metadata, is called a "worktree".

This new worktree is called a "linked worktree" as opposed to the "main
worktree" prepared by git-init(1) or git-clone(1).
A repository has one main worktree (if it’s not a bare repository) and
zero or more linked worktrees. When you are done with a linked worktree,
remove it with git worktree remove.

In its simplest form, git worktree add <path> automatically creates a
new branch whose name is the final component of <path>, which is
convenient if you plan to work on a new topic. For instance, git
worktree add ../hotfix creates new branch hotfix and checks it out at
path ../hotfix. To instead work on an existing branch in a new worktree,
use git worktree add <path> <branch>. On the other hand, if you just
plan to make some experimental changes or do testing witho
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.