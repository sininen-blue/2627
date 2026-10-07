What is cache memory?

* A small, fast memory that stores frequently used data
- A large, slow memory that stores all program data
- A permanent storage device for the operating system
- A backup memory used only during power failures

---

Why do computer systems use cache memory?

* To reduce the time the CPU waits for data
- To increase the total storage capacity of the system
- To replace the need for main memory entirely
- To permanently save data after shutdown

---

What does the principle of locality describe?

* Programs tend to access a small set of data repeatedly
- Programs access all memory addresses equally often
- Programs only access data stored on disk
- Programs never reuse previously accessed data

---

type: tf

Temporal locality means recently accessed data is likely to be accessed again soon.

- true

---

Why are caches organized into multiple levels?

* To balance speed and size at each level
- To make all memory equally slow
- To remove the need for main memory
- To store data permanently without power

---

How does an L1 cache compare to an L2 cache?

* L1 is smaller and faster than L2
- L1 is larger and slower than L2
- L1 and L2 are identical in size and speed
- L1 stores data permanently while L2 does not

---

Which cache level is closest to the CPU?

* L1 cache
- L2 cache
- L3 cache
- Main memory

---

type: tf

L1 cache is smaller and faster than L2 cache.

- true

---

What is write-through caching?

* Writes are immediately sent to both cache and main memory
- Writes are stored only in cache and never saved elsewhere
- Writes are delayed until the cache is full
- Writes bypass the cache and go only to disk

---

What is a key advantage of write-back caching?

* It reduces the number of writes to main memory
- It guarantees main memory is always up to date
- It removes the need for a cache entirely
- It makes every write operation instant to disk

---

type: tf

Write-back caching updates main memory before the cache line is replaced.

- false

---

Which caching policy delays updating main memory until necessary?

* Write-back
- Write-through
- Write-first
- Write-always

---

type: freeform
points: 3

Briefly explain why the principle of locality makes cache memory effective.
