# Git command coverage

Generated from the installed Git for Windows 2.56.0.windows.1. The upstream manual set is version 2.56.0.

## Inventory sources

- `git --version` records the exact target build.
- `git help -a` supplies documented command names, groups, and short descriptions.
- `git --list-cmds=main` supplies the installed built-in command inventory, including helpers not listed as user-facing commands by `git help -a`.
- `git --list-cmds=others` supplies separate external helper names; `git --list-cmds=alias` was empty in the generation environment.
- `git help -g` supplies the concept guide list; the guide and interface manuals were copied from the installed HTML documentation directory.
- Target-version references point to [the official Git documentation](https://git-scm.com/docs) at the matching upstream version.

For this Git build, the accepted `--list-cmds` categories are `main`, `others`, `alias`, `config`, and `nohelpers`. The legacy categories `ancillary`, `plumbing`, `plumbingmanipulators`, `plumbinginterrogators`, `foreign`, `foreignscminterfaces`, and `exclude` return an unsupported-category error, so `git help -a` is used for those command families.

## Coverage totals

| Coverage area | Count | Notes |
|---|---:|---|
| Installed built-in names | 179 | All have a searchable catalog entry and generated entry page. |
| Built-ins with a standalone installed manual | 158 | Full source HTML manuals are included under `public/git-docs`; syntax is taken from those manuals. |
| Built-ins without a standalone installed manual | 21 | Internal or platform helpers; listed below and not presented as fully documented. |
| Git concept guides from `git help -g` | 14 | 13 version-matched manuals included locally. |
| User-facing and developer-facing interfaces/formats | 19 | 19 version-matched manuals included locally. |
| External helpers | 6 | Kept in a separate list; not counted as built-ins. |
| User aliases in generation environment | 0 | No aliases were defined. |
| Built-ins supported by the playground | 23 | Derived from the Arbre Engine command registry; unsupported commands remain documentation-only. |
| Documentation-only built-ins | 156 | No terminal execution capability is granted by these entries. |
| Commands marked deprecated | 1 | Explicitly identified from the installed Git help/manual inventory. |
| Commands marked experimental | 4 | Explicitly identified from the installed Git help/manual inventory. |

## Built-ins without a standalone manual

- `git checkout--worker` — discovered by `--list-cmds=main`; no matching `git-checkout--worker.html` manual shipped with this installation.
- `git credential-wincred` — discovered by `--list-cmds=main`; no matching `git-credential-wincred.html` manual shipped with this installation.
- `git difftool--helper` — discovered by `--list-cmds=main`; no matching `git-difftool--helper.html` manual shipped with this installation.
- `git gui--askpass` — discovered by `--list-cmds=main`; no matching `git-gui--askpass.html` manual shipped with this installation.
- `git gui--askyesno` — discovered by `--list-cmds=main`; no matching `git-gui--askyesno.html` manual shipped with this installation.
- `git gui.tcl` — discovered by `--list-cmds=main`; no matching `git-gui.tcl.html` manual shipped with this installation.
- `git merge-octopus` — discovered by `--list-cmds=main`; no matching `git-merge-octopus.html` manual shipped with this installation.
- `git merge-ours` — discovered by `--list-cmds=main`; no matching `git-merge-ours.html` manual shipped with this installation.
- `git merge-recursive` — discovered by `--list-cmds=main`; no matching `git-merge-recursive.html` manual shipped with this installation.
- `git merge-recursive-ours` — discovered by `--list-cmds=main`; no matching `git-merge-recursive-ours.html` manual shipped with this installation.
- `git merge-recursive-theirs` — discovered by `--list-cmds=main`; no matching `git-merge-recursive-theirs.html` manual shipped with this installation.
- `git merge-resolve` — discovered by `--list-cmds=main`; no matching `git-merge-resolve.html` manual shipped with this installation.
- `git merge-subtree` — discovered by `--list-cmds=main`; no matching `git-merge-subtree.html` manual shipped with this installation.
- `git pickaxe` — discovered by `--list-cmds=main`; no matching `git-pickaxe.html` manual shipped with this installation.
- `git remote-ftp` — discovered by `--list-cmds=main`; no matching `git-remote-ftp.html` manual shipped with this installation.
- `git remote-ftps` — discovered by `--list-cmds=main`; no matching `git-remote-ftps.html` manual shipped with this installation.
- `git remote-http` — discovered by `--list-cmds=main`; no matching `git-remote-http.html` manual shipped with this installation.
- `git remote-https` — discovered by `--list-cmds=main`; no matching `git-remote-https.html` manual shipped with this installation.
- `git submodule--helper` — discovered by `--list-cmds=main`; no matching `git-submodule--helper.html` manual shipped with this installation.
- `git update` — discovered by `--list-cmds=main`; no matching `git-update.html` manual shipped with this installation.
- `git upload-archive--writer` — discovered by `--list-cmds=main`; no matching `git-upload-archive--writer.html` manual shipped with this installation.

## Guides without a standalone local manual

- `cvs-migration` — listed by `git help -g`; kept as a separate guide entry with an official versioned link.

## Scope gaps

The inventory and source-manual coverage are version-matched, but this release does not meet the requested fully annotated 24-field template for every built-in. The generated entries expose Git's own summaries and synopsis where available, then link/embed the complete official manual. The internal helpers listed above have no standalone manual to expand. Command-specific beginner guidance for working-tree, index, history, HEAD, remote, and recovery effects is not independently authored for all 179 entries. Treat the matching manual as authoritative before using advanced commands; do not describe this release as complete annotated coverage.

## Execution safety

The documentation catalog does not control command execution. The Arbre Engine registry remains the only playground allowlist and supplies each command's accepted flags, examples, risk checks, and parser tests. A catalog entry with `playgroundSupported: false` cannot be invoked through the application terminal.

## Regenerate

Run `node scripts/generate-git-command-catalog.mjs` on the target installation. Review the inventory diff and this report whenever the installed Git version changes.
