# `git sh-i18n--envsubst`
- **Category:** Internal helpers
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Git's own envsubst(1) for i18n fallbacks
## Syntax
```text
eval_gettext () {
printf "%s" "$1" | (
export PATH $(git sh-i18n--envsubst --variables "$1");
git sh-i18n--envsubst "$1"
)
}
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-sh-i18n--envsubst.html](../../public/git-docs/git-sh-i18n--envsubst.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-sh-i18n--envsubst/2.56.0.html).

This is not a command the end user would want to run.  Ever.
This documentation is meant for people who are studying the
plumbing scripts and/or are writing new ones.

git sh-i18n--envsubst is Git’s stripped-down copy of the GNU
envsubst(1) program that comes with the GNU gettext package. It’s
used internally by git-sh-i18n(1) to interpolate the variables
passed to the eval_gettext function.

No promises are made about the interface, or that this
program won’t disappear without warning in the next version
of Git. Don’t use it.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.