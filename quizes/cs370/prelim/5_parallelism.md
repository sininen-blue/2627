You are processing a 4K video where every pixel undergoes the same color-correction formula. Which architecture is best suited for this task?

- A data parallel computer using SIMD, so many pixels are processed simultaneously
- A multicomputer, because video files are too large for a single memory space
- A scalar uniprocessor, since the formula is simple and needs no parallelism
- A multiprocessor with shared memory, because each pixel needs unique data

---

A program has a branch-heavy control flow where each thread follows a completely different path. Can this program fully exploit a data parallel (SIMD) architecture?

- No, programs with divergent instruction paths do not map well to SIMD execution
- Yes, because SIMD architectures handle divergent branches by masking
- Yes, as long as the data is split evenly across processors
- No, because data parallel computers only execute arithmetic instructions

---

An NVIDIA Fermi GPU processes a matrix multiplication using thousands of cores. What kind of parallelism does this represent?

- Data parallelism, where many processing units work on different data using SIMD
- Task parallelism, where each core runs a completely independent program
- Pipeline parallelism, where matrix operations pass through sequential stages
- Multicomputer parallelism, where each core has its own private memory

---

A weather simulation divides the atmosphere into a grid and runs the same calculation on every cell. The simulation slows down because many cores need the same temperature values from memory simultaneously. What bottleneck is this?

- Memory contention from many processors requesting data at the same time
- Communication overhead, because processors send messages across a network
- Pipeline stalling, because the ALU is busy with previous calculations
- Control hazard, because branch prediction fails on atmospheric conditions

---

You are designing a system where eight CPUs share a single bank of RAM and communicate by reading and writing the same memory locations. What is this architecture?

- A multiprocessor system with shared memory
- A multicomputer system with distributed memory
- A data parallel computer using SIMD
- A superscalar processor with multiple execution units

---

A research team is building a system for weather forecasting that requires scaling from 100 to 10,000 nodes over five years. They also need the system to keep working if individual nodes fail. Which architecture should they choose?

- A multicomputer that scales easily and survives individual node failures
- A multiprocessor, because shared memory is faster for weather calculations
- A data parallel GPU cluster, because weather models use SIMD exclusively
- A superscalar uniprocessor, because clock speed improvements will handle the scale

---

Five CPUs share a bus to access main memory. As more CPUs are added, the bus becomes saturated and performance stops improving. What bottleneck does this describe?

- A shared bus bottleneck from heavy traffic reducing performance
- A register dependency, because CPUs wait for each other's register writes to complete
- A data hazard, because instructions read and write the same memory locations out of order
- A network congestion problem, because messages between CPUs overflow the buffer

---

In a 5-stage pipeline, instruction I1 is at S5 (Write Back) while I2 is at S4 and I3 is at S3 in the same cycle. How many instructions complete per cycle after the pipeline is full?

- One instruction per cycle
- Five instructions per cycle
- One instruction every five cycles
- Two instructions per cycle

---

A cake factory has 5 workers. One worker places a box, another puts in the cake, a third seals it, a fourth labels it, and a fifth removes it. Without pipelining, one box takes 50 seconds. With the assembly line, a finished box comes off every 10 seconds. What does this 10 seconds represent?

- The throughput interval, matching the time of the slowest single stage
- The total latency, which equals the sum of all five stages
- The clock cycle, which is the time to complete five boxes simultaneously
- The bandwidth, which is the number of boxes produced per second

---

A programmer claims that pipelining makes a single instruction execute faster. Is this claim correct?

- No, pipelining raises throughput but each instruction still takes the same total latency
- Yes, because instructions spend less time in each pipeline stage than in a non-pipelined design
- No, pipelining actually increases latency for each individual instruction
- Yes, because the clock cycle is shorter when stages are added to the pipeline

---

A 5-stage pipeline has a 2 ns clock. Instruction 1 depends on a value written by Instruction 0, which is still in S4. What must the pipeline do to ensure correctness?

- Stall Instruction 1 until Instruction 0 completes its write in S5
- Execute both instructions in parallel and use the result from S4 directly
- Reorder Instruction 1 ahead of Instruction 0 using out-of-order execution
- Flush the pipeline and re-fetch both instructions in program order

