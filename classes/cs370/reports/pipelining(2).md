PIPELINING MECHANICS
Instruction-Level Parallelism in the CPU
Based on Andrew S. Tanenbaum, Structured Computer Organization — Section 2.1.5, pp. 65–67

Core Definition
Pipelining is a form of instruction-level parallelism that splits
5
instruction execution into several sequential hardware stages, so
multiple instructions are in different stages of completion at the
same moment.
stages of hardware
working in parallel
on the classic pipeline
(Fig. 2-4)
Instruction-level parallelism (within one instruction stream) is one of two general forms of parallelism Tanenbaum identifies — the other being processor-level
parallelism (multiple CPUs).
2

Architectural	Blueprint
The five-stage pipeline (Tanenbaum, Fig. 2-4a)
S1  Instruction S2  Instruction S3  Operand S4  Instruction S5  Write
| Fetch |     | Decode |     | Fetch |     | Execution |     | Back |
| ----- | --- | ------ | --- | ----- | --- | --------- | --- | ---- |
Fetches instruction from memory into a Determines instruction type and Locates operands from registers or Runs operands through the datapath Writes the result to the destination
| buffer |     | operands needed |     | memory |     |     |     | register |
| ------ | --- | --------------- | --- | ------ | --- | --- | --- | -------- |
|        | →   |                 | →   |        | →   |     | →   |          |
Extension: Superscalar / Dual Pipelines (Fig. 2-5)
A single shared instruction-fetch unit feeds pairs of instructions into two parallel five-stage pipelines, each with its own ALU. The instructions must not
conflict over resources or depend on each other's results to run simultaneously (e.g., the Pentium's u-pipeline and v-pipeline).
Diagram tip: draw five labeled boxes in a horizontal row connected by arrows (as above) — this conveyor-belt layout is what makes the cake-factory analogy on the next slides click
visually.
3

Step-by-Step	Operation
Tracking 4 instructions through the pipeline over 5 clock cycles (Fig. 2-4b)
|     | Cycle 1 | Cycle 2 | Cycle 3 | Cycle 4 | Cycle 5 | Cycle 6 |
| --- | ------- | ------- | ------- | ------- | ------- | ------- |
| S1  | I1      | I2      | I3      | I4      | I5      | I6      |
|     |         | I1      | I2      | I3      | I4      | I5      |
S2
|     |     |     | I1  | I2  | I3  | I4  |
| --- | --- | --- | --- | --- | --- | --- |
S3
|     |     |     |     | I1  | I2  | I3  |
| --- | --- | --- | --- | --- | --- | --- |
S4
|     |     |     |     |     | I1  | I2  |
| --- | --- | --- | --- | --- | --- | --- |
S5
By Cycle 5: S5 writes back Instruction 1's result (fully complete) while S1–S4 simultaneously fetch, decode, and process Instructions 2–5. From this
point on, one instruction finishes every clock cycle — even though each instruction individually still takes 5 cycles to pass through the whole pipeline.
4

Advantages
Higher throughput, without making any single instruction faster
The Cake-Factory Analogy
500 MIPS
1 Worker 1: places an empty box on the belt
Actual throughput with a 2 nsec clock cycle — not the naive 100 MIPS
guess from a 10 nsec instruction latency (5 stages × 2 nsec each)
2 Worker 2: puts a cake in the box
3 Worker 3: closes and seals the box
Latency vs. Bandwidth Trade-off
4 Worker 4: labels the box
Latency = n × T (5 stages × 2 nsec = 10 nsec per instruction). Bandwidth ≈
1000/T MIPS. Pipelining doesn't shorten one instruction — it completes a
new one every cycle.
5 Worker 5: removes the box for shipment
No single worker builds a whole box — but a finished box comes off the belt every
10 seconds, not every 50.
5

Bottlenecks
The inherent limits pipelining runs into (pp. 64–67)
Resource Conflicts Register Dependencies
Instructions aren't always issued strictly in program order, because If Instruction 1 sets a register and Instruction 2 reads that same register,
“some needed resource might be busy.” If two instructions need the “great care must be taken” so Instruction 2 doesn't read it before it
same hardware unit at once, one must wait. holds the correct value — this requires “a lot of bookkeeping.”
(Formally: a structural hazard — though Tanenbaum doesn't use that (Formally: a data hazard.)
term at this point.)
Scope note
The formal structural / data (RAW) / control hazard taxonomy, with named terms and stall cycles, appears later in Chapter 4's Mic-3 pipeline design (pp. ~297–
300) — not on pp. 65–67. Pages 65–67 themselves only establish the resource-conflict and register-dependency issues above; mention the Chapter 4 material
only if your assignment allows clearly-flagged outside references.
6

Real-World Example & Conclusion
The Intel Pentium
Starting with the 486, Intel began building data pipelines into its CPUs. The original Pentium used two five-stage pipelines in parallel: the u-
pipeline (any Pentium instruction) and the v-pipeline (simple integer instructions only). Measurements showed Pentium code optimized to pair
instructions ran twice as fast on integer programs as a 486 at the same clock rate — a gain attributed entirely to the second pipeline.
Conclusion
Pipelining became a foundational technique behind essentially every modern CPU's performance gains — not by making any single
instruction faster, but by keeping all pipeline stages simultaneously busy on different instructions, dramatically raising overall
instruction throughput per second.
7