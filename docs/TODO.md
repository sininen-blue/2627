# TODO: Multi-type support for quiz_inputter.js

## Tasks

- [x] Get/confirm full HTML for "Multiple choice (one answer)" new-question
      form (`quizes/cs370/finals/mult_choice.html`)
- [x] Get/confirm full HTML for "Multiple choice (many answers)" new-question
      form (`quizes/cs370/finals/mutl_correct.html`)
- [x] Decide behavior for correct-answer marking (`*` required for all MC
      types, no implicit first-bullet convention)
- [x] Decide type-switch navigation mechanism (modal-click, not direct URL)
- [x] Rewrite `parseInput` in `scripts/quiz_inputter.js` into a block parser
      producing `{ type, points, question, options }` per block, per the
      settled format rules in `docs/PLAN.md` (`preParse`/`splitBlocks`/`parseBlock`)
- [x] Implement a pre-parser/validator pass that checks the *entire* pasted
      batch up front and collects all errors before anything is queued
      (unknown type, wrong `*` count, blank/BLANK count mismatch, bad tf
      answer, >12 options) — verified with a standalone node test harness
      covering every `format.md` example plus 7 error cases
- [x] Implement `fillTrueFalse` (`question_description`, `question_points`,
      `question_true_or_false_{true,false}` radio)
- [x] Implement `fillBlank` (`question_description` with `BLANK`
      placeholders, `question_points`, `blank_1..N` per comma-separated
      answer line)
- [x] Implement `fillFreeform` (`question_description`, `question_points`)
- [x] Implement `fillMultipleChoiceMany` (`question_description`,
      `question_points`, `text[i]`, `correct[i]` checkbox per `*`, leave
      `percent[i]` blank)
- [x] Implement `fillMultipleChoiceOne` (`question_description`,
      `question_points`, `text[i]`, `question_correct_<i>` radio set to the
      `*` option's index)
- [x] Add current-page type detection (`type=` in `location.search`)
- [x] Add first-item type-mismatch guard at Start time (abort + instructive
      log, no fields touched)
- [x] Implement same-type fast path (`commit_and_another_same`) vs.
      different-type path (`commit_and_another` → MutationObserver waits for
      "Add questions" modal → click matching `type=` link) in `processNext`
- [x] Bound the modal wait with a timeout (~10s) that logs an error and halts
      the batch if the modal never appears
- [x] Update queue/log UI to show parsed type per item and surface pre-parse
      errors clearly
- [ ] Manual end-to-end smoke test: paste one block of each of the 5 types,
      including at least one type-switch transition, and verify correct
      fields/correct-answers land in NeoLMS (requires the live NeoLMS site —
      user action)
- [x] Update `scripts/quiz_inputter.js` version/header comment
      (`@version`, `@description`)

- [x] Write clean authoring documentation (`scripts/quiz-format.md`)
- [x] Write a quiz-authoring skill (`.pi/skills/neolms-quiz-format/SKILL.md`)
- [x] Write a test quiz exercising all 5 types + type-switches
      (`quizes/cs370/finals/test_quiz.md`), validated error-free against the
      real parser

## Deferred / future

- [ ] Support explicit per-option `percent` override syntax for `type: many`
      (not needed yet — site default equal-weighting is used for now)
- [ ] Support `order`/`case` override metadata for `type: blank` (not needed
      yet — form defaults are left untouched)
- [ ] Update old quiz `.md` files (e.g. `midterm/combinational.md`) to use
      explicit `*` marking if they're ever re-run through the updated script
