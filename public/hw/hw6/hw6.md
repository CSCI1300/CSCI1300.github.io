# Homework 6

## Part A

This lab introduces the biggest new idea of the course: classes and objects. Up until now, your data (variables, arrays, vectors) and your behavior (functions) have lived separately. A class lets you bundle them together: a single type that carries its own data and the functions that operate on that data. You will use classes constantly in your final project, so this week we start building that muscle.

Over at the Community Center, the farmer turns to the fifth room: the Fish Tank. Its bundles do not want crops or gold; they want fish pulled from the river, the lake, and the ocean. Every fish has a name, a home, and a value, and the farmer needs a clean way to track each one. A fish is a perfect thing to model as an object: a little package of data and behavior that travels together.

### Defining a class
 
Here is a small class that models a single villager. Read it top to bottom:
 
```cpp
class Villager {
    private:
        string name;     // member variables: each Villager has its own
        int friendship;
    
    public:
        string getName() {           // a member function (this one is a getter)
            return name;
        }
        int getFriendship() {
            return friendship;
    }
};   // <-- a class definition ends with a semicolon!
```
 
Two things to notice right away:
 
- The `private:` and `public:` labels split the class into a hidden part and a usable part. You should keep your attributes private, and member functions public.
- **A class definition ends with a semicolon** after the closing brace. Forgetting it is one of the most common compiler errors you will see this week.

### Constructors
 
How do the member variables get their starting values? Through a **constructor**: a special member function with the **same name as the class** and **no return type**. It runs automatically when you create an object.
 
```cpp
class Villager {
    private:
        string name;
        int friendship;
    
    public:
        Villager(string n, int f) {   // constructor
            name = n;
            friendship = f;
        }
    
        string getName() { return name; }
        int getFriendship() { return friendship; }
};
```
 
The constructor takes the starting values as parameters and copies them into the object's member variables.


### Creating and using objects
 
Once the class is defined, you create objects from it and call their member functions with a dot (`.`):
 
```cpp
int main() {
    Villager lewis("Lewis", 5);     // calls the constructor
    Villager emily("Emily", 2);
 
    cout << lewis.getName() << endl;          // Lewis
    cout << emily.getFriendship() << endl;    // 2
}
```
 
`lewis` and `emily` are two independent objects. Each has its own `name` and `friendship`. Calling `lewis.getName()` runs the `getName()` function *on the `lewis` object*, so it returns `"Lewis"`.
 
> **Where does the class go?** Just like functions, your class definitions go **above `main()`**.

---

### Exercise 1: `hw6A1.cpp`
 
The Fish Tank needs a catalog of fish. Define a class named `Fish` that models one fish, then create a couple of `Fish` objects and have each one describe itself.
 
Define this class above `main`. It must have:
 
- Three **private** attributes: a `string name`, a `string habitat`, and an `int value`.
- A **constructor** `Fish(string n, string h, int v)` that sets the three member variables.
- Three **getter** methods: `getName()`, `getHabitat()`, and `getValue()`.
- Three **setter** methods: `setName()`, `setHabitat()`, and `setValue()`.
- A method `void describe()` that prints the three labeled lines shown in the expected output.
In `main`:
 
- Create one `Fish` object directly with literal values: name `"Sunfish"`, habitat `"river"`, value `30` (use a constructor).
- Read a second and third fish from the user (name, habitat, value) and build a `Fish` object from those inputs (use your setters, not a constructor).
- Print the section header, then call `describe()` on each fish.
Print the following prompts and read each value from the user:
 
- `"Enter a fish name: "` --> read into a `string` using `cin`
- `"Enter its habitat: "` --> read into a `string` using `cin`
- `"Enter its value: "` --> read into an `int` using `cin`
Print this exact section header:
 
```text
--- Fish Catalog ---
```
 
Your output must include these exact labels (printed by `describe()`):
 
```text
Fish:
Habitat:
Value:
```
 
Expected output (with sample inputs: Tuna, ocean, 100):
 
