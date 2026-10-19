What does out-of-order execution still match, even though instructions issue out of program order?

* The same final architectural result as strict in-order execution
- A shorter instruction stream with the dependent pairs removed
- A schedule where each instruction completes in one cycle
- A pipeline where a consumer runs before its producer finishes

---

I1 writes R3. I2 reads R3 before that write has a result ready. Which dependence is I2 waiting on?

* A read-after-write dependence on R3
- A write-after-read dependence on R3
- A write-after-write dependence on R3
- An absent dependence between I1 and I2

---

Why is a read-after-write pair a true dependence rather than a name conflict?

* The reader needs a value the writer is still producing
- The two instructions share a register name and nothing more
- Renaming can hand the reader a fresh physical register
- The reader can issue in the cycle the writer is issued

---

I1 is still reading R5. I2 will write R5. Renaming gives I2 a fresh physical register. What can I2 do?

* Write that new physical register while I1 reads the old one
- Wait until I1 has finished reading the architectural copy of R5
- Make I1 read I2's new value in place of the old R5
- Turn the pair into a true data dependence that stays in order

---

I1 and I3 both write R7. I3 is later in program order. They execute out of order. What must R7 show after retirement?

* I3's value, because that write is the later one in program order
- I1's value, because that write executed later in machine time
- Either writer's value, because the two writes have no relative order
- The previous value, because the two writes cancel each other

---

What does a scoreboard's per-register source counter record?

* How many issued instructions are still reading that register
- Whether some register in the machine is currently being read
- The last cycle on which a register in the machine was read
- A permanent slot for each instruction stored in the binary

---

When do the scoreboard's per-register counters and busy flags change?

* They rise when an instruction is issued and fall when it retires
- They rise when an instruction retires and fall when it is issued
- They are written when the program loads and then stay as written
- They reset at the clock edge and are rebuilt before the next edge

---

I2 and I4 both write R9. Renaming gives them different physical registers. What can they do?

* Issue side by side instead of waiting on one shared name
- Run in the reverse of their original program order
- Take twice as many cycles as they took before renaming
- Bypass the scoreboard for the rest of those two instructions

---

The core executes instructions out of order. An exception must see one consistent architectural prefix. Which commit rule fits?

* Retire in program order, so the exception sees that prefix
- Retire as results finish, so the exception sees the newest values
- Skip retirement, so scoreboard counters stay at their initial values
- Drop renaming, so the exception reads the physical register file

---

type: tf

Giving the two writers of a write-after-write pair different physical registers changes the architectural result.

- false

---

type: freeform
points: 3

I1: R2 = R0 × R1
I2: R6 = R2 + R4
I3: R7 = R0 + R8

I3's sources are R0 and R8, and they are ready. Explain whether you would switch this issue stage from in-order to out-of-order, and what I3 gains.
