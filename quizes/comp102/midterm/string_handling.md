What is a string in Python?

- A sequence of characters treated as a single piece of data
- A collection of numbers used for arithmetic
- A value that stores only true or false
- A box that holds exactly one number

---

Which quote style lets you write multi-line strings in Python?

- Triple quotes like """..."""
- Single quotes like '...'
- Double quotes like "..."
- Backticks like `...`

---

What does "5" + "3" evaluate to?

- "53", since both are strings and it concatenates
- 8, since it adds the numbers
- An error, since strings can't combine
- "5 3", with a space between

---

What does it mean that strings are sequences?

- Each character has an index, so they can be indexed and sliced
- They can only hold single characters
- They can be changed in place
- They are stored as numbers

---

What does it mean that strings are immutable?

- Any modification creates a new string
- They can be changed in place
- They cannot be indexed
- Their length never changes

---

What does input() do in a Python program?

- Pauses and waits for the user to type something
- Prints a message to the screen
- Converts a string into a number
- Reads a whole file into memory

---

What type does input() always return?

- A string
- An int
- A float
- Whatever the user typed

---

How do you get a number from input() for arithmetic?

- Convert it with int() or float()
- Add it to another number directly
- Use input_number() instead
- Multiply it by one first

---

What happens when you try "hello" + 5?

- A TypeError, since only strings can be concatenated
- The string 'hello5', via implicit type coercion
- The string 'hellohellohellohellohello', via string repetition
- The integer 5, since the string is ignored

---

What operator joins strings end-to-end?

- +
- *
- %
- //

---

How does Python compare strings like "apple" and "banana"?

- Character by character using their character codes
- By their length only
- Numerically by their values
- Alphabetically ignoring case

---

Why does "Zebra" < "apple" evaluate to True?

- Uppercase letters come before lowercase in ASCII
- Z comes before a in the alphabet
- Strings compare by their length
- The less-than sign ignores case

---

Why does "10" < "9" evaluate to True?

- It compares character by character, not numerically
- 10 is smaller than 9 numerically
- Strings ignore the first character
- Numbers compare after strings

---

What does "apple" == "Apple" evaluate to?

- False, since string comparison is case-sensitive
- True, since they say the same word
- An error, since the cases differ
- True, since case doesn't matter

---

What is an f-string?

- A string prefixed with f that evaluates { } expressions
- A string that must be formatted with %
- A string that only works with numbers
- A string that cannot be printed

---

What does f"Pi rounded: {3.14159:.2f}" print?

- Pi rounded: 3.14
- Pi rounded: 3.14159
- Pi rounded: 3.15
- Pi rounded: 3.1

---

What does "ab" * 3 evaluate to?

- "ababab"
- "ab3"
- "abababab"
- An error

---

What does len("Hello") evaluate to?

- 5
- 4
- 6
- 0

---

Which line correctly gets an age and adds one?

- age = int(input("Enter your age: ")); next_year = age + 1
- age = input("Enter your age: "); next_year = age + 1
- age = int(input("Enter your age: ")); next_year = age + "1"
- age = input("Enter your age: "); next_year = age + int(1)

---

What is one advantage of f-strings over + concatenation?

- No manual concatenation or type conversion needed
- They run faster than any other code
- They work without quotes at all
- They can only hold numbers
