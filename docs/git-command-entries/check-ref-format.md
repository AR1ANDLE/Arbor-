# `git check-ref-format`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Ensures that a reference name is well formed
## Syntax
```text
git check-ref-format [--normalize]
[--[no-]allow-onelevel] [--refspec-pattern]

git check-ref-format --branch
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-check-ref-format.html](../../public/git-docs/git-check-ref-format.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-check-ref-format/2.56.0.html).

Checks if a given refname is acceptable, and exits with a non-zero
status if it is not.

A reference is used in Git to specify branches and tags.  A
branch head is stored in the refs/heads hierarchy, while
a tag is stored in the refs/tags hierarchy of the ref namespace
(typically in $GIT_DIR/refs/heads and $GIT_DIR/refs/tags
directories or, as entries in file $GIT_DIR/packed-refs
if refs are packed by git gc).

Git imposes the following rules on how references are named:

They can include slash / for hierarchical (directory)
grouping, but no slash-separated component can begin with a
dot . or end with the sequence .lock.

They must contain at least one /. This enforces the presence of a
category like heads/, tags/ etc. but the actual names are not
restricted.  If the --allow-onelevel option is used, this rule
is waived.

They cannot have two consecutive dots .. anywhere.

They cannot have ASCII control characters (i.e. bytes whose
values are lower than \040, or \177 DEL), space, tilde ~,
caret ^, or colon : anywhere.

They cannot have question-mark ?, asterisk *, or open
bracket [ anywhere.  See the --refspec-pattern option below for
an exception to this rule.

They cannot begin or
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.