What do the three control inputs CS, RD, and OE stand for?

- Chip Select, Read/Write, and Output Enable
- Clock Select, Row Decode, and Output Enable
- Chip Select, Row Decode, and Output Enable
- Clock Strobe, Read/Write, and Overflow Enable

---

What happens to the data output lines during a write operation?

- They are not used
- They carry the address of the written word
- They output the value being written
- They output the previous contents of the word

---

What forms the four word-select AND gates at the left of the memory?

- A decoder
- A multiplexer
- A comparator
- A shifter

---

What is the main functional difference between SRAM and DRAM?

- Whether they retain data indefinitely or need periodic refreshing
- Whether they can be written to or only read from
- Whether they use transistors or capacitors exclusively
- Whether they require a mask to be manufactured

---

Why is SRAM commonly used for CPU cache memory?

- It has extremely fast access times on the order of a nanosecond or less
- It has significantly higher density than DRAM at similar cost
- It requires no refresh controller, simplifying the CPU design entirely
- It can be erased and reprogrammed using ultraviolet light

---

What structure does a DRAM cell use to store a single bit?

- A single transistor and capacitor (1T1C)
- A small latch built from several transistors
- A pair of cross-coupled NOR gates
- A photosensitive fuse element

---

What causes DRAM data to be lost if not refreshed?

- The capacitor's charge leaks away over time
- The transistor gates wear out with repeated use
- The clock signal drifts out of synchronization
- The row and column strobes interfere with each other

---

What does DDR SDRAM do to increase data transfer rate over plain SDRAM?

- It transfers data on both the rising and falling edges of the clock
- It doubles the number of address pins on the chip
- It uses two separate clock signals running out of phase
- It doubles the capacitor size in each memory cell

---

Why can't a ROM retain its data without special manufacturing considerations after power is removed?

- Because RAM built from transistors and capacitors cannot retain data without power, so ROMs use a different storage method
- Because ROMs are built from the same 1T1C cells as DRAM
- Because ROMs require a refresh signal like DRAM does
- Because ROMs store data using volatile SRAM latches

---

How is data programmed into a PROM?

- A high-voltage pulse permanently blows a selected fuse open
- Ultraviolet light exposure resets selected bits to 1
- An electrical erase signal clears the entire chip
- A photographic mask is applied during a second manufacturing pass

---

How is an EPROM erased?

- By exposing the chip to strong ultraviolet light for about 15 minutes
- By applying a high-voltage pulse to a special erase pin
- By sending an electrical erase command to the chip
- By cycling the power supply rapidly several times

---

What advantage do EEPROMs have over EPROMs?

- They can be erased and reprogrammed using only electrical signals
- They are simpler, smaller, and cheaper per bit than EPROMs
- They require a quartz window to allow erasure
- They can only be programmed once at the factory
