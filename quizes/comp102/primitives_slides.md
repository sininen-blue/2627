What is a primitive value in a programming language?

- A value the language treats as built-in and indivisible
- A value built by bundling several smaller values together
- A value that can only ever store a whole number
- A value whose type is decided at runtime, not at compile time

---

Which of the following is a primitive type in Java?

- int
- String
- List
- Array

---

How does a composite value like a `List` differ from a primitive?

- It bundles several primitive values together into one
- It can only ever hold a single atomic value
- It silently converts between different types
- It is checked at runtime rather than at compile time

---

When are types checked in a statically typed language?

- Before the program runs, at compile time
- While the program runs, at runtime
- Only when a type mismatch actually happens
- Only after the program finishes executing

---

In a statically typed language, what happens to a variable's type after it is declared?

- It is fixed and cannot change later
- It changes with each new value assigned
- It is decided at runtime instead
- It only applies inside function bodies

---

What does strong typing do with mismatched types?

- It refuses to convert them silently, so you must convert explicitly
- It automatically converts them to make the operation work
- It ignores them until the program finishes running
- It converts them to whichever of the two types is larger

---

What does `"5" + 3` evaluate to in JavaScript?

- "53", because `+` prefers string concatenation
- 8, because `+` converts the string into a number
- A TypeError, because the two types do not match
- An error, because strings cannot be combined at all

---

Why does `0.1 + 0.2 === 0.3` evaluate to false in most languages?

- Floats store the closest binary approximation, not the exact decimal
- Adding two floats always rounds the result down to an integer
- The values 0.1 and 0.2 are stored as text, not as numbers
- Comparisons always require both operands to be integers first

---

How should two floats be compared for equality?

- With a tolerance, like `abs(x - 0.3) < 1e-9`
- With the `==` operator, like `x == 0.3`
- By converting both of them to integers first
- By rounding both to the nearest hundredth

---

Why can't 0.1 be represented exactly in binary?

- Its binary form repeats forever, like 1/3 does in decimal
- Binary can only represent integers and whole number values
- The value 0.1 needs more bits than a double actually has
- Decimal numbers never translate into binary at all

---

Who is the boolean type named after?

- George Boole
- Alan Turing
- Ada Lovelace
- Charles Babbage

---

What type does the expression `5 > 3` produce?

- A boolean
- An integer
- A string
- A float

---

In JavaScript, which of the following values is truthy?

- "0"
- 0
- ""
- null

---

Why does `if (5)` fail to compile in Java?

- Java requires a boolean condition, so numbers are rejected
- Java silently converts 5 into a boolean before checking
- Java has no boolean type for if statements to use
- Java only allows comparisons inside if conditions

---

What does `2 + 3 * 4` evaluate to in Python?

- 14, because multiplication binds tighter than addition
- 20, because operations are evaluated left to right
- 24, because addition happens before multiplication
- 9, because only the first two numbers are used

---

What does `2 ** 3 ** 2` evaluate to in Python?

- 512, because `**` is right-associative
- 64, because `**` is left-associative
- 36, because the bases are multiplied first
- 12, because the exponents are added together

---

With `x = 5` and `y = 2`, what does `print(x + y * 2 > 8 and not y == 2)` print?

- False
- True
- 9
- 5

---

What does `0 and 5` evaluate to in Python?

- 0
- 5
- False
- True

---

What is a scalar value?

- A single atomic value like one number or boolean
- A collection of multiple values bundled together
- A value that silently converts between types
- A value that can change type while running

---

In C, what happens when you write `if (x = 5)`?

- It assigns 5 to x, then evaluates truthy, so the body always runs
- It compares x with 5, returning false whenever x is not 5
- It throws a syntax error before the program ever runs
- It assigns 5 to x only if x is currently truthy
