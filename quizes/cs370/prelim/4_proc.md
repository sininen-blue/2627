You are designing a CPU and need to choose how many registers to include. Adding more registers increases chip area and cost but reduces how often the CPU must read from main memory. Which RISC principle directly addresses this trade-off?

- Provide abundant registers to minimize waiting on slow system memory
- Keep all instructions at a single fixed length for straightforward decoding
- Maximize the overall instruction throughput through deeply optimized pipelining
- Isolate memory access to only explicit LOAD and STORE instructions

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
- Use a single-cycle CISC design to minimize the total number of instructions
- Use a hardwired control unit to eliminate all software abstraction layers

---

IBM wants to sell both a cheap low-end mainframe and an expensive high-end mainframe that run the exact same software. What innovation made this possible?

- Microprogramming, which let different machines share one architecture
- RISC design, which reduced instruction complexity across all models
- The omnibus, which standardized component connections between models
- VLSI technology, which made it cheap to replicate the same chip at different sizes

---

You are writing a multiply function for a RISC processor that has no `MULT` instruction. You have registers `R1` and `R2` containing the operands. Which sequence of instructions correctly computes their product?

- A loop adding R2 into a result register while decrementing R1
- A single `MULT R1, R2` instruction that the ALU executes directly in hardware
- A memory-to-memory copy followed by a hardware multiplication signal
- A microcode subroutine call that invokes the hidden hardware multiplier

---

A processor designer notices that 90% of instructions in typical programs are simple loads, stores, and adds, while the remaining 10% are complex operations. Based on this observation, should they design a CISC or RISC processor?

- RISC, because of better overall performance
- CISC, because handling the complex instructions efficiently is more important for speed
- CISC, because simple instructions already execute at high speeds
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
- Choose the hardware implementation, because it eliminates the need for microcode entirely
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

During the Fetch stage of the instruction cycle, what specifically happens to the Program Counter?

- It is updated to point to the next sequential instruction
- It is copied into the Instruction Register for decoding
- It is incremented by the ALU to produce the result address
- It is reset to zero to begin a new program load

---

A startup is building a custom accelerator for AI inference. They want to minimize design complexity and leverage open standards. Which instruction set architecture should they choose?

- RISC-V, an open-standard RISC ISA expanding across the industry
- x86, because it has the largest software ecosystem and toolchain support
- ARM, because it dominates mobile and offers the best licensing terms
- CISC, because complex matrix instructions reduce code size for neural networks
