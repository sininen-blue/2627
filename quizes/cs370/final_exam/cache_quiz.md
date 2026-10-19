An add finishes in one cycle, but a load from DRAM takes tens of cycles. Why is a cache placed between the CPU and DRAM?

* So the CPU waits fewer cycles for data it is likely to use again
- So the machine can address more storage than DRAM alone provides
- So DRAM can be removed and the cache holds the entire program
- So cached values survive a power loss the way a disk would

---

A kernel keeps rereading a few rows and also walks neighboring elements of those rows. Which statement is the locality principle that makes a cache pay off?

* Over a short window, the program reuses a small set of addresses
- Over a short window, the program touches every address equally often
- The program only reuses values that already live on disk
- After an address is read once, the program never reads it again

---

Designers place a tiny L1 next to the core and a larger L2 behind it. What tradeoff is that stack of levels making?

* Each lower level gives up some speed in exchange for more capacity
- Each level is made equally slow so software never prefers one of them
- The upper levels exist so main memory can be left out of the system
- The upper levels keep their contents with no power, like nonvolatile storage

---

How does a typical L1 data cache compare with the L2 cache behind it?

* L1 holds less data and returns hits in fewer cycles than L2
- L1 holds more data and returns hits in more cycles than L2
- L1 and L2 have the same capacity and the same hit latency
- L1 keeps its contents across power-off and L2 does not

---

A store hits in a write-through cache. When does main memory see that store?

* Main memory is updated at the same time the cache line is updated
- The store stays in the cache and is never written to main memory
- The store waits until every line in the cache has become dirty
- The store skips the cache and is written only to disk

---

A loop stores to the same line hundreds of times. What is the main advantage of write-back over write-through on that loop?

* Most of those stores stay in the cache, so far fewer writes reach main memory
- Main memory is guaranteed to match the cache after every individual store
- The cache can be removed, because write-back talks only to disk
- Every store becomes a single-cycle write all the way out to disk

---

A dirty line is left stale in DRAM until that line has to be evicted. Which policy is that?

* Write-back
- Write-through
- Write-allocate
- Write-around

---

type: tf

A loop updates the same `sum` on every iteration, so that variable is likely to be used again soon after it was written. That reuse is temporal locality.

- true

---

type: tf

Under write-back, a dirty line is copied to main memory as soon as it is written, before any replacement decision.

- false

---

type: freeform
points: 3

A loop repeatedly updates one `sum` variable and also walks `arr[i]` through consecutive addresses. Explain why those two access patterns let a small cache satisfy most references instead of DRAM.
