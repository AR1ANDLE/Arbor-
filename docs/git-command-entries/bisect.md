# `git bisect`
- **Category:** Debugging & analysis
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Use binary search to find the commit that introduced a bug
## Syntax
```text
git bisect start [--term-(bad|new)= --term-(good|old)=]
[--no-checkout] [--first-parent] [--reset-when-found[=]] [ […​]] [--] […​]
git bisect (bad|new|) []
git bisect (good|old|) […​]
git bisect terms [--term-(good|old) | --term-(bad|new)]
git bisect skip [(|)…​]
git bisect next
git bisect reset []
git bisect (visualize|view)
git bisect replay
git bisect log
git bisect run [--reset-when-found[=]]  […​]
git bisect help
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-bisect.html](../../public/git-docs/git-bisect.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-bisect/2.56.0.html).

This command uses a binary search algorithm to find which commit in
your project’s history introduced a bug. You use it by first telling
it a "bad" commit that is known to contain the bug, and a "good"
commit that is known to be before the bug was introduced. Then git
bisect picks a commit between those two endpoints and asks you
whether the selected commit is "good" or "bad". It continues narrowing
down the range until it finds the exact commit that introduced the
change.

In fact, git bisect can be used to find the commit that changed
any property of your project; e.g., the commit that fixed a bug, or
the commit that caused a benchmark’s performance to improve. To
support this more general usage, the terms "old" and "new" can be used
in place of "good" and "bad", or you can choose your own terms. See
section "Alternate terms" below for more information.

Basic bisect commands: start, bad, good

As an example, suppose you are trying to find the commit that broke a
feature that was known to work in version v2.6.13-rc2 of your
project. You start a bisect session as follows:

$ git bisect start
$ git bisect bad                 # Current version is bad
$ git bisect good v2.6.13-rc2   
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.