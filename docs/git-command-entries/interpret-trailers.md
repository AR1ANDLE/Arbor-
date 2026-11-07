# `git interpret-trailers`
- **Category:** Plumbing & object storage
- **Git help group:** Low-level Commands / Internal Helpers
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Add or parse metadata in commit messages
## Syntax
```text
git interpret-trailers [--in-place] [--trim-empty]
[(--trailer (|)[(=|:)])…​]
[--parse] […​]
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-interpret-trailers.html](../../public/git-docs/git-interpret-trailers.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-interpret-trailers/2.56.0.html).

Add or parse trailer metadata at the end of the otherwise
free-form part of a commit message, or any other kind of text.

A trailer in its simplest form is a key-value pair with a colon as a
separator. The key consists of ASCII alphanumeric characters and
hyphens (-). A trailer block consists of one or more trailers. The
trailer block needs to be preceded by a blank line, where a blank line
is either an empty or a whitespace-only line. For example, in the
following commit message

subject

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Signed-off-by: Alice <alice@example.com>
Signed-off-by: Bob <bob@example.com>

the last two lines starting with Signed-off-by are trailers.

This command reads commit messages from either the
<file> arguments or the standard input if no <file> is specified.
If --parse is specified, the output consists of the parsed trailers
coming from the input, without influencing them with any command line
options or configuration variables.

Otherwise, this command applies trailer.<key-alias> configuration
variables (which could potentially add new trailers, as well as
reposition them), as well as any command line arguments that can
override configurat
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.