# `git request-pull`
- **Category:** Patching & recovery
- **Git help group:** Interacting with Others
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Generates a summary of pending changes
## Syntax
```text
git request-pull [-p]   []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-request-pull.html](../../public/git-docs/git-request-pull.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-request-pull/2.56.0.html).

Generate a request asking your upstream project to pull changes into
their tree.  The request, printed to the standard output,
begins with the branch description, summarizes
the changes, and indicates from where they can be pulled.

The upstream project is expected to have the commit named by
<start> and the output asks it to integrate the changes you made
since that commit, up to the commit named by <end>, by visiting
the repository named by <URL>.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.