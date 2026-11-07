# `git maintenance`
- **Category:** Administration & maintenance
- **Git help group:** Main Porcelain Commands
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Run tasks to optimize Git repository data
## Syntax
```text
git maintenance run []
git maintenance start [--scheduler=]
git maintenance (stop|register|unregister) []
git maintenance is-needed []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-maintenance.html](../../public/git-docs/git-maintenance.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-maintenance/2.56.0.html).

Run tasks to optimize Git repository data, speeding up other Git commands
and reducing storage requirements for the repository.

Git commands that add repository data, such as git add or git fetch,
are optimized for a responsive user experience. These commands do not take
time to optimize the Git data, since such optimizations scale with the full
size of the repository while these user commands each perform a relatively
small action.

The git maintenance command provides flexibility for how to optimize the
Git repository.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.