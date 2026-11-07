# `git help`
- **Category:** Setup & configuration
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** informational
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Display help information about Git
## Syntax
```text
git help [-a|--all] [--[no-]verbose] [--[no-]external-commands] [--[no-]aliases]
git help [[-i|--info] [-m|--man] [-w|--web]] [|]
git help [-g|--guides]
git help [-c|--config]
git help [--user-interfaces]
git help [--developer-interfaces]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-help.html](../../public/git-docs/git-help.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-help/2.56.0.html).

With no options and no <command> or <doc> given, the synopsis of the git
command and a list of the most commonly used Git commands are printed
on the standard output.

If the option --all or -a is given, all available commands are
printed on the standard output.

If the option --guides or -g is given, a list of the
Git concept guides is also printed on the standard output.

If a command or other documentation is given, the relevant manual page
will be brought up. The man program is used by default for this
purpose, but this can be overridden by other options or configuration
variables.

If an alias is given, git shows the definition of the alias on
standard output. To get the manual page for the aliased command, use
git <command> --help.

Note that git --help ... is identical to git help ... because the
former is internally converted into the latter.

To display the git(1) man page, use git help git.

This page can be displayed with git help help or git help --help.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.