#import "template.typ": *

#show: project.with(
  title: "CGD 211 Prelim Exam",
  authors: (
    "Neil Arthur Alaan",
  ),
)

= Questions
(5pts each) Answer these questions in either essay or bullet form format

1. In your own words, what is the difference between `_process` and `_physics_process`, and how is this related to the value `delta`?
#v(10em)

2. Describe your understanding of how nodes, scene trees, and packed scene files work
#v(10em)

= Project Submission
You are required to submit

+ your *Game files*
  - in a zipped format (`.zip`)
  - titled `lastname_prelim_game.zip`
+ your *GDD*
  - in a PDF format (`.pdf`)
  - titled `lastname_prelim_gdd.pdf`

Submit both files in NEO

#pagebreak()

= Rubrics
#table(
  columns: (1.2fr, 1fr, 1fr, 1fr),
  
  table.header[*Criteria*][*10*][*5*][*0*],
  [*Completeness*],
  [The game is playable from start to finish without any errors causing unintended behavior or crashes],
  [The game is playable from start to finish with minor bugs causing unintended behavior],
  [The game is not playable from start to finish],
  
  [*Baseline Mechanics*],
  [The game implements all mechanics stated by the GDD],
  [Some mechanics were not implemented or does not follow the behavior described by the GDD],
  [The game it not the game described by the GDD],
  
  [*Scope and Technical Risk*],
  [The game implements custom mechanics which are outside of lecture content],
  [The game implements primarily lecture content mechanics with polish or minor modifications],
  [The game does not go beyond the examples stated in lectures and previous laboratories],
  
  [*Overall Polish*],
  [The game has no bugs or behaviors that are not intended],
  [Low occurrence rate of bugs and unintended behaviors],
  [The game regularly shows bugs and unintended behaviors],
  
  [*Art and Visual Clarity*],
  [],
  [The game looks cohesive and the visuals allow a clear gameplay experience],
  [The games visuals actively make playing the game difficult],
  
  [*Submission*],
  [],
  [All required deliverables are submitted with correct names],
  [None of the deliverables were submitted],
  
)
