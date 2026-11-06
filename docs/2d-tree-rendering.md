# 2D tree rendering

The shared renderer is `components/tree-scene.tsx`. It starts with empty ground and adds roots, trunk, limbs, grafts, tags, and foliage as Git-confirmed repository state changes. Leaves derive only from commits present in the session's private bare remote; making a commit alone never adds foliage.

## Data mapping

- Commit markers are keyed by full commit hash.
- Parent edges are drawn from the parent's hash to the child commit; merge commits can have more than one parent edge.
- The checked-out branch's first-parent history is placed on the trunk. Other branch tips receive separate limbs until their history intersects an already placed commit.
- The selected commit is a keyboard-operable SVG button. Its label includes the commit subject and short hash.
- The renderer consumes the typed application snapshot, not Git process state or engine internals.

Branch placement uses a deterministic branch-name seed, checks sampled path geometry against existing limbs and commit markers, and adjusts labels around existing labels, commits, and milestone markers. The session caches the chosen fork angle and stem length to keep older branches stable as refs change. The SVG bounds expand to include the rendered tree; zoom, drag-to-pan, selected-branch focus, and a mobile branch key keep dense scenes navigable. The layout is intentionally illustrative and does not replace Git's graph tools. Text summaries and the commit list remain available when branches are isolated.

## Limits

The app adapter currently displays the engine's topological commit list without timestamps or full conflict information. The application still needs richer branch and conflict state. Long histories and many branches need a density strategy. Verify merge paths and accessibility in browsers before treating this renderer as production complete.
