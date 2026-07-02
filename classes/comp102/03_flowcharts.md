---
title: 03 Flowcharts
exportFilename: exports/comp102/03_flowcharts
lineNumbers: true
---

# Flowcharts
visual algorithms

---

## Action

Represented in *squares*

```mermaid
flowchart LR
    A[Start] --> B[Do Step 1]
    B --> C[Do Step 2]
    C --> D[Do Step 3]
    D --> E[End]
```

---
layout: center
---

# Remember the Robot Maze

---

## Decisions

Represented using *diamonds*

```mermaid
flowchart LR
    A[Start] --> B{Condition?}
    B -->|Yes| C[Path A]
    B -->|No| D[Path B]
    C --> E[Continue]
    D --> F[Don't Continue]
```

Almost *every single program* is simply a combination of *steps* and *decisions*

If you can find a problem, and break it down into a series of steps and decisions, then you can make a program for it

---

## Loops

Represented using a *combination* of decisions and steps, characterized by
- a visible *loop*
- a decision point for starting or stopping the loop

```mermaid
flowchart LR
    A[Start] --> B[Guess a number 1-10]
    B --> C{Correct?}
    C -->|No| B
    C -->|Yes| D[You win]
    D --> ...
```

---
layout: center
---

# Book recommendation flowchart

---
layout: center
---

# Morning routine flowchart
build a flowchart for your morning routine

---
layout: center
---

# Sorting algorithm flowchart
build a flowchart that sorts 10 jumbled numbers (0, 1, 2, ..., 9)

