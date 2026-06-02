# Homework 2

Handout for **Homework 2** will be filled in before this assignment opens.

## Part A (recitation)

_To be announced._

## Part B (Gradescope)

_To be announced._


# Homework 2

**Part A** (this handout) is due **during your recitation section**. Complete the string exercises below and submit your three source files as described in the **ACTION REQUIRED** note.

**Part B** is submitted on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Tuesday, June 9th, 2026 at 11:59 PM Mountain Time**.

---

## Part A

This lab introduces **strings** in C++: declaring them, measuring their length, and accessing individual characters by index. You will write **three** short programs, each in its **own** `.cpp` file. Use the **exact file names** given below.

### String Basics

A `string` holds a sequence of characters. To use strings you need both the `<iostream>` and `<string>` headers.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Hello, Pelican Town!";
    cout << greeting << endl;
    cout << "Length: " << greeting.length() << endl;  // 20
    cout << "First character: " << greeting[0] << endl;  // H
}
```

Key operations you will use today:

| Operation | Syntax | What it does |
| --- | --- | --- |
| Declare | `string s = "text";` | Create a string variable |
| Print | `cout << s;` | Output the string |
| Length | `s.length()` | Number of characters (an `int`) |
| Index | `s[i]` | Character at position `i` (0-based) |
| Concatenate | `s1 + s2` | Join two strings together |

> **0-based indexing:** The first character is at index `0`, the second at `1`, and the last at `s.length() - 1`.

---

### Exercise 1 — `hw2A1.cpp`

Create a file named **`hw2A1.cpp`** and type the program below. Replace `"Juniper"` and `"Moonlight Farm"` with your own farmer name and farm name. Then, print out the farmer name and farm name, as well as the length of the farmer name and farm name.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string farmerName = "Juniper";
    string farmName   = "Kaufdrop Farm";

    cout << "Farmer: " << /*Code to print farmerName*/ << endl;
    cout << "Farm: "   << /*Code to print farmName*/ << endl;
    cout << "Farmer name length: " << /*Code to print length of farmerName*/ << endl;
    cout << "Farm name length: "   << /*Code to print length of farmName*/ << endl;
}
```

Save (**Command+S** on Mac or **Ctrl+S** on Windows), then compile and run. Your output should resemble:

```text
Farmer: Juniper
Farm: Kaufdrop Farm
Farmer name length: 7
Farm name length: 13
```

Your numbers will differ depending on the names you chose. When the output looks correct, leave this file as-is and continue.

---

### Exercise 2 — `hw2A2.cpp`

Create a **new** file named **`hw2A2.cpp`** (do not overwrite Exercise 1). Using the same `farmName` string, access three specific characters by index and print them.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string farmName = "Moonlight Farm";

    cout << "First character:  " << /*Code to print first character of farmName*/ << endl;
    cout << "Last character:   " << /*Code to print last character of farmName*/ << endl;
    cout << "Middle character: " << /*Code to print middle character of farmName*/ << endl;
}
```

Example output for `"Moonlight Farm"`:

```text
First character:  M
Last character:   m
Middle character: h
```

Notice that `farmName.length() - 1` and `farmName.length() / 2` are both **integer expressions** — `length()` returns an `int`, so normal integer arithmetic applies. If your farm name is even, the middle character will be the character before the middle (round the index down). If your farm name is odd, the middle character will be the character at the middle.

---

### Exercise 3 — `hw2A3.cpp`

Create a **new** file named **`hw2A3.cpp`**. Build a welcome sign by **concatenating** strings with `+`, then print the combined message and its total length.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Welcome to ";
    string farmName = "Grandpa's Farm";
    string fullMessage = /*Code to concatenate greeting and farmName with a space in between*/;

    cout << /*Code to print fullMessage*/ << endl;
    cout << "Sign length: " << /*Code to print length of fullMessage*/ << endl;
}
```

Example output:

```text
Welcome to Grandpa's Farm!
Sign length: 25
```

