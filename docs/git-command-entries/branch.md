# `git branch`
- **Category:** Branching & merging
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
List, create, or delete branches
## Syntax
```text
git branch [--color[=] | --no-color] [--show-current]
[-v [--abbrev= | --no-abbrev]]
[--column[=] | --no-column] [--sort=]
[--merged []] [--no-merged []]
[--contains []] [--no-contains []]
[(--forked )…​]
[--points-at ] [--format=]
[(-r|--remotes) | (-a|--all)]
[--list] […​]
git branch [--track[=(direct|inherit)] | --no-track] [-f]
[--recurse-submodules]  []
git branch (--set-upstream-to=|-u ) []
git branch --unset-upstream []
git branch (-m|-M) []
git branch (-c|-C) []
git branch (-d|-D) [-r] …​
git branch --edit-description []
git branch [--dry-run] (--delete-merged )…​ […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-branch.html](../../public/git-docs/git-branch.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-branch/2.56.0.html).

If --list is given, or if there are no non-option arguments, existing
branches are listed; the current branch will be highlighted in green and
marked with an asterisk.  Any branches checked out in linked worktrees will
be highlighted in cyan and marked with a plus sign. Option -r causes the
remote-tracking branches to be listed,
and option -a shows both local and remote branches.

If a <pattern>
is given, it is used as a shell wildcard to restrict the output to
matching branches. If multiple patterns are given, a branch is shown if
it matches any of the patterns.

Note that when providing a
<pattern>, you must use --list; otherwise the command may be interpreted
as branch creation.

With --contains, shows only the branches that contain the named commit
(in other words, the branches whose tip commits are descendants of the
named commit), --no-contains inverts it. With --merged, only branches
merged into the named commit (i.e. the branches whose tip commits are
reachable from the named commit) will be listed.  With --no-merged only
branches not merged into the named commit will be listed.  If the <commit>
argument is missing it defaults to HEAD (i.e. the tip of the current
branch).  
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.