# `git quiltimport`
- **Category:** Specialized & interoperability
- **Git help group:** Interacting with Others
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Applies a quilt patchset onto the current branch
## Syntax
```text
git quiltimport [--dry-run | -n] [--author ] [--patches ]
[--series ] [--keep-non-patch]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-quiltimport.html](../../public/git-docs/git-quiltimport.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-quiltimport/2.56.0.html).

Applies a quilt patchset onto the current Git branch, preserving
the patch boundaries, patch order, and patch descriptions present
in the quilt patchset.

For each patch the code attempts to extract the author from the
patch description.  If that fails it falls back to the author
specified with --author.  If the --author flag was not given
the patch description is displayed and the user is asked to
interactively enter the author of the patch.

If a subject is not found in the patch description the patch name is
preserved as the 1 line subject in the Git description.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.