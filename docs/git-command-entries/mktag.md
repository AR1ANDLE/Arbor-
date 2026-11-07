# `git mktag`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Manipulators
- **Difficulty:** advanced
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Creates a tag object with extra validation
## Syntax
```text
git mktag
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-mktag.html](../../public/git-docs/git-mktag.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-mktag/2.56.0.html).

Reads a tag’s contents on standard input and creates a tag object. The
output is the new tag’s <object> identifier.

This command is mostly equivalent to git-hash-object(1)
invoked with -t tag -w --stdin. I.e. both of these will create and
write a tag found in my-tag:

git mktag <my-tag
git hash-object -t tag -w --stdin <my-tag

The difference is that mktag will die before writing the tag if the
tag doesn’t pass a git-fsck(1) check.

The "fsck" check done by mktag is stricter than what git-fsck(1)
would run by default in that all fsck.<msg-id> messages are promoted
from warnings to errors (so e.g. a missing "tagger" line is an error).

Extra headers in the object are also an error under mktag, but ignored
by git-fsck(1). This extra check can be turned off by setting
the appropriate fsck.<msg-id> variable:

git -c fsck.extraHeaderEntry=ignore mktag <my-tag-with-headers
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.