# Homework 4

**Part A** (this handout) is due **during your recitation section**. Complete the exercises below and submit your four source files as described in the **ACTION REQUIRED** note.

**Part B** is submitted on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Tuesday, June 23, 2026 at 11:59 PM Mountain Time**.

---

## Part A

This lab introduces **arrays**: declaring them, storing a collection of values, walking through them with a loop, and passing them into your own **functions**. By now you have learned to write and call functions, so you will use them throughout this assignment.

Last week the farmer restored the **Pantry**. With the shelves stocked and the doors open again, word spreads that the Community Center is coming back to life. This week the farmer turns to the second room: the **Crafts Room**. Its bundles call for foraged goods and raw materials such as wild berries gathered from the hills, wood hauled in from the forest, and the odd treasure pulled from the riverbed. There is a lot to sort, count, and organize, and an array is exactly the tool for the job.

---

### Arrays

An **array** stores many values of the same type under a single name. You access each value by its **index**, starting at `0`.

```cpp
int values[5] = {10, 25, 15, 30, 5};

cout << values[0] << endl;   // 10  (first element)
cout << values[4] << endl;   // 5   (last element)
```

To visit every element, pair the array with a loop. The index runs from `0` up to (but not including) the size:

```cpp
int values[5] = {10, 25, 15, 30, 5};

for (int i = 0; i < 5; i++) {
    cout << "Item " << i << ": " << values[i] << endl;
}
```

**Fixed size:** An array's size must be a constant known when the program is compiled. You **cannot** write `int values[n];` where `n` is a number you read from the user. The compiler (with our `-Wall -Werror -Wpedantic` flags) will reject it.

When you do not know in advance how many values the user will enter, declare an array large enough to hold the most you will ever need (a **maximum capacity**) and only use the first part of it. Just remember, you are taking up memory for all of those values, even the ones you don't use.:

```cpp
const int MAX_ITEMS = 100;     // capacity: more than enough
int values[MAX_ITEMS];         // the array

int count;
cin >> count;                  // how many the user actually wants

for (int i = 0; i < count; i++) {
    cin >> values[i];          // fill only the first 'count' slots
}
```

---

### Arrays and Functions

You can pass an entire array into a function, but it behaves differently than any normal argument you would pass to a function. Modifying an array parameter will modify that array everywhere in your code, scope is ignored. You also can't return an array, as an array is not a returnable data type. 

```cpp
int sumValues(int arr[], int sizeOfArr) {
    int total = 0;
    for (int i = 0; i < sizeOfArr; i++) {
        total += arr[i];
    }
    return total;
}
```

Notice the parameter `int arr[]`, the empty brackets say "an array of ints." In `main` you call it with just the array's name and the size:

```cpp
int values[3] = {10, 20, 30};
cout << sumValues(values, 3) << endl;   // 60
```

---

### Pass-by-value vs Pass-by-reference

When you pass an ordinary variable into a function, the function works on a **copy**. Changes made inside the function do **not** affect the original (remember what we learned about scope?) this is **pass-by-value**:

```cpp
void tryToChange(int x) {
    x = 999;          // changes only the copy
}

int gold = 50;
tryToChange(gold);
cout << gold << endl;   // still 50
```

We will continue to use **pass-by-value** in this class and in future homeworks, but it's important to note that arrays don't behave this way. Keep that in mind when passing in variables that are arrays vs variables that are not arrays.

---

### Exercise 1 — `hw4A1.cpp`

The farmer empties their backpack onto the Crafts Room table: a pile of foraged goods, each worth a different amount of gold. They want a quick tally of the whole haul.

Read a count from the user (how many foraged items the farmer has), then read that many gold values per foraged good into an array. Write a function named `totalValue` that takes the array and its size and **returns** the sum of all values. In `main`, print each item, then print the total returned by your function.

Define this function above `main`:

```cpp
int totalValue(int values[], int size)
```

