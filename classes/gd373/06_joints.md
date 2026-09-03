# Mechanical joints, skeletons, and complex bodies

https://docs.godotengine.org/en/stable/tutorials/animation/cutout_animation.html
https://www.youtube.com/watch?v=GQLL7laFqQY
https://www.youtube.com/watch?v=-h2dkiKy_4I
https://www.youtube.com/shorts/wCPYtaVuW2w

One core part of physics and physics simulation is the simulation of physical bodies and joints. In Godot this is normally done through the Skeleton2D node. Here, bones are connected to each other which provide a way to induce movement and rotation to preceding bones automatically.

[image of skeleton here]

This has 2 primary uses, 1 being a higher ease of animations. While skeleton based animations for 2d works are uncommon and significantly less flexible than a traditional frame by frame approach, it's significantly faster and cheaper. It also allows for certain possibilities, such as hundreds of skins, to be possible.

Popular examples of skeleton based animations are AdventureQuestWorlds by ArtixEntertainment who pioneered the style in the early 2000s. Their usage of skeletons allowing them to create thousands of armors, classes, items, etc. Which considering the size of their company (30-50 employees), would be impossible otherwise.

[image of the tier list here]

The second use for skeletons, and one which is more related to physics, is kinematics which come in two flavors.

Forward and Backward.

Given a network of bones, such as your shoulder the tip of your fingers, forward animation would be the process of adjusting the bones and joints starting from the shoulder. This leads to very predictable and precise rotations, however trying to animate straight motions (such as a punch) would be more difficult.

On the other hand, backwards, or inverse kinematics (IK) allows one to set a "target" and mathematically calculate the rotation and position of each joint in that bone network for the "tip" of that bone network to be as close as possible to the target.

Fundamentally, their main difference is what you give and what you get. In a forward animation system, you provide the joint angles and positions in exchange for the end point location. And for an IK system, you provide the end point in exchange for the rotations and positions of the joints.

Forward kinematics (FK) are standardized, fast, efficient, and deterministic mathematically which makes them popular for robotics use, especially in high precision environments where the task isn't likely to change. But in places where flexibility becomes more important, the higher computational load required by IK becomes more tolerable.

In the realm of animations, both are usually used, either in combination, in different parts, or one after another, like using IK to set up the initial pose and tweaking the joints manually through FK until the pose achieves the desired effect.

This short by doodley3D quickly summarizes those two concepts 

[video here]

---

In Godot, it's fairly easy to set up Skeletons and Inverse Kinematics through the built in nodes.

This video by JDDoesDev showcases a tutorial adapted from the official documentation here https://docs.godotengine.org/en/stable/tutorials/animation/cutout_animation.html

[video here]

In essence, it's simply

1. Creating a skeleton
2. Assigning the bones
3. Setting up remote transforms
4. Setting up the inverse kinematics

Godot hides all the nitty gritty of the implementation of these systems which suits this course fine

Though for an emample of IK and bones in use, as well as a look at how a specific version of inverse kinematics works (FABRIK) see this video by Smitner
