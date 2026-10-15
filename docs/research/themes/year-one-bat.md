# Research note: Year One's chest bat, DKR's, and the window line

Research note, 2026-10-15. Scope: trace the chest bat of the first suit in *Batman: Year One* (1987) and the big black bat of the second suit in *The Dark Knight Returns* (1986), compare them at 64px on the disc and at chest size, and read Bruce's window line in #404 on a page. It answers jury-wave-2 §3.14, `year-one.md` §8 and §12, and `dark-knight-returns.md` §8 and §12.

*Built in #122: BAT_1987 ships as traced here (`app/src/shared/emblems.ts`). The Theme shipped with the trade paperback's red as its alarm and a grey suit with a collar, so on the lit disc the rings are red, not the magenta below, and the chest bat is 2.73 units wide (a full unit tall), not 5. BAT_1986 is not shipped; it waits for #120.*

*Built in #120, then reworked: §4's open question is answered in [`dkr-rework.md`](dkr-rework.md) §2–3. The Book Two cover shows the first suit, and no chest wears the round Book Three bat. ANCIENT GRACE wears the second suit's wide bat, traced from the animated film (`BAT_1986` (the films' wide bat; the round trace had the name first), 2.3:1), on the chest, the disc and the masthead. BAT_1986, the round trace, is no longer worn and lives only in this note (§5). Against Year One's it still reads apart: a 6.9-unit bat on a mid-grey suit against a 2.73-unit one on the only light suit, mid-height wingtips and a long tail against upright edges and horns.*

Provenance key used below: **Read** = seen by us on a reproduction of a page or cover, named with its URL. **Measured** = taken off that image with a script, in pixels. **Inferred** = our reading of what those facts imply.

## 1. TL;DR

- **The window line, read on the page.** On the original art board of *Batman* #404, page 22, the line is two caption boxes: `...yes. Father.` and `I shall become a bat.` The usual transcription, "Yes, father. I shall become a bat.", joins the two boxes into one line. The display name's three words, "become a bat", are on the page (§2).
- **Year One's bat (BAT_1987): about 2.7:1.** Wide and flat, with a sharp horn at each wing's upper outer corner, two short ears on a narrow head, nearly upright outer edges ending in sharp lower wingtips, and underneath a notch, a small point and a notch each side, then a rounded tail that hangs as low as the wingtips. Traced from a standing pin-up of the first suit, not a story page. The bat is only about 48×18px in the source (§3, §5).
- **DKR's bat (BAT_1986): about 1.05:1, round, not wide.** The second-suit bat, traced from the Book Three cover, is nearly as tall as it is wide. The wings curve down in a circle, with a deep round notch between each wing's tip and the head, a narrow head with two thin upright ears, and two sharp V notches a side underneath. That gives a hooked lower wingtip, a middle point and a long tail. `dark-knight-returns.md` §8's "about 2.6:1, three scallops a side" is **not supported** by this cover (§4, §5).
- **As traced, they don't read alike.** At 64px, A is a flat bar across the middle of the disc and B a round blot that nearly fills it. At chest size, A at 5 units is a dash about 4px tall, and B at 5 units is a 10px round blot. The jury's worry (§3.14) that the two descriptions were the same does not survive the trace (§6).
- **One open question for DKR, a decision for #120** (answered since: [`dkr-rework.md`](dkr-rework.md) §2–3, and this note's top line): on the Book Two cover, the chest bat itself looks wider than the Book Three emblem, up to about 2.2:1. Its top is hidden by the cowl's drape, so it could not be measured. BAT_1986 is the cover emblem, matched to the chest by eye. At the cover's 1.05:1, `dark-knight-returns.md` §7's sizing gives a chest bat about 3.2 units wide. If the Theme uses the wider chest proportions instead, the comparison with Year One has to be run again (§4, §6, §8).
- **Neither source is the brief's first choice.** BAT_1987 comes from a pin-up in the 2024 Artist's Edition, not a story page, a 1987 cover or the Absolute Book One. BAT_1986 comes from a cover emblem, not a story panel (§3, §4).

## 2. The window line

