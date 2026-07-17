---
title: 06 variables
exportFilename: exports/comp102/06_variables
lineNumbers: true
---

# Variables

---

## Variables

A core of programming

Variables hold *variable* value

In the context of *Computer Science* variables are a **name** with an associated **value**

---

## 7 patterns with variables

We'll look at 7 common ways to use variables in Scratch

Each shows how variables hold values and change them over time

---

## Pattern 1: Counter (Score)

**The problem:** How would you count how many coins a player collects?

Every time the player touches a coin, the score goes up by 1.

We need:
1. A place to store the count → a *variable*
2. A starting value → *0*
3. Something that triggers the increase → *touching a coin*
4. The change itself → *+1*

---

## Pattern 1: Counter (Score) — Blocks

<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0;font-family:'Courier New',monospace;font-size:15px;">

<div style="background:#FFBF00;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">flag</span> clicked
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:22px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">score</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">0</span>
</div>

<br>

<div style="background:#59C059;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">touching coin</span>
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:22px;">
  change <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">score</span> by <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">1</span>
</div>

</div>

Two separate stacks: one to initialize, one to respond to an event.

---

## Pattern 1: Counter (Score) — Variable in motion

| Step | Event | `score` value |
|------|-------|:---:|
| Start | Game starts | 0 |
| 1 | Touch coin 1 | 1 |
| 2 | Touch coin 2 | 2 |
| 3 | Touch coin 3 | 3 |
| ... | ... | ... |

Each event → value goes up by exactly 1.

The variable **remembers** the total so far between events.

---

## Pattern 1: Counter (Score) — Challenge

> Add a score counter to your project. Every time the player collects an item, the score increases by 1. Show the score on the screen.

**Stretch:** Make different items worth different amounts.

---

## Pattern 2: Accumulator (Running Total)

**The problem:** What if coins are worth different amounts?

A gold coin is worth 5, a silver coin is worth 2, a bronze coin is worth 1.

The score should reflect the *total value*, not just the count.

> How is this different from a simple counter?

<v-click>

The shape is the same — but the amount added **varies** depending on the item.

</v-click>

---

## Pattern 2: Accumulator (Running Total) — Blocks

<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0;font-family:'Courier New',monospace;font-size:15px;">

<div style="background:#FFBF00;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">flag</span> clicked
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:22px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">totalGold</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">0</span>
</div>

<br>

<div style="background:#59C059;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">touching gold</span>
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:22px;">
  change <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">totalGold</span> by <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">5</span>
</div>

<br>

<div style="background:#59C059;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">touching bronze</span>
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:22px;">
  change <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">totalGold</span> by <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">1</span>
</div>

</div>

Same variable, different change amounts depending on the trigger.

---

## Pattern 2: Accumulator (Running Total) — Variable in motion

| Step | Event | `totalGold` value |
|------|-------|:---:|
| Start | Game starts | 0 |
| 1 | Collect bronze (+1) | 1 |
| 2 | Collect gold (+5) | 6 |
| 3 | Collect silver (+2) | 8 |
| 4 | Collect gold (+5) | 13 |

The variable **accumulates** — it adds whatever amount each item is worth.

The pattern is: **initialize → add varying amount → repeat**

---

## Pattern 2: Accumulator (Running Total) — Challenge

> Give different objects different point values. Track the total score using a variable. Display a message when the player reaches 100 points.

---

## Pattern 3: Countdown (Timer)

**The problem:** How do you make a timer that counts down from 30?

When the timer reaches 0, the game ends.

> How is this different from counting up?

<v-click>

The change is **negative** instead of positive, and you **stop** when you reach a target value.

</v-click>

---

## Pattern 3: Countdown (Timer) — Blocks

<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0;font-family:'Courier New',monospace;font-size:15px;">

<div style="background:#FFBF00;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">flag</span> clicked
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:22px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">timer</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">30</span>
</div>

<div style="background:#FFAB19;color:white;padding:7px 18px;border-radius:16px 3px 3px 3px;margin-left:22px;">
  repeat until <span style="background:white;color:black;padding:1px 7px;border-radius:4px;clip-path:polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);">timer = 0</span>
</div>

<div style="background:#4C97FF;color:white;padding:7px 18px;margin-left:44px;">
  wait <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">1</span> seconds
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:44px;">
  change <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">timer</span> by <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">-1</span>
</div>

<div style="background:#FFAB19;color:white;padding:7px 18px;border-radius:3px 3px 3px 16px;margin-left:22px;">
</div>

</div>

Three important new ideas: **negative change**, **loop**, and **stop condition**.

---

## Pattern 3: Countdown (Timer) — Variable in motion

| Step | Action | `timer` value |
|------|--------|:---:|
| Start | Initialize | 30 |
| 1 | Wait 1 sec, change by -1 | 29 |
| 2 | Wait 1 sec, change by -1 | 28 |
| ... | ... | ... |
| 30 | Wait 1 sec, change by -1 | **0 → stop** |

