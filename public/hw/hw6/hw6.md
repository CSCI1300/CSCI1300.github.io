# Homework 6

Handout for **Homework 6** will be filled in before this assignment opens.

## Part A (recitation)

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

### Exercise 1 — `hw6A1.cpp`
 
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

### Exercise 2 — `hw6A2.cpp`
 
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
 
### Exercise 3 — `hw6A3.cpp`
 
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


---



## Part B (Gradescope)

_To be announced._
