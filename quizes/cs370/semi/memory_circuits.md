What is memory used for storing in a computer?

- Instructions to be executed and data
- Only instructions to be executed
- Only data, never instructions
- Control signals for the ALU

---

What gates are used to build an SR latch?

- Two NOR gates
- Two NAND gates
- Two AND gates
- Two XOR gates

---

Why is an SR latch different from a combinational circuit?

- Its outputs are not uniquely determined by the current inputs alone
- Its outputs depend only on the current inputs
- It has no memory of previous states
- It always produces the same output for the same inputs

---

What state is impossible for an SR latch's two outputs?

- Both outputs equal to 0, or both equal to 1
- Q = 0 and Q̄ = 1
- Q = 1 and Q̄ = 0
- Q and Q̄ alternating rapidly

---

What happens when S becomes 1 while an SR latch is in state Q = 0?

- The latch switches to state Q = 1
- The latch stays in state Q = 0
- The latch enters an invalid state
- The latch outputs both Q and Q̄ as 1

---

What effect does setting R have while an SR latch is already in state Q = 0?

- No effect
- It switches the latch to Q = 1
- It forces Q̄ to 1
- It puts the latch into a random state

---

What is the purpose of adding a clock input to an SR latch?

- To prevent the latch from changing state except at specific times
- To eliminate the need for S and R inputs
- To convert the latch into a combinational circuit
- To allow the latch to hold two bits instead of one

---

When the clock is 0 in a clocked SR latch, what happens to the AND gates?

- Both output 0 regardless of S and R, so the latch holds its state
- Both output 1 regardless of S and R, forcing a reset
- They pass S and R through unchanged
- They invert S and R before reaching the latch

---

What happens if S and R both return to 0 simultaneously in an SR latch?

- The latch jumps to a state at random
- The latch always settles to Q = 1
- The latch always settles to Q = 0
- The latch remains at Q = Q̄ = 0

---

How does a clocked D latch avoid the SR latch's invalid state?

- A single input D feeds the lower AND gate through an inverter, so both AND gates never see a 1
- It uses NAND gates instead of NOR gates in the core latch
- It removes the clock input entirely
- It adds a third AND gate to detect the invalid case

---

How many transistors does the clocked D latch circuit need?

- 11 transistors
- 2 transistors
- 4 transistors
- 8 transistors

---

What triggers a flip-flop to change state?

- A clock transition, either rising or falling edge
- The clock being held at level 1
- The clock being held at level 0
- Any change in the D input regardless of the clock

---

How does a latch differ from a flip-flop in terms of timing?

- A latch changes state while the clock is level 1, a flip-flop changes on a clock edge
- A latch changes state on a clock edge, a flip-flop changes while the clock is level 1
- A latch and a flip-flop both change state only on the falling edge
- A latch requires two clock signals while a flip-flop requires one

---

How is a short pulse generated to build a flip-flop from a D latch?

- ANDing the clock signal with its delayed, inverted copy
- ORing the clock signal with the D input
- XORing the clock signal with itself
- Feeding the clock through two cascaded D latches

---

What determines the width of the pulse used to drive a D flip-flop?

- The inverter's propagation delay
- The frequency of the memory's clock signal
- The number of flip-flops in the register
- The width of the D input signal

---

What does the D flip-flop sample relative to the clock's rising edge?

- The value of D at a fixed, tiny delay after the edge
- The value of D exactly at the previous falling edge
- The average value of D over the entire clock cycle
- The value of Q̄ from the previous state

---

What symbol indicates a flip-flop that changes state on the clock's rising edge?

- A pointy clock symbol
- A rounded clock symbol
- An inverted clock symbol
- A dashed clock symbol

---

What do the Set/Preset and Reset/Clear inputs on a latch or flip-flop do?

- Force Q to 1 or force Q to 0
- Toggle between latch and flip-flop behavior
- Switch the clock between level and edge triggering
- Select which of several D inputs is sampled

---

How is an 8-bit storage register built from flip-flops?

- Eight flip-flops combine, with all clock lines tied to a single CK signal
- Eight flip-flops combine, each with its own independent clock signal
- A single flip-flop is time-multiplexed across eight bit positions
- Eight NOR gates combine without any flip-flops

---

Why does the CK line into a register use an inverter acting as an amplifier?

- One signal may not have enough current to drive all eight flip-flop inputs directly
- The clock signal must be inverted to trigger the flip-flops correctly
- The inverter removes noise from the incoming clock signal
- The inverter converts the clock from edge triggered to level triggered

---

How are two 16-bit registers combined to form a 32-bit register?

- Their CK and CLR lines are tied together
- Their D inputs are wired to a shared decoder
- Their outputs are combined through a multiplexer
- Their clock signals are offset by one propagation delay

---
