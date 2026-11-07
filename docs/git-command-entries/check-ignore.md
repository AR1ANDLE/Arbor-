# `git check-ignore`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Debug gitignore / exclude files
## Syntax
```text
git check-ignore [] …​
git check-ignore [] --stdin
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-check-ignore.html](../../public/git-docs/git-check-ignore.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-check-ignore/2.56.0.html).

For each pathname given via the command-line or from a file via
--stdin, check whether the file is excluded by .gitignore (or other
input files to the exclude mechanism) and output the path if it is
excluded.

By default, tracked files are not shown at all since they are not
subject to exclude rules; but see ‘--no-index’.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.