```text
Enter a fish name: Tuna
Enter its habitat: ocean
Enter its value: 100
--- Fish Catalog ---
Fish: Sunfish
Habitat: river
Value: 30 gold
Fish: Tuna
Habitat: ocean
Value: 100 gold
```

*Note*: This example only reads in one fish, remember that you need to read in two

---

### Exercise 2: `hw6A2.cpp`
 
Not every fish is worth the same. A fish caught at higher **quality** sells for more. Define a class named `Fish` whose `sellPrice()` method computes a price from the fish's quality, and whose `setQuality()` method can upgrade that quality.
 
Define this class above `main`. It must have:
 
- Three **private** attributes: a `string name`, an `int baseValue`, and an `int quality` (where `0 = Normal`, `1 = Silver`, `2 = Gold`).
- A **constructor** `Fish(string n, int b, int q)` that sets the three member variables.
- A getter `getName()`.
- A **setter** `void setQuality(int q)` that changes the stored quality.
- A method `string qualityName()` that returns `"Gold"` for quality `2`, `"Silver"` for quality `1`, and `"Normal"` otherwise.
- A method `int sellPrice()` that returns:
  - the base value **plus half the base value** (`baseValue + baseValue / 2`) for Gold quality,
  - the base value **plus a quarter** (`baseValue + baseValue / 4`) for Silver quality,
  - just the base value for Normal quality.
In `main`:
 
- Read the base value from the user.
- Create a `Fish` named `"Sunfish"` with that base value and quality `0` (Normal).
- Print the section header, the fish's quality name, and its sell price.
- Upgrade the fish to Gold quality with `setQuality(2)`, print the upgrade line, then print the quality name and sell price again.
Print the following prompt and read the value from the user:
 
- `"Enter the base value of the catch: "` --> read into an `int` using `cin`
Print this exact section header:
 
```text
--- Catch of the Day ---
```
 
Your output must include these exact labels:
 
```text
Fish:
Quality:
Sell price:
```
 
Expected output (with sample input: 80):
 
```text
Enter the base value of the catch: 80
--- Catch of the Day ---
Fish: Sunfish
Quality: Normal
Sell price: 80 gold
The fish is upgraded to Gold quality!
Quality: Gold
Sell price: 120 gold
```

---
 
### Exercise 3: `hw6A3.cpp`
 
The farmer hauls in a whole catch and wants a tally of the Fish Tank bundle. Read a count, build that many `Fish` objects from user input, store them in a `vector<Fish>`, then report the total value of the tank and the single most valuable fish.
 
Define a class named `Fish` above `main` with:
 
- Two **private** member variables: a `string name` and an `int value`.
- A **constructor** `Fish(string n, int v)`.
- Getters `getName()` and `getValue()`.
In `main`:
 
- Read a count from the user (you may assume it is between 1 and 100).
- Read that many fish (name and value) and `push_back` a `Fish` object for each into a `vector<Fish>`.
- Print the section header.
- Loop through the vector: print each fish on its own line, accumulate the total value, and track the index of the most valuable fish (you may assume no ties).
- Print the total tank value and the most valuable fish.
Print the following prompts and read each value from the user:
 
- `"Enter the number of fish caught: "` --> read into an `int` using `cin`
- `"Enter name for fish N: "` --> read into a `string` using `cin`
- `"Enter value for fish N: "` --> read into an `int` using `cin`
Print this exact section header:
 
```text
--- Fish Tank Bundle ---
```
 
Your output must include these exact labels:
 
```text
Total tank value:
Most valuable:
```
 
Expected output (with sample inputs: 4 fish; Sunfish 30, Tuna 100, Bass 50, Sardine 20):
 
