# `git diff-index`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Compare a tree to the working tree or index
## Syntax
```text
git diff-index [-m] [--cached] [--merge-base] []  […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-diff-index.html](../../public/git-docs/git-diff-index.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-diff-index/2.56.0.html).

Compare the content and mode of the blobs found in a tree object
with the corresponding tracked files in the working tree, or with the
corresponding paths in the index.  When <path> arguments are present,
compare only paths matching those patterns.  Otherwise all tracked
files are compared.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.