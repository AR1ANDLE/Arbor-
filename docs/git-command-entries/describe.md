# `git describe`
- **Category:** Inspection & comparison
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Give an object a human readable name based on an available ref
## Syntax
```text
git describe [--all] [--tags] [--contains] [--abbrev=] […​]
git describe [--all] [--tags] [--contains] [--abbrev=] --dirty[=]
git describe
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-describe.html](../../public/git-docs/git-describe.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-describe/2.56.0.html).

The command finds the most recent tag that is reachable from a
commit.  If the tag points to the commit, then only the tag is
shown.  Otherwise, it suffixes the tag name with the number of
additional commits on top of the tagged object and the
abbreviated object name of the most recent commit. The result
is a "human-readable" object name which can also be used to
identify the commit to other git commands.

By default (without --all or --tags) git describe only shows
annotated tags.  For more information about creating annotated tags
see the -a and -s options to git-tag(1).

If the given object refers to a blob, it will be described
as <commit-ish>:<path>, such that the blob can be found
at <path> in the <commit-ish>, which itself describes the
first commit in which this blob occurs in a reverse revision walk
from HEAD.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.