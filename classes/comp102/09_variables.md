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

---
