---
title: 19 Dicts
exportFilename: exports/comp102/19_dicts
lineNumbers: true
---

# Dictionaries

---

## Recap

- Tuples and lists are indexable ordered sequences of objects
    - indexed by *position*, `0, 1, 2, ...`

Today, we look at a compound type indexed by *meaningful keys* instead of position

---
layout: center
---

# Dictionaries

---

## Dictionaries

- *Unordered* collection of **key/value pairs**
    - each key maps to a value
    - keys must be unique and **immutable** (e.g. strings, numbers, tuples)
    - values can be anything, and can repeat
- Denoted by curly braces, `{}`

---

## Dictionaries

```python {1|2|3|4|5|6|7|8}
grades = {} # empty dictionary
grades = {'Ana': 92, 'Ben': 85, 'Cy': 78} # dictionary literal

len(grades)
grades['Ana']
grades['Ben'] = 90
grades['Dan'] = 88
'Ana' in grades
grades['Eli']
```

---

## Dictionaries are mutable

Unlike a tuple, we can assign directly into a key of a dictionary

```python
grades = {'Ana': 92, 'Ben': 85}
grades['Ana'] = 100
print(grades)

grades['Cy'] = 70
print(grades)
```

Unlike lists, dictionaries are not indexed by position, 0, 1, 2, ... but by whatever keys you choose

---

## Checking and removing keys

```python
grades = {'Ana': 92, 'Ben': 85}

'Ana' in grades
'Zoe' in grades

del grades['Ben']
print(grades)

# dictionary methods
grades.get('Zoe')
grades.get('Zoe', 0)
```

> Use `in` or `.get()` to safely check for a key instead of risking a `KeyError`

---
layout: two-cols
---

## Iterating over a dictionary

By default, iterating over a dictionary gives you the *keys*

```python
grades = {'Ana': 92, 'Ben': 85, 'Cy': 78}
for name in grades:
    print(name, grades[name])
```

::right::

You can also iterate over keys and values together with `.items()`

```python
grades = {'Ana': 92, 'Ben': 85, 'Cy': 78}
for name, score in grades.items():
    print(name, score)
```

- `.keys()` gives just the keys
- `.values()` gives just the values
- `.items()` gives key/value pairs as tuples

---

## Iterating over a dictionary

Both loops on the previous slide produce the exact same result

- the first version looks up each value manually, `grades[name]`
- the second version lets Python hand you each key/value pair directly via `.items()`

> Prefer `for key, value in d.items():` whenever you need both the key and the value

- if you only need the keys, `for key in d:` is enough
- if you only need the values, use `for value in d.values():`

---

## Why aren't dictionaries ordered?

Unlike a list, a dictionary does not store its keys by *position*

- when you insert a key, Python runs it through a **hash function**
    - `hash(key)` turns the key into a number
    - that number decides *where* in memory the key/value pair is stored
- the storage location depends on the hash, not on when you added it

> This is also why dictionary **keys must be immutable**: if a key could change after being stored, its hash would change too, and Python would no longer be able to find it

---

## Hashing, in a nutshell

A hash function maps a key to a slot number in an internal array

```python
slot = hash(key) % number_of_slots
```

- `grades['Ana'] = 92` computes `hash('Ana')`, picks a slot, and stores `('Ana', 92)` there
- `grades['Ana']` recomputes `hash('Ana')`, jumps *directly* to that slot, and reads the value

- no need to scan through other keys first
- two different keys can land in the same slot (a **collision**); Python handles this internally, but it's why hashing isn't perfectly even

---

## Hashing, in a nuthsell

A toy hash function, just to make the idea concrete:

```python
def simple_hash(key):
    total = 0
    for char in key:
        total += ord(char)
    return total

def slot(key, number_of_slots):
    return simple_hash(key) % number_of_slots

print(slot('Ana', 8)) 
print(slot('Ben', 8))
```

- `simple_hash` adds up the character codes of the key - not what Python actually uses, but it shows the pattern: *same key in, same number out*
- `% number_of_slots` squeezes that number down to a valid slot index
- real `hash()` is more complex (and designed to spread keys evenly), but the core idea is identical

---

## Why dictionaries are faster than lists

Suppose we want to look up a value associated with a name

```python
# with a list of pairs
pairs = [('Ana', 92), ('Ben', 85), ('Cy', 78)]
for name, score in pairs:
    if name == 'Cy':
        print(score)
```

```python
# with a dictionary
grades = {'Ana': 92, 'Ben': 85, 'Cy': 78}
print(grades['Cy'])
```

- the list version must check each pair one by one, **O(n)**: the more items, the longer it takes
- the dictionary version jumps straight to the slot using `hash('Cy')`, **O(1)**: roughly the same speed no matter how many keys are stored

> This is the key trade-off: dictionaries give up *order* in exchange for *fast lookup by key*

---

## a CRUD app with a dictionary

A dictionary is a natural fit for **C**reate, **R**ead, **U**pdate, **D**elete

This structure is called **CRUD** and is the basis for the majority of businesses using the web

---

## Making a crud app using dictionaries

We'll build four small functions, one per CRUD operation, all sharing the same dictionary

```python
contacts = {}
```

- every function below reads from or writes to this one dictionary
- we'll build them up one at a time, starting with Create

---

## Create: given a dictionary, how would you add a value to it?

```python
def create(name, phone):
    # ...
```

- what should happen if `name` is already a key in `contacts`?
- what should happen if it isn't?

---

## Create: pick the correct implementation

```python
# A
def create(name, phone):
    if name in contacts:
        print(f"{name} already exists")
    else:
        contacts[name] = phone

# B
def create(name, phone):
    contacts[name] = phone

# C
def create(name, phone):
    if name not in contacts:
        print(f"{name} already exists")
    else:
        contacts[name] = phone
```

---

## Read: given a dictionary, how would you look up a value in it?

```python
def read(name):
    # ...
```

- what should happen if `name` isn't in `contacts`? Should it crash?

---

## Read: pick the correct implementation

```python
# A
def read(name):
    return contacts[name]

# B
def read(name):
    return contacts.get(name, "not found")

# C
def read(name):
    if name in contacts:
        return "not found"
    return contacts[name]
```

---

## Update: given a dictionary, how would you change an existing value?

```python
def update(name, phone):
    # ...
```

- this looks almost identical to Create 
- what's the key difference in intent?

---

## Update: pick the correct implementation

```python
# A
def update(name, phone):
    contacts[name] = phone

# B
def update(name, phone):
    if name in contacts:
        contacts[name] = phone
    else:
        print(f"{name} not found")

# C
def update(name, phone):
    if name in contacts:
        print(f"{name} not found")
    else:
        contacts[name] = phone
```

---

## Delete: given a dictionary, how would you remove a value from it?

```python
def delete(name):
    # ...
```

- what Python keyword removes a key/value pair entirely?

---

## Delete: pick the correct implementation

```python
# A
def delete(name):
    del contacts[name]

# B
def delete(name):
    contacts[name] = None

# C
def delete(name):
    if name in contacts:
        del contacts[name]
    else:
        print(f"{name} not found")
```

---

## Using the CRUD scaffold

```python
create('Ana', '555-1234')
create('Ben', '555-5678')

print(read('Ana'))      # 555-1234
print(read('Zoe'))      # not found

update('Ana', '555-0000')
print(read('Ana'))      # 555-0000

delete('Ben')
print(read('Ben'))      # not found
```
