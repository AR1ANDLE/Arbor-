# `git unpack-objects`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Unpack objects from a packed archive
## Syntax
```text
git unpack-objects [-n] [-q] [-r] [--strict]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-unpack-objects.html](../../public/git-docs/git-unpack-objects.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-unpack-objects/2.56.0.html).

Read a packed archive (.pack) from the standard input, expanding
the objects contained within and writing them into the repository in
"loose" (one object per file) format.

Objects that already exist in the repository will not be unpacked
from the packfile.  Therefore, nothing will be unpacked if you use
this command on a packfile that exists within the target repository.

See git-repack(1) for options to generate
new packs and replace existing ones.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.