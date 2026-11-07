# `git upload-archive`
- **Category:** Sharing & updating
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Send archive back to git-archive
## Syntax
```text
git upload-archive
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-upload-archive.html](../../public/git-docs/git-upload-archive.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-upload-archive/2.56.0.html).

Invoked by git archive --remote and sends a generated archive to the
other end over the Git protocol.

This command is usually not invoked directly by the end user.  The UI
for the protocol is on the git archive side, and the program pair
is meant to be used to get an archive from a remote repository.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.