# ARBOR design system

The supplied course dashboard image is the visual reference. ARBOR uses its warm paper surfaces, strong dark outlines, mustard highlights, compact editorial labels, rounded cards, and offset shadows while keeping its own tree and Git identity.

## Tokens

Tokens live in `app/globals.css` so the dashboard, learning views, command guide, and settings share the same palette.

| Role | Light theme | Use |
|---|---|---|
| Background | `#f3f0e8` | Warm page canvas |
| Surface | `#fffdf7` | Cards and navigation |
| Ink | `#211f1b` | Text and outlines |
| Secondary text | `#4e4a43` | Supporting copy |
| Primary accent | `#e0ad10` / `#ffcf31` | Highlights and primary actions |
| Leaf accent | `#c8e452` / `#8ddf78` | Tree canopy and growth status |
| Coral accent | `#ef6684` | Selected growth and small emphasis |
| Purple accent | `#7662db` | Secondary branch path |
| Border | `#25231f`, 2px | Card boundaries and controls |
| Shadow | `4px 4px 0 #25231f` | Offset editorial card depth |

Dark mode keeps the same ink outline and playful accent family on charcoal paper surfaces. It remains a prototype theme and needs contrast measurement before a WCAG claim.

## Type and components

The interface uses a system sans stack for readability and bold headings. Technical output uses the existing monospace stack. Controls have visible focus styling; primary buttons use an outlined mustard surface and compact shadow. Cards share rounded corners, a clear border, and consistent heading dividers.

## Layout

The navigation stays on the left at wide sizes. The workspace becomes three columns on large screens, two columns on medium screens, and a stacked layout on phones. The compact navigation remains icon-only at narrow widths; labels are exposed through accessible names. The tree is an SVG with a responsive `viewBox`, not a shrunk desktop canvas.

## Decorative rules

The tree illustration and muted paper texture are decorative. Commit links, labels, selected state, and textual history information carry the repository meaning; color is never the sole signal. Decorative SVG shapes are not exposed as separate screen-reader content.
