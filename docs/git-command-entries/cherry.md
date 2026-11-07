# `git cherry`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Find commits yet to be applied to upstream
## Syntax
```text
git cherry [-v] [ [ []]]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-cherry.html](../../public/git-docs/git-cherry.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-cherry/2.56.0.html).

Determine whether there are commits in <head>..<upstream> that are
equivalent to those in the range <limit>..<head>.

The equivalence test is based on the diff, after removing whitespace
and line numbers.  git-cherry therefore detects when commits have been
"copied" by means of git-cherry-pick(1), git-am(1) or
git-rebase(1).

Outputs the SHA1 of every commit in <limit>..<head>, prefixed with
- for commits that have an equivalent in <upstream>, and + for
commits that do not.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.