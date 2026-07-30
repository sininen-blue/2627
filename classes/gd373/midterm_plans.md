## as per syllabus

- projectile plotting
- raycasting
- soft body dynamics

---

## Raycastas and area detection/simple ai

---

## Physics basics

---

## Forward Eulors method

eulors method for the equations of motion


$$
x_{t+1} = x_{t} + v_{t}
$$

$$
v_{t+1} = v_{t} + a_{t}
$$

---

we use the semi implicite eulers method where we calculate the velocity on the next step first, this prevents us from getting infinite energy in spring systems

in a regular euler system, when it samples energy from the first step, it samples the current velocity at it's highest, and so when the next step happens and the velocity updates

it also 

$$
x_{t+1} = x_{t} + v_{t+1}
$$

$$
x_{t+1} = x_{t} + v_{t} + a_{t}
$$

---

---


# math behinds soft body physics

---

## Differenc between solid and point masses

---

## Point masses

mass 
position
velocity

---

## Shapes

list of point masses in order

---

## Collision detection

---

## Check overlap for points if inside


---

## Raycasting

for point detection in horizontal lines

---

## get closest edge, detect and resolve collisions

---

## Springs

for shapes

force that keeps two objects at a certain distance 

- rest distance
- force is applied

---

## maintaining shape pressure

---

## shape matching

---

# pin joints and spring joints

---




# soft body plugin godot


