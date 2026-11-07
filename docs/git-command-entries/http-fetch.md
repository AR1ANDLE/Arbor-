# `git http-fetch`
- **Category:** Internal helpers
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Download from a remote Git repository via HTTP
## Syntax
```text
git http-fetch [-c] [-t] [-a] [-d] [-v] [-w ] [--recover] [--stdin | --packfile= | ]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-http-fetch.html](../../public/git-docs/git-http-fetch.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-http-fetch/2.56.0.html).

Downloads a remote Git repository via HTTP.

This command always gets all objects. Historically, there were three options
-a, -c and -t for choosing which objects to download. They are now
silently ignored.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.