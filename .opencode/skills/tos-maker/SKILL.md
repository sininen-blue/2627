---
name: tos-maker
description: >
  Creates a Table of Specifications from exam content in the
  required Typst format. ALWAYS asks the user for the list of
  topics first — never infers them. Then collaboratively assigns
  each question to a topic and Bloom's level. Verifies all items
  are accounted for, no duplicates, and all row/column sums
  reconcile against the exam's total points.
  Use when user says "make a TOS", "table of specifications",
  "create TOS", "build a TOS", or invokes /tos-maker.
---

# TOS Maker Skill

Create a Table of Specifications from exam content.

## Workflow

### Step 1: Gather Inputs — ALWAYS Ask for Topics

Before building the TOS, collect these in this order:

1. **Topic list (REQUIRED)** — Ask the user for the list of topics the exam covers.
   These become the rows of the TOS. ⛔ **Do NOT proceed without a topic list.**
   ⛔ **Do NOT infer or guess topics from the exam content.**
   If the user hasn't provided one, stop and ask: *"What topics does this exam cover? List them all."*
   If the user seems unsure, suggest they check their syllabus or course outline.

2. **Exam content** — Ask for a file path or pasted questions. Parse each item
   (question number, point value, section).

3. **Bloom's level scale** — Ask which cognitive levels to use.
   Default: `Knowledge`, `Comprehension`, `Higher` (Application/Analysis/Evaluation).
   Allow custom level names (but note them in the output).

### Step 2: Assign Each Question

For every exam item, determine:

- Which **topic** it belongs to (from the user's list — never add a topic the user didn't list)
- Which **cognitive level** it tests

Ask the user for confirmation on ambiguous cases. Suggest a default based on:
- **Knowledge**: Recall of definitions, facts, terms, dates, symbol meanings. Questions like "What is...", "What does...do", "When was...", "Which category contains..."
- **Comprehension**: Understanding, interpreting, explaining, differentiating, comparing. Questions like "How does...differ", "Why does...", "Which block should...", "What does [statement] mean?"
- **Higher**: Application, analysis, evaluation, creating. Scenario-based questions, debugging, writing code, describing/analyzing code.

### Step 3: Build TOS in Typst Format

Structure the TOS using the required Typst format (see below).
Each question must appear in **exactly one** cell.

### Step 4: Verify Sums

Run these checks automatically:

1. **Row sums** — Per-topic total = Knowledge + Comprehension + Higher points
2. **Column sums** — Per-level total = sum of all topics' points at that level
3. **Grand total** — Overall sum = exam's total possible points
4. **Complete coverage** — Every exam question is assigned to exactly one cell
5. **No overcounting** — No question appears in two different cells

If any check fails, report the discrepancy and pause for user input before continuing.

### Step 5: Output

Output the TOS in the **required Typst format** only. No other formats.

---

## Required Output Format (Typst)

The output file must follow this exact structure:

```typst
actual topics

topic 1
topic 2
topic 3
...

#let courseCode = "COURSE CODE"
#let courseDate = "MONTH YEAR"
#let courseTitle = "Course Title"

#let tosData = (
  (
    topic: "Topic 1",
    knowledge: "MC: #q1, q2, q3 (N points)",
    comprehension: "MC: #q4, q5 (N points)",
    higher: [],
    total: "N"
  ),
  (
    topic: "Topic 2",
    knowledge: "MC: #q1, q2 (N points)",
    comprehension: [],
    higher: "MC: #q3 (N points)",
    total: "N"
  ),
  ...
)

#let tosTotals = (
  knowledge: "N",
  comprehension: "N",
  higher: "N",
  total: "N"
)
```

### Rules for the format:

**`actual topics` block (top of file)**
- First line must be exactly `actual topics`
- Then a blank line
- Then each topic on its own line (plain text, one per line, no numbering)
- Matches the topics the user provided in Step 1
- Same order and wording as Row 1, 2, 3... in `tosData`

**`#let tosData` entries**
- **topic**: string — must match one of the `actual topics` exactly (case-sensitive)
- **knowledge**: `"MC: #q1, q2, q3 (N points)"` — list question numbers, end with point total in parentheses. Use `[]` (empty array) if zero items.
- **comprehension**: same pattern as knowledge, or `[]`
- **higher**: same pattern as knowledge/comprehension, or `[]`. For non‑MC items use `"Description: #1-4 (N points)"` etc.
- **total**: string of the arithmetic sum for that row

**`#let tosTotals`**
- **knowledge**: string of the sum of all rows' knowledge points
- **comprehension**: string of the sum of all rows' comprehension points
- **higher**: string of the sum of all rows' higher points
- **total**: string of the grand total (must equal exam total, row sum total, and column sum total)

## Rules

- Every question must map to **exactly one topic** and **exactly one level**
- No question may appear in two cells (overcounting) or be left out (gap)
- Row and column sums must **reconcile** — the TOS is a closed arithmetic system
- The grand total must **match** the exam's stated total points
- If the user disagrees with a suggested topic/level, defer to their judgment
- Record point values, not just question counts (a 5pt item counts as 5, not 1)

## Common Pitfalls

| Pitfall | Fix |
|---------|------|
| Proceeding without a topic list | Stop and ask the user. This is the first step. |
| Missing a question from the TOS | Run coverage check: does every Q# appear exactly once? |
| Topic in `actual topics` but missing from `tosData` (or vice versa) | Cross-reference both lists — they must match exactly |
| Question assigned to wrong topic | Verify against the syllabus or course outline |
| Knowledge/Comprehension confusion | "What does X mean?" = Comprehension (interpretation). "What is X?" = Knowledge (recall). |
| Point counts don't match grand total | Re-sum every row and column from scratch |
| Description/essay items lumped under wrong level | Performance tasks (describe, analyze) are Higher, not K/C |
| Per-topic total says one number but cell contents sum to another | Trust the arithmetic, not the declared total |
| Using wrong format for empty cells | Use `[]` (empty array), not `"0"` or `""` |
