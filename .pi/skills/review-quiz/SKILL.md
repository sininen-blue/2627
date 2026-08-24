---
name: review-quiz
description: >
  Reviews existing quizzes against quality criteria covering Bloom's taxonomy balance,
  question clarity, response set quality, independence, and application focus.
  Use after a quiz is generated, or on command like "review this quiz",
  "check quiz quality", "/review-quiz".
---

# Review Quiz Skill

Review existing quiz content against quality criteria. Produces a structured per-question report and offers to auto-fix flagged issues.

## When to Use

- **Auto-trigger:** After every quiz generation (unless user opts out)
- **Manual trigger:** "review this quiz", "check quiz quality", "quality check", "review these questions", "/review-quiz"

## Workflow

### Step 1: Receive Quiz

Accept quiz as user-provided text or by file reference. If the quiz is in the quiz-maker output format (question + 4 options, separated by `---`), parse it into individual questions. Otherwise, ask for clarification.

### Step 2: Review Each Question

Run every question through all 10 criteria below. For each criterion, either pass or flag with the specific issue.

### Step 3: Produce Report

Output a structured report grouped by question. Each entry lists the question, then the flagged criteria (if any). If all pass, state that.

**Report format:**

```
## Question 1
[Question text]

✅ All criteria pass

---

## Question 2
[Question text]

⚠️ **Response Balance** — Options vary in length (17, 9, 10, 18 words). Consider trimming option A and D.
⚠️ **Self-Contained Stem** — Stem references "the approach described above" but the approach is only described in the response set.

---

## Question 3
...

---

**Summary:** 10 questions reviewed. 2 flagged. 8 clean.
```

### Step 4: Offer Fixes

After the report, offer to:

1. Auto-fix all flagged issues (rewrite stems, balance options, reword negatives)
2. Fix specific questions by number
3. Regenerate flagged questions from source material
4. Rerun review after fixes

## Review Criteria

### 1. Bloom's Taxonomy Balance

Ensure the quiz as a whole spans multiple cognitive levels. Label each question:

| Level | What it tests | Example |
|-------|--------------|---------|
| **Factual** | Recall of terms, facts, dates | "Who introduced microprogramming in 1951?" |
| **Conceptual** | Relationships, categories, principles | "Why does pipelining improve throughput?" |
| **Procedural** | How to do something, sequences, methods | "What happens during the decode stage of the instruction cycle?" |
| **Metacognitive** | Strategy, judgment, evaluation | "Which approach is more appropriate for a mobile device and why?" |

If any level is completely absent, flag it. If all questions fall into one level, flag as imbalanced. Do NOT flag if the user specified a type of exam that justifies a single level (e.g., "this is a terminology quiz").

### 2. Question Clarity & Precision

Flag questions that:
- Are overly wordy (more than ~25 words for the stem)
- Contain unnecessary clauses or qualifiers
- Use vague language ("the thing", "the approach mentioned earlier")
- Use vague frequency or duration terms open to subjective interpretation: `often`, `usually`, `frequently`, `rarely`, `sometimes`, `occasionally`, `commonly`, `typically`, `seldom`, `generally`, `many`, `most`, `frequent`, `common` (when used as a frequency qualifier rather than a countable adjective)

Vague frequency terms have no fixed threshold — one student's "often" is another's "rarely" — which undermines objective answerability. Do NOT flag if the source material itself uses the term and precise quantification is infeasible, or if the term appears in a quoted passage or is itself the subject of the question. Suggest replacing with a specific measure or removing.

### 3. No Negation

No negative phrasing anywhere in the stem or options. Flag:
- In stems: "which is NOT", "which does NOT", "all of the following EXCEPT", "which is LEAST", "what is FALSE", "never", "always", double negatives
- In options: "Does not require X" (rewrite as "Uses Y instead"), "Is not affected by Z" (rewrite as "Operates independently of Z"), "Cannot perform W" (rewrite as "Performs V instead")

Do NOT flag if the user explicitly requested negative-format questions.

### 4. Self-Contained

