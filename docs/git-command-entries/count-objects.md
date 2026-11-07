# `git count-objects`
- **Category:** Debugging & analysis
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Count unpacked number of objects and their disk consumption
## Syntax
```text
git count-objects [-v] [-H | --human-readable]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-count-objects.html](../../public/git-docs/git-count-objects.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-count-objects/2.56.0.html).

Counts the number of unpacked object files and disk space consumed by
them, to help you decide when it is a good time to repack.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.