```text
Enter the number of fish caught: 4
Enter name for fish 1: Sunfish
Enter value for fish 1: 30
Enter name for fish 2: Tuna
Enter value for fish 2: 100
Enter name for fish 3: Bass
Enter value for fish 3: 50
Enter name for fish 4: Sardine
Enter value for fish 4: 20
--- Fish Tank Bundle ---
Fish 1: Sunfish - 30 gold
Fish 2: Tuna - 100 gold
Fish 3: Bass - 50 gold
Fish 4: Sardine - 20 gold
Total tank value: 200 gold
Most valuable: Tuna (100 gold)
```


## Part B

Submitted on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **06/07/2026**. Upload the following files:

```text
Employee.h        Employee.cpp
Cashier.h         Cashier.cpp
Manager.h         Manager.cpp
Store.h           Store.cpp
ScheduleAudit.h   ScheduleAudit.cpp
main.cpp
```

Eleven files. Names must match exactly. The autograder will compile them together as a single program.

You are still the Assistant to the Regional Manager of JojaMart Pelican Town, reporting to Morris. This week Morris wants a proper internal system for tracking JojaMart Pelican Town staff before corporate's quarterly review. This includes items such as who's earning what, who's pulling their weight, and who's ready to move up. 

### New This Week: Classes

Up to now, every class you've written has lived entirely in one `.cpp` file. From here on, each class gets **two** files:

- **The header (`.h`)** declares the class: its data members and the signature of every method. It says *what* the class can do, not *how*.
- **The source (`.cpp`)** defines every method body, using the scope resolution operator (`ClassName::methodName(...)`). It says *how*.

**A generic example:** a `Rectangle` class split into `Rectangle.h` and `Rectangle.cpp`:

```cpp
// Rectangle.h
#ifndef RECTANGLE_H
#define RECTANGLE_H

class Rectangle {
private:
    double width;
    double height;
public:
    Rectangle(double width, double height);
    double area();
};

#endif
```

```cpp
// Rectangle.cpp
#include "Rectangle.h"

Rectangle::Rectangle(double w, double h) {
    width = w;
    height = h;
}

double Rectangle::area() {
    return width * height;
}
```

A few things to notice:

- **`#ifndef` / `#define` / `#endif`** at the top and bottom of the header are an **include guard**. Without it, a header that gets `#include`d by more than one file (directly or indirectly) would get processed twice, and the compiler would see the same class declared twice and refuse to build. Every header you write needs one, with a unique guard name.
- **`#include "Rectangle.h"`** uses quotes, not angle brackets. That is how you pull in a header *you* wrote, as opposed to a system one like `<string>`.
- **Every method body lives in the `.cpp` file, not the header.** Even a one-line getter. The header only ever contains signatures or function prototypes.

---

### Output Rules (read this carefully)

Your final submission is code Morris will run, so treat it like handing finished work to your manager. While you are developing, you may use `cout` anywhere to debug. **Before you submit**, remove every `cout` that is not part of the one approved output path below.

This program has exactly **one** function that may contain `cout` in your submitted code, and it lives in `main.cpp`:

```cpp
string promptString(string prompt);
```

Every user-facing prompt, no matter what type of value you are reading, must go through this function. `promptInt` and `promptDouble` must get their prompt text by calling `promptString`, not by writing their own `cout`. **No other `cout` may appear in any submitted file**, including for results, labels, error messages, or leftover debug prints.

Your `main()` will read input through these helpers but will not display results. Correctness is judged by directly constructing your classes and calling your methods, which is the same way software that used your code as a library would.

---

### The Golden Rule

**Every data member in every class is `private`. None are `protected`.** This applies even between `Employee` and its own derived classes. `Cashier` and `Manager` do not reach into `Employee`'s data directly, even though they inherit from it. If `Cashier::calculatePay()` needs to know the hours worked, it calls `getHoursWorked()`, the same way any other piece of code would. The rule is the same everywhere in this program, at every level: **the only way to read or affect another class's state (whether that class is your parent or a total stranger) is through its own public methods.** You'll use this constantly once you get to `Store`.

---

### Validation Policy (applies throughout the whole homework)

**We will deliberately try to break your program** with bad input such as empty strings, out-of-range numbers, and other edge cases. Your code must validate input, handle problems gracefully, and never crash or leave objects in a corrupted state.

