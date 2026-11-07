# `git filter-branch`
- **Category:** Administration & maintenance
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** destructive
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Rewrite branches
## Syntax
```text
git filter-branch [--setup ] [--subdirectory-filter ]
[--env-filter ] [--tree-filter ]
[--index-filter ] [--parent-filter ]
[--msg-filter ] [--commit-filter ]
[--tag-name-filter ] [--prune-empty]
[--original ] [-d ] [-f | --force]
[--state-branch ] [--] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-filter-branch.html](../../public/git-docs/git-filter-branch.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-filter-branch/2.56.0.html).

Lets you rewrite Git revision history by rewriting the branches mentioned
in the <rev-list-options>, applying custom filters on each revision.
Those filters can modify each tree (e.g. removing a file or running
a perl rewrite on all files) or information about each commit.
Otherwise, all information (including original commit times or merge
information) will be preserved.

The command will only rewrite the positive refs mentioned in the
command line (e.g. if you pass a..b, only b will be rewritten).
If you specify no filters, the commits will be recommitted without any
changes, which would normally have no effect.  Nevertheless, this may be
useful in the future for compensating for some Git bugs or such,
therefore such a usage is permitted.

NOTE: This command honors .git/info/grafts file and refs in
the refs/replace/ namespace.
If you have any grafts or replacement refs defined, running this command
will make them permanent.

WARNING! The rewritten history will have different object names for all
the objects and will not converge with the original branch.  You will not
be able to easily push and distribute the rewritten branch on top of the
original branch.  Please do not use this
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.