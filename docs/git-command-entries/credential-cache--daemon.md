# `git credential-cache--daemon`
- **Category:** Internal helpers
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Temporarily store user credentials in memory
## Syntax
```text
git credential-cache--daemon [--debug]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-credential-cache--daemon.html](../../public/git-docs/git-credential-cache--daemon.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-credential-cache--daemon/2.56.0.html).

Note

You probably don’t want to invoke this command yourself; it is
started automatically when you use git-credential-cache(1).

This command listens on the Unix domain socket specified by <socket-path>
for git-credential-cache clients. Clients may store and retrieve
credentials. Each credential is held for a timeout specified by the
client; once no credentials are held, the daemon exits.

If the --debug option is specified, the daemon does not close its
stderr stream, and may output extra diagnostics to it even after it has
begun listening for clients.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.