# `git survey`
- **Category:** Debugging & analysis
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** yes
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
DEPRECATED: Measure various repository dimensions of scale
## Syntax
```text
(DEPRECATED!) git survey
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-survey.html](../../public/git-docs/git-survey.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-survey/2.56.0.html).

Note

git survey is being superseded by git repo structure. New
deployments and new features should use git repo structure; its
--ref-filter=<pattern> option subsumes the various --branches,
--tags, and --remotes flags here, and --top=<N> provides the
same detail tables. During the deprecation phase, git survey is
a thin shim over git repo structure. See git-repo(1).

Survey the repository and measure various dimensions of scale.

As repositories grow to "monorepo" size, certain data shapes can cause
performance problems.  git-survey attempts to measure and report on
known problem areas.

Ref Selection and Reachable Objects

In this first analysis phase, git survey will iterate over the set of
requested branches, tags, and other refs and treewalk over all of the
reachable commits, trees, and blobs and generate various statistics.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.