Every constructor and mutator below receives untrusted input. Use these exact rules:

#### Constructor defaults

If a constructor receives an invalid value, store the exact default value listed in that class's constructor section instead of the invalid value.

#### Mutator rules

A mutator that adds to existing state either applies the change and returns `true`, or rejects the change, leaves the object unchanged, and returns `false`.

For example, if a cashier already has `10` logged hours, then `logHours(-3)` returns `false` and the cashier still has `10` logged hours.

`ScheduleAudit` has its own note later in the handout and does not use this validation policy.
---

## Suggested Implementation Order

This homework has many moving parts. Do not try to write all eleven files at once.

A good order is:

1. `Employee`
2. `Cashier`
3. `Manager`
4. Basic `Store` hiring and counts
5. `Store::totalPayroll()`
6. `Store::topCashier()`
7. `Store::promotionEligible()`
8. `Store::promoteToManager(...)`
9. `Store::generateReport()`
10. `ScheduleAudit`
11. `main.cpp` input helpers and basic setup

Compile frequently as you go.

---

## Required Classes

Method signatures are below. Names, parameter types/order, and return types must match **exactly**. The autograder builds and calls your classes directly. Data members must match what's listed for each class in `private:`.

### `Employee` (base class)

```cpp
class Employee {
private:
    string name;
    double hourlyWage;
    int hoursWorked;
    int employeeID;
    static int nextID;

public:
    Employee(string name, double hourlyWage);
    bool logHours(int hours);
    double calculatePay();
    int getID();
    string getName();
    double getHourlyWage();
    int getHoursWorked();
};
```

**Constructor.** `hoursWorked` starts at `0`. If `name` is empty, store `"Unknown"`. If `hourlyWage` is negative, store `0.0`.

**Employee IDs.** `nextID` is shared across *every* `Employee`, `Cashier`, and `Manager` ever constructed; it does not reset per type. The first employee created anywhere in the program gets ID `1000`; every one after that gets the next integer, in construction order.

Because `nextID` is shared by all employees, it must be declared as `static` in `Employee.h`. In `Employee.cpp`, define and initialize it once:

```cpp
int Employee::nextID = 1000;
```

Example:

```cpp
Employee e1("Robin", 20.0);        // e1.getID() == 1000
Cashier c1("Abigail", 15.0);       // c1.getID() == 1001
Manager m1("Demetrius", 25.0, 2);  // m1.getID() == 1002
```

**`logHours(int hours)`.** If `hours` is negative, return `false` and leave `hoursWorked` unchanged. Otherwise, add `hours` to `hoursWorked` and return `true`.

**`calculatePay()`.** Regular time is the first 40 hours at `hourlyWage`. Hours 41–60 pay at `1.5×`. Any hours beyond 60 pay at `2.0×`. For example, at `hourlyWage = 20.0` and `hoursWorked = 45`:

```text
40 hours × 20.0        = 800.0
5 hours × 20.0 × 1.5    = 150.0
total                   = 950.0
```

Small floating-point rounding differences are fine; the autograder allows a tolerance of ±0.01.

---

### `Cashier` (derived class)

```cpp
class Cashier : public Employee {
private:
    int itemsScanned;
    double tipsCollected;

public:
    Cashier(string name, double hourlyWage);
    bool logShift(int items);
    bool addTips(double amount);
    double calculatePay();
    double performanceScore();
};
```

**Constructor.** Calls the `Employee` constructor. This cashier starts with `0` items scanned and `0.0` tips collected.

**`logShift(int items)`.** If `items` is negative, return `false` and leave `itemsScanned` unchanged. Otherwise, add `items` to `itemsScanned` and return `true`.

**`addTips(double amount)`.** If `amount` is negative, return `false` and leave `tipsCollected` unchanged. Otherwise, add `amount` to `tipsCollected` and return `true`.

