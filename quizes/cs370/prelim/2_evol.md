A startup is building a simple embedded controller for a cheap appliance. They have a very limited budget and the device will never receive updates. How should they implement the control logic?

- Hardware, because it is cheaper at high volume and stays unchanged after manufacture
- Software, because it is cheaper regardless of volume or update needs
- Hardware, because it is more reliable than software in any system
- Software, because reliability is worse with hardware implementations

---

In 1951, Maurice Wilkes proposed adding a microprogramming level to reduce the number of vacuum tubes. What trade-off did this introduce?

- Executing ISA programs by interpretation instead of directly by circuits
- Replacing all hardware control circuits with equivalent software programs
- Eliminating the digital logic level entirely from the machine
- Translating ISA programs to a high-level language before execution

---

Wilkes added a microprogramming level between the ISA and digital logic levels. Compared to a two-level machine, what was the biggest practical benefit of the three-level design?

- Enhanced reliability from fewer electronic circuits and tubes
- Faster execution because microprograms ran at higher clock speeds
- Easier programming because microcode was written in a high-level language
- Lower manufacturing cost because vacuum tubes were replaced by transistors

---

A team of researchers in the 1980s noticed that microprograms had grown large and slow. What was their solution to regain performance?

- Eliminate the microprogram and directly execute a reduced instruction set
- Move the microprogram into faster read-only memory to speed up execution
- Add more complex instructions so fewer total instructions need to execute
- Replace the microprogram with a just-in-time compiler running on the same hardware

---

In the earliest computers like ENIAC, programmers had to physically plug cables and set switches. What structural limitation of the machine forced this workflow?

- The machine lacked memory, so programs had to be configured manually each time
- The machine had only a digital logic level without an ISA level at all
- The machine used punched cards that required manual alignment before reading
- The machine had an operating system that demanded physical authentication

---

In 1958, a student signs up for a 2 AM timeslot, arrives with punched cards, loads the compiler, fixes errors, and reloads. What kind of system is this?

- Open shop, where programmers operate the machine during reserved time slots
- Batch processing, where jobs are submitted and collected hours later
- Timesharing, where multiple users share the CPU via remote terminals
- Multiprogramming, where the operating system schedules jobs automatically

---

An IBM 709 running FMS reads a card that says `*FORTRAN`. How does the operating system treat this card compared to a program card?

- As a control card that instructs the OS to load the FORTRAN compiler
- As a source code card that should be compiled by the FORTRAN compiler
- As a data card that should be passed to the currently executing program
- As a job card that contains accounting information for billing purposes

---

A university in 1964 wants to replace its batch system so that students can get immediate feedback while writing programs. What technology should they adopt?

- Timesharing with remote terminals connected via telephone lines
- A faster batch system with a high-speed line printer
- Microprogramming used to accelerate compilation of user programs
- Open shop with more sign-up slots available each hour

---

In the early days of computing, the boundary between hardware and software was described as "crystal clear." Why did this change over time?

- Levels were added, removed, and merged as computers evolved, blurring the boundary
- Hardware became so fast that software instructions were no longer distinguishable
- Software patents and copyright laws made the legal distinction irrelevant
- The invention of the transistor eliminated the need for separate hardware design

---

A product manager wants to add multimedia processing instructions to a new CPU. Which historical precedent suggests caution about this decision?

- Microprogrammed instruction sets grew fat and slowed down over the 1960s–1970s
- Early computers like ENIAC had no memory, making complex instructions useless
- The FMS operating system could only handle two virtual instructions at a time
- Assembly language programmers refused to use any instruction longer than one word

---

In an open-shop system, why did computers sit idle?

- Programmers took time carrying cards, debugging, and setting up their own jobs
- The computers were unreliable and broke down several times per day
- Operating systems required a dedicated operator who was often on break
- The sign-up sheet was frequently overbooked, leaving gaps between users

---

An engineer points out that any operation done in software can also be done in hardware, and vice versa. What concept does this describe?

- Logical equivalence of hardware and software
- The principle of microprogramming dominance
- The open-shop model of early computer operation
- The batch processing paradigm of the 1960s

---

A 1970s designer notices they can add new machine instructions by simply extending a microprogram rather than redesigning circuits. What was a direct consequence of this ease?

- An explosion in instruction set size as designers competed to add more instructions
- A rapid consolidation of instruction sets down to the bare minimum needed
- The elimination of assembly language as programmers switched to high-level languages
- The invention of the operating system to manage the growing number of instructions

---

A company needs a high-speed security feature that will never change after release and has a large manufacturing budget. Which implementation should they choose?

- Hardware, because it is faster and the design is fixed at release
- Software, because it allows easier updates during the development process
- Hardware, because it provides more predictable performance than software
- Software, because it allows easier debugging during the development process

---

A designer argues that since any operation done in software can also be done in hardware, all performance-critical functions should be implemented directly in hardware. Use historical evidence to evaluate this claim.

- The RISC movement showed that removing hardware complexity and simplifying the instruction set improved performance, contradicting the claim
- The invention of microprogramming proved the claim correct by demonstrating that hardware-level control could be standardized
- The transition from vacuum tubes to transistors proved the claim correct by enabling more complex hardware at lower cost
- The development of timesharing systems showed that software flexibility matters more than raw hardware speed
