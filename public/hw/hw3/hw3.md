# Homework 3

**Part A** (this handout) is due **during your recitation section**. Complete the exercises below and submit your five source files as described in the **ACTION REQUIRED** note.

**Part B** is submitted on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **June 16th at 11:59 PM Mountain Time**.

---

## Part A

This lab introduces **nested if/else**, **switch statements**, and **loops**. Each new concept gets a short example before its exercise.

The Pelican Town **Community Center** has sat in disrepair for years, and the farmer has finally decided to do something about it. The building has six rooms in need of restoration: the **Pantry**, the **Crafts Room**, the **Fish Tank**, the **Boiler Room**, the **Vault**, and the **Bulletin Board**. It is a long road ahead. Each room requires its own set of bundles, and none of them will be easy. This week, the farmer starts where every good farm starts: the **Pantry**.

---

### Nested if/else

An `if` statement can be placed *inside* another `if` or `else` block. The inner check only runs when the outer condition is already true.

Example:
```cpp
if (condition) {
    if (condition2) {
        <body>
    } else {
        <body>
    }
} else {
    <body>
}
```

### Important Note on I/O

You will have a lot of I/O in all the following assignments. You will primarily be using `cin` and `getline()` to read input from the user. If you are getting strange behavior from your code, but no warnings/errors, try using `.ignore()` to clear the input buffer.

#### .ignore() And The Use Of Arguments

This most commonly matters when you use `cin >>` first and then use `getline()` afterward. The `cin >>` reads the value but leaves the newline in the input buffer, so the next `getline()` may read that leftover newline as an empty string. Another `cin >>` usually skips leading whitespace automatically, so the problem is less common when you read numbers or single words with `cin >>` back to back.

`.ignore()` clears characters from the input buffer. It takes two optional arguments: how many characters to skip at most, and a *delimiter* character that stops the skip early. The defaults are `1` and `'\n'`. To clear through the next newline after a `cin >>`, a common pattern is:

```cpp
cin.ignore(1000, '\n');
```

Note: If the delimiter is found before the maximum number of characters, `.ignore()` stops at the delimiter.

Example:
The buffer has `"Hello World!\n"` in it, and you want to get rid of everything up to the first space. You could use `cin.ignore(1000, ' ')` to skip up to the first space. After that call, the buffer will have `"World!\n"` in it.

---

### Exercise 1 — `hw3A1.cpp`

The farmer is sorting through their crops to find donations for the Community Center's **Pantry bundle**. An item is accepted only if it meets **both** of the following requirements:

- Crop quality is **Silver (1) or better** (Gold = 2, Silver = 1, Normal = 0)
- Crop type is **`"Vegetable"`**

If quality is high enough but the type is wrong, print a different message than when quality itself is too low. There are four possible outcomes — make sure your nested `if/else` handles all four.

Print the following prompts and read each value from the user:

- `"Enter the crop name: "` --> read into a `string` using `cin`
- `"Enter the crop quality (0 = Normal, 1 = Silver, 2 = Gold): "` --> read into an `int` using `cin`
- `"Enter the crop type: "` --> read into a `string` using `cin`

Use these exact values:

- Required Quality: `1`
- Required Type: `"Vegetable"`

Print this exact section header:

```text
--- Bundle Check ---
```

Your output must include these exact labels:

```text
Crop:
Quality:
Type:
Bundle Status:
```

Expected output (with sample inputs: Parsnip, 2, Vegetable):

```text
Enter the crop name: *Parsnip*
Enter the crop quality (0 = Normal, 1 = Silver, 2 = Gold): *2*
Enter the crop type: *Vegetable*
--- Bundle Check ---
Crop: Parsnip
Quality: 2
Type: Vegetable
Bundle Status: Accepted - this crop meets all bundle requirements!
```

The other two possible `Bundle Status` messages are:

```text
Bundle Status: Rejected - wrong crop type and quality is too low.
Bundle Status: Rejected - quality is too low.
Bundle Status: Rejected - wrong crop type for this bundle.
```

---

### Switch Statements

A `switch` statement tests a single integer or character value against a list of exact cases. It is often cleaner than a long `if / else if` chain when you are matching specific values.

```cpp
int season = 2;

switch (season) {
    case 1:
        cout << "Spring" << endl;
        break;
    case 2:
        cout << "Summer" << endl;
        break;
    case 3:
        cout << "Fall" << endl;
        break;
    case 4:
        cout << "Winter" << endl;
        break;
    default:
        cout << "Unknown season" << endl;
}
```

