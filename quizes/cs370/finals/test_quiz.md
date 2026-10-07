What determines the output of a combinational circuit at any instant?

- The past state of the circuit
* The current input values only
- The sequence of previous inputs
- The number of memory elements it contains

---

type: tf

A combinational circuit's output depends only on its present inputs, never on past inputs or state.

- true

---

What best describes what a multiplexer does?

* Selects one of several inputs and routes it to a single output
- Routes a single input to one of several outputs
- Compares two input words for equality
- Stores one bit of state between clock cycles

---

type: many

Which of the following are true of a decoder?

* It activates exactly one output line for a given input code
* It has more output lines than input lines
- It stores the most recently decoded value
- It requires a clock signal to change outputs

---

type: blank

A BLANK is a combinational circuit that activates exactly one of up to 2^n output lines based on an n-bit input code.

- decoder

---

type: tf

An encoder performs the inverse operation of a decoder.

- true

---

type: blank

An ENCODER takes one of 2^n active input lines and produces an n-bit BLANK representing which line was active.

- code, output code, binary code

---

type: freeform
points: 3

Explain, in one or two sentences, why a multiplexer can be used to implement an arbitrary Boolean function of its select lines.

---

type: many

Which of the following are reasons a full adder is preferred over a half adder when building a multi-bit adder?

* A full adder accepts a carry-in from the previous stage
* Chaining full adders allows addition of numbers wider than one bit
- A full adder only produces a sum output, no carry
- A half adder can already accept a carry-in

---

type: tf

Combinational circuits can contain feedback loops that let the output depend on previous outputs.

- false
