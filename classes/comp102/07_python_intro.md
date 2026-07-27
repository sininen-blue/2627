---
title: 07 Python Introduction
exportFilename: exports/comp102/07_python_intro
lineNumbers: true
---

# A *fairly* gentle introduction to python

---

# What is python

Python is a high level, interpreted, object oriented, general purpose programming language that emphasizes readability and developer ease of use

It also has a repl, and runs through a virtual machine

---

## "levels" in programming languages

A "level" in proramming language isn't a formal definition, depending on your field and the context

C could be high level, fortran could be high level, assembly could be high level

But genrally it means that a language is farther away from what a computer can do

remeber that a computer can only do very simple things

python can do *very* complex things very easily, not because it's not limited by the same limitaitons, but becuaes every singl python action is just a really really long series of simple actions

---

# It's interpreted

Not important right now, but it at this level, it means it's slower but offers nice to haves like no compiling and dynamic typing

---

# it has a repl

This one is important

a repl (read evaluate print loop) is a structure that allowsei

it allows you to type and test out code quicly and to debug certain things

```
breakpoint()
```

put a pin on this

---

# It's object oriented

Not important right now, but it means there's this thing called "objects" that we'll have to care about

---

# how it runs (and how code runs on your computer)

it runs through a virtual machine, not important right now but it's useful to know

a lot of programming languages are "compiled" which emans you get code, transform it into something the computer can understand, then you run that (exe)

python is not one of those programs, instead you run it, a different program runs, that programs reads your code, and spits out code that the computer can run (no exe)

---

# filenames and commands

does filename matter?

what is the shell

---

# Code jumpscare

```python
x = 0
y = 0

if left_arrow == "pressed":
    x = x + 1
    y = -20

if x > 20:
    x = -20

if x < -20:
    x = 20
```

---

# operations

```
+ - * /
```

```
!= == >= > < <=
```

```
% //
```

---

## Evaluation (and how data gets processed)


---

# output (and also functions)

```
print()
```

think of this as a box (function) with two holes, one on the left and one on the right

you put someting in the left whole

then you get osmething out of the right whole

---

# data types

What is the difference between e letter and a number (in real life)


if you think of operatiosn as boxes sometimes boxes have different shaped holes

---

# variables

scratch equivalence

main difference

box

```
name = value
x = 20
```

different types

main strength

you can use them for everything

---

# if statements

it's another box

```
if 5 == 20:
    print("correct")
else:
    print("incorrect")
```


---

# Code jumpscare


```python
x = 0
y = 0

if left_arrow == "pressed":
    x = x + 1
    y = -20

if x > 20:
    x = -20

if x < -20:
    x = 20
```
