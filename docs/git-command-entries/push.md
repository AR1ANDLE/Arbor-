# `git push`
- **Category:** Sharing & updating
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Update remote refs along with associated objects
## Syntax
```text
git push [--all | --branches | --mirror | --tags] [--follow-tags] [--atomic] [-n | --dry-run] [--receive-pack=]
[--repo=] [-f | --force] [-d | --delete] [--prune] [-q | --quiet] [-v | --verbose]
[-u | --set-upstream] [-o  | --push-option=]
[--[no-]signed | --signed=(true|false|if-asked)]
[--force-with-lease[=[:]] [--force-if-includes]]
[--no-verify] [ […​]]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-push.html](../../public/git-docs/git-push.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-push/2.56.0.html).

Updates one or more branches, tags, or other references in one or more
remote repositories from your local repository, and sends all necessary
data that isn’t already on the remote.

The simplest way to push is git push <remote> <branch>.
git push origin main will push the local main branch to the main
branch on the remote named origin.

You can also push to multiple remotes at once by using a remote group.
A remote group is a named list of remotes configured via remotes.<name>
in your git config:

$ git config remotes.all-remotes "origin gitlab backup"

Then git push all-remotes will push to origin, gitlab, and
backup in turn, as if you had run git push against each one
individually.  Each remote is pushed independently using its own
push mapping configuration. There is a remotes.<group> entry in
the configuration file. (See git-config(1)).

The <repository> argument defaults to the upstream for the current
branch, or origin if there’s no configured upstream.

To decide which branches, tags, or other refs to push, Git uses
(in order of precedence):

The <refspec> argument(s) (for example main in git push origin main)
or the --all, --mirror, or --tags options

The remote.<name>.pus
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.