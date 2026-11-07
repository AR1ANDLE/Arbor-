# `git rerere`
- **Category:** Patching & recovery
- **Git help group:** Ancillary Commands / Interrogators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Reuse recorded resolution of conflicted merges
## Syntax
```text
git rerere [clear | forget …​ | diff | status | remaining | gc]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-rerere.html](../../public/git-docs/git-rerere.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-rerere/2.56.0.html).

In a workflow employing relatively long lived topic branches,
the developer sometimes needs to resolve the same conflicts over
and over again until the topic branches are done (either merged
to the "release" branch, or sent out and accepted upstream).

This command assists the developer in this process by recording
conflicted automerge results and corresponding hand resolve results
on the initial manual merge, and applying previously recorded
hand resolutions to their corresponding automerge results.

Note

You need to set the configuration variable rerere.enabled in order to
enable this command.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.