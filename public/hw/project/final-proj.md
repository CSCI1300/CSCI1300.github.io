<<<HW_WARNING>>>

No global variables on this project.

Use only the C++ we taught in CSCI 1300 this summer. If your code uses global variables or concepts we did not cover, you will receive an automatic zero.

Libraries are allowed. Check with an instructor before you add an external library or use a feature you are not sure about.

<<<END_HW_WARNING>>>

# Final Project: The Final Bundle

## Overview

This project will get you familiar with:

1. **Objects**
   - Designing objects and complete member function lists
   - Making objects that store other objects
   - Separating responsibilities across multiple classes
2. **User interface design**
   - Creating a text-based user interface
   - Designing a terminal dashboard
   - Displaying a map, menus, player stats, inventory, and progress
3. **Program design**
   - Building a complete game loop
   - Managing player choices
   - Using conditionals, loops, arrays, and functions together
   - Creating a win/loss condition or multiple endings

## Introduction

For the Final Project, you will implement a single-player, text-based terminal adventure game in C++ inspired by *Stardew Valley*.

The Community Center is almost restored. Only one final bundle remains and the season is almost over. As the newest farmer in the valley, your goal is to gather the missing items, interact with villagers, manage your resources, and complete the final bundle before time runs out.

You will travel around town, visit familiar locations, talk to characters, collect items, complete small quests, and decide how to spend your limited time, energy, and money. The choices you make should affect your progress. Helping villagers may unlock new locations, give you hints, increase friendship, or reward you with rare items. Ignoring the community may make the bundle harder to complete. JojaMart may also offer tempting shortcuts, but those shortcuts should come with a cost to the town...

Your final program should feel like a small playable game. It does not need to be a recreation of *Stardew Valley*, but it should include the spirit of an adventure where community, resource management, and player choices matter.

## Alternative Theme Option

Although this handout is written using a *Stardew Valley* example, you are **allowed to choose a different theme** for your game. For example, you could create a version inspired by:

- fantasy/adventure stories
- space exploration
- mystery/detective stories
- another game or movie universe
- a completely original world

If you choose a different theme, the **project requirements still stay the same**. You are changing the setting and flavor of the game, not the programming expectations.

For example, if you choose another theme, you should translate the core requirements like this:

| Stardew Version in This Handout | Equivalent in Another Theme |
|---|---|
| Final Community Center Bundle | A main mission, collection goal, or final objective |
| Stardew Valley characters | At least 4 meaningful characters from your chosen theme |
| Farm, Beach, Mines, Town, etc. | At least 4 themed locations the player can visit |
| JojaMart / Morris shortcut | A competing faction, shady shortcut, or tempting tradeoff system |
| Community restoration ending | An ending tied to your theme and the player's choices |

Examples:

- In a *Star Wars* version, the player might gather parts to repair a Rebel base, visit planets instead of town locations, and interact with characters such as Luke, Leia, Han, or droids. A Joja-like tradeoff might be accepting help from a risky smuggler or the Empire.
- In an original fantasy version, the player might collect magical artifacts to restore a village shrine, visit forests/castles/caves, and interact with villagers, merchants, and wizards.

No matter what theme you choose, your game must still include:

- at least 3 classes
- a game loop
- at least 4 meaningful characters
- at least 4 locations
- a player inventory
- a time limit (required)
- at least one additional limited resource beyond time (energy, money, friendship, inventory space, etc.)
- a map or location display
- a meaningful shortcut/tradeoff system (Joja-style)
- a win/loss condition or multiple endings

If you choose a non-*Stardew* theme, make sure your game is still clearly explained and that your README or reflection states what your theme is and how it maps onto the project requirements.

---

# Project Goal

Your game should center around this main objective:

> **Complete the final Community Center bundle before the season ends.**

The player must always have a **limited amount of time** (such as a certain number of days, turns, or actions). **In addition**, the player must manage **at least one more limited resource** beyond time. During the game, the player should be able to:

- Visit different locations in the valley
- Talk to characters
- Collect items
- Manage resources such as energy, money, friendship, or time
- Donate items to the Community Center
- Track progress toward the final bundle
- Win, lose, or receive a different ending based on their choices

---

# Game Premise

You are the farmer. The Community Center has almost been restored, but the Junimos still need one final bundle to be completed. The bundle list has been damaged, and the town needs your help.

