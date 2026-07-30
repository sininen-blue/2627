What is a digital computer?
	1
	2 	
What is a sequence of instructions called?
	1
	3 	
What do electronic circuits in a computer execute?
	1
	4 	
What is formed when primitive instructions together create a language?
	1
	5 	
What happens when a level becomes tedious and difficult to use?
	1
	6 	
What is the main method where an L0 program reads an L1 program and translates it instruction by instruction at runtime?
	1
	7 	
When a program is translated from one level to another, which component controls the final program?
	1
	8 	
In the virtual machine model, what does M0 represent?
	1
	9 	
In the multilevel machine model, what kind of gap must exist between a language and the language that implements it?
	1
	10 	
How many levels does a modern computer have?
	1
	11 	
What is at Level 0 of the contemporary multilevel machine?
	1
	12 	
What are the circuits at the Digital Logic Level built from?
	1
	13 	
What is the name of the circuit at the Microarchitecture Level that performs operations on data?
	1
	14 	
What forms a data path at the Microarchitecture Level?
	1
	15 	
What instructions does the Operating System Level add beyond the ISA Level?
	1
	16 	
In the contemporary multilevel machine, what distinguishes the lower machine levels from the Assembly Language level?
	1
	17 	
What tool converts assembly language into numeric machine code?
	1
	18 	
What is the difference between architecture and implementation?
	1
	19 	
A startup is building a simple embedded controller for a cheap appliance. They have a very limited budget and the device will never receive updates. How should they implement the control logic?
	1
	20 	
In 1951, Maurice Wilkes proposed adding a microprogramming level to reduce the number of vacuum tubes. What trade-off did this introduce?
	1
	21 	
Wilkes added a microprogramming level between the ISA and digital logic levels. Compared to a two-level machine, what was the biggest practical benefit of the three-level design?
	1
	22 	
A team of researchers in the 1980s noticed that microprograms had grown large and slow. What was their solution to regain performance?
	1
	23 	
In the earliest computers like ENIAC, programmers had to physically plug cables and set switches. What structural limitation of the machine forced this workflow?
	1
	24 	
In 1958, a student signs up for a 2 AM timeslot, arrives with punched cards, loads the compiler, fixes errors, and reloads. What kind of system is this?
	1
	25 	
An IBM 709 running FMS reads a card that says `*FORTRAN`. How does the operating system treat this card compared to a program card?
	1
	26 	
In the early days of computing, the boundary between hardware and software was described as "crystal clear." Why did this change over time?
	1
	27 	
A product manager wants to add multimedia processing instructions to a new CPU. Which historical precedent suggests caution about this decision?
	1
	28 	
In an open-shop system, why did computers sit idle?
	1
	29 	
An engineer points out that any operation done in software can also be done in hardware, and vice versa. What concept does this describe?
	1
	30 	
A 1970s designer notices they can add new machine instructions by simply extending a microprogram rather than redesigning circuits. What was a direct consequence of this ease?
	1
	31 	
A company needs a high-speed security feature that will never change after release and has a large manufacturing budget. Which implementation should they choose?
	1
	32 	
A designer argues that since any operation done in software can also be done in hardware, all performance-critical functions should be implemented directly in hardware. Use historical evidence to evaluate this claim.
	1
	33 	
Which statement about Blaise Pascal's Pascaline is correct?
	1
	34 	
A mathematician in 1700 needs to approximate a curve's area by summing many rectangles, requiring repeated multiplication and addition. Given the technology available in 1700, which machine is best suited?
	1
	35 	
What was the key limitation of Babbage's Difference Engine compared to the Analytical Engine?
	1
	36 	
Which component of the Analytical Engine corresponds to the modern CPU's arithmetic unit?
	1
	37 	
Why is the Analytical Engine considered the first general-purpose machine?
	1
	38 	
Who is widely considered to be the first computer programmer?
	1
	39 	
Why did the COLOSSUS have little influence on modern computing?
	1
	40 	
A programming team in 1945 needs to reconfigure their ENIAC from calculating artillery tables to simulating a nuclear reaction. What must they do?
	1
	41 	
What two changes did von Neumann propose to improve on the ENIAC's design?
	1
	42 	
What advantage did transistors offer that made vacuum-tube computers obsolete within a decade?
	1
	43 	
What was the major innovation introduced by the PDP-8?
	1
	44 	
A company in 1964 owns both an IBM 7094 and an IBM 1401, which are incompatible. IBM wants to keep them as customers. What solution did IBM introduce?
	1
	45 	
What two obstacles by the late 1990s led to the introduction of dual-core processors?
	1
	46 	
What did IBM publish alongside the IBM Personal Computer that helped start the PC industry?
	1
	47 	
You are designing a CPU and need to choose how many registers to include. Adding more registers increases chip area and cost but reduces how often the CPU must read from main memory. Which RISC principle directly addresses this trade-off?
	1
	48 	
A CISC processor needs to add 1 to a value stored in memory. It has a single instruction `INC [addr]` that takes 8 clock cycles due to microcode interpretation. A RISC processor would need three instructions (`LOAD`, `ADD`, `STORE`) each taking 1 cycle. Which processor completes the operation faster?
	1
	49 	
A team is designing a processor for a space probe. The mission will last 15 years, and the processor must be patched after launch to fix a bug in the multiplication instruction. Which design choice best supports this requirement?
	1
	50 	
IBM wants to sell both a cheap low-end mainframe and an expensive high-end mainframe that run the exact same software. What innovation made this possible?
	1
	51 	
You are writing a multiply function for a RISC processor that has no `MULT` instruction. You have registers `R1` and `R2` containing the operands. Which sequence of instructions correctly computes their product?
	1
	52 	
A processor designer notices that 90% of instructions in typical programs are simple loads, stores, and adds, while the remaining 10% are complex operations. Based on this observation, should they design a CISC or RISC processor?
	1
	53 	
An engineer needs to add a new instruction to an existing processor. In a microprogrammed CISC design, what is the estimated cost of adding this instruction?
	1
	54 	
A student claims that because hardware and software are logically equivalent, it does not matter which one implements a feature. Which statement best evaluates this claim?
	1
	55 	
A processor has a data path that takes 1 nanosecond per cycle. You can either add a complex instruction that takes 5 cycles in microcode, or implement it directly in hardware for 1 cycle but increase the data path to 1.2 nanoseconds. Which option gives better performance for that instruction?
	1
	56 	
An x86 processor internally decodes a complex CISC instruction into several micro-operations that are then executed on a RISC-like core. What does this design reveal about the modern CPU landscape?
	1
	57 	
A programmer writes `A = B + C * D` in a high-level language. A CISC compiler emits one instruction; a RISC compiler emits five. Which of the following is true about the RISC version?
	1
	58 	
You are choosing a processor for a battery-powered smartphone. Which architectural choice is most aligned with modern industry practice?
	1
	59 	
During the Fetch stage of the instruction cycle, what specifically happens to the Program Counter?
	1
	60 	
A startup is building a custom accelerator for AI inference. They want to minimize design complexity and leverage open standards. Which instruction set architecture should they choose?
	1
