---
title: 08 Cache
exportFilename: exports/cs370/08_cache
lineNumbers: true
---

# Cache

---

problem with memory access

cpus have always been faster than memories

the faster the cpu is, compared tmemory, the more time the cpu has to wait 


some solutions

just start reads, but stall the cpu if required

or don't stall, just compile code to generate things to do before word arrives, still stalling


economics

we know hot to make really fast memory, but they need to be near the cpu

travel is the most expensive part

https://planetscale.com/blog/caching

more memory on cpu makes it bigger, so it's expensive and limits to how expensive we can make it

so our choice is small fast memory or large slow memory


what is it

caching is a way of comdinign fast with large to get fast speed with capacity (almost)

the idea is ismple, put heavly used memoyr words into the cache, when cpu needs word, look at cache first


why it works

it works since programs usaully access data closse to each other, this is called the locality principle

so you chunk the data you put into the acache with data close to it also in the cache

so the next call the cpu makes, it might use the cache

so if a word is read or written k times, the computer will need 1 reference to slow memory (the first one)

but only k-1 references to fast memory

larger k faster performance

---

hit ratio and miss rations

formally, we have
c cache access time
m main memory access time
h hit ration which is a fraction of all references that can be satrisfaied out of the cache


h = (k - 1)k

miss ratio also exists which is just 1-h

---

mean access times

mean access time = c (1 - h)m

since h -> 1, all references can be satisfied out of the cach and access time approaches c

if h = 0, a memory references is needed every time so the access time approaches c + m (check achec first)

---


cache lines

using locality princile, main memories and caches are divided up into fixed size blocks

blocks inside the cache are called cache lines

when a cache miss happens, the entire cache line is loaded from the main memory, not just the needed word

so

64 byte line size, a referecn ot memory address 260 will pull line consisiting of bytes 256 - 319 into one cache line


with some luck, we'll hit the cache lines

---

issuse in cache design

bigger cache size means better performance, but slower to access and more cost

how the ache is organized is also another issue

and whether insturcions and data are kept in the same cache

---


unifiied cache/split cache

unified is impler


harvard architecture

split or harvard allows aparallel access a unified 

fifth issue is number of caches1


