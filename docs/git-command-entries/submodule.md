# `git submodule`
- **Category:** Sharing & updating
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Initialize, update or inspect submodules
## Syntax
```text
git submodule [--quiet] [--cached]
git submodule [--quiet] add [] [--]  []
git submodule [--quiet] status [--cached] [--recursive] [--] […​]
git submodule [--quiet] init [--] […​]
git submodule [--quiet] deinit [-f|--force] (--all|[--] ...)
git submodule [--quiet] update [] [--] […​]
git submodule [--quiet] set-branch [] [--]
git submodule [--quiet] set-url [--]
git submodule [--quiet] summary [] [--] […​]
git submodule [--quiet] foreach [--recursive]
git submodule [--quiet] sync [--recursive] [--] […​]
git submodule [--quiet] absorbgitdirs [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-submodule.html](../../public/git-docs/git-submodule.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-submodule/2.56.0.html).

Inspects, updates and manages submodules.

For more information about submodules, see gitsubmodules(7).
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.