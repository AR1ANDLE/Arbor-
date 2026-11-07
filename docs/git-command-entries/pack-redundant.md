# `git pack-redundant`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Find redundant pack files
## Syntax
```text
git pack-redundant [--verbose] [--alt-odb] (--all | …​)
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-pack-redundant.html](../../public/git-docs/git-pack-redundant.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-pack-redundant/2.56.0.html).

This program computes which packs in your repository
are redundant. The output is suitable for piping to
xargs rm if you are in the root of the repository.

git pack-redundant accepts a list of objects on standard input. Any objects
given will be ignored when checking which packs are required. This makes the
following command useful when wanting to remove packs which contain unreachable
objects.

git fsck --full --unreachable | cut -d ' ' -f3 | \
git pack-redundant --all | xargs rm
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.