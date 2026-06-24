# Homework 5

**Part A** (this handout) is due on **Wednesday, June 24, 2026**. Part A is split into two stages: a **version-control setup** (creating a GitHub account, installing Git, linking an SSH key, and creating a repository) and **two short C++ exercises** that you will commit and push to that repository.

**Part B** is submitted on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Tuesday, June 30, 2026 at 11:59 PM Mountain Time**.

---

## Part A

This week's Part A is a little different. Before the C++, you will set up the tools that professional developers (and your final project) rely on every day: **Git** and **GitHub**. Once your repository is ready, you will write **two** programs, add them to the repository, and push them back to GitHub.

Over at the Community Center, the farmer turns to the fourth room: the **Vault**. Unlike the Pantry and the Crafts Room, the Vault's bundles do not ask for crops or wood or fish. The Vault wants one thing only: **gold**. That makes this week's farming work quick, which is good, because the rest of your time goes toward learning version control.

### Why version control?

As programs grow, you need a way to save snapshots of your work, track what changed, and recover older versions when something breaks. **Git** is the tool that does this on your computer. **GitHub** is a website that stores a copy of your Git repository online so you can back it up, share it, and submit it. Your **final project** will be submitted through GitHub, so this week gets you set up to begin working on your project.

---

### Step 1 — Create a GitHub account

1. Go to [https://github.com](https://github.com) and click **Sign up**.
2. Use an email you will keep access to, it doesn't need to be your school email, even for the free student benefits (you can add those to your account later).
3. Pick a username you are comfortable sharing with instructors and putting on a resume.
4. Verify your email address when GitHub prompts you.

If you already have a GitHub account, you can just use that.

---

### Step 2 — Install Git

Choose **Windows** or **Mac**.

<<<HANDOUT_HW5_GIT_WINDOWS>>>

1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win) and download the **64-bit Git for Windows** installer.
2. Run the installer. The defaults are fine — keep clicking **Next**, then **Install**. This also installs **Git Bash**, a terminal you will use for all Git commands.
3. When it finishes, open **Git Bash** from the Start menu.
4. Confirm the install by running:

```bash
git --version
```

You should see a version number such as `git version 2.45.0`.

> For the rest of Part A on Windows, run every command in **Git Bash** (not Command Prompt or PowerShell).

<<<HANDOUT_HW5_GIT_MAC>>>

1. Open **Terminal** (Spotlight: Command+Space, type **Terminal**).
2. Type the following and press Return:

```bash
git --version
```

3. If Git is already installed, you will see a version number. If it is not, macOS will pop up a dialog offering to install the **Command Line Developer Tools** — click **Install** and wait for it to finish, then run `git --version` again.

<<<HANDOUT_HW5_GIT_TAIL>>>

### Step 3 — Tell Git who you are

Git stamps every snapshot with your name and email. Set them once (use the **same email** that is on your GitHub account). Replace the placeholders with your own information:

```bash
git config --global user.name "Your Name"
git config --global user.email "yourname@example.com"
```

Verify they were set:

```bash
git config --global user.name
git config --global user.email
```

---

### Step 4 — Create an SSH key and link it to GitHub

To push code to GitHub from your laptop securely, you will create an **SSH key**. An SSH key comes in two halves: a **private** key that stays on your computer, and a **public** key that you give to GitHub. Together they let GitHub recognize your machine without typing a password every time.

> You need a **separate** SSH key for each computer you use. If you set one up on another machine before, you still need a new one here.

Choose **Windows** or **Mac**.

<<<HANDOUT_HW5_SSH_WINDOWS>>>

In **Git Bash**:

1. Generate the key (use your GitHub email). Press **Enter** to accept the default file location. You may set a passphrase or leave it blank by pressing **Enter** twice:

```bash
ssh-keygen -t ed25519 -C "yourname@example.com"
```

2. Start the SSH agent:

```bash
eval "$(ssh-agent -s)"
```

