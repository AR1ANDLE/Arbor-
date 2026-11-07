# `git fast-import`
- **Category:** Plumbing & object storage
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Backend for fast Git data importers
## Syntax
```text
git fast-import []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-fast-import.html](../../public/git-docs/git-fast-import.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-fast-import/2.56.0.html).

This program is usually not what the end user wants to run directly.
Most end users want to use one of the existing frontend programs,
which parses a specific type of foreign source and feeds the contents
stored there to git fast-import.

fast-import reads a mixed command/data stream from standard input and
writes one or more packfiles directly into the current repository.
When EOF is received on standard input, fast import writes out
updated branch and tag refs, fully updating the current repository
with the newly imported data.

The fast-import backend itself can import into an empty repository (one that
has already been initialized by git init) or incrementally
update an existing populated repository.  Whether or not incremental
imports are supported from a particular foreign source depends on
the frontend program in use.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.