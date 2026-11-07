# `git repack`
- **Category:** Administration & maintenance
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Pack unpacked objects in a repository
## Syntax
```text
git repack [-a] [-A] [-d] [-f] [-F] [-l] [-n] [-q] [-b] [-m]
[--window=] [--depth=] [--threads=] [--keep-pack=]
[--write-midx[=]] [--name-hash-version=] [--path-walk]
[--filter=] [--drop-filtered [--dry-run]]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-repack.html](../../public/git-docs/git-repack.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-repack/2.56.0.html).

This command is used to combine all objects that do not currently
reside in a "pack", into a pack.  It can also be used to re-organize
existing packs into a single, more efficient pack.

A pack is a collection of objects, individually compressed, with
delta compression applied, stored in a single file, with an
associated index file.

Packs are used to reduce the load on mirror systems, backup
engines, disk storage, etc.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.