# `git cat-file`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Provide contents or details of repository objects
## Syntax
```text
git cat-file
git cat-file (-e | -p | -t | -s)
git cat-file (--textconv | --filters)
[: | --path= ]
git cat-file (--batch | --batch-check | --batch-command) [--batch-all-objects]
[--buffer] [--follow-symlinks] [--unordered]
[--textconv | --filters] [-Z]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-cat-file.html](../../public/git-docs/git-cat-file.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-cat-file/2.56.0.html).

Output the contents or other properties such as size, type or delta
information of one or more objects.

This command can operate in two modes, depending on whether an option
from the --batch family is specified.

In non-batch mode, the command provides information on an object
named on the command line.

In batch mode, arguments are read from standard input.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.