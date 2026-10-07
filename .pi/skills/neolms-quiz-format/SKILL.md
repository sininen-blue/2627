---
name: neolms-quiz-format
description: >
  Authors quiz question batches in the NeoLMS quiz_inputter.js Markdown
  format: mc (multiple choice, one answer), many (multiple choice, many
  answers), blank (fill in the blanks), freeform, and tf (true/false).
  Enforces strict syntax (explicit `*`/`-` markers, metadata blank-line
  rule, type-specific validation) and quiz-writing quality rules. Use when
  the user asks to write/create/make a quiz, quiz file, or question batch
  for NeoLMS / quiz_inputter, or references scripts/quiz_inputter.js or
  quizes/cs370/finals/format.md.
---

# NeoLMS Quiz Format Skill

Write quiz `.md` files that `scripts/quiz_inputter.js` can parse and submit
to NeoLMS. The full format spec lives in `scripts/quiz-format.md` (repo
root) — **read it before writing any quiz file**, it is the source of
truth for syntax and validation rules. This skill adds the authoring
workflow and content-quality rules on top of that spec.

## Workflow

### Step 1: Gather requirements

Before writing any questions, confirm:

1. **Source material** — notes, lecture content, or topics to draw from.
   If none is given, ask for it rather than inventing unrelated content.
2. **Question count and type mix** — how many questions, and which types
   (`mc`, `many`, `blank`, `freeform`, `tf`). If unspecified, ask, or default
   to mostly `mc` with a couple of `tf`/`blank` for variety.
3. **Output path** — where to write the file (e.g.
   `quizes/<course>/<unit>/<name>.md`).

### Step 2: Write the file

- Read `scripts/quiz-format.md` for exact syntax before generating anything.
- Every block needs explicit `*` on each correct option (`mc`, `many`) —
  there is no "first option is correct" shortcut in this format.
- Keep all blocks of the same type adjacent where it doesn't hurt variety —
  it minimizes the number of type-switches `quiz_inputter.js` has to perform
  when run (each switch costs an extra navigation step), but never reorder
  at the cost of a good mix/progression.
- After writing, mentally re-check every block against the validation list
  in `scripts/quiz-format.md` (one `*` per `mc`, `BLANK` count matches
  answer-line count, `tf` answers are exactly `true`/`false`, etc.) — a
  single bad block rejects the entire batch when pasted into the script.

### Step 3: Content quality rules

- **Distractors** (incorrect options) must be plausible — sourced from or
  inspired by real misconceptions in the material, not random filler. Avoid
  "none of the above" / "all of the above".
- **Length/structure parity** — all options in an `mc`/`many` question
  should be roughly the same length and sentence structure, so the correct
  answer isn't guessable from form alone.
- **Positive phrasing** — write "which IS true", not "which is NOT true".
  Avoid double negatives.
- **One clearly correct answer** for `mc`/`tf`; for `many`, make sure every
  `*`-marked option is unambiguously correct and every `-`-marked option is
  unambiguously wrong (no partial-credit gray areas).
- **`blank` questions** — only blank out a term that has one or few agreed
  spellings; list every reasonable spelling/synonym as a comma-separated
  alternative on the answer line.
- **`freeform` questions** — phrase as an open request ("Describe...",
  "Explain...") since there's no auto-grading; keep `points:` proportional
  to expected answer depth.
- Vary question stems (what/how/which/in what scenario) and avoid a
  question whose answer is guessable purely from phrasing or length.

### Step 4: Hand off

- Tell the user the file path and a one-line summary of the type mix/count.
- Remind them (per `scripts/quiz-format.md`) to navigate to the "Add
  `<Type>`" page matching the **first** block's type before pasting into the
  `quiz_inputter.js` panel and pressing Start.

## Common pitfalls (fail the whole batch if present)

| Pitfall | Fix |
|---|---|
| Missing blank line after `type:`/`points:` | Always leave exactly one blank line before the question text |
| Forgot `*` on the correct `mc`/`many` option | Every correct option needs an explicit `*`, no implicit first-option rule |
| `blank` answer-line count ≠ number of `BLANK`s in the question | One answer line per `BLANK`, same order |
| `tf` answer isn't exactly `true`/`false` | Use lowercase `true`/`false` text only, marker `-` |
| `freeform` block has answer lines | Freeform takes no `-`/`*` lines at all |
| More than 12 options in `mc`/`many` | NeoLMS forms cap at 12 choices |
| Using `*` in `blank`/`tf` | Those types always use `-`, `*` is mc/many-only |
