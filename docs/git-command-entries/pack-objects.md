# `git pack-objects`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Create a packed archive of objects
## Syntax
```text
git pack-objects [-q | --progress | --all-progress] [--all-progress-implied]
[--no-reuse-delta] [--delta-base-offset] [--non-empty]
[--local] [--incremental] [--window=] [--depth=]
[--revs [--unpacked | --all]] [--keep-pack=]
[--cruft] [--cruft-expiration=]
[--stdout [--filter=] | ]
[--shallow] [--keep-true-parents] [--[no-]sparse]
[--name-hash-version=] [--path-walk]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-pack-objects.html](../../public/git-docs/git-pack-objects.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-pack-objects/2.56.0.html).

Reads list of objects from the standard input, and writes either one or
more packed archives with the specified base-name to disk, or a packed
archive to the standard output.

A packed archive is an efficient way to transfer a set of objects
between two repositories as well as an access efficient archival
format.  In a packed archive, an object is either stored as a
compressed whole or as a difference from some other object.
The latter is often called a delta.

The packed archive format (.pack) is designed to be self-contained
so that it can be unpacked without any further information. Therefore,
each object that a delta depends upon must be present within the pack.

A pack index file (.idx) is generated for fast, random access to the
objects in the pack. Placing both the index file (.idx) and the packed
archive (.pack) in the pack/ subdirectory of $GIT_OBJECT_DIRECTORY (or
any of the directories on $GIT_ALTERNATE_OBJECT_DIRECTORIES)
enables Git to read from the pack archive.

The git unpack-objects command can read the packed archive and
expand the objects contained in the pack into "one-file
one-object" format; this is typically done by the smart-pull
commands when a pack is crea
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.