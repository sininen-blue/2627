---
title: 09 Python Introduction
exportFilename: exports/comp102/07_python_intro
lineNumbers: true
---

# Variables
boxes boxes boxes boxes

---

## Variables

```python
name = "Neil Arthur Alaan"
print(name)
```

Variables are a fundamental part of programming, having a weak understanding of variables will likely lead to difficulties in programming

---
layout: center
---

# Models, blackboxing, and ways to think

---

## Models

Using analogies, models, and pre-existing patterns to think about new ideas is a core strategy in learning

> Human brains are fundamentally **pattern matching machines**

And so having a clear model, a way of understanding, is a requirement to learning not just variables but programming as a whole

---

## The box model for variables and data

Imagine shape blobs and boxes

When you write

```
name = 20
```

You are **making a box**, putting a **label** on that box, and then **putting something** in that box

And when you write

```
5 < name
```

You are simply **finding** the box with the **label** *name*, and replacing the *name* with the **value**

```
5 < 20
```

---

## You don't have to use the box model

1. Sticky notes and values
2. Dry earse whitboard spot
3. Movie character/acting role

It doesn't matter what you use, as long as you use it consistently and build up on top of that

---

## Breaking the model

There will come a time where your analogy falls apart

> You cannot put multiple items in a variable, but you can put multiple items in a box

Part of learning is slowly refining your model, whenever it breaks, until it becomes closer and closer to how the real thing ufnctions 

This is an uncomfortable process, trying to understand something that will not compute in your own way of thinking

but pushing through that, and refining your own models, is what leads to actual mastery

---
layout: center
---

# Patterns and scaffolds

---

## Common variable patterns

To more easily understand how variables work, we'll discussing some of the more common patterns that show up 

WHere they're usually used, how they usually work, etc

---

## Configuration bundle

Think of a game with a player that has
- `speed`
- `jumpForce`
- `mass`

By setting these variables at the very top of your script, it makes tweaking these values significantly easier since you don't have to find it

```
speed = 400
jumpForce = 600
mass = 5


velocity.y += gravity * mass

if input == "left arrow":
    velocity.x = -speed

if input == "right arrow":
    velocity.x = speed

if input == "jump":
    velocity.y += jumpForce
```

---

## Counters

Another thing that variables are used for are for **counting** things

Every time the player touches a coin, the score should *go up* by `1`

We need
1. A place to *store* the count
2. A *starting* value
3. Something that *triggers* the increase
4. the *change* itself

---

## Counters (cont)

```
score = 0

if player touches coin:
    score = score + 1
```

| Step | Event | `score` value |
|------|-------|:---:|
| Start | Game starts | 0 |
| 1 | Touch coin 1 | 1 |
| 2 | Touch coin 2 | 2 |
| 3 | Touch coin 3 | 3 |
| ... | ... | ... |

---

## Countdown (timer)

The opposite of counting up is counting down

Essentially the same as counting up, but just goes down instead

And we **stop** when we hit a target value

```
timeLeft = 30

while gameRunning == True:
    timeLeft -= 1
    sleep(1)
```

| Step | Action | `timer` value |
|------|--------|:---:|
| Start | Initialize | 30 |
| 1 | Wait 1 sec, change by -1 | 29 |
| 2 | Wait 1 sec, change by -1 | 28 |
| ... | ... | ... |
| 30 | Wait 1 sec, change by -1 | **0 → stop** |

---

## Flags

Often we need a variable that stores the *current state* of something

either in the form of discrete states
- `state = "playing"`, 
- `state = "paused"`, 
- `state = "game over"`, 
- `state = "menu"`

or checks
- `is_paused = false`
- `is_playing = true`

---

## Flags (cont)

```python
state = "playing"

while state == "playing":
    # play the game
    if player presses "pause":
        state = "paused"
```

or 

```python
is_playing = true
is_paused = false

while is_playing:
    # play the game
    if player presses "pause":
        is_playing = false
        is_paused = true
```

---

## Flags (cont)

A flag variable doesn't count, it **switches** between values:

```text
gameState:  menu  →  playing  →  game over
                ↑           ↓
                └─ paused ──┘
```

The variable acts as a **traffic light**

This replaces a tangled mess of `if` blocks with a single variable that controls the flow.

Or a collection of descriptive variables that have clearly defined limits 

---

## Max trackers

How do you remember the highest score

Exactly the same way as setting the score (counting), but with an added check

---

## Swaps

As an open challenge, figure out a way to switch

```python
x = 10
y = 50
```

Without using the values themselves

The goal output is 

```python
x = 50
y = 10
```