The variable **drives the loop** — the loop checks the value each time and stops when it hits 0.

---

## Pattern 3: Countdown (Timer) — Challenge

> Add a 15-second timer to your game. When it reaches 0, show "Game Over" and stop all.

**Stretch:** Show the timer on screen and make it flash red when under 5 seconds.

---

## Pattern 4: Flag (State Variable)

**The problem:** How does the game know whether it's playing, paused, or over?

You need a variable that stores the **current state** of the game.

> Think: what are all the different "modes" your game can be in?

<v-click>

Common states: `"playing"`, `"paused"`, `"game over"`, `"menu"`

</v-click>

---

## Pattern 4: Flag (State Variable) — Blocks

<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0;font-family:'Courier New',monospace;font-size:15px;">

<div style="background:#FFBF00;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">flag</span> clicked
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:22px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">gameState</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">playing</span>
</div>

<br>

<div style="background:#FFAB19;color:white;padding:7px 18px;border-radius:16px 3px 3px 3px;">
  forever
</div>

<div style="background:#FFAB19;border:3px solid #FFAB19;border-radius:3px;padding:7px 18px;margin-left:22px;color:black;">

  <div style="background:#5CB1D6;color:white;padding:5px 12px;display:inline-block;border-radius:12px 3px 3px 3px;">
    if <span style="background:white;color:black;padding:1px 6px;border-radius:4px;clip-path:polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);">gameState = playing</span> then
  </div>

  <div style="margin-left:22px;margin-top:4px;">
    ... move sprites, check collisions ...
  </div>

  <div style="background:#5CB1D6;color:white;padding:5px 12px;display:inline-block;border-radius:3px;margin-top:4px;">
    if <span style="background:white;color:black;padding:1px 6px;border-radius:4px;clip-path:polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);">gameState = game over</span> then
  </div>

  <div style="margin-left:22px;">
    ... show game over screen ...
  </div>

</div>

</div>

---

## Pattern 4: Flag (State Variable) — Variable in motion

A flag variable doesn't count — it **switches** between values:

```
gameState:  menu  →  playing  →  game over
                 ↑         ↓
                 └─── paused ─┘
```

The variable acts as a **traffic light** — code checks it before deciding what to do.

**Key insight:** This replaces a tangled mess of `if` blocks with a single variable that controls the flow.

---

## Pattern 4: Flag (State Variable) — Challenge

> Add a state variable to your game. Use it to control at least two different modes: "playing" and "game over". Show different content on screen for each state.

**Stretch:** Add a "paused" state triggered by pressing the space bar.

---

## Pattern 5: Swap (Temp Variable)

**The problem:** You have two variables `A` and `B`. How do you swap their values?

```
A = 5, B = 10  →  A = 10, B = 5
```

> Try it: if you do `set A to B`, you lose A's original value.

<v-click>

You need a **third temporary variable** to hold one value while you move the other.

</v-click>

---

## Pattern 5: Swap (Temp Variable) — Blocks

<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0;font-family:'Courier New',monospace;font-size:15px;">

<div style="background:#FF8C1A;color:white;padding:7px 18px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">temp</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">A</span>
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">A</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">B</span>
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">B</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">temp</span>
</div>

</div>

Three lines, one temporary variable.

---

## Pattern 5: Swap (Temp Variable) — Variable in motion

Let's track all three variables through the swap:

| Step | Code | `A` | `B` | `temp` |
|------|------|:---:|:---:|:---:|
| Start | — | 5 | 10 | ? |
| 1 | `temp = A` | 5 | 10 | **5** |
| 2 | `A = B` | **10** | 10 | 5 |
| 3 | `B = temp` | 10 | **5** | 5 |

`temp` **saves** A's value before it's overwritten.

Without `temp`, one value would be lost forever.

---

## Pattern 5: Swap (Temp Variable) — Challenge

> Create two sprites. Use a swap pattern to exchange their x-positions when you press the space bar.

**Stretch:** Use the swap pattern to sort three values from smallest to largest.

---

## Pattern 6: Max Tracker (High Score)

**The problem:** How do you remember the highest score ever achieved?

Every time the score changes, check if it's higher than the previous best.

> What variable do we need beyond the current score?

<v-click>

A second variable: `highScore`. It only changes when `score` exceeds it.

</v-click>

---

## Pattern 6: Max Tracker (High Score) — Blocks

<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0;font-family:'Courier New',monospace;font-size:15px;">

<div style="background:#FFBF00;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">flag</span> clicked
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:22px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">highScore</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">0</span>
</div>

<br>

<div style="background:#FFBF00;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">score changes</span>
</div>

<div style="background:#5CB1D6;color:white;padding:7px 18px;margin-left:22px;border-radius:16px 3px 3px 3px;">
  if <span style="background:white;color:black;padding:1px 7px;border-radius:4px;clip-path:polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);">score > highScore</span> then
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:44px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">highScore</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">score</span>
</div>

