# `git merge-base`
- **Category:** Branching & merging
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Find as good common ancestors as possible for a merge
## Syntax
```text
git merge-base [-a | --all]  …​
git merge-base [-a | --all] --octopus …​
git merge-base --is-ancestor
git merge-base --independent …​
git merge-base --fork-point  []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-merge-base.html](../../public/git-docs/git-merge-base.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-merge-base/2.56.0.html).

git merge-base finds the best common ancestor(s) between two commits to use
in a three-way merge.  One common ancestor is better than another common
ancestor if the latter is an ancestor of the former.  A common ancestor
that does not have any better common ancestor is a best common
ancestor, i.e. a merge base.  Note that there can be more than one
merge base for a pair of commits.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.