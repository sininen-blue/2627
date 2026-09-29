---
title: 16 Square Root
exportFilename: exports/comp102/16_square_root
lineNumbers: true
---

# Square Root Algorithsm

---

## Square root

The square root of a number $x$ is the number $r$ such that $r*r = x$

- It's a simple concept mathematically, and easy for us to calculate by hand for small perfect squares (like 4, 9, 16, 25...)

In mathematics, the way this is often found is through algebra
- We rewrite the equation $r^2 = x$ as $r^2 - x = 0$
- Then we solve for $r$ using algebraic manipulation, such as $r = x^{1/2}$

---

## Square Root

Computing a square root exactly is actually *expensive*

- Under the hood, `x ** 0.5` or `math.sqrt(x)` still has to run some kind of iterative algorithm
- For irrational answers, we can never get a perfectly *exact* value anyway, only an approximation to some precision

So the real question becomes: how much computation are we willing to spend for how much accuracy?

As programmers, we have several strategies available to us, each with different costs
- **Guess and check (brute force)**: try every possible answer one at a time,  simple, but very slow
- **Approximation**: narrow in on an answer using increments and a tolerance (epsilon), faster, still simple
- **Bisection search**: cut the search space in half at every step, much faster for ordered search spaces
- **Built-in library functions**: `math.sqrt()`, fast and convenient, but hides the algorithm from us

We'll build up from the slowest, simplest approach to the faster ones, so we understand *why* the fast ones work

---

## Guess and check

This is also called an *exhaustive enumeration algorithm*

- Applies to a problem where
    - You are able to **guess** a value for a solution, and
    - You are able to **check** if that guess is correct

- And you can keep guessing until you either
    - Find the correct solution
    - Run out of guesses

---

## Guess and check square root

Given an `int` called `x`, 

> we want to check if there exists an `int` that is the square root of `x`

1. Start with a guess, and check if it's the correct answer

---

## Guess and check square root

2. Be *systematic*, start with a guess, then `guess + 1`, then `guess + 2`, etc

And if `x` is a perfect square, then you will eventually find the answer

---

## Guess and check square root

And if `x` doesn't have a perfect square root, then we'll need to know when to stop guessing

Here we can use algebra, 

> if `guess` squared is bigger than `x`, then we know that the guess is too big, and we can stop guessing

---
layout: center
---

## Guess and check square root

Code

---

## Guess and check square root

```python
guess = 0
x = int(input("Enter a number: "))
while guess**2 < x:
    guess += 1

if guess**2 == x:
    print("The square root of", x, "is", guess)
else:
    print(x, "does not have a perfect square root")
```

---

## Guess and check square root

- Does this work for any integer value of `x`?
- What happens if `x` is negative?

---
layout: center
---

## Fixing those issues

code

---

## Fixing those issuse


```python
guess = 0
is_negative = False

x = int(input("Enter a number: "))

if x < 0:
    is_negative = True

while guess**2 < x:
    guess += 1

if guess**2 == x:
    print("The square root of", x, "is", guess)
else:
    print(x, "does not have a perfect square root")

    if is_negative:
        print("This program does not support negative numbers")
```

---

# Approximation

---

## Finding the square root

our guess and check algorithm to find the square root of a number
- but it only worked for perfect squares
- what if we wanted to find the square root of any positive integer

Question
- what does it mean to find the square root of $x$?

Usually it's
- find $r$ such that $r*r = x$
- if $x$ is not a perfect square, then $r$ is not an integer

---

## Approximation

1. find an answer that's good enough
    - like finding $r$ such that $r*r$ is only a small distance away from $x$
    - epsilon $\epsilon$ is usually the term used for "small distance away"
    - where we want to find $r$ such that $|r^2 - x| < \epsilon$

2. Algorithm
    - start with a guess, $g$, that we know is too small (like 0)
    - increment by a small value, `a`, to give a new guess `g`
    - check if `g**2` is close enough to `x` (within epsilon)
    - continue until we get an answer that's close enough

3. looking at all possible values `g + k*a` for integer values of `k`
4. stop when `|g**2 - x| < epsilon`

---
layout: center
---

Line diagram here

---

## Approximation
1. so we have two parameters to set
    - epsilon, how close are we to the answer 
    - increment, how much to increase our guess by

2. And performance will vary based on these values
    - speed
    - accuracy

- lower increment means more steps, a slower program, but higher accuracy
- higher increment means fewer steps, a faster program, but lower accuracy, and may skip over the answer
- lower epsilon means more steps, a slower program, but higher accuracy
- higher epsilon means fewer steps, a faster program, but lower accuracy

---

## Implementation

```python {all|1-5|7|7-9|11-12|3|7|all}
x = 36
epsilon = 0.01
num_guesses = 0
guess = 0.0
increment = 0.0001

while (abs(guess**2 - x) -x) >= epsilon:
    guess += increment
    num_guesses += 1

print("num_guesses =", num_guesses)
print(guess, "is close to square root of", x)
```

