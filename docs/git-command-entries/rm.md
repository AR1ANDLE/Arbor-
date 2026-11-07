# `git rm`
- **Category:** Basic snapshotting
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Remove files from the working tree and from the index
## Syntax
```text
git rm [-f | --force] [-n] [-r] [--cached] [--ignore-unmatch]
[--quiet] [--pathspec-from-file= [--pathspec-file-nul]]
[--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-rm.html](../../public/git-docs/git-rm.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-rm/2.56.0.html).

Remove files matching pathspec from the index, or from the working tree
and the index. git rm will not remove a file from just your working
directory. (There is no option to remove a file only from the working
tree and yet keep it in the index; use /bin/rm if you want to do
that.) The files being removed have to be identical to the tip of the
branch, and no updates to their contents can be staged in the index,
though that default behavior can be overridden with the -f option.
When --cached is given, the staged content has to
match either the tip of the branch or the file on disk,
allowing the file to be removed from just the index. When
sparse-checkouts are in use (see git-sparse-checkout(1)),
git rm will only remove paths within the sparse-checkout patterns.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.