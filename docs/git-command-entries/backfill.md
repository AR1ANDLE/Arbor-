# `git backfill`
- **Category:** Sharing & updating
- **Git help group:** Main Porcelain Commands
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Download missing objects in a partial clone
## Syntax
```text
git backfill [--min-batch-size=] [--[no-]sparse] [--[no-]include-edges] []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-backfill.html](../../public/git-docs/git-backfill.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-backfill/2.56.0.html).

Blobless partial clones are created using git clone --filter=blob:none
and then configure the local repository such that the Git client avoids
downloading blob objects unless they are required for a local operation.
This initially means that the clone and later fetches download reachable
commits and trees but no blobs. Later operations that change the HEAD
pointer, such as git checkout or git merge, may need to download
missing blobs in order to complete their operation.

In the worst cases, commands that compute blob diffs, such as git blame,
become very slow as they download the missing blobs in single-blob
requests to satisfy the missing object as the Git command needs it. This
leads to multiple download requests and no ability for the Git server to
provide delta compression across those objects.

The git backfill command provides a way for the user to request that
Git downloads the missing blobs (with optional filters) such that the
missing blobs representing historical versions of files can be downloaded
in batches. The backfill command attempts to optimize the request by
grouping blobs that appear at the same path, hopefully leading to good
delta compression in the packfile s
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.