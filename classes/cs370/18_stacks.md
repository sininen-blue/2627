---
title: 18 Stacks
exportFilename: exports/cs370/18_stacks
lineNumbers: true
---

# Stacks

---

## Stacks

The concept of **procedures** (methods or functions) is a universal feature in programming languages.

These procedures have *local variables* that you can't access outside the procedure.

So the question is:

> "Where should these variables be kept in memory?"

The easiest solution is giving each variable a *fixed*, *absolute memory address* 

This won't work, because of **recursion** 

> a procedure can call itself, and each active call needs its *own* independent copy of its local variables. A single fixed address per variable could only ever hold one call's worth of data at a time.

---

## Why absolute addresses fail

> Imagine `factorial(n)` calls `factorial(n-1)`, which calls `factorial(n-2)`, and so on.

If the local variable `n` always lived at the same *absolute* address, 

Then every nested call would overwrite the `n` belonging to the call above it. 

By the time the recursion unwinds back up, all the outer calls would see the wrong (overwritten) value of `n`.

Each *invocation* of a procedure needs its own private storage for its local variables, and that storage must be created when the call begins and destroyed when the call returns.

---

## Table example

| Call | Action | Address of `n` | Value written | Value `factorial` *should* see |
| --- | --- | --- | --- | --- |
| `factorial(3)` | called | `200` | `3` | `3` |
| `factorial(2)` | called | `200` | `2` (overwrites `3`) | `2` |
| `factorial(1)` | called | `200` | `1` (overwrites `2`) | `1` |
| `factorial(1)` | returns | `200` | still `1` | `1` (correct, by luck) |
| `factorial(2)` | resumes, reads `n` | `200` | `1` | should be `2`, **but reads `1`** |
| `factorial(3)` | resumes, reads `n` | `200` | `1` | should be `3`, **but reads `1`** |

Every nested call overwrites the same address, so once the recursion starts unwinding, the outer calls can no longer recover their own value of `n` 

---

## Stacks

So instead, an area of memory called the **stack** is used to store local variables.

It's reserved for variables, but individual variables do **not** get absolute addresses in it. 

Instead, they are accessed through registers like the **Stack Pointer (SP)**.

This means that when a procedure calls itself (or is called by another procedure) or returns, the new local variables get stored in different locations on the stack, and you access them **relative** to the *SP*, rather than through a fixed absolute address.

---

## Stacks

Say we have a program like:

```python
def func_a():
    ...
    func_b()
    func_d()

def func_b():
    ...
    func_c()
```

````md magic-move
```bash
SP ->   a3 108 |
        a2 104 |
LV ->   a1 100 |
```
```bash
SP ->   b4 124 |
        b3 120 |
        b2 116 |
LV ->   b1 112 | # remember this address
        a3 108
        a2 104
        a1 100
```
```bash
SP ->   c2 132 |
LV ->   c1 128 |
        b4 124
        b3 120
        b2 116
        b1 112
        a3 108
        a2 104
        a1 100
```
```bash
SP ->   b4 124 |
        b3 120 |
        b2 116 |
LV ->   b1 112 |
        a3 108
        a2 104
        a1 100
```
```bash
SP ->   a3 108 |
        a2 104 |
LV ->   a1 100 |
```
```bash
SP ->   d5 128 |
        d4 124 |
        d3 120 |
        d2 116 |
LV ->   d1 112 |
        a3 108
        a2 104
        a1 100
```
````

---

## Operand stacks

Some, but not all, computers use another stack called the **operand stack** to hold temporary values for calculations.

Imagine the code:

```c
a1 = a2 + a3;
```

One way of doing this is to push the operands onto the stack, then execute the calculation, and finally pop the result off the stack into the variable `a1`.

````md magic-move
```bash
SP ->   a3
        a2
LV ->   a1
```
```bash
SP ->  |a2|
        a3
        a2
LV ->   a1
```
```bash
SP ->  |a3|
       |a2|
        a3
        a2
LV ->   a1
```
```bash
SP ->  |a2+a3|
        a3
        a2
LV ->   a1
```
```bash
SP ->   a3
        a2
LV ->   a2+a3
```
````

An interesting thing about the operand stack is that it can be **mixed** with the local variable stack, so data in the stack can be used in calculations with data on the operand stack.

Worth noting again that not all systems use an operand stack, but the JVM and IJVM do.

---

## Why bother with an operand stack?

An operand stack avoids the need for extra "scratch" registers to hold intermediate results during an arithmetic computation.

> Computing `a1 = (a2 + a3) * a4` without an operand stack would require somewhere to temporarily hold `a2 + a3` before multiplying by `a4`. With an operand stack, that intermediate value is simply the top of the stack after the `ADD`, ready to be consumed by the next `MUL`.

This design is common in **stack machines** (of which the JVM/IJVM is one)

Instead of instructions naming source and destination registers explicitly (like `ADD R1, R2, R3` in a register machine), 

instructions like `IADD` implicitly operate on whatever is currently on top of the operand stack. This tends to make instruction encodings smaller, at the cost of needing more instructions to push/pop values.

---
layout: center
---

# The IJVM Memory Model

---

## The IJVM Memory Model

The IJVM has an array of `4,294,967,296` bytes of memory ($2^{ 32 }$), or 

equivalently an array of `1,073,741,824` words ($2^{ 30 }$), since each word is 4 bytes.

And unlike most ISAs, the JVM makes *no absolute memory addresses* directly visible to the programmer, the only way to access memory is through registers and **increments** of those registers.

These registers are:
1. **the constant pool** (`CPP`): it can't be written to, and contains constants used by the program
2. **the local variable pointer** (`LV`): points to the base of the current procedure's local variables in the stack
3. **the operand stack pointer** (`SP`): points to the top of the operand stack, directly above the `LV` frame
4. **the method area** (`PC`): holds the program itself, and contains the address of the *next instruction*

---

## Why hide absolute addresses?

> Hiding absolute addresses is a deliberate portability and safety decision.

Because IJVM programs can only ever refer to memory *relative* to `CPP`, `LV`, `SP`, and `PC`, the same compiled program can run correctly **regardless of where its data actually happens to sit** in physical memory. 

This also prevents a program from accidentally (or intentionally) reaching into memory that doesn't belong to it, since there is no way to express an arbitrary absolute address in the first place.

This is in contrast to older, simpler architectures where a compiler might bake in a *fixed absolute address* for a variable 

Which, as discussed earlier with recursion, breaks down once multiple simultaneous invocations of the same procedure need separate storage.

---

## The IJVM Memory Model

<img class="mx-auto rounded w-3/4" src="./ijvm_memory_model.png" alt="IJVM Memory Model">

Note that all these pointers are pointers to **words**, not bytes, and are offset by the number of words.

For example, `LV`, `LV + 1` and `LV + 2` point to the first, second and third local variable of the current procedure respectively.

But `PC` (Method Area) is an exception, since it points to **bytes** in the method area, and incrementing it results in a fetch of the next byte.