---

## Implementation

Let's try finding the cube root of 
- 36
- 24
- 2
- 12345
- 54321

Will this loop always terminate?

---

## Implementation

Let's try to debug

```python {all|11-16|all}
x = 36
epsilon = 0.01
num_guesses = 0
guess = 0.0
increment = 0.0001

while (abs(guess**2 - x) -x) >= epsilon:
    guess += increment
    num_guesses += 1

    if num_guesses % 100000 == 0:
        print("current guess =", guess)
        print("current guess^2 =", guess**2)
        print("distance from x =", abs(guess**2 - x))
    if num_guesses % 1000000 == 0:
        input("continue?")

print("num_guesses =", num_guesses)
print(guess, "is close to square root of", x)
```

<style>
code {
  font-size: 13px;
}
</style>
---

# We overshot
Diagram here, guess and guess ** 2

---

## The fix

```python {all|7|12-15|all}
x = 36
epsilon = 0.01
num_guesses = 0
guess = 0.0
increment = 0.0001

while (abs(guess**2 - x) -x) >= epsilon and guess**2 <= x:
    guess += increment
    num_guesses += 1

print("num_guesses =", num_guesses)
if abs(guess**2 - x) >= epsilon:
    print("Failed to find the square root of", x)
else:
    print(guess, "is close to square root of", x)
```

<style>
code {
  font-size: 13px;
}
</style>
---
layout: center
---

Now it stops if it overshoots and reports an error

## But what if we don't want to fail? What can we do

<div class="text-sm w-fit mx-auto">
[ participation points for guesses and ideas ]
</div>

<v-click>
<div class="mt-20 w-fit mx-auto">
hint: think of the values that we set in the very beginning
</div>
</v-click>

---

# Remember
Overshooting can happen

- Always set another end condition

Be careful when comparing floating point numbers

---

Recap
- can't use `==` to check an exit condition
- need to be careful that looping mechanisms don't jump over the exit condition
- tradeoffs exist between efficiency and accuracy
- need to think about how close an answer we want when setting parameters of an algorithm
- to get a good answer, this method can be slow

We'll figure out how to speed it up next time

---

# Bisection Search

---

# Recap
- floating point numbers introduce challenges
- they can't be represented in memory exactly, we lose some data
- guess and check *enumerates* integers one at a time as a solution to a problem 
- approximation enumerates using *increments* and *epsilons*

---

## Exercise

Assume you are given a positive integer named `N`. Write a piece of python code that prints `hello world` on separate lines `N` time. Use either a `while` loop or a `for` loop.

```
N: 3
hello world
hello world
hello world
```

---

## Demonstration of finding the square root of a number

---

## Our previous approximation code

```python {all|1|2|3|4|5|7|8|9|11|12|13|14|15|all|1-5|7-9|11|12-13|14-15|all}
x = 54321
epsilon = 0.01
num_guesses = 0
guess = 0.0
increment = 0.0001

while abs(guess**2 - x) >= epsilon and guess**2 <= x:
    guess += increment
    num_guesses += 1

print('num_guesses =', num_guesses)
if abs(guess**2 - x) >= epsilon:
    print('Failed on square root of', x)
else:
    print(guess, 'is close to the square root of', x)
```

---
layout: center
---

# Bisection Search

---
layout: center
---

## Scenario

- What if I attached 100php to a page of a book
- If you can guess which page the money is on, you get to keep the money
- If you fail, you get a 5.0

<v-click>
<p class="mt-4 w-150">
What if I told you whether you were correct, too low, or too high after each guess?
</p>
</v-click>

---

## Bisection Search

- Applies to problems with an inherent order to the range of possible answers
    - Examples: integers, floating point numbers, words in a dictionary, grades
- Assume we know that the answer lies in between some interval
    - In our square root, what was the start of our interval?
    - What was the end of our interval?

<!-- intervals showcase, skinnier book -->

---

## Bisection Search

Steps:
1. After establishing the interval
2. Get the midpoint of the interval
3. Check if the midpoint is close enough to the answer
4. Check whether the midpoint is too high or too low
5. Change the interval
6. Repeat step 2

- This cuts the set of things to check in half at each stage
    - where exhaustive search (guess and check) reduces them from $N$ to $N-1$
    - bisection search reduces them from $N$ to $N/2$

<!-- Do a 10 item example for clarity -->

---

## Log growth

- Cutting the number of things to check in half at each step is usually called logarithmic growth
<img class="mx-auto" src="./images/day_7/fig1.png" alt="log growth" width="400"/>

- Compared to linear growth which is how the guess and check algorithm works

### Logarithmic growth is much faster than linear growth

---
layout: center
---

## Example

- Imagine you were sitting in alphabetical order 

---

## Bisection search for square root

- Assume we know that the answer lies between 0 and x
- Rather than exhaustively trying things starting at 0, suppose instead we pick a number in the middle of this range

<img class="mx-auto" src="./images/day_7/fig2.png" alt="bisection search" width="400"/>