Print the following prompts and read each value from the user:

- `"Enter the number of forage items: "` --> read into an `int` using `cin`
- `"Enter the value of forage item N: "` --> read each value into the array using `cin` (where `N` counts up from 1)

Print this exact section header:

```text
--- Forage Catalog ---
```

Your output must include this exact label:

```text
Total forage value:
```

Expected output (with sample inputs: 4 items, values 10 25 15 30):

```text
Enter the number of forage items: 4
Enter the value of forage item 1: 10
Enter the value of forage item 2: 25
Enter the value of forage item 3: 15
Enter the value of forage item 4: 30
--- Forage Catalog ---
Item 1: 10 gold
Item 2: 25 gold
Item 3: 15 gold
Item 4: 30 gold
Total forage value: 80 gold
```

---

### Exercise 2 — `hw4A2.cpp`

One of those foraged items is worth far more than the rest. Before donating, the farmer wants to know **which** item in the pile is the most valuable so they can decide whether to sell it instead.

Read a count and that many values into an array, exactly as in Exercise 1. Then write a function named `findBestIndex` that takes the array and its size and **returns the index** of the largest value. In `main`, use that index to report which item is best (numbered from 1) and its value.

Define this function above `main`:

```cpp
int findBestIndex(int values[], int size)
```

Print the following prompts and read each value from the user:

- `"Enter the number of forage items: "` --> read into an `int` using `cin`
- `"Enter the value of forage item N: "` --> read each value into the array using `cin`

Print this exact section header:

```text
--- Best Forage ---
```

Your output must include these exact labels:

```text
Best item:
Value:
```

Expected output (with sample inputs: 5 items, values 12 40 18 33 27):

```text
Enter the number of forage items: 5
Enter the value of forage item 1: 12
Enter the value of forage item 2: 40
Enter the value of forage item 3: 18
Enter the value of forage item 4: 33
Enter the value of forage item 5: 27
--- Best Forage ---
Best item: 2
Value: 40 gold
```

(Item 2 holds the value `40`, the largest in the pile. You may assume there are no ties.)

---

### Exercise 3 — `hw4A3.cpp`

The Crafts Room **construction bundle** needs wood. The farmer heads into the forest and chops trees over several days, recording each day's haul. They want a running stockpile total that grows as each day is added. The farmer does this Monday through Saturday (six days total). 

Read a daily wood amounts into an array. Write a function named `addToStockpile` that takes the running stockpile array and an amount, and adds the amount to the stockpile. In `main`, start the stockpile at `0`, loop through the array calling `addToStockpile` once per day, and print the running total after each day. You can't add more parameters to `addToStockpile`. 

Define this function above `main`:

```cpp
void addToStockpile(int[] stockpile, int amount)
```

Print the following prompts and read each value from the user:

- `"Enter wood collected on day N: "` --> read each value into the array using `cin`
Note: Monday would be day 1, Tuesday is day 2, and so on.


Print this exact section header:

```text
--- Wood Stockpile ---
```

Your output must include this exact label:

```text
Total wood for the bundle:
```

Expected output (with sample inputs: 12 8 15 20 21 19):

```text
Enter wood collected on day 1: 12
Enter wood collected on day 2: 8
Enter wood collected on day 3: 15
Enter wood collected on day 4: 20
Enter wood collected on day 5: 21
Enter wood collected on day 6: 19
--- Wood Stockpile ---
Day 1: collected 12, stockpile now 12
Day 2: collected 8, stockpile now 20
Day 3: collected 15, stockpile now 35
Day 4: collected 20, stockpile now 55
Day 5: collected 21, stockpile now 76
Day 6: collected 19, stockpile now 95
Total wood for the bundle: 95
```

---

### Exercise 4 — `hw4A4.cpp`

