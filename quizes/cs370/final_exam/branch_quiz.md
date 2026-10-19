A fetch stage has seen this conditional branch before and wants to redirect the PC in the same cycle. Which fields does that Branch Target Buffer entry hold?

* A valid bit, a tag, and the branch target address
- A valid bit, a tag, and a 2-bit taken or not-taken state
- A full copy of every instruction that follows the branch
- The measured cycle count of each pipeline stage

---

A predictor must remember whether one particular branch has recently been taken. Which fields does that Branch History Table entry hold?

* A valid bit, a tag, and a 2-bit prediction state
- A valid bit, a tag, and the branch target address
- A complete trace of every instruction the core has retired
- Only the current program counter, with no tag or state

---

A loop-back branch is taken on every iteration, then misses once when the loop exits. Why does a 2-bit counter still predict taken after that single miss, while a 1-bit predictor would flip?

* The predicted direction flips only after two wrong guesses in a row
- The extra bit lets the BTB store twice as many target addresses
- The extra bit moves the lookup from fetch into a later pipeline stage
- The extra bit removes the branch from the pipeline entirely

---

Dynamic tables miss on a branch the core has never seen. Which cold-start rule matches the usual static fallback?

* Predict a backward branch taken and a forward branch not taken
- Predict every branch not taken, whether it jumps backward or forward
- Predict every branch taken, whether it jumps backward or forward
- Predict a forward branch taken and a backward branch not taken

---

A virtual call, or a switch compiled as a jump through a register, can legally land at many addresses. Why does a conventional BTB still miss the target often?

* The BTB keeps a single target for that instruction, but the instruction has many
- Those indirect jumps are left out of the branch history table by design
- Those indirect jumps finish resolving during fetch, so no target is needed
- Those indirect jumps have no target address for the predictor to supply

---

Instructions after a predicted branch have already computed results. Which recovery approach keeps those results out of the architectural registers until the branch is confirmed?

* Hold the results in scratch registers and copy them out only if the prediction was right
- Invalidate the entire instruction cache as soon as the branch is predicted
- Lengthen the pipeline to a fixed twenty stages so recovery is never required
- Disable the predictor for the rest of the program after the first misprediction

---

Each misprediction costs several pipeline cycles. Accuracy falls from 95% to 90%, so the miss rate goes from 5% to 10%. What happens to the average cost of a branch?

* The average branch cost roughly doubles
- The average branch cost stays exactly the same
- The average branch cost is cut in half
- The average branch cost becomes negligible

---

type: tf

A correctly predicted branch still inserts 3 to 4 stall cycles before fetch can follow the predicted path.

- false

---

type: tf

Dropping predictor accuracy from 95% to 90% changes average branch cost only slightly.

- false

---

type: freeform
points: 3

A core's branch predictor falls from 95% accuracy to 90%, and each miss costs several pipeline cycles. Explain why that accuracy loss is treated as critical to overall processor performance rather than as a minor slowdown.
