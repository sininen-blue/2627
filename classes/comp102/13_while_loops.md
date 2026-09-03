---
title: 13 Looping Structures
exportFilename: exports/comp102/13_loops
lineNumbers: true
---

# Looping Structures
while loops and for loops

---

## Maze

In order to get out of this maze

```
  vvvv
██ () ██
██    ██
██    ██
██    ██ 
██    ██
  vvvv
```

And given the function `move_down()` which moves the character `()` down 1, 

> What would the program look like?

---

## While loops

A `while` loop is a style of loop present in most languages which simply act as an `if` statement

```python
raining = True
while raining == True:
    sky_color = look_at_sky()

    if sky_color == "gray":
        wait(5)
    elif sky_color == "blue":
        get_umbrella()
        raining = False
    else:
        wait(5)

go_outside()
```

---

## While loop examples

Counting up from 1 to 5

```python
count = 1
while count <= 5:
    print(count)
    count = count + 1
```

---

## While loop examples

Counting down from 10 to 1

```python
count = 10
while count > 0:
    print(count)
    count = count - 1
```

---

## While loop examples

Summing numbers until the user enters 0

```python
total = 0
number = -1
while number != 0:
    number = int(input("Enter a number (0 to stop): "))
    total = total + number

print("Total:", total)
```

---

## While loop examples

Guessing game

```python
secret_number = 7
guess = 0
while guess != secret_number:
    guess = int(input("Guess the number: "))

    if guess < secret_number:
        print("Too low!")
    elif guess > secret_number:
        print("Too high!")

print("You got it!")
```

---

## While loop examples

Doubling a value until it passes a limit

```python
value = 1
while value < 1000:
    value = value * 2
    print(value)
```

---

## Break and Continue Statements

In a while loop it's often useful to be able to *stop*, fully before ending

For example,

```python
while True:
    answer = input("Type 'quit' to stop: ")

    if answer == "quit":
        break
```

Even if the [condition] inside the while loop is `True`, we can still get out of the while loop through break

---

## While loop with break examples

Searching a list for a target value

```python
numbers = [4, 8, 15, 16, 23, 42]
target = 16
found = False

index = 0
while index < len(numbers):
    if numbers[index] == target:
        found = True
        break
    index = index + 1

print("Found:", found)
```

---

## While loop with break examples

Validating user input

```python
while True:
    age = int(input("Enter your age: "))

    if age >= 0 and age <= 120:
        break

    print("That's not a valid age, try again")

print("Thanks, your age is", age)
```

---

## While loop with break examples

Stopping a game loop when a player loses

```python
health = 100

while True:
    health = health - take_damage()

    if health <= 0:
        print("Game over!")
        break

    print("Health remaining:", health)
```

---

## While loop with break examples

Stopping as soon as a condition is met, using an "infinite" loop

```python
number = 1

while True:
    if number * number > 100:
        break
    print(number, "squared is", number * number)
    number = number + 1
```

---

## Exercises

Using a `while` loop, write a program that:

1. Prints every even number from 2 to 20
2. Asks the user for a password, and keeps asking until they type "secret"
3. Starts at 100 and keeps subtracting 7 until the value is 0 or below, printing each step
4. Adds up numbers from 1 to 50 and prints the final total
5. Asks the user to enter numbers one at a time, stopping when they type a negative number, and prints how many numbers they entered

---

## Exercises

1. A bank account starts with $50 and earns $5 interest every year. Print the balance each year until it reaches $100. How many years did it take?
2. A car has 12 litres of fuel and uses 3 litres per hour of driving. Print the remaining fuel after each hour until it runs out.
3. A student needs 60 hours of volunteering. They volunteer 4 hours a week. Print how many weeks it takes, and the total hours after each week.
4. You are given a number by the user. Keep dividing it by 2 (using integer division) and print each result, stopping once it reaches 0. Count how many times you divided.
5. A plant is 2cm tall and grows 3cm every day. Print the height each day until it is taller than 30cm.
