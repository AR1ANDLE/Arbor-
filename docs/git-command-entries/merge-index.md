# `git merge-index`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Run a merge for files needing merging
## Syntax
```text
git merge-index [-o] [-q]  (-a | ( [--] …​) )
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-merge-index.html](../../public/git-docs/git-merge-index.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-merge-index/2.56.0.html).

This looks up the <file>(s) in the index and, if there are any merge
entries, passes the SHA-1 hash for those files as arguments 1, 2, 3 (empty
argument if no file), and <file> as argument 4.  File modes for the three
files are passed as arguments 5, 6 and 7.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.