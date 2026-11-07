# `git remote-fd`
- **Category:** Internal helpers
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Reflect smart transport stream back to caller
## Syntax
The installed Git build does not ship a standalone synopsis for this internal helper.
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-remote-fd.html](../../public/git-docs/git-remote-fd.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-remote-fd/2.56.0.html).

This helper uses specified file descriptors to connect to a remote Git server.
This is not meant for end users but for programs and scripts calling git
fetch, push, or archive.

If only <infd> is given, it is assumed to be a bidirectional socket connected
to a remote Git server (git-upload-pack, git-receive-pack, or
git-upload-archive). If both <infd> and <outfd> are given, they are assumed
to be pipes connected to a remote Git server (<infd> being the inbound pipe
and <outfd> being the outbound pipe).

It is assumed that any handshaking procedures have already been completed
(such as sending service request for git://) before this helper is started.

<anything> can be any string. It is ignored. It is meant for providing
information to the user in the URL in case that URL is displayed in some
context.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.