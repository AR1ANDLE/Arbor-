# `git imap-send`
- **Category:** Patching & recovery
- **Git help group:** Interacting with Others
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Send a collection of patches from stdin to an IMAP folder
## Syntax
```text
git imap-send [-v] [-q] [--[no-]curl] [--[no-]draft] [(--folder|-f) ]
git imap-send --list
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-imap-send.html](../../public/git-docs/git-imap-send.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-imap-send/2.56.0.html).

This command uploads a mailbox generated with git format-patch
into an IMAP drafts folder.  This allows patches to be sent as
other email is when using mail clients that cannot read mailbox
files directly. The command also works with any general mailbox
in which emails have the fields From, Date, and Subject in
that order.

Typical usage is something like:

$ git format-patch --signoff --stdout --attach origin | git imap-send
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.