# `git update-ref`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Update the object name stored in a ref safely
## Syntax
```text
git update-ref [-m ] [--no-deref] -d  []
git update-ref [-m ] [--no-deref] [--create-reflog]   []
git update-ref [-m ] [--no-deref] --stdin [-z] [--batch-updates]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-update-ref.html](../../public/git-docs/git-update-ref.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-update-ref/2.56.0.html).

Given two arguments, stores the <new-oid> in the <ref>, possibly
dereferencing the symbolic refs.  E.g. git update-ref HEAD
<new-oid> updates the current branch head to the new object.

Given three arguments, stores the <new-oid> in the <ref>,
possibly dereferencing the symbolic refs, after verifying that
the current value of the <ref> matches <old-oid>.
E.g. git update-ref refs/heads/master <new-oid> <old-oid>
updates the master branch head to <new-oid> only if its current
value is <old-oid>.  You can specify 40 "0" or an empty string
as <old-oid> to make sure that the ref you are creating does
not exist.

The final arguments are object names; this command without any options
does not support updating a symbolic ref to point to another ref (see
git-symbolic-ref(1)).  But git update-ref --stdin does have
the symref-* commands so that regular refs and symbolic refs can be
committed in the same transaction.

If --no-deref is given, <ref> itself is overwritten, rather than
the result of following the symbolic pointers.

With -d, it deletes the named <ref> after verifying that it
still contains <old-oid>.

With --stdin, update-ref reads instructions from standard input and
performs all
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.