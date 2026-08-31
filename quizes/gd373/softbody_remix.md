What behavior distinguishes a softbody from a rigid body in a physics engine?

- Its shape can bend and stretch in response to forces
- Its shape is fixed and cannot change under any force
- Its motion is limited to fluid and particle simulation
- Its animation is pre-baked and ignores forces entirely

---

Why is stability prioritized over realism when building a 2D softbody system?

- A stable simulation that looks less real is more usable than one that breaks
- Realism is easier to achieve than stability in any physics system
- Performance always matters more than stability or realism
- Stability and realism are always achieved together automatically

---

What does a point mass NOT need to store for the simulation to work?

- Rotation angle
- Current position
- Previous position
- Accumulated force

---

What technique lets a point mass simulation avoid storing velocity directly?

- Verlet integration, deriving motion from position history
- Euler integration, storing only acceleration values
- Angular integration, tracking rotation instead of position
- Spring integration, deriving motion from stiffness values

---

How are the perimeter points of a softbody shape typically connected?

- With springs linking neighboring points around the outline
- With rigid rods that cannot stretch or compress
- With a single spring connecting only the first and last point
- With no connections, relying only on point-in-polygon tests

---

What is the benefit of doing a broad-phase check before narrow-phase collision detection?

- It avoids expensive detailed checks between shapes that clearly cannot touch
- It replaces the need for any narrow-phase collision detection
- It computes the exact penetration depth between two shapes
- It guarantees that no tunneling will ever occur between frames

---

What advantage does per-point collision checking give a softbody over per-shape checking?

- Individual points can respond separately, allowing the shape to deform
- It is computationally cheaper than checking the whole shape at once
- It guarantees the shape will never tunnel through thin obstacles
- It removes the need for a broad-phase check entirely

---

What additional information beyond inside-or-outside must a collision response compute?

- The penetration depth and the direction to push the point out
- The point's original rest distance from the shape's center
- The color and size of the polygon being tested
- The number of edges that make up the polygon

---

What can happen if a softbody point moves too far in a single simulation step?

- It can pass completely through a thin shape without detecting a collision
- It can gain extra mass and become heavier than intended
- It can lose its connection to every spring in the shape
- It can cause the shape's rest distance to shrink permanently

---

In the crossing number algorithm, what does casting a ray from a point measure?

- How many times the ray crosses the polygon's edges
- The exact distance from the point to the nearest edge
- The angle between the point and the polygon's center
- The total area enclosed by the polygon's edges

---

Which situation requires special handling in a ray-casting point-in-polygon test?

- The ray passing directly through one of the polygon's vertices
- The polygon having more than four sides
- The point lying exactly at the shape's rest distance
- The shape's springs being fully compressed

---

Once a point's velocity is corrected after a collision, what is it reflected around?

- The surface normal at the point of contact
- The center of mass of the whole softbody shape
- The direction of gravity acting on the point
- The rest distance between neighboring points

---

What variable in Hooke's law spring force determines how strongly a spring resists stretching?

- The stiffness coefficient k
- The point mass's velocity
- The polygon's total area
- The broad-phase bounding radius

---

What failure mode do internal or cross springs help prevent in a softbody shape?

- The shape folding or turning inside-out under pressure
- The shape's points drifting apart from gravity alone
- The shape colliding with itself during broad-phase checks
- The shape's outline losing its point ordering

---

What role does a best-fit rigid rotation play in shape matching?

- It gives a target arrangement that current points are nudged toward
- It calculates the exact velocity each point should have next frame
- It determines which points participate in collision detection
- It sets the stiffness value used by every spring in the shape

---

How can point mass building blocks be assembled into structures like ropes?

- By connecting them with pins and joints instead of full spring meshes
- By merging all points into a single rigid polygon shape
- By disabling gravity so the points hold their positions
- By running only broad-phase checks between connected points
