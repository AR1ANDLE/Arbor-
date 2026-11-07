# `git web--browse`
- **Category:** Internal helpers
- **Git help group:** Not listed by git help -a; exposed by --list-cmds=main
- **Difficulty:** advanced
- **Typical risk:** safe
- **Deprecated:** no
- **Experimental:** no
- **Playground:** documentation only
- **Target version:** 2.56.0.windows.1
## Overview
Git helper script to launch a web browser
## Syntax
```text
git web--browse [] (|)…​
```
## Full options, examples, output, effects, and recovery
The version-matched manual is the authoritative reference for every option and its exact behavior: [/git-docs/git-web--browse.html](../../public/git-docs/git-web--browse.html) · [Official Git 2.56.0 manual](https://git-scm.com/docs/git-web--browse/2.56.0.html).

This script tries, as much as possible, to display the URLs and FILEs
that are passed as arguments, as HTML pages in new tabs on an already
opened web browser.

The following browsers (or commands) are currently supported:

firefox (this is the default under X Window when not using KDE)

iceweasel

seamonkey

iceape

chromium (also supported as chromium-browser)

google-chrome (also supported as chrome)

konqueror (this is the default under KDE, see Note about konqueror below)

opera

w3m (this is the default outside graphical environments)

elinks

links

lynx

dillo

open (this is the default under Mac OS X GUI)

start (this is the default under MinGW)

cygstart (this is the default under Cygwin)

xdg-open

Custom commands may also be specified.
## Execution boundary
This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.