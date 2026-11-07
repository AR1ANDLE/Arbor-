# `git am`
- **Category:** Patching & recovery
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Apply a series of patches from a mailbox
## Syntax
```text
git am [--signoff] [--keep] [--[no-]keep-cr] [--[no-]utf8] [--[no-]verify]
[--[no-]3way] [--interactive] [--committer-date-is-author-date]
[--ignore-date] [--ignore-space-change | --ignore-whitespace]
[--whitespace=] [-C] [-p] [--directory=]
[--exclude=] [--include=] [--reject] [-q | --quiet]
[--[no-]scissors] [-S[]] [--patch-format=]
[--quoted-cr=]
[--empty=(stop|drop|keep)]
[( | )…​]
git am (--continue | --skip | --abort | --quit | --retry | --show-current-patch[=(diff|raw)] | --allow-empty)
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-am.html](../../public/git-docs/git-am.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-am/2.56.0.html).

Splits mail messages in a mailbox into commit log messages,
authorship information, and patches, and applies them to the
current branch. You could think of it as a reverse operation
of git-format-patch(1) run on a branch with a straight
history without merges.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.