Mayor Lewis explains that the final bundle will require items from different parts of the valley. Some items can be grown on the farm, some can be caught while fishing, some can be found in the mines or forest, and some may only be received by helping villagers.

You have a limited number of days before the season ends. Each day, you must choose how to spend your time wisely.

Will you complete the final bundle and restore the Community Center?

---

# Required Game Features

**All 11 sections below (1–11) are required.** They describe what your game must include: gameplay, design, and player experience.

Your code must also follow the **Object-Oriented Programming Requirements** and **General Programming Requirements** sections later in this handout. Those sections cover class design and general C++ standards, not game features.

## 1. Single-Player Game

This project should be a **single-player game**.

The player controls one farmer. The player should have stats that matter during gameplay.

Possible player stats include:

- Name
- Current day
- Energy
- Money
- Friendship points
- Current location
- Inventory
- Community Center progress
- Joja Influence
- Final score

You do not need to use all of these exact stats, but your player should have enough information that the game state changes over time.

## 2. Community Center Final Bundle

Your game must include a final Community Center bundle.

The bundle should require the player to collect and donate multiple items or item categories.

Example bundle:

```text
Final Community Center Bundle:
- 1 crop
- 1 fish
- 1 mineral
- 1 animal product
- 1 forage item
```

You may choose your own required items or categories.

For example, your bundle could require:

```text
- Parsnip
- Sunfish
- Copper Ore
- Egg
- Wild Horseradish
```

Or it could require broader categories:

```text
- Any crop
- Any fish
- Any mineral
- Any animal product
- Any forest item
```

The player should be able to view their bundle progress during the game.

Example:

```text
Bundle Progress: 3 / 5 items donated
Still Needed:
- Fish
- Animal Product
```

## 3. Characters

Your game must include at least **4 meaningful characters**.

- If you use the default *Stardew Valley* theme, these could be *Stardew Valley* characters or clearly designed original characters.
- If you choose a different theme, these should be recognizable characters from that theme or clearly designed original characters that fit your world.

Each character must have a meaningful interaction with the player.

A meaningful interaction could include:

- Giving the player a quest
- Giving the player a hint
- Accepting a gift
- Increasing or decreasing friendship
- Giving an item
- Unlocking a location
- Helping with the final bundle
- Changing the player's money, energy, or score
- Changing the ending of the game

Characters should not only appear in printed dialogue. At least some characters should affect gameplay.

### Example characters and possible roles

| Character | Possible Role |
|---|---|
| Lewis | Introduces the Community Center problem and tracks progress |
| Robin | Repairs a bridge or unlocks a new location |
| Pierre | Sells seeds or gives a discount |
| Willy | Helps the player catch a rare fish |
| Clint | Opens geodes or helps find minerals |
| Marnie | Gives animal products after a quest |
| Linus | Teaches foraging or gives a forest item |
| Gus | Sells food that restores energy |
| Wizard | Gives magical hints or Junimo help |
| Morris | Offers a Joja shortcut with a tradeoff |

## 4. Locations Around Town

Your game must include at least **4 locations** the player can visit.

Possible locations include:

- Farm
- Town Square
- Pierre's General Store
- Community Center
- Beach
- Mines
- Forest
- Mountain
- Marnie's Ranch
- Robin's Carpenter Shop
- Wizard's Tower
- JojaMart

Each location should have a purpose. For example:

| Location | Possible Purpose |
|---|---|
| Farm | Grow crops, rest, check inventory |
| Town Square | Talk to Lewis or other villagers |
| Pierre's | Buy seeds |
| Beach | Fish or talk to Willy |
| Mines | Find minerals or talk to Clint |
| Forest | Forage or talk to Linus |
| Community Center | Donate bundle items |
| Marnie's Ranch | Complete an animal product quest |
| Robin's Shop | Unlock or repair a location |
| JojaMart | Buy shortcuts that help the player but increase Joja Influence |

The player should be able to move between locations using a menu or map system.

If you choose a different theme, your locations should match that setting. For example, a *Star Wars* game might use planets, bases, cantinas, or hangars instead of farm-town locations.

## 5. Terminal User Interface

Your game must include a terminal-based user interface.

