# `git upload-pack`
- **Category:** Sharing & updating
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Send objects packed back to git-fetch-pack
## Syntax
```text
git-upload-pack [--[no-]strict] [--timeout=] [--stateless-rpc]
[--advertise-refs]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-upload-pack.html](../../public/git-docs/git-upload-pack.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-upload-pack/2.56.0.html).

Invoked by git fetch-pack, learns what
objects the other side is missing, and sends them after packing.

This command is usually not invoked directly by the end user.
The UI for the protocol is on the git fetch-pack side, and the
program pair is meant to be used to pull updates from a remote
repository.  For push operations, see git send-pack.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.