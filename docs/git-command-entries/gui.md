# `git gui`
- **Category:** Specialized & interoperability
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
A portable graphical interface to Git
## Syntax
```text
git gui [] []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-gui.html](../../public/git-docs/git-gui.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-gui/2.56.0.html).

A Tcl/Tk based graphical user interface to Git.  git gui focuses
on allowing users to make changes to their repository by making
new commits, amending existing ones, creating branches, performing
local merges, and fetching/pushing to remote repositories.

Unlike gitk, git gui focuses on commit generation
and single file annotation and does not show project history.
It does however supply menu actions to start a gitk session from
within git gui.

git gui is known to work on all popular UNIX systems, Mac OS X,
and Windows (under both Cygwin and MSYS).  To the extent possible
OS specific user interface guidelines are followed, making git gui
a fairly native interface for users.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.