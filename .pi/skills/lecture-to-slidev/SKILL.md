---
name: lecture-to-slidev
description: >
  Converts a source lecture/notes markdown file into a Slidev deck at a target path,
  migrating and renaming its images into the target project's public/ folder, then
  enriches the converted deck with additional detail, examples, and clarifications.
  Takes two file inputs: a source file (plain notes or another Slidev deck) and a
  destination file (existing or new Slidev slide file). Use when the user says things
  like "take that file and place it in the new place", "convert this to slidev format",
  "port this lecture into the deck", or gives a source + destination file pair for
  slide conversion.
---

# Lecture → Slidev Conversion Skill

Converts a source markdown file (lecture notes, another course's slide deck, etc.)
into a Slidev-formatted deck at a destination path, migrating images, then enriching
the content with more detail.

## Inputs

The user will point to (or paste) two files:

1. **Source file** — the content to convert (may already be Slidev-ish, or plain
   markdown/notes). Read it in full.
2. **Destination file** — the target file path. It may:
   - already exist with just frontmatter (title/exportFilename/etc.) that must be
     preserved, or
   - not exist yet, in which case infer reasonable frontmatter from the destination
     project's sibling files.

If either input is ambiguous, ask the user to confirm the exact source and
destination paths before proceeding. Also look at a sibling file in the destination
directory (e.g. the previous numbered lecture) to learn the project's conventions:
image path style, frontmatter fields, layout directive usage, heading style, etc.

## Workflow

### Step 1: Survey conventions

1. Read the source file fully.
2. Read the destination file (if it exists) to capture any frontmatter that must be
   kept.
3. Read at least one neighboring file in the destination directory to learn:
   - How images are referenced (e.g. `src="./name.png"` resolving against a
     `public/` folder, vs a subfolder path).
   - Frontmatter conventions (`title`, `exportFilename`, `lineNumbers`, etc.).
   - Slide separator and layout conventions (`---`, `layout: two-cols`,
     `::right::`, `layout: center`, etc.).
4. Find the destination project's image directory (commonly `public/` next to the
   slide files) and list its existing contents to avoid name collisions.

### Step 2: Migrate images

1. Locate every image referenced by the source file and find the actual files on
   disk (resolve relative paths against the source file's own directory/images
   folder).
2. For each image, choose a new descriptive filename based on:
   - the image's `alt` text, if present and meaningful, or
   - the surrounding heading/context if the alt text is generic (e.g. `fig1`,
     `figure3`).
   - Use `snake_case`, no spaces, keep the original extension.
3. Copy each image file into the destination project's public/image folder under
   its new name. Do not move/delete the originals.
4. Keep a mapping of `original filename -> new filename` to apply during content
   conversion.

### Step 3: Convert content

1. Rewrite the source content into the destination file, preserving the
   destination's existing frontmatter (do not overwrite title/exportFilename unless
   asked).
2. Apply the destination's image-reference convention (e.g. `<img src="./new_name.png" alt="...">`)
   using the filename mapping from Step 2. Every distinct image reference should be
   renamed consistently, even if it's reused across multiple slides.
3. Preserve the source's structural intent (headings, slide breaks, two-column
   layouts, callouts) but reformat it to match the destination style precisely —
   this is a *port*, not a paraphrase, at this stage.
4. Write the result to the destination file path.

### Step 4: Enrich

Once the base conversion is written, make a second pass to add value without
changing the original meaning or structure order:

1. **More detail** — expand terse bullet points into fuller explanations where the
   source was overly compressed.
2. **More examples** — add concrete worked examples, real-world analogues, or
   numeric walkthroughs after slides that state an abstract rule (e.g. a formula,
   a protocol, a tradeoff). Prefer:
   - worked numeric calculations,
   - comparison tables (before/after, old/new, spec A vs spec B),
   - short step-by-step walkthroughs of a scenario.
3. **General clarifications** — add short callouts (`> **Example:** ...` or
   `> Note: ...`) clarifying terminology, common misconceptions, or naming
   conventions relevant to the slide's topic.
4. Insert additions as **new slides** immediately following the slide they expand
   on (separated by `---`), rather than bloating a single slide — keep each slide
   focused and presentable.
5. Do not remove or contradict any original content. Additions should be strictly
   supplementary.

### Step 5: Verify

1. Confirm slide separator count and structure are still valid Slidev markdown
   (matching `---` frontmatter/dividers, closed `::right::` blocks, etc.).
2. Confirm every image reference in the destination file matches an actual file
   that now exists in the destination's public folder.
3. Summarize for the user: what was converted, which images were renamed and how,
   and what was added during enrichment.
