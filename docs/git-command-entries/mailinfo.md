# `git mailinfo`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Extracts patch and authorship from a single e-mail message
## Syntax
```text
git mailinfo [-k|-b] [-u | --encoding= | -n]
[--[no-]scissors] [--quoted-cr=]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-mailinfo.html](../../public/git-docs/git-mailinfo.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-mailinfo/2.56.0.html).

Reads a single e-mail message from the standard input, and
writes the commit log message in <msg> file, and the patches in
<patch> file.  The author name, e-mail and e-mail subject are
written out to the standard output to be used by git am
to create a commit.  It is usually not necessary to use this
command directly.  See git-am(1) instead.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.