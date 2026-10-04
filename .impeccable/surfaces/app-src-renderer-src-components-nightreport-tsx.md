---
version: 1
slug: "app-src-renderer-src-components-nightreport-tsx"
primary_target: "app/src/renderer/src/components/NightReport.tsx"
related_targets: []
---

# Panel: The Night Report (exploration)

Scope: the panel's main view, as an alternate layout next to the approved one (git tag design-approved-v1), switchable in settings. Mode: Operate.

Audience and job: one developer running several Claude Code sessions; open the panel, see in seconds what waits for them and how each case is going, open a case. Constraints: ~1% CPU at rest (no infinite CSS animation), reduced motion respected, 300x360 minimum, header, disc, theme and Bat-Clawd unchanged. Wrong if it turns into a generic dashboard, hides what needs the user, or gets heavy.

## Direction contract

THESIS: The panel is tonight's typed case report, read top to bottom in one column. It refuses tabs, card grids and slide-in screens: what needs you is signed off first, then every case is one paragraph.

OWN-WORLD: Black page, bone typewriter text in Special Elite, a single 1px red margin rule like legal paper, stamps sitting in the left margin, red pen as a hand-drawn stroke under what waits for you, pressed harder for blocked work (hot) than for waiting work (soft), none for quiet work; a wavy CSS underline was tried and read as a spelling mark, a straight one as a link, typed checkboxes ([x] [>] [ ]) for tasks. No cards, no colored side bars, no icon tiles.

STORY: The user reads the dateline, sees how many cases need them, signs off the red items (each opens its case), skims the case paragraphs by their margin stamps, and opens one in place to read its tasks and subagents as margin notes.

FIRST VIEWPORT: Header as approved. Under it a dateline (NIGHT REPORT, weekday date, time; right: cases and how many need you). Then "Awaiting your signature": one typed line per alert, stamp in the margin with its age under it, the action marked with the hand-drawn red pen at its tier (hot for blocked work, soft for waiting work, none for quiet work). Then "Case notes": paragraphs led by the case title, stamp in the margin, ending with "n of m filed" and Claude's last words in quotes. Clicking a paragraph unfolds its notes in place; a task line opens the existing drawer.

FORM: The Night Report, position 7 of 7 on the ranked list (dealt as the lead), seed key 3630deff.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
