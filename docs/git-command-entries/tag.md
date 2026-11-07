# `git tag`
- **Category:** Specialized & interoperability
- **Git help group:** Main Porcelain Commands
- **Difficulty:** beginner
- **Typical risk:** history-modifying
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Create, list, delete or verify tags
## Syntax
```text
git tag [-a | -s | -u ] [-f] [-m  | -F ] [-e]
[(--trailer [(=|:)])…​]
[ | ]
git tag -d …​
git tag [-n[]] -l [--contains ] [--no-contains ]
[--points-at ] [--column[=] | --no-column]
[--create-reflog] [--sort=] [--format=]
[--merged ] [--no-merged ] […​]
git tag -v [--format=] …​
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-tag.html](../../public/git-docs/git-tag.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-tag/2.56.0.html).

Add a tag reference in refs/tags/, unless -d/-l/-v is given
to delete, list or verify tags.

Unless -f is given, the named tag must not yet exist.

If one of -a, -s, or -u <key-id> is passed, the command
creates a tag object, and requires a tag message.  Unless
-m <msg> or -F <file> is given, an editor is started for the user to type
in the tag message.

If -m <msg> or -F <file> or --trailer <token>[=<value>] is given
and -a, -s, and -u <key-id> are absent, -a is implied.

Otherwise, a tag reference that points directly at the given object
(i.e., a lightweight tag) is created.

A cryptographically signed tag object will be created when -s or
-u <key-id> is used. The signing backend (GPG, X.509, SSH, etc.) is
controlled by the gpg.format configuration variable, defaulting to
OpenPGP. When -u <key-id> is not used, the committer identity for
the current user is used to find the key for signing. The
configuration variable gpg.program is used to specify a custom
signing binary.

Tag objects (created with -a, -s, or -u) are called "annotated"
tags; they contain a creation date, the tagger name and e-mail, a
tagging message, and an optional cryptographic signature. Whereas a
"lightweight"
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.