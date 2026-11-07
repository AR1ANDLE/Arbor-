# `git fetch`
- **Category:** Sharing & updating
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Download objects and refs from another repository
## Syntax
```text
git fetch [] [ […​]]
git fetch []
git fetch --multiple [] [(|)…​]
git fetch --all []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-fetch.html](../../public/git-docs/git-fetch.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-fetch/2.56.0.html).

Fetch branches and/or tags (collectively, "refs") from one or more
other repositories, along with the objects necessary to complete their
histories.  Remote-tracking branches are updated (see the description
of <refspec> below for ways to control this behavior).

By default, any tag that points into the histories being fetched is
also fetched; the effect is to fetch tags that
point at branches that you are interested in.  This default behavior
can be changed by using the --tags or --no-tags options or by
configuring remote.<name>.tagOpt.  By using a refspec that fetches tags
explicitly, you can fetch tags that do not point into branches you
are interested in as well.

git fetch can fetch from either a single named repository or URL,
or from several repositories at once if <group> is given and
there is a remotes.<group> entry in the configuration file.
(See git-config(1)).

When no remote is specified, by default the origin remote will be used,
unless there’s an upstream branch configured for the current branch.

The names of refs that are fetched, together with the object names
they point at, are written to .git/FETCH_HEAD.  This information
may be used by scripts or other git comm
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.