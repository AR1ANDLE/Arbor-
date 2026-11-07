# `git replace`
- **Category:** Patching & recovery
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Create, list, delete refs to replace objects
## Syntax
```text
git replace [-f]
git replace [-f] --edit
git replace [-f] --graft  […​]
git replace [-f] --convert-graft-file
git replace -d …​
git replace [--format=] [-l []]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-replace.html](../../public/git-docs/git-replace.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-replace/2.56.0.html).

Adds a replace reference in refs/replace/ namespace.

The name of the replace reference is the SHA-1 of the object that is
replaced. The content of the replace reference is the SHA-1 of the
replacement object.

The replaced object and the replacement object must be of the same type.
This restriction can be bypassed using -f.

Unless -f is given, the replace reference must not yet exist.

There is no other restriction on the replaced and replacement objects.
Merge commits can be replaced by non-merge commits and vice versa.

Replacement references will be used by default by all Git commands
except those doing reachability traversal (prune, pack transfer and
fsck).

It is possible to disable the use of replacement references for any
command using the --no-replace-objects option just after git.

For example if commit foo has been replaced by commit bar:

$ git --no-replace-objects cat-file commit foo

shows information about commit foo, while:

$ git cat-file commit foo

shows information about commit bar.

The GIT_NO_REPLACE_OBJECTS environment variable can be set to
achieve the same effect as the --no-replace-objects option.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.