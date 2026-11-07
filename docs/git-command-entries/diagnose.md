# `git diagnose`
- **Category:** Debugging & analysis
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Generate a zip archive of diagnostic information
## Syntax
```text
git diagnose [(-o | --output-directory) ] [(-s | --suffix) ]
[--mode=]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-diagnose.html](../../public/git-docs/git-diagnose.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-diagnose/2.56.0.html).

Collects detailed information about the user’s machine, Git client, and
repository state and packages that information into a zip archive. The
generated archive can then, for example, be shared with the Git mailing list to
help debug an issue or serve as a reference for independent debugging.

By default, the following information is captured in the archive:

git version --build-options

The path to the repository root

The available disk space on the filesystem

The name and size of each packfile, including those in alternate object
stores

The total count of loose objects, as well as counts broken down by
.git/objects subdirectory

Additional information can be collected by selecting a different diagnostic mode
using the --mode option.

This tool differs from git-bugreport(1) in that it collects much more
detailed information with a greater focus on reporting the size and data shape
of repository contents.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.