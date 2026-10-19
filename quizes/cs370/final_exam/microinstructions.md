What does the Microprogram Counter (MPC) hold while a microprogram runs?

* The address used to fetch the next microinstruction
- The 36-bit control word loaded for this cycle
- The opcode byte most recently fetched from memory
- The word address used for the next data load

---

Why does a fixed absolute address fail for a procedure's local variables?

* Each active recursive call needs its own copy of those locals
- The ALU reads registers and leaves memory addresses unused
- Absolute addresses in this machine are limited to 8-bit values
- The stack pointer holds a running top-of-stack address instead

---

The local-variable pointer (LV) points at the first local of the current procedure. Which slot is LV + 2?

* The third local variable of that procedure
- The second local variable of that procedure
- The byte two past the first local variable
- The return address saved by the caller

---

Computing a1 = (a2 + a3) * a4 on a stack machine. Where does a2 + a3 sit between the add and the multiply?

* On top of the operand stack, ready for the multiply
- In a scratch register reserved for that intermediate sum
- In the constant pool, beside the other integer literals
- In the saved link area, beside the return address

---

What does IADD do to the operand stack?

* Pops two words and pushes their sum
- Pushes two words and pops their sum
- Pops one word and pushes that word twice
- Swaps the top two words and pushes nothing

---

After IRETURN, what occupies the slot where the object reference (OBJREF) used to sit?

* The return value of the called method
- The saved program counter of the caller
- The link pointer of the returning frame
- The first parameter passed into the call

---

Old binaries must keep running. A vendor can add a faster adder circuit or a new opcode. Which choice fits?

* The faster adder, because old programs run unchanged and can be faster
- The new opcode, because old programs start using it on the next run
- The faster adder, because old programs must be reassembled to use it
- The new opcode, because it leaves the old instruction set untouched

---

What does one statement in a pure assembly language correspond to?

* Exactly one binary machine instruction
- One complete high-level language procedure
- A sequence of control-store microinstructions
- An informative note in the architecture manual

---

Why does a computer execute machine language rather than Java source directly?

* The performance gains that come from compiling would be lost
- The hardware would become cheaper to design and build
- One chip could then run programs from several source languages
- Existing machine-code programs would become faster unchanged

---

In translation, when does the source program run?

* After a separate object program has been generated
- During the same step that reads each source instruction
- Before a target-language program has been produced
- In place of the object program the compiler would emit

---

type: tf

A Mic-1 microinstruction may start both a word READ and a byte FETCH in the same cycle.

- false

---

type: freeform
points: 3

A wide adder can be a simple ripple-carry design or a faster carry-lookahead design that uses more gates. Explain how you would choose, and which cost would make you refuse the faster design.
