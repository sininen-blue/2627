A compiler hoists a compare-and-branch above arithmetic that leaves the condition unchanged. What does that earlier branch buy the scheduler?

* A shorter dependence chain, and more instructions that run in parallel
- Removal of that branch from the program's control-flow graph
- A stall of the instructions that originally followed the branch
- Conversion of that branch into a basic block of its own

---

The predictor selects the fall-through path. The core starts those loads before the condition is ready. What is that execution called?

* Speculative execution: work runs on a path whose outcome is still unknown
- Confirmed execution: work starts after the earlier branches have resolved
- Basic-block scheduling: instructions move inside a block with known exits
- Poisoning: instructions after the branch are discarded before they run

---

Speculation has produced results, and the branch then resolves. What is done with those results?

* Commit them when the path was right, and discard them when it was wrong
- Commit them on a right path and also commit them on a wrong path
- Discard them on a right path and also discard them on a wrong path
- Store them as poison bits on both a right path and a wrong path

---

A speculative load uses an unmapped address while the branch condition is still unknown. Why is that risky?

* The load can raise a page fault on a path that later proves wrong
- The load returns a wrong number on a path that later proves right
- The load stops the processor before the branch condition is computed
- The load overwrites the branch condition with the faulting address

---

A speculated instruction is about to signal an exception. What constraint must that exception satisfy?

* All of its side effects remain reversible until speculation is confirmed
- It reaches the operating system before the branch has resolved
- It is dropped for the rest of the program once speculation starts
- It freezes the control-flow graph and leaves later blocks unbuilt

---

A speculated divide would raise an exception. The branch is still unresolved. What does the hardware do?

* It sets the poison bit on the destination and lets speculation continue
- It raises the exception immediately, while the path is still unresolved
- It deletes the instruction from its basic block and fetches the other path
- It marks the branch mispredicted so the exception stays off that path

---

On the confirmed path, a poisoned register goes unread. What happens to the deferred exception?

* Execution continues, and that deferred exception stays latent
- The exception is raised as soon as the poison bit is set
- The processor stalls until some instruction reads that register
- The poison bit is copied into the other architectural registers

---

The confirmed path reads a register that was poisoned during speculation. Which response fits?

* Raise the deferred exception, because the bad value is now consumed
- Continue, because confirmation clears a poison bit before the read
- Discard the whole path, because one poison bit voids the confirmed block
- Copy the poison bit into the link register and keep executing

---

type: tf

A straight-line fragment has one entry, one exit, and a conditional branch in the middle that can leave early. That fragment is still a single basic block.

- false

---

type: freeform
points: 3

A scheduler wants to move instructions across a conditional branch in the middle of a straight-line fragment. Explain why a basic block is limited to one entry and one exit, and what limit that places on the move.