It is time to review the whole forage haul and see how close the Crafts Room bundle is to being filled. A foraged item is good enough for the bundle only if its value is **at least 20 gold**. The farmer wants two numbers at once: **how many** items qualify, and the **total value** of those qualifying items. The bundle is complete if there are enough items of adequate quality to have a total value of **100**.

Read a count and that many values into an array (similar to problems 1 and 2). Then write a function named `analyzeHaul` that takes the array, its size, and a threshold. The count of qualifying items should be printed within that function, and their total value should be returned. In `main`, call then function after the array has been populated by the values.

Define this function above `main`:

```cpp
void analyzeHaul(int values[], int size, int threshold)
```

Print the following prompts and read each value from the user:

- `"Enter the number of forage items: "` --> read into an `int` using `cin`
- `"Enter the value of forage item N: "` --> read each value into the array using `cin`

Use this exact value:

- Threshold: `20`

Print this exact section header:

```text
--- Bundle Review ---
```

Your output must include these exact labels:

```text
Items accepted:
Total accepted value:
Bundle completed:
```

For `Bundle completed: ` you will print `true` if the total value of accepted items is >=100, and `false` if the value is <100.

Expected output (with sample inputs: 5 items, values 10 25 15 30 22):

```text
Enter the number of forage items: 5
Enter the value of forage item 1: 10
Enter the value of forage item 2: 25
Enter the value of forage item 3: 15
Enter the value of forage item 4: 30
Enter the value of forage item 5: 22
--- Bundle Review ---
Items accepted: 3
Total accepted value: 77 gold
Bundle completed: false
```

(The values `25`, `30`, and `22` each meet the threshold of `20`: that is 3 items totaling 77 gold.)

---

<<<HW_ACTION>>>

