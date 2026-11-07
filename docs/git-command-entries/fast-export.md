# `git fast-export`
- **Category:** Plumbing & object storage
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Git data exporter
## Syntax
```text
git fast-export [] [] [[--] …​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-fast-export.html](../../public/git-docs/git-fast-export.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-fast-export/2.56.0.html).

This program dumps the given revisions in a form suitable to be piped
into git fast-import.

You can use it as a human-readable bundle replacement (see
git-bundle(1)), or as a format that can be edited before being
fed to git fast-import in order to do history rewrites (an ability
relied on by tools like git filter-repo).
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.