# `git config`
- **Category:** Setup & configuration
- **Git help group:** Ancillary Commands / Manipulators
- **Difficulty:** intermediate
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** supported by the explicit educational allowlist
- **Target version:** 2.56.0.windows.1
## Overview
Get and set repository or global options
## Syntax
```text
git config list [] [] [--includes]
git config get [] [] [--includes] [--all] [--regexp] [--value=] [--fixed-value] [--default=] [--url=]
git config set [] [--type=] [--all] [--value=] [--fixed-value]
git config unset [] [--all] [--value=] [--fixed-value]
git config rename-section []
git config remove-section []
git config edit []
git config [] --get-colorbool  []
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-config.html](../../public/git-docs/git-config.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-config/2.56.0.html).

You can query/set/replace/unset options with this command. The name is
actually the section and the key separated by a dot, and the value will be
escaped.

Multiple lines can be added to an option by using the --append option.
If you want to update or unset an option which can occur on multiple
lines, --value=<pattern> (which is an extended regular expression,
unless the --fixed-value option is given) needs to be given.  Only the
existing values that match the pattern are updated or unset.  If
you want to handle the lines that do not match the pattern, just
prepend a single exclamation mark in front (see also EXAMPLES),
but note that this only works when the --fixed-value option is not
in use.

The --type=<type> option instructs git config to ensure that incoming and
outgoing values are canonicalize-able under the given <type>.  If no
--type=<type> is given, no canonicalization will be performed. Callers may
unset an existing --type specifier with --no-type.

When reading, the values are read from the system, global and
repository local configuration files by default, and options
--system, --global, --local, --worktree and
--file <filename> can be used to tell the command to read f
## Execution boundary
This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command.