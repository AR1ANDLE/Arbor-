# `git rebase`
- **Category:** Patching & recovery
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Reapply commits on top of another base tip
## Syntax
```text
git rebase [-i | --interactive] [] [--exec ]
[--onto  | --keep-base] [ []]
git rebase [-i | --interactive] [] [--exec ] [--onto ]
--root []
git rebase (--continue|--skip|--abort|--quit|--edit-todo|--show-current-patch)
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-rebase.html](../../public/git-docs/git-rebase.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-rebase/2.56.0.html).

Transplant a series of commits onto a different starting point.
You can also use git rebase to reorder or combine commits: see INTERACTIVE
MODE below for how to do that.

For example, imagine that you have been working on the topic branch in this
history, and you want to "catch up" to the work done on the master branch.

A---B---C topic
/
D---E---F---G master

You want to transplant the commits you made on topic since it diverged from
master (i.e. A, B, and C), on top of the current master.  You can do this
by running git rebase master while the topic branch is checked out.  If you
want to rebase topic while on another branch, git rebase master topic is a
shortcut for git checkout topic && git rebase master.

A'--B'--C' topic
/
D---E---F---G master

If there is a merge conflict during this process, git rebase will stop at the
first problematic commit and leave conflict markers. If this happens, you can do
one of these things:

Resolve the conflict. You can use git diff to find the markers (<<<<<<)
and make edits to resolve the conflict. For each file you edit, you need to
tell Git that the conflict has been resolved. You can mark the conflict as
resolved with  git add <filename>. A
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.