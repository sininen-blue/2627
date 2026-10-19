What does the MPC hold while a microprogram runs?

* The address of the next microinstruction
- The 36-bit microinstruction now in the MIR
- The IJVM opcode byte most recently fetched
- The word address of the next data load

---

Why does a fixed absolute address fail for a procedure's local variables?

* Each active recursive call needs its own copy of those locals
- The ALU can read registers but cannot use memory addresses
- Absolute addresses are limited to 8-bit values
- The stack pointer cannot point at a fixed address

---

How are a procedure's local variables located on the stack?

* Relative to a pointer such as LV or SP
- At one fixed absolute address per variable name
- Only in the constant pool, which cannot be written
- By the program counter, one byte at a time

---

What does an operand stack remove the need for during arithmetic?

* Extra scratch registers for intermediate results
- A separate memory bank for every recursive call
- A local-variable pointer for the current frame
- A constant-pool entry for every integer literal

---

What does IADD do to the operand stack?

* Pops two words and pushes their sum
- Pushes two words and pops their sum
- Pops one word and pushes that word twice
- Swaps the top two words and pushes nothing

---

What does INVOKEVIRTUAL save so the called method can return?

* The caller's LV and PC
- The constant-pool base and the method-area size
- Only the return value, in place of OBJREF
- The B-bus source and the next microaddress

---

What remains true of old programs after an implementation improvement?

* They run unchanged and can simply be faster
- They must be rewritten to use a new opcode
- They run only after the ISA is replaced
- They lose compatibility with the old operating system

---

What does one statement in a pure assembly language correspond to?

* Exactly one machine instruction
- A whole high-level procedure
- A sequence of control-store microinstructions
- An informative comment in the ISA manual

---

What is one reason hardware does not execute Java directly?

* The performance gained from compiling would be lost
- The hardware would become cheaper to build
- One chip could then run every high-level language
- Old machine-code programs would run faster unchanged

---

type: tf

In translation, each source instruction is read and executed immediately, with no object program generated first.

- false

---

type: freeform
points: 3

Explain the difference between translation and interpretation, including when the source program actually runs.
