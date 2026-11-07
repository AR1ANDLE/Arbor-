# `git show-branch`
- **Category:** Inspection & comparison
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Show branches and their commits
## Syntax
```text
git show-branch [-a | --all] [-r | --remotes] [--topo-order | --date-order]
[--current] [--color[=] | --no-color] [--sparse]
[--more= | --list | --independent | --merge-base]
[--no-name | --sha1-name] [--topics]
[( | )…​]
git show-branch (-g | --reflog)[=[,]] [--list] []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-show-branch.html](../../public/git-docs/git-show-branch.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-show-branch/2.56.0.html).

Shows the commit ancestry graph starting from the commits named
with <rev>s or <glob>s (or all refs under refs/heads
and/or refs/tags) semi-visually.

It cannot show more than 26 branches and commits at a time.

It uses showbranch.default multi-valued configuration items if
no <rev> or <glob> is given on the command line.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.