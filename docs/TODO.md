# TODO: Multi-type support for quiz_inputter.js

## Tasks

- [x] Get/confirm full HTML for "Multiple choice (one answer)" new-question
      form (`quizes/cs370/finals/mult_choice.html`)
- [x] Get/confirm full HTML for "Multiple choice (many answers)" new-question
      form (`quizes/cs370/finals/mutl_correct.html`)
- [x] Decide behavior for correct-answer marking (`*` required for all MC
      types, no implicit first-bullet convention)
- [x] Decide type-switch navigation mechanism (modal-click, not direct URL)
- [ ] Rewrite `parseInput` in `scripts/quiz_inputter.js` into a block parser
      producing `{ type, points, question, options }` per block, per the
      settled format rules in `docs/PLAN.md`
- [ ] Implement a pre-parser/validator pass that checks the *entire* pasted
      batch up front and collects all errors before anything is queued
      (unknown type, wrong `*` count, blank/BLANK count mismatch, bad tf
      answer, >12 options)
- [ ] Implement `fillTrueFalse` (`question_description`, `question_points`,
      `question_true_or_false_{true,false}` radio)
- [ ] Implement `fillBlank` (`question_description` with `BLANK`
      placeholders, `question_points`, `blank_1..N` per comma-separated
      answer line)
- [ ] Implement `fillFreeform` (`question_description`, `question_points`)
- [ ] Implement `fillMultipleChoiceMany` (`question_description`,
      `question_points`, `text[i]`, `correct[i]` checkbox per `*`, leave
      `percent[i]` blank)
- [ ] Implement `fillMultipleChoiceOne` (`question_description`,
      `question_points`, `text[i]`, `question_correct_<i>` radio set to the
      `*` option's index)
- [ ] Add current-page type detection (`type=` in `location.search`)
- [ ] Add first-item type-mismatch guard at Start time (abort + instructive
      log, no fields touched)
- [ ] Implement same-type fast path (`commit_and_another_same`) vs.
      different-type path (`commit_and_another` → MutationObserver waits for
      "Add questions" modal → click matching `type=` link) in `processNext`
- [ ] Bound the modal wait with a timeout (~10s) that logs an error and halts
      the batch if the modal never appears
- [ ] Update queue/log UI to show parsed type per item and surface pre-parse
      errors clearly
- [ ] Manual end-to-end smoke test: paste one block of each of the 5 types,
      including at least one type-switch transition, and verify correct
      fields/correct-answers land in NeoLMS
- [ ] Update `scripts/quiz_inputter.js` version/header comment
      (`@version`, `@description`)

## Deferred / future

- [ ] Support explicit per-option `percent` override syntax for `type: many`
      (not needed yet — site default equal-weighting is used for now)
- [ ] Support `order`/`case` override metadata for `type: blank` (not needed
      yet — form defaults are left untouched)
- [ ] Update old quiz `.md` files (e.g. `midterm/combinational.md`) to use
      explicit `*` marking if they're ever re-run through the updated script
