What happens during the fetch stage of the instruction execution cycle?

- The instruction at the PC's memory address is copied into the IR
- The PC is updated to point to the next sequential instruction
- The instruction is decoded to determine its type and required data
- The ALU performs the required calculation on register operands

---

What was Maurice Wilkes' contribution to processor design in 1951?

- Microprogramming, using a built-in interpreter to break complex instructions into simpler micro-instructions
- The RISC architecture, simplifying instruction sets to single-cycle hardware execution
- The Harvard architecture, separating instruction and data memory into distinct pathways
- The IBM System/360, establishing the term computer architecture for the industry

---

According to the hardware-software equivalency principle, what is a software program that mimics the fetch-decode-execute cycle called?

- An interpreter or an emulator
- A compiler or an assembler
- A microcode or firmware layer
- A virtual machine or hypervisor

---

How does memory access differ between CISC and RISC architectures?

- CISC permits many instructions to interact with memory, while RISC restricts memory access to explicit LOAD and STORE instructions
- CISC allows only registers to interact with memory, while RISC permits direct memory-to-memory arithmetic operations
- CISC uses a unified memory bus for instructions and data, while RISC maintains separate dedicated memory pathways
- CISC caches memory operands directly in the ALU, while RISC transfers memory data through the control unit

---

Why did IBM introduce the term "architecture" to describe the System/360 family?

- Microprogramming allowed machines at different price points to run the exact same software
- The System/360 standardized a universal instruction format that all manufacturers had to license
- IBM needed a new term to describe the physical transistor layout on their mainframe chips
- The shift to microcode required separating the logical design from the physical implementation

---

What directly determines the maximum clock speed of a CPU in the data path model?

- The time for registers to feed the ALU, execute, and store the result
- The number of transistors that can switch states simultaneously within one clock cycle
- The bandwidth of the bus connecting the CPU to main memory for instruction fetching
- The latency of the control unit in decoding complex macro-instructions into micro-instructions

---

How do modern x86 processors synthesize both CISC and RISC design philosophies?

- They use a CISC outer shell that decodes legacy instructions into internal RISC-like micro-ops
- They dynamically switch between CISC and RISC execution modes depending on the instruction type
- They implement pure CISC logic on performance cores and pure RISC logic on efficiency cores
- They translate RISC instructions into CISC microcode before dispatching to execution units

---

What are the roles of the Program Counter and Instruction Register in the Von Neumann architecture?

- The PC points to the next instruction to fetch, and the IR holds the current instruction during decode and execute
- The PC stores the result of ALU operations, and the IR holds the memory address of the next data word
- The PC tracks the total number of executed clock cycles, and the IR buffers data between the CPU and the bus
- The PC holds decoded micro-instructions for execution, and the IR stores operands for ALU calculations

---

Why did RISC architectures outperform CISC for the same task despite requiring more lines of code?

- RISC instructions are uniform and simple, often executing in a single cycle, enabling faster overall throughput
- RISC processors operate at significantly higher clock frequencies due to smaller transistor counts
- RISC eliminates the need for a control unit entirely, reducing pipeline latency and complexity
- RISC stores instructions in faster on-chip memory rather than fetching them from main system memory

---

What was the dominant state of microprocessor design by the late 1970s?

- Almost all microprocessors used microcode to handle complex instructions
- Hardware bugs were frozen at fabrication time and required silicon revision to fix
- Instruction sets became smaller and more uniform across all processor families
- The semantic gap between machine code and high-level languages narrowed significantly
