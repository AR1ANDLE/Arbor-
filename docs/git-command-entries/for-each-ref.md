# `git for-each-ref`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Output information on each ref
## Syntax
```text
git for-each-ref [--count=] [--shell|--perl|--python|--tcl]
[(--sort=)…​] [--format=]
[--include-root-refs] [--points-at=]
[--merged[=]] [--no-merged[=]]
[--contains[=]] [--no-contains[=]]
[(--exclude=)…​] [--start-after=]
[ --stdin | (...)]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-for-each-ref.html](../../public/git-docs/git-for-each-ref.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-for-each-ref/2.56.0.html).

Iterate over all refs that match <pattern> and show them
according to the given <format>, after sorting them according
to the given set of <key>.  If <count> is given, stop after
showing that many refs.  The interpolated values in <format>
can optionally be quoted as string literals in the specified
host language allowing their direct evaluation in that language.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.