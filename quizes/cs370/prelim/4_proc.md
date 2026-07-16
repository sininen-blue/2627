You are designing a CPU and need to choose how many registers to include. Adding more registers increases chip area and cost but reduces how often the CPU must read from main memory. Which RISC principle directly addresses this trade-off?

- Provide abundant registers to minimize waiting on slow system memory
- Keep instructions at a fixed length for easy decoding
- Maximize the issue rate through optimized pipelining
- Isolate memory access to only explicit LOAD and STORE instructions

---

A CPU currently takes 2 nanoseconds for its data path cycle (register read → ALU operate → register write). What is the maximum clock speed this CPU can achieve?

- 500 MHz
- 200 MHz
- 2 GHz
- 1 GHz

---

A CISC processor needs to add 1 to a value stored in memory. It has a single instruction `INC [addr]` that takes 8 clock cycles due to microcode interpretation. A RISC processor would need three instructions (`LOAD`, `ADD`, `STORE`) each taking 1 cycle. Which processor completes the operation faster?

- RISC, because 3 cycles is faster than 8 cycles
- CISC, because one instruction is inherently faster than three
- RISC, because it has more registers to store intermediate values
- CISC, because microcode execution runs at a higher clock frequency

---

A team is designing a processor for a space probe. The mission will last 15 years, and the processor must be patched after launch to fix a bug in the multiplication instruction. Which design choice best supports this requirement?

- Use microprogramming so the multiplication logic can be fixed via a microcode update
- Use a pure RISC design so all instructions execute directly in hardware
- Use a single-cycle CISC design to minimize total instruction count
- Use a hardwired control unit to eliminate software layers entirely

---

IBM wants to sell both a cheap low-end mainframe and an expensive high-end mainframe that run the exact same software. What innovation made this possible?

- Microprogramming, which let different machines share one architecture
- RISC design, which reduced instruction complexity across all models
- The omnibus, which standardized component connections between models
- VLSI technology, which made it cheap to replicate the same chip at different sizes

---

You are writing a multiply function for a RISC processor that has no `MULT` instruction. You have registers `R1` and `R2` containing the operands. Which sequence of instructions correctly computes their product?

- A loop adding R2 into a result register while decrementing R1
- A single instruction `MULT R1, R2` that the ALU executes directly
- A memory-to-memory copy followed by a hardware multiplication signal
- A microcode call that invokes the hidden multiplier circuit

---

A processor designer notices that 90% of instructions in typical programs are simple loads, stores, and adds, while the remaining 10% are complex operations. Based on this observation, should they design a CISC or RISC processor?

- RISC, because optimizing the fast path for simple instructions yields better overall performance
- CISC, because handling the complex 10% efficiently is more important for correctness
- CISC, because simple instructions already execute at maximum speed on any design
- RISC, because fixed-length instructions prioritize decoding speed over complexity

---

An engineer needs to add a new instruction to an existing processor. In a microprogrammed CISC design, what is the estimated cost of adding this instruction?

- Low, because they can extend the microcode without redesigning silicon
- High, because a new instruction requires a full mask set for the ALU
- Impossible, because the instruction set is frozen at manufacturing time
- Moderate, because they must update the compiler and all documentation

---

A student claims that because hardware and software are logically equivalent, it does not matter which one implements a feature. Which statement best evaluates this claim?

- It matters because cost, speed, reliability, and change frequency differ between the two
- It is correct; any function can be swapped between hardware and software with minimal trade-offs
- It is wrong because hardware only executes operations wired into its circuits
- It is correct only for arithmetic operations, excluding control logic

---

A processor has a data path that takes 1 nanosecond per cycle. You can either add a complex instruction that takes 5 cycles in microcode, or implement it directly in hardware for 1 cycle but increase the data path to 1.2 nanoseconds. Which option gives better performance for that instruction?

- Hardware: 1 cycle at 1.2 ns finishes faster than 5 cycles at 1 ns
- Microcode: 5 cycles at 1 ns finishes faster than 1 cycle at 1.2 ns
- The hardware implementation, because it eliminates the need for microcode entirely
- The microcode implementation, because longer data paths cause pipeline hazards

