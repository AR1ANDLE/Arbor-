# Tree layout and themes

## Branch positioning

`components/tree-layout.ts` places the selected primary branch on the trunk using first-parent ancestry. A secondary ref is traced through its real first parents until it reaches a commit that already has a position. If its nearest ancestor is another branch ref, that ref is laid out first, so nested branches begin at the exact positioned fork commit.

Each branch name gets a deterministic set of candidate directions and a deterministic stem length. Candidate paths are sampled along their segments and checked against existing branch segments and commit positions. The layout chooses the lowest-collision direction; branches that share a fork fan into separate directions. Merge grafts continue to use actual second-parent commit hashes.

Branch labels are placed using expanding rings around the branch tip. Candidate label bounds are checked against previously placed labels and commit markers. Milestone flags are then placed around their exact tagged commit while avoiding labels and other markers. The layout exposes a collision count for diagnostics when a dense scene has no fully clear candidate.

## Stability

The renderer caches each branch's chosen side, angle, and stem length in browser local storage under the playground session key. A branch's cache key includes its fork commit, so ordinary new commits, ref additions, and ref deletion preserve previously assigned limb directions. Geometry is deterministic if browser storage is unavailable. The cache contains only display preferences; Git hashes and refs remain the source of truth.

## Viewport behavior

The SVG viewBox expands to include branch tips, labels, tags, the trunk, and ground. It preserves aspect ratio at every width. Users can zoom, drag to pan, focus the active or a selected branch, and return to the fitted view. Below 1120px, SVG name labels are replaced by a horizontally scrollable branch key with full-size buttons; the underlying repository snapshot and recent commit list remain available.

## Theme tokens

The tree uses the application-level `--tree-*` tokens declared alongside the existing light and dark palettes in `app/globals.css`. The SVG surface is transparent apart from its low-contrast paper dots, so the canvas surface comes from the same theme as the surrounding card. Bark and foliage retain natural colors with muted dark-mode variants. The selected theme is loaded before first paint from the existing `arbor-theme` preference and remains controlled by the existing appearance setting.

## Limits

The UI snapshot currently contains up to 40 commits. Branch collision checks use sampled line-segment geometry as a practical approximation to the rendered Bézier curves. Extremely dense repositories may still require zoom or branch focus, and intentional merge grafts can cross other limbs. The layout remains an illustration and does not replace Git graph tools.
