# `git replay`
- **Category:** Branching & merging
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** yes
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
EXPERIMENTAL: Replay commits on a new base, works with bare repos too
## Syntax
```text
(EXPERIMENTAL!) git replay ([--contained] --onto= | --advance= | --revert=)
[--ref=] [--ref-action=] [--linearize]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-replay.html](../../public/git-docs/git-replay.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-replay/2.56.0.html).

Takes a range of commits and replays them onto a new location. Leaves
the working tree and the index untouched. By default, updates the
relevant references using an atomic transaction (all refs update or
none). Use --ref-action=print to avoid automatic ref updates and
instead get update commands that can be piped to git update-ref --stdin
(see the OUTPUT section below).

THIS COMMAND IS EXPERIMENTAL. THE BEHAVIOR MAY CHANGE.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.