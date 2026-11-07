# `git diff-files`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Compares files in the working tree and the index
## Syntax
```text
git diff-files [-q] [-0 | -1 | -2 | -3 | -c | --cc] [] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-diff-files.html](../../public/git-docs/git-diff-files.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-diff-files/2.56.0.html).

Compares the files in the working tree and the index.  When paths
are specified, compares only those named paths.  Otherwise all
entries in the index are compared.  The output format is the
same as for git diff-index and git diff-tree.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.