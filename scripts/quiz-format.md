# NeoLMS Quiz Markdown Format

Reference for the Markdown format consumed by `scripts/quiz_inputter.js`
(Tampermonkey script, panel pasted into a NeoLMS "Add question" page). This
format lets you batch-author a mix of question types in one `.md` file and
have the script fill in and submit each NeoLMS question form automatically.

See also: `scripts/neolms-script-guide.md` (panel/UI conventions),
`quizes/cs370/finals/format.md` (the original scratch notes + saved NeoLMS
HTML samples the field names were taken from).

## Shape of a file

A file is a sequence of **blocks** separated by a line containing only `---`:

```
<block 1>

---

<block 2>

---

<block 3>
```

Each block becomes one NeoLMS question. Leading/trailing blank lines around
a block are ignored.

## Anatomy of a block

```
type: <mc|many|blank|freeform|tf>     (optional, defaults to mc)
points: <positive number>              (optional, defaults to 1)

<question text, one or more lines>

<answer lines>
```

- The `type:`/`points:` lines are **metadata**. If present, they **must** be
  followed by exactly one blank line before the question text starts — this
  is how the parser knows where metadata ends. There's no fallback
  auto-detection, so don't skip the blank line.
- If a block has no metadata lines at all, it's treated as `type: mc`,
  `points: 1`, and the whole block is the question + answers.
- `points` must be a positive number.
- The question text can span multiple lines (it becomes the NeoLMS
  "Description" field, newlines preserved).
- Answer lines are the first contiguous run of lines starting with `-` or
  `*` found after the question text; everything before them is the question.

## Answer line markers

- `-` = an incorrect option (or, for `blank`/`tf`, the single accepted
  answer line).
- `*` = a **correct** option. Required explicitly — there is no "first
  option is automatically correct" convention. Every correct answer must be
  marked with `*`.

## Question types

### `mc` — Multiple choice, one answer (default type)

```
What determines the output of a combinational circuit at any instant?

- The past state of the circuit
* The current input values
- The sequence of previous inputs
- The number of memory elements
```

- 2–12 options.
- Exactly **one** option marked `*`.
- Options can be in any order — the `*` marks which one NeoLMS will record
  as correct, order doesn't matter.

### `many` — Multiple choice, many answers

```
type: many

How does a combinational circuit respond to a given set of inputs?

* It always produces the same outputs for the same inputs
* It depends only on the present inputs
- It depends on its internal history
- It alternates between two results
```

- 2–12 options.
- At least **one** option marked `*` (more than one allowed).
- No syntax yet for custom per-option percentage weighting — NeoLMS's own
  default equal-weighting is used.

### `blank` — Fill in the blanks

```
type: blank

A BLANK circuit responds only to the current set of inputs, not past state.

- combinational, comb
```

- Write the literal word `BLANK` (all caps) in the question text once for
  each blank.
- One answer line per `BLANK`, in the same order they appear in the
  question. Each line is a comma-separated list of accepted alternatives for
  that blank (`combinational, comb` → either spelling is accepted).
- Answer lines must use `-` (not `*` — there's no "more/less correct" idea
  here).
- The number of answer lines must exactly match the number of `BLANK`
  occurrences.

### `freeform` — Free-text response

```
type: freeform
points: 5

Describe the microinstruction level of a processor in one sentence.
```

- No answer lines at all — just the question text (and optional `points:`).
- NeoLMS records no "correct answer" for this type by default; grading is
  manual.

### `tf` — True/False

```
type: tf

Combinational circuits respond to a set of inputs and previous states.

- false
```

- Exactly one answer line, marker `-`, text exactly `true` or `false`
  (case-insensitive).

## Validation

Before queuing anything, the whole pasted batch is validated up front. If
**any** block has an error, **nothing** is queued — fix the reported
block(s) and paste again. Things that are checked:

- Unknown `type:` value.
- Missing blank line between metadata and question text.
- Invalid/non-positive `points:`.
- Missing question text.
- Malformed answer line (doesn't start with `-`/`*`).
- `mc`: not exactly one `*`, or option count outside 2–12.
- `many`: zero `*` options, or option count outside 2–12.
- `blank`: no `BLANK` placeholder, answer-line count ≠ `BLANK` count, or a
  `*` used instead of `-`.
- `freeform`: any answer lines present (freeform takes none).
- `tf`: not exactly one answer line, a `*` instead of `-`, or the line isn't
  `true`/`false`.

## Using it with the script

1. Navigate to the "Add `<Type>`" question page for your **first** block's
   type (e.g. for a batch starting with a `tf` block, go to "Add True or
   false question"). The script can switch types automatically *between*
   questions in a batch, but it can't get you to the first page itself.
2. Paste the whole batch into the panel's textarea and click **Start**.
3. The script validates, fills each form, and submits in sequence,
   automatically navigating through NeoLMS's "Add questions" modal whenever
   consecutive blocks have different types.
4. Watch the log panel — any error (parse error or a page/field mismatch)
   halts the batch without losing your place; fix the issue and press Start
   again.

## Full example (one of each type)

```
What determines the output of a combinational circuit at any instant?

- The past state of the circuit
* The current input values
- The sequence of previous inputs
- The number of memory elements

---

type: many

How does a combinational circuit respond to a given set of inputs?

* It always produces the same outputs for the same inputs
* It depends only on the present inputs
- It depends on its internal history
- It alternates between two results

---

type: blank

A BLANK circuit responds only to the current set of inputs, not past state.

- combinational, comb

---

type: freeform
points: 5

Describe the microinstruction level of a processor in one sentence.

---

type: tf

Combinational circuits respond to a set of inputs and previous states.

- false
```