Each `case` ends with a `break` to stop execution from continuing into the next case. The `default` case runs when no other case matches.

---

### Exercise 2 — `hw3A2.cpp`

The Community Center has six rooms, each holding a different set of bundles. The farmer is assigned to repair one room each week. Print a prompt, read a room number from the user, and use a `switch` statement to look up its name.

Room reference:

| Room Number | Room Name |
| --- | --- |
| 1 | Pantry |
| 2 | Crafts Room |
| 3 | Fish Tank |
| 4 | Boiler Room |
| 5 | Vault |
| 6 | Bulletin Board |

Print the following prompt and read the value from the user:

- `"Enter a room number (1-6): "` --> read into an `int` using `cin`

Print this exact section header:

```text
--- Room Assignment ---
```

Your output must include these exact labels:

```text
Room Number:
Room Name:
```

Expected output (with sample input: 1):

```text
Enter a room number (1-6): *1*
--- Room Assignment ---
Room Number: 1
Room Name: Pantry
This week's goal: Repair the Pantry bundles!
```

If the room number does not match any case, print:

```text
Enter a room number (1-6): *9*
--- Room Assignment ---
Room Number: 9
No room found for that number.
```

---

### Loops

A loop repeats a block of code. Two common types are:

**`for` loop** — use when you know in advance how many times to repeat:

```cpp
for (int i = 1; i <= 5; i++) {
    cout << "Day " << i << endl;
}
```

**`while` loop** — use when you repeat until a condition becomes false:

```cpp
int energy = 100;
while (energy > 0) {
    energy -= 25;
    cout << "Energy remaining: " << energy << endl;
}
```

| Loop type | Best when... |
| --- | --- |
| `for` | You know the number of iterations in advance |
| `while` | You repeat until a condition changes |

For all loop exercises in Part A, **you may use either a `for` loop or a `while` loop**. Choose whichever feels more natural for each problem.

---

### Exercise 3 — `hw3A3.cpp`

The farmer needs to collect items to complete the **Pantry bundle**. Each item costs a fixed amount of energy to gather (15). Use a loop to simulate the collection process, printing the farmer's remaining energy after each item.

Print the following prompts and read each value from the user:

- `"Enter the number of items to collect: "` --> read into an `int` using `cin`

You will also have an initial energy level, this exact value:

- startingEnergy: 100

Print this exact section header:

```text
--- Bundle Collection ---
```

Expected output (with sample input: 5):

```text
Enter the number of items to collect: 5
--- Bundle Collection ---
Collecting item 1... Energy remaining: 85
Collecting item 2... Energy remaining: 70
Collecting item 3... Energy remaining: 55
Collecting item 4... Energy remaining: 40
Collecting item 5... Energy remaining: 25
Collection complete! You gathered 5 items.
```

If you run out of energy, print the following message and then stop the loop (you can use a `break` statement to do this):

```text
Not enough energy to collect more items.
```

Expected output (with sample input: 10):

```text
Enter the number of items to collect: 10
--- Bundle Collection ---
Collecting item 1... Energy remaining: 85
Collecting item 2... Energy remaining: 70
Collecting item 3... Energy remaining: 55
Collecting item 4... Energy remaining: 40
Collecting item 5... Energy remaining: 25
Collecting item 6... Energy remaining: 10
Not enough energy to collect more items.
Collection complete! You gathered 6 items.
```

---

### Looping Through Strings

A string is a sequence of characters, and you can step through it index by index using `.length()`:

```cpp
string name = "Pelican";
for (int i = 0; i < name.length(); i++) {
    cout << name[i] << endl;
}
```

Combining this with `if / else` lets you inspect or count individual characters.

---

### Exercise 4 — `hw3A4.cpp`

The farmer has a superstition: crops whose names contain the letter 'e' are especially lucky. Print prompts, read a crop name from the user, then scan the crop name character by character and count how many times 'e' appears, printing its index each time it is found.

Print the following prompts and read each value from the user:

- `"Enter the crop name: "` --> read into a `string` using `cin`

Print this exact section header:

```text
--- Crop Name Inspector ---
```

Your output must include these exact labels:

```text
Crop:
Total count:
```

Expected output (with sample input: Blueberry):