3. Add your new key to the agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

4. Copy your **public** key to the clipboard:

```bash
clip < ~/.ssh/id_ed25519.pub
```

<<<HANDOUT_HW5_SSH_MAC>>>

In **Terminal**:

1. Generate the key (use your GitHub email). Press **Return** to accept the default file location. You may set a passphrase or leave it blank by pressing **Return** twice:

```bash
ssh-keygen -t ed25519 -C "yourname@example.com"
```

2. Start the SSH agent:

```bash
eval "$(ssh-agent -s)"
```

3. Add your new key to the agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

4. Copy your **public** key to the clipboard:

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

<<<HANDOUT_HW5_SSH_TAIL>>>

Now give the public key to GitHub:

5. In your browser, go to **GitHub → your profile picture (top right) → Settings → SSH and GPG keys**, or just visit [https://github.com/settings/keys](https://github.com/settings/keys).
6. Click **New SSH key**. Give it a **Title** (something like "My Laptop"), leave the key type as **Authentication Key**, and **paste** the key you copied into the **Key** box. Click **Add SSH key**.
7. Back in your terminal (Git Bash or Terminal), test the connection:

```bash
ssh -T git@github.com
```

The first time, type `yes` when asked to continue. If everything worked, you will see a message like:

```text
Hi yourusername! You've successfully authenticated, but GitHub does not provide shell access.
```

That message means success (the "does not provide shell access" part is normal and expected).

---

### Step 5 — Create a repository on GitHub

1. On GitHub, click the **+** in the top-right corner and choose **New repository** (or visit [https://github.com/new](https://github.com/new)).
2. Name it **`csci1300_hw5`**.
3. Make it a public repository.
4. Check the box to **Add a README file** (this gives the repository an initial file so it is not empty).
5. Click **Create repository**.

---

### Step 6 — Clone your repository to your computer

"Cloning" downloads your GitHub repository to your laptop so you can work on it locally.

1. On your repository's GitHub page, click the green **Code** button, choose the **SSH** tab, and copy the address (it looks like `git@github.com:yourusername/hw5-version-control.git`).
2. In your terminal, move to a folder where you keep your coursework (using the terminal/console commands you learned earlier), then clone the repo (paste your own address):

```bash
git clone git@github.com:yourusername/csci1300_hw5.git
```

3. Move into the new folder:

```bash
cd csci1300_hw5
```

You are now inside your local copy of the repository. This is where you will create the two C++ files below.

---

### Step 7 — The two C++ exercises

Create both files **inside** your `csci1300_hw5` folder, using the exact file names given. These are quick, Vault-themed programs that reuse skills from earlier homeworks (functions, arrays, loops, and conditionals).

#### Exercise 1 — `hw5A1.cpp`

The farmer is funding the Community Center **Vault**, which needs nothing but raw gold. Over the week the farmer makes several gold donations, and they want to know whether the running total has reached the Vault's goal.

Read a count from the user (how many donations the farmer made), then read that many gold amounts into an array. You may assume the count will be between 1 and 100. Write a function named `totalGold` that takes the array and its size and **returns** the sum of all donations. In `main`, compare the total to the Vault goal of **42500** gold and report the result.

Define this function above `main`:

```cpp
int totalGold(int donations[], int size)
```

Print the following prompts and read each value from the user:

- `"Enter the number of gold donations: "` --> read into an `int` using `cin`
- `"Enter gold donation N: "` --> read each value into the array using `cin` (where `N` counts up from 1)

Use this exact value:

- Vault Goal: `42500`

Print this exact section header:

```text
--- Vault Funding ---
```

Your output must include these exact labels:

```text
Total gold donated:
Vault goal:
```

If the total is **greater than or equal to** the goal, print this exact line (with the surplus):

```text
The Vault is fully funded! Surplus: <amount> gold
```

Otherwise, print this exact line (with the amount still needed):

```text
The Vault still needs <amount> more gold.
```

Expected output (with sample inputs: 3 donations, values 20000 15000 10000):

```text
Enter the number of gold donations: 3
Enter gold donation 1: 20000
Enter gold donation 2: 15000
Enter gold donation 3: 10000
--- Vault Funding ---
Total gold donated: 45000
Vault goal: 42500
The Vault is fully funded! Surplus: 2500 gold
```

Expected output (with sample inputs: 2 donations, values 10000 5000):

```text
Enter the number of gold donations: 2
Enter gold donation 1: 10000
Enter gold donation 2: 5000
--- Vault Funding ---
Total gold donated: 15000
Vault goal: 42500
The Vault still needs 27500 more gold.
```

---

#### Exercise 2 — `hw5A2.cpp`

Rather than donating in bursts, the farmer decides to set aside the **same amount of gold every day** until the Vault is funded. They want to know how many days it will take.

Write a function named `daysToFund` that takes the starting Vault balance and the daily deposit amount. Using a **`while` loop**, it should add the daily deposit to the balance once per day, print the running balance after each day, and **return** the number of days needed to reach the Vault goal of **42500** gold. You may assume the daily deposit is a positive integer and the starting balance is below the goal.

Define this function above `main`:

```cpp
int daysToFund(int startBalance, int dailyDeposit)
```

Print the following prompts and read each value from the user (in `main`):

- `"Enter the starting Vault balance: "` --> read into an `int` using `cin`
- `"Enter the daily deposit amount: "` --> read into an `int` using `cin`

Use this exact value:

- Vault Goal: `42500`

Print this exact section header (in `main`, before calling the function):

```text
--- Vault Savings Plan ---
```

Inside `daysToFund`, print one line per day in this exact format:

```text
Day N: deposited <amount>, balance now <balance>
```

After the function returns, print this exact line in `main`:

```text
The Vault was funded in <days> days!
```

Expected output (with sample inputs: starting balance 40000, daily deposit 1000):

```text
Enter the starting Vault balance: 40000
Enter the daily deposit amount: 1000
--- Vault Savings Plan ---
Day 1: deposited 1000, balance now 41000
Day 2: deposited 1000, balance now 42000
Day 3: deposited 1000, balance now 43000
The Vault was funded in 3 days!
```

---

### Step 8 — Commit and push your work

Now save your two files into Git history and upload them to GitHub. Run these commands from **inside** your `csci1300_hw5` folder:

1. Stage your changes (the `.` means "all changed files"):

```bash
git add .
```

2. Commit them with a message describing what you did:

```bash
git commit -m "Add HW5 Part A Vault exercises"
```

3. Push the commit up to GitHub:

```bash
git push
```

4. Refresh your repository page on GitHub. You should now see `hw5A1.cpp` and `hw5A2.cpp` listed. That confirms your whole setup works end to end.

---

<<<HW_ACTION>>>

Submit **Part A** on **[Gradescope](https://www.gradescope.com/courses/1314704)**. Open the **Homework 5 (A)** item and:

- Upload your two source files (names must match **exactly**; no screenshots):
  - **`hw5A1.cpp`** — Vault funding total (array + function returning a sum)
  - **`hw5A2.cpp`** — Vault savings plan (while loop + function returning a count)
- Make sure both files have been **committed and pushed** to your `hw5-version-control` GitHub repository.

During recitation, be ready to show your TA your GitHub repository page with both files pushed.

<<<END_HW_ACTION>>>

---
## Part B
---

# How to Write This Program

For this assignment, you will write one complete C++ program in a file named:

```text
hw5b.cpp
```

As in HW3 and HW4, all of your functions must be **defined above `main()`**. This week introduces **one** new tool — the **vector** — alongside a broad review of everything from the past few weeks: functions, arrays, loops (`for`, `while`, and nested), `switch` statements, conditionals, strings, and input handling. Use this template:

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

// Define your functions here, above main()

int main() {

    // Write your homework code here

    return 0;
}
```

---

## New this week: Vectors

An **array** has a fixed size that must be known when the program is compiled. A **vector** is a more flexible cousin: it can **grow** as you add items, and it always **knows its own size**. You will use vectors constantly in your final project, so this assignment introduces them now.

To use vectors, add `#include <vector>` at the top of your file.

**Declaring a vector:**

```cpp
vector<int> sales;              // an empty vector of ints
vector<int> scores = {10, 20};  // a vector that starts with two values
```

The `<int>` part says "a vector that holds ints." You could also have a `vector<string>`, a `vector<double>`, and so on.

**Adding to a vector** with `.push_back()` — this appends a value to the end and grows the vector by one:

```cpp
vector<int> sales;     // empty
sales.push_back(100);  // now holds: 100
sales.push_back(250);  // now holds: 100, 250
```

**Accessing elements** by index, exactly like an array (starting at `0`):

```cpp
cout << sales[0] << endl;   // 100
cout << sales[1] << endl;   // 250
```

**Finding the size** with `.size()`. Just like `.length()` on a string, `.size()` returns a `size_t`, so under our `-Wall -Werror -Wpedantic` flags you must wrap it in `static_cast<int>()` before comparing it to an `int`:

```cpp
for (int i = 0; i < static_cast<int>(sales.size()); i++) {
    cout << "Day " << i << ": " << sales[i] << endl;
}
```

**Vectors and functions.** Unlike arrays, a vector **can** be passed by value and **can** be returned from a function. When you pass a vector by value, the function receives a **copy** (so changes inside the function do not affect the original — just like an ordinary `int`). A function can also build a brand-new vector and `return` it:

```cpp
int sumVector(vector<int> v) {            // takes a vector, returns an int
    int total = 0;
    for (int i = 0; i < static_cast<int>(v.size()); i++) {
        total += v[i];
    }
    return total;
}

vector<int> makeDoubled(vector<int> v) {  // takes a vector, returns a vector
    vector<int> result;
    for (int i = 0; i < static_cast<int>(v.size()); i++) {
        result.push_back(v[i] * 2);
    }
    return result;
}
```

> **Reminder:** Because a vector passed by value is copied, a function written like the ones above reads from the vector or returns a new one. That is exactly what every problem below needs.

---

You are still the Assistant to the Regional Manager of JojaMart Pelican Town, reporting to **Morris**. The Vault at the Community Center is filling up, and Morris has noticed gold flowing toward the restoration instead of toward Joja. He is not panicking — Morris never panics on paper — but he wants the numbers tighter than ever. This week is all about data: logging sales, ranking days, auditing regions, polishing the storefront message, and trimming the product list down to the winners. No bold moves, just a sharper machine. The real confrontation is still weeks away. For now, Morris wants clean reports, and he wants them to compile without a single warning.

---

# Problem 1: Daily Sales Log

Morris keys in last week's daily Joja sales one figure at a time, but he does not tell you in advance how many days there were — he just enters `-1` when he is done. This is a perfect job for a **vector**, which can grow as each figure arrives.

Use a **`while` loop** to read sales figures with `cin` until the user enters `-1`. Store each valid figure (every value except the `-1`) in a `vector<int>` using `.push_back()`. Then write a function that returns the total.

Define this function above `main`:

- `int totalSales(vector<int> sales)` — **returns** the sum of all figures in the vector.

> **Note:** Use a **`while` loop** for this problem.

Print the following prompt and read each value from the user (repeatedly, inside the loop):

- `"Enter a daily sales figure (-1 to stop): "` --> read into an `int` using `cin`

Print this exact section header (after the loop ends):

```text
--- Daily Sales Log ---
```

Your output must include these exact labels:

```text
Days logged:
Total sales:
```

Expected output (with sample inputs: 120, 95, 140, -1):

```text
Enter a daily sales figure (-1 to stop): 120
Enter a daily sales figure (-1 to stop): 95
Enter a daily sales figure (-1 to stop): 140
Enter a daily sales figure (-1 to stop): -1
--- Daily Sales Log ---
Days logged: 3
Total sales: 355 gold
```

---

# Problem 2: Best Sales Day

Now Morris wants to know which single day brought in the most gold. This time he tells you how many days there were up front.

Read a count from the user, then read that many sales figures into a `vector<int>` (using `.push_back()`). You may assume the count is between 1 and 100. Write a function that returns the **index** of the largest figure, then use that index in `main` to report the day (numbered from 1) and its sales.

Define this function above `main`:

- `int bestDayIndex(vector<int> sales)` — **returns the index** of the largest figure (you may assume no ties).

> **Note:** Use a **`for` loop** for this problem.

Print the following prompts and read each value from the user:

- `"Enter the number of days: "` --> read into an `int` using `cin`
- `"Enter sales for day N: "` --> read each value into the vector using `cin`

Print this exact section header:

```text
--- Best Sales Day ---
```

Your output must include these exact labels:

```text
Best day:
Sales:
```

Expected output (with sample inputs: 4 days, values 200 350 150 300):

```text
Enter the number of days: 4
Enter sales for day 1: 200
Enter sales for day 2: 350
Enter sales for day 3: 150
Enter sales for day 4: 300
--- Best Sales Day ---
Best day: 2
Sales: 350 gold
```

(Day 2 holds `350`, the largest figure. You may assume there are no ties.)

---

# Problem 3: Regional Sales

Joja tracks sales across several **regions**, and each region reports the same fixed number of days. Morris wants each region's total plus a grand total across all regions.

Use **nested loops**: the outer loop walks the regions, the inner loop reads that region's daily figures (there are always **3** days per region). Add up each region's three days, store each region's total in an **array**, and print it. Then write a function that totals the array.

Define this function above `main`:

- `int grandTotal(int totals[], int size)` — **returns** the sum of all region totals.

Use this exact value:

- Days per region: `3`

Print the following prompts and read each value from the user:

- `"Enter the number of regions: "` --> read into an `int` using `cin` (you may assume 1 to 100)
- `"Enter sales for region R day D: "` --> read each value using `cin`

Print this exact section header (after reading the number of regions, before the nested loop):

```text
--- Regional Sales ---
```

For each region, print this exact line after its three days are read:

```text
Region R total: <total>
```

Your output must include this exact label:

```text
Grand total:
```

Expected output (with sample inputs: 2 regions; region 1 days 100 200 150; region 2 days 300 250 100):

```text
Enter the number of regions: 2
--- Regional Sales ---
Enter sales for region 1 day 1: 100
Enter sales for region 1 day 2: 200
Enter sales for region 1 day 3: 150
Region 1 total: 450
Enter sales for region 2 day 1: 300
Enter sales for region 2 day 2: 250
Enter sales for region 2 day 3: 100
Region 2 total: 650
Grand total: 1100
```

---

# Problem 4: Store Announcement

Morris is updating the loudspeaker announcement that plays over the storefront, and he wants it printed in bold, attention-grabbing capitals.

Read a full-line announcement from the user with `getline()`. Write a function that returns the announcement converted to **all uppercase**, leaving spaces and punctuation untouched. Convert each lowercase letter by walking the string character by character.

Define this function above `main`:

- `string toUpperCase(string text)` — **returns** a copy of `text` with every lowercase letter converted to uppercase.

> **Reminder on input:** because earlier problems read with `cin >>`, a newline is left behind in the input buffer. **Before** this problem's `getline`, clear it with `cin.ignore(1000, '\n');` so the announcement is not read as an empty line.

> **Hint:** A lowercase letter (`'a'` to `'z'`) can be converted to its uppercase form by subtracting `32` from the character. You do not need any special library functions.

Print the following prompt and read the value from the user:

- `"Enter the store announcement: "` --> read a full line into a `string` using `getline()`

Print this exact section header:

```text
--- Store Announcement ---
```

Your output must include these exact labels:

```text
Original:
Announcement:
Length:
```

Expected output (with sample input: `buy joja cola`):

```text
Enter the store announcement: buy joja cola
--- Store Announcement ---
Original: buy joja cola
Announcement: BUY JOJA COLA
Length: 13
```

---

# Problem 5: Joja Terminal

Morris wants a simple terminal he can use to manage the day's operating budget — spending on advertising or restocking, collecting membership fees, and checking the balance — until he closes it out.

Display a menu and use a **`while` loop** that keeps running until the user chooses option `5`. Read the user's choice each time through the loop, and respond with `if / else if / else` (or a `switch`). Keep a running **budget** that starts from a value the user provides. Spending options may **not** drive the budget negative: if there is not enough budget for an action, refuse it and print a message instead.

Write this function and call it from inside your loop:

- `void printMenu()` — takes **no arguments** and prints the five menu lines shown below.

The menu (printed by `printMenu()`):

```text
1. Spend on advertising (-100 gold)
2. Restock shelves (-50 gold)
3. Collect membership fees (+75 gold)
4. Check budget
5. Close terminal
```

Action rules:

| Choice | Behavior |
| --- | --- |
| 1 | If budget ≥ 100: subtract 100, print `Spent 100 gold on advertising. Budget: <budget>`. Otherwise print `Not enough budget for advertising.` |
| 2 | If budget ≥ 50: subtract 50, print `Spent 50 gold restocking. Budget: <budget>`. Otherwise print `Not enough budget to restock.` |
| 3 | Add 75, print `Collected 75 gold in membership fees. Budget: <budget>` |
| 4 | Print `Current budget: <budget> gold` |
| 5 | Print `Closing the Joja terminal.` (and the loop ends) |
| anything else | Print `Invalid option.` |

> **Note:** Use a **`while` loop** for this problem.

Print the following prompts and read each value from the user:

- `"Enter the starting daily budget: "` --> read into an `int` using `cin` (once, before the loop)
- `"Choose an option: "` --> read into an `int` using `cin` (each time through the loop)

Print this exact section header after reading the starting budget and before the loop:

```text
--- Joja Terminal ---
```

After the loop ends, print this exact line:

```text
Final budget: <budget> gold
```

Expected output (with sample inputs: starting budget 200, then choices 1, 3, 2, 4, 5):

```text
Enter the starting daily budget: 200
--- Joja Terminal ---
1. Spend on advertising (-100 gold)
2. Restock shelves (-50 gold)
3. Collect membership fees (+75 gold)
4. Check budget
5. Close terminal
Choose an option: 1
Spent 100 gold on advertising. Budget: 100
1. Spend on advertising (-100 gold)
2. Restock shelves (-50 gold)
3. Collect membership fees (+75 gold)
4. Check budget
5. Close terminal
Choose an option: 3
Collected 75 gold in membership fees. Budget: 175
1. Spend on advertising (-100 gold)
2. Restock shelves (-50 gold)
3. Collect membership fees (+75 gold)
4. Check budget
5. Close terminal
Choose an option: 2
Spent 50 gold restocking. Budget: 125
1. Spend on advertising (-100 gold)
2. Restock shelves (-50 gold)
3. Collect membership fees (+75 gold)
4. Check budget
5. Close terminal
Choose an option: 4
Current budget: 125 gold
1. Spend on advertising (-100 gold)
2. Restock shelves (-50 gold)
3. Collect membership fees (+75 gold)
4. Check budget
5. Close terminal
Choose an option: 5
Closing the Joja terminal.
Final budget: 125 gold
```

---

# Problem 6: High Performers

Morris wants a shortlist of only the products that beat a sales threshold, so he can feature them in the next ad.

Read a count and that many product sales figures into a `vector<int>`. You may assume the count is between 1 and 100. Write a function that takes the sales vector and a threshold and **returns a new vector** containing only the figures **strictly greater than** the threshold. In `main`, print every figure in the returned shortlist, then print how many made the cut.

Define this function above `main`:

- `vector<int> aboveThreshold(vector<int> sales, int threshold)` — **returns** a new vector of the qualifying figures.

Use this exact value:

- Threshold: `100`

Print the following prompts and read each value from the user:

- `"Enter the number of products: "` --> read into an `int` using `cin`
- `"Enter sales for product N: "` --> read each value into the vector using `cin`

Print this exact section header:

```text
--- High Performers ---
```

For each qualifying figure (in order), print:

```text
<value> gold
```

Your output must include this exact label:

```text
Products above 100 gold:
```

Expected output (with sample inputs: 5 products, values 80 120 150 90 200):

```text
Enter the number of products: 5
Enter sales for product 1: 80
Enter sales for product 2: 120
Enter sales for product 3: 150
Enter sales for product 4: 90
Enter sales for product 5: 200
--- High Performers ---
120 gold
150 gold
200 gold
Products above 100 gold: 3
```

(The figures `120`, `150`, and `200` each beat the threshold of `100`, so three products make the shortlist.)

---

# Problem 7: Debugging Morris's Stock Tally

It is late, and Morris tried to write a quick stock tally using a vector before heading home. Nothing compiles. Help him fix it.

Copy this broken code into your file **as comments**:

```cpp
// int sumVector(vector<int> v) {
//     int total = 0
//     for (int i = 0; i <= v.size(); i++) {
//         total += v[i];
//     }
//     return total
// }
//
// vector<int> nums;
// nums.push_back(10);
// nums.push_back(20)
// nums.push_back(30);
// cout << "Sum: " << sumVector(nums) << endl;
```

Then write a **corrected version** underneath it.

Your corrected program should:

- Fix the `sumVector` function so it correctly totals the vector.
- Build a vector containing the values `10`, `20`, and `30` using `.push_back()`.
- Read nothing from the user for this problem.

Define this function above `main`:

```cpp
int sumVector(vector<int> v)
```

> **Hint:** There are missing semicolons, and the loop has two problems with how it compares `i` to `v.size()` — think about both the comparison operator **and** the `size_t` vs `int` warning you learned about.

Print this exact section header:

```text
--- Debug Report ---
```

Your output must include this exact label:

```text
Sum:
```

Expected output:

```text
--- Debug Report ---
Sum: 60
```

You must include at least **two comments** explaining what you fixed. For example (these are not the correct fixes, just an example of the format):

```cpp
// Fixed: added the missing semicolon after the total declaration.
// Fixed: changed <= to < so the loop does not run past the end of the vector.
```

---

# Final Output Requirements

Your program must print all prompts and section headers in the order shown. The full output of your program should follow this structure:

```text
[Problem 1 prompts and output]
--- Daily Sales Log ---
[Problem 1 output]
[Problem 2 prompts]
--- Best Sales Day ---
[Problem 2 output]
[Problem 3 prompt]
--- Regional Sales ---
[Problem 3 prompts and output]
[Problem 4 prompt]
--- Store Announcement ---
[Problem 4 output]
[Problem 5 prompt]
--- Joja Terminal ---
[Problem 5 prompts and output]
[Problem 6 prompts]
--- High Performers ---
[Problem 6 output]
--- Debug Report ---
[Problem 7 output]
```

Your program must compile and run **without errors or warnings** (with `-Wall -Werror -Wpedantic`).

Submit one file:

```text
hw5b.cpp
```

<<<HW_ACTION>>>

Submit **Part B** on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Tuesday, June 30, 2026 at 11:59 PM Mountain Time**. Upload **one** file named **`hw5b.cpp`**.

<<<END_HW_ACTION>>>