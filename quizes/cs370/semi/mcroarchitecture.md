What is the main job of the microarchitecture level?

- To create and implement the Instruction Set Architecture using digital logic
- To write application software that runs on top of the operating system
- To design the physical layout of memory chips on a circuit board
- To define the bus protocol used between the CPU and I/O devices

---

Why can Intel and AMD chips run the same x86-64 software despite having different internals?

- The ISA is a contract with software, while the microarchitecture can differ underneath
- Both companies build chips using identical pipeline depths and cache hierarchies internally
- The microarchitecture defines a separate instruction set architecture for each chip
- Software compiled for one is automatically translated for the other at runtime

---

What does the Program Counter (PC) represent in the microprogram's state?

- The address of the next instruction to be executed
- The current value on top of the operand stack
- The most recently fetched byte of the current instruction
- The address currently being sent out to memory

---

What does the Memory Address Register (MAR) hold?

- The address about to be sent to memory
- The data being read from or written to memory
- The address of the next instruction to fetch
- The most recently fetched byte of an instruction

---

What does the Memory Buffer Register (MBR) hold?

- The most recently fetched byte of an instruction
- The address about to be sent to memory
- The current top value of the operand stack
- The data being read from or written to memory

---

What are the two main fields typically found in an IJVM instruction?

- An opcode and one or more operands
- A program counter and a stack pointer
- An ALU function code and a bus address
- A memory address and a data value

---

What are the three steps of the fetch-decode-execute cycle?

- Fetch the instruction, decode the opcode, execute the operation
- Decode the opcode, fetch the operand, store the result
- Load the register, compute the ALU result, increment the PC
- Read the memory address, write the data, assert the control line

---

What part of the CPU contains the ALU, inputs, and outputs?

- The data path
- The control unit
- The memory bus
- The interrupt controller

---

What do the ENA and ENB control lines do in the IJVM ALU?

- Enable the A and B inputs to the ALU
- Invert the A and B inputs to the ALU
- Select between addition and subtraction operations in the ALU
- Drive the ALU output onto the C bus

---

What happens to the CPU's maximum clock speed if one component in the data path becomes slower?

- The entire CPU's maximum clock speed drops as a result
- Only the instructions using that component slow down noticeably
- The clock speed is unaffected since components run in parallel
- The ALU automatically compensates with a faster cycle elsewhere

---

How do the data path's implicit subcycles differ from a truly asynchronous bus?

- They occur within one synchronous clock period rather than by handshake signals
- They require a separate clock signal for each subcycle stage
- They eliminate the need to account for propagation delay entirely
- They use MSYN and SSYN handshake signals to coordinate timing
