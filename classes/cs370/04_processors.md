---
title: 04 Processors
exportFilename: exports/cs370/04_processors
lineNumbers: true
---

# Processors

---
layout: two-cols-header
---

## Overview

::left::
A computer consists of many parts

Of these parts, the primary one is the **Processor**

This *executes* programs stored in main memory by
1. fetching the instructions
2. examining them
3. executing them one after another

::right::
<img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/2023_Intel_Core_i7_12700KF_%284%29.jpg" class="mx-auto rounded w-2/4">

---

## Parts

A processor has several parts

1. **Control Unit**, which *fetches and decodes* instructions
2. **Arithmetic Logic Unit**, which *does the instructions*
3. **Registers**, which *hold data*

<img src="./processor.png" class="mx-auto rounded w-2/5">

And a *bus*, which is a collection of wires for *moving data* both inside the processor, and outside the processor

---

## Registers

There are two important registers usually found in every von nuemann architecture computer

1. Program Counter (PC)

which points to the *next instruction* 

2. Instruction Register (IR)

which holds the *current instruction*

---
layout: two-cols-header
---

## Data path

::left::
At the heart of most computer systems is a **Data Path Cycle**, as defined by the Von Neumann architecture

- The registers *input* into ALU input registers, 
- which then *input into the ALU*, 
- and the ALU output registers feed back into the registers

The ALU performing some simple addition, subtraction, or logical operations

The register can then be saved into memory

This is called the **Data Path Cycle** which is often determines the speed of your cpu

::right::
<img src="./data_path.png" class="mx-auto rounded w-4/5">

---

## Instruction Execution Cycle

Roughly, the instruction execution cycle can be broken down into the following steps:

1. *Fetch* the instructions from memory into the instruction register
2. Change the program counter to point to the next instruction
3. *Determine* the type of instruction fetched
    1. If the instruction uses a word in memory, determine where it is
    2. Fetch the word, if needed, into a CPU register
4. *Execute* the instruction
5. Go to step 1 to begin executing the *next* instruction

This is frequently referred to as the **fetch-decode-execute cycle** and is how most computers work

---
layout: center
---

## Equivalency of software and hardware

Notice how it would be fairly simple to create a version of this cycle *purely in code*

The fact that it's possible to *imitate* the function of a CPU shows that a program *need not* be executed by a "*physical*" CPU

It can simply be carried out by having a **program** do the *fetch, examine, and execute* cycle

This program would be called an interpreter

---

## Equivalency of software and hardware

When a design team *creates a new machine language* $L$, 

They can then decide if they want to *write an interpreter* for it, or to *create a new hardware implementation* for it

---

## Benefits of a complex hardware implementation

Complex hardware instruction are simply **faster**

- floating-point arithmetic
- array accessing
- complex math
- instructions usually called consecutively

More complex instructions could also be *overlapped* and run in *parallel* easier

But high complexity hardware was *expensive*, but the speed was (usually) worth it

---

## The shift to interpreters

- instruction *compatibility* requirements, and
- the need for software developers to have those complex instructions on *lower end* machines

IBM realized that supporting a *single family* of machines which executed the same instructions had many advantages

IBM introduced the term **architecture** for this kind of compatibility

---

## The shift to interpreters

*Maurice Wilkes (1951)* first suggested interpretation as a way to get past hardware limits

Which led to the creation of the *IBM System/360*

This shift to interpretation also included  some *other* benefits:
1. the ability to *hotfix* issues on field 
2. the ability to *add new* instructions at a minimal cost, and 
3. easier development, testing, and documentation of complex instructions

By the late 70s, only the most expensive highest-performance models didn't use interpreters to handle their complex instructions

Microprocessors also moved to interpreter-based design

---

## RISC and CISC

During the late 70s, designers continued to experiment with complex instructions made possible by interpreters

Programmers and designers tend towards complexity and **powerful solutions**,
- this tendency was geared towards closing the *semantic gap* between the machine code and high-level languages

But in 1980, a group led by *David Patterson* and *Carlo Sequin* began designing VLSI chips that **didn't** use interpretation. 

They called this a *Reduced Instruction Set Computer* (RISC), and produced the RISC I followed by the RISC II

---

## RISC

These processors were designed to be *completely new* and **non-backwards compatible**, 

This allowed the designers to create instruction sets that would *maximize performance*.

With the emphasis of *simple instructions that could be executed quickly*

- if it takes a RISC machine *4–5 instructions* to do what a CISC machine can do in *1*, 
- the RISC machine is still 10–20 times faster

---

## RISC isn't mainstream

The **lack** of backward compatibility and existing **billions** companies have invested in existing software for *x86* means adoption of RISC wa slow 

Another factor is that modern *CISC* **does** use RISC ideas, usually having a *RISC core* with common instructions

Recently, with advancements of *APPLE* and *RISC* laptops, ARM (which is risc) is slowly gaining popularity

---

## Design principles of modern computers

Certain design decisions have slowly crystallized over the decades, 

Where every new advancement in computing technology usually *emphasize* the following:

1. All instructions are directly executed by hardware
2. Maximize instruction issue rate
3. Instructions should be easy to decode
4. Only loads and stores should reference memory
5. Have a lot of registers

