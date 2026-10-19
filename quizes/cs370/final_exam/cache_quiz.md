An add finishes in one cycle, but a load from DRAM takes tens of cycles. Why is a cache placed between the CPU and DRAM?

* So the CPU waits fewer cycles for data it uses again while resident
- So the machine can address more storage than DRAM alone can provide
- So DRAM can be removed and the cache holds the entire program
- So cached values survive a power loss the way a disk would

---

Address 100 fills a line that includes its neighbors. Which of 101, 102, and 400 can that line serve?

* 101 and 102, because those neighbors arrived in the fetched line
- 400, because a later address shares the line with address 100
- 101 alone, because the line holds the requested word and one neighbor
- 102 and 400, because the line keeps both of those later addresses

---

Designers place a tiny L1 next to the core and a larger L2 behind it. What tradeoff is that stack of levels making?

* Each lower level gives up some speed in exchange for more capacity
- Each level is given the same latency so software treats them alike
- The upper levels take the place of main memory for the whole program
- The upper levels keep their contents across power loss, like a disk

---

How does an L1 data cache compare with the L2 cache behind it?

* L1 holds less data and returns hits in fewer cycles than L2
- L1 holds more data and returns hits in more cycles than L2
- L1 and L2 have the same capacity and the same hit latency
- L1 holds less data and returns hits in more cycles than L2

---

A store hits in a write-through cache. When does main memory see that store?

* Main memory is updated at the same time the cache line is updated
- The store remains in the cache and main memory stays unchanged
- The store waits until the last clean line in the cache turns dirty
- The store skips the cache and is written to disk

---

A loop stores to the same line on each of 200 iterations. What is the advantage of write-back over write-through on that loop?

* Those 200 stores can update one cache line and send one write to DRAM
- Main memory matches the cache after each individual store in the loop
- The cache can be removed, because write-back sends those stores to disk
- Each store becomes a single-cycle write all the way out to disk

---

A write-back line is dirty and is then selected for replacement. When does DRAM receive that line?

* When that dirty line is evicted from the cache
- When the store that made the line dirty retires
- When the other clean lines have been written back
- When the core later reads that same address

---

A small cache can hold a reused matrix. A one-pass stream is larger than that cache. Which data should the designer expect the cache to help?

* The reused matrix rows, because those lines are read again while resident
- The one-pass stream, because a wider address range produces more hits
- The first-touch addresses, because the first load of a line is a hit
- The newly written lines, because a first store keeps later reads in L1

---

A device reads DRAM and must observe a store before its next read of that address. Which write policy is the better fit?

* Write-through, because the device reads DRAM and needs that store visible there
- Write-back, because holding the store in cache makes DRAM show it sooner
- Write-around, because the device reads the store from disk after the cache skip
- A read-only cache, because the device shares the line that was just stored

---

type: tf

A routine rereads one `counter` on each call. That reuse is temporal locality.

- true

---

type: tf

Reading `pkt[i]` and then `pkt[i+1]` is temporal locality.

- false

---

type: freeform
points: 3

The core stalls on L1 hit latency. Explain how you would choose between enlarging L1 until the working set fits, and keeping a small L1 with a larger L2. Which cost would make you refuse the larger L1?
