# `git stripspace`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Remove unnecessary whitespace
## Syntax
```text
git stripspace [-s | --strip-comments]
git stripspace [-c | --comment-lines]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-stripspace.html](../../public/git-docs/git-stripspace.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-stripspace/2.56.0.html).

Read text, such as commit messages, notes, tags and branch
descriptions, from the standard input and clean it in the manner
used by Git.

With no arguments, this will:

remove trailing whitespace from all lines

collapse multiple consecutive empty lines into one empty line

remove empty lines from the beginning and end of the input

add a missing \n to the last line if necessary.

In the case where the input consists entirely of whitespace characters, no
output will be produced.

NOTE: This is intended for cleaning metadata. Prefer the --whitespace=fix
mode of git-apply(1) for correcting whitespace of patches or files in
the repository.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.