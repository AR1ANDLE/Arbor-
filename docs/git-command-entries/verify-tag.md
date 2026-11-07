# `git verify-tag`
- **Category:** Debugging & analysis
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Check the GPG signature of tags
## Syntax
```text
git verify-tag [-v | --verbose] [--format=] [--raw] …​
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-verify-tag.html](../../public/git-docs/git-verify-tag.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-verify-tag/2.56.0.html).

Validates the gpg signature created by git tag in the tag
objects listed on the command line.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.