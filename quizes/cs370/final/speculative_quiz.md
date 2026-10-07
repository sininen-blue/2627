What is a basic block in instruction reordering?

* A linear sequence of code with one entry and one exit point
- A sequence of code containing multiple internal branches
- A loop that repeats until a condition becomes false
- A single machine instruction executed in isolation

---

What does a basic block NOT contain internally?

* Control structures such as branches or loops
- Arithmetic instructions like ADD or MUL
- Load and store instructions
- A single entry point

---

What role do basic blocks play in program analysis?

* They form the building units for instruction reordering and analysis
- They replace the need for a control-flow graph entirely
- They eliminate the need for branch prediction
- They store the final committed register values

---

What is the goal of reordering instructions within a basic block?

* Higher throughput and lower execution latency
- Eliminating the need for basic blocks entirely
- Converting all branches into basic blocks
- Removing all load and store instructions

---

What effect does moving a branch earlier have on reordering?

* It shortens dependencies and exposes more parallel execution opportunities
- It removes the branch from the control-flow graph
- It forces every following instruction to stall
- It converts the branch into a basic block

---

What is speculative execution?

* Executing instructions beyond a branch before its outcome is known
- Executing instructions only after every branch has resolved
- Reordering instructions within a single basic block only
- Discarding all instructions that follow a branch

---

What happens to speculative results after branch resolution?

* They are either committed or discarded
- They are always committed regardless of the outcome
- They are always discarded regardless of the outcome
- They are stored permanently as poison bits

---

What benefit does speculative execution provide?

* Better resource utilization and improved performance
- Guaranteed elimination of all branch instructions
- Removal of the need for a control-flow graph
- A permanent reduction in the number of basic blocks

---

Why can a speculative load be risky?

* It may raise a page fault before the branch condition is known
- It always produces an incorrect arithmetic result
- It immediately crashes the processor
- It prevents the branch from ever resolving

---

What requirement must exceptions from speculative instructions satisfy?

* They must have no irrevocable side effects
- They must always be raised immediately
- They must be ignored permanently
- They must stop the entire control-flow graph

---

What happens when a speculative instruction would raise an exception during speculation?

* The poison bit on the destination register is set instead
- The exception is raised immediately regardless of speculation
- The instruction is removed from the basic block
- The branch is immediately resolved as incorrect

---

What happens if a poisoned value is never used?

* Execution continues without raising the exception
- The exception is raised immediately
- The processor halts until the value is poisoned
- The poison bit is copied to every other register

---

type: tf

A basic block can contain an internal conditional branch.

- false

---

type: tf

Moving a branch earlier in the instruction stream can expose more parallelism.

- true

---

type: tf

Speculative execution always commits its results regardless of whether the branch prediction was correct.

- false
