# `git prune`
- **Category:** Administration & maintenance
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Prune all unreachable objects from the object database
## Syntax
```text
git prune [-n] [-v] [--progress] [--expire ] [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-prune.html](../../public/git-docs/git-prune.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-prune/2.56.0.html).

Note

In most cases, users should run git gc, which calls
git prune. See the section "NOTES", below.

This runs git fsck --unreachable using all the refs
available in refs/, optionally with an additional set of
objects specified on the command line, and prunes all unpacked
objects unreachable from any of these head objects from the object database.
In addition, it
prunes the unpacked objects that are also found in packs by
running git prune-packed.
It also removes entries from .git/shallow that are not reachable by
any ref.

Note that unreachable, packed objects will remain.  If this is
not desired, see git-repack(1).
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.