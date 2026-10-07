# Plan: Multi-type support for quiz_inputter.js

## Goal

`scripts/quiz_inputter.js` currently only fills NeoLMS "Multiple choice (one
answer)" question forms (`#question_description` + `#text_1`..`#text_4`) and
blindly clicks "Save and add another of the same type" for every item in the
queue. `quizes/cs370/finals/format.md` describes a new Markdown block format
that should drive **five** question types:

- (default/untyped) — Multiple choice, one answer
- `type: many` — Multiple choice, many answers (per-choice +/-% weight, `*`
  marks correct, `-` marks incorrect)
- `type: blank` — Fill in the blanks (`BLANK` placeholders in the question,
  one answer line per blank)
- `type: freeform` — Free-text response, optional `points:` override
- `type: tf` — True/False, single answer line (`true`/`false`)

Success = pasting a mixed-type Markdown batch into the panel fills out the
correct form fields for each question's type (including marking correct
answers), and — since each type lives on a different NeoLMS page
(`.../new_question/<id>?...&type=TYPE`) — the script either navigates to the
right type's page before filling it in, or clearly tells the user when a
manual "change type" step is required, instead of silently misfilling a form
built for a different type.

## Approach

1. **Parser rewrite** — replace `parseInput` with a block parser that:
   - Splits on `---` the same way.
   - Reads optional leading `key: value` metadata lines (`type`, `points`)
     until a blank line, defaulting `type` to `mc` (one-answer) when absent.
   - Strips trailing `# comment` annotations from any line.
   - Parses the remaining body as question text + answer lines, treating
     leading markers per type: `-` plain option, `*` correct option (many),
     comma-separated blank answers, single tf line, freeform has no options.
   - Emits a structured object `{ type, points, question, options }` instead
     of a positional array.
2. **Per-type fillers** — add one filler function per NeoLMS question type
   that knows the real field names (confirmed from the saved HTML samples in
   `quizes/cs370/finals/*.html`, plus whatever is confirmed for MC
   one-answer/many-answer — see open questions):
   - `fillMultipleChoiceOne`
   - `fillMultipleChoiceMany`
   - `fillBlank`
   - `fillFreeform`
   - `fillTrueFalse`
3. **Type-aware navigation** — detect the current page's type from
   `location.search` (`type=...`). If the next queued item's type doesn't
   match, stop auto-clicking "same type" and instead navigate
   (`location.href`) to the new-question URL for the correct type before
   resuming the queue (state survives via `sessionStorage`, same pattern used
   today for resuming after a submit).
4. **Submit button logic** — only use "Save and add another of the same
   type" when the *next* queued item is the same type as the current page;
   otherwise use plain "Save and add another" (or navigate) so the type
   switch works.
5. **UI / logging** — surface the parsed type per item in the log line, and
   surface parse errors (e.g. unknown `type:`, missing blank answer, tf
   answer not true/false) clearly rather than silently skipping.

## Milestones

- [ ] Confirm the exact DOM/field names for MC one-answer and MC many-answer
      "new question" forms (see open questions).
- [ ] New parser producing structured per-type question objects, with unit
      coverage for every example block in `format.md`.
- [ ] Per-type field fillers implemented and wired into `processNext`.
- [ ] Type-switch/navigation flow working across page loads.
- [ ] Manual end-to-end test against a real NeoLMS quiz bank (one block of
      each type).

## Settled design (post-grilling)

All open questions below were resolved through a grilling session, cross-
checked against saved HTML (`quizes/cs370/finals/{true_false,blank,freeform,
mult_choice,mutl_correct}_question.html` and `url_list.md`). This is the
locked-in design:

### Markdown format / parsing

- Blocks split on `---`. Optional leading `key: value` metadata lines
  (`type`, `points`) must be followed by a **blank line** before the question
  body — required, not heuristically detected. `type` defaults to `mc` when
  metadata is absent. `points` defaults to `1` (form default) and is valid on
  any type, not just `freeform`.
- `#` comments shown in `format.md` are authoring guidance only, not part of
  the real format — the parser does **no** comment stripping.
- `*` vs `-` marks correct/incorrect for **both** MC types (no implicit
  "first bullet is correct" — existing old quiz files using plain `-` will
  need a pass adding `*` if reused through the new script).
- A **pre-parser** validates the entire pasted batch before anything is
  queued: unknown `type:`, wrong `*` count (`mc` needs exactly one, `many`
  needs at least one), `blank` answer-line count must match `BLANK`
  occurrences in the question text, `tf` answer must be `true`/`false`, more
  than 12 options for `mc`/`many`. Any error aborts the whole batch (nothing
  queued) with the full list of errors logged; nothing is queued partially.

### Per-type field fillers (confirmed field names)

- `mc` (default, `MultipleChoiceOneAnswer`) — `question_description`,
  `question_points`, `text[1..n]`, set `#question_correct_<i>` radio
  (`name="question[correct]"`) to the index of the `*` option. Leave
  `question_ordering` (default Randomize) and Feedback (default No)
  untouched. Up to 12 choices.
- `many` (`MultipleChoiceManyAnswers`) — same description/points/`text[i]`,
  check `#correct_<i>` (`name="correct[i]"`) for every `*` option. Leave
  `percent[i]` blank (site auto-weights equally) and ordering/feedback
  untouched. Up to 12 choices.
- `blank` (`FillInTheBlanks`) — `question_description` (containing `BLANK`
  placeholders), `question_points`, `blank_1..N` filled in order from
  comma-separated answer lines (one line per blank). Leave `order_matters`
  (default Yes) and `case_sensitive` (default No) untouched.
- `freeform` (`Freeform`) — `question_description`, `question_points` only;
  no answer lines parsed.
- `tf` (`TrueOrFalse`) — `question_description`, `question_points`, set
  `#question_true_or_false_true`/`_false` radio. Leave correction box and
  feedback at defaults.

### Navigation / type-switching

- Same type back-to-back → `commit_and_another_same` (fast path, lands
  directly on a fresh same-type `new_question` page).
- Different type next → generic `commit_and_another` → lands on the
  question-bank listing page → `MutationObserver` waits (≤10s timeout, else
  log error and halt the batch) for the "Add questions" modal to render →
  click the `<a>` whose `href` contains the target `type=` → lands on the
  correct `new_question` page → script re-inits (already matches
  `new_question/*`) and resumes the queue from `sessionStorage`.
  (Direct URL construction by swapping `type=` on the current URL does
  **not** work — confirmed via `url_list.md` that the generic "add another"
  redirect target is the bank listing page, not a `new_question` page, so
  there's no URL to patch at that point.)
- End-of-queue behavior is unchanged from the current script (still
  finishes via the "add another" path, leaving a fresh blank form).
- Before starting a batch, compare the first queued item's `type` against
  the current page's `type=` query param. Mismatch → abort immediately with
  no fields touched, log tells the user which "Add <Type>" page to navigate
  to manually, then press Start again (no automated recovery for the very
  first item).

### Other

- `neolms-script-guide.md` rule says "Start/Stop buttons only — never
  auto-submit site forms", but the existing script already auto-submits via
  `submit_new_question`. Keeping current auto-submit behavior for
  consistency with the existing script.
