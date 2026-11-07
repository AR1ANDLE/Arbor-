# `git blame`
- **Category:** Inspection & comparison
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Show what revision and author last modified each line of a file
## Syntax
```text
git blame [-c] [-b] [-l] [--root] [-t] [-f] [-n] [-s] [-e] [-p] [-w] [--incremental]
[-L ] [-S ] [-M] [-C] [-C] [-C] [--since=]
[--ignore-rev ] [--ignore-revs-file ]
[--color-lines] [--color-by-age] [--progress] [--abbrev=]
[ --contents  ] [ | --reverse ..] [--]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-blame.html](../../public/git-docs/git-blame.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-blame/2.56.0.html).

Annotates each line in the given file with information from the revision which
last modified the line. Optionally, start annotating from the given revision.

When specified one or more times, -L restricts annotation to the requested
lines.

The origin of lines is automatically followed across whole-file
renames (currently there is no option to turn the rename-following
off). To follow lines moved from one file to another, or to follow
lines that were copied and pasted from another file, etc., see the
-C and -M options.

The report does not tell you anything about lines which have been deleted or
replaced; you need to use a tool such as git diff or the "pickaxe"
interface briefly mentioned in the following paragraph.

Apart from supporting file annotation, Git also supports searching the
development history for when a code snippet occurred in a change. This makes it
possible to track when a code snippet was added to a file, moved or copied
between files, and eventually deleted or replaced. It works by searching for
a text string in the diff. A small example of the pickaxe interface
that searches for blame_usage:

$ git log --pretty=oneline -S'blame_usage'
5040f17eba15504bad66b14a645
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.