**`calculatePay()`.** A cashier's pay is their regular wage-and-overtime pay, using the same tiered rule as `Employee`, plus tips collected on top.

Remember: even though `Cashier` inherits from `Employee`, `hourlyWage` and `hoursWorked` are still `private` to `Employee`. Do not access them directly. Use public methods such as `getHourlyWage()` and `getHoursWorked()`, or call `Employee::calculatePay()` and then add the cashier's tips.

**`performanceScore()`.** Returns items scanned this pay period divided by hours worked this pay period, as a `double`. Guard against dividing by zero: if no hours have been logged, return `0.0`.

**Example:**

```cpp
Cashier c("Abigail", 15.0);
c.logHours(42);
c.addTips(30.5);
c.calculatePay();
// wage-and-overtime part: 40×15.0 + 2×15.0×1.5 = 600 + 45 = 645.0
// + tips: 645.0 + 30.5 = 675.5
```

---

### `Manager` (derived class)

```cpp
class Manager : public Employee {
private:
    double bonus;
    int teamSize;

public:
    Manager(string name, double hourlyWage, int teamSize);
    bool awardBonus(double amount);
    double calculatePay();
    bool qualifiesForPromotion();
    int getTeamSize();
};
```

**Constructor.** Calls the `Employee` constructor. This manager starts with `0.0` bonus awarded. If `teamSize` is negative, store `0`.

**`awardBonus(double amount)`.** If `amount` is negative, return `false` and leave `bonus` unchanged. Otherwise, add `amount` to `bonus` and return `true`.

**`calculatePay()`.** A manager's pay is their regular wage-and-overtime pay, using the same tiered rule as `Employee`, plus bonus on top.

Remember: even though `Manager` inherits from `Employee`, `hourlyWage` and `hoursWorked` are still `private` to `Employee`. Do not access them directly. Use public methods such as `getHourlyWage()` and `getHoursWorked()`, or call `Employee::calculatePay()` and then add the manager's bonus.

**`qualifiesForPromotion()`.** Returns `true` only if **all** of the following hold: total hours worked so far is at least `160`, the bonus awarded so far is greater than `0.0`, and team size is at least `2`. Pay attention to which comparisons are "at least" and which are "greater than"; the boundary matters.

**Example:**

```cpp
Manager m("Demetrius", 25.0, 2);
m.logHours(160);
m.awardBonus(50.0);
m.qualifiesForPromotion();   // true

Manager m2("Marnie", 25.0, 2);
m2.logHours(159);
m2.awardBonus(50.0);
m2.qualifiesForPromotion();  // false (one hour short)
```

---

### `Store` 

```cpp
class Store {
private:
    vector<Cashier> cashiers;
    vector<Manager> managers;

public:
    void hireCashier(Cashier c);
    void hireManager(Manager m);
    int cashierCount();
    int managerCount();
    double totalPayroll();
    Cashier topCashier();
    vector<Manager> promotionEligible();
    bool promoteToManager(int employeeID, int teamSize);
    string generateReport();
};
```

**`hireCashier` / `hireManager`.** Adds the given employee to the appropriate list.

**`totalPayroll()`.** The sum of `calculatePay()` across every cashier and every manager currently in the store.

**`topCashier()`.** The cashier with the highest `performanceScore()`. If there's a tie, return whichever was hired first. If no cashiers are currently in the store, return `Cashier("None", 0.0)`.

The placeholder cashier is only a return value for the empty-store case. The autograder will not rely on that placeholder's employee ID.

**`promotionEligible()`.** All managers currently in the store for whom `qualifiesForPromotion()` is `true`, in hire order.

**`promoteToManager(int employeeID, int teamSize)`.** This is the trickiest method in the assignment. Find the cashier (currently in the store) whose `getID()` matches `employeeID`.

- If no such cashier exists, do nothing and return `false`.
- If found: using only that cashier's own public methods, pull out what a new `Manager` needs to start from (their name, hourly wage, and hours worked so far). Construct a new `Manager` with that name, that hourly wage, and the given `teamSize`, then bring their hours worked over onto the new manager the same way any code would: through a public method, not by copying private data directly. Add this new manager to the store, and remove the promoted cashier from the store's cashiers. Return `true`.

