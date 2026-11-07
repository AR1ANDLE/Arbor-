# `git credential`
- **Category:** Setup & configuration
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Retrieve and store user credentials
## Syntax
```text
'git credential' (fill|approve|reject|capability)
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-credential.html](../../public/git-docs/git-credential.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-credential/2.56.0.html).

Git has an internal interface for storing and retrieving credentials
from system-specific helpers, as well as prompting the user for
usernames and passwords. The git-credential command exposes this
interface to scripts which may want to retrieve, store, or prompt for
credentials in the same manner as Git. The design of this scriptable
interface models the internal C API; see credential.h for more
background on the concepts.

git-credential takes an "action" option on the command-line (one of
fill, approve, or reject) and reads a credential description
on stdin (see INPUT/OUTPUT FORMAT).

If the action is fill, git-credential will attempt to add "username"
and "password" attributes to the description by reading config files,
by contacting any configured credential helpers, or by prompting the
user. The username and password attributes of the credential
description are then printed to stdout together with the attributes
already provided.

If the action is approve, git-credential will send the description
to any configured credential helpers, which may store the credential
for later use.

If the action is reject, git-credential will send the description to
any configured credential he
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.