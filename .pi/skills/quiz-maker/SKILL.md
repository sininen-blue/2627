---
name: quiz-maker
description: >
  Generates well-structured multiple-choice quizzes from user-provided materials.
  Always asks for learning objective, difficulty level, question count, and output
  format before generating. Supports a plain Markdown MC format and the NeoLMS
  quiz_inputter.js batch format (mc/many/blank/freeform/tf). Enforces strict
  quality rules for distractors, formatting, and wording.
  Use when user says "make a quiz", "create a quiz", "quiz me on", "test my knowledge",
  "multiple choice questions", or invokes /quiz.
---

# Quiz Maker Skill

Generate quizzes from user-provided learning materials, in either a plain
Markdown MC format or the NeoLMS `quiz_inputter.js` batch format.

## Workflow

### Step 1: Gather Requirements

Before generating ANY questions, ALWAYS ask the user for:

1. **Learning Objective** — What should the quiz assess? (e.g., "understand the Pythagorean theorem", "identify React hooks")
2. **Difficulty Level** — One of: `easy`, `medium`, `hard`, or `mixed`
3. **Question Count** — How many questions to generate (e.g., 5, 10, 20)
4. **Output Format** — One of:
   - **plain** (default) — the simple MC-only Markdown format described below.
   - **neolms** — the NeoLMS `quiz_inputter.js` batch format (supports `mc`,
     `many`, `blank`, `freeform`, `tf`). If the user asks for "NeoLMS format",
     "quiz_inputter format", mentions `scripts/quiz_inputter.js`, or references
     a `quizes/<course>/.../format.md`-style file, default to this without
     asking. Also ask for the **type mix** (e.g. mostly `mc` with a couple of
     `tf`/`blank`) if not specified.

If the user provides source material (notes, textbook excerpt, slides, etc.), use that as the basis for questions. If no material is provided, ask for it.

### Step 2: Generate Quiz

Once requirements are confirmed, generate the quiz following the rules below.

- If **plain** format: follow "Output Format" and the Rules section as-is.
- If **neolms** format: switch to the `neolms-quiz-format` skill's syntax and
  workflow — read `scripts/quiz-format.md` for the exact block syntax before
  writing anything, and follow its content-quality rules (explicit `*`
  markers, metadata blank-line rule, type-specific validation, etc.). The
  content-quality rules below (plausible distractors, positive phrasing,
  length/structure parity, varied stems) still apply across all types in
  that format, not just `mc`/`many`.

## Output Format (plain)

Every quiz MUST follow this exact format. No header — just question blocks separated by `---`:

```
[Question text]

- [Correct answer]
- [Distractor 1]
- [Distractor 2]
- [Distractor 3]

---

[Question text]

- [Correct answer]
- [Distractor 1]
- [Distractor 2]
- [Distractor 3]

---

...
```

## Output Format (neolms)

When the user wants the NeoLMS `quiz_inputter.js` format instead, do **not**
use the plain `---`-separated MC-only shape above. Instead:

- Read `scripts/quiz-format.md` (full spec) and follow the `neolms-quiz-format`
  skill's workflow and syntax rules exactly: `type:`/`points:` metadata (with
  the required blank line before question text), explicit `*`/`-` markers,
  `BLANK` placeholders for `blank` type, `true`/`false` for `tf`, no answer
  lines for `freeform`.
- Use a mix of types (`mc`, `many`, `blank`, `freeform`, `tf`) as agreed with
  the user in Step 1, defaulting to mostly `mc` with a couple of `tf`/`blank`
  if unspecified.
- Group blocks of the same type adjacently where it doesn't hurt variety, to
  minimize type-switches for the script, per the `neolms-quiz-format` skill.
- Still apply every content-quality rule below (plausible distractors,
  length/structure parity, positive phrasing, varied stems, one clearly
  correct answer) — they apply regardless of output format.
- Before handing off, mentally re-check each block against the validation
  list in `scripts/quiz-format.md`.

## Rules (STRICT, plain format)

These formatting rules apply to the **plain** format. For **neolms** format,
use the syntax rules above instead — but all Distractor/Question
Wording/Answer Choice/Content Quality rules below still apply to both.

### Formatting
- Every question is multiple choice with exactly **4 options**
- The **correct answer is ALWAYS the first option** (listed as `- [Correct answer]`)
- Questions and answer sets are separated by `---`
- No numbering, no header, no metadata — just question, answers, separator
- Each question block: question line, blank line, 4 answer lines, blank line

### Distractors
- All distractors must be **plausible** — a student who didn't study might reasonably pick them
- Distractors must be **directly sourced from or inspired by** the input materials (not random filler)
- All 4 options (correct + distractors) must be **roughly equal in length** — same number of words, same sentence structure, similar level of detail
- Avoid obviously wrong answers ("none of the above", "all of the above", "I don't know")
- Distractors should test common misconceptions or confusion points

### Question Wording
- Questions must be **positively worded** — ask what IS true, what DOES happen, what IS correct
- NEVER use negative phrasing like "which is NOT", "all of the following EXCEPT", "which does NOT"
- Questions should be **simply worded** by default — short, direct, and to the point
- Reserve longer, more complex question stems for higher difficulty (`hard`) questions that require critical thinking or scenario-based reasoning
- At `easy` and `medium`, keep questions concise (one sentence preferred)
- Avoid multi-clause questions when a single clause suffices
- Avoid double negatives
- Use domain-specific vocabulary from the source material

### Answer Choice Simplicity
- Answer choices should be **simple and straightforward** — avoid unnecessarily wordy or complex phrasing
- Prefer short, direct answers over verbose explanations
- Use the same sentence structure across all 4 options (e.g., all noun phrases, all verb phrases, all complete sentences)
- Avoid answers that contain multiple clauses when a single clause works
- If an answer needs a qualifier, all answers should have similar qualifiers

### Content Quality
- Questions should test understanding, not just recall
- Vary question stems (what, how, which, in what scenario, according to...)
- Spread questions across the full scope of the learning objective
- Avoid questions where the answer can be guessed from question length or structure
- Ensure only ONE answer is clearly correct — no debatable "best" answers

## Example

**User input:** Notes about photosynthesis

**Generated output:**

```
What is the primary function of chlorophyll in photosynthesis?

- Absorbing light energy to make glucose
- Releasing oxygen as a waste product
- Breaking down glucose for energy
- Transporting water through the xylem

---

Where does the Calvin cycle occur in the chloroplast?

- In the stroma
- On the thylakoid membrane
- In the intermembrane space
- On the outer membrane

---

What does NADPH provide in the light-independent reactions?

- Electrons and hydrogen to reduce CO2
- Photons to excite reaction center electrons
- Phosphate groups to form ATP
- Oxygen for carbon fixation

---
```

## Common Pitfalls to Avoid

| Pitfall | Fix |
|---------|-----|
| Distractors too easy to eliminate | Source from actual misconceptions in the material |
| Distractors unequal length | Pad shorter options or trim longer ones to match |
| Negative questions ("which is NOT") | Rewrite as positive ("which IS") |
| Multiple correct answers | Ensure only one is defensibly correct |
| Vague questions | Reference specific concepts from the material |
| Guessable from question structure | Vary stem length and complexity |
| Overly complex questions at low difficulty | Keep easy/medium questions to one sentence; save complex stems for hard |
| Verbose or wordy answer choices | Trim to essential info; match length and structure across all options |

## After Generation

- Offer to regenerate with different difficulty or count
- Offer to focus on specific subtopics
- Offer to add an answer key with explanations
- Offer to convert the quiz to the other output format (plain ↔ neolms)
