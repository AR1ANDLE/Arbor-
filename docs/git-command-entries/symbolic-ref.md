# `git symbolic-ref`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Read, modify and delete symbolic refs
## Syntax
```text
git symbolic-ref [-m ]
git symbolic-ref [-q] [--short] [--no-recurse]
git symbolic-ref --delete [-q]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-symbolic-ref.html](../../public/git-docs/git-symbolic-ref.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-symbolic-ref/2.56.0.html).

Given one argument, reads which branch head the given symbolic
ref refers to and outputs its path, relative to the .git/
directory.  Typically you would give HEAD as the <name>
argument to see which branch your working tree is on.

Given two arguments, creates or updates a symbolic ref <name> to
point at the given branch <ref>.

Given --delete and an additional argument, deletes the given
symbolic ref.

A symbolic ref is a regular file that stores a string that
begins with ref: refs/.  For example, your .git/HEAD is
a regular file whose content is ref: refs/heads/master.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.