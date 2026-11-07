# `git subtree`
- **Category:** Internal helpers
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Merge subtrees together and split repository into subtrees
## Syntax
```text
git subtree [] -P  [-S[]] add
git subtree [] -P  [-S[]] add
git subtree [] -P  [-S[]] merge  []
git subtree [] -P  [-S[]] split []

git subtree [] -P  [-S[]] pull
git subtree [] -P  [-S[]] push
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-subtree.html](../../public/git-docs/git-subtree.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-subtree/2.56.0.html).

Subtrees allow subprojects to be included within a subdirectory
of the main project, optionally including the subproject’s
entire history.

For example, you could include the source code for a library
as a subdirectory of your application.

Subtrees are not to be confused with submodules, which are meant for
the same task. Unlike submodules, subtrees do not need any special
constructions (like .gitmodules files or gitlinks) be present in
your repository, and do not force end-users of your
repository to do anything special or to understand how subtrees
work. A subtree is just a subdirectory that can be
committed to, branched, and merged along with your project in
any way you want.

They are also not to be confused with using the subtree merge
strategy. The main difference is that, besides merging
the other project as a subdirectory, you can also extract the
entire history of a subdirectory from your project and make it
into a standalone project. Unlike the subtree merge strategy
you can alternate back and forth between these
two operations. If the standalone library gets updated, you can
automatically merge the changes into your project; if you
update the library inside your project
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.