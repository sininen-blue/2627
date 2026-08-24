What is the main reason computers use cache memory?

- To reduce the delay between the CPU and main memory
- To increase the storage capacity of the CPU registers
- To replace DRAM with faster and cheaper SRAM
- To allow the CPU to avoid executing instructions while waiting

---

Why can out-of-order execution reduce the effect of a memory delay?

- It executes other ready instructions while one instruction waits
- It replaces the delayed memory request with a cache hit
- It moves the delayed data directly into the CPU registers
- It reduces the latency of the DRAM hardware itself

---

Which description best compares SRAM and DRAM?

- SRAM is faster and more expensive, while DRAM is slower and cheaper
- SRAM is slower and cheaper, while DRAM is faster and more expensive
- SRAM is faster and cheaper, while DRAM is slower and more expensive
- SRAM and DRAM have similar speed and cost despite different technologies

---

How does a typical memory hierarchy change as it moves farther from the CPU?

- Memory becomes larger, slower, and cheaper
- Memory becomes smaller, faster, and cheaper
- Memory becomes larger, faster, and more expensive
- Memory becomes smaller, slower, and more expensive

---

What does a cache store?

- Copies of recently accessed data from slower memory
- Permanent copies of selected data from main memory
- Instructions currently waiting for the CPU to execute
- Data stored exclusively in the cache memory system

---

What happens when the CPU finds requested data in the cache?

- The CPU receives the data with a short cache access time
- The CPU loads the entire program from secondary storage
- The CPU waits for the full main memory access time
- The CPU removes the matching data from the cache

---

What does temporal locality mean?

- Recently used data is likely to be used again soon
- Nearby memory locations are likely to be used consecutively
- Large memory blocks are likely to be accessed randomly
- Distant memory locations are likely to share identical values

---

What does spatial locality mean?

- Nearby memory locations are likely to be accessed soon
- Recently used values are likely to be accessed repeatedly
- Program instructions are likely to be discarded soon
- Larger memory devices are likely to have shorter access times

---

A loop accesses `arr[0]`, `arr[1]`, `arr[2]`, and subsequent elements in order. Why does this pattern demonstrate spatial locality?

- Consecutive array elements occupy adjacent locations in memory
- The loop accesses the same array element repeatedly
- The loop repeatedly accesses one element before moving onward
- The array elements are copied into CPU registers before access

---

During a loop that sums an array, which variables primarily demonstrate temporal locality?

- The running sum and loop counter are accessed repeatedly
- The array elements are accessed in consecutive order
- The cache line and memory address are created once
- The array length and contents are accessed during initialization

---

What does the hit ratio represent?

- The fraction of memory references satisfied by the cache
- The fraction of cache lines containing valid cached data
- The fraction of memory references requiring a DRAM access
- The fraction of memory references resulting in cache misses

---

If the hit ratio is 0.95, what is the miss ratio?

- 0.05
- 0.50
- 0.95
- 1.05

---

What happens to mean access time as the hit ratio approaches 1?

- The mean approaches the cache access time alone
- The mean approaches lower-level memory access time
- The mean approaches the sum of cache and memory times
- The mean approaches a value below the cache access time

---

What happens to mean access time as the hit ratio approaches 0?

- It approaches combined cache and main-memory access times
- It approaches the cache access time alone during misses
- It approaches the main-memory access time alone during misses
- It approaches the miss ratio multiplied by cache access time

---

In a cache that fetches complete lines, why is an entire cache line fetched after a cache miss?

- Fetching the line takes advantage of spatial locality
- Fetching the line prepares nearby words for later accesses
- Fetching the line makes DRAM operate at cache speed
- Fetching the line lets nearby words bypass cache lookup
