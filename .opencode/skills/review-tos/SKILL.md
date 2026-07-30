---
name: review-tos
description: >
  Reviews an existing Table of Specifications against quality criteria:
  format compliance (required Typst structure), complete coverage,
  no overcounting, row/column sum reconciliation, Bloom's classification
  accuracy, topic alignment, and distribution balance.
  Produces a structured per-criterion report and offers auto-fixes
  for flagged issues.
  Use when user says "review this TOS", "check TOS quality",
  "verify TOS", "tos review", "/review-tos".
---

# Review TOS Skill

Review an existing Table of Specifications against 9 quality criteria.

## When to Use

- **Auto-trigger:** After every TOS generation (unless user opts out)
- **Manual trigger:** "review this TOS", "check TOS quality", "verify TOS", "tos review", "is this TOS correct", "/review-tos"

## Workflow

### Step 1: Receive TOS and Exam

Accept the TOS as a file path or pasted content. If a separate exam file is available, accept it too for cross-referencing. Parse:

- **From TOS:**
  - `actual topics` block (plain text at top)
  - `#let courseCode`, `#let courseDate`, `#let courseTitle`
  - `#let tosData = (...)` — topics, cells (question lists per level), declared totals
  - `#let tosTotals = (...)` — declared column and grand totals
- **From exam (if available):** question numbers, sections, point values, question text

### Step 2: Run All Checks

Run every criterion below. For each, either **pass** or **flag** with specific item numbers and a brief reason.

### Step 3: Produce Report

Output a structured report grouped by criterion (see format below).

### Step 4: Offer Fixes

After the report, offer to:

1. Auto-fix all flagged items (fix format, reclassify levels, correct totals, reassign topics)
2. Fix specific flagged items by number
3. Re-run review after fixes

## Review Criteria

### 0. Format Compliance (Required Typst Structure)

Verify the TOS follows the required format:

- ✅ File begins with `actual topics` on its own line
- ✅ After a blank line, each topic appears on its own line (plain text)
- ✅ `#let courseCode = "..."` is present
- ✅ `#let courseDate = "..."` is present
- ✅ `#let courseTitle = "..."` is present
- ✅ `#let tosData = (...)` is present and well-formed (parentheses balanced)
  - Each entry has: `topic:`, `knowledge:`, `comprehension:`, `higher:`, `total:` keys
  - String fields use `"..."`, empty cells use `[]` (not `"0"`, not empty string)
  - Question lists follow the pattern `"MC: #q1, q2, q3 (N points)"`
- ✅ `#let tosTotals = (...)` is present and well-formed
  - Contains: `knowledge:`, `comprehension:`, `higher:`, `total:` keys

Flag any structural deviation.

### 1. Topic List Match

Cross-reference the `actual topics` block against the `tosData` topic fields. Flag:
- A topic in `actual topics` that has no matching `tosData` entry
- A topic in `tosData` that has no matching `actual topics` entry
- Different ordering between the two lists

**Note:** The `actual topics` list is the authoritative source — `tosData` must match its order and exact wording.

### 2. Complete Coverage

Every question from the exam must appear in **exactly one** cell of the TOS. Cross-reference the exam file against the TOS. Flag:
- Questions present in the exam but **missing** from the TOS
- Question numbers listed in the TOS that **don't exist** in the exam

### 3. No Overcounting

No question number should appear in more than one cell. Flag any duplicate.

### 4. Row Sums Correct

For each topic: declared total must equal `Knowledge + Comprehension + Higher` points. Flag mismatches.

**Example:** Topic declares total "12" but K=7 + C=5 + H=0 = 12. ✓

### 5. Column Sums Correct

For each level: declared total must equal sum of that level across all topics. Flag mismatches.

### 6. Grand Total Correct

Overall total must equal:
- Sum of all row totals
- Sum of all column totals
- Exam's stated total points (if exam is provided)

All three must agree.

### 7. Bloom's Classification

Check each question's assigned level against its wording:

| Level | What it tests | Question cues |
|-------|--------------|---------------|
| **Knowledge** | Recall facts, terms, definitions, dates, symbols | "What is...", "What does...do", "When was...", "Which category", "Identify the..." |
| **Comprehension** | Understand, interpret, explain, compare, differentiate | "What does [statement] mean?", "How does X differ from Y?", "Why does...", "Which should...", "What is the effect of..." |
| **Higher** | Apply, analyze, evaluate, create | "Describe the code", "What will this program output?", "Fix the bug", "Compare the approaches", scenario-based questions |

Flag if a question's wording is clearly at odds with its assigned level. Use judgment — many questions sit at a boundary and are defensible either way.

