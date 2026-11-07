# `git range-diff`
- **Category:** Branching & merging
- **Git help group:** Main Porcelain Commands
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Compare two commit ranges (e.g. two versions of a branch)
## Syntax
```text
git range-diff [--color=[]] [--no-color] []
[--no-dual-color] [--creation-factor=]
[--left-only | --right-only] [--diff-merges=]
[--remerge-diff] [--no-notes | --notes[=]]
(   | ... |    )
[[--] …​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-range-diff.html](../../public/git-docs/git-range-diff.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-range-diff/2.56.0.html).

This command shows the differences between two versions of a patch
series, or more generally, two commit ranges (ignoring merge commits).

In the presence of <path> arguments, these commit ranges are limited
accordingly.

To that end, it first finds pairs of commits from both commit ranges
that correspond with each other. Two commits are said to correspond when
the diff between their patches (i.e. the author information, the commit
message and the commit diff) is reasonably small compared to the
patches' size. See Algorithm below for details.

Finally, the list of matching commits is shown in the order of the
second commit range, with unmatched commits being inserted just after
all of their ancestors have been shown.

There are three ways to specify the commit ranges:

<range1> <range2>: Either commit range can be of the form
<base>..<rev>, <rev>^! or <rev>^-<n>. See SPECIFYING RANGES
in gitrevisions(7) for more details.

<rev1>...<rev2>. This is equivalent to
<rev2>..<rev1> <rev1>..<rev2>.

<base> <rev1> <rev2>: This is equivalent to <base>..<rev1>
<base>..<rev2>.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.