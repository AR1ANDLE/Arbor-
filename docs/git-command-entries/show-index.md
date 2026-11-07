# `git show-index`
- **Category:** Inspection & comparison
- **Git help group:** Low-level Commands / Interrogators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Show packed archive index
## Syntax
```text
git show-index [--object-format=]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-show-index.html](../../public/git-docs/git-show-index.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-show-index/2.56.0.html).

Read the .idx file for a Git packfile (created with
git-pack-objects(1) or git-index-pack(1)) from the
standard input, and dump its contents. The output consists of one object
per line, with each line containing two or three space-separated
columns:

the first column is the offset in bytes of the object within the
corresponding packfile

the second column is the object id of the object

if the index version is 2 or higher, the third column contains the
CRC32 of the object data

The objects are output in the order in which they are found in the index
file, which should be (in a correctly constructed file) sorted by object
id.

Note that you can get more information on a packfile by calling
git-verify-pack(1). However, as this command considers only the
index file itself, it’s both faster and more flexible.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.