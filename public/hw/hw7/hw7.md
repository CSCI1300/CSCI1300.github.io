# Homework 7

**Part A** (this handout) is due **during your recitation section** on **Wednesday, July 8, 2026**. Complete the exercises below and submit your three source files as described in the **ACTION REQUIRED** note.

**Part B** is submitted on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Tuesday, July 14, 2026 at 11:59 PM Mountain Time**.

---

## Part A

This lab is a review week: no new concepts. You'll keep practicing classes, getters/setters, and `vector<YourClass>` — the same tools from last week — on a new set of items.

Over at the Community Center, the farmer turns to the sixth room: the **Boiler Room**. Its bundles don't want crops or fish; they want ore pulled from the mines and refined down at the furnace. Every ore has a name, a type, and a value, and some of it is worth a lot more once it's been smelted down.

---

### Exercise 1 — `hw7A1.cpp`

The Boiler Room needs a catalog of ore. Define a class named `Ore` that models one piece of ore, then create a few `Ore` objects and have each one describe itself.

Define this class above `main`. It must have:

- Three **private** attributes: a `string name`, a `string type`, and an `int value`.
- A **constructor** `Ore(string n, string t, int v)` that sets the three member variables.
- Three **getter** methods: `getName()`, `getType()`, and `getValue()`.
- Three **setter** methods: `setName()`, `setType()`, and `setValue()`.
- A method `void describe()` that prints the three labeled lines shown in the expected output.

In `main`:

- Create one `Ore` object directly with literal values: name `"Copper Ore"`, type `"Common"`, value `5` (use a constructor).
- Read a second and third ore from the user (name, type, value) and build an `Ore` object from those inputs (use your setters, not a constructor).
- Print the section header, then call `describe()` on each ore.

Print the following prompts and read each value from the user:

- `"Enter an ore name: "` --> read into a `string` using `cin`
- `"Enter its type: "` --> read into a `string` using `cin`
- `"Enter its value: "` --> read into an `int` using `cin`

Print this exact section header:

```text
--- Ore Catalog ---
```

Your output must include these exact labels (printed by `describe()`):

```text
Ore:
Type:
Value:
```

Expected output (with sample inputs: Iron, Rare, 50, Gold, Precious, 100):

```text
Enter an ore name: Iron
Enter its type: Rare
Enter its value: 50
Enter an ore name: Gold
Enter its type: Precious
Enter its value: 100
--- Ore Catalog ---
Ore: Copper Ore
Type: Common
Value: 5 gold
Ore: Iron
Type: Rare
Value: 50 gold
Ore: Gold
Type: Precious
Value: 100 gold
```

*Note*: use one-word names (no spaces) for the ore the user enters, since `cin >>` stops at the first space.

---

### Exercise 2 — `hw7A2.cpp`

Raw ore isn't worth much until it's smelted. Define a class named `Ore` whose `refinedValue()` method computes a value from the ore's **purity**, and whose `setPurity()` method can upgrade that purity.

Define this class above `main`. It must have:

- Three **private** attributes: a `string name`, an `int baseValue`, and an `int purity` (where `0 = Raw`, `1 = Refined`, `2 = Pure`).
- A **constructor** `Ore(string n, int b, int p)` that sets the three member variables.
- A getter `getName()`.
- A **setter** `void setPurity(int p)` that changes the stored purity.
- A method `string purityName()` that returns `"Pure"` for purity `2`, `"Refined"` for purity `1`, and `"Raw"` otherwise.
- A method `int refinedValue()` that returns:
  - the base value **plus half the base value** (`baseValue + baseValue / 2`) for Pure,
  - the base value **plus a quarter** (`baseValue + baseValue / 4`) for Refined,
  - just the base value for Raw.

In `main`:

- Read the base value from the user.
- Create an `Ore` named `"Iron Ore"` with that base value and purity `0` (Raw).
- Print the section header, the ore's purity name, and its refined value.
- Upgrade the ore to Pure with `setPurity(2)`, print the upgrade line, then print the purity name and refined value again.

Print the following prompt and read the value from the user:

- `"Enter the base value of the ore: "` --> read into an `int` using `cin`

Print this exact section header:

```text
--- Boiler Room Smelter ---
```

Your output must include these exact labels:

