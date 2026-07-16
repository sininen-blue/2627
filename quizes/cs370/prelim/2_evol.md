You are designing a new feature for a processor. Adding it to hardware would cost more but make it 10x faster. Software would be cheap but slow, and the feature is expected to change frequently in the next year. Which approach should you choose?

- Software, because it is easier to modify when the specification changes
- Hardware, because it will be faster for every program that uses the feature
- Software, because it will reduce the total number of physical components
- Hardware, because reliability improves when features are built into circuits

---

A startup is building a simple embedded controller for a cheap appliance. They have a very limited budget and the device will never receive updates. How should they implement the control logic?

- Hardware, because it is cheaper to manufacture at high volume and will never need changes
- Software, because it is cheaper regardless of volume or update needs
- Hardware, because software cannot be used in embedded systems
- Software, because reliability is worse with hardware implementations

---

In 1951, Maurice Wilkes proposed adding a microprogramming level to reduce the number of vacuum tubes. What trade-off did this introduce?

- Executing ISA programs by interpretation instead of directly by circuits
- Replacing all hardware circuits with software programs
- Eliminating the digital logic level entirely from the machine
- Translating ISA programs to a high-level language before execution

---

Compared to two-level machines, what was the biggest practical benefit of Wilkes' three-level design?

- Enhanced reliability from fewer electronic circuits and tubes
- Faster execution because microprograms ran at higher clock speeds
- Easier programming because microcode was written in a high-level language
- Lower manufacturing cost because vacuum tubes were replaced by transistors

---

An engineer in 1965 wants to add a new instruction to their company's computer. The machine uses microprogramming. How should they implement it?

- Extend the microprogram to interpret the new instruction
- Rewire the digital logic circuits to recognize the new opcode
- Write a compiler that replaces the new instruction with existing ones
- Add a separate co-processor to handle the new instruction

---

You are advising a 1970s computer manufacturer. A competitor has just added a `DEC` (decrement by 1) instruction to their ISA. Your machine already has a `SUB` instruction that can subtract 1. Should you add `DEC`?

- Yes, because `DEC` is slightly faster and customers expect it despite being non-essential
- No, because every new instruction requires a full hardware redesign of the ALU
- Yes, because `DEC` is needed for straightforward countdown operations
- No, because `DEC` would conflict with the existing `SUB` instruction encoding

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

A student in 1958 signs up for a 2 AM timeslot to run their program on the university's mainframe. They arrive with a deck of punched cards, load the compiler, fix errors, and reload. What kind of system is this?

- Open shop, where programmers personally operate the machine during reserved time
- Batch processing, where jobs are submitted and collected hours later
- Timesharing, where multiple users connect via remote terminals
- Multiprogramming, where the operating system schedules jobs automatically

---

An IBM 709 running FMS reads a card that says `*FORTRAN`. How does the operating system treat this card compared to a program card?

- As a control card that instructs the OS to load the FORTRAN compiler from tape
- As a source code card that should be compiled by the FORTRAN compiler
- As a data card that should be passed to the currently executing program
- As a job card that contains accounting information for billing purposes

---

You are a programmer in 1962 using a batch system. You submit a deck of cards at 9 AM. When should you expect to see results?

- Several hours later, possibly in the afternoon
- Within minutes, as soon as the machine is free
- Immediately, because the system gives interactive feedback
- The next day, because batch systems only run overnight

---

A university in 1964 wants to replace its batch system so that students can get immediate feedback while writing programs. What technology should they adopt?

- Timesharing with remote terminals connected via telephone lines
- A faster batch system with a high-speed line printer
- Microprogramming to accelerate the compilation step
- Open shop with more sign-up slots available each hour

---

In the early days of computing, the boundary between hardware and software was described as "crystal clear." Why did this change over time?

- Levels were added, removed, and merged as computers evolved, blurring the boundary
- Hardware became so fast that software instructions were no longer distinguishable
- Software patents and copyright laws made the legal distinction irrelevant
- The invention of the transistor eliminated the need for separate hardware design

---

A modern processor internally translates complex x86 instructions into simpler micro-operations that execute on a streamlined core. How does this relate to the historical developments described?

- It mirrors the microprogramming approach where a lower level interprets a higher level's instructions
- It is a return to the two-level design used in the earliest digital computers
- It eliminates the need for an ISA level by running software directly on digital logic
- It replaces the operating system's role in managing instruction execution

---

A product manager wants to add multimedia processing instructions to a new CPU. Which historical precedent suggests caution about this decision?

- Microprogrammed instruction sets grew fat and slowed down over the 1960s–1970s
- Early computers like ENIAC had no memory, making complex instructions useless
- The FMS operating system could only handle two virtual instructions at a time
- Assembly language programmers refused to use any instruction longer than one word

---

You are designing a computer in 2025. A colleague argues that the hardware-software boundary is fixed and predetermined. Based on the lecture, how should you respond?

- The boundary is arbitrary and constantly changing; today's software can be tomorrow's hardware
- The boundary is determined solely by the programming language used for development
- The boundary is defined by the transistor count allocated to each function
- The boundary is fixed by the instruction set architecture and cannot be moved

---

In an open-shop system, why did computers frequently sit idle?

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

A company must decide whether to implement a security feature in hardware or software. The feature requires extremely high speed, will never change after release, and the company has a large manufacturing budget. Which implementation should they choose?

- Hardware, because it is faster and will never need modification after release
- Software, because it is always cheaper to develop regardless of constraints
- Hardware, because security features cannot be implemented reliably in software
- Software, because it allows easier debugging during the development process
