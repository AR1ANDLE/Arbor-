# `git unpack-file`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Creates a temporary file with a blob's contents
## Syntax
```text
git unpack-file
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-unpack-file.html](../../public/git-docs/git-unpack-file.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-unpack-file/2.56.0.html).

Creates a file holding the contents of the blob specified by sha1. It
returns the name of the temporary file in the following format:
.merge_file_XXXXX
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.