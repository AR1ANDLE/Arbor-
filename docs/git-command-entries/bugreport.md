# `git bugreport`
- **Category:** Debugging & analysis
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Collect information for user to file a bug report
## Syntax
```text
git bugreport [(-o | --output-directory) ]
[(-s | --suffix)  | --no-suffix]
[--diagnose[=]]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-bugreport.html](../../public/git-docs/git-bugreport.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-bugreport/2.56.0.html).

Collects information about the user’s machine, Git client, and repository
state, in addition to a form requesting information about the behavior the
user observed, and stores it in a single text file which the user can then
share, for example to the Git mailing list, in order to report an observed
bug.

The following information is requested from the user:

Reproduction steps

Expected behavior

Actual behavior

The following information is captured automatically:

git version --build-options

uname sysname, release, version, and machine strings

Compiler-specific info string

A list of enabled hooks

$SHELL

Additional information may be gathered into a separate zip archive using the
--diagnose option, and can be attached alongside the bugreport document to
provide additional context to readers.

This tool is invoked via the typical Git setup process, which means that in some
cases, it might not be able to launch - for example, if a relevant config file
is unreadable. In this kind of scenario, it may be helpful to manually gather
the kind of information listed above when manually asking for help.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.