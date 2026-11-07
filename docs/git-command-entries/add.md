# `git add`
- **Category:** Basic snapshotting
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Add file contents to the index
## Syntax
```text
git add [--verbose | -v] [--dry-run | -n] [--force | -f] [--interactive | -i] [--patch | -p]
[--edit | -e] [--[no-]all | -A | --[no-]ignore-removal | [--update | -u]] [--sparse]
[--intent-to-add | -N] [--refresh] [--ignore-errors] [--ignore-missing] [--renormalize]
[--resolved] [--chmod=(+|-)x] [--pathspec-from-file= [--pathspec-file-nul]]
[--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-add.html](../../public/git-docs/git-add.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-add/2.56.0.html).

Add contents of new or changed files to the index. The "index" (also
known as the "staging area") is what you use to prepare the contents of
the next commit.

When you run git commit without any other arguments, it will only
commit staged changes. For example, if you’ve edited file.c and want
to commit your changes to that file, you can run:

git add file.c
git commit

You can also add only part of your changes to a file with git add -p.

This command can be performed multiple times before a commit.  It only
adds the content of the specified file(s) at the time the add command is
run; if you want subsequent changes included in the next commit, then
you must run git add again to add the new content to the index.

The git status command can be used to obtain a summary of which
files have changes that are staged for the next commit.

The git add command will not add ignored files by default. You can
use the --force option to add ignored files. If you specify the exact
filename of an ignored file, git add will fail with a list of ignored
files. Otherwise it will silently ignore the file.

Please see git-commit(1) for alternative ways to add content to a
commit.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.