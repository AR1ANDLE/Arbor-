# `git hash-object`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Compute object ID and optionally create an object from a file
## Syntax
```text
git hash-object [-t ] [-w] [--path= | --no-filters]
[--stdin [--literally]] [--] …​
git hash-object [-t ] [-w] --stdin-paths [--no-filters]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-hash-object.html](../../public/git-docs/git-hash-object.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-hash-object/2.56.0.html).

Computes the object ID value for an object with specified type
with the contents of the named file (which can be outside of the
work tree), and optionally writes the resulting object into the
object database.  Reports its object ID to its standard output.
When <type> is not specified, it defaults to "blob".
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.