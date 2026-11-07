# `git rev-list`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Lists commit objects in reverse chronological order
## Syntax
```text
git rev-list [] …​ [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-rev-list.html](../../public/git-docs/git-rev-list.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-rev-list/2.56.0.html).

List commits that are reachable by following the parent links from the
given commit(s), but exclude commits that are reachable from the one(s)
given with a ^ in front of them.  The output is given in reverse
chronological order by default.

You can think of this as a set operation. Commits reachable from any of
the commits given on the command line form a set, and then commits reachable
from any of the ones given with ^ in front are subtracted from that
set.  The remaining commits are what comes out in the command’s output.
Various other options and paths parameters can be used to further limit the
result.

Thus, the following command:

$ git rev-list foo bar ^baz

means "list all the commits which are reachable from foo or bar, but
not from baz".

A special notation "<commit1>..<commit2>" can be used as a
short-hand for "^<commit1> <commit2>". For example, either of
the following may be used interchangeably:

$ git rev-list origin..HEAD
$ git rev-list HEAD ^origin

Another special notation is "<commit1>...<commit2>" which is useful
for merges.  The resulting set of commits is the symmetric difference
between the two operands.  The following two commands are equivalent:

$ git rev-
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.