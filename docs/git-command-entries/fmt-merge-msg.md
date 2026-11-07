# `git fmt-merge-msg`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Produce a merge commit message
## Syntax
```text
git fmt-merge-msg [-m ] [--into-name ] [--log[=] | --no-log]
git fmt-merge-msg [-m ] [--log[=] | --no-log] -F
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-fmt-merge-msg.html](../../public/git-docs/git-fmt-merge-msg.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-fmt-merge-msg/2.56.0.html).

Takes the list of merged objects on stdin and produces a suitable
commit message to be used for the merge commit, usually to be
passed as the <merge-message> argument of git merge.

This command is intended mostly for internal use by scripts
automatically invoking git merge.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.