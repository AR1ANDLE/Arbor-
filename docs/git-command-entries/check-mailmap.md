# `git check-mailmap`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Show canonical names and email addresses of contacts
## Syntax
```text
git check-mailmap [] …​
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-check-mailmap.html](../../public/git-docs/git-check-mailmap.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-check-mailmap/2.56.0.html).

For each “Name <user@host>”, “<user@host>”, or “user@host”
from the command-line or standard input (when using --stdin), look up the
person’s canonical name and email address (see "Mapping Authors" below). If
found, print them; otherwise print the input as-is.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.