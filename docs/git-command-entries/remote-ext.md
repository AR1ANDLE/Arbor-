# `git remote-ext`
- **Category:** Internal helpers
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Bridge smart transport to external command.
## Syntax
```text
git remote add  "ext::[ …​]"
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-remote-ext.html](../../public/git-docs/git-remote-ext.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-remote-ext/2.56.0.html).

This remote helper uses the specified <command> to connect
to a remote Git server.

Data written to stdin of the specified <command> is assumed
to be sent to a git:// server, git-upload-pack, git-receive-pack
or git-upload-archive (depending on situation), and data read
from stdout of <command> is assumed to be received from
the same service.

Command and arguments are separated by an unescaped space.

The following sequences have a special meaning:

'% '

Literal space in command or argument.

%%

Literal percent sign.

%s

Replaced with name (receive-pack, upload-pack, or
upload-archive) of the service Git wants to invoke.

%S

Replaced with long name (git-receive-pack,
git-upload-pack, or git-upload-archive) of the service
Git wants to invoke.

%G (must be the first characters in an argument)

This argument will not be passed to <command>. Instead, it
will cause the helper to start by sending git:// service requests to
the remote side with the service field set to an appropriate value and
the repository field set to the rest of the argument. Default is not to send
such a request.

This is useful if the remote side is git:// server accessed over
some tunnel.

%V (must be first ch
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.