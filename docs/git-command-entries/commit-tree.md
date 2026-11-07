# `git commit-tree`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Create a new commit object
## Syntax
```text
git commit-tree  [(-p )…​]
git commit-tree [(-p )…​] [-S[]] [(-m )…​]
[(-F )…​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-commit-tree.html](../../public/git-docs/git-commit-tree.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-commit-tree/2.56.0.html).

This is usually not what an end user wants to run directly.  See
git-commit(1) instead.

Creates a new commit object based on the provided tree object and
emits the new commit object id on stdout. The log message is read
from the standard input, unless -m or -F options are given.

The -m and -F options can be given any number of times, in any
order. The commit log message will be composed in the order in which
the options are given.

A commit object may have any number of parents. With exactly one
parent, it is an ordinary commit. Having more than one parent makes
the commit a merge between several lines of history. Initial (root)
commits have no parents.

While a tree represents a particular directory state of a working
directory, a commit represents that state in "time", and explains how
to get there.

Normally a commit would identify a new "HEAD" state, and while Git
doesn’t care where you save the note about that state, in practice we
tend to just write the result to the file that is pointed at by
.git/HEAD, so that we can always see what the last committed
state was.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.