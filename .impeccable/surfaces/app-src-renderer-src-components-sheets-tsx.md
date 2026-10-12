---
version: 1
slug: "app-src-renderer-src-components-sheets-tsx"
primary_target: "app/src/renderer/src/components/Sheets.tsx"
related_targets: ["app/src/renderer/src/components/ThemePicker.tsx"]
---

# Theme picker (Settings sheet, Look)

Scope: the Theme picker at the top of the Settings sheet's Look section (#78). Visitor mode: Operate. Extends the existing sheet; the VENGEANCE world (DESIGN.md) is inherited, not redesigned.

Audience and job: one developer, the panel open in a screen corner, choosing which version of Batman Bat-Signal wears. Rare, deliberate, and it should feel like a moment. Proof: the Theme's own Bat-Clawd, its Alarm color on its own stamp word, its display name and its film credit. Constraints: 320x440, minimum 300x360; live switch; keyboard and mouse; one Theme today, four or five later; shared 8 fps clock; reduced motion.

Chosen direction: A, folders, picked by the maintainer from three labelled mockups (A folders, B list, C projector), each shown with one Theme and with four.

## Direction contract

THESIS: each Theme is a case-file folder you pull from the drawer; the picker refuses the dropdown and the radio list, and makes the choice a row of dossiers.

OWN-WORLD: near-black folders with a tab on their top edge, a 1px Line border; inside, the Theme's still Bat-Clawd, its stamp word in its Alarm ink, its name in its display face and its film in small body type. The worn folder's border and tab light in its accent, with a soft spill under it; the others dim.

STORY: the user sees which Batman is worn and which others exist, and switches with one click or the arrow keys; the panel re-dresses at once.

FIRST VIEWPORT: under the Look heading, a "Theme" label and its hint, then a horizontal strip of 124x120 folders; one Theme sits alone at the left; with several, two show whole and the next peeks at the edge.

FORM: folders, option A of three; no seed (an extension chosen from mockups).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: choosing a folder stamps it: its stamp lands once (a short, finite press), skipped under reduced motion.

Unresolved: the other Themes' Alarm colors and suits arrive with #81–#83 and #88; VENGEANCE has no Signature pose, so its folder shows the flying pose.
