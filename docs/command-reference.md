# Playground command reference

The guide is generated from `arbre-engine/src/services/git/registry.ts`, the same registry that validates terminal input. The browser sends one command line; the server tokenizes and validates it without invoking a shell. This is not a general-purpose terminal.

| Command form | Behavior |
|---|---|
| Group | Supported commands |
|---|---|
| Start and inspect | `init`, `status`, `config`, `diff`, `log`, `show` |
| Stage and record | `add`, `commit`, `rm`, `mv` |
| Work with branches | `branch`, `switch`, `checkout`, `merge`, `cherry-pick` |
| Undo and recover | `restore`, `reset`, `revert`, `reflog` |
| Save and label | `stash`, `tag` |
| Terminal helpers | `help`, `clear` |

The command guide lists registry examples and lets you prefill them in the terminal. The registry defines supported options and risk levels. Commands classified as destructive require confirmation before execution. Arbitrary shell commands and unsupported Git features are rejected. A failed operation displays Git's output and refreshes state from the repository.
