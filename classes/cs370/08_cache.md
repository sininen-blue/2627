---
title: 08 Cache
exportFilename: exports/cs370/08_cache
lineNumbers: true
---

# Cache

---

## The problem with memory access

A computer has a problem with memory access.

CPUs have always been faster than memories.

The faster the CPU is when compared to memory, the more time the CPU must wait.

---

## Simple solutions


There are two solutions to this problem. 

The first solution is to start the read operation and stall the CPU if the data is not ready. 

The second solution is to not stall the CPU. 

The compiler can generate code to do other work before the memory word arrives. The CPU still stalls.

---

## The economic problem

We know how to make very fast memory. 

However, fast memory must be near the CPU. 

Travel is the most expensive part of memory access. 

https://planetscale.com/blog/caching

More memory on the CPU makes the CPU larger. 

A larger CPU costs more and is more expensive to produce. 

This limits how much memory we can put on the CPU. Our choice is a small fast memory or a large slow memory.

---

## What is caching

Caching is a way to combine fast memory with large memory. 

The goal is to get the speed of fast memory with the capacity of large memory. 

The idea is simple. 

Put heavily used memory words into the cache. 

When the CPU needs a word, look at the cache first.

---

## Locality principle

Caching works because programs usually access data close to each other. 

This is called the locality principle. 

You put data into the cache in chunks. 

Data close to the first word is also in the cache. 

When the CPU makes the next call, it can use the cache. 

If a word is read or written $k$ times, the computer needs one reference to slow memory. 

This is the first reference. It needs only $k - 1$ references to fast memory. A larger $k$ gives faster performance.

---

## Mean access time

Formally, we have three symbols. 

- $c$ is the cache access time. 
- $m$ is the main memory access time. 
- $h$ is the hit ratio. 

The hit ratio is the fraction of all references that the cache can satisfy. 

$$
h = (k - 1)k.
$$

and the miss ratio is $h-1$

---

## Mean access time (cont)

The mean access time is $c + (1 - h)m$

When $h$ approaches $1$, all references come from the cache. The access time goes to $c$. 

When $h$ approaches $0$, the computer needs a memory reference every time. The access time goes to $c + m$. The computer checks the cache first.

---

## Cache lines

With the locality principle, main memories and caches divide into fixed size blocks. 

The blocks inside the cache are called cache lines. 

When a cache miss occurs, the computer loads the entire cache line from the main memory. 

It does not load only the needed word. 

For example, with a 64 byte line size, a reference to memory address 260 pulls a line that contains bytes 256 to 319 into one cache line. 

With some luck, we will hit other words in that cache line.
