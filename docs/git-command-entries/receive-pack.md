# `git receive-pack`
- **Category:** Sharing & updating
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Receive what is pushed into the repository
## Syntax
```text
git receive-pack
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-receive-pack.html](../../public/git-docs/git-receive-pack.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-receive-pack/2.56.0.html).

Invoked by git send-pack and updates the repository with the
information fed from the remote end.

This command is usually not invoked directly by the end user.
The UI for the protocol is on the git send-pack side, and the
program pair is meant to be used to push updates to a remote
repository.  For pull operations, see git-fetch-pack(1).

The command allows for the creation and fast-forwarding of sha1 refs
(heads/tags) on the remote end (strictly speaking, it is the
local end git-receive-pack runs, but to the user who is sitting at
the send-pack end, it is updating the remote.  Confused?)

There are other real-world examples of using update and
post-update hooks found in the Documentation/howto directory.

git-receive-pack honours the receive.denyNonFastForwards config
option, which tells it if updates to a ref should be denied if they
are not fast-forwards.

A number of other receive.* config options are available to tweak
its behavior, see git-config(1).
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.