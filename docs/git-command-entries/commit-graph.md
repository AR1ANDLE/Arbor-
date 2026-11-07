# `git commit-graph`
- **Category:** Administration & maintenance
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Write and verify Git commit-graph files
## Syntax
```text
git commit-graph verify [--object-dir ] [--shallow] [--[no-]progress]
git commit-graph write [--object-dir ] [--append]
[--split[=]] [--reachable | --stdin-packs | --stdin-commits]
[--changed-paths] [--[no-]max-new-filters ] [--[no-]progress]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-commit-graph.html](../../public/git-docs/git-commit-graph.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-commit-graph/2.56.0.html).

Manage the serialized commit-graph file.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.