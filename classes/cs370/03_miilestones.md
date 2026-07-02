---
title: 03 Milestones
exportFilename: exports/cs370/03_milestones
lineNumbers: true
---

# Milestones in computer architecture

---
layout: center
---

# The Zeroth Generation - Mechanical computers

---

## Pascaline

*Blaise Pascal*, when he was 19 designed one of the first recorded instances of a *mechanical computer*

<img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Pascaline-CnAM_823-1-IMG_1506-black.jpg" class="mx-auto rounded w-2/4">

Pascals machine could only do basic *addition* and *subtraction* operations

[video](https://www.youtube.com/watch?v=CROrLQpN6dc)

---

## Stepped Reckoner

*Baron Gottfried Wilhelm von Leibniz* created the *stepped reckoner*

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Leibnitzrechenmaschine.jpg/1280px-Leibnitzrechenmaschine.jpg" class="mx-auto rounded w-2/4">

It was cable of adding, multiplying, subtracting, and dividing

---
layout: two-cols
---

## Difference Engine

*Charles Babbage* then created the *difference engine*

Similar to Pascal's machine, it could *only* add and subtract, 

However unlike Pascal's Pascaline, it was built to do a *simple algorithm* (finite differences using polynomials) 

It outputted using a *copper plate*

The main goal was for making mathematics tables

::right::
<img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Difference_engine_plate_1853.jpg" class="mx-auto rounded w-3/4">

---
layout: two-cols-header
---

## Analytical Engine

::left::
<img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Babbages_Analytical_Engine%2C_1834-1871._%289660574685%29.jpg" class="mx-auto rounded w-3/4 mt-4">

::right::
The difference engine worked, but it could only run *one algorithm*

Which is why he started designing and constructing the *analytical engine*

This had four components
1. The store
2. The mill
3. The input section
4. The output section

This was the first **general purpose** machine

---

## Analytical Engine

The analytical engine placed the *groundwork* for today's modern computing systems, from the components, to the concepts that it pioneered

Primarily, this was because it was a *general purpose* machine.
- fetching two numbers from the store
- placing them to the mill to be operated on
- having the result sent back into the store 

With different *programs* on the input cards allowing for different mathematical possiblities

---
layout: two-cols-header
---

## The first programmer

::left::
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg" class="mx-auto rounded w-2/4 mt-4">

::right::
*Augusta Ada Lovelace* is widely considered to be the first computer programmer

<img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Diagram_for_the_computation_of_Bernoulli_numbers.jpg" class="mx-auto rounded w-3/4">

Before the analytical engine was even built, she wrote programs that would be correct if the analytical engine actually run

---
layout: center
---

# The First Generation - Vacuum Tubes

---

## Enigma

During world war 2, the era of electronic computing was started

The primary driving force behind said growth was the *ENIGMA* code

Because of the amount of computation required to break the code, the British government created an electronic computer called *COLOSSUS*


<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Colossus.jpg/1920px-Colossus.jpg" class="mx-auto rounded w-2/4">

---

## COLOSSUS

The COLOSSUS was operation in *1943* but was kept *classified* for 30 years after the fact.

The computer was made using magnetic tapes, vacuum tubes, and the concept of logic and logic gates. However, of note is that the COLOSSUS **was not** a general purpose computer.

It was built to solve the ENIGMA code

The COLOSSUS, in combination with it's secrecy, it's nature, and it's competition, ultimately had *little* influence on modern computing as a whole 

---
layout: two-cols-header
---

## ENIAC (Electronic Numerical Integrator And Computer)

::left::
In 1943, Jahn Machley and J Presper Eckret created the ENIAC.

It
- had 18000 vacuum tubes
- had 1500 relays
- weighed 30 tons
- consumed 140 kilowatts of power

Architecturally it held *20* registers capable of holding *10-digit decimals*, and it was programmed by flipping 6000 switches and connecting hundreds of sockets

The machine was not finished until *1946* where the war it was built for was over

::right::

<img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Glen_Beck_and_Betty_Snyder_program_the_ENIAC_in_building_328_at_the_Ballistic_Research_Laboratory.jpg" class="mx-auto rounded w-3/4 mt-4">

---

## The other computers

The ENIAC had undoubtedly created an impact in computing, within the era, many other computers of a similar structure were created

- the EDSAC (1949)
- JOHNNIAC
- ILLIAC
- MANIAC
- WEIZAC

---
layout: two-cols-header
---

## John von Neumann

::left::
<img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/JohnvonNeumann-LosAlamos.gif" class="mx-auto rounded w-2/4 mt-4">


::right::
While all those computers were being created, *John Von Neumann* widely considered to be one of the smartest men in his generation became interested in computers

It was apparent to him that programming computers with switches and cables was *slow*, *tedious*, and *inflexible*.

Primarily, he figured out that

> the program itself could be represented in digital form in the computer's memory

He also saw the serial *decimal arithmetic* used by the ENIAC (which uses 10 vacuum tubes) could be replaced by *parallel binary arithmetic*

---
layout: two-cols-header
---

## The Von Neumann Architecture

::left::
<img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Von_Neumann_Architecture.svg" class="mx-auto rounded bg-white p-4 w-2/4 mt-2">

The design that von Neumann came up with, called the *von Neumann Architecture*, 

It contained the *Control Unit*, the *ALU*, *input and output*, and *memory*
::right::

<img src="https://upload.wikimedia.org/wikipedia/commons/2/22/EDSAC_%2819%29.jpg " class="mx-auto rounded w-3/4 mt-2">

This architecture was used first on the *EDSAC* one of the first stored program computers

---
layout: center
---

# The Second Generation - Transistors

---

## Transistors

In *1948* *John Bardeen*, *Walter Brattain*, *Willaim Schokley* invented the **transistor** (which they won the 1956 Nobel Prize in Physics for) 

And by the late 1950s, vacuum tube computers because obsolete

One of the first major computers created with this new technology was the *PDP-1* in 1961

It had `4096 18-bit words` of core memory, and could execute `200,000` instructions/sec

It also cost around `$120,000` and thus, the "*minicomputer*" industry was born

---

## Busses

on the *PDP-8* which was a 12-bit machine, a major innovation occured

A singular bus (*omnibus*) was created

<img src="./omnibus.png" class="mx-auto rounded w-1/3">

The bus (A collection of parallel wires to connect the components of a computer) was a major departure to previous *memory-centered* machines and has been adapted by nearly all computers every since

---
layout: center
---

# The Third Generation - Integrated Circuits

---

## Silicon Integrated Circuit

In *1958*, *Jack Kilby* and *Robert Noyce* (working independently) developed a system that allowed dozens of transistors to be put on a *single chip*

<img src="https://upload.wikimedia.org/wikipedia/en/4/42/Kilby_solid_circuit.jpg" class="mx-auto rounded w-1/4">

This made it possible to create computers that were *smaller*, *faster*, and *cheaper*

---
layout: two-cols-header
---

## System/360

::left::
In 1964, IBM was the leading computer company with two main machines the *7094 and the 1401*

They were **incompatible**, and many customers had both and did not like that fact

When IBM was looking to update their releases, they took a step which many computer manufacturers still do today

> they introduced a *single* product line, the **System/360**

It was the first *family* of machines with the same language, but with different sizes and power

::right::
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/IBM_2030_in_New_Haven.jpg/960px-IBM_2030_in_New_Haven.jpg" class="mx-auto rounded w-1/4 mt-4">

A company could *replace* their `360 model 30 with a model 75`

And programs  written on one, could *theoretically* run on another

The 360 also pioneered *multiprogramming*, what we would call *concurrency* today

---
layout: center
---

# The Fourth Generation - Very Large Scale Integration
The current era

---

## VLSI

We no have chips with tens of thousands, hundreds of thousands, and millions of transistors in a single chip

*smaller*, *faster*, *cheaper*

Cheap enough that the concept of *personal computers* started appearing

---

## Intel 8080 kit

<img src="https://newsroom.intel.com/wp-content/uploads/2024/12/newsroom-8080-hugin-150-cash-register.jpg" class="mx-auto rounded w-2/5 mt-4">

The first personal computers were sold as **kits** with
- the circuit board,
- chips
- power supply,
- and a floppy disk

Software was *not supplied* (including operating systems)

---

## Apple

The *Apple II*, by Steve Jobs and Steve Wozniak became one of the most popular home user/school computer ever made at that point

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Apple_II-IMG_7064.jpg/1920px-Apple_II-IMG_7064.jpg" class="mx-auto rounded w-1/4 mt-4">

It was also one of the first computers made that was **fully built**

It was also aggressively marketed to schools and offered large discounts

---

## The start of the modern day desktop

IBM created one of the most popular computers of that time, the *IBM Personal Computer* based on the *Intel 8088*



They **also** made the design of the machines available for 49$, with the hopes of other companies making *plug in* boards

This started the **industry** of computers

Other companies made PCs using non intel chips, but they (mostly) *did not survive* (Commodore, Apple, Atari)

<img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Bundesarchiv_B_145_Bild-F077948-0006%2C_Jugend-Computerschule_mit_IBM-PC.jpg" class="mx-auto rounded w-1/4 mt-4">

---

## MS-DOS

Early IBM PCs also came equipped with *MS-DOS*

<img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Ms-dosdir.png" class="mx-auto rounded w-1/4 mt-4">

- `OS/2` was then created by Microsoft *and* IBM as a successor to MS-DOS
- Microsoft also made *Windows* just in case OS/2 failed
- OS/2 **failed**
- Intel and Microsoft dethroned IBM as the **richest and most powerful corporations**


---

## 80386

The first 32-bit CPU built by Intel because of their success, called the `80386`

Which was then followed up by `80486`

Subsequent versions were named *Pentium* and *Core*

And the architecture they were built on top off is **x86**

<img src="https://upload.wikimedia.org/wikipedia/commons/0/04/KL_Intel_i386DX.jpg" class="mx-auto rounded w-1/4 mt-4">

---

RISC

---

64 bit

---

Dual core

---
