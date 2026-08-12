---
title: 10 Integrated Circuits
exportFilename: exports/cs370/10_integrated_circuits
lineNumbers: true
---

# Basic Circuits

---

## Integrated circuits

Logic gates are never sold as individual, standalone components. 

Instead, many gates are fabricated together on a single piece of silicon and packaged inside a protective plastic (or ceramic) casing

> This is an **integrated circuit (IC)**, or "chip."

---

## Integrated circuits

The silicon die itself is tiny 
- the plastic package exists to protect it and to give it usable connection points.

**Pins** extending from the package are how the chip connects to the outside world 
- some pins carry input signals, 
- some carry output signals, and 
- others supply power and ground.

---

## Integrated circuits

<img class="rounded mx-auto w-2/3 mt-4" src="./ic-layouts.png">

Small/simple ICs (a handful of gates) typically use packages like **DIP (Dual Inline Package)**, with two rows of pins along the long edges.

Larger, more complex ICs (like CPUs) need far more connections than a two-row package can offer, so they use denser packaging styles:
- *PGA (Pin Grid Array)* - pins arranged in a grid on the underside of the package, plugging into a socket.
- *LGA (Land Grid Array)* - flat metal contact pads instead of pins, with the pins living in the socket instead.

---

## Number of pins

Modern CPUs contain on the order of **1 billion transistors**.

*Step 1* - Transistors -> Gates

Using a simplified estimate of 2 transistors per NAND gate:

$$
1{,}000{,}000{,}000 \text{ transistors} \div 2 \approx 500{,}000{,}000 \text{ NAND gates}
$$

*Step 2* - Gates -> Pins

Each 2-input NAND gate needs 3 connections (2 inputs + 1 output). If every gate were its own individually packaged chip, we'd need:

$$500{,}000{,}000 \times 3 = 1{,}500{,}000{,}000 \text{ pins}$$

Add 2 more pins for shared power and ground:

$$1{,}500{,}000{,}002 \text{ pins total}$$

We **cannot** use raw inputs and outputs for pins
