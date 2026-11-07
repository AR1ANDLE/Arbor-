# `git multi-pack-index`
- **Category:** Administration & maintenance
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Write and verify multi-pack-indexes
## Syntax
```text
git multi-pack-index [] write [--preferred-pack=]
[--[no-]bitmap] [--[no-]incremental] [--[no-]stdin-packs]
[--refs-snapshot=] [--[no-]write-chain-file]
[--base=]
git multi-pack-index [] compact [--[no-]incremental]
[--[no-]bitmap] [--base=] [--[no-]write-chain-file]

git multi-pack-index [] verify
git multi-pack-index [] expire
git multi-pack-index [] repack [--batch-size=]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-multi-pack-index.html](../../public/git-docs/git-multi-pack-index.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-multi-pack-index/2.56.0.html).

Write or verify a multi-pack-index (MIDX) file.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.