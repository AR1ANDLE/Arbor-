# `git pack-refs`
- **Category:** Administration & maintenance
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Pack heads and tags for efficient repository access
## Syntax
```text
git pack-refs [--all] [--no-prune] [--auto] [--include ] [--exclude ]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-pack-refs.html](../../public/git-docs/git-pack-refs.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-pack-refs/2.56.0.html).

Traditionally, tips of branches and tags (collectively known as
refs) were stored one file per ref in a (sub)directory
under $GIT_DIR/refs
directory.  While many branch tips tend to be updated often,
most tags and some branch tips are never updated.  When a
repository has hundreds or thousands of tags, this
one-file-per-ref format both wastes storage and hurts
performance.

This command is used to solve the storage and performance
problem by storing the refs in a single file,
$GIT_DIR/packed-refs.  When a ref is missing from the
traditional $GIT_DIR/refs directory hierarchy, it is looked
up in this
file and used if found.

Subsequent updates to branches always create new files under
$GIT_DIR/refs directory hierarchy.

A recommended practice to deal with a repository with too many
refs is to pack its refs with --all once, and
occasionally run git pack-refs.  Tags are by
definition stationary and are not expected to change.  Branch
heads will be packed with the initial pack-refs --all, but
only the currently active branch heads will become unpacked,
and the next pack-refs (without --all) will leave them
unpacked.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.