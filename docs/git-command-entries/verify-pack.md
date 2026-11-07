# `git verify-pack`
- **Category:** Debugging & analysis
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Validate packed Git archive files
## Syntax
```text
git verify-pack [-v | --verbose] [-s | --stat-only] [--] .idx…​
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-verify-pack.html](../../public/git-docs/git-verify-pack.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-verify-pack/2.56.0.html).

Read each idx file for packed Git archive given on the command line,
and verify the idx file and the corresponding pack file.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.