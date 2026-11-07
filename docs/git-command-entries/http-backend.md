# `git http-backend`
- **Category:** Sharing & updating
- **Git help group:** Low-level Commands / Syncing Repositories
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Server side implementation of Git over HTTP
## Syntax
```text
git http-backend
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-http-backend.html](../../public/git-docs/git-http-backend.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-http-backend/2.56.0.html).

A simple CGI program to serve the contents of a Git repository to Git
clients accessing the repository over http:// and https:// protocols.
The program supports clients fetching using both the smart HTTP protocol
and the backwards-compatible dumb HTTP protocol, as well as clients
pushing using the smart HTTP protocol. It also supports Git’s
more-efficient "v2" protocol if properly configured; see the
discussion of GIT_PROTOCOL in the ENVIRONMENT section below.

It verifies that the directory has the magic file
"git-daemon-export-ok", and it will refuse to export any Git directory
that hasn’t explicitly been marked for export this way (unless the
GIT_HTTP_EXPORT_ALL environment variable is set).

By default, only the upload-pack service is enabled, which serves
git fetch-pack and git ls-remote clients, which are invoked from
git fetch, git pull, and git clone.  If the client is authenticated,
the receive-pack service is enabled, which serves git send-pack
clients, which is invoked from git push.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.