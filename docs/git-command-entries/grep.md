# `git grep`
- **Category:** Inspection & comparison
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Print lines matching a pattern
## Syntax
```text
git grep [-a | --text] [-I] [--textconv] [-i | --ignore-case] [-w | --word-regexp]
[-v | --invert-match] [-h|-H] [--full-name]
[-E | --extended-regexp] [-G | --basic-regexp]
[-P | --perl-regexp]
[-F | --fixed-strings] [-n | --line-number] [--column]
[-l | --files-with-matches] [-L | --files-without-match]
[(-O | --open-files-in-pager) []]
[-z | --null]
[ -o | --only-matching ] [-c | --count] [--all-match] [-q | --quiet]
[--max-depth ] [--[no-]recursive]
[--color[=] | --no-color]
[--break] [--heading] [-p | --show-function]
[-A ] [-B ] [-C ]
[-W | --function-context]
[(-m | --max-count) ]
[--threads ]
[-f ] [-e]
[--and|--or|--not|(|)|-e …​]
[--recurse-submodules] [--parent-basename ]
[ [--[no-]exclude-standard] [--cached | --untracked | --no-index] | …​]
[--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-grep.html](../../public/git-docs/git-grep.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-grep/2.56.0.html).

Look for specified patterns in the tracked files in the work tree, blobs
registered in the index file, or blobs in given tree objects.  Patterns
are lists of one or more search expressions separated by newline
characters.  An empty string as search expression matches all lines.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.