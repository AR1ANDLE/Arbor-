# `git gc`
- **Category:** Administration & maintenance
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Cleanup unnecessary files and optimize the local repository
## Syntax
```text
git gc [--aggressive] [--auto] [--[no-]detach] [--quiet] [--prune= | --no-prune] [--force] [--keep-largest-pack]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-gc.html](../../public/git-docs/git-gc.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-gc/2.56.0.html).

Runs a number of housekeeping tasks within the current repository,
such as compressing file revisions (to reduce disk space and increase
performance), removing unreachable objects which may have been
created from prior invocations of git add, packing refs, pruning
reflog, rerere metadata or stale working trees. May also update ancillary
indexes such as the commit-graph.

When common porcelain operations that create objects are run, they
will check whether the repository has grown substantially since the
last maintenance, and if so run git gc automatically. See gc.auto
below for how to disable this behavior.

Running git gc manually should only be needed when adding objects to
a repository without regularly running such porcelain commands, to do
a one-off repository optimization, or e.g. to clean up a suboptimal
mass-import. See the "PACKFILE OPTIMIZATION" section in
git-fast-import(1) for more details on the import case.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.