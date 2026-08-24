# Part 1 - Boolean Logic

## Requirements

- For each expression below, build a complete truth table.
- List every input variable combination and the resulting output value for the expression as a whole.

## Expressions

1. `F2 = !A!B!C + !A!BC + !AB!C + A!B!C + (A xor B)C`

2. `F4 = AB!CD + AB!C!D + (A xor B)CD + AB!C`

3. `F5 = (!A + B)(A + !B) + A!B + !AB`

## Deliverables

- (5 pts each) **Truth table** for `F1`–`F5`, showing all input combinations and the resulting output column.

# Part 2 - Circuit Design

## Requirements

- 8 data inputs: `D0, D1, D2, ..., D7`
- 3 selector inputs: `S2, S1, S0`
- 1 output: `Y`
- When the selector switches are set to binary value `n` (0–7), `Y` must equal `Dn`
- Only ever one data line should be able to reach `Y` at a time

## Deliverables

- (5 pts) **Truth table** Write out what `Y` should equal for each of the 8 possible `S2 S1 S0` combinations (in terms of `D0`–`D7`).
- (10 pts) **Full gate-level schematic** of `Y`