### 8. Distribution Balance

Assess whether point distribution is reasonable for the exam type:
- A **prelim** typically weights fundamentals heaviest
- A practical/programming exam should weight applied topics
- One topic dominating >60% of points may be justified or may signal skew

Flag only if the distribution seems disproportionate without justification. Do NOT flag if the TOS accurately reflects the syllabus emphasis.

## Report Format

```
## Review Report

### 0. Format Compliance
✅ File starts with `actual topics`, followed by 4 topics.
✅ `#let courseCode`, `courseDate`, `courseTitle` present.
✅ `#let tosData` has 4 entries with all required keys.
⚠️ Cell for Topic 3 `knowledge` uses `"0"` instead of `[]`.
✅ `#let tosTotals` has all 4 keys.

### 1. Topic List Match
✅ `actual topics` and `tosData` topics match exactly (order + wording).

### 2. Complete Coverage
✅ All 60 questions accounted for.

### 3. No Overcounting
✅ Each question appears in exactly one cell.

### 4. Row Sums
✅ All 4 topics reconcile.
  - Topic 1: declared 18, actual 18 ✓
  - Topic 2: declared 22, actual 22 ✓
  - Topic 3: declared 20, actual 20 ✓
  - Topic 4: declared 0, actual 0 ✓

### 5. Column Sums
✅ K=29, C=20, H=11, Total=60. All reconcile.

### 6. Grand Total
✅ 60 = 60. Matches exam total.

### 7. Bloom's Classification
⚠️ 2 questions potentially misclassified:
  - Q9: listed as Knowledge, stem asks "what does [statement] mean?" (Comprehension)
  - Q26: listed as Comprehension, stem asks "what does the 'forever' block do?" (Knowledge)

### 8. Distribution Balance
✅ Distribution is reasonable for a prelim.

---

**Summary:** 9 criteria checked. 7 ✅, 2 ⚠️.
```

## Example — Full Review Output

```
## Review Report

### 0. Format Compliance
✅ Starts with `actual topics`, 4 topics listed.
✅ Course metadata present.
✅ `#let tosData` has 4 entries, all keys present.
⚠️ Cell values use inconsistent format: some use `"MC: #1,2,3"` missing spaces after commas.
✅ `#let tosTotals` has all 4 keys.

### 1. Topic List Match
⚠️ `actual topics` lists "Processor Parallelism" but `tosData` has "Processors Parallelism" (typo).
   → "Processors Parallelism" should be "Processor Parallelism" to match.

### 2. Complete Coverage
✅ All 60 exam questions are in the TOS.

### 3. No Overcounting
✅ No duplicates found.

### 4. Row Sums
✅ Topic 1: K=15 + C=3 + H=0 = 18 ✓
✅ Topic 2: K=11 + C=9 + H=2 = 22 ✓
✅ Topic 3: K=3 + C=8 + H=9 = 20 ✓
✅ Topic 4: K=0 + C=0 + H=0 = 0 ✓

### 5. Column Sums
✅ Knowledge: 15+11+3+0 = 29 ✓
✅ Comprehension: 3+9+8+0 = 20 ✓
✅ Higher: 0+2+9+0 = 11 ✓

### 6. Grand Total
✅ 18+22+20+0 = 29+20+11 = 60 = exam total ✓

### 7. Bloom's Classification
✅ All classifications are appropriate.

### 8. Distribution Balance
✅ 18/22/20/0 across 4 topics. Reasonable distribution. Topic 4 has 0 items (not yet covered).

---

**Summary:** 9 criteria checked. 7 ✅, 2 ⚠️. Fix typo + standardize spacing?
```

## Offer Fixes

After the report, offer to:

1. **Auto-fix all** — Apply every suggested change (fix format, reclassify levels, correct totals, fix typos)
2. **Fix specific** — User specifies which flagged items to fix
3. **Re-run** — Run the review again after fixes to verify

## Common Pitfalls

| Pitfall | Fix |
|---------|------|
| Forgetting to check format compliance first | Run criterion 0 before anything else — if the structure is broken, other checks may be misleading |
| False positive on Bloom's classification | Many questions sit at the K/C boundary. Use judgment, don't flag defensible assignments. |
| Missing a duplicate Q# | Scan every cell systematically |
| Assuming exam point values | Verify against the actual exam, not the TOS's declared values |
| Over-flagging distribution | A disproportionate TOS may still be correct if syllabus emphasis warrants it |
| Not cross-referencing `actual topics` with `tosData` | Always check both — they must match in content AND order |
| Accepting `"0"` instead of `[]` for empty cells | Empty cells must use `[]` (empty array). `"0"` is incorrect. |
