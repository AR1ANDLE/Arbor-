# `git merge-file`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Run a three-way file merge
## Syntax
```text
git merge-file [-L  [-L  [-L ]]]
[--ours|--theirs|--union] [-p|--stdout] [-q|--quiet] [--marker-size=]
[--[no-]diff3] [--object-id]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-merge-file.html](../../public/git-docs/git-merge-file.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-merge-file/2.56.0.html).

Given three files <current>, <base> and <other>,
git merge-file incorporates all changes that lead from <base>
to <other> into <current>. The result ordinarily goes into
<current>. git merge-file is useful for combining separate changes
to an original. Suppose <base> is the original, and both
<current> and <other> are modifications of <base>,
then git merge-file combines both changes.

A conflict occurs if both <current> and <other> have changes
in a common segment of lines. If a conflict is found, git merge-file
normally outputs a warning and brackets the conflict with lines containing
<<<<<<< and >>>>>>> markers. A typical conflict will look like this:

<<<<<<< A
lines in file A
=======
lines in file B
>>>>>>> B

If there are conflicts, the user should edit the result and delete one of
the alternatives.  When --ours, --theirs, or --union option is in effect,
however, these conflicts are resolved favouring lines from <current>,
lines from <other>, or lines from both respectively.  The length of the
conflict markers can be given with the --marker-size option.

If --object-id is specified, exactly the same behavior occurs, except that
instead of specifying what to merge as files, it
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.