</div>

A **conditional update** — the variable only changes when a comparison is true.

---

## Pattern 6: Max Tracker (High Score) — Variable in motion

| Round | Score after round | Comparison | `highScore` |
|:-----:|:---:|:-----------|:---:|
| 1 | 15 | 15 > 0 → true | 15 |
| 2 | 12 | 12 > 15 → false | 15 |
| 3 | 22 | 22 > 15 → true | **22** |
| 4 | 18 | 18 > 22 → false | 22 |
| 5 | 30 | 30 > 22 → true | **30** |

`highScore` only moves **upward**. It holds the "best so far."

This pattern generalizes to: **compare → conditionally update** (works for min, max, closest, etc.)

---

## Pattern 6: Max Tracker (High Score) — Challenge

> Add a high score to your game. When the game restarts (flag clicked), the score resets but the high score stays.

**Stretch:** Display "New High Score!" when the player beats the record.

---

## Pattern 7: Controller (Variable Drives Behavior)

**The problem:** How do you make the game get harder over time?

You want obstacles to move faster, or more enemies to appear.

> Can you change the game's difficulty without rewriting blocks?

<v-click>

Yes — use a variable as a **knob** that controls behavior. Turn the knob, the game changes.

</v-click>

---

## Pattern 7: Controller (Variable Drives Behavior) — Blocks

<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0;font-family:'Courier New',monospace;font-size:15px;">

<div style="background:#FFBF00;color:white;padding:7px 18px;border-radius:16px 16px 3px 3px;">
  when <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">flag</span> clicked
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:22px;">
  set <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">speed</span> to <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">3</span>
</div>

<div style="background:#FFAB19;color:white;padding:7px 18px;border-radius:16px 3px 3px 3px;margin-left:22px;">
  forever
</div>

<div style="background:#4C97FF;color:white;padding:7px 18px;margin-left:44px;">
  move <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">speed</span> steps
</div>

<div style="background:#FF8C1A;color:white;padding:7px 18px;margin-left:44px;">
  change <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">speed</span> by <span style="background:white;color:black;padding:1px 7px;border-radius:3px;">0.1</span>
</div>

<div style="background:#FFAB19;color:white;padding:7px 18px;border-radius:3px 3px 3px 16px;margin-left:22px;">
</div>

</div>

The variable `speed` is used **inside** the `move` block. Change the variable, and the sprite moves differently.

---

## Pattern 7: Controller (Variable Drives Behavior) — Variable in motion

| Time | `speed` | Sprite behavior |
|:----:|:-------:|-----------------|
| Start | 3 | Moves 3 steps per frame |
| 5 sec | 3.5 | A bit faster |
| 10 sec | 4.0 | Noticeably faster |
| 20 sec | 5.0 | Fast |
| 30 sec | 6.0 | Very fast |

The variable doesn't track what *happened* — it **controls** what happens.

This is a shift in thinking: variables aren't just for recording, they're for **driving behavior**.

---

## Pattern 7: Controller (Variable Drives Behavior) — Challenge

> Use a variable to control the speed of an obstacle. Make the speed increase as the player's score gets higher. Start slow, end fast.

**Stretch:** Use two controller variables — one for speed and one for how often new obstacles appear.

---

## Summary: What all 7 patterns share

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:16px;margin-top:20px;">

<div style="background:#f3f4f6;padding:16px;border-radius:8px;">
<strong style="color:#FF8C1A;">1. Counter</strong><br>
<code>change by 1</code> each event
</div>

<div style="background:#f3f4f6;padding:16px;border-radius:8px;">
<strong style="color:#FF8C1A;">2. Accumulator</strong><br>
<code>change by</code> varying amounts
</div>

<div style="background:#f3f4f6;padding:16px;border-radius:8px;">
<strong style="color:#FF8C1A;">3. Countdown</strong><br>
<code>change by -1</code> until 0
</div>

<div style="background:#f3f4f6;padding:16px;border-radius:8px;">
<strong style="color:#FF8C1A;">4. Flag</strong><br>
Switch between fixed states
</div>

<div style="background:#f3f4f6;padding:16px;border-radius:8px;">
<strong style="color:#FF8C1A;">5. Swap</strong><br>
Temp variable saves a value
</div>

<div style="background:#f3f4f6;padding:16px;border-radius:8px;">
<strong style="color:#FF8C1A;">6. Max tracker</strong><br>
Conditional update
</div>

<div style="background:#f3f4f6;padding:16px;border-radius:8px;grid-column:1/-1;">
<strong style="color:#FF8C1A;">7. Controller</strong><br>
Variable drives other blocks
</div>

</div>

---

## Summary

Every pattern is the same idea:

> A **named box** (variable) whose **contents change** over time.

The pattern describes *what* changes the value and *when*.

Variables are not just for remembering — they're for **controlling**, **counting**, **tracking**, and **communicating**.