- If you're lucky, that's the correct answer

---

## Bisection search for square root

- if it's not close enough, check if it's too big or too small
- if `guess ** 2 > x`, then we know `guess` is too big, so now search 

<img class="mx-auto" src="./images/day_7/fig3.png" alt="bisection search" width="400"/>

---

## Bisection search for square root

- and if, for example,  this new `guess` is such that `guess ** 2 < x`, then we know that `guess` is too small

<img class="mx-auto" src="./images/day_7/fig4.png" alt="bisection search" width="400"/>

- at each stage, reduce the range of values to search by half

---

## Bisection search for square root

Keep doing this

<img class="mx-auto" src="./images/day_7/fig5.png" alt="bisection search" width="400"/>

---
layout: center
---

## Bisection search takes advantage of the properties of the problem
1. where the search space is ordered
2. we can tell the guess is too high or too low

---

### Question

If you had to guess a random 4 digit telephone number, and the only thing you get each guess is whether on not it's correct, would you be able to use bisection search?

---

### Question

You are playing a guessing game where you have to guess a number exactly, between 0 and 10 in any precision. If you receive feedback on whether your guess is too high or too low, can you use bisection search to find the number?

---

## Slow square root using approximation

```python 
x = 54321
epsilon = 0.01
num_guesses = 0
guess = 0.0
increment = 0.0001

while abs(guess**2 - x) >= epsilon and guess**2 <= x:
    guess += increment
    num_guesses += 1

print('num_guesses =', num_guesses)
if abs(guess**2 - x) >= epsilon:
    print('Failed on square root of', x)
else:
    print(guess, 'is close to the square root of', x)
```

---

## Slow square root using approximation

```python 
x = 54321 # still here
epsilon = 0.01
num_guesses = 0
# code here
# code here
# code here
while abs(guess**2 - x) >= epsilon:
    # code here
    # code here
    # code here


    num_guesses += 1

print('num_guesses =', num_guesses)
print(guess, 'is close to the square root of', x)
```

---

## Slow square root using approximation

```python 
x = 54321
epsilon = 0.01
num_guesses = 0
low = 0
high = x
guess = (high + low)/2.0
while abs(guess**2 - x) >= epsilon:
    # code here
    # code here
    # code here


    num_guesses += 1

print('num_guesses =', num_guesses)
print(guess, 'is close to the square root of', x)
```

---

## Slow square root using approximation

```python 
x = 54321
epsilon = 0.01
num_guesses = 0
low = 0
high = x
guess = (high + low)/2.0
while abs(guess**2 - x) >= epsilon:
    if guess ** 2 < x:
        # code here
    else: 
        # code here

    num_guesses += 1

print('num_guesses =', num_guesses)
print(guess, 'is close to the square root of', x)
```

---

## Slow square root using approximation

```python 
x = 54321
epsilon = 0.01
num_guesses = 0
low = 0
high = x
guess = (high + low)/2.0
while abs(guess**2 - x) >= epsilon:
    if guess ** 2 < x:
        low = guess
    else: 
        # code here

    num_guesses += 1

print('num_guesses =', num_guesses)
print(guess, 'is close to the square root of', x)
```

---

## Slow square root using approximation

```python 
x = 54321
epsilon = 0.01
num_guesses = 0
low = 0
high = x
guess = (high + low)/2.0
while abs(guess**2 - x) >= epsilon:
    if guess ** 2 < x:
        low = guess
    else: 
        high = guess

    num_guesses += 1

print('num_guesses =', num_guesses)
print(guess, 'is close to the square root of', x)
```

---

## Slow square root using approximation

```python 
x = 54321
epsilon = 0.01
num_guesses = 0
low = 0
high = x
guess = (high + low)/2.0
while abs(guess**2 - x) >= epsilon:
    if guess ** 2 < x:
        low = guess
    else: 
        high = guess
    guess = (high + low)/2.0
    num_guesses += 1

print('num_guesses =', num_guesses)
print(guess, 'is close to the square root of', x)
```

---

## Log growth is better than linear

- the regular brute force search for 54321 took over 23M guesses
- the bisection search reduced it to 30 guesses
- We'll talk more about this later, but we say that the brute force search is in *linear in size of problem*, bucaesu the number of steps grows linearly as we increase problem size
- and bisection search is *logarithmic in size of problem*  because the number of steps grows logarithmically as we increase problem size

---

## Some observations

- bisection search radically *reduces computation time*
- the search space always gets *smaller quickly at the beginning* and then more slowly
- works only on problems that have an inherent order

---

## Exercise

Write code to do bisection to find a number between 0 and 1000. Print out the number of guesses you need to get the answer. 

Then output the count and guess

```python
n = input("Enter a number between 0 and 1000: ")
n = int(n)

low = 0
high = 1000
guess = (high + low) / 2.0
count = 0
```

```
Enter a nummber between 0 and 1000: 24
count: 56
guess: 24.0
```