If `teamSize` is negative, the promotion still happens, but the new manager stores the default team size of `0`, following the constructor validation rule.

A promoted employee gets a **new** employee ID, like any freshly constructed object; this models leaving one role and starting another, not silently transforming in place. Their tips collected do not carry over; `Manager` has no field for them.

```cpp
Store s;
Cashier c("Abigail", 15.0);
c.logHours(50);
c.addTips(20.0);
s.hireCashier(c);
// suppose c.getID() == 1000

s.promoteToManager(1000, 3);  // true
s.cashierCount();             // 0 (Abigail is no longer a cashier)
s.managerCount();             // 1 (she's now a manager)
// the new Manager's hoursWorked is 50, carried over from her time as a cashier
```

**`generateReport()`.** Returns (does not print) a string in **exactly** this format:

```text
=== JojaMart Weekly Report ===
Total Employees: <cashierCount + managerCount>
Total Payroll: $<totalPayroll, 2 decimal places>
Top Cashier: <name> (<performanceScore, 2 decimal places> items/hr)
Promotion Eligible Managers: <comma-separated names, or "None">
```

Names in the promotion list are joined with `", "` (comma + space), no trailing comma. Example, for a store with 2 cashiers and 2 managers where only Demetrius qualifies:

```text
=== JojaMart Weekly Report ===
Total Employees: 4
Total Payroll: $1234.56
Top Cashier: Abigail (5.00 items/hr)
Promotion Eligible Managers: Demetrius
```

If nobody qualifies, that last line reads `Promotion Eligible Managers: None`.

---

### `ScheduleAudit`

Every week, a manager writes down a **planned schedule** for an employee: one character per day, where the character is whatever code that shift uses (e.g. `'M'`, `'A'`, `'E'`). At the end of the week, Morris pulls the **actual clock-in record**, also one character per day. The two don't always line up: someone might clock in for shifts nobody planned, or planned shifts might never get worked. Worse, the two records aren't even guaranteed to be the same length.

`ScheduleAudit` is not related to `Employee`, `Cashier`, or `Manager`; it doesn't inherit from anything and doesn't need to. Its job is purely to compare two strings.

```cpp
class ScheduleAudit {
private:
    string plannedSchedule;
    string actualSchedule;
    double bestSimilarityScore;
    int bestAlignmentIndex;

public:
    ScheduleAudit(string plannedSchedule, string actualSchedule);
    double findBestAlignment();
    int getBestAlignmentIndex();
    double getBestSimilarityScore();
    vector<string> detectDiscrepancies();
};
```

This class does **not** follow the Validation Policy above; you may assume `plannedSchedule` and `actualSchedule` are always non-empty. The algorithm doesn't care what the characters mean, only whether two characters match.

**The alignment problem.** Whichever of the two strings is shorter needs to be lined up against the longer one, but at *which* starting position? Try every position the shorter string could possibly start at within the longer one, and at each one, score how well they match: the fraction of characters that agree, out of the shorter string's length. The position with the highest score is the best alignment. If more than one position ties for the best score, use the earliest one.

