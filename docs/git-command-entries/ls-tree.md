# `git ls-tree`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
List the contents of a tree object
## Syntax
```text
git ls-tree [-d] [-r] [-t] [-l] [-z]
[--name-only] [--name-status] [--object-only] [--full-name] [--full-tree] [--abbrev[=]] [--format=]
[…​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-ls-tree.html](../../public/git-docs/git-ls-tree.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-ls-tree/2.56.0.html).

Lists the contents of a given tree object, like what "/bin/ls -a" does
in the current working directory.  Note that:

the behaviour is slightly different from that of "/bin/ls" in that the
<path> denotes just a list of patterns to match, e.g. so specifying
directory name (without -r) will behave differently, and order of the
arguments does not matter.

the behaviour is similar to that of "/bin/ls" in that the <path> is
taken as relative to the current working directory.  E.g. when you are
in a directory sub that has a directory dir, you can run git
ls-tree -r HEAD dir to list the contents of the tree (that is
sub/dir in HEAD).  You don’t want to give a tree that is not at the
root level (e.g. git ls-tree -r HEAD:sub dir) in this case, as that
would result in asking for sub/sub/dir in the HEAD commit.
However, the current working directory can be ignored by passing
--full-tree option.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.