# `git prune-packed`
- **Category:** Administration & maintenance
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Remove extra objects that are already in pack files
## Syntax
```text
git prune-packed [-n | --dry-run] [-q | --quiet]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-prune-packed.html](../../public/git-docs/git-prune-packed.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-prune-packed/2.56.0.html).

This program searches the $GIT_OBJECT_DIRECTORY for all objects that currently
exist in a pack file as well as in the independent object directories.

All such extra objects are removed.

A pack is a collection of objects, individually compressed, with delta
compression applied, stored in a single file, with an associated index file.

Packs are used to reduce the load on mirror systems, backup engines,
disk storage, etc.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.