This means the player should not only see one prompt at a time. Your program should regularly display a formatted game dashboard that helps the player understand the current state of the game.

At minimum, your interface should display:

- Current day, turn, or time remaining
- Current location
- Player energy, money, or other important stats
- Inventory or inventory summary
- Bundle progress
- A map or location display
- A menu of possible actions

### Example terminal dashboard

```text
==================================================
            THE FINAL BUNDLE
==================================================

Day: 3 / 7        Energy: 6 / 10        Money: 120g
Joja Influence: 1
Location: Town Square
Bundle Progress: 3 / 5 items donated

Map:
        [Mines]
           |
[Farm] -- [Town*] -- [Community Center] -- [Beach]
   |
[Forest]

* = You are here

Characters nearby:
- Lewis
- Pierre
- Emily

What would you like to do?
1. Talk to someone
2. Move to another location
3. View inventory
4. View bundle
5. End day
```

Your interface can look different from this example. You are encouraged to be creative.

## 6. Town Map or Location Display

Your game must include some kind of text-based town map or location display.

Your map can be:

- ASCII art
- A grid
- A connected-location map
- A list of locations with the current location marked
- A map that changes when locations are unlocked

### Example connected map

```text
+------------------ Stardew Valley ------------------+

         [Mines]
            |
[Farm] -- [Town Square] -- [Community Center] -- [Beach]
   |            |
[Forest]     [Pierre's]

Current Location: Farm
```

### Example map with current location

```text
+------------------ Stardew Valley ------------------+

         [Mines]
            |
[*Farm] -- [Town Square] -- [Community Center] -- [Beach]
   |            |
[Forest]     [Pierre's]

* = You are here
```

### Example grid map

```text
+------------------------------------------------+
| FARM        | FOREST      | MARNIE'S RANCH     |
|   X         |             |                    |
+------------------------------------------------+
| TOWN        | PIERRE'S    | COMMUNITY CENTER   |
|             |             |                    |
+------------------------------------------------+
| BEACH       | MINES       | JOJAMART           |
|             |             |                    |
+------------------------------------------------+

X = Your current location
```

You may design your own map style.

## 7. Inventory System

Your player must have an inventory.

The inventory should store items the player collects during the game.

Items might include:

- Crops
- Fish
- Minerals
- Animal products
- Forage items
- Gifts
- Quest items
- Food
- Tools

The player should be able to view their inventory.

Example:

```text
Inventory:
1. Parsnip - Crop
2. Sunfish - Fish
3. Copper Ore - Mineral
4. Wild Horseradish - Forage
```

The player should also be able to use items in some way.

Examples:

- Donate an item to the Community Center
- Give an item to a character
- Sell an item for money
- Eat food to restore energy
- Use a quest item to unlock a location

## 8. Resource Management

Your game must include **time** as a limited resource **and at least one additional limited resource** beyond time.

**Time (required)** — the player must face a time limit, such as:

- Days left in the season
- A fixed number of turns
- A maximum number of actions per day or per game

**At least one more limited resource (required)** — choose at least one other resource the player must spend, earn, or manage. Examples include:

- Energy
- Money
- Friendship
- Inventory space

The player should have to make choices because of these limits — time alone is not enough.

For example:

```text
Fishing costs 2 energy.
Mining costs 3 energy.
Talking to villagers costs 1 time block.
Eating food restores 3 energy.
The season ends after Day 7.
```

## 9. JojaMart Tradeoff (or Theme Equivalent)

Your game must include at least one interaction with **JojaMart**, **Morris**, or another Joja-related shortcut. If you are using a different theme, include a similar shortcut system in your world.

This system should create a tradeoff for the player. It can make the game easier in the short term, but using it should have some kind of cost.

Examples of Joja interactions include:

- Buying a missing bundle item
- Buying food or energy drinks
- Paying money to unlock a location faster
- Accepting a Joja repair plan
- Trading friendship or Community Points for a shortcut
- Receiving a different ending if the player relies on Joja too much

If you choose a different theme, the equivalent system could be:

- a suspicious merchant
- a powerful corporation
- a dark magic shortcut
- a bounty hunter or smuggler deal
- a risky alliance with an enemy faction

A simple way to implement this is to track a value such as:

```cpp
int jojaInfluence;
```

Each time the player uses a Joja shortcut, increase Joja Influence.

Example:

