# `git refs`
- **Category:** Inspection & comparison
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Low-level access to refs
## Syntax
```text
git refs migrate --ref-format= [--no-reflog] [--dry-run]
git refs verify [--strict] [--verbose]
git refs list [--count=] [--shell|--perl|--python|--tcl]
[(--sort=)…​] [--format=]
[--include-root-refs] [--points-at=]
[--merged[=]] [--no-merged[=]]
[--contains[=]] [--no-contains[=]]
[(--exclude=)…​] [--start-after=]
[ --stdin | (...)]
git refs exists
git refs optimize [--all] [--no-prune] [--auto] [--include ] [--exclude ]
git refs create [--message=] [--no-deref] [--create-reflog]
git refs delete [--message=] [--no-deref]  []
git refs update [--message=] [--no-deref] [--create-reflog]   []
git refs rename [--message=]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-refs.html](../../public/git-docs/git-refs.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-refs/2.56.0.html).

This command provides low-level access to refs.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.