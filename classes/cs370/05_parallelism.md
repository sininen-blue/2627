### Group 1: Pipelining (Instruction-Level Parallelism)

* **What their slides must cover:** The basic fetch-decode-execute pipeline stages, latch registers, and pipeline execution timing charts (space-time diagrams).
* **Instructor Q&A Questions:**
* *"What happens to the entire pipeline when a conditional branch instruction occurs, and how do modern processors mitigate this?"* (Looking for: Pipeline stalls/flushes, branch prediction).
* *"If a 5-stage pipeline has a clock cycle of 2ns, why doesn't it actually achieve a perfect 5x speedup in practice?"* (Looking for: Pipeline overhead, structural/data hazards).



### Group 2: Superscalar Architectures (Instruction-Level Parallelism)

* **What their slides must cover:** Multiple execution units (ALUs), the role of the instruction issue unit, out-of-order execution, and the difference between superscalar and deep pipelining.
* **Instructor Q&A Questions:**
* *"What is the difference between an in-order issue with out-of-order execution versus an out-of-order issue?"* (Looking for: Instruction scheduling complexity, RAW/WAR/WAW dependencies).
* *"Why is the instruction decode and issue unit often the biggest bottleneck in a superscalar processor?"* (Looking for: The complexity of analyzing multiple instructions for dependencies simultaneously in hardware).



### Group 3: Data Parallel Computers (Processor-Level Parallelism)

* **What their slides must cover:** SIMD (Single Instruction, Multiple Data) architecture, vector processors vs. array processors, and the concept of vector registers.
* **Instructor Q&A Questions:**
* *"What kind of computational workloads or software applications benefit immensely from a SIMD architecture, and which ones perform poorly?"* (Looking for: Matrix math, graphics/video processing vs. heavily branching business logic).
* *"According to Tanenbaum, what is the fundamental difference between an array processor and a vector processor?"* (Looking for: Array processors use multiple independent ALUs; vector processors use a single highly-pipelined functional unit designed for vectors).



### Group 4: Multiprocessors (Processor-Level Parallelism)

* **What their slides must cover:** Shared-memory architectures, UMA (Uniform Memory Access) vs. NUMA (Non-Uniform Memory Access), and the bus topology or crossbar switch.
* **Instructor Q&A Questions:**
* *"What is the 'cache coherence problem' in shared-memory multiprocessors, and what is one common method hardware uses to solve it?"* (Looking for: Multiple caches holding conflicting data; solved via write-through, write-back, or snooping protocols).
* *"Why does a UMA architecture face severe scalability limits compared to a NUMA architecture?"* (Looking for: Bus contention; as you add CPUs, the single shared bus or memory controller becomes overwhelmed).



### Group 5: Multicomputers (Processor-Level Parallelism)

* **What their slides must cover:** Distributed-memory architectures, message-passing mechanisms, and interconnection topologies (like mesh, hypercube, or ring networks).
* **Instructor Q&A Questions:**
* *"Since multicomputers do not share physical memory, how do two individual processors exchange data during a computation?"* (Looking for: Explicit message-passing APIs like MPI, sending packets over a network).
* *"What are the trade-offs of using a 2D mesh interconnection topology versus a hypercube network as the number of nodes scales into the thousands?"* (Looking for: Mesh has lower wiring complexity but higher network diameter/latency; Hypercube scales latency beautifully but becomes incredibly complex to wire physically).Here is a complete, ready-to-distribute assignment blueprint for your group reporting activity. It is structured around a traditional academic presentation format, strictly grounded in the concepts from Andrew S. Tanenbaum's *Structured Computer Organization*.