```text
You enter JojaMart.

Morris says:
"Why waste time gathering everything yourself? Joja can help... for a price."

1. Buy a rare bundle item - 75g
2. Buy a Joja Cola - 20g, restores 3 energy
3. Leave JojaMart
```

If the player buys from Joja:

```text
You bought a Joja Cola.
Energy increased by 3.
Joja Influence increased by 1.
```

Joja Influence could affect the ending:

| Joja Influence | Possible Ending Effect |
|---|---|
| 0 | The Community Center is restored fully through community effort |
| 1-2 | The Community Center is restored, but the town notices Joja's influence |
| 3+ | The bundle is complete, but Joja has gained power in the valley |

Your Joja system does not need to be complicated, but it should affect gameplay in a meaningful way.

## 10. Game Loop

Your game must have a clear loop that continues until the game ends.

A common structure might be:

```text
Start game
Create player
Create items, characters, locations, and bundle
Repeat until win or loss:
    Display dashboard
    Ask player what they want to do
    Process player choice
    Update player stats
    Update inventory or bundle progress
    Check win/loss condition
Display final ending
```

Your loop does not need to match this exactly, but the game should continue until the player wins, loses, quits, or reaches an ending.

## 11. Ending Condition

Your game must have at least one clear ending.

At minimum, your game should include:

- A win condition
- A losing condition or incomplete ending

Example:

```text
Win:
The player completes the final bundle before the season ends.

Loss:
The season ends before the final bundle is completed.
```

You are encouraged to include multiple endings based on player choices.

### Example endings

| Ending | Requirement |
|---|---|
| Community Hero Ending | Complete the bundle and help several villagers |
| Quiet Restoration Ending | Complete the bundle but have low friendship |
| Joja Shortcut Ending | Complete the bundle using Joja shortcuts |
| Almost There Ending | Make progress but fail to complete the bundle |
| Season Over Ending | Run out of days before donating enough items |

---

# Object-Oriented Programming Requirements

These requirements are **separate from sections 1–11**, but they are still **required**. They describe how your project must use classes and objects.

Your project must use classes and objects.

You must create at least **3 classes**.

At least one of your classes must store objects of another class.

For example:

- A `Player` object stores `Item` objects in an inventory
- A `Game` object stores `Character` objects
- A `Game` object stores `Location` objects
- A `Bundle` object stores required `Item` objects
- A `Character` object stores a `Quest` object

---

## Required Class Design

You may design your own classes, but your project should include a clear object-oriented structure.

A recommended class list is:

```text
Player
Item
Character
Game
```

Optional additional classes include:

```text
Location
Bundle
Quest
Inventory
Event
```

You are not required to use these exact names, but your classes should have clear responsibilities.

---

## Example Class Responsibilities

### `Player`

The `Player` class might store:

- Player name
- Current location
- Energy
- Money
- Current day
- Friendship points
- Inventory
- Bundle progress or score

Possible member functions:

```cpp
void setName(string playerName);
string getName();

void setEnergy(int amount);
int getEnergy();

void addMoney(int amount);
bool spendMoney(int amount);

void moveTo(string locationName);
string getCurrentLocation();

void addItem(Item item);
void displayInventory();

bool hasItem(string itemName);
void removeItem(string itemName);
```

---

### `Item`

The `Item` class might store:

- Item name
- Item type
- Item value
- Whether it is needed for the bundle
- Energy restored if eaten

Possible member functions:

```cpp
string getName();
string getType();
int getValue();
bool isBundleItem();
void displayItem();
```

---

### `Character`

The `Character` class might store:

- Character name
- Location
- Friendship level
- Favorite gift
- Quest request
- Reward item
- Whether their quest has been completed

Possible member functions:

```cpp
string getName();
string getLocation();
int getFriendship();

void talk();
void giveGift(Item item);
bool canCompleteQuest(Player player);
Item giveReward();
void increaseFriendship(int amount);
```

Remember: because pass-by-reference is not allowed, you may need to design your functions carefully. You do not have to use the exact functions listed above.

---

### `Location`

The `Location` class might store:

- Location name
- Description
- Whether it is unlocked
- Characters at that location
- Items that can be found there

Possible member functions:

```cpp
string getName();
bool isUnlocked();
void unlockLocation();
void displayLocation();
Item searchForItem();
```

