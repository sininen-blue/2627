# Essay Questions

## Arithmetic Circuits

1. Explain why a half adder cannot be used by itself to add multi-bit binary numbers, and describe how the full adder resolves this limitation. In your answer, identify exactly what additional input and output the full adder has, and explain how full adders are connected to form a ripple-carry adder.

2. A ripple-carry adder is simple to build but has a worst-case delay that grows linearly with the number of bits. Explain why this delay exists, then describe how a carry-select adder reduces it. Be sure to explain what extra hardware a carry-select adder requires and why that hardware is the tradeoff for its speed improvement.

3. Explain why two's complement is the standard way computers represent signed integers. Your answer should address how negation works in two's complement, why ordinary binary addition works without modification for both positive and negative numbers, and why this matters for the design of arithmetic circuits like adders and ALUs.

## Memory Circuits

4. Trace the evolution from a basic SR latch to a D flip-flop. Explain the instability problem in the SR latch, how the clocked D latch resolves it, and why a flip-flop (edge-triggered) is often preferred over a latch (level-triggered) for reliably sampling a signal at one particular instant.

5. Describe how eight D flip-flops are combined to build an 8-bit register, and explain why a single clock or clear signal needs an amplifying inverter before it can drive all eight flip-flops. Then explain how this same technique can be used to build wider registers, such as a 32-bit register from four 8-bit registers.

## Memory Organization

6. Using the 4-word by 3-bit memory example, explain the role of each of the following: the address lines, the CS (Chip Select) signal, the RD (Read/Write) signal, and the decoder built from the word-select AND gates. Your answer should describe what must be true of these signals for a read to occur and what must be true for a write to occur.

7. Compare how a 512K x 8 memory chip and a 4096K x 1 memory chip are each addressed. Explain why the 4096K x 1 chip is organized as an n x n matrix addressed by row and column (using RAS and CAS) rather than with a single flat address, and explain the tradeoff this organization introduces.

8. Compare SRAM and DRAM in terms of how each stores a bit, their relative speed, density, and cost, and why each is used where it is (e.g., SRAM in CPU caches versus DRAM as main memory). Then explain why DRAM requires periodic refreshing while SRAM does not.

9. Trace the evolution from ROM to PROM to EPROM to EEPROM, explaining what limitation each new technology solved compared to its predecessor. Conclude by explaining how modern flash memory relates to EEPROM technology.

## CPUs and Buses

10. Explain the master/slave relationship on a bus, using a DMA controller as an example. Your answer should describe what it means for a device to be a bus master versus a bus slave, why the rule "memory can never be a master" must always hold, and what role bus drivers, receivers, and transceivers play in this relationship.

11. Compare synchronous and asynchronous buses. Explain how each determines when a data transfer is complete, why a synchronous bus's speed is limited to whole clock cycles even when the memory responds sooner, and why an asynchronous bus's handshake protocol (MSYN/SSYN) avoids this limitation. Use the tradeoffs in design complexity and backward compatibility to support your answer.

12. Explain the two main ways to increase bus bandwidth: decreasing bus cycle time and increasing bus width. Describe why decreasing cycle time introduces bus skew, and explain why real designs such as DDR memory typically combine a wider bus with a moderate increase in clock speed rather than pushing either approach to its limit alone.

13. Compare centralized and distributed bus arbitration. Explain how daisy-chain priority works in each case, why the device's physical position in the chain determines its priority, and what tradeoffs exist between the two schemes in terms of single points of failure, hardware cost, and flexibility.

## Microarchitecture

14. Explain the relationship between the Instruction Set Architecture (ISA) and the microarchitecture, using Intel and AMD's differing implementations of the x86-64 ISA as an example. Your answer should explain why the same ISA can be implemented by very different microarchitectures while still running the same software correctly.

15. Walk through the fetch-decode-execute cycle for a single IJVM instruction (e.g., the ADD opcode), explaining what happens to the PC, MBR, and the operand stack at each of the three steps. Explain why this repeating cycle is a useful abstraction for implementing a microprogram.

16. The IJVM data path fixes the ALU's left input to come only from the H latch rather than from a full A bus. Explain what limitation this introduces, why a designer might accept this limitation, and how it differs from data paths that have both an A bus and a B bus.

17. Explain why the total clock cycle time of a data path must be greater than or equal to the sum of the propagation delays of every stage within that cycle. Using the example delays given in the reading (1 ns, 2 ns, 3 ns, and 1 ns), explain what happens to the CPU's maximum clock speed if any single one of these delays increases, and why.

## Synthesis

18. Both ripple-carry adders (Arithmetic Circuits) and ripple-carry style ALUs (Microarchitecture) rely on a carry signal propagating from one stage to the next. Explain this shared principle, and describe one hardware technique from either topic that could reduce the delay this ripple introduces.

19. Bus arbitration (CPUs and Buses) and memory chip addressing (Memory Organization) both use a decoder-like structure to select exactly one device or word out of many. Compare how a decoder selects one memory word using address lines to how a centralized arbiter selects one bus master using a daisy chain, and explain why only one winner can be chosen in each case.

20. Explain how the concept of "timing within a single cycle" appears at two different levels: the data path timing in a microarchitecture (Microarchitecture) and the synchronous bus timing used to read from memory (CPUs and Buses). In both cases, explain why the clock period must be chosen to accommodate the slowest signal path, and what happens if a designer chooses a clock period that is too short.
