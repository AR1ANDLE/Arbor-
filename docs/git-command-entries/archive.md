# `git archive`
- **Category:** Sharing & updating
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Create an archive of files from a named tree
## Syntax
```text
git archive [--format=] [--list] [--prefix=/] []
[-o  | --output=] [--worktree-attributes]
[--remote= [--exec=]]
[…​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-archive.html](../../public/git-docs/git-archive.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-archive/2.56.0.html).

Creates an archive of the specified format containing the tree
structure for the named tree, and writes it out to the standard
output.  If <prefix> is specified it is
prepended to the filenames in the archive.

git archive behaves differently when given a tree ID as opposed to a
commit ID or tag ID. When a tree ID is provided, the current time is
used as the modification time of each file in the archive. On the
other hand, when a commit ID or tag ID is provided, the commit time as
recorded in the referenced commit object is used instead.
Additionally the commit ID is stored in a global extended pax header
if the tar format is used; it can be extracted using git
get-tar-commit-id. In ZIP files it is stored as a file comment.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.