**`findBestAlignment()`.** Runs the process above, stores both the best score and the position it occurred at, and returns the score. (If the two strings are the same length, there's only one possible "alignment" at position `0`, so this degenerates to a single direct comparison.)

**`getBestAlignmentIndex()` / `getBestSimilarityScore()`.** Return whatever the most recent `findBestAlignment()` computed. If neither has been called yet, `detectDiscrepancies()` below needs the alignment too. It's up to you whether it computes it on demand or requires `findBestAlignment()` to have already run, but calling `detectDiscrepancies()` should still work correctly either way.

**`detectDiscrepancies()`.** Once the best alignment is known, walk through it and classify what you find, returning one exact string per discrepancy, in order from the earliest position to the latest. Every position belongs to one of three cases:

- Both strings have a character at that position, and they **agree**: no discrepancy, nothing gets added to the result.
- Both strings have a character at that position, but they **disagree** (a *mismatch*): `"Mismatch at position P: planned X but worked Y"`.
- Only one of the two strings actually reaches that position (this only happens outside the aligned region, when the strings are different lengths):
  - If it's the **actual** record that has an extra character with nothing on the planned side: `"Unplanned Shift at position P: worked X with no shift planned"`.
  - If it's the **planned** record that has an extra character with nothing on the actual side: `"Missed Shift at position P: X was planned but never worked"`.

`P` is 1-indexed, counted within whichever string actually extends to that position. If there are no discrepancies at all, `detectDiscrepancies()` returns an empty vector.

**Examples:**

```cpp
ScheduleAudit a1("MEM", "AAMEMAA");
a1.findBestAlignment();               // returns 1.0
a1.getBestAlignmentIndex();           // 2
a1.detectDiscrepancies();
// {"Unplanned Shift at position 1: worked A with no shift planned",
//  "Unplanned Shift at position 2: worked A with no shift planned",
//  "Unplanned Shift at position 6: worked A with no shift planned",
//  "Unplanned Shift at position 7: worked A with no shift planned"}
```

```cpp
ScheduleAudit a2("MAEE", "MA");
a2.findBestAlignment();               // returns 1.0
a2.getBestAlignmentIndex();           // 0
a2.detectDiscrepancies();
// {"Missed Shift at position 3: E was planned but never worked",
//  "Missed Shift at position 4: E was planned but never worked"}
```

```cpp
ScheduleAudit a3("MAEMA", "MEEAA");
a3.findBestAlignment();               // returns 0.6
a3.getBestAlignmentIndex();           // 0
a3.detectDiscrepancies();
// {"Mismatch at position 2: planned A but worked E",
//  "Mismatch at position 4: planned M but worked A"}
```

---

## Required Input Helpers (in `main.cpp`)

```cpp
string promptString(string prompt);
int promptInt(string prompt, int minVal, int maxVal);
double promptDouble(string prompt, double minVal, double maxVal);
```

`promptString` is the only place `cout` may appear in your **submitted** code. It prints `prompt`, reads one line with `getline`, and returns it. `promptInt` and `promptDouble` must build on top of `promptString`: get a line of text, attempt to parse it as the right type. If parsing fails, or the parsed value falls outside `[minVal, maxVal]`, call `promptString` again rather than accepting it. They keep looping until they get something valid.

The autograder and course staff **will test your classes with hostile input**, values designed to expose missing validation. Handling bad input according to the validation policy above, without crashing, is part of your grade.

---

## `main.cpp`

Using your three prompt helpers, collect enough information to build a small `Store`:

1. Ask how many cashiers to hire, then for each one, collect a name, hourly wage, hours worked, items scanned, and tips collected. Construct and configure a `Cashier`, then hire it.
2. Do the same for managers (name, hourly wage, team size, hours worked, bonus).
3. Hire everyone into one `Store`.
4. Ask for a planned schedule string and an actual schedule string, and construct a `ScheduleAudit` from them.

You choose your own prompt wording and reasonable input ranges (e.g. wages between `0` and `1000`, hours between `0` and `999`). None of that is graded, since nothing about `main()`'s output is checked. What's graded is that your classes behave correctly no matter how they're driven.

Before you submit, search your project for `cout` and confirm the only remaining uses are inside `promptString`.

---

<<<HW_ACTION>>>

Submit on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **06/07/2026**. 

Upload all eleven files listed at the top: 
- `Employee.h`
- `Employee.cpp`
- `Cashier.h`
- `Cashier.cpp`
- `Manager.h`
- `Manager.cpp`
- `Store.h`
- `Store.cpp`
- `ScheduleAudit.h`
- `ScheduleAudit.cpp`
- `main.cpp`

<<<END_HW_ACTION>>>
