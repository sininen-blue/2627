What do arithmetic circuits produce from their binary word inputs?

- A binary word output determined only by the current inputs
- A binary word output that depends on past and current inputs
- A single control signal used to select an arithmetic operation
- A stored history of all previously computed results

---

For a half adder with inputs A = 1 and B = 1, what are the resulting sum and carry-out bits?

- Sum = 0, carry-out = 1
- Sum = 1, carry-out = 0
- Sum = 1, carry-out = 1
- Sum = 0, carry-out = 0

---

What is the main limitation of a half adder?

- It accepts only A and B, ignoring any incoming carry bit
- It accepts a carry-in but ignores the previous stage's carry-out
- It produces a carry-out but has no input for an incoming carry
- It requires a carry-in input but computes the sum without using it

---

A full adder receives A = 1, B = 0, and carry-in = 1. What are the resulting sum and carry-out bits?

- Sum = 0, carry-out = 1
- Sum = 1, carry-out = 0
- Sum = 1, carry-out = 1
- Sum = 0, carry-out = 0

---

How are full adders chained together to add multi-bit numbers?

- They haev a carry-out which can be conencted to another adder
- They produce two sum bits per stage instead of one
- They eliminate the need for a carry-out signal
- They compute both possible carry values in parallel

---

What is the main drawback of a ripple-carry adder?

- Its worst-case delay grows linearly with the number of bits
- It is restricted to adding a single bit at a time
- It requires a multiplexer for every bit position
- It is designed to operate only on unsigned magnitude values

---

How does a carry-select adder reduce delay compared to a ripple-carry adder?

- It computes each half of the word twice in parallel, then selects the result
- It waits for the carry to ripple through all bits before summing
- It replaces all full adders with half adders to simplify the circuit
- It shifts the input bits before adding them together each cycle

---

In a 32-bit carry-select adder split into two 16-bit halves, what triggers the multiplexer to select the upper half's result?

- The lower half's carry-out signal becoming known
- The upper half's carry-out signal becoming known
- The sign bit of the final sum
- The completion of the ripple through all 32 bits
