Which instruction set does the interactive reduced instruction-set computer (iRISC) tutorial teach?

* ARMv7 assembly
- IJVM bytecode
- x86-64 assembly
- MIPS assembly

---

What does the 4-bit barrel-shifter field specify for an immediate?

* A rotate-right amount that is doubled before use
- A rotate-left amount used as written, from 0 to 15
- The register number that supplies the immediate value
- An extra amount added to the 8-bit constant first

---

Why encode an immediate as an 8-bit value plus a rotate field?

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

* Sets the current program status flags, then discards it
- Writes that result into the named destination register
- Writes that result into lr as a return address
- Uses that result as the offset of the next branch

---

What does the V flag report?

* A signed overflow, such as two positives summing to a negative
- An unsigned carry out of an extra result bit
- A zero result, such as two equal values comparing equal
- A positive or zero result, with the sign bit clear

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

A loop increments r0 and branches back with b. It should stop once r0 equals 6. Which change is the right one?

* Compare r0 with 6 and use bne to repeat while the values differ
- Replace the branch with bx lr so the loop body runs one time
- Leave b in place, because an unconditional branch reads the flags
- Move the increment below bx lr so it runs after the return

---

type: blank

The stack-pointer register is named BLANK.

- sp, SP

---

type: blank
points: 3

Registers start at 0. Trace this program. Count only the numbered instructions.

main:
1 mov r0, #4
2 mov r1, #3
3 sub r2, r0, r1
4 add r2, r2, #1

After instruction 4, what is the value of register r0? BLANK
After instruction 4, what is the value of register r1? BLANK
After instruction 4, what is the value of register r2? BLANK

- 4, #4, four
- 3, #3, three
- 2, #2, two

---

type: blank
points: 3

Registers start at 0. Trace this program. A label is on its own line.

main:
mov r0, #1
mov r1, #1
cmp r0, r1
beq same
mov r2, #9
b done

same:
mov r2, #4
done:
add r0, r0, r2

After the program finishes, what is the value of register r0? BLANK
After the program finishes, what is the value of register r1? BLANK
After the program finishes, what is the value of register r2? BLANK

- 5, #5, five
- 1, #1, one
- 4, #4, four
