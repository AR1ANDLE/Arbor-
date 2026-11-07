# `git mailsplit`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Simple UNIX mbox splitter program
## Syntax
```text
git mailsplit [-b] [-f] [-d] [--keep-cr] [--mboxrd]
-o [--] [(|)…​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-mailsplit.html](../../public/git-docs/git-mailsplit.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-mailsplit/2.56.0.html).

Splits a mbox file or a Maildir into a list of files: "0001" "0002" ..  in the
specified directory so you can process them further from there.

Important

Maildir splitting relies upon filenames being sorted to output
patches in the correct order.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.