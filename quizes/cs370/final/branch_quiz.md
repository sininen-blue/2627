What is branch prediction?

* Hardware that guesses a conditional branch's outcome before it resolves
- Software that recompiles branches after they execute
- A compiler technique that removes all conditional branches
- A memory unit that stores completed branch results permanently

---

What does the Branch Target Buffer (BTB) store?

* Valid bit, tag, and target address for a branch
- Valid bit, tag, and a 2-bit prediction state
- The full instruction stream for every branch
- The actual cycle count of each pipeline stage

---

What does the Branch History Table (BHT) store?

* Valid bit, tag, and a 2-bit state
- Valid bit, tag, and the target address
- A complete log of every past instruction
- The current contents of the program counter only

---

Why would a predictor use 2 bits instead of 1?

* Two bits need two wrong guesses before the prediction flips
- Two bits allow the BTB to store twice as many targets
- Two bits remove the need for a fetch-cycle lookup
- Two bits let the pipeline skip the decode stage

---

What is a common static fallback rule used at cold start?

* Backward branches are predicted taken, forward branches not taken
- All branches are predicted not taken regardless of direction
- All branches are predicted taken regardless of direction
- Forward branches are predicted taken, backward branches not taken

---

What makes indirect jumps, such as virtual calls, hard to predict?

* They have many possible targets but the BTB keeps only one
- They never appear in the branch history table
- They always resolve during the fetch stage
- They require no target address at all

---

What is one approach to recovery complexity after a misprediction?

* Holding results in scratch registers until the branch is confirmed
- Deleting the entire instruction cache immediately
- Increasing the pipeline to twenty stages permanently
- Disabling the branch predictor for the rest of execution

---

What happens to branch cost when predictor accuracy drops from 95% to 90%?

* The branch cost roughly doubles
- The branch cost stays exactly the same
- The branch cost is cut in half
- The branch cost becomes negligible

---

type: tf

Branch prediction lets the fetch unit keep working instead of stalling until a branch resolves.

- true

---

type: tf

A correct branch prediction still causes 3-4 stall cycles in the pipeline.

- false

---

type: tf

Small drops in predictor accuracy only slightly affect overall branch cost.

- false

---

type: freeform
points: 3

Briefly describe why branch predictor accuracy is considered critical to overall processor performance