```text
Ore:
Purity:
Refined value:
```

Expected output (with sample input: 80):

```text
Enter the base value of the ore: 80
--- Boiler Room Smelter ---
Ore: Iron Ore
Purity: Raw
Refined value: 80 gold
The ore is refined to Pure quality!
Purity: Pure
Refined value: 120 gold
```

---

### Exercise 3 — `hw7A3.cpp`

The farmer hauls in a cart full of ore and wants a tally of the Boiler Room bundle. Read a count, build that many `Ore` objects from user input, store them in a `vector<Ore>`, then report the total value of the haul and the single most valuable ore.

Define a class named `Ore` above `main` with:

- Two **private** member variables: a `string name` and an `int value`.
- A **constructor** `Ore(string n, int v)`.
- Getters `getName()` and `getValue()`.

In `main`:

- Read a count from the user (you may assume it is between 1 and 100).
- Read that many ores (name and value) and `push_back` an `Ore` object for each into a `vector<Ore>`.
- Print the section header.
- Loop through the vector: print each ore on its own line, accumulate the total value, and track the index of the most valuable ore (you may assume no ties).
- Print the total bundle value and the most valuable ore.

Print the following prompts and read each value from the user:

- `"Enter the number of ores collected: "` --> read into an `int` using `cin`
- `"Enter name for ore N: "` --> read into a `string` using `cin`
- `"Enter value for ore N: "` --> read into an `int` using `cin`

Print this exact section header:

```text
--- Boiler Room Bundle ---
```

Your output must include these exact labels:

```text
Total bundle value:
Most valuable:
```

Expected output (with sample inputs: 4 ores; Copper 30, Iron 60, Gold 100, Coal 15):

```text
Enter the number of ores collected: 4
Enter name for ore 1: Copper
Enter value for ore 1: 30
Enter name for ore 2: Iron
Enter value for ore 2: 60
Enter name for ore 3: Gold
Enter value for ore 3: 100
Enter name for ore 4: Coal
Enter value for ore 4: 15
--- Boiler Room Bundle ---
Ore 1: Copper - 30 gold
Ore 2: Iron - 60 gold
Ore 3: Gold - 100 gold
Ore 4: Coal - 15 gold
Total bundle value: 205 gold
Most valuable: Gold (100 gold)
```

---

<<<HW_ACTION>>>

