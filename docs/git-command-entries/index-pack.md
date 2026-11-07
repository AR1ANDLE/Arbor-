# `git index-pack`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Build pack index file for an existing packed archive
## Syntax
```text
git index-pack [-v] [-o ] [--[no-]rev-index]
git index-pack --stdin [--fix-thin] [--keep] [-v] [-o ]
[--[no-]rev-index] []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-index-pack.html](../../public/git-docs/git-index-pack.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-index-pack/2.56.0.html).

Reads a packed archive (.pack) from the specified file,
builds a pack index file (.idx) for it, and optionally writes a
reverse-index (.rev) for the specified pack. The packed
archive, together with the pack index, can then be placed in
the objects/pack/ directory of a Git repository.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.