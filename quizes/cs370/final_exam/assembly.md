Which instruction set does the iRISC tutorial teach?

* ARMv7 assembly
- IJVM bytecode
- x86-64 assembly
- MIPS assembly

---

What does the 4-bit barrel-shifter field specify for an immediate?

* A rotate-right count that is first multiplied by two
- A rotate-left count used directly, from 0 to 15
- The register that supplies the immediate value
- A value added to the 8-bit constant before the move

---

Why encode an immediate as an 8-bit value plus an even rotate?

* So useful constants, including powers of two, fit in 12 bits
- So every integer from 0 through 4095 can be an immediate
- So an immediate can be wider than a 32-bit register
- So the assembler can omit the barrel shifter entirely

---

What does add r0, r1, #1 write?

* The sum of r1 and 1, into r0
- The sum of r0 and 1, into r1
- The difference of r1 minus 1, into r0
- The difference of 1 minus r1, into r0

---

What does rsb r0, r1, #1 write?

* The difference of 1 minus r1, into r0
- The difference of r1 minus 1, into r0
- The sum of r1 and 1, into r0
- The bitwise complement of r1, into r0

---

What does bic do with its two operands?

* ANDs the first with the complement of the second
- ORs the first operand with the second
- XORs the first operand with the second
- ANDs the first operand with the second unchanged

---

What does cmp do with the result of its subtraction?

* Sets the CPSR flags from it, then discards it
- Writes it into the destination register
- Writes it into lr as a return address
- Uses it as the offset of the next branch

---

What does the V flag report?

* A signed overflow, such as two positives adding to a negative
- An unsigned carry out of an extra result bit
- That the result compared equal to zero
- That the result was positive or zero

---

Which condition suffix means unsigned greater than?

* hi
- gt
- cs
- lt

---

Which letters name the four CPSR condition flags?

* N, Z, C, and V
- N, Z, S, and Q
- C, V, S, and Q
- N, C, S, and Q

---

type: blank

The stack-pointer register is named BLANK.

- sp, SP

---


