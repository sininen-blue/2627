When you write `name = 20` in Python, what are you actually doing?

- Making a box, labelling it `name`, and putting 20 inside it
- Replacing every 20 in the program with the label `name`
- Comparing the label `name` with the value 20 for equality
- Storing the text "name" inside a box labelled "20"

---

If `name = 20` has already run, what does evaluating `5 < name` become?

- `5 < 20`
- `5 < name`
- `name < 20`
- `5 = 20`

---

What is the difference between reading a variable and writing to it?

- Reading replaces the name with its value, while writing creates or updates the box
- Reading copies the box to a new location, while writing empties the old box
- Reading deletes the value, while writing keeps it permanently in memory
- Reading only works once, while writing can be done any number of times

---

What happens when you run `a = b` in the box model?

- It puts a second label on the same box
- It copies the value from b's box into a's box
- It merges a and b into a single larger box
- It moves b's box into a's label permanently

---

After running `a = b`, you change the contents through `a`. What does `b` see?

- The same changed contents, because both labels point to one box
- The original contents, because each label keeps its own copy
- An error, because b's box was destroyed by the assignment
- Nothing, because b no longer holds any value at all

---

What is the purpose of placing variables like `speed`, `jumpForce`, and `mass` at the top of a script?

- Making the values easy to find and tweak without hunting through the code
- Making the script run faster because the variables load first
- Making the variables read-only so they cannot be changed later
- Making the game importable from other Python files

---

With `speed = 400` and `jumpForce = 600` defined at the top, what happens when the right arrow is pressed?

- `velocity.x` becomes 400
- `velocity.y` becomes 400
- `velocity.x` becomes -400
- `velocity.y` becomes 600

---

A player's jump feels too low. Which configuration value should you increase?

- `jumpForce`
- `speed`
- `mass`
- `gravity`

---

Which four ingredients does a counter like a coin score require?

- A store, a starting value, a trigger, and the change
- A box, a label, a print call, and a comment
- A loop, a sleep, a comparison, and a reset
- A state, a flag, a timer, and an input check

---

Starting with `score = 0`, how does the score change after the player touches three coins?

- It becomes 3
- It becomes 30
- It stays 0
- It becomes 1

---

What does the statement `score = score + 1` do?

- Reads the current score, adds 1, and stores the result back into score
- Compares the score with 1 and stops the program if they match
- Creates a second variable named `score + 1` next to the first
- Doubles the current score every time it runs

---

With `timeLeft = 30`, what sequence of values does `timeLeft` take while `timeLeft -= 1` runs each second?

- 30, 29, 28, down to 0, then the loop stops
- 30, 31, 32, up to 60, then the loop stops
- 30, 20, 10, then it stays at 0 forever
- 30, 29, 28, then it stops early at 1

---

Why does the countdown loop `while timeLeft > 0` stop once `timeLeft` reaches 0?

- The condition `timeLeft > 0` becomes false
- The value 0 is no longer a valid number
- The sleep function refuses to run again
- The loop has counted down thirty times already

---

How does a flag variable like `state` control the flow of a program?

- It switches between values like a traffic light instead of stacking `if` blocks
- It counts up every time an event happens in the game
- It stores the highest value it has ever reached
- It keeps the player's position locked to the screen

---

During a pause toggle, `is_playing` is set to False and `is_paused` is set to True. What else does this pattern require?

- A loop or condition that checks the flag before continuing play
- A counter that increments every time the pause key is pressed
- A swap that exchanges the two values using a helper variable
- A configuration bundle that sets both values at the top

---

Which flag style fits a game that moves between menu, playing, paused, and game over?

- A single string variable holding the current state name
- A boolean variable that is either True or False
- A counter that tracks how long each state lasted
- A max tracker that remembers the highest state reached

---

Scores arrive as 10, then 25, then 15. Starting from `highScore = 0`, what is `highScore` at the end?

- 25
- 15
- 50
- 10

---

Why does the max tracker only run `highScore = score` inside `if score > highScore`?

- So the record only updates when the new score beats the current best
- So the record updates on every score change without exception
- So the record resets to 0 whenever a lower score appears
- So the record doubles whenever the score goes up

---

Which lines correctly swap the values held by `x` and `y` using a temporary variable?

- `temp = x`, then `x = y`, then `y = temp`
- `temp = y`, then `y = x`, then `x = temp`
- `x = y`, then `y = x`, then `temp = x`
- `temp = x`, then `y = x`, then `x = y`

---

What is the one-line Python shortcut for swapping two variables?

- `x, y = y, x`
- `x = y, y = x`
- `swap(x, y)`
- `x, y = x + y`
