# `git notes`
- **Category:** Patching & recovery
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Add or inspect object notes
## Syntax
```text
git notes [list []]
git notes add [-f] [--allow-empty] [--[no-]separator | --separator=] [--[no-]stripspace] [-F  | -m  | (-c | -C) ] [-e] []
git notes copy [-f] ( --stdin |  [] )
git notes append [--allow-empty] [--[no-]separator | --separator=] [--[no-]stripspace] [-F  | -m  | (-c | -C) ] [-e] []
git notes edit [--allow-empty] [] [--[no-]stripspace]
git notes show []
git notes merge [-v | -q] [-s  ]
git notes merge --commit [-v | -q]
git notes merge --abort [-v | -q]
git notes remove [--ignore-missing] [--stdin] […​]
git notes prune [-n] [-v]
git notes get-ref
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-notes.html](../../public/git-docs/git-notes.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-notes/2.56.0.html).

Adds, removes, or reads notes attached to objects, without touching
the objects themselves.

By default, notes are saved to and read from refs/notes/commits, but
this default can be overridden.  See the OPTIONS, CONFIGURATION, and
ENVIRONMENT sections below.  If this ref does not exist, it will be
quietly created when it is first needed to store a note.

A typical use of notes is to supplement a commit message without
changing the commit itself. Notes can be shown by git log along with
the original commit message. To distinguish these notes from the
message stored in the commit object, the notes are indented like the
message, after an unindented line saying "Notes (<refname>):" (or
"Notes:" for refs/notes/commits).

Notes can also be added to patches prepared with git format-patch by
using the --notes option. Such notes are added as a patch commentary
after a three dash separator line.

To change which notes are shown by git log, see the
notes.displayRef discussion in CONFIGURATION.

See the notes.rewrite.<command> configuration for a way to carry
notes across commands that rewrite commits.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.