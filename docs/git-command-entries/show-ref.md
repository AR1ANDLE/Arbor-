# `git show-ref`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
List references in a local repository
## Syntax
```text
git show-ref [--head] [-d | --dereference]
[-s | --hash[=]] [--abbrev[=]] [--branches] [--tags]
[--] […​]
git show-ref --verify [-q | --quiet] [-d | --dereference]
[-s | --hash[=]] [--abbrev[=]]
[--] […​]
git show-ref --exclude-existing[=]
git show-ref --exists
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-show-ref.html](../../public/git-docs/git-show-ref.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-show-ref/2.56.0.html).

Displays references available in a local repository along with the associated
commit IDs. Results can be filtered using a pattern and tags can be
dereferenced into object IDs. Additionally, it can be used to test whether a
particular ref exists.

By default, shows the tags, heads, and remote refs.

The --exclude-existing form is a filter that does the inverse. It reads
refs from stdin, one ref per line, and shows those that don’t exist in
the local repository.

The --exists form can be used to check for the existence of a single
references. This form does not verify whether the reference resolves to an
actual object.

Use of this utility is encouraged in favor of directly accessing files under
the .git directory.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.