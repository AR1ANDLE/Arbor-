# `git whatchanged`
- **Category:** Specialized & interoperability
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Show logs with differences each commit introduces
## Syntax
```text
git whatchanged …​
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-whatchanged.html](../../public/git-docs/git-whatchanged.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-whatchanged/2.56.0.html).

Shows commit logs and diff output each commit introduces.

New users are encouraged to use git-log(1) instead.  The
whatchanged command is essentially the same as git-log(1)
but defaults to showing the raw format diff output and skipping merges:

git log --raw --no-merges

The command is primarily kept for historical reasons; fingers of
many people who learned Git long before git log was invented by
reading the Linux kernel mailing list are trained to type it.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.