The question must make sense without reading the response options AND must be answerable from the stem and options alone — no external knowledge, hidden context, or unstated prerequisites. Flag if:
- The stem ends with a dangling phrase that only resolves in the options
- Pronouns refer to something only the options define (e.g., "What is this process called?")
- The stem is a sentence fragment that needs the options to complete it
- Answering correctly requires knowledge not supplied in the stem or options
- The question references an acronym, concept, or scenario that is not defined or explained
- The stem assumes a specific textbook, lecture, or reading the user may not have
- An unstated convention or default is required to pick the right answer

### 5. Response Set Balance

All 4 options should be roughly equal in length (within ~30% word count of each other). Count words per option and flag outliers.

### 6. No Absolute or Meta-Referential Language

Flag response options containing:
- "all of the above", "none of the above", "both A and B", "neither A nor B" — these violate independence and plausibility rules
- "never", "always", "every", "no X ever" — unless the source material explicitly supports that absolute claim

### 7. Application Over Recall

Prefer questions that ask students to apply knowledge (given scenario X, what happens?). Flag if more than half the questions are pure factual recall, unless the user specified recall-focused exam type.

Application question examples:
- "A program loads 0x3F into the PC and the memory at that address contains 0x8B. Which register holds 0x8B after the fetch stage?"
- "A CISC processor has no LOAD instruction before an ALU operation. What assumption does this make about the instruction set?"

### 8. Question Independence

No question should depend on content from another question. Flag if:
- Question 3 refers to "the instruction described in question 1"
- Answering question 5 requires knowing the answer to question 4
- Two questions overlap to the point that one spoils the other

### 9. Single Dimension Responses (when applicable)

The four options should vary along a single logical dimension — they can be placed on a line from most correct to least correct, not scatter across unrelated categories.

Flag if:
- Options mix qualitatively different kinds of answers (e.g., one is "what it is", another is "when it happens", another is "why it matters")
- The options cannot be ranked or ordered along a single axis
- The set compares apples to oranges (e.g., "cache size" vs "pipeline depth" vs "clock speed" as answers to "what improves throughput?" — all valid but belong to different dimensions)
- The correct answer differs from distractors in *kind* rather than in *degree*

Do NOT flag if:
- The question is purely identification/definition-based (e.g., "Which component does X?") where categorical ≠ dimensional is expected
- The user's stated exam type justifies multi-dimensional options

### 10. Consistent Numeric Format

When options contain numeric values, all must use the same format — same base, units, precision, and notation. Flag if:
- Mixed bases (e.g., one option in decimal, another in hex)
- Inconsistent units or prefixes (e.g., `100 MB` vs `1 GB` vs `1048576 bytes`)
- Varying precision (e.g., `3.14` vs `3.14159265`)
- Different representations of the same magnitude (e.g., `1,000` vs `1e3` vs `1024`)
- Mixed unit scaling (e.g., `100 ms` vs `0.1 s` vs `100000 μs`)

Do NOT flag if the inconsistency is intentional and task-relevant (e.g., "Convert each to decimal: A) `0xFF` B) `0b1111` C) `65`").

## Example Review Output

```
## Question 1
Which of the following registers holds the memory address of the next instruction to be fetched?

- The Program Counter
- The Instruction Register
- The Accumulator
- The Memory Buffer Register

✅ All criteria pass

---

## Question 2
The fetch-decode-execute cycle is a purely logical sequence that does not require physical transistors to execute. What is a software implementation of this cycle called?

⚠️ **Negative Phrasing** — Stem contains "does not require". Rewrite as: "Because the fetch-decode-execute cycle is purely logical, it can be executed by software rather than physical transistors. What is a software implementation of this cycle called?"
⚠️ **Self-Contained Stem** — The first sentence "The fetch-decode-execute cycle is a purely logical sequence that does not require physical transistors to execute" is extraneous context that makes the stem longer than needed.

---

## Question 3
What is a key benefit of microprogramming?

- It allows entire families of machines to run the same software
- It enables higher clock speeds for all processor models equally
- It eliminates the need for any kind of control unit hardware
- It increases the number of registers available in the CPU

✅ All criteria pass

---

**Summary:** 3 questions reviewed. 1 flagged. 2 clean.
```

## After Review

- Offer to apply auto-fixes
- Offer to regenerate specific flagged questions
- Offer to rerun review
- Offer to adjust difficulty or focus
