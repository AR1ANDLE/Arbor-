# `git sparse-checkout`
- **Category:** Administration & maintenance
- **Git help group:** Main Porcelain Commands
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Reduce your working tree to a subset of tracked files
## Syntax
```text
git sparse-checkout (init | list | set | add | reapply | disable | check-rules | clean) []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-sparse-checkout.html](../../public/git-docs/git-sparse-checkout.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-sparse-checkout/2.56.0.html).

This command is used to create sparse checkouts, which change the
working tree from having all tracked files present to only having a
subset of those files.  It can also switch which subset of files are
present, or undo and go back to having all tracked files present in
the working copy.

The subset of files is chosen by providing a list of directories in
cone mode (the default), or by providing a list of patterns in
non-cone mode.

When in a sparse-checkout, other Git commands behave a bit differently.
For example, switching branches will not update paths outside the
sparse-checkout directories/patterns, and git commit -a will not record
paths outside the sparse-checkout directories/patterns as deleted.

THIS COMMAND IS EXPERIMENTAL. ITS BEHAVIOR, AND THE BEHAVIOR OF OTHER
COMMANDS IN THE PRESENCE OF SPARSE-CHECKOUTS, WILL LIKELY CHANGE IN
THE FUTURE.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.