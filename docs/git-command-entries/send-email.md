# `git send-email`
- **Category:** Patching & recovery
- **Git help group:** Interacting with Others
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Send a collection of patches as emails
## Syntax
```text
git send-email [] (|)…​
git send-email []
git send-email --dump-aliases
git send-email --translate-aliases
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-send-email.html](../../public/git-docs/git-send-email.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-send-email/2.56.0.html).

Takes the patches given on the command line and emails them out.
Patches can be specified as files, directories (which will send all
files in the directory), or directly as a revision list.  In the
last case, any format accepted by git-format-patch(1) can
be passed to git send-email, as well as options understood by
git-format-patch(1).

The header of the email is configurable via command-line options.  If not
specified on the command line, the user will be prompted with a ReadLine
enabled interface to provide the necessary information.

There are two formats accepted for patch files:

mbox format files

This is what git-format-patch(1) generates.  Most headers and MIME
formatting are ignored.

The original format used by Greg Kroah-Hartman’s send_lots_of_email.pl
script

This format expects the first line of the file to contain the Cc: value
and the Subject: of the message as the second line.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.