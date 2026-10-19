A compiler hoists a compare-and-branch above independent arithmetic that does not feed the condition. What does that earlier branch buy the scheduler?

* A shorter chain into the branch, and more instructions that can run in parallel
- Removal of the branch from the control-flow graph
- A stall of every instruction that originally followed the branch
- Conversion of the branch itself into a basic block

---

The predictor says a branch is not taken, and the core starts the fall-through loads before the condition is ready. What is that execution called?

* Speculative execution: work proceeds on a path whose outcome is still unknown
- Confirmed execution: work starts only after every earlier branch has resolved
- Basic-block scheduling: instructions move only inside a block whose exits are known
- Poisoning: every instruction after the branch is discarded before it runs

---

Speculation has already produced results, and the branch then resolves. What is done with those results?

* They are committed if the speculated path was right and discarded if it was wrong
- They are committed whether or not the speculated path was right
- They are discarded whether or not the speculated path was right
- They are stored permanently as poison bits whether or not the path was right

---

A load runs speculatively, before the branch condition is known, and its address is unmapped. Why is that risky?

* It may raise a page fault for a path that was never supposed to execute
- It always returns a numerically wrong value even when the path is correct
- It halts the processor before the branch condition can be resolved
- It makes the branch condition impossible to compute

---

A speculated instruction is about to signal an exceptional condition. What constraint must that exception satisfy?

* It must have no irrevocable side effect until the speculation is confirmed
- It must be delivered to the operating system before the branch resolves
- It must be ignored for the rest of the program once speculation has started
- It must freeze the control-flow graph so no further blocks are built

---

A speculated divide would raise an exception, but the branch has not resolved yet. What does the hardware do instead of raising it now?

* It sets the poison bit on the destination register and lets speculation continue
- It raises the exception immediately, even though the path may be wrong
- It deletes the instruction from its basic block and fetches the other path
- It forces the branch to resolve as mispredicted so the exception cannot occur

---

A register was poisoned during speculation, and no later instruction on the confirmed path reads it. What happens to the deferred exception?

* Execution continues, and the exception is not raised
- The exception is raised as soon as the poison bit is set
- The processor stalls until some instruction reads the poisoned register
- The poison bit is copied into every architectural register

---

type: tf

A straight-line fragment has one entry, one exit, and a conditional branch in the middle that can leave early. That fragment is still a single basic block.

- false

---

type: tf

Hoisting a branch earlier, ahead of independent instructions that do not feed its condition, can expose more instruction-level parallelism.

- true

---

type: tf

Results produced by speculative execution are committed even when the branch prediction was wrong.

- false
