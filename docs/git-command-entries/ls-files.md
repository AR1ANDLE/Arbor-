# `git ls-files`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Show information about files in the index and the working tree
## Syntax
```text
git ls-files [-z] [-t] [-v] [-f]
[-c|--cached] [-d|--deleted] [-o|--others] [-i|--ignored]
[-s|--stage] [-u|--unmerged] [-k|--killed] [-m|--modified]
[--resolve-undo]
[--directory [--no-empty-directory]] [--eol]
[--deduplicate]
[-x |--exclude=]
[-X |--exclude-from=]
[--exclude-per-directory=]
[--exclude-standard]
[--error-unmatch] [--with-tree=]
[--full-name] [--recurse-submodules]
[--abbrev[=]] [--format=] [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-ls-files.html](../../public/git-docs/git-ls-files.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-ls-files/2.56.0.html).

This command merges the file listing in the index with the actual working
directory list, and shows different combinations of the two.

Several flags can be used to determine which files are
shown, and each file may be printed multiple times if there are
multiple entries in the index or if multiple statuses are applicable for
the relevant file selection options.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.