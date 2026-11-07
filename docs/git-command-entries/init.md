# `git init`
- **Category:** Setup & configuration
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Create an empty Git repository or reinitialize an existing one
## Syntax
```text
git init [-q | --quiet] [--bare] [--template=]
[--separate-git-dir ] [--object-format=]
[--ref-format=]
[-b  | --initial-branch=]
[--shared[=]] []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-init.html](../../public/git-docs/git-init.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-init/2.56.0.html).

This command creates an empty Git repository - basically a .git
directory with subdirectories for objects, refs/heads,
refs/tags, and template files.  An initial branch without any
commits will be created (see the --initial-branch option below
for its name).

If the GIT_DIR environment variable is set then it specifies a path
to use instead of ./.git for the base of the repository.

If the object storage directory is specified via the
GIT_OBJECT_DIRECTORY environment variable then the sha1 directories
are created underneath; otherwise, the default $GIT_DIR/objects
directory is used.

Running git init in an existing repository is safe. It will not
overwrite things that are already there. The primary reason for
rerunning git init is to pick up newly added templates (or to move
the repository to another place if --separate-git-dir is given).
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.