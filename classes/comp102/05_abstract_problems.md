---
title: 05 abstract problems
exportFilename: exports/comp102/05_abstract_problems
lineNumbers: true
---

# Abstract problem solving and discrete math preview

---

## What do I mean by abstract problem solving

So far most of the problems we've solved were very visual in nature, or were gamified in nature

Most problems you'll solve in programming is more *logical* and so the ability to

> solve problems with pure logic and values

become important

---

## What is discrete math

Discrete math is a subject you may (or may not) have later on, but in essence it's a branch of math that

> Studies distinct *structures* with a focus on logic, proofs, sets, and combinatorics

I'll be introducing some of these concepts early, to help us get a better grasp of logical thinking

---

## Propositions and connectives

- Paris is the capital of the Philippines
- Ten is greater than seven
- Every even number is the sum of two prime numbers

A **proposition** is simply a *statement* that is either *true* or *false*

note that you don't have to *know* if it's true or false, only that it's answerable by true or false

What is the **truth-value** of the first proposition

---

## Propositions

- Where are you going?
- Close the door
- This statement is false

These are examples of statements that **are not propositions**

<div class="flex flex-col gap-4">
<v-click>
Note that the third statement can be answered by true or false, but
</v-click>

<v-click>
The third statement is considered a paradox, which means we cannot give it a *truth-value* so we ignore it in discrete math
</v-click>
</div>

---

## Propositions

- Jon is tall
- Chocolate is delicious
- x > 10

<v-click>
These are also <strong>not propositions</strong>
</v-click>


---

## Connectives

There are things you can connect to a proposition called *connectives*
1. negation $\neg$
2. and $\land$
3. or $\lor$
4. if-then (implies) $\implies$
5. if-and-only-if (equivalent) $\iff$

There are other forms of these symbols, and other names, but they are logically the same

---

## Exercise

Using the proposition

> p = "Today is Monday" and q = "It is raining"

Write the following logical expressions in words

1. $\neg q$ = It is **not** raining
2. $p \land q$
3. $\neg p \land q$
4. $p \lor q$
5. $p \lor \neg q$
6. $p \implies q$ = **if** today is monday **then** it is raining
7. $\neg p \implies q$
8. $p \iff q$
9. $\neg p \iff q$
