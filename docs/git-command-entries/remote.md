# `git remote`
- **Category:** Sharing & updating
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Manage set of tracked repositories
## Syntax
```text
git remote [-v | --verbose]
git remote add [-t ] [-m ] [-f] [--[no-]tags] [--mirror=(fetch|push)]
git remote rename [--[no-]progress]
git remote remove
git remote set-head  (-a | --auto | -d | --delete | )
git remote set-branches [--add]  …​
git remote get-url [--push] [--all]
git remote set-url [--push]   []
git remote set-url --add [--push]
git remote set-url --delete [--push]
git remote [-v | --verbose] show [-n] …​
git remote prune [-n | --dry-run] …​
git remote [-v | --verbose] update [-p | --prune] [( | )…​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-remote.html](../../public/git-docs/git-remote.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-remote/2.56.0.html).

Manage the set of repositories ("remotes") whose branches you track.
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.