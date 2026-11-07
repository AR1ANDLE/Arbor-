# `git fsck`
- **Category:** Debugging & analysis
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Verifies the connectivity and validity of the objects in the database
## Syntax
```text
git fsck [--tags] [--root] [--unreachable] [--cache] [--no-reflogs]
[--[no-]full] [--strict] [--verbose] [--lost-found]
[--[no-]dangling] [--[no-]progress] [--connectivity-only]
[--[no-]name-objects] [--[no-]references] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-fsck.html](../../public/git-docs/git-fsck.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-fsck/2.56.0.html).

Verifies the connectivity and validity of the objects in the database.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.