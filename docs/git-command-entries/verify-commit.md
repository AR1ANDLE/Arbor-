# `git verify-commit`
- **Category:** Debugging & analysis
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Check the GPG signature of commits
## Syntax
```text
git verify-commit [-v | --verbose] [--raw] …​
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-verify-commit.html](../../public/git-docs/git-verify-commit.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-verify-commit/2.56.0.html).

Validates the GPG signature created by git commit -S
on the commit objects given on the command line.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.