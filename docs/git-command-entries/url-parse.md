# `git url-parse`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Parse and extract git URL components
## Syntax
```text
git url-parse [-c ] [--] …​
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-url-parse.html](../../public/git-docs/git-url-parse.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-url-parse/2.56.0.html).

Git supports many ways to specify URLs, some of them non-standard.
For example, git supports the scp style [user@]host:[path] format.
This command eases interoperability with git URLs by enabling the
parsing and extraction of the components of all git URLs.

Any syntactically valid URL is parsed, even if the scheme is not one
git supports for fetching or pushing.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.