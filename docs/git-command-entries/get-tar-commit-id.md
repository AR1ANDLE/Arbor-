# `git get-tar-commit-id`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Extract commit ID from an archive created using git-archive
## Syntax
```text
git get-tar-commit-id
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-get-tar-commit-id.html](../../public/git-docs/git-get-tar-commit-id.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-get-tar-commit-id/2.56.0.html).

Read a tar archive created by git archive from the standard input
and extract the commit ID stored in it.  It reads only the first
1024 bytes of input, thus its runtime is not influenced by the size
of the tar archive very much.

If no commit ID is found, git get-tar-commit-id quietly exits with a
return code of 1.  This can happen if the archive had not been created
using git archive or if the first parameter of git archive had been
a tree ID instead of a commit ID or tag.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.