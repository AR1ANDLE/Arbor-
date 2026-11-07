# `git fsmonitor--daemon`
- **Category:** Internal helpers
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
A Built-in Filesystem Monitor
## Syntax
```text
git fsmonitor--daemon start
git fsmonitor--daemon run
git fsmonitor--daemon stop
git fsmonitor--daemon status
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-fsmonitor--daemon.html](../../public/git-docs/git-fsmonitor--daemon.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-fsmonitor--daemon/2.56.0.html).

A daemon to watch the working directory for file and directory
changes using platform-specific filesystem notification facilities.

This daemon communicates directly with commands like git status
using the simple IPC interface
instead of the slower githooks(5) interface.

This daemon is built into Git so that no third-party tools are
required.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.