When you have finished all three exercises, **[submit on Gradescope](https://www.gradescope.com/courses/1314704)**. Open the **Homework 2 - Part A** item and upload **these three source files** (names must match **exactly**; no screenshots):

- **`hw2A1.cpp`** — String declarations and `.length()`
- **`hw2A2.cpp`** — Character indexing
- **`hw2A3.cpp`** — String concatenation

---
## Part B
---

# How to Write This Program

For this assignment, you will write one complete C++ program in a file named:

```text
hw2b.cpp
```

Every C++ program needs a `main()` function. Start with this template and write all of your code inside the curly braces `{ }` of `main()`.

```cpp
#include <iostream>
#include <string>

using namespace std;

int main() {

    // Write your homework code here

    return 0;
}
```

You are **not** expected to write your own functions yet. We will cover functions later in the course.

---

# Problem 1: The Farm Sign

Your farmer has been in Pelican Town for a week and it is finally time to hang a proper sign outside the farm.

Pierre's shop carves wooden signs that hold **exactly 20 characters**. Your farmer wants to know whether the farm name fits, how much space is left over, and how much it will cost.

Declare a `string` variable for your farm name (pick any name, but keep it under 20 characters). Then:

- **Characters Available:** 20
- **Characters Used:** the length of your farm name
- **Characters Remaining:** Characters Available − Characters Used
- **Sign Cost:** Characters Used × 3 *(Pierre charges 3 gold per character)*

Print this exact section header:

```text
--- Farm Sign ---
```

Your output must include these exact labels:

```text
Farm Name:
Characters Available:
Characters Used:
Characters Remaining:
Sign Cost:
```

Example output:

```text
--- Farm Sign ---
Farm Name: Sunridge Farm
Characters Available: 20
Characters Used: 12
Characters Remaining: 8
Sign Cost: 36
```

---

# Problem 2: Daily Energy Planner

Every morning your farmer wakes up with a set amount of energy. Before heading out, they decide which tasks to tackle today.

Use these exact values:

- Starting Energy: 80
- Watering Task Cost: 20
- Chopping Task Cost: 30
- Mining Task Cost: 40

**Step 1 — Full-day check:** Add all three task costs together. Use `if / else` to print one of these messages:

- If total task cost ≤ Starting Energy: `"Full day planned: all tasks can be completed."`
- Otherwise: `"Not enough energy for all tasks today."`

**Step 2 — Individual task checks:** For each task separately, use `if / else` to print whether the task is scheduled or skipped:

- If Starting Energy ≥ task cost: print `"<Task>: scheduled"`
- Otherwise: print `"<Task>: skipped"`

Print this exact section header:

```text
--- Daily Planner ---
```

Your output must include this exact label:

```text
Energy Report:
```

Expected output:

```text
--- Daily Planner ---
Energy Report:
Not enough energy for all tasks today.
Watering: scheduled
Chopping: scheduled
Mining: skipped
```

<<<HINT>>>

- Calculate the total task cost first: `int totalCost = waterCost + chopCost + mineCost;`
- Compare `totalCost` with `startingEnergy` for the full-day check.
- Write a **separate** `if / else` for each individual task — do not nest them inside each other.
- 20 + 30 + 40 = 90, which exceeds 80, but each task on its own is under 80.

<<<END_HINT>>>

---

# Problem 3: The Traveling Merchant

Once a week a mysterious merchant rolls into Pelican Town selling rare goods. Some items are priced in whole gold; others cost a fraction of a coin.

Use these exact values:

- Farmer's Gold: 100
- Rare Seed Cost: 1000 *(whole gold)*
- Magic Fertilizer Cost Per Bag: 2.5 *(gold — this is a `float`)*
- Bags of Fertilizer Wanted: 6

Calculate:

- **Fertilizer Total** = Magic Fertilizer Cost Per Bag × Bags Wanted *(result is a `float`)*

Then use `if / else` to print a purchase decision for each item:

- If Farmer's Gold ≥ Rare Seed Cost: `"You can afford the Rare Seed."`; otherwise `"The Rare Seed is out of your budget."`
- If Farmer's Gold ≥ Fertilizer Total: `"You can afford the fertilizer."`; otherwise `"Not enough gold for fertilizer."`

Print this exact section header:

```text
--- Merchant Visit ---
```

Your output must include these exact labels:

```text
Farmer Gold:
Rare Seed Cost:
Fertilizer Cost Per Bag:
Bags Wanted:
Fertilizer Total:
```

Expected output:

```text
--- Merchant Visit ---
Farmer Gold: 100
Rare Seed Cost: 1000
Fertilizer Cost Per Bag: 2.5
Bags Wanted: 6
Fertilizer Total: 15
The Rare Seed is out of your budget.
You can afford the fertilizer.
```

<<<HINT>>>

- Declare the cost as a `float`: `float fertilizerCostPerBag = 2.5;`
- When you multiply a `float` by an `int`, C++ promotes the result to a `float` automatically.
- Use `>=` for "greater than or equal to" comparisons.
- 2.5 × 6 = 15.0, which prints as `15` (no decimal) unless you change the output format — no decimal is fine here.

<<<END_HINT>>>

---

# Problem 4: Season Crop Report

It is planning time! The season is stored as an integer: 1 = Spring, 2 = Summer, 3 = Fall, 4 = Winter.

Use this exact value:

- Current Season: 3

Use an **if / else-if / else** chain to determine the season name and the best crop to plant that season. Then use a **second** `if / else` to decide whether it is a good time to plant at all.

Season reference:

| Season # | Season Name | Best Crop | Good Time to Plant? |
| --- | --- | --- | --- |
| 1 | Spring | Strawberry | Yes |
| 2 | Summer | Blueberry | Yes |
| 3 | Fall | Pumpkin | Yes |
| 4 | Winter | None | No |

Print this exact section header:

```text
--- Season Report ---
```

Your output must include these exact labels:

```text
Season Number:
Season Name:
Best Crop:
Good Time to Plant:
```

Expected output:

```text
--- Season Report ---
Season Number: 3
Season Name: Fall
Best Crop: Pumpkin
Good Time to Plant: Yes
```

<<<HINT>>>

- Use `if (season == 1)` ... `else if (season == 2)` ... and so on.
- Inside each branch, set `string` variables such as `seasonName` and `bestCrop`.
- Print those variables **after** the chain ends.
- For the planting message, write a second `if / else` that checks `if (season == 4)` to handle the Winter case separately.

<<<END_HINT>>>

---

# Problem 5: Fixing Willy's Weather Check

Your farmer runs into Willy the fisherman, who has been trying to write a program to decide whether to go fishing based on the day's weather. His code is riddled with bugs.

Copy this broken code into your file **as comments**:

```cpp
// int weatherCode = 1
// string weather;
// if weatherCode = 1 {
//     weather = "Sunny";
// else if (weatherCode == 2)
//     weather = Rainy;
// }
// else {
//     weather = "Stormy"
// }
// if (weather = "Sunny" || weather = "Rainy") {
//     cout << "Willy heads out fishing." << endl;
// } else
//     cout << "Too stormy to fish today." << endl;
```

Then write a **corrected version** underneath it. The weather is stored as an integer: 1 = Sunny, 2 = Rainy, 3 = Stormy.

For this exercise, the weather is sunny.

Print this exact section header:

```text
--- Willy's Weather Check ---
```

Your output must include this label:

```text
Weather:
```

Expected output:

```text
--- Willy's Weather Check ---
Weather: Sunny
Willy heads out fishing.
```

You must include at least **two comments** explaining what you fixed. For example:

```cpp
// Fixed: added missing semicolon after the weatherCode declaration.
// Fixed: changed = to == in the if condition so it compares instead of assigns.
```

<<<HINT>>>

There are at least **five** bugs in the code. Look for:

- A missing semicolon on a variable declaration
- An `if` condition not wrapped in parentheses `( )`
- An assignment operator `=` used where a comparison `==` is needed (this appears more than once)
- A string value missing its quotation marks
- A missing semicolon inside a code block
- A missing closing brace `}` in the wrong place

<<<END_HINT>>>

---

# Final Output Requirements

Your program must print all of the following section headers **exactly** as written:

```text
--- Farm Sign ---
[Problem 1 output]
--- Daily Planner ---
[Problem 2 output]
--- Merchant Visit ---
[Problem 3 output]
--- Season Report ---
[Problem 4 output]
--- Willy's Weather Check ---
[Problem 5 output]
```

Your program must compile and run **without errors or warnings** (with `-Wall -Werror -Wpedantic`).

Submit one file:

```text
hw2b.cpp
```

<<<HW_ACTION>>>

Submit **Part B** on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Friday, June 12, 2026 at 11:59 PM Mountain Time**. Upload **one** file named **`hw2b.cpp`**.

<<<END_HW_ACTION>>>