Submit **Part A** on **[Gradescope](https://www.gradescope.com/courses/1314704)**. Open the **Homework 7 (A)** item and upload **these three source files** (names must match **exactly**; no screenshots):

- **`hw7A1.cpp`** — Class + setters: ore catalog
- **`hw7A2.cpp`** — Class methods: smelter/purity
- **`hw7A3.cpp`** — Class + vector: Boiler Room bundle

<<<END_HW_ACTION>>>

---
## Part B
---

**Download:** [`warehouse.txt`](/hw/hw7/warehouse.txt): place this file in the same folder as your `hw7b.cpp` program.

# How to Write This Program

For this assignment, you will write one complete C++ program in a file named:

```text
hw7b.cpp
```

As always, any class you define and your functions must be defined above `main()`.

This is the last homework before the final project, so this week is deliberately light: **one** new tool (reading and writing files), applied to everything you already know — classes, vectors, and loops.

You are still the Assistant to the Regional Manager of JojaMart Pelican Town, reporting to **Morris**. This week corporate wants to cut down on manual paperwork: instead of typing in every product by hand, the warehouse inventory now lives in a text file, and Morris wants a program that reads it, audits it, and writes the results back out to a file for the record.

---

## Quick Reference: File I/O

You've already covered this in lecture, so here's just the syntax you'll need.

`#include <fstream>` gives you two new types:

- **`ifstream`** — for *reading* from a file.
- **`ofstream`** — for *writing* to a file.

**Reading:**

```cpp
ifstream inFile("warehouse.txt");
if (!inFile.is_open()) {
    cout << "Error: could not open warehouse.txt" << endl;
    return 1;
}

string line;
string name;
int quantity;
double price;
while (getline(inFile, line)) {
    // Input handling logic
}
inFile.close();
```


**Writing:**

```cpp
ofstream outFile("audit_report.txt");
outFile << "Total Inventory Value: $" << total << endl;
outFile.close();
```

### Splitting a Line with `.find()` and `.substr()`

Once you have a full line as a `string` (via `getline(inFile, line)`), you need to pull the three space-separated values back out of it.

**`.find(target, start)`** searches a string for `target` and returns the **index** where it starts. Search starts at index `0` by default, but you can pass a second argument to start searching partway through the string which can be useful once you've already found the first space and want the *next* one.

```cpp
string line = "Copper 20 4.00";
int firstSpace = line.find(' ');        // 6 (index of the space after "Copper")
```

**`.substr(start, length)`** returns a **new string** containing `length` characters beginning at index `start`. If you leave off `length`, it grabs everything from `start` to the end of the string.

```cpp
string word = line.substr(0, 6);        // "Copper"  (6 characters starting at index 0)
string rest = line.substr(7);           // "20 4.00" (everything from index 7 onward)
```

Putting those together to split a full line into its three fields:

```cpp
string line;
getline(inFile, line);

int space1 = line.find(' ');
string name = line.substr(0, space1);

int space2 = line.find(' ', space1 + 1);          // start searching *after* the first space
string quantityStr = line.substr(space1 + 1, space2 - space1 - 1);
string priceStr = line.substr(space2 + 1);
```

At this point `quantityStr` and `priceStr` are still `string`s (e.g. `"20"` and `"4.00"`), not numbers. Two conversion functions turn them into the types you actually need:

- **`stoi(s)`** — converts a `string` to an `int`.
- **`stod(s)`** — converts a `string` to a `double`.

```cpp
int quantity = stoi(quantityStr);
double price = stod(priceStr);
```

---

### The Task — `hw7b.cpp`

**Input file:** [`warehouse.txt`](/hw/hw7/warehouse.txt) is provided with this assignment. download it and place it in the same folder as your program. Each line has three values separated by spaces: a one-word product name, an integer quantity, and a decimal price.

```text
Wood 5 2.50
Copper 20 4.00
Battery 3 12.00
Coal 50 1.25
```

Your program must read from a file named exactly `warehouse.txt`. The autograder will test with its own version of this file, using the same format, so don't hardcode any of the values above.

**Define a class named `Product`** above `main` with:

- Three **private** attributes: a `string name`, an `int quantity`, and a `double price`.
- A **constructor** `Product(string n, int q, double p)`.
- Getters `getName()`, `getQuantity()`, and `getPrice()`.
- A method `double totalValue()` that returns `quantity * price`.
- A method `bool needsRestock(int threshold)` that returns whether `quantity` is less than `threshold`.

**In `main`:**

1. Print the prompt `"Enter the restock threshold: "` and read an `int` using `cin`.
2. Open `warehouse.txt` for reading. If it fails to open, print `"Error: could not open warehouse.txt"` and end the program.
3. Read the file line by line (name, quantity, price) until there's nothing left, constructing a `Product` for each line and storing it in a `vector<Product>`.
4. Compute:
   - the **total inventory value** (the sum of every product's `totalValue()`),
   - how many products **need restock** (using the threshold from step 1),
   - the single product with the **highest `totalValue()`** (you may assume no ties).
5. Print the report to the console using the exact format below.
6. Write that **same** report to a file named `audit_report.txt`.

Use `cout << fixed << setprecision(2)` (from `<iomanip>`) so dollar amounts always show two decimal places.

Print this exact section header:

```text
--- Warehouse Audit ---
```

Your output must include these exact labels, in both the console output and `audit_report.txt`:

```text
Total Inventory Value:
Items Needing Restock:
Top Value Item:
```

Expected console output (with restock threshold `10`, and the example `warehouse.txt` above):

```text
Enter the restock threshold: 10
--- Warehouse Audit ---
Total Inventory Value: $191.00
Items Needing Restock: 2
Top Value Item: Copper ($80.00)
```

`audit_report.txt` should contain the same three lines (the section header plus the three labeled lines), formatted identically to the console output.

---

<<<HW_ACTION>>>

Submit on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Tuesday, July 14, 2026 at 11:59 PM Mountain Time**.

Upload **`hw7b.cpp`** only — do **not** upload `warehouse.txt`; the autograder supplies its own copy for testing.

<<<END_HW_ACTION>>>