# Git command documentation and playground boundary

The in-app **Git command encyclopedia** is generated from the target installation's `git help` inventory and HTML manuals. The catalog is searchable by command name, category, description, and task terms. Where Git ships a manual, it includes the full installed manual and corresponding official versioned Git page.

The inventory contains built-in commands, external helpers, concept guides, and interfaces as separate types. Inventory and manual counts, unsupported listing categories, and known gaps are recorded in [the Git command coverage report](./git-command-coverage.md). Individual built-in entries are under [git-command-entries](./git-command-entries).

## Playground execution

Documentation coverage does not grant terminal access. The interactive playground accepts only the deliberately implemented commands in `arbre-engine/src/services/git/registry.ts`. That registry supplies the parser, accepted flags, examples, risk classification, and confirmation behavior. The catalog's `playgroundSupported` field is generated from that registry and checked by the command-coverage tests.

Do not add commands to the playground merely because Git ships them. The command must first be deliberately implemented and reviewed in the isolated Arbre Engine. Shell syntax, arbitrary executables, aliases, server commands, and unreviewed plumbing remain unavailable.

## Regenerate the versioned catalog

On the Git installation being documented, run:

```powershell
node scripts/generate-git-command-catalog.mjs
```

The generator records `git --version`, `git help -a`, `git --list-cmds`, `git help -g`, and manuals from `git --html-path`. Review the generated JSON, manual pages, entry pages, and coverage report when the Git version changes. Do not claim full annotated coverage while the report lists gaps.