---

The Intel Pentium has two parallel five-stage pipelines. Integer code that pairs instructions runs twice as fast as a single-pipeline 486 at the same clock rate. What enables this speedup?

- Two independent instructions execute simultaneously in separate pipelines, doubling throughput
- Each pipeline runs at double the clock frequency of the 486
- The Pentium's pipelines are superscalar and execute four instructions per cycle
- The second pipeline eliminates most data hazards between instructions

---

You are writing a loop where each iteration adds 1 to the value loaded in the previous iteration (a dependency chain). Can a superscalar processor issue multiple iterations of this loop in parallel?

- No, because each iteration depends on the previous one, creating a serial dependency
- Yes, because superscalar processors can speculatively execute future iterations
- Yes, as long as the loop count is known at compile time
- No, because loops must be unrolled by the compiler before superscalar execution

---

A superscalar processor fetches four instructions in one cycle. Two of them need the ALU, one needs the FPU, and one is a load. All three execution units are available. How many instructions execute in that cycle?

- Three, because three independent instructions can dispatch to the three available units
- Four, because all four fetched instructions are guaranteed to execute in the same cycle
- Two, because only two of the execution units can operate on integer data
- One, because issuing multiple instructions requires separate decode units for each

---

A cloud server runs a database that frequently reads and writes shared data structures. Multiple CPUs share RAM through a single bus. As demand grows, the DBA adds more CPUs but throughput plateaus. What is the likely bottleneck?

- The shared bus saturates from heavy traffic between processors and memory
- The CPUs are superscalar-limited, because each core has limited ILP from database queries
- The pipeline is stalling, because database instructions have frequent data dependencies
- The memory is distributed, because CPUs lack direct access to each other's local memory

---

A scientific application is embarrassingly parallel: 10,000 independent tasks with no communication between them. The team has a budget for 100 identical computers connected by a network. How should they deploy the application?

- As a multicomputer, splitting tasks across the 100 computers and collecting results
- As a multiprocessor, because shared memory requires fewer changes to the application code
- As a data parallel GPU kernel, because GPUs outperform CPUs for scientific workloads
- As a single superscalar workstation, because out-of-order execution handles it efficiently

---

A graphics rendering engine applies a lighting calculation to each of 4 million pixels. Each pixel's calculation is independent. Which bottleneck is most likely to limit performance on a data parallel computer?

- Memory bandwidth from many processors requesting pixel data simultaneously
- Control hazards, because lighting calculations contain unpredictable branches
- Communication overhead, because pixels must message each other across the network
- Register dependencies, because each pixel's result depends on the previous pixel

---

Consider a 5-stage pipeline executing a program where half the instructions are branches. After each branch, the pipeline must flush and refetch. What is the approximate throughput compared to a branch-free program?

- Much lower because flushing wastes cycles on every taken branch
- Slightly lower, because branches only affect the decode stage
- The same, because branch prediction eliminates all flush penalties
- Higher, because branch instructions complete faster than arithmetic ones

---

A processor has two ALUs and one FPU. In a given cycle, three instructions arrive: an integer add, an integer multiply, and a floating-point divide. Which instructions can execute simultaneously?

- Integer add and multiply in the two ALUs while the FP divide waits
- All three, because the integer operations share one ALU and the FPU handles the divide
- Only one, because each execution unit handles one instruction type at a time
- The floating-point divide alone, because integer operations stall on register access

---

You have a choice between two processors for a video game: Processor A is a single fast core, Processor B is a multicomputer with 8 slower cores connected by a network. The game has heavy real-time interaction between game entities. Which is likely the better choice?

- Processor A, because a single core avoids communication overhead of distributed memory
- Processor B, because 8 cores outperform 1 core regardless of workload
- Processor A, because multicomputers struggle with real-time applications
- Processor B, because network latency is negligible for video games

---

A multiprocessor system with 16 CPUs accessing shared memory is running a parallel sort. Processors spend 30% of their time waiting for memory access. What is the primary cause?

- Multiple processors competing for the same main memory causes access delays
- The sort algorithm has too many data dependencies between CPUs
- The pipeline is too deep for the sort's instruction mix
- The CPUs are superscalar and struggle with branch-heavy sort code

