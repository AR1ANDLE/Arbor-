# `git mergetool`
- **Category:** Branching & merging
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Run merge conflict resolution tools to resolve merge conflicts
## Syntax
```text
git mergetool [--tool=] [-y | --[no-]prompt] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-mergetool.html](../../public/git-docs/git-mergetool.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-mergetool/2.56.0.html).

Use git mergetool to run one of several merge utilities to resolve
merge conflicts.  It is typically run after git merge.

If one or more <file> parameters are given, the merge tool program will
be run to resolve differences in each file (skipping those without
conflicts).  Specifying a directory will include all unresolved files in
that path.  If no <file> names are specified, git mergetool will run
the merge tool program on every file with merge conflicts.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.