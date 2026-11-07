# `git annotate`
- **Category:** Inspection & comparison
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Annotate file lines with commit information
## Syntax
```text
git annotate [] [] [] [--]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-annotate.html](../../public/git-docs/git-annotate.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-annotate/2.56.0.html).

Annotates each line in the given file with information from the commit
which introduced the line. Optionally annotates from a given revision.

The only difference between this command and git-blame(1) is that
they use slightly different output formats, and this command exists only
for backward compatibility to support existing scripts, and provide a more
familiar command name for people coming from other SCM systems.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.