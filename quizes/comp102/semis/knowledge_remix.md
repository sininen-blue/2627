What Python keyword tests a condition and executes a block only when it is true?

- if
- test
- match
- verify

---

Which punctuation mark must end the line that begins an if statement?

- A colon
- A comma
- A semicolon
- A dash

---

How does Python know which lines belong to the body of an if statement?

- By their indentation level
- By curly braces around them
- By a closing end keyword
- By parentheses around the block

---

Which keyword lets you test a second condition only if the first if condition failed?

- elif
- elsif
- orelse
- checkif

---

Which keyword provides a fallback block that runs when no earlier condition matched?

- else
- otherwise
- fallback
- default

---

Which line correctly checks whether the variable count equals 10?

- if count == 10:
- if count = 10:
- if count === 10:
- if (count equals 10):

---

Which operator tests whether two values are equal in Python?

- ==
- =
- <>
- equals

---

Which keyword introduces a loop that iterates over each element of a sequence?

- for
- foreach
- each
- iterate

---

Which line correctly loops over every element in a list named names?

- for name in names:
- for name of names:
- for (name in names):
- for name from names:

---

Which built-in function is typically paired with a for loop to repeat a set number of times?

- range()
- span()
- times()
- sequence()

---

What sequence of values does range(4) produce?

- 0, 1, 2, 3
- 1, 2, 3, 4
- 0, 1, 2, 3, 4
- 1, 2, 3

---

Which keyword starts a loop that keeps executing as long as a condition stays true?

- while
- until
- loop
- repeat

---

Which line correctly writes a while loop that continues as long as n is greater than 0?

- while n > 0:
- while (n > 0) do
- while n > 0 then
- until n <= 0:

---

What must change inside the body of a while loop so that the loop can eventually stop?

- The value tested in the loop condition
- The name of the loop variable
- The colon at the end of the line
- The number of spaces used for indentation

---

Which keyword immediately ends a loop before it reaches its natural finish?

- break
- halt
- exit
- end

---

Which keyword skips the rest of the current iteration and moves on to the next one?

- continue
- skip
- pass
- next

---

Which operator adds one to a variable without writing out the full addition expression?

- +=
- ++
- =+
- +1

---

Which line correctly requires that both x is positive and y is positive before running the block?

- if x > 0 and y > 0:
- if x > 0 & y > 0:
- if x > 0 && y > 0:
- if x > 0, y > 0:

---

Which keyword reverses the truth value of a condition in Python?

- not
- inverse
- opposite
- flip

---

What happens when the condition of a while loop never becomes false?

- The loop keeps running forever
- The loop runs exactly one time
- Python skips the loop entirely
- Python throws a syntax error

---

Which keyword works together with if and else to test one more condition before the final fallback?

- elif
- elseif
- else if
- orif

---

When break executes inside a loop nested inside another loop, what is the result?

- Only the innermost loop stops running
- Every loop in the program stops running
- The innermost loop restarts from its first value
- Execution jumps to the next value of the outer loop

---

total = 0
for i in range(3):
    total += i

What value does total hold after this loop finishes?

- 3
- 2
- 6
- 0

---

count = 0
while count < 5:
    count += 1
    if count == 3:
        break

What is the value of count when the loop ends?

- 3
- 5
- 2
- 0

---

for i in range(5):
    if i == 2:
        continue
    print(i)

Which numbers are printed by this loop?

- 0, 1, 3, 4
- 0, 1, 2, 3, 4
- 0, 1, 2
- 2, 3, 4

---

You need to print every number from 1 through 10 inclusive. Which range call achieves this inside a for loop?

- range(1, 11)
- range(1, 10)
- range(0, 10)
- range(10, 1)

---

A program should keep asking the user for input until they type "quit". Which loop structure fits this task best?

- A while loop that checks if the input is not "quit"
- A for loop over range(1)
- A for loop over the string "quit"
- An if statement checked once at the start

---

A grading script must print "pass" for scores of 60 or above and "fail" otherwise. Which structure fits this task?

- An if statement with an else clause
- A for loop with a break statement
- A while loop with a continue statement
- An if statement with no else clause

---

x = 7
y = 3
if x > 5 and y > 5:
    print("A")
else:
    print("B")

What does this code print?

- B
- A
- Nothing is printed
- Both A and B

---

A loop must process items in a list but skip any item that is negative, while still checking every remaining item. Which keyword should be used inside the loop for the negative items?

- continue
- break
- pass
- return

---

You want a loop to stop scanning a list of numbers as soon as it finds the first value greater than 100, without checking the rest. Which keyword accomplishes this?

- break
- continue
- exit
- skip

---

A nested loop prints a multiplication table using an outer loop for rows and an inner loop for columns. Which keyword would stop only the column loop early without ending the row loop?

- break
- continue
- pass
- return

---