---

An x86 processor internally decodes a complex CISC instruction into several micro-operations that are then executed on a RISC-like core. What does this design reveal about the modern CPU landscape?

- Modern processors are hybrids combining a CISC front-end with a RISC-like core
- RISC architectures failed to achieve commercial success outside of embedded systems
- CISC instructions are now executed directly without a decoding step
- Microprogramming has been completely eliminated from all modern processors

---

A programmer writes `A = B + C * D` in a high-level language. A CISC compiler emits one instruction; a RISC compiler emits five. Which of the following is true about the RISC version?

- Each RISC instruction executes in fewer clock cycles on average, so total time can still be lower
- The RISC version will be slower because it requires more memory fetches
- The RISC version is actually one instruction because the ALU handles it as a fused multiply-add
- The RISC compiler must have generated inefficient code by missing optimization opportunities

---

You are choosing a processor for a battery-powered smartphone. Which architectural choice is most aligned with modern industry practice?

- An ARM processor, because RISC design powers the entire mobile ecosystem
- An x86 processor, because desktop dominance guarantees the best power efficiency
- A CISC processor, because complex instructions reduce the total number of instructions executed
- A VLIW processor, because compile-time scheduling eliminates runtime overhead

---

A company's legacy software was compiled for a CISC architecture that is now obsolete. They want to run it on a new RISC machine without modifying the binary. What approach allows this?

- Write an emulator that interprets legacy CISC instructions on RISC hardware
- Recompile the source code with a RISC-targeting compiler
- Microprogram the RISC processor to accept CISC instructions directly
- Add a CISC coprocessor to the RISC chip as a separate core

---

During the Fetch stage of the instruction cycle, what specifically happens to the Program Counter?

- It is updated to point to the next sequential instruction
- It is copied into the Instruction Register for decoding
- It is incremented by the ALU to produce the result address
- It is reset to zero to begin a new program load

---

A RISC processor has 32 general-purpose registers. A CISC processor has 8. A program spends 20% of its time spilling register values to memory on the RISC machine and 50% on the CISC machine. Assuming all other factors are equal, which processor likely performs better on this program?

- RISC, because fewer register spills mean less time waiting on memory
- CISC, because 8 registers are sufficient if instructions can operate on memory directly
- RISC, because 32 registers means the clock cycle is shorter
- CISC, because spilling to memory is faster on a CISC architecture

---

A startup is building a custom accelerator for AI inference. They want to minimize design complexity and leverage open standards. Which instruction set architecture should they choose?

- RISC-V, an open-standard RISC ISA expanding across the industry
- x86, because it has the largest software ecosystem and toolchain support
- ARM, because it dominates mobile and offers the best licensing terms
- CISC, because complex matrix instructions reduce code size for neural networks

---

A computer fetches an instruction from address `0x1000`, decodes it, and discovers it is a branch that needs to jump to `0x2000`. At what point in the instruction cycle does the Program Counter change from `0x1001` to `0x2000`?

- During Execute when the control unit updates the PC with the branch target
- During the Fetch phase when the instruction is copied into the Instruction Register
- During the Decode phase when the CPU identifies it as a branch instruction
- Before the Fetch phase when the branch prediction unit pre-loads the target

---

A RISC processor follows the principle that only LOAD and STORE instructions interact with memory. What is the consequence of this design rule?

- All arithmetic operands must already be in registers before the operation starts
- Memory access is slower because every access goes through the register file
- The compiler struggles to optimize memory references in inner loops
- The ALU must contain its own dedicated cache for arithmetic operands

---

You are comparing two CPUs: CPU A completes the data path cycle in 0.5 ns; CPU B completes it in 1 ns but can execute two instructions per cycle. Which processor has higher theoretical throughput?

- CPU A: 0.5 ns per instruction gives 2 billion instructions per second
- CPU B: 2 instructions per cycle at 1 ns gives 2 billion instructions per second
- CPU A, because shorter clock cycles result in higher throughput
- CPU B, because dual-issue doubles the effective clock speed to 2 GHz
