What is the core idea of out-of-order execution?

* Run instructions as soon as their inputs are ready
- Run every instruction in exactly the order it was written
- Run instructions only after all previous ones have retired
- Run instructions in reverse of the order they were written

---

What does out-of-order execution guarantee despite reordering instructions?

* The same final answer as strict in-order execution
- A shorter program with fewer total instructions
- That every instruction takes exactly one cycle
- That no instruction ever has to wait for another

---

What is a RAW (Read After Write) dependence?

* An instruction needs a result that an earlier one hasn't produced yet
- An instruction wants to overwrite a register an earlier one is still reading
- Two instructions write the same register and order must be preserved
- An instruction reads a register that was never written

---

What is a WAR (Write After Read) dependence?

* An instruction wants to overwrite a register an earlier one is still reading
- An instruction needs a result that an earlier one hasn't produced yet
- Two instructions write the same register in sequence
- An instruction reads a value before it is written

---

What is a WAW (Write After Write) dependence?

* Two instructions write the same register, and the later write must end up last
- An instruction needs a result that an earlier one hasn't produced yet
- An instruction wants to overwrite a register an earlier one is still reading
- Two instructions read the same register at the same time

---

Which type of dependence is described as a true dependence that forces a real wait?

* RAW
- WAR
- WAW
- None of the dependences force a wait

---

How does the scoreboard track registers being read?

* A small counter per register counts how many running instructions use it as a source
- A single global flag marks whether any register is being read
- A timestamp records the last cycle any register was read
- A separate scoreboard entry exists for every instruction in the program

---

When do the scoreboard's counters and flags update?

* They go up when an instruction is issued and down when it retires
- They go up when an instruction retires and down when it is issued
- They only change once at the very start of the program
- They reset to zero at the start of every clock cycle

---

After register renaming, what becomes possible for the renamed instructions?

* They can issue alongside each other instead of waiting
- They must now execute in strict reverse order
- They require twice as many clock cycles to complete
- They can no longer be tracked by the scoreboard

---

Why do many out-of-order CPUs still commit, or retire, results in program order?

* To keep a predictable state in case an interrupt occurs
- To make the scoreboard counters unnecessary
- To avoid ever needing register renaming
- To guarantee every instruction takes the same number of cycles

---

type: tf

Out-of-order execution can change the order instructions run in while still producing the same final result.

- true

---

type: tf

A RAW dependence is a false dependence that register renaming can remove.

- false

---

type: tf

CPUs that execute out of order always commit, or retire, results out of program order as well.

- false

---

type: freeform
points: 3

Explain why a strictly in-order CPU can be forced to stall an independent instruction. Use this example: 
I1: R3 = R0 x R1
I2: R4 = R3 + R2 
I3: R5 = R0 + R1

