# `git last-modified`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** yes
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
EXPERIMENTAL: Show when files were last modified
## Syntax
```text
git last-modified [--recursive] [--show-trees] [--max-depth=] [-z]
[] [[--] …​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-last-modified.html](../../public/git-docs/git-last-modified.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-last-modified/2.56.0.html).

Shows which commit last modified each of the relevant files and subdirectories.
A commit renaming a path, or changing it’s mode is also taken into account.

THIS COMMAND IS EXPERIMENTAL. THE BEHAVIOR MAY CHANGE.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.