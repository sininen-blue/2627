Which fields does a Branch Target Buffer entry hold?

* A valid bit, a tag, and the branch target address
- A full copy of every instruction that follows the branch
- The measured cycle count of each pipeline stage
- The opcode, the condition flags, and the link address

---

Which fields does a Branch History Table entry hold?

* A valid bit, a tag, and a 2-bit prediction state
- A complete trace of every instruction the core retired
- The opcode, the condition flags, and a link address
- The program counter and the current pipeline cycle

---

A loop-exit branch is mispredicted once after a run of taken outcomes. Why does a 2-bit counter still predict taken?

* The direction flips only after two wrong guesses in a row
- The extra bit stores twice as many targets for that branch
- The extra bit moves the lookup into a later pipeline stage
- The extra bit removes that branch from the pipeline entirely

---

Dynamic tables miss on a branch with no saved history. Which rule is the static fallback?

* Predict a backward branch taken and a forward branch as fall-through
- Predict a backward branch as fall-through and a forward branch taken
- Predict both a backward branch and a forward branch as fall-through
- Predict both a backward branch and a forward branch as taken

---

Which limit makes one Branch Target Buffer entry a poor fit for a virtual call?

* It stores one target, but the call has several legal targets
- It omits virtual calls from the history table by design
- It resolves the call during fetch, so a stored target is unused
- It supplies the opcode instead of a target address for the call

---

Instructions after a predicted branch have computed results. Which recovery keeps those results out of the architectural registers until the branch is confirmed?

* Hold the results in scratch registers until the prediction is confirmed
- Invalidate the instruction cache as soon as the branch is predicted
- Lengthen the pipeline to twenty stages so recovery can be skipped
- Disable the predictor for the rest of the program after one miss

---

A misprediction has a fixed cycle penalty. The miss rate rises from 5% to 10%. What happens to the average cost of a branch?

* The average branch cost doubles
- The average branch cost stays the same
- The average branch cost is cut in half
- The average branch cost falls to zero

---

type: tf

A correctly predicted branch still inserts 3 to 4 stall cycles before fetch can follow the predicted path.

- false

---

type: freeform
points: 3

Explain why a cold-start predictor treats a backward branch as taken and a forward branch as fall-through. What program pattern makes that a reasonable default?