- **Read** on the original art board of #404, story page 22, reproduced by Polygon from the 2024 Artist's Edition ([Polygon, image 609×880](https://cdn.vox-cdn.com/uploads/chorus_asset/file/25467551/MAZZUCHELLI_BATMAN_404_22.jpg); [article](https://www.polygon.com/24166217/batman-year-one-artist-edition-david-mazzucchelli-frank-miller-dc-comics-idw)). The page's last tier ends in two caption boxes (only these two are quoted here, per ADR 0001's "very short"):
  - `...yes. Father.` (an ellipsis before a lowercase "yes", then "Father" capitalised on its own line. The mark after "yes" reads as a full stop, but the captions are about 4px tall in this 609px image, so a comma can't be ruled out)
  - `I shall become a bat.` (its own box, at the bottom of the panel with the bust)
- The top two tiers are the ones PopOptiq and Goomba Stomp reproduce.
- **Why the board counts as the page.** The lettering is pasted on the board. aeindex's review of the Artist's Edition says it "is fully lettered by Todd Klein on the boards, so we can read our way through" ([aeindex](https://aeindex.org/reviews/david-mazzucchellis-batman-year-one-artists-edition/)). So the printed page should carry the same words, but **no printed 1987 or Absolute page of it was seen** (§8).
- **The transcriptions** in `year-one.md` §12 differ from the board: "Yes, father. I shall become a bat." (India Art Review, a fan account on X) merges the two boxes; "I shall become a bat" (Goodreads, PopOptiq's heading) matches the second box; "I will become the bat" (one review) does not match.

## 3. Year One: sources and editions

**Used for the trace: Mazzucchelli's standing pin-up of the first suit.** A full-figure Batman, front-on, cape blown out to the left, inside a circle. The chest bat is clean black ink on the light suit, with hatching above it. Board marked "DC Comics, Inc." and "60%". Seen only in aeindex's photo of the 2024 Artist's Edition spread ([`interior-6.webp`, 1600×1200](https://aeindex.org/wp-content/uploads/2024/08/David-Mazzucchellis-Batman-Year-One-Artists-Edition-interior-6.webp)). **The bat measures about 48×18px in that photo** (wingtip to wingtip, horn to tail).

- **It is not a story page.** aeindex says the Artist's Edition's extra art is "not part of the story but with no indication of where it's from", and that the Absolute Edition has notes on where each piece is from. We could not see those notes (§8).
- **Why it was used anyway:** it is the only front-on, unobstructed first-suit chest bat we found in a comics source. It is the same suit as the story (grey body, black trunks, capsule belt, no oval). Mazzucchelli redrew the bat by hand each time, so any single drawing is one instance of it.
- **Cross-check, the #407 cover** (1987): the chest bat in three-quarter view, the left wing partly behind Batman's hand ([2023 facsimile, photo 1200×1600](https://marticomics.com/cdn/shop/files/Batman_407FacsimileEditionCoverADavidMazzucchelli.jpg); the ink original, [Polygon, 522×762](https://static0.polygonimages.com/wordpress/wp-content/uploads/chorus/uploads/chorus_asset/file/25467554/MAZZUCHELLI_BATMAN_407_CVR.jpg)). Consistent with the pin-up: a wide bat, a wing tip rising to a point at its upper outer corner, scalloped underneath. Not traceable, since it is turned and covered.

**Looked at and rejected:**

| Source | What it shows | Why not |
|---|---|---|
| DC.com, [Knight, 29 Mar 2024](https://www.dc.com/blog/2024/03/29/the-woman-whose-colors-brought-batman-year-one-to-life-twice): three interior pages (1988 recolour, 700×1080) and the #404 banner | the SWAT siege, the explosion, the truck rescue | Batman in silhouette, profile or at a distance; no chest bat front-on. The "--and Batman..." panel is about 40px across |
| #405 cover (facsimile, [eBay, 1067×1600](https://i.ebayimg.com/images/g/ExoAAeSw5m5onuEk/s-l1600.jpg)) | front-on, cape held open | the chest is inside the cape, all black |
| #404 and #406 covers | | no chest bat |
| Artist's Edition pages, aeindex (33 photos) and Polygon (#404 p7, p22; #405 p11, p14) | ink boards | Batman never front-on with the chest clear on the pages shown |
| Artist's Edition cover ([IDW, 1640×2297](https://idwpublishing.com/cdn/shop/files/Dave_Mazzuchelli_s_Batman_Year_One_frontangle.jpg)) | a standing Batman | cape closed over the chest |
| 2016 Absolute Book One | | no interior preview found online; Comics Beat's Artist's Edition preview returned 403, and Google Books asked for a CAPTCHA |

The giant bats in the top half of the four 1987 covers are a cover design, not the chest bat, and were not used.

## 4. DKR: sources

**Used for the trace: the Book Three cover, "Hunt the Dark Knight" (1986)**, the big black bat alone in a white glow ([mycomicshop scan of a first printing, 2200×3280](https://media.mycomicshop.com/n_ii/originalimage/8433898.jpg); [listing](https://www.mycomicshop.com/search?ItemID=64767240)). **The bat measures 1833×1740px, 1.053:1.** A second copy, photographed for an eBay listing, gives 833×793px, 1.050:1 ([eBay, 1176×1600](https://i.ebayimg.com/images/g/f6QAAOSwOhFjcnrK/s-l1600.jpg)).

- **Is it the chest bat?** The Book Two cover, "The Dark Knight Triumphant", shows the second suit front-on, with the black bat across the chest ([mycomicshop scan, 3328×5200](https://media.mycomicshop.com/n_ii/originalimage/8299406.jpg); [listing](https://www.mycomicshop.com/search?ItemID=64221726)). **Read:** its outer edges curve like the Book Three bat, and its lower edge ends in sharp points. Its top is under the cowl's blue drape and the torso leans toward the viewer, so its height can't be measured. Visible, it is about 690 by at most 320 (in a 0.6× crop), so **at most about 2.2:1 as seen**. That is wider than the cover emblem. Whether the chest version is the cover bat stretched, or the same bat foreshortened, is open (§8).
- **Looked at and rejected:** Book Four's horse splash ([Tearoom of Despair](https://tearoomofdespair.blogspot.com/2013/02/batman-on-horse-perfect-panel-1.html), [Den of Geek](https://www.denofgeek.com/movies/batman-1989-deleted-scene-sean-young/), CBR) shows the horse's head in front of the chest. The Book Three cover painting ([artoffm.com](https://artoffm.com/artwork/cover-to-dark-knight-3/)) is the old man, not the emblem, despite the file name. Two Heritage original-art scans returned 403.

## 5. The traces

**Method.** Each source was cropped, cleaned with a median filter where it was grainy, and thresholded. The bat's outline was then read off a character map, one column per grid unit (DKR), or per source pixel (Year One, too small to resample). Key points were measured on the left half: wingtips, ear tips and height, head width, notches and points underneath, tail. Year One's two halves differ, because the torso is slightly turned: the right wingtip sits 27.2px from the tail, the left 21.1px. So each measurement is the average of both sides. The left half was then scaled onto the 120×48 grid, centred on x = 60 and mirrored, so the path is exactly symmetric. Each trace was laid back over its source in red to check the fit, in a comparison image shown to the maintainer on 2026-10-15 (not kept in the repo: it reproduces the sources).

### A. BAT_1987 (Year One, first suit)

Measured on Mazzucchelli's standing pin-up in aeindex's photo of the Artist's Edition, 1600×1200 (the bat about 48×18px). 120 × 44 units, **2.73:1**. 31 coordinate pairs, straight segments.

```
M60 7 L56.3 7 L53.2 2 L46.3 10.2 L20.2 9.5 L12.8 2 L5.3 13.2 L2.9 28.1 L0 46 L7.8 38 L21.5 31.3 L33.3 35.8 L40.7 32.1 L46.3 33.1 L54.4 38 L60 46 L65.6 38 L73.7 33.1 L79.3 32.1 L86.7 35.8 L98.5 31.3 L112.2 38 L120 46 L117.1 28.1 L114.7 13.2 L107.2 2 L99.8 9.5 L73.7 10.2 L66.8 2 L63.7 7 L60 7 Z
```

What makes it this bat:
- Wide and flat: 2.73:1, the top edge nearly level from shoulder to shoulder.
- A **sharp horn at each wing's upper outer corner**, rising to the height of the ears, set in from the outer edge.
- **Two short pointed ears** on a narrow head, a small flat notch between them.
- **Outer edges nearly upright**, flaring out to sharp lower wingtips.
- Underneath, each side: a notch, a **small middle point**, a notch, then a **rounded tail lobe**. The tail and the wingtips reach the same depth. The notches are shallow, about 3 units.
- No oval.

### B. BAT_1986 (DKR, second suit), for #120 (ANCIENT GRACE), not shipped here

Measured on the Book Three cover (mycomicshop scan, 2200×3280; the bat 1833×1740px). 48.8 × 46 units, **1.06:1** as drawn (1.05 measured). 53 coordinate pairs; the four cubics a side (the round notch and the round outer edge) account for 16 of them.

```
M60 8.1 L58.6 8.1 L57.6 4.9 L55.5 13.9 C51.9 13.8 46.6 10 47 5.9 C47.1 3.4 47.6 1.8 48.6 1 C40.9 3.4 35.6 11.2 35.6 21.4 C35.6 31.5 42.1 40.9 50.4 43.9 L48.6 41.7 L46.8 38 L46 32.1 L48.2 33.6 L50.2 36 L51.5 37.8 L52.7 36.2 L55.3 33.4 L57.2 37.2 L58.4 41.3 L60 47 L61.6 41.3 L62.8 37.2 L64.7 33.4 L67.3 36.2 L68.5 37.8 L69.8 36 L71.8 33.6 L74 32.1 L73.2 38 L71.4 41.7 L69.6 43.9 C77.9 40.9 84.4 31.5 84.4 21.4 C84.4 11.2 79.1 3.4 71.4 1 C72.4 1.8 72.9 3.4 73 5.9 C73.4 10 68.1 13.8 64.5 13.9 L62.4 4.9 L61.4 8.1 L60 8.1 Z
```

What makes it this bat:
- **Round:** about as tall as it is wide. The outer edge of each wing is one arc, from the upper tip down to the lower wingtip.
- A **deep round notch** between each wing's upper tip and the head, half the bat's height.
- A **narrow, tall head** with **two thin upright ears** and a flat top between them.
- Underneath, each side: **two sharp V notches**, which make a long hooked lower wingtip that curls in, a middle point, and the body running down to **a long pointed tail**, the lowest point of all.
- No oval. It sits on the grid's centre column, x 35.6 to 84.4.

**Note for `emblems.ts`:** `emblem()` reads every number pair in a path, control points included. Both paths keep their control points inside the outline's extent, so the derived box is the outline's: A 0–120 × 2–46, B 35.6–84.4 × 1–47. Only BAT_1987 is in the repo.

## 6. What tells them apart

Rendered in the comparison image: the disc as `BatEmblem.tsx` draws it (a 44px-wide SVG, the bat's box plus one unit of air), unlit (olive glass `#0d0e06`→`#191b0b`, bat `#292c11`) and lit (hard-stop rings `#ffc2ee`/`#ff4dd2`/`#e04ac0`, bat `#0d0e06`, rim `#5a1a4c`). The chest is black on `#d0d3cc` at 5 units (10.5px) and 8 units (16.8px).

- **At 64px on the disc.** A is a flat bar about 43×16px across the middle. The lit core's pale disc shows above and below it, and its horns, ears and tail points are each 1–2px. B is a round blot about 42×40px that nearly fills the disc. Its round notches and V notches let the inner rings show through as pale cut-outs. Shape alone tells them apart, before colour.
- **At chest size.** A at 5 units is 10.5 × 3.8px: a dash, with the ears and points gone. At 8 units, 16.8 × 6.2px, the horns and the tail point show. B at 5 units is 10.5 × 9.9px: a round blot. At 8 units it is 16.8 × 15.8px, too tall for the chest. `dark-knight-returns.md` §7's rule, `width = min(8, 3 × aspect)`, gives **about 3.2 units wide by 3 tall** (about 7×6px) at 1.06:1. That is no longer "the biggest chest mark in the app", and it is smaller than KNIGHTMARE's 4.4.
- **Inferred, for the dossiers.** The jury's collision (§3.14) came from the written descriptions. The traced shapes differ in aspect (2.7 vs 1.05), outline (flat top with horns vs round wings with deep notches) and underside (shallow notches with a round tail vs sharp Vs with a long tail). If DKR keeps a big chest mark, its size has to come from the chest version's own proportions, which this note could not measure. **This verdict holds only for the Book Three emblem.** If ANCIENT GRACE draws its chest bat nearer the Book Two chest's proportions (up to about 2.2:1), the comparison with Year One has to be run again on that shape.

## 7. What this changes in the dossiers (suggestions, not made)

- `year-one.md` §12: the window line can move out of "Unverified", with the two-box wording in §2 above. Keep a line that it was read on the board, not a printed page.
- `year-one.md` §8: "wide and level-winged, small head, two short ears, scalloped underneath, no oval" holds. Add the horns at the wing tips and the tail as low as the wingtips.
- `dark-knight-returns.md` §8: "about 2.6:1, three scallops a side, wings reaching out nearly level" does not match the Book Three emblem (1.05:1, round, two V notches a side). §7's chest sizing depends on which version the Theme uses (§4).

## 8. Unverified

- **The window line on a printed page.** Read on the original board (Artist's Edition, via Polygon). Not checked against a 1987 newsprint copy or the Absolute Book One. Pasted-on lettering makes a difference unlikely, but not impossible. The mark after "yes" (full stop or comma) is below what the 609px image resolves; the words, the two boxes and the capital F are clear.
- **The pin-up's origin.** Where Mazzucchelli's standing pin-up was first printed is not known. aeindex says the Absolute Edition notes it; those notes were not seen. It shows the first suit, but it is not a story page.
- **Year One's trace is low-resolution.** The bat is about 48×18px in a photo of a printed book, taken at an angle, with hatching touching its top edge. The ears and the top edge between ear and horn are the least certain parts (±1px, about ±2.5 units). The halves were averaged because the source is asymmetric.
- **DKR's chest version.** The Book Two cover suggests the bat on the chest is wider than the Book Three emblem (at most about 2.2:1 as seen, top hidden). No interior panel with the second suit front-on and the chest clear was found. The horse splash hides it.
- **Printings.** The Book Three scan's listing says "3-1ST" (first printing); the Book Two slab says "2-1ST.D". Not checked against GCD.
- **All pixel sizes** are of web images, not of the printed pages.

## 9. Sources

- Polygon: [*Batman: Year One* Artist's Edition](https://www.polygon.com/24166217/batman-year-one-artist-edition-david-mazzucchelli-frank-miller-dc-comics-idw), with #404 page 22 ([image](https://cdn.vox-cdn.com/uploads/chorus_asset/file/25467551/MAZZUCHELLI_BATMAN_404_22.jpg)), #404 page 7, #405 pages 11 and 14, the #407 cover art and the title page.
- aeindex.org: [Scott VanderPloeg, review of *David Mazzucchelli's Batman: Year One Artist's Edition*](https://aeindex.org/reviews/david-mazzucchellis-batman-year-one-artists-edition/), and its 33 photos, among them [the pin-up spread](https://aeindex.org/wp-content/uploads/2024/08/David-Mazzucchellis-Batman-Year-One-Artists-Edition-interior-6.webp).
- DC.com: [Rosie Knight, 29 Mar 2024](https://www.dc.com/blog/2024/03/29/the-woman-whose-colors-brought-batman-year-one-to-life-twice) (interior pages, no chest bat front-on).
- Covers: [#405 facsimile (eBay)](https://i.ebayimg.com/images/g/ExoAAeSw5m5onuEk/s-l1600.jpg); [#407 facsimile (Marti Comics)](https://marticomics.com/cdn/shop/files/Batman_407FacsimileEditionCoverADavidMazzucchelli.jpg); [#404–#407 (Dave's Comic Heroes)](https://davescomicheroes.blogspot.com/2024/09/celebrating-batman-artist-david.html); [IDW, Artist's Edition cover](https://idwpublishing.com/products/david-mazzucchellis-batman-year-one-artists-edition).
- *The Dark Knight Returns*: [Book Three cover, mycomicshop](https://www.mycomicshop.com/search?ItemID=64767240); [Book Three cover, eBay](https://www.ebay.com/itm/304702348629); [Book Two cover, mycomicshop](https://www.mycomicshop.com/search?ItemID=64221726); the horse splash at [Tearoom of Despair](https://tearoomofdespair.blogspot.com/2013/02/batman-on-horse-perfect-panel-1.html).
- Window-line transcriptions, as listed in `year-one.md` §12: [Goodreads](https://www.goodreads.com/work/quotes/2501570), [India Art Review](https://indiaartreview.com/stories/batman-year-one-bruce-wayne-gotham/), [PopOptiq](https://www.popoptiq.com/top-10-batman-year-one-moments/), [Goomba Stomp](https://tilt.goombastomp.com/culture/batman-year-one-the-best-moments/).
- In this repo: `docs/research/themes/year-one.md`, `dark-knight-returns.md`, `jury-wave-2.md`; `app/src/shared/emblems.ts`; `app/src/renderer/src/components/BatEmblem.tsx`, `Signal.tsx`.

No images are included in this note: the comparison image and the downloaded sources reproduce copyrighted pages, so they stay out of the repo.
