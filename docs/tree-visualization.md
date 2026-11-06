# 2D tree visualization

`components/tree-scene.tsx` renders an accessible, event-driven SVG illustration. Before init it shows only ground; successful init adds roots; the first commit starts a leafless trunk; further commits extend wood; branch refs create limbs; second parents create merge grafts; and published commit hashes produce leaves only after a successful push to the session's private bare remote. Commit/tag positions and branch ancestry derive from actual Git hashes and refs. Deterministic branch angles and fork positions are cached per sandbox in local storage, so adding or removing another ref does not normally move existing limbs. New growth uses GSAP and Anime.js, honors reduced-motion settings, and the text caption reports the confirmed event.

The SVG uses a bounds-aware `viewBox` and scales without document-level horizontal overflow. Zoom buttons and pointer dragging allow inspection of dense trees; “Focus” isolates a selected ref, and narrow layouts provide a horizontally scrollable, readable branch key. Every commit remains available in the recent-history inspector even when the tree is focused. Each marker has an accessible name based on its commit message and short hash.

The layout is a compact projection for learning, not a complete replacement for Git's graph tools. The current application snapshot is capped at 40 commits. Long histories, many branches, detached HEAD states, and complex merges need visual review against real repositories. Merge commits may draw multiple parent links; parent relationships are not inferred from position.

The SVG tree has not yet received a formal screen-reader audit or visual regression suite. No accessibility conformance claim is made.
