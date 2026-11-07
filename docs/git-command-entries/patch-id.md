# `git patch-id`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Compute unique IDs for patches
## Syntax
```text
git patch-id [--stable | --unstable | --verbatim]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-patch-id.html](../../public/git-docs/git-patch-id.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-patch-id/2.56.0.html).

Read patches from standard input and compute the patch IDs.

A "patch ID" is nothing but a sum of SHA-1 of the file diffs associated with a
patch, with line numbers ignored.  As such, it’s "reasonably stable", but at
the same time also reasonably unique, i.e., two patches that have the same
"patch ID" are almost guaranteed to be the same thing.

The main usecase for this command is to look for likely duplicate commits.

When dealing with git diff-tree --patch output, it takes advantage of
the fact that the patch is prefixed with the object name of the
commit, and outputs two 40-byte hexadecimal strings.  The first
string is the patch ID, and the second string is the commit ID.
This can be used to make a mapping from patch ID to commit ID for a
set or range of commits.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.