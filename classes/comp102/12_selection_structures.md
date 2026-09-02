---
title: 12 Selection Structures
exportFilename: exports/comp102/12_selection
lineNumbers: true
---

# Selection Structures
if statements mostly

---

## Selection structures

Almost every puzzle can be solved with a set of `if` statements

```
  vvvv
██    ██████████████████████████
██    ██                      ██
██    ████████    ██████████████
██                            ██
████████    ████████    ██    ██
██          ██          ██    ██
██    ████████    ██████████████
██          ██                ██
██    ██    ██    ████████    ██
██    ██    ██          ██    ██
██████████████████████████    ██
                          vvvv
```

---

## If Statements

```python
x = int(input("Please enter an integer: "))

if x < 0:
    x = 0
    print('Negative changed to zero')
elif x == 0:
    print('Zero')
elif x == 1:
    print('Single')
else:
    print('More')
```

There can be **zero or more** elif statements, and **zero or one** else statements

---

## If Statements

```
<if> <condition> <colon>
<tab> <body>
<tab> <body>
<elif*> <condition> <colon>
<tab> <body>
<tab> <body>
<else> <colon>
<tab> <body>
```

---

## Nested decisions

An `if` statement can contain another `if` statement inside its body — this lets you check a second condition, but only once the first one is true

```
<if> <condition_1> <colon>
<tab> <if> <condition_2> <colon>
<tab> <tab> <body>
<tab> <tab> <body>
<tab> <else> <colon>
<tab> <tab> <body>
<else> <colon>
<tab> <body>
```

Each level of nesting adds another `<tab>` of indentation

---

## Nested decisions

```python
age = int(input("Enter your age: "))
has_ticket = input("Do you have a ticket? (y/n): ") == "y"

if age >= 18:
    if has_ticket:
        print("Welcome in!")
    else:
        print("You need a ticket")
else:
    print("Sorry, you must be 18 or older")
```

The inner `if`/`else` only runs when `age >= 18` is true

---

## Nested vs. combined conditions

These two are equivalent, nesting can often be flattened with `and`

```python
# nested
if age >= 18:
    if has_ticket:
        print("Welcome in!")
```

```python
# combined
if age >= 18 and has_ticket:
    print("Welcome in!")
```

Use nesting when the inner check only makes sense **after** the outer one, especially if each branch needs different follow-up logic

---

## Practice problem

Given a square's `(row, col)` on the chessboard below, determine if it's light or dark:

```
⬜⬛⬜⬛⬜⬛⬜⬛
⬛⬜⬛⬜⬛⬜⬛⬜
⬜⬛⬜⬛⬜⬛⬜⬛
⬛⬜⬛⬜⬛⬜⬛⬜
⬜⬛⬜⬛⬜⬛⬜⬛
⬛⬜⬛⬜⬛⬜⬛⬜
⬜⬛⬜⬛⬜⬛⬜⬛
⬛⬜⬛⬜⬛⬜⬛⬜
```

---

## Practice problem

Given the tic-tac-toe board below, has anyone won?

```
X | O | X
---------
O | X | O
---------
X | . | .
```

---

## Practice problem

The player `*` is trying to move right. Will they hit the wall `#`?

```
. . . . .
. # # . .
. . * . .
. . . . .
```

---

## Practice problem

A user enters a number. Print whether it's even or odd.

---

## Practice problem

Given three numbers, print the largest one.

---

## Practice problem

Given a year, determine if it's a leap year.

---

## Practice problem

Given three side lengths, determine if they form a valid triangle. (The sum of any two sides must be greater than the third.)

---

## Practice problem

Given a password, check if it's "strong": at least 8 characters, contains a digit, and contains a symbol.

---

## Practice problem (nested)

A user enters an age and whether they have a ticket. Only check for a ticket if they're old enough (18+); otherwise refuse entry right away.

---

## Practice problem (nested)

Given a number, print "positive and even", "positive and odd", or "not positive", only check even/odd once you know it's positive.

---

## Practice problem (nested)

Given a username and password, log the user in only if the username exists **and** the password matches. Print a different message for "unknown username" vs. "wrong password".

---

## Practice problem (nested)

Given a temperature and whether it's raining, decide what to wear: only worry about a raincoat if it's cold **and** raining.
