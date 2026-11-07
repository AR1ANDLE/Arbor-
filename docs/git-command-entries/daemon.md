# `git daemon`
- **Category:** Sharing & updating
- **Git help group:** Low-level Commands / Syncing Repositories
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
A really simple server for Git repositories
## Syntax
```text
git daemon [--verbose] [--syslog] [--export-all]
[--timeout=] [--init-timeout=] [--max-connections=]
[--strict-paths] [--base-path=] [--base-path-relaxed]
[--user-path | --user-path=]
[--interpolated-path=]
[--reuseaddr] [--detach] [--pid-file=]
[--enable=] [--disable=]
[--allow-override=] [--forbid-override=]
[--access-hook=] [--[no-]informative-errors]
[--inetd |
[--listen=] [--port=]
[--user= [--group=]]]
[--log-destination=(stderr|syslog|none)]
[…​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-daemon.html](../../public/git-docs/git-daemon.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-daemon/2.56.0.html).

A really simple TCP Git daemon that normally listens on port "DEFAULT_GIT_PORT"
aka 9418.  It waits for a connection asking for a service, and will serve
that service if it is enabled.

It verifies that the directory has the magic file "git-daemon-export-ok", and
it will refuse to export any Git directory that hasn’t explicitly been marked
for export this way (unless the --export-all parameter is specified). If you
pass some directory paths as git daemon arguments, the offers are limited to
repositories within those directories.

By default, only upload-pack service is enabled, which serves
git fetch-pack and git ls-remote clients, which are invoked
from git fetch, git pull, and git clone.

This is ideally suited for read-only updates, i.e., pulling from
Git repositories.

An upload-archive also exists to serve git archive.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.