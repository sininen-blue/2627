---
title: 10 Primitives
exportFilename: exports/comp102/10_primitives
lineNumbers: true
---

# Primitives, Precedence & Scalars

---
layout: center
---

# Primitives

---

## What *is* a primitive?

A primitive is a value your language treats as **built-in and indivisible** 

The language doesn't let you look inside it or ask it for methods on its own data
(in most languages).

The following code are some of the primitives defined in `Java`
```java
int age = 21;
double gpa = 3.7;
boolean isEnrolled = true;
char grade = 'A';
```

Contrast this with **objects/composites**

— a `String`, a `List`, a `struct` all bundle primitives together.

---

## Type systems

**Static vs. dynamic** - is type checked before running (compile time) or while running?

**Strong vs. weak** - does the language let types silently convert into each other?

Same expression, three outcomes:

```js
// JavaScript (dynamic, weak)
"5" + 3
```

```python
# Python (dynamic, strong)
"5" + 3
```

```java
// Java (static, strong)
int x = "5" + 3;
```

---

### Floating points

```js
0.1 + 0.2 === 0.3   
0.1 + 0.2           
```

Floats are a **finite binary approximation** of an infinite decimal space

*"Incorrect"* outputs of floating point operations are a bug, 

they are a rounding trade-off (IEEE 754). 

Some fractions just can't be represented *exactly* in binary, the same way 1/3 can't be represented exactly in decimal.

**Rule of thumb:** never compare floats with `==`. Compare with a tolerance:

```python
abs(x - 0.3) < 1e-9
```

---

## Boolean as a primitive - truthy/falsy varies!

| Value | JavaScript | Python | Java |
|---|---|---|---|
| `0` | falsy | falsy | *n/a - not a boolean* |
| `""` (empty string) | falsy | falsy | *n/a* |
| `[]` (empty array) | **truthy** | falsy | *n/a* |
| `null` / `None` | falsy | falsy | *n/a — NullPointerException risk* |
| `"0"` (string zero) | **truthy** | truthy | *n/a* |

Java refuses to play this game at all 

`if (5)` won't even compile.

That's a **design choice**, not a missing feature.

---

## Analogies

**Int vs. float** - whole apples vs. apple sauce.

- One is discrete and countable, the other is blended and approximate.

**A variable is a labeled shoebox.**

- The primitive type tells you *what shape of box* it is 
- an `int` box only fits whole numbers, 
- a `boolean` box only fits true/false.

---

## Common early mistakes

1. Assuming integers are infinite

Remember that computers are ones and zeroes, and computers have a limited amount of them

So an integer isn't infinite*, it's bound by how many 1s and 0s are assigned to them

*`Python` actually is infinite, since it automatically increases the amount of bits a number has

But a language like `c` will stop at $2147483647$ and loop back to $-2147483647$

---

## Common early mistakes

2. Assuming floats are *exact* -> `if (x == 0.3)` will never fire

> Try `0.1 + 0.2`

Binary can only represent fractions that are a sum of negative powers of two ($1/2$, $1/4$, $1/8$, ...) exactly. 

A "nice" decimal like $0.1$ doesn't terminate in binary ($0.1_{10} = 0.0001100110011..._2$), 

$1/3$ never terminates in decimal. IEEE 754 stores the closest 53-bit approximation (a `double`), so `==` against the expected "nice" value quietly fails.

---

## Common early mistakes

3. Confusing `=` (assignment) with `==` (comparison)

In c

```c
if (x = 5) { ... }   // assigns 5, then evaluates truthy — always runs!
```

**Why this happens:** 
- in C-family languages `=` is an *expression*  
- it assigns the value **and** evaluates to it, so `if (x = 5)` runs the body for *any* non-zero value and silently destroys the original `x`. 
- A comparison returns a boolean, an assignment returns the assigned value.

In Python the equivalent `=`-in-condition is a syntax error, not a silent bug:

```python
if x = 5:      # SyntaxError: invalid syntax
```

---
layout: center
---

# Precedence

---

## PEMDAS, extended

You already know: **P**arens > **E**xponents > **M**ultiply/**D**ivide > **A**dd/**S**ubtract.

Programming languages extend that ladder downward:

```
()                      highest
**  (exponent)
* / %
+ -
< > <= >= == !=
&&  (and)
||  (or)
=  +=  -=  ...          lowest
```

```python
2 + 3 * 4          # 14, not 20
2 + 3 == 5 and 1   # comparisons bind tighter than 'and'
```

---

## Associativity

Precedence tells you *what* goes first. 

Associativity tells you *which way* to read operators of the *same* precedence.

```python
2 ** 3 ** 2
# ** is right-associative: 2 ** (3 ** 2) = 2 ** 9 = 512
# NOT (2 ** 3) ** 2 = 64
```

```python
10 - 3 - 2
# - is left-associative: (10 - 3) - 2 = 5
```

--

## Precedence traps


```python
True or False and False 
```

More "what does this print?" 
```python
0 and 5
"a" or "b"
1 < 2 < 3
2 ** 3 ** 2
(not 0) and 1
```

---

## Just use parentheses

Knowing the rules matters, but you should know when to stop relying on them for readability:

```js
// Technically correct, precedence-perfect:
if (a && b || c && !d)

// Clearer for the next human who reads it:
if ((a && b) || (c && !d))
```

---

## Exercise 

```python
x = 5
y = 2
print(x + y * 2 > 8 and not y == 2)
```

<v-click>

**Trace:**
1. `y * 2` → `4`
2. `x + 4` → `9`
3. `9 > 8` → `True`
4. `y == 2` → `True`
5. `not True` → `False`
6. `True and False` → **`False`**

</v-click>

---
layout: center
---

# Scalars

---

## Scalar vs. composite

A **scalar** is a single atomic value - one number, one boolean, one character.

A **composite** (array, list, struct, object) bundles multiple values together.

```
scalar:    42
composite: [42, 7, 13]        ← an array of three scalars
composite: {name: "Ana", age: 21}  ← a struct/object of two scalars
```

Every primitive from the first section was a scalar. 

Not every scalar has to be a language *"primitive"* though

Some languages have scalar types that aren't primitives (e.g. a `Date` object treated as one logical value).

---

## Arrays are collections of scalars

```python
totals = [12, 45, 7]
totals[1]     # 45 — indexing INTO a composite gets you back to a scalar
```

We'll talk about these later but it's useful to know


---

## Exercise

1. Predict the output, then explain in one sentence *why*:

```python
print(2 + 3 * 2 ** 2)
```

2. True or false, and why: *"An array is a primitive type."*
3. Name one language where `"5" + 3` throws an error, and one where it doesn't.

