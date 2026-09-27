Into what three main categories are CPU pins grouped?

- Address pins, data pins, and control pins
- Address pins, clock pins, and ground pins
- Data pins, interrupt pins, and power pins
- Control pins, arbitration pins, and coprocessor pins

---

How does a CPU communicate with memory and I/O devices?

- Only by presenting and accepting signals on its pins
- Only through a shared software protocol stack
- Only via direct memory-mapped file access
- Only through the operating system's device drivers

---

What was the Omnibus used in the PDP-8?

- A single set of wires that every module in the machine plugged into
- A dedicated high-speed memory bus separate from I/O
- A serial protocol used only for peripherals
- An arbitration line used only for interrupts

---

Why did modern systems split the single system bus into specialized buses?

- Every device sharing the bus caused contention
- A single bus could not physically fit enough wires for any device
- Specialized buses removed the need for bus protocols entirely
- A single bus could not support tri-state signaling

---

In a master/slave bus relationship, what does the master do?

- It initiates bus transfers
- It waits passively for requests
- It only responds to interrupts
- It only stores data permanently

---

What role does a DMA controller take on when moving data between disk and memory?

- Bus master, transferring data directly without involving the CPU for each word
- Bus slave, waiting for the CPU to issue each transfer
- Interrupt controller, deciding which device interrupts the CPU
- Arbiter, granting bus access to other devices

---

What is the rule that must always hold true for memory in bus relationships?

- Memory can never be a master
- Memory must always be a master
- Memory can never be a slave
- Memory must arbitrate for every other device

---

What is the function of a bus driver?

- It amplifies a device's signal so it is strong enough to power the bus
- It converts parallel signals into serial signals
- It stores data temporarily before it reaches the bus
- It arbitrates which device gets to use the bus next

---

If a bus has n address lines, how many memory locations can it address?

- 2^n memory locations
- n^2 memory locations
- 2n memory locations
- n memory locations

---

Why did the 8088-to-80286 transition require keeping the original 20 address lines?

- To maintain backward compatibility with existing designs
- Because the 80286 could not physically support more pins
- Because address lines could not be added without redesigning memory chips
- Because tri-state logic limited the number of usable lines

---

What is bus skew?

- An effect caused by signals traveling at different speeds down different wires
- A delay caused by waiting for an arbiter to grant the bus
- The rounding up of every bus cycle to a whole clock period
- The gradual loss of stored data caused by capacitor leakage in DRAM

---

What is the usual approach to increasing bus bandwidth without excessive skew?

- Increasing the data bus width
- Decreasing the bus cycle time as much as possible
- Removing the address lines and using only data lines
- Switching from synchronous to fully centralized arbitration

---

What does an asynchronous bus use instead of a shared clock line?

- Handshake signals like MSYN and SSYN
- A crystal oscillator running at a fixed frequency
- A dedicated arbitration daisy chain
- A block transfer word count

---

What line does distributed arbitration use to indicate the bus is currently in use?

- The busy line
- The grant line
- The acknowledgment line
- The interrupt request line
