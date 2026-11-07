# `git for-each-repo`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Run a Git command on a list of repositories
## Syntax
```text
git for-each-repo --config= [--]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-for-each-repo.html](../../public/git-docs/git-for-each-repo.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-for-each-repo/2.56.0.html).

Run a Git command on a list of repositories. The arguments after the
known options or -- indicator are used as the arguments for the Git
subprocess.

THIS COMMAND IS EXPERIMENTAL. THE BEHAVIOR MAY CHANGE.

For example, we could run maintenance on each of a list of repositories
stored in a maintenance.repo config variable using

git for-each-repo --config=maintenance.repo maintenance run

This will run git -C <repo> maintenance run for each value <repo>
in the multi-valued config variable maintenance.repo.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.