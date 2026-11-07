# `git bundle`
- **Category:** Sharing & updating
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Move objects and refs by archive
## Syntax
```text
git bundle create [-q | --quiet | --progress]
[--version=]
git bundle verify [-q | --quiet]
git bundle list-heads  […​]
git bundle unbundle [--progress]  […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-bundle.html](../../public/git-docs/git-bundle.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-bundle/2.56.0.html).

Create, unpack, and manipulate "bundle" files. Bundles are used for
the "offline" transfer of Git objects without an active "server"
sitting on the other side of the network connection.

They can be used to create both incremental and full backups of a
repository (see the "full backup" example in "EXAMPLES"), and to relay
the state of the references in one repository to another (see the second
example).

Git commands that fetch or otherwise "read" via protocols such as
ssh:// and https:// can also operate on bundle files. It is
possible git-clone(1) a new repository from a bundle, to use
git-fetch(1) to fetch from one, and to list the references
contained within it with git-ls-remote(1). There’s no
corresponding "write" support, i.e. a git push into a bundle is not
supported.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.