Submit **Part A** on **[Gradescope](https://www.gradescope.com/courses/1314704)**. Open the **Homework 4 (A)** item and upload **these four source files** (names must match **exactly**; no screenshots):

- **`hw4A1.cpp`** — Array traversal + function returning a sum
- **`hw4A2.cpp`** — Array search + function returning an index
- **`hw4A3.cpp`** — Pass-by-reference: building a stockpile
- **`hw4A4.cpp`** — Array + function with reference output parameters

<<<END_HW_ACTION>>>

---
## Part B
---

# How to Write This Program

For this assignment, you will write one complete C++ program in a file named:

```text
hw4b.cpp
```

As in HW3, all of your functions must be **defined above `main()`**. Use this template:

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

You will define and call functions throughout this assignment, including functions that take arrays and functions that use reference parameters.

### A reminder on input (`cin` and `getline`)

Most problems read with `cin >>`. One problem reads a full line with `getline`. Remember that `cin >>` leaves the newline behind in the input buffer, so **before** a `getline` that follows a `cin >>`, clear the buffer with:

```cpp
cin.ignore(1000, '\n');
```

---

You are still the Assistant to the Regional Manager of JojaMart Pelican Town, reporting to **Morris**. The Pantry reopening at the Community Center did not go unnoticed at JojaMart — Morris saw the foot traffic shift and was *not* pleased. But Morris is a numbers man before he is a sentimental one, and a setback is just data. This week he wants the operation tightened: customers counted, shelves audited, prices reviewed, and the week's profit trend laid bare. No grand moves yet — just a sharper, faster Joja machine. The takeover is still a long way off. For now, the reports come first, and Morris wants them done right.

---

# Problem 1: Weekly Foot Traffic

Morris wants a clean read on last week's foot traffic. JojaMart logged a customer count for each of the seven days, Sunday (day 0) through Saturday (day 6). He needs the weekly total, the busiest day, and a check against the store's weekly goal.

Read **seven** daily customer counts into an array. Then write the functions below and call them from `main`.

Define these functions above `main`:

- `int totalCustomers(int counts[], int size)` — **returns** the sum of all counts.
- `int busiestDayIndex(int counts[], int size)` — **returns the index** of the largest count (you may assume no ties).
- `int weeklyGoal()` — takes **no arguments** and **returns** the weekly customer goal, which is `400`.

> **Note:** Use a **`for` loop** to read and to walk the array.

In `main`, after printing the total and the busiest day, compare the total to `weeklyGoal()` using `if / else`:

- If the total is **greater than or equal to** the goal: print `"Weekly customer goal met!"`
- Otherwise: print `"Below weekly goal."`

Print the following prompt and read each value from the user:

- `"Enter customers for day N: "` --> read each value into the array using `cin` (N from 0 to 6)

Print this exact section header:

```text
--- Foot Traffic Report ---
```

Your output must include these exact labels:

```text
Total weekly customers:
Busiest day:
```

Expected output (with sample inputs: 40 55 48 62 70 90 85):

```text
Enter customers for day 0: 40
Enter customers for day 1: 55
Enter customers for day 2: 48
Enter customers for day 3: 62
Enter customers for day 4: 70
Enter customers for day 5: 90
Enter customers for day 6: 85
--- Foot Traffic Report ---
Day 0: 40 customers
Day 1: 55 customers
Day 2: 48 customers
Day 3: 62 customers
Day 4: 70 customers
Day 5: 90 customers
Day 6: 85 customers
Total weekly customers: 450
Busiest day: Day 5
Weekly customer goal met!
```

---

# Problem 2: Slogan Analysis

Morris is ordering a new banner for the storefront and wants to know how often a particular letter shows up in the campaign slogan — it changes the price of the lettering. Every report he prints starts with the company motto.

Write a **void function** named `printJojaMotto` that takes **no arguments** and prints exactly:

```text
JOJA: We have it all.
```

Write a function named `countChar` that takes a `string` and a `char` and **returns** how many times that character appears in the string. Loop through the string by index. Remember that `.length()` returns a `size_t`, so compare your loop counter against `static_cast<int>(slogan.length())`.

Define these functions above `main`:

- `void printJojaMotto()`
- `int countChar(string text, char target)`

In `main`, read the slogan and the letter, then print the header, call `printJojaMotto()`, and report the count. Because this `getline` follows the `cin >>` from Problem 1, clear the buffer first with `cin.ignore(1000, '\n')`.

Print the following prompts and read each value from the user:

- `"Enter the campaign slogan: "` --> read a full line into a `string` using `getline`
- `"Enter the letter to count: "` --> read into a `char` using `cin`

Print this exact section header:

```text
--- Slogan Analysis ---
```

Your output must include these exact labels:

```text
Slogan:
```

Expected output (with sample inputs: slogan `Joja Mart Saves`, letter `a`):

```text
Enter the campaign slogan: Joja Mart Saves
Enter the letter to count: a
--- Slogan Analysis ---
JOJA: We have it all.
Slogan: Joja Mart Saves
Letter 'a' appears 3 times.
```

---

# Problem 3: Inventory Audit

Morris orders a full inventory audit. The stockroom is divided into **sections**, each holding the same number of items. As the auditor walks through, every item gets a running number (item 1, item 2, item 3, ...) across the *entire* audit — not restarting per section. Any item whose running number is **divisible by 4** is flagged for a closer look.

Use **nested loops**: the outer loop walks the sections, the inner loop walks the items within a section. Keep a running item number as you go. Write a helper function to decide whether an item is flagged.

Define this function above `main`:

- `bool isFlagged(int itemNumber)` — **returns** `true` if `itemNumber` is divisible by 4, otherwise `false`.

For each section, print how many of its items were flagged. At the end, print the total number of items audited and the total flagged.

Print the following prompts and read each value from the user:

- `"Enter the number of sections: "` --> read into an `int` using `cin`
- `"Enter items per section: "` --> read into an `int` using `cin`

Print this exact section header:

```text
--- Inventory Audit ---
```

Your output must include these exact labels:

```text
Total items audited:
Total flagged:
```

Expected output (with sample inputs: 3 sections, 5 items per section):

```text
Enter the number of sections: 3
Enter items per section: 5
--- Inventory Audit ---
Section 1: 1 item(s) flagged
Section 2: 1 item(s) flagged
Section 3: 1 item(s) flagged
Total items audited: 15
Total flagged: 3
```

(Across 15 items, the running numbers divisible by 4 are 4, 8, and 12 — one in each section.)

---

# Problem 4: Price Analysis

Morris is reviewing the price list for a product line and wants three numbers: the cheapest price, the most expensive price, and the average. The cheapest and most expensive should come back from a **single function** that hands back **both** results through reference parameters.

Read a count and that many prices into an array. Write the functions below and call them from `main`.

Define these functions above `main`:

- `int sumPrices(int prices[], int size)` — **returns** the sum of all prices.
- `void priceRange(int prices[], int size, int &lowest, int &highest)` — fills `lowest` and `highest` with the smallest and largest prices in the array (using **reference parameters**).

In `main`, compute the average as a decimal. Because the prices are `int`s, cast before dividing so you keep the fraction:

```cpp
double average = sumPrices(prices, size) / static_cast<double>(size);
```

Print the following prompts and read each value from the user:

- `"Enter the number of products: "` --> read into an `int` using `cin`
- `"Enter price for product N: "` --> read each value into the array using `cin`

Print this exact section header:

```text
--- Price Analysis ---
```

Your output must include these exact labels:

```text
Lowest price:
Highest price:
Average price:
```

Expected output (with sample inputs: 4 products, prices 10 15 20 25):

```text
Enter the number of products: 4
Enter price for product 1: 10
Enter price for product 2: 15
Enter price for product 3: 20
Enter price for product 4: 25
--- Price Analysis ---
Lowest price: 10 gold
Highest price: 25 gold
Average price: 17.5 gold
```

---

# Problem 5: Restock Queue

Restock requests pile up at the counter, and Morris works through them one at a time until the queue is empty. He keys in a **request code** for each one; entering `-1` means the queue is done.

Use a **`while` loop** that keeps reading codes until the user enters `-1`. For each code, use a **`switch`** (inside a function) to look up the department name and its restock cost. Add valid costs to a running total and count the valid requests. If a code does not match any department, print an "unknown" message and skip it (do not add to the total or the count).

Define these functions above `main`:

- `string requestName(int code)` — uses a `switch` to **return** the department name for codes 1, 2, 3, and `"Unknown"` otherwise.
- `int requestCost(int code)` — uses a `switch` to **return** the cost for codes 1, 2, 3, and `0` otherwise.

Code reference:

| Code | Department | Cost |
| --- | --- | --- |
| 1 | Cola Restock | 50 |
| 2 | Snack Restock | 75 |
| 3 | Seed Restock | 100 |

Print the following prompt and read each value from the user (repeatedly, inside the loop):

- `"Enter a request code (-1 to stop): "` --> read into an `int` using `cin`

Print this exact section header **before** the loop's output:

```text
--- Restock Queue ---
```

Your output must include these exact labels:

```text
Total restock cost:
Requests processed:
```

Expected output (with sample inputs: 1, 3, 9, 2, -1):

```text
--- Restock Queue ---
Enter a request code (-1 to stop): 1
Cola Restock: 50 gold
Enter a request code (-1 to stop): 3
Seed Restock: 100 gold
Enter a request code (-1 to stop): 9
Unknown request code: 9
Enter a request code (-1 to stop): 2
Snack Restock: 75 gold
Enter a request code (-1 to stop): -1
Total restock cost: 225 gold
Requests processed: 3
```

---

# Problem 6: Profit Trend

Morris wants to know whether business is actually trending up. He has the daily profit for several days and wants a count of the **growth days** — days where the profit was higher than the day before — plus a one-line verdict.

Read a count and that many daily profits into an array. Write a function that counts the growth days by comparing each day to the one before it (start the comparison at index 1).

Define this function above `main`:

- `int growthDays(int profits[], int size)` — **returns** how many days had a profit strictly greater than the previous day.

In `main`, after printing the growth-day count, print a verdict using an `if / else if / else` chain:

- If growth days is **greater than** `size / 2`: print `"Strong upward trend."`
- Else if growth days is **greater than** `0`: print `"Growth is stalling."`
- Else: print `"Profits are declining."`

Print the following prompts and read each value from the user:

- `"Enter the number of days: "` --> read into an `int` using `cin`
- `"Enter profit for day N: "` --> read each value into the array using `cin`

Print this exact section header:

```text
--- Profit Trend ---
```

Your output must include this exact label:

```text
Days with profit growth:
```

Expected output (with sample inputs: 6 days, profits 100 120 115 130 140 135):

```text
Enter the number of days: 6
Enter profit for day 1: 100
Enter profit for day 2: 120
Enter profit for day 3: 115
Enter profit for day 4: 130
Enter profit for day 5: 140
Enter profit for day 6: 135
--- Profit Trend ---
Days with profit growth: 3
Growth is stalling.
```

(Going day to day: 120 > 100 ✓, 115 > 120 ✗, 130 > 115 ✓, 140 > 130 ✓, 135 > 140 ✗ — that is 3 growth days. With `size / 2` equal to 3, and 3 is not greater than 3, the verdict falls to the "stalling" branch.)

---

# Problem 7: Debugging Morris's Stock Report

It is late, and Morris tried to write a quick stock report before leaving — a function to total an array and another to double a year-end bonus. Nothing compiles. Help him fix it.

Copy this broken code into your file **as comments**:

```cpp
// int sumStock(int stock[] size) {
//     int total = 0
//     for (int i = 0; i <= size; i++) {
//         total += stock[i];
//     }
//     return total;
// }
//
// void applyBonus(int bonus) {
//     bonus = bonus * 2;
// }
//
// int stock[3] = {10, 20, 30};
// int bonus = 5;
// applyBonus(bonus);
// cout << "Total Stock: " << sumStock(stock, 3) << endl
// cout << "Bonus: " << bonus << endl;
```

Then write a **corrected version** underneath it. The array totaling and the bonus doubling should both work, and the bonus change must actually stick. Read nothing from the user for this problem — use the values shown.

Print this exact section header:

```text
--- Stock Report ---
```

Your output must include these exact labels:

```text
Total Stock:
Bonus:
```

Expected output:

```text
--- Stock Report ---
Total Stock: 60
Bonus: 10
```

You must include at least **two comments** explaining what you fixed. For example (these are not the correct fixes, just an example of the format):

```cpp
// Fixed: added the missing comma and type in the function parameter list.
// Fixed: changed the bonus parameter to pass-by-reference so the change persists.
```

---

# Final Output Requirements

Your program must print all prompts and section headers in the order shown. The full output of your program should follow this structure:

```text
[Problem 1 prompts]
--- Foot Traffic Report ---
[Problem 1 output]
[Problem 2 prompts]
--- Slogan Analysis ---
[Problem 2 output]
[Problem 3 prompts]
--- Inventory Audit ---
[Problem 3 output]
[Problem 4 prompts]
--- Price Analysis ---
[Problem 4 output]
--- Restock Queue ---
[Problem 5 prompts and output]
[Problem 6 prompts]
--- Profit Trend ---
[Problem 6 output]
--- Stock Report ---
[Problem 7 output]
```

Your program must compile and run **without errors or warnings** (with `-Wall -Werror -Wpedantic`).

Submit one file:

```text
hw4b.cpp
```

<<<HW_ACTION>>>

Submit **Part B** on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Tuesday, June 23, 2026 at 11:59 PM Mountain Time**. Upload **one** file named **`hw4b.cpp`**.

<<<END_HW_ACTION>>>