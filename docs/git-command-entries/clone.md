# `git clone`
- **Category:** Setup & configuration
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Clone a repository into a new directory
## Syntax
```text
git clone [--template=]
[-l] [-s] [--no-hardlinks] [-q] [-n] [--bare] [--mirror]
[-o ] [-b ] [-u ] [--reference ]
[--dissociate] [--separate-git-dir ]
[--depth ] [--[no-]single-branch] [--[no-]tags]
[--recurse-submodules[=]] [--[no-]shallow-submodules]
[--[no-]remote-submodules] [--jobs ] [--sparse] [--[no-]reject-shallow]
[--filter= [--also-filter-submodules]] [--]
[]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-clone.html](../../public/git-docs/git-clone.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-clone/2.56.0.html).

Clones a repository into a newly created directory, creates
remote-tracking branches for each branch in the cloned repository
(visible using git branch --remotes), and creates and checks out an
initial branch that is forked from the cloned repository’s
currently active branch.

After the clone, a plain git fetch without arguments will update
all the remote-tracking branches, and a git pull without
arguments will in addition merge the remote master branch into the
current master branch, if any (this is untrue when --single-branch
is given; see below).

This default configuration is achieved by creating references to
the remote branch heads under refs/remotes/origin and
by initializing remote.origin.url and remote.origin.fetch
configuration variables.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.