---

### `Bundle`

The `Bundle` class might store:

- Required items
- Donated items
- Number of items still needed
- Whether the bundle is complete

Possible member functions:

```cpp
void displayBundle();
bool needsItem(string itemName);
void donateItem(Item item);
bool isComplete();
int getProgress();
```

---

### `Game`

The `Game` class might control the full game.

It might store:

- The player
- The list of characters
- The list of locations
- The final bundle
- Current game state

Possible member functions:

```cpp
void startGame();
void displayDashboard();
void displayMap();
void showMainMenu();
void processChoice(int choice);
void movePlayer();
void talkToCharacter();
void visitCommunityCenter();
void endDay();
bool checkWin();
bool checkLoss();
void displayEnding();
```

The `Game` class is a good place to manage the main game loop.

---

# General Programming Requirements

These are **general coding requirements** for your C++ program. They are **required**, but they are **not** part of the numbered game features (1–11). Think of sections 1–11 as *what your game does*. this section is *how your program is built*.

Your program must meet the following standards.

## C++ and program standards

- Use C++
- Use at least **3 classes**
- Use objects in meaningful ways
- At least one class must store objects of another class
- Use arrays or another approved collection structure to store multiple items, characters, or locations
- Use functions to organize your program
- Use loops
- Use conditionals
- Use user input
- Use a terminal-based user interface
- Include a town map or location display
- Include a clear ending
- Include comments explaining important parts of your code

## Not Allowed

You may **not** use any concepts taught outside this class, including other languages, more advanced concepts, different versions of concepts we've taught (an example could be a library for expanding on arrays that we didn't teach) without instructor approval. If you wish to use something not taught in this class, you must get permission from Zachary Kaufman or Amanda Hernandez Sandate first. 

---

# Suggested Gameplay Features

The following features are not all required, but they are good ideas.

You may include:

- Random events
- Weather
- Friendship levels
- Character gifts
- Character quests
- Locked/unlocked locations
- Tool upgrades
- Food that restores energy
- Selling items for money
- Buying seeds or supplies
- Different endings
- A final score
- A help menu
- A save summary printed at the end
- A Joja route or Joja shortcut
- Junimo hints
- A season countdown

---

# Example Projects (Download)

Two sample terminal games are available below each with a Mac and Windows build. Download and run locally to see the kind of experience your project should aim for. These are **demos only** , not starter code. Your submitted project must be your own work.

**Note:** These examples are from previous semesters, when the theme and exact requirements varied (for example, some included multiplayer features). Your project must follow **this** handout. Still, the general outline is the same, and the game loop should look very similar to what you see in these demos.

**Example 1**
- **Mac:** [ProjectExampleMac](/hw/project/ProjectExampleMac)
- **Windows:** [ProjectExample1Windows.exe](/hw/project/ProjectExample1Windows.exe)

**Example 2**
- **Mac:** [ProjectExample2Mac](/hw/project/ProjectExample2Mac)
- **Windows:** [ProjectExample2Windows.exe](/hw/project/ProjectExample2Windows.exe)

---

# Example Game Flow

Below is an example of what one turn might look like.

```text
==================================================
            THE FINAL BUNDLE
==================================================

Day: 2 / 7        Energy: 8 / 10        Money: 75g
Location: Farm
Bundle Progress: 1 / 5 items donated

Map:
        [Mines]
           |
[Farm*] -- [Town] -- [Community Center] -- [Beach]
   |
[Forest]

Inventory:
- Parsnip
- Wood

What would you like to do?
1. Move to another location
2. View inventory
3. View bundle
4. End day
```

If the player chooses to move:

```text
Where would you like to go?
1. Town
2. Forest
3. Stay at Farm
```

If the player goes to Town:

```text
You travel to Town.

Characters nearby:
1. Lewis
2. Pierre
3. Emily

What would you like to do?
1. Talk to Lewis
2. Talk to Pierre
3. Talk to Emily
4. Leave
```

If the player talks to Lewis:

```text
Lewis says:
"The Community Center is almost restored. We only need a few more items.
Check the final bundle board to see what is missing."

Lewis reminds you to visit the Community Center.
```

If the player talks to Pierre:

```text
Pierre says:
"I can sell you seeds, but they will take energy to grow."

1. Buy Parsnip Seeds - 20g
2. Buy Melon Seeds - 40g
3. Leave
```

---

# Example Character Quest

```text
You talk to Robin.

Robin says:
"The bridge to the Forest is broken. If you bring me 3 wood and 2 stone,
I can repair it for you."

Quest Added: Repair the Forest Bridge
Needed: 3 wood, 2 stone
Reward: Forest unlocked
```

Later:

```text
You gave Robin 3 wood and 2 stone.

Robin repaired the bridge!
The Forest is now unlocked.
Friendship with Robin increased by 2.
```

---

# Example Community Center Donation

```text
You enter the Community Center.

Final Bundle:
[✓] Crop
[✓] Mineral
[ ] Fish
[ ] Animal Product
[ ] Forage Item

Inventory:
1. Sunfish
2. Egg
3. Wood

What would you like to donate?
1. Sunfish
2. Egg
3. Nothing
```

If the player donates the Sunfish:

```text
You donated Sunfish to the Final Bundle!
Bundle Progress: 3 / 5
```

---

# Creativity Expectations

This project is not autograded. You are expected to be creative and design your own game.

The *Stardew Valley* version in this handout is the default example, but you may also design your own themed version as long as it still satisfies the required programming and gameplay features.

Your game does not need to match anyone else's game exactly. You may decide:

- Which characters appear
- Which locations exist
- Which items are needed
- How the map looks
- How many days the player has
- How energy and money work
- What quests exist
- How the game ends
- How the final score is calculated

---

# Project Planning Requirements

Before coding, you should plan your project.

Your planning should include:

1. A list of your classes
2. A short description of what each class represents
3. A list of important member variables for each class
4. A list of important member functions for each class
5. A description of your game loop
6. A description or sketch of your terminal UI/map
7. A list of characters and their interactions
8. A list of items and bundle requirements
9. A win/loss condition

---

# Suggested Development Steps

Do not try to build the entire game at once.

A good order is:

1. Create the `Player` class
2. Create the `Item` class
3. Give the player an inventory
4. Create the final bundle
5. Create a simple main menu
6. Add locations
7. Add the map display
8. Add characters
9. Add character interactions
10. Add quests or rewards
11. Add a time limit and at least one additional limited resource (energy, money, etc.)
12. Add JojaMart tradeoffs
13. Add win/loss conditions
14. Improve formatting and user interface
15. Test your game from beginning to end

---

# Minimum Complete Version

A minimum complete version of the project should include:

- A player
- At least 3 classes
- At least 4 locations
- At least 4 meaningful characters (Stardew characters if using the default theme, or theme-appropriate characters if using another theme)
- At least 5 items
- A final bundle
- An inventory
- A map display
- A menu system
- A time limit (required)
- At least one additional limited resource beyond time (required)
- A JojaMart interaction or Joja shortcut system
- A game loop
- A win/loss condition
- Comments throughout the project explaining important parts of your code


## Submission Requirements

For this project, you will use **GitHub** to track your work and submit your final project.

You are expected to create a GitHub repository for your project and regularly push your code as you work. Your GitHub repository should show the development of your project over time through multiple commits. Do not wait until the end to upload all of your code at once.

### Project checkpoints

Submit on Gradescope for each checkpoint (not source files):

- Your **public GitHub repository link**
- The **commit link** for the version you want graded (GitHub → **Commits** → open the commit → copy the page URL)

Checkpoint handouts:

- [Checkpoint 1 — Repository and README](/project/checkpoint/1) — due July 1, 2026
- [Checkpoint 2 — Class skeleton and game loop](/project/checkpoint/2) — due July 8, 2026
- [Checkpoint 3 — Major progress toward complete game](/project/checkpoint/3) — due July 12, 2026

Checkpoint 3 is for progress; your interview is when the full requirements must be met.

Use the **same repository** for all checkpoints and the final submission.

Your final submission will be a link to your GitHub repository.

Your repository should include:

* All `.cpp` and `.h` files needed to compile and run your project
* Any text files needed by your program, if you use file input/output
* A `README.md` file that explains:
  * the theme of your game
  * the goal of your game
  * how to compile and run your program
  * how to play your game
  * which classes you created and what each class does
  * any extra credit features you attempted
* Clear commit history showing progress throughout the project