```text
Enter the crop name: Blueberry
--- Crop Name Inspector ---
Crop: Blueberry
e found at index 3
e found at index 5
Total count: 2
```

---

### Exercise 5 — `hw3A5.cpp`

Before bed, the farmer walks their farm and checks which plots need fertilizer for tomorrow. A plot needs fertilizer if its plot number is **divisible by 3**. Read the total number of plots from the user, then loop through all of them, print the status of each, and print a final count.

Print the following prompt and read the value from the user:

- `"Enter the total number of farm plots: "` --> read into an `int` using `cin`

Print this exact section header:

```text
--- Fertilizer Check ---
```

Expected output (with sample input: 10):

```text
Enter the total number of farm plots: 10
--- Fertilizer Check ---
Plot 1: no fertilizer needed
Plot 2: no fertilizer needed
Plot 3: needs fertilizer
Plot 4: no fertilizer needed
Plot 5: no fertilizer needed
Plot 6: needs fertilizer
Plot 7: no fertilizer needed
Plot 8: no fertilizer needed
Plot 9: needs fertilizer
Plot 10: no fertilizer needed
Plots needing fertilizer: 3
```

---

<<<HW_ACTION>>>

Submit **Part A** on **[Gradescope](https://www.gradescope.com/courses/1314704)**. Open the **Homework 3 (A)** item and upload **these five source files** (names must match **exactly**; no screenshots):

- **`hw3A1.cpp`** — Nested if/else: bundle quality check
- **`hw3A2.cpp`** — Switch: room assignment
- **`hw3A3.cpp`** — Loop: bundle item collection
- **`hw3A4.cpp`** — Loop through string: crop name inspector
- **`hw3A5.cpp`** — Loop + conditional: fertilizer check

<<<END_HW_ACTION>>>

---
## Part B
---

# How to Write This Program

For this assignment, you will write one complete C++ program in a file named:

```text
hw3b.cpp
```

Starting with this assignment, you will define and call your own **functions**. Functions must be **defined above `main()`**. Use this template:

```cpp
#include <iostream>
#include <string>

using namespace std;

// Define your functions here, above main()

int main() {

    // Write your homework code here

    return 0;
}
```

You will define functions, call them from `main`, and use their return values throughout this assignment.

---

You are the Assistant [to the] Regional Manager of JojaMart Pelican Town, **Morris** (the Regional Manager). The Pelican Town Community Center still stands — a constant thorn in **Morris'** side and a symbol that not everyone has embraced the Joja way of life. **Morris** has big plans for this town, but big plans require solid foundations. This week, you are laying the groundwork: building the tools, running the numbers, and putting the first pieces of the Joja machine in motion. The real push comes later. For now, the spreadsheets don't fill themselves - and **Morris** has assigned you to help him out.

---

# Problem 1: Weekly Sales Review

Morris pulls up last week's JojaMart sales data. Sales started slow but grew steadily. He needs to know which days hit the daily quota and how many days JojaMart delivered. You'll need to analyze a full week, from Sunday (day 0) to Saturday (day 6).

Daily sales follow this formula: `sales on day i = baseSales + (i * dailyGrowth)`

Use this exact value:

- Daily Quota: `53`
- Base Sales: `50`
- Daily Sales Growth: `2`

For each day of the week, print the day's sales and whether the quota was met. Then print the total count of days that met the quota.

> **Note:** Use a **`for` loop** for this problem.

Print this exact section header:

```text
--- Weekly Sales Review ---
```

Expected output:

```text
--- Weekly Sales Review ---
Day 0: 50 gold - below quota
Day 1: 52 gold - below quota
Day 2: 54 gold - met quota
Day 3: 56 gold - met quota
Day 4: 58 gold - met quota
Day 5: 60 gold - met quota
Day 6: 62 gold - met quota
Days meeting quota: 5
```

You can do all of this in the `main` function. 

---

# Problem 2: The Quarterly Report Header

Every Joja report Morris sends to corporate starts with the same header. Write a **void function** named `printJojaHeader` that takes **no arguments** and prints the header below. Then call it in `main`.

```text
===========================
   JOJA CORPORATION
   Q3 Performance Report
===========================
```

Print this exact section header first (in `main`):

```text
--- Quarterly Report ---
```

Expected output:

```text
--- Quarterly Report ---
===========================
   JOJA CORPORATION
   Q3 Performance Report
===========================
```

---

# Problem 3: Annual Sales Target

Morris always keeps the annual target in the back of his mind. Write a function named `getAnnualTarget` that takes **no arguments** and **returns** the annual sales target as an `int`. The target is **50000 gold**.

In `main`, call `getAnnualTarget()` and use its return value to calculate how far Joja currently is from the annual goal.

Print the following prompt and read the value from the user:

- `"Enter current total sales (gold): "` --> read into an `int` using `cin`

Use this exact value:

- Annual Target: returned by `getAnnualTarget()`
- Sales Gap = Annual Target − Current Total Sales

Print this exact section header:

```text
--- Annual Target ---
```

Your output must include these exact labels:

```text
Annual Target:
Current Sales:
Sales Gap:
```

Expected output (with sample input: 1540):

```text
Enter current total sales (gold): 1540
--- Annual Target ---
Annual Target: 50000
Current Sales: 1540
Sales Gap: 48460
```

Note: ALL of the math and printing is happening in the `main` function, getAnnualTarget() just returns what the annual target is as an int. 

---

# Problem 4: The Profit Calculator

Morris needs a reusable profit calculator for Joja's product lines. Write a function named `calculateProfit` that takes **two `int` arguments** — `revenue` and `cost` — and **returns** their difference as an `int`.

In `main`, call `calculateProfit` for each of Joja's three product lines. The first two product lines use hardcoded values; the third reads its values from the user.

Print the following prompts and read each value from the user for the third product line:

- `"Enter revenue for Joja Membership Fees: "` --> read into an `int` using `cin`
- `"Enter cost for Joja Membership Fees: "` --> read into an `int` using `cin`

Use these exact values for the first two product lines:

| Product Line | Revenue | Cost |
| --- | --- | --- |
| Joja Cola | 8000 | 3200 |
| Joja Brand Seeds | 5500 | 2100 |

Print this exact section header:

```text
--- Profit Calculator ---
```

Your output must include these exact labels for each product:

```text
Product:
Revenue:
Cost:
Profit:
```

Expected output (with sample inputs: revenue 12000, cost 1500):

```text
Enter revenue for Joja Membership Fees: 12000
Enter cost for Joja Membership Fees: 1500
--- Profit Calculator ---
Product: Joja Cola
Revenue: 8000
Cost: 3200
Profit: 4800
Product: Joja Brand Seeds
Revenue: 5500
Cost: 2100
Profit: 3400
Product: Joja Membership Fees
Revenue: 12000
Cost: 1500
Profit: 10500
```

---

# Problem 5: Draining the Opposition Fund

Joja has quietly set aside a fund to counteract the Community Center restoration effort. Morris will spend from this fund in campaign rounds until it runs dry. If there is not enough gold for a full round, spend whatever remains and print a partial round message.

Print the following prompt and read the starting fund from the user once:

- `"Enter the starting opposition fund (gold): "` --> read into an `int` using `cin`

You may assume the starting opposition fund is greater than or equal to 0.

Then use a **while loop** to read the cost per round **until** the user enters a valid value. Each time through the loop:

- Print `"Enter the cost per campaign round (gold): "` and read into an `int` using `cin`
- If the cost is **less than or equal to 0**, print this exact message and **prompt again**:

```text
Invalid campaign cost.
```

- If the cost is **greater than 0**, stop asking and continue to the spending logic below.

> **Note:** Use a **`while` loop** to drain the fund after you have a valid campaign cost.

Print this exact section header **after** you have a valid cost and **before** the round-by-round spending output:

```text
--- Opposition Fund ---
```

> **Note:** Use a **`while` loop** for this problem.

Expected output (with sample inputs: fund 500, cost 0, then cost 80):

```text
Enter the starting opposition fund (gold): 500
Enter the cost per campaign round (gold): 0
Invalid campaign cost.
Enter the cost per campaign round (gold): 80
--- Opposition Fund ---
Round 1: spent 80 gold. Remaining: 420
Round 2: spent 80 gold. Remaining: 340
Round 3: spent 80 gold. Remaining: 260
Round 4: spent 80 gold. Remaining: 180
Round 5: spent 80 gold. Remaining: 100
Round 6: spent 80 gold. Remaining: 20
Round 7: spent 20 gold (partial round). Remaining: 0
Total rounds of campaigning: 7
```

Expected output (with sample inputs: fund 500, cost per round 80 on the first try):

```text
Enter the starting opposition fund (gold): 500
Enter the cost per campaign round (gold): 80
--- Opposition Fund ---
Round 1: spent 80 gold. Remaining: 420
Round 2: spent 80 gold. Remaining: 340
Round 3: spent 80 gold. Remaining: 260
Round 4: spent 80 gold. Remaining: 180
Round 5: spent 80 gold. Remaining: 100
Round 6: spent 80 gold. Remaining: 20
Round 7: spent 20 gold (partial round). Remaining: 0
Total rounds of campaigning: 7
```

---

# Problem 6: Targeted Ad Campaign

Morris is launching a targeted ad campaign across Pelican Town's neighborhoods. Each neighborhood has a **receptiveness score**. The campaign assigns a spending tier based on the score, skipping any neighborhood that falls below the minimum threshold. Begin the neighborhood number at 0.

Each neighborhood's score is calculated as: `neighborhoodNumber * 3`

Tier rules:

| Receptiveness Score | Result |
| --- | --- |
| Below 4 | Below threshold - skip |
| 4 to 6 | Tier 1 - budget: 200 gold |
| 7 or above | Tier 2 - budget: 400 gold |

Print the following prompt and read the value from the user:

- `"Enter the number of neighborhoods: "` --> read into an `int` using `cin`

Use this exact value:

- Score Formula: `neighborhoodNumber * 3`

Print a summary line for each neighborhood and the total campaign budget spent across all non-skipped neighborhoods.

Print this exact section header:

```text
--- Ad Campaign ---
```

Expected output (with sample input: 5 neighborhoods):

```text
Enter the number of neighborhoods: 5
--- Ad Campaign ---
Neighborhood 0: score 0 - below threshold, skipped
Neighborhood 1: score 3 - below threshold, skipped
Neighborhood 2: score 6 - Tier 1, budget: 200
Neighborhood 3: score 9 - Tier 2, budget: 400
Neighborhood 4: score 12 - Tier 2, budget: 400
Total campaign budget: 1000
```

---

# Problem 7: Debugging Morris's Commission Calculator

It is late and Morris is trying to run his sales commission calculator before heading home — but the program is a mess. Help him fix it.

Copy this broken code into your file **as comments**:

```cpp
// int baseSalary = 3000;
// int salesCount;
// double commissionRate = 0.05
// totalCommission = commissionRate * salesCount;
// if (salesCount > 20)
//     cout << "On track." << endl;
// } else if (salesCount > 50) {
//     cout << "Bonus earned!" << endl;
// }
// 
// cout << "Base Salary: " << baseSalary << endl;
// cout << "Commission: " << totalCommission << endl;
```

Then write a **corrected version** underneath it. In your corrected version, print a prompt and use `cin` to read `salesCount` from the user. For the other variables, use the values provided.

Print this exact section header:

```text
--- Commission Calculator ---
```

Your output must include these exact labels:

```text
Base Salary:
Sales Count:
Commission Rate:
Total Commission:
```

Expected output (with sample input: 60):

```text
Enter the number of sales made: 60
--- Commission Calculator ---
Base Salary: 3000
Sales Count: 60
Commission Rate: 0.05
Total Commission: 3
Bonus earned!
```

You must include at least **two comments** explaining what you fixed. For example (these are not the correct comments, just an example):

```cpp
// Fixed: added missing semicolon after baseSalary declaration.
// Fixed: added a cout for the baseSalary variable.
```

---

# Final Output Requirements

Your program must print all prompts and section headers in the order shown. The full output of your program should follow this structure:

```text
[Problem 1 prompts]
--- Weekly Sales Review ---
[Problem 1 output]
--- Quarterly Report ---
[Problem 2 output]
[Problem 3 prompt]
--- Annual Target ---
[Problem 3 output]
[Problem 4 prompts]
--- Profit Calculator ---
[Problem 4 output]
[Problem 5 prompts]
--- Opposition Fund ---
[Problem 5 output]
[Problem 6 prompt]
--- Ad Campaign ---
[Problem 6 output]
[Problem 7 prompt]
--- Commission Calculator ---
[Problem 7 output]
```

Your program must compile and run **without errors or warnings** (with `-Wall -Werror -Wpedantic`).

Submit one file:

```text
hw3b.cpp
```

<<<HW_ACTION>>>

Submit **Part B** on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **June 16th at 11:59 PM Mountain Time**. Upload **one** file named **`hw3b.cpp`**.

<<<END_HW_ACTION>>>