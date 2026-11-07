# `git column`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Display data in columns
## Syntax
```text
git column [--command=] [--[raw-]mode=] [--width=]
[--indent=] [--nl=] [--padding=]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-column.html](../../public/git-docs/git-column.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-column/2.56.0.html).

This command formats the lines of its standard input into a table with
multiple columns. Each input line occupies one cell of the table. It
is used internally by other git commands to format output into
columns.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.