# `git check-attr`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Display gitattributes information
## Syntax
```text
git check-attr [--source ] [-a | --all | …​] [--] …​
git check-attr --stdin [-z] [--source ] [-a | --all | …​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-check-attr.html](../../public/git-docs/git-check-attr.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-check-attr/2.56.0.html).

For every pathname, this command will list if each attribute is unspecified,
set, or unset as a gitattribute on that pathname.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.