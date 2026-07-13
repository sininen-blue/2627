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

### 2. Question Clarity

Flag questions that:
- Are overly wordy (more than ~25 words for the stem)
- Contain unnecessary clauses or qualifiers
- Use vague language ("the thing", "the approach mentioned earlier")

### 3. No Negative Phrasing

Flag stems containing:
- "which is NOT", "which does NOT", "all of the following EXCEPT"
- "which is LEAST", "what is FALSE"
- "never", "always" (in the stem)
- Double negatives of any kind

Do NOT flag if the user explicitly requested negative-format questions.

### 4. Self-Contained Stems

The stem must make sense without reading the response options. Flag if:
- The stem ends with a dangling phrase that only resolves in the options
- Pronouns refer to something only the options define (e.g., "What is this process called?")
- The stem is a sentence fragment that needs the options to complete it

### 5. Response Set Balance

All 4 options should be roughly equal in length (within ~30% word count of each other). Count words per option and flag outliers.

### 6. No "All / None of the above"

Flag any option that says "all of the above", "none of the above", "both A and B", "neither A nor B". These violate the independence and plausibility rules.

### 7. No Absolute Language in Responses

Flag response options that contain "never", "always", "every", "no X ever" — unless the source material explicitly supports that absolute claim.

### 8. Positive Wording in Responses

Every response option should state what IS true, not what is NOT true. Flag options phrased as:
- "Does not require X" (rewrite as "Uses Y instead")
- "Is not affected by Z" (rewrite as "Operates independently of Z")
- "Cannot perform W" (rewrite as "Performs V instead")

### 9. Application Over Recall

Prefer questions that ask students to apply knowledge (given scenario X, what happens?). Flag if more than half the questions are pure factual recall, unless the user specified recall-focused exam type.

Application question examples:
- "A program loads 0x3F into the PC and the memory at that address contains 0x8B. Which register holds 0x8B after the fetch stage?"
- "A CISC processor has no LOAD instruction before an ALU operation. What assumption does this make about the instruction set?"

### 10. Question Independence

No question should depend on content from another question. Flag if:
- Question 3 refers to "the instruction described in question 1"
- Answering question 5 requires knowing the answer to question 4
- Two questions overlap to the point that one spoils the other

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
