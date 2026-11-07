# `git shortlog`
- **Category:** Inspection & comparison
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Summarize `git log` output
## Syntax
```text
git shortlog [] [] [[--] …​]
git log --pretty=short | git shortlog []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-shortlog.html](../../public/git-docs/git-shortlog.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-shortlog/2.56.0.html).

Summarizes git log output in a format suitable for inclusion
in release announcements. Each commit will be grouped by author and title.

Additionally, "[PATCH]" will be stripped from the commit description.

If no revisions are passed on the command line and either standard input
is not a terminal or there is no current branch, git shortlog will
output a summary of the log read from standard input, without
reference to the current repository.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.