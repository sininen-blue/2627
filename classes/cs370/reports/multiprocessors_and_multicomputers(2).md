MULTIPROCESSORS
&
MULTICOMPUTERS
page
01

STUDIO SHODWE
Members
Evermore Baring
John Micho Cuico
Archangel Fortun
Raymund Uygioco
page
02

Multiprocessors
A system with more than one CPU sharing a
| common  |     | memory,  |     | so  | processors  |     | can |
| ------- | --- | -------- | --- | --- | ----------- | --- | --- |
communicate by reading and writing shared
data in memory. This achieves parallelism by
| splitting  |       | a  job  | among  | CPUs       | that   | operate  | at  |
| ---------- | ----- | ------- | ------ | ---------- | ------ | -------- | --- |
| the        | same  | time    | on     | different  | parts  | of       | the |
same problem

Architectural
Blueprint
Step 1: Divide the Program
The operating system or application divides a program into smaller
tasks that can run simultaneously.
Step 2: Assign Tasks to Processors
Each CPU receives a different task to process at the same time.
Step 3: Access Shared Memory
All processors read and write data from the same main memory,
allowing them to share information quickly.
Step 4: Coordinate Execution
The processors synchronize their work to prevent conflicts when
accessing shared data.
Step 5: Combine Results
After completing their assigned tasks, the processors combine their
outputs to produce the final result.

Multicomputers
| A  multicomputer  |                 |     | is  a  | system      |     | composed  |       | of  |
| ----------------- | --------------- | --- | ------ | ----------- | --- | --------- | ----- | --- |
| many              | interconnected  |     |        | computers,  |     |           | where |     |
each processor has its own private memory.
| Instead         | of              | sharing  |          | memory,  |                  | processors |         |     |
| --------------- | --------------- | -------- | -------- | -------- | ---------------- | ---------- | ------- | --- |
| communicate     |                 | by       | sending  |          | messages         |            | to  one |     |
| another.        | In  comparison  |          |          | to       | multiprocessors, |            |         |     |
| multicomputers  |                 |          | are      | said     |                  | to  be     | losely  |     |
coupled

Architectural
Blueprint
Multicomputer (Distributed Memory)
Step 1: Divide the Problem
A large problem is split into smaller independent tasks that can be
processed separately.
Step 2: Assign Tasks to Different Computers
Each computer receives a task and processes it using its own
processor and local memory.
Step 3: Exchange Information
When necessary, computers send and receive messages through the
network to share data.
Step 4: Continue Processing
Each computer continues working with the updated information until
its task is complete.
Step 5: Gather Final Results
The completed results from all computers are collected and combined
into the final output.

Advantages
Multiprocessors Multicomputers
Can boost the system’s execution speed Multicomputer systems can execute tasks faster
Multiprocessor systems allow for greater than single-computer systems, as the workload can
parallelism, as different processors can execute be distributed across multiple computers.
different tasks simultaneously. Multicomputer systems can be scaled more easily
Multiprocessor systems can be more cost-effective than single-computer systems, as additional
than building multiple single-processor systems to computers can be added to the system to handle
handle the same workload increased workloads.
Multicomputer systems can continue to operate
even if one computer fails, as the remaining
computers can continue to execute tasks.

Bottlenecks
Multiprocessors Multicomputers
Since all processors access the same main memory, Processors cannot directly access another
multiple processors may compete for memory processor's memory, so they must send messages
access, causing delays. over the network.
All processors communicate through a shared bus. If many processors communicate simultaneously,
Heavy traffic on the bus can reduce system the network can become congested.
performance. Sending and receiving messages requires additional
Processors must coordinate access to shared time compared to accessing shared memory
resources, which adds extra processing time. directly

Realword Example
| Multiprocessor   |      | -  A        | cloud  |               | server  | with  | multiple  |            | CPUs |
| ---------------- | ---- | ----------- | ------ | ------------- | ------- | ----- | --------- | ---------- | ---- |
| sharing          | the  | same        |        | RAM.          |         | Used  | in        | databases, |      |
| virtualization,  |      | scientific  |        | simulations,  |         |       | and       | enterprise |      |
servers. One example is the intel Xeon
| Multicomputers  |      | -  Used      |     | in  | weather     |     | forecasting,  |     | AI  |
| --------------- | ---- | ------------ | --- | --- | ----------- | --- | ------------- | --- | --- |
| training,       | and  | large-scale  |     |     | scientific  |     | research.     |     | One |
example is the Summit Supercomputer

Conclusion
| Multiprocessors  |     |     |     | and       |     | multicomputers  |           |     |             | both  | improve |      |
| ---------------- | --- | --- | --- | --------- | --- | --------------- | --------- | --- | ----------- | ----- | ------- | ---- |
| performance      |     |     | by  | allowing  |     |                 | multiple  |     | processors  |       | to      | work |
simultaneously.  The  main  difference  is  that  multiprocessors
| share     | a   | common    |     | memory,  |          |              | while  |       | multicomputers  |          |         | have |
| --------- | --- | --------- | --- | -------- | -------- | ------------ | ------ | ----- | --------------- | -------- | ------- | ---- |
| separate  |     | memories  |     |          | and      | communicate  |        |       |                 | through  | message |      |
| passing.  |     | Choosing  |     |          | between  |              |        | them  |                 | depends  | on      | the  |
application's need for speed, scalability, and communication.

References
Tanenbaum, A. S., & Austin, T. (2013). Structured Computer
Organization (6th ed.). Pearson.
GeeksforGeeks. (2025, July 23) Difference between
Multiprocessor and Multicomputer.
https://www.geeksforgeeks.org/difference-between-
multiprocessor-and-multicomputer/
GeeksforGeeks. (2025, July 11). Introduction of multiprocessor
and multicomputer.
https://www.geeksforgeeks.org/computer-organization-
architecture/introduction-of-multiprocessor-and-
multicomputer/

THANK YOU