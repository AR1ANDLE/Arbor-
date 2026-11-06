# Accessibility

The interface uses semantic navigation, labeled file and command inputs, keyboard-operable controls, visible focus rings, live terminal output, textual Git-state summaries, and a textual alternative for the tree. The terminal supports command history with the up/down arrows and can be focused with Ctrl/Command+K. A reduced-motion media query limits interface animation.

The tree is a native SVG. Commit markers are keyboard-operable buttons with names derived from commit messages and hashes; the rest of the tree is decorative. Git operations also remain available through the terminal and the textual commit history list. This project has not yet been audited with axe, a screen reader, keyboard-only testing, Lighthouse, or the W3C Nu checker. No WCAG conformance claim is made.

Before a production release, test focus order, contrast in both themes, small touch targets, confirmation behavior, browser zoom, screen-reader announcements, and mobile layouts; record manual and automated results.