Your final GitHub repository link should be submitted on Gradescope by the deadline on **July 17**. This is your final code snapshot; **your grade is based on your interview**, not a separate autograder run after that date.

## Interview Grading

This project will be graded through an **interview-style grading session** with a TA or instructor. Interviews are scheduled **July 13–17**.

You will sign up for an interview slot using the link below:

**Interview Sign-Up Link:** [Interview sign-up sheet](https://o365coloradoedu-my.sharepoint.com/:x:/g/personal/zaka5614_colorado_edu/IQCoz0203VaETpD6keVFTO-GAQwvIbj4nljUFeBlVLAcqk4?e=3pwIcN)

Sign-up closes **Friday, July 11 at 11:59 PM Mountain Time**. Add your name only to an **open** slot. Do not overwrite or erase another student's name.

If you miss your scheduled interview, you will receive a **0** on the final project.

Your game must be **complete when your interview begins**. You may keep working until the start of **your** signed-up slot. During the session, you will demo your program and walk through your code. You should be prepared to explain how your project works, how your classes are designed, and how your code implements the required game features. If you attempted any extra credit features, you may present them during your interview.

## Extra Credit Opportunities

Extra credit is for features that add meaningful complexity to the game, not just more printed text. To receive extra credit, the feature must be fully implemented and explained in your reflection or README.

#### Max Amount of Extra Credit:

On this project you may have a maximum of 11 points of extra credit (meaning, you can pick up to two of the extra credit opportunities below, all of which are worth five points except one which is worth six points). However, if you create your own extra credit option which is approved, you may complete that in addition to up to two of the pre-made extra credit options (or you may complete your own idea without any other extra credit options). 

So, if you don't create your own extra credit idea, then your maximum extra credit is 11 points, or two of the pre-made options. If you do create your own extra credit idea which is approved, then you may complete that as well as a maximum of 11 points from the pre-made options, allowing you to go above 11 points. You may also do your own idea alone, or with only one other pre-made option.

### Option 1: Shortest Path or Map Recommendation Algorithm (+5 points)

Add an algorithm that helps the player navigate the town map.

For example, if your town is represented as connected locations or a grid, your program can calculate the shortest path from the player's current location to a destination.

Example:

```text
Where do you want to go?
1. Community Center
2. Mines
3. Beach

Recommended route to the Mines:
Town Square -> Mountain -> Mines
Estimated travel cost: 2 energy
```

This could be implemented using a graph search algorithm such as **breadth-first search (BFS)** for an unweighted map.

### Option 2: Weighted Route Planning (+5 points)

Create a more advanced route planner where different paths have different costs.

For example:

- Walking through town costs 1 energy
- Walking through the forest costs 2 energy
- Using a minecart costs money but saves energy
- Some paths are locked until a quest is completed

Your program can recommend the cheapest or most efficient path based on energy, money, or time.

### Option 3: Character Schedules (+5 points)

Give characters schedules that change based on the day, time, weather, or game progress.

Example:

```text
Day 1 Morning: Willy is at the Beach
Day 1 Evening: Willy is at the Saloon
Rainy Day: Linus is in his tent
After the bridge is repaired: Robin appears near the Forest
```

### Option 4: Weather System with Gameplay Effects (+5 points)

Add a weather system that changes what actions are available or how likely certain events are.

Example:

- Rainy days make rare fish easier to catch
- Sunny days make crops grow faster
- Stormy days close the mines
- Snowy days make foraging harder

### Option 5: Save and Load System (+5 points)

Add file input/output so the player can save their game and load it later.

Your save file might store:

- Current day
- Player energy and money
- Current location
- Inventory items
- Bundle progress
- Friendship levels
- Joja Influence
- Unlocked locations

### Option 6: Smarter Bundle Planner (+6 points)

Add a system that recommends what the player should do next based on the missing bundle items.

Example:

```text
Bundle Planner:
You still need a fish and a mineral.
Recommended next steps:
1. Visit Willy at the Beach to improve your fishing chance.
2. Visit the Mines to search for Copper Ore.
```

### Create Your Own EC Opportunity

If you have an idea for an extension of your game that isn't listed here, submit your proposal using the QR code below. Course staff will review your idea and decide on a point value if it is approved.

![Extra Credit Plan Submission](/hw/project/QR.png)
