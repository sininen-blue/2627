---
name: class-formatter
description: >
  Applies text-emphasis formatting (bold, italics, inline code) to the Slidev
  class/slide markdown files in this repo (classes/**/*.md), matching how those
  files are actually written. Determines when to use **bold**, *italic*, or
  `code` based on the conventions found across the existing class files.
  Use when user asks to add formatting, bold, italics, emphasis, or "make it look
  like the other class files".
---

# Class File Formatter Skill

Format text emphasis in this repo's class/slide files (`classes/**/*.md`) exactly the
way those files already do. These are Slidev slide decks, so the emphasis style here is
deliberately light — one deliberate emphasis per idea, never decoration.

## The Three Tools

Only three emphasis forms are used for prose. Choose based on weight:

| Form | Markdown | Used for | Example from repo |
|------|----------|----------|-------------------|
| **Bold** | `**word**` | Key terms, definitions, the single most important word/phrase in the sentence, emphatic contrast, section lead-in labels | `**built-in and indivisible**`, `**Rule of thumb:**`, `**design choice**` |
| *Italic* | `*word*` | Softer emphasis: a single word used *as a word*, qualifying words, casual term intro, placeholders | `*is* a primitive`, `*what shape of box*`, `*n/a*` in tables |
| `Code` | `` `word` `` | Anything literal from a program: identifiers, values, operators, exact strings | `score`, `==`, `False`, `"5" + 3` |

## Decision Guide

When deciding which to use, ask in this order:

1. **Is it literal program text?** → `` `code` ``. (e.g. `` `if (5)` won't even compile ``)
2. **Is it the strongest emphasis in the sentence — the key term or the point?** → `**bold**`.
3. **Is it light emphasis, or highlighting a word's role rather than its content?** → `*italic*`.
4. **Is it a literal token that is ALSO the key point?** → nest them: `` **`NAND`** ``, `` **`False`** ``.

## Style Rules

- **Sparsity first.** One deliberate emphasis per sentence max. Plain prose is the
  default; emphasis is the exception. Existing files use `**` roughly once per idea and
  `*` only for words that need drawing out.
- **Bold = labels and lead-ins.** Section labels and intro phrases take bold with a
  colon: `**Rule of thumb:**`, `**Why this happens:**`, `**Strategy:**`,
  `**Int vs. float** - whole apples vs. apple sauce.` List-item lead-ins bold the
  concept, then a dash: `- **Int vs. float** - whole apples vs. apple sauce.`
- **Italic for a word as a word.** Emphasize the word being discussed, not a whole
  phrase: `## What *is* a primitive?`, `Precedence tells you *what* goes first.`
- **Italic for qualifiers.** `*any* non-zero value`, `*some* soft body physics`,
  a property name in a list: `- *weight* (mass) — affects how much force is needed`.
- **Never both, never heavy.** Don't combine bold+italic in prose. Don't bold or italic
  entire sentences — use a blockquote for that.
- **Code is literal only.** Backticks are for tokens that appear in code, never for
  prose emphasis (`True`, `x`, `==`). If the emphasis is about meaning, use bold/italic
  instead.
- **In tables and headings.** Both work, but keep them minimal — in tables use `*n/a*`
  or `**truthy**` for emphasis within a cell; in headings use `*` for a single word.
- **Keep surrounding punctuation.** Arrows, em-dashes, and trailing spaces stay outside
  the markup: `` → **`False`** ``.

## Real Examples From This Repo

From `classes/comp102/10_primitives.md`:

```
A primitive is a value your language treats as **built-in and indivisible**
That's a **design choice**, not a missing feature.
| `[]` (empty array) | **truthy** | falsy | *n/a* |
- in C-family languages `=` is an *expression*
- it assigns the value **and** evaluates to it, so `if (x = 5)` runs the body for *any* non-zero value
You already know: **P**arens > **E**xponents > **M**ultiply/**D**ivide > **A**dd/**S**ubtract.
6. `True and False` → **`False`**
```

From `classes/comp102/09_variables.md`:

```
The **variable is the box**; the **value is the blob** inside it
Imagine a *box* and a *blob of stuff*.
> Human brains are fundamentally **pattern matching machines**
```

From `classes/gd373/05_softbody.md`:

```
Softbody physics are a method of simulating physics by using points and shapes that allow for *squishiness*
- *weight* (mass) — affects how much force is needed to move them
Trades some physical accuracy for **stability, performance, and control**
```

From `classes/cs370/09_digital_logic.md`:

```
These use **`NAND`** and **`NOR`** gate forms as they are considered *universal gates*
This is the computer's **real** hardware
```

## Pitfalls

| Pitfall | Fix |
|---------|-----|
| Bolding too many words per sentence | Keep one `**` per sentence; demote the rest to plain text |
| Using bold where the files use italic | Strong emphasis = bold; word-as-a-word/qualifier = italic |
| Putting prose in backticks | Backticks are for literal program tokens only |
| Emphasizing whole sentences | Use `>` blockquote instead (that's how these files call out key lines) |
| Emphasizing punctuation | Put `**`/`*`/`` ` `` around the word only, keep `:` `—` `→` outside |
