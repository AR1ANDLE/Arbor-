# `git reflog`
- **Category:** Patching & recovery
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Manage reflog information
## Syntax
```text
git reflog [show] [] []
git reflog list
git reflog exists
git reflog write
git reflog delete [--rewrite] [--updateref]
[--dry-run | -n] [--verbose] @{}…​
git reflog drop [--all [--single-worktree] | …​]
git reflog expire [--expire=] [--expire-unreachable=]
[--rewrite] [--updateref] [--stale-fix]
[--dry-run | -n] [--verbose] [--all [--single-worktree] | …​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-reflog.html](../../public/git-docs/git-reflog.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-reflog/2.56.0.html).

This command manages the information recorded in the reflogs.

Reference logs, or "reflogs", record when the tips of branches and
other references were updated in the local repository. Reflogs are
useful in various Git commands, to specify the old value of a
reference. For example, HEAD@{2} means "where HEAD used to be two
moves ago", master@{one.week.ago} means "where master used to point
to one week ago in this local repository", and so on. See
gitrevisions(7) for more details.

The command takes various subcommands, and different options
depending on the subcommand:

The "show" subcommand (which is also the default, in the absence of
any subcommands) shows the log of the reference provided in the
command-line (or HEAD, by default). The reflog covers all recent
actions, and in addition the HEAD reflog records branch switching.
git reflog show is an alias for git log -g --abbrev-commit
--pretty=oneline; see git-log(1) for more information.

The "list" subcommand lists all refs which have a corresponding reflog.

The "exists" subcommand checks whether a ref has a reflog.  It exits
with zero status if the reflog exists, and non-zero status if it does
not.

The "write" subcommand wri
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.