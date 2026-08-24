What does the digital logic level represent in a computer system?

- The physical circuits beneath the instruction set architecture
- The software instructions executed by the operating system
- The programming languages used to control computer hardware
- The mathematical algorithms used by application programs

---

Which sequence moves from physical building blocks toward complete digital circuits?

- Transistors, gates, Boolean algebra, and fundamental circuits
- Boolean algebra, operating systems, gates, and transistors
- Fundamental circuits, operating systems, transistors, and gates
- Gates, instruction sets, Boolean algebra, and application programs

---

How does a digital circuit interpret a logical zero and one?

- Zero represents low voltage, while one represents high voltage
- Zero represents high voltage, while one represents low voltage
- Both values represent identical voltage levels at different times
- Each value represents an exact voltage selected by the program

---

What is the purpose of a noise margin in a digital circuit?

- It allows a signal to tolerate some voltage disturbance
- It converts an out-of-range analog voltage into an incorrect logical value
- It increases the number of logical values available to a circuit
- It holds a circuit's output steady during small input changes

---

Why does a digital circuit use a voltage threshold?

- It decides whether a measured voltage represents zero or one
- It assigns a logical value based on the measured voltage's range
- It stores the measured voltage for use by the next circuit
- It changes a logical value into the corresponding instruction

---

What role does a transistor play in a digital circuit?

- It acts as an electrically controlled on-off switch
- It stores a complete truth table for a Boolean function
- It converts a control signal into a fixed high-voltage output
- It joins two circuits with a permanent, fixed connection

---

What does an inverter do to a logical input?

- It changes zero to one and changes one to zero
- It changes zero to zero and changes one to one
- It changes any input into a constant high-voltage output
- It changes any input into a constant low-voltage output

---

What does Boolean algebra provide for digital logic design?

- A formal way to reason about functions of zero and one
- A physical method for manufacturing transistor materials
- A programming language for controlling operating systems
- A timing standard for measuring processor instruction cycles

---

What does a Boolean function produce from its input variables?

- A single result based on the values of its inputs
- A separate voltage threshold for each input variable
- A complete processor instruction from each input variable
- A physical transistor connected to each input variable

---

How many input combinations can a Boolean function of n variables have?

- It can have 2ⁿ possible input combinations
- It can have n² possible input combinations
- It can have 2 × n possible input combinations
- It can have n possible input combinations

---

What does a truth table provide for a Boolean function?

- Every possible input combination and its resulting output
- Only the input combination that produces a high output
- Only the physical gates required to build the function
- The exact voltage measured at each transistor during operation

---

What does a bar over a Boolean variable indicate?

- The variable's value is inverted
- The variable's value is stored in memory
- The variable's value is added to another variable
- The variable's value is converted into a voltage threshold

---

What operation does multiplication represent in Boolean notation?

- The Boolean AND operation
- The Boolean OR operation
- The Boolean NOT operation
- The Boolean XOR operation

---

What operation does addition represent in Boolean notation?

- The Boolean OR operation
- The Boolean AND operation
- The Boolean NOT operation
- The Boolean NAND operation

---

Which expression is written in sum-of-products form?

- ĀBC + AB̅C + ABC̅ + ABC
- (A + B)(Ā + C)(B + C̅)
- A + B + C + Ā + B̅ + C̅
- A(B + C) + B(A + C) + C(A + B)

---

Why is the sum-of-minterms expression ĀBC + AB̅C + ABC̅ + ABC useful?

- It identifies input combinations that produce an output of one
- It lists each transistor required to manufacture the circuit
- It describes only the input combinations producing an output of zero
- It specifies the voltage level at each transistor pin directly

---

What is the first step when implementing a Boolean function as a circuit?

- Write down the function's truth table or expression
- Connect all product terms directly to the power supply
- Remove each variable that appears with an inverted value
- Replace each OR operation with a transistor immediately

---

Why are NAND and NOR called universal gates?

- Either gate type can be used to construct other gate types
- Either gate type produces the same output for each input
- Either gate type implements a function using diodes instead of transistors
- Either gate type directly represents each truth table as written

---

Why might a circuit designer simplify a Boolean circuit?

- To reduce chip area, power consumption, or operating delay
- To increase the number of input variables in each gate
- To make the circuit compute a different function more quickly
- To replace the circuit's Boolean function with a software routine

---

What must remain unchanged when a circuit is simplified?

- The simplified circuit must compute the original function
- The simplified circuit must contain the original gate sequence
- The simplified circuit must use the original number of transistors
- The simplified circuit must preserve each intermediate signal

---

Which Boolean expression demonstrates the distributive law?

- AB + AC can be rewritten as A(B + C)
- AB + AC can be rewritten as (A + B)(A + C)
- AB + AC can be rewritten as A + B + C
- AB + AC can be rewritten as ABC

---

A designer replaces AB + AC with A(B + C). What has the designer preserved?

- The function's output for every possible input combination
- The original number of AND gates and OR gates
- The exact physical arrangement of the original transistors
- The order in which the input voltages reach the circuit

---

How can a truth table help verify that two circuits are equivalent?

- Matching output columns show that both circuits compute the same function
- Matching transistor counts show that both circuits compute the same function
- Matching input voltages show that both circuits use identical hardware
- Matching gate symbols show that both circuits have identical timing

---

A Boolean function is defined as F = AB + C. If A = 1, B = 0, and C = 1, what is the value of F?

- F equals 1
- F equals 0
- 
- 

---

Two implementations compute the same Boolean function: one uses only NAND gates, and one mixes AND, OR, and NOT gates. Which factor best justifies choosing the NAND-only design for a mass-produced chip?

- Manufacturing a single gate type simplifies fabrication and reduces cost
- NAND gates compute an entirely different function than mixed-gate designs
- NAND gates require a larger truth table than AND-OR-NOT designs
- NAND gates change the Boolean function into a simpler expression
