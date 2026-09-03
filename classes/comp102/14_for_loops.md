---
title: 14 Looping Structures 2
exportFilename: exports/comp102/14_for_loops
lineNumbers: true
---

# Looping Structures 2
for loops

---

## Maze

In order to visit every room in this hallway

```
██ () ██ ██ ██ ██
██    ██ ██ ██ ██
██    ██ ██ ██ ██
```

And given a list of rooms `["A", "B", "C", "D"]`,

> What would the program look like, if we already know exactly how many rooms there are?

---

## For loops

A `for` loop is a style of loop which goes through each item in a sequence, one at a time

```python
weather_forecast = ["sunny", "rainy", "cloudy", "sunny"]

for day in weather_forecast:
    print("Today is", day)

    if day == "rainy":
        print("Bring an umbrella!")
```

---

## Lists

A `list` is just a sequence of items, in order, that we can loop through

```python
fruits = ["apple", "banana", "cherry"]
scores = [85, 92, 78, 100]
mixed = ["Alice", 25, True]
```

For loops go through a list one item at a time, in order, from start to end

```python
for fruit in fruits:
    print(fruit)
```

---

## Ranges

A `range` is a quick way to generate a sequence of numbers, without typing them all out

```python
range(5)          # 0, 1, 2, 3, 4
range(1, 6)       # 1, 2, 3, 4, 5
range(10, 0, -1)  # 10, 9, 8, ... 1
range(0, 20, 2)   # 0, 2, 4, ... 18
```

We usually use `range` with a `for` loop, instead of typing out a whole list of numbers

```python
for number in range(1, 6):
    print(number)
```

---

## For loop examples

Counting up from 1 to 5

```python
for count in range(1, 6):
    print(count)
```

---

## For loop examples

Counting down from 10 to 1

```python
for count in range(10, 0, -1):
    print(count)
```

---

## For loop examples

Summing all numbers in a list

```python
numbers = [4, 8, 15, 16, 23, 42]
total = 0

for number in numbers:
    total = total + number

print("Total:", total)
```

---

## For loop examples

Printing every other letter in a word

```python
word = "PROGRAMMING"

for letter in word[::2]:
    print(letter)
```

---

## For loop examples

Doubling each value in a list

```python
values = [1, 2, 4, 8]

for value in values:
    print(value * 2)
```

---

## Break and Continue Statements

In a for loop it's often useful to *skip* an item, without ending

For example,

```python
for number in range(1, 11):
    if number % 2 == 0:
        continue
    print(number)
```

`continue` skips straight to the next item in the sequence, while `break` stops the loop completely

---

## For loop with break examples

Searching a list for a target value

```python
numbers = [4, 8, 15, 16, 23, 42]
target = 16
found = False

for number in numbers:
    if number == target:
        found = True
        break

print("Found:", found)
```

---

## For loop with break examples

Stopping as soon as a total goes over a limit

```python
numbers = [10, 20, 30, 40, 50]
total = 0

for number in numbers:
    total = total + number

    if total > 60:
        break

print("Total stopped at:", total)
```

---

## For loop with continue examples

Skipping negative numbers when summing a list

```python
numbers = [5, -3, 8, -1, 4]
total = 0

for number in numbers:
    if number < 0:
        continue
    total = total + number

print("Total:", total)
```

---

## For loop with continue examples

Printing only the vowels in a word

```python
word = "ELEPHANT"
vowels = "AEIOU"

for letter in word:
    if letter not in vowels:
        continue
    print(letter)
```

---

## While loop vs For loop

Use a `for` loop when you know how many times to loop, or you are going through a sequence

Use a `while` loop when you don't know how many times to loop, and are waiting for a condition to change

```python
# for loop: known number of items
for student in class_list:
    print(student)

# while loop: unknown number of tries
while guess != secret_number:
    guess = int(input("Guess the number: "))
```

---

## Exercises

Using a `for` loop, write a program that:

1. Prints every even number from 2 to 20
2. Goes through a list of names and prints a greeting for each one
3. Starts at 100 and counts down by 7 each time until 0 or below, printing each step
4. Adds up numbers from 1 to 50 and prints the final total
5. Goes through a list of numbers entered by the user, stopping as soon as it finds a negative number, and prints how many numbers were checked before stopping

---

## Exercises

1. A bank account starts with $50 and earns $5 interest every year. Print the balance for each of the first 10 years.
2. A car has 12 litres of fuel and uses 3 litres per hour of driving. Print the remaining fuel after each hour for a 6 hour trip.
3. A student volunteers 4 hours a week for 15 weeks. Print how many total hours they have after each week.
4. You are given a list of numbers. Print only the numbers that are divisible by 3, skipping all others.
5. A plant is 2cm tall and grows 3cm every day. Print the height each day for 14 days, and stop early if it grows taller than 30cm.
</content>
