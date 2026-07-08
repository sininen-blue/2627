---
title: 04 Scratch
exportFilename: exports/comp102/04_scratch
lineNumbers: true
---

# Blocks

---

## Progression of complexity

Programming *can* be quite complex, in order to traverse that complexity and only care about the concepts one at a time

```mermaid
graph LR
    A["Paragraph/discussions<br/>Logical deductions"] --> B["Flowcharts<br/>Visual medium with constraints"]
    B --> C["Blocks<br/>Structure of code with strict limits"]
    C --> D["Pseudocode<br/>Closer to code without restrictions"]
```

---

## Blocks and Scratch

When talking about blocks, the primary tool being used is

[scratch](https://scratch.mit.edu/)

A little bit of history:
- scratch is a block based programming language and website created in *2003*
- It was made by the `MIT Media Lab` for the purposes of education

Today it's a popular game engine, especially for beginner programmers

[demo](https://scratch.mit.edu/users/ZonxScratch/)

[other demo](https://scratch.mit.edu/studios/33764016/)

---

## Scratch Interface

<img src="./scratch-interface.png" class="mx-auto mt-4 p-4 bg-white rounded w-3/4">

---
layout: center
---

## Fundamental Concepts in Scratch

---

## Code Blocks

There are 9 different block **categories** with different *colors*

of note is the *start block*

`when [flag] clicked` which is used at the top of a programming **stack**

To create a program, drag blocks from the *palette* to the *blank space*, and *interlock* blocks together

---
layout: center
---

# First program

https://scratch-tutorial.readthedocs.io/fr/latest/1_intro/intro.html#your-first-program

---

## Sprites

Sprites are *objects* in the game, these objects have *properties*

In particular, a *direction*, an *x* and a *y* position

<img src="https://scratch-tutorial.readthedocs.io/fr/latest/_images/cat.png" class="mx-auto rounded w-1/10">

<img src="https://i.imgur.com/Ye8iTI4.png" class="mx-auto rounded w-1/3 mt-4">


---

## Moving the sprite

1. Select the *events* category
2. Drag the "when [flag] clicked"
3. select the *motion* category
4. Drag the *move 10 steps* block to the cavnas and attach it

<img src="https://scratch-tutorial.readthedocs.io/fr/latest/_images/intro1.png" class="mx-auto rounded mt-4">

<img src="https://i.imgur.com/18wPZtz.png" class="mx-auto rounded w-1/4 mt-4">

---

## Interacting with the sprite

1. In the control category, drag the *when space key pressed* block to the board
2. In the motion category, add a motion below the press 

<img src="https://i.imgur.com/Q1Cq3XX.png" class="mx-auto rounded w-1/4 mt-4">

Challenge number 1

> Make a game where if I press left and right, I move left or right

---

## Other ways of moving

1. Add another if key pressed block
2. In the motion category, select the *change x by* block

<img src="https://i.imgur.com/CGCf5TD.png" class="mx-auto rounded w-1/5 mt-4">

1. Add another if key pressed block
2. In the motion category, select the *set x to* block

<img src="https://i.imgur.com/1z7rn8G.png" class="mx-auto rounded w-1/5 mt-4">

---

## Costumes in scratch

Every *sprite* can have multiple *costumes*

Otherwise known as *frames*

<img src="https://i.imgur.com/h4mD64e.png" class="mx-auto rounded w-1/3 mt-4">

given that in the **looks** category, there's a *next costume* block, make your sprite "*walk*", whenever it moves

---

## Challenge number 1


<img src="https://i.imgur.com/SNFDL12.png" class="mx-auto rounded w-1/3 mt-4">

Given these blocks, make the cat

1. move when you start the game (with the flag)
2. bounce on the edge of the screen
3. have a walk animation
4. have a `0.2` second delay

> Note, set the inital direction of the sprite to not be 90 degrees
