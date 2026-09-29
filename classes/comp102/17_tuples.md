---
title: 17 tuples
exportFilename: exports/comp102/17_tuples
lineNumbers: true
---

# Tuples

---

## Tuples

- we've seen scalar types: `int`, `float`, `str`, `bool`
- we've also seen one compound type: `string`
- other compound data types include
    - indexed sequences of elements/objects
    - tuples (immutable)
    - lists (mutable)

---

## Tuples

- indexable ordered sequence of objects
    - can be any type, int, string, tuple, tuples of tuples, etc
- cannot change element values, **immutable**

```python {1|2|3|4|5|6|7|8|9|10|11}
te = () # empty tuple
ts = (1, 2, 3) # tuple of three integers
tt = (3,) # tuple of one integer, needs comma
tn = (1, "hello", (2, 3)) # tuple of mixed types

tn[0] # evaluates to 1
(2, 3) + (4, "five") # evaluates to (2, 3, 4, "five")
tn[1:2] # evaluates to ("hello",)
tn[1:3] # evaluates to ("hello", (2, 3))
len(tn) # evaluates to 3
tn[1] = 4 # TypeError, tuples are immutable
```

---

## Tuples

A single-element tuple needs a trailing comma to distinguish it from a plain parenthesized expression

```python
not_a_tuple = (3) # this is just the integer 3
is_a_tuple = (3,) # this is a tuple containing 3
```

> Without the comma, Python just sees parentheses used for grouping, like in `(2 + 3) * 4`

---

## Indices and slicing

```python
seq = (2, 'a', 4, (1,2)) # what is index 0
```

````md magic-move
```python {1|2|3|4|5}
print(len(seq)) # what is the length
print(seq[3])
print(seq[-1])
print(seq[3][0])
print(seq[4])
```

```python {1|2|3|4|5}
print(seq[1])
print(seq[-2:])
print(seq[1:4:2])
print(seq[:-1])
print(seq[1:3])
```

```python
for item in seq:
    print(item)
```
````

---

## Tuple uses

Unpacking, which is also a good way of swapping values

```python
x = 10
y = 20
z = x
x = y
y = z
```

```python
x = 10
y = 20
(x, y) = (y, x)
```

> Because Python builds the entire tuple `(y, x)` on the right side *before* assigning it, there's no risk of overwriting a value before it's used, unlike the manual swap which needs a temporary variable `z`

---

## Tuples uses

You can also use them to return more than one value from a function

```python
def quotient_and_remainder(x, y):
    q = x // y
    r = x % y
    return (q, r) # one object, multiple values

both = quotient_and_remainder(10, 3)
(quot, rem) = quotient_and_remainder(10, 3)
```

- `both` is the whole tuple `(3, 1)`
- `quot` and `rem` are the unpacked individual values, `3` and `1`
