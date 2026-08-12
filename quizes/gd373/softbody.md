What is a softbody physics simulation in a game context?

- Modeling objects with points and shapes that can bend, stretch, and deform
- Modeling objects as a single rigid shape that never changes its form
- Simulating only fluids and particles that flow without any fixed structure
- Replacing all physics with pre-baked animations that never respond to forces

---

According to the notes, what is the priority order when implementing a 2D softbody system?

- Stability, then performance, then realism
- Realism, then performance, then stability
- Performance, then realism, then stability
- Stability, then realism, then performance

---

What properties does a point mass store for simulation?

- Weight, current position, and velocity
- Color, outline, and density
- Size, rotation, and friction
- Shape, stiffness, and rest distance

---

In the PointMass example, how is velocity computed during integration?

- Current position minus previous position, scaled by damping
- Previous position divided by current position, added to gravity
- Mass multiplied by gravity, then added to the position
- Accumulated force divided by mass, then stored separately

---

In a point mass system, what is a shape defined as?

- An ordered list of PointMass references forming a closed polygon
- A single point mass scaled to fill an area of the screen
- A set of collision edges that are independent of any points
- A sprite image positioned at the shape's computed center

---

What is the purpose of the broad-phase check, such as AABB or circle overlap?

- Cheaply ruling out shapes that are far apart before detailed checks
- Exactly computing how far a point is inside another shape
- Replacing narrow-phase checks for all collision handling
- Killing off isolated points that no longer connect to a shape

---

Why does a softbody check collisions per point rather than per whole shape?

- It lets the shape deform on contact instead of bouncing as a rigid unit
- Because point checks are more expensive but yield perfect accuracy
- Because whole-shape checks can never detect any overlaps
- It makes the shape stay rigid while its points move underneath

---

What do point-in-polygon tests fail to tell you on their own?

- How far a point is inside a shape and which way to push it out
- Whether a point is inside or outside of a given polygon
- Whether a shape's points have changed position between frames
- Which points will collide with the shape in future frames

---

What problem can fast-moving softbody points cause between frames?

- Tunneling straight through thin shapes
- Shrinking the shape's rest distance
- Freezing the point masses in place
- Slowing down the whole simulation

---

In the crossing number algorithm, what does an odd number of edge hits mean?

- The point is inside the shape
- The point is outside the shape
- The shape has an odd number of sides
- The ray hit the shape's vertex exactly

---

What edge cases need special handling in the crossing number algorithm?

- Rays passing exactly through a vertex or running parallel to an edge
- Shapes that are open or concave in their point ordering
- Points that sit exactly on the shape's rest distance
- Springs that have stretched beyond their rest length

---

After pushing a point out of overlap, what must also be corrected?

- The velocity, by reflecting it along the surface normal
- The mass, so the point becomes lighter on contact
- The shape's rest distance, to match the new surface
- The broad-phase check, to skip the colliding shape

---

What does Hooke's law spring force try to do between two points?

- Keep them at a rest distance apart, with stiffness k
- Pull them to the closest edge's surface normal
- Push them apart until they form a straight line
- Keep their velocity equal to the world's gravity

---

What is the purpose of cross or internal springs in a spring layout?

- Resisting collapse or turning the shape inside-out
- Keeping the outline's silhouette intact
- Anchoring the shape to a fixed position
- Reflecting velocity after a collision

---

What does shape matching do each frame to maintain a softbody's form?

- Nudges current points toward a best-fit rigid rotation of the rest arrangement
- Pushes points outward using the enclosed area like an inflated balloon
- Pins every point to its original position in world space
- Replaces the shape with a fluid simulation of its interior

---

How can you build compound structures like ropes or vehicle suspension?

- By combining pins and joints to link point mass building blocks
- By using only perimeter springs in a single rigid polygon
- By increasing stiffness until every shape is completely rigid
- By relying on point-in-polygon tests to hold shapes together
