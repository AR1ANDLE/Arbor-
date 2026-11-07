# `git hook`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Run Git hooks
## Syntax
```text
git hook run [--allow-unknown-hook-name] [--ignore-missing] [--to-stdin=] [(-j|--jobs) ]
[-- ]
git hook list [--allow-unknown-hook-name] [-z] [--show-scope]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-hook.html](../../public/git-docs/git-hook.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-hook/2.56.0.html).

A command interface for running Git hooks (see githooks(5)),
for use by other scripted Git commands.

This command parses the default configuration files for sets of configs like
so:

[hook "linter"]
event = pre-commit
command = ~/bin/linter --cpp20

In this example, [hook "linter"] represents one script - ~/bin/linter
--cpp20 - which can be shared by many repos, and even by many hook events, if
appropriate.

To add an unrelated hook which runs on a different event, for example a
spell-checker for your commit messages, you would write a configuration like so:

[hook "linter"]
event = pre-commit
command = ~/bin/linter --cpp20
[hook "spellcheck"]
event = commit-msg
command = ~/bin/spellchecker

With this config, when you run git commit, first ~/bin/linter --cpp20 will
have a chance to check your files to be committed (during the pre-commit hook
event), and then ~/bin/spellchecker will have a chance to check your commit
message (during the commit-msg hook event).

Commands are run in the order Git encounters their associated
hook.<friendly-name>.event configs during the configuration parse (see
git-config(1)). Although multiple hook.linter.event configs can be
added, only one hook.lin
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.