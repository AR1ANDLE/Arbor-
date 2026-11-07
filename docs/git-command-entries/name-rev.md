# `git name-rev`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Find symbolic names for given revs
## Syntax
```text
git name-rev [--tags] [--refs=]
( --all | --annotate-stdin | …​ )
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-name-rev.html](../../public/git-docs/git-name-rev.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-name-rev/2.56.0.html).

Finds symbolic names suitable for human digestion for revisions given in any
format parsable by git rev-parse.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.