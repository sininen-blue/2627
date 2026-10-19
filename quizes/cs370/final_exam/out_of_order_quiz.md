I1 writes R3. I2 reads R3, and I1 has not produced that value yet. Which dependence is I2 waiting on?

* A read-after-write dependence: I2 needs a result I1 has not produced
- A write-after-read dependence: I2 would overwrite a register I1 is still reading
- A write-after-write dependence: both write R3, and the later write must remain
- No dependence: I2 may issue in the same cycle as I1 with no wait

---

I1 is still reading R5 as a source. I2 wants to write a new value into R5. Which dependence blocks that overwrite?

* A write-after-read dependence: I2 must not clobber R5 while I1 is still reading it
- A read-after-write dependence: I2 is waiting for a result I1 has not produced
- A write-after-write dependence: both write R5, and I2's write must be the one left behind
- No dependence: a write may overwrite a register that an earlier instruction is reading

---

I1 and I3 both write R7, and I3 is later in program order. If they execute out of order, which constraint still has to hold?

* I3's write, not I1's, must be the value that remains in R7
- I3 must wait because it reads a result that I1 has not produced yet
- I3 must not write R7 while an earlier instruction is still reading R7
- Either write may remain in R7, because only reads have to stay ordered

---

Several in-flight instructions still use R4 as a source. How does a scoreboard remember that?

* A counter on R4 tracks how many issued instructions still read it
- One global flag says whether any register in the machine is being read
- A single timestamp records the last cycle on which any register was read
- The scoreboard keeps a permanent entry for every instruction in the binary

---

When do the scoreboard's per-register counters and busy flags change?

* They increase when an instruction is issued and decrease when it retires
- They increase when an instruction retires and decrease when it is issued
- They are written once when the program is loaded and then left unchanged
- They are cleared at the start of every clock cycle and rebuilt from scratch

---

I2 and I4 both write R9, so a name conflict kept them from issuing together. Register renaming gives them different physical registers. What can they do now?

* They can issue alongside each other instead of waiting on the shared name
- They must now execute in the reverse of program order
- Each of them now takes twice as many cycles to complete
- The scoreboard can no longer track either instruction

---

Many out-of-order cores still retire results in program order. Why keep that commit order?

* So an interrupt or exception sees a precise architectural state
- So the scoreboard no longer needs per-register counters
- So register renaming can be left out of the pipeline
- So every instruction is forced to take the same number of cycles

---

type: tf

A read-after-write dependence is a false name dependence, so register renaming removes the wait.

- false

---

type: tf

A CPU that issues and executes instructions out of order also retires those results out of program order.

- false

---

type: freeform
points: 3

Explain why a strictly in-order issue stage stalls an instruction that does not depend on the slow one. Use this fragment:

I1: R2 = R0 × R1
I2: R6 = R2 + R4
I3: R7 = R0 + R8