---

A processor executes four instructions per cycle. After a branch misprediction, it must discard all instructions fetched after the branch and restart. Approximately how many cycles of work are wasted?

- Up to the number of instructions fetched ahead, depending on pipeline depth and fetch width
- Exactly one cycle, because only the branch instruction itself is flushed
- Zero cycles, because superscalar processors have accurate branch prediction
- All instructions in the reorder buffer, which is typically hundreds of entries

---

A startup is designing a chip for AI inference. Most of their workload is matrix multiplications on large grids of floating-point numbers. Should they prioritize a data parallel (SIMD) design or a superscalar out-of-order design?

- Data parallel SIMD, because the same operation applies to many data elements simultaneously
- Superscalar out-of-order, because it extracts more ILP from AI inference code
- Data parallel SIMD, because it reduces memory bandwidth bottlenecks
- Superscalar out-of-order, because matrix multiplication has unpredictable control flow

---

In a multicomputer, Processor A needs a value computed by Processor B. How does Processor A obtain this value?

- Processor B sends a message containing the value over the network
- Processor A reads Processor B's memory directly through the shared bus
- Processor B writes the value to shared memory that both can access
- Processor A computes the value locally by simulating Processor B's work

---

A database server uses a multiprocessor with eight cores sharing RAM. One core updates a record while another reads it. What must the system do to prevent the read from getting stale data?

- Coordinate access to shared data to prevent conflicts
- Give each core its own private copy of the entire database
- Disable caching on all cores to ensure memory coherence
- Route all database operations through a single core

---

A pipelined processor runs at 3 GHz and completes one instruction per cycle after the pipeline fills. A non-pipelined version of the same processor takes 5 cycles per instruction. How many MIPS does each achieve?

- Pipelined: 3000 MIPS; Non-pipelined: 600 MIPS
- Pipelined: 3000 MIPS; Non-pipelined: 3000 MIPS
- Pipelined: 600 MIPS; Non-pipelined: 600 MIPS
- Pipelined: 600 MIPS; Non-pipelined: 3000 MIPS

---

A program consists entirely of independent instructions with no data dependencies. On a superscalar processor that issues 4 instructions per cycle, how much faster will it run compared to a scalar processor at the same clock frequency?

- Up to 4 times faster, because all 4 issue slots can be filled every cycle
- Exactly 4 times faster, because the clock frequency is the same
- Slightly less than 4 times faster, because fetch and decode stages limit throughput
- Exactly 1 time faster, because instruction-level parallelism does not affect independent code

---

A weather forecasting center uses a supercomputer with thousands of nodes, each with its own processor and memory. Nodes communicate by passing messages. If one node fails during a 3-day simulation, what happens?

- Remaining nodes continue operating, so the simulation continues with reduced capacity
- The entire simulation crashes because all nodes share a single memory space
- The failed node's data is recovered from the shared bus automatically
- The simulation must restart from the beginning because checkpointing is impossible

---

Two instructions in a program have a Read-After-Write dependency: I1 writes to R1, then I2 reads from R1. On a superscalar processor, can I1 and I2 execute in the same cycle?

- No, because I2 needs the value I1 produces before it can safely read R1
- Yes, as long as both instructions are fetched in the same cycle
- Yes, because register renaming eliminates most data hazards automatically
- No, because RAW dependencies only occur in pipelined processors, not superscalar

---

A company migrates a single-threaded legacy application to a modern superscalar processor. Without recompiling, the application runs faster. Why?

- The superscalar processor extracts instruction-level parallelism from the existing instruction stream
- The superscalar processor automatically splits the application across multiple cores
- The higher clock frequency of the new processor is the only factor
- The superscalar processor uses SIMD to vectorize the legacy code at runtime

---

The Summit Supercomputer connects thousands of independent compute nodes, each with its own memory, using a high-speed network. How is Summit classified?

- A multicomputer with private memory per node communicating via messages
- A multiprocessor, because all nodes share a common address space
- A data parallel computer, because all nodes execute the same instruction on different data
- A superscalar processor, because each node issues multiple instructions per cycle
