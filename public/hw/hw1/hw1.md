# Homework 1

**Part A** (this handout) is due **during your recitation section**. Complete the setup steps below and any Part A deliverables. 

**Part B** is submitted on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Tuesday, June 2, 2026 at 11:59 PM Mountain Time**.

---

## Part A

This guide walks you through installing **VS Code**, a **C/C++ compiler**, and a **debugger** on **Windows** or **Mac**. Bring a laptop that can compile and debug a small C++ program. After you finish the install and debugger steps, complete the **Hello World** section below and submit your **three** source files on **[Gradescope](https://www.gradescope.com/courses/1314704)** as described in the **ACTION REQUIRED** note.

### VS Code setup

Choose **Windows** or **Mac**

<<<HANDOUT_HW1_VS_WINDOWS>>>

#### Important

Before you start, run **Windows Update** on Windows 10 or 11 and install the latest updates.

#### Step 1: Install VS Code

- Go to the [VS Code download page](https://code.visualstudio.com/Download) and download the **Windows** build.

![VS Code download for Windows](/hw/hw1/images-windows/image6.png)

- Run the installer and accept the defaults, then click **Install**. When installation finishes, close the installer.

#### Step 2: Installing MinGW

This section follows Microsoft’s guide: [VS Code C++ with MinGW](https://code.visualstudio.com/docs/cpp/config-mingw).

MinGW is a Windows C/C++ toolchain so you can compile `.cpp` files into an `.exe`.

- Download MSYS2 from the [official installer (x86_64)](https://github.com/msys2/msys2-installer/releases/download/2023-05-26/msys2-x86_64-20230526.exe).
- Open the installer and choose the defaults. At the end, run **MSYS2**.
- In the MSYS2 terminal, run (Shift+Insert pastes in MSYS2’s terminal):

```bash
pacman -S --needed base-devel mingw-w64-x86_64-toolchain
```

![MSYS2 terminal with pacman command](/hw/hw1/images-windows/image8.png)

![Pacman package install in progress](/hw/hw1/images-windows/image7.png)

- Press **Enter** to install the default packages, then **Y** to confirm. Wait **1–5 minutes**, then you can close MSYS2.

##### Add MSYS2 to your PATH

- Press the **Windows** key and search for **Edit environment variables for your account**.

![Search for environment variables](/hw/hw1/images-windows/image10.png)

- Select **Path** → **Edit** → **New**, then add the default MinGW binaries path:

```text
C:\msys64\mingw64\bin
```

![PATH editor with mingw64\bin added](/hw/hw1/images-windows/image9.png)

- Reboot when you’re done with this section.

#### Step 3: VS Code extensions

- After rebooting, open VS Code and open the **Extensions** view (left sidebar).
- Search for **C++** and install **C/C++** and **C/C++ Extension Pack** from **Microsoft**.

![C++ extension search](/hw/hw1/images-windows/image12.png)

![C/C++ extension install](/hw/hw1/images-windows/image11.png)

![C/C++ Extension Pack](/hw/hw1/images-windows/image14.png)

<<<HANDOUT_HW1_VS_MAC>>>

#### Step 1: Install VS Code

- Go to [VS Code for Mac](https://code.visualstudio.com/Download).

![VS Code download for Mac](/hw/hw1/images-mac/image3.png)

- Unzip the download by double-clicking it.

![Unzipped VS Code archive](/hw/hw1/images-mac/image5.png)

- Drag **Visual Studio Code** into your **Applications** folder.

![Drag VS Code to Applications](/hw/hw1/images-mac/image4.png)

- Launch VS Code from **Applications** (right-click → **Open** the first time if macOS blocks it). Open **Terminal → New Terminal** if you want an integrated terminal.

![New Terminal in VS Code](/hw/hw1/images-mac/image7.png)

- Install the **C/C++** extension from the Extensions view.

![C/C++ extension on Mac](/hw/hw1/images-mac/image6.png)

#### Step 2: Install a C++ compiler (`g++`)

- Open **Terminal** (Spotlight: Command+Space, type **Terminal**).
- Run `g++` and press Return. If you see a prompt to install command-line tools, choose **Install** (you do **not** need full Xcode unless you want it).

![macOS install developer tools prompt](/hw/hw1/images-mac/image9.png)

- After installation, run `g++` again; you should see **no input files** (clang):

```bash
g++
# clang: error: no input files
```

![g++ reports no input files](/hw/hw1/images-mac/image8.png)

<<<HANDOUT_HW1_DBG_TITLE>>>

### Debugger installation

Choose **Windows** or **Mac**

<<<HANDOUT_HW1_DBG_WINDOWS>>>

Windows uses **gdb** with the MinGW toolchain above. These steps configure debugging in VS Code.

#### Step 1: Open your code folder in VS Code

![Open folder in VS Code](/hw/hw1/images-debugger-windows/debugger_windows_1.png)

#### Step 2: Open or create `hello_world.cpp`

![Explorer with hello_world.cpp](/hw/hw1/images-debugger-windows/debugger_windows_2.png)

Use this sample:

```cpp
#include <iostream>
using namespace std;

int main()
{
    string message = "Let's Debug!";
    cout << message << endl;
    return 0;
}
```

![hello_world.cpp with sample code](/hw/hw1/images-debugger-windows/debugger_windows_3.png)

#### Step 3: Run and Debug

![Run and Debug pane](/hw/hw1/images-debugger-windows/debugger_windows_4.png)

#### Step 4: Choose GDB / g++

Pick **C++ (GDB/LLDB)**, then select the toolchain entry that includes `C:\msys64\mingw64\bin\g++.exe`.

![Select GDB/LLDB configuration](/hw/hw1/images-debugger-windows/debugger_windows_5.png)

![Choose g++.exe](/hw/hw1/images-debugger-windows/debugger_windows_6.png)

If VS Code offers an informational dialog, you can click **Not now** for now.

![Not now on helper dialog](/hw/hw1/images-debugger-windows/debugger_windows_7.png)

Open the **TERMINAL** panel; you should see **Let's Debug!**.

![Program output in terminal](/hw/hw1/images-debugger-windows/debugger_windows_8.png)

#### Step 5: Edit `tasks.json` for course warning flags

In the **Explorer**, open the **`.vscode`** folder that VS Code created, then open **`tasks.json`**.

![.vscode folder](/hw/hw1/images-debugger-windows/debugger_windows_9.png)

![tasks.json in explorer](/hw/hw1/images-debugger-windows/debugger_windows_10.png)

![tasks.json contents](/hw/hw1/images-debugger-windows/debugger_windows_11.png)

In the **`args`** array for your compile task, add **`-Wall`**, **`-Werror`**, and **`-Wpedantic`** so local builds match course expectations. Save the file.

![tasks.json with Wall Werror Wpedantic](/hw/hw1/images-debugger-windows/debugger_windows_12.png)

#### Step 6: Breakpoints and controls

Click left of a line number to set a **breakpoint** (red dot).

| Selecting a line | Breakpoint set |
| --- | --- |
| ![Click gutter for breakpoint](/hw/hw1/images-debugger-windows/debugger_windows_13.png) | ![Red breakpoint dot](/hw/hw1/images-debugger-windows/debugger_windows_14.png) |

Run **Run and Debug** again; execution pauses on the breakpoint. Inspect variables in the left **Variables** pane.

![Paused on breakpoint](/hw/hw1/images-debugger-windows/debugger_windows_15.png)

![Variables and current statement](/hw/hw1/images-debugger-windows/debugger_windows_16.png)

**Debug toolbar** (left → right):

![Debug control toolbar](/hw/hw1/images-debugger-windows/debugger_windows_17.png)

- **Continue** — run until the next breakpoint  
- **Step Over** — next line, without entering callees  
- **Step Into** — next line, enter functions when needed  
- **Step Out** — finish the current function  
- **Restart** — restart debugging  
- **Stop** — quit debugging  

Most debugging uses **Continue** and **Step Over** once breakpoints are in the right places.

<<<HANDOUT_HW1_DBG_MAC>>>

macOS typically uses **lldb**.

#### Step 1: Create `hello_world.cpp`

```cpp
#include <iostream>
using namespace std;

int main()
{
    string message = "Let's Debug!";
    cout << message << endl;
    return 0;
}
```

#### Step 2: Check `lldb`

In VS Code: **Terminal → New Terminal**, then run:

```bash
lldb
```

If lldb opens, type `exit` to leave. If it’s missing, macOS should offer to install **Command Line Developer Tools**; accept, then run `lldb` again until you see the lldb prompt.

![lldb prompt](/hw/hw1/images-debugger-mac/debugger_mac_1.png)

#### Step 3: Install CodeLLDB

![CodeLLDB extension](/hw/hw1/images-debugger-mac/debugger_mac_2.png)

#### Step 4: Create `launch.json`

**Run and Debug** → **create a launch.json file** → choose **LLDB** (or CodeLLDB’s template if shown).

![Create launch.json](/hw/hw1/images-debugger-mac/debugger_mac_3.png)

![Pick LLDB](/hw/hw1/images-debugger-mac/debugger_mac_4.png)

Replace the file contents with:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "a.out debug",
            "program": "${workspaceFolder}/a.out",
            "args": [ ],
            "cwd": "${workspaceFolder}"
        }
    ]
}
```

![launch.json open](/hw/hw1/images-debugger-mac/debugger_mac_5.png)

Save (**Command+S**).

#### Step 5: Breakpoints

![Breakpoint in hello_world.cpp](/hw/hw1/images-debugger-mac/debugger_mac_6.png)

#### Step 6: Compile with `-g`

```bash
g++ -Wall -Wpedantic -Werror -std=c++17 -g hello_world.cpp
```

The **`-g`** flag keeps debug symbols. You should get **`a.out`** (and often **`a.out.dSYM`**).

![a.out in explorer](/hw/hw1/images-debugger-mac/debugger_mac_7.png)

#### Step 7: Run and Debug

Use the **Run and Debug** view (triangle with “bug”).

![Run and debug view](/hw/hw1/images-debugger-mac/debugger_mac_8.png)

#### Step 8: Start the `a.out` launch

Use the green **Start Debugging** control for the `a.out` configuration.

![Start debugging a.out](/hw/hw1/images-debugger-mac/debugger_mac_9.png)

#### Step 9: Debug controls

![Mac debug toolbar](/hw/hw1/images-debugger-mac/debugger_mac_10.png)

Same button meanings as on Windows: **Continue**, **Step Over**, **Step Into**, **Step Out**, **Restart**, **Stop**.

#### What to look for while debugging

1. **Which lines run** — highlighted **yellow** current line in the editor.  
2. **Variable values** — **Variables** pane updates as you step.

![Variables while paused](/hw/hw1/images-debugger-mac/debugger_mac_11.png)

<<<HANDOUT_HW1_TAIL>>>

### Hello World

The “Hello, World!” program is one of the simplest programs in a programming language, and it is often used to illustrate the basic syntax of a programming language. You will create **three** small programs, each in its **own** `.cpp` file. Use the **exact file names** given below so your uploads match what Gradescope expects.

Files of uncompiled C++ code should end with `.cpp`. Using a capital letter at the beginning of each word in the file name makes it legible without spaces; that style is often called **camel case**.

First, open VS Code. You can make a new folder by clicking this button:

![New folder button in VS Code](/hw/hw1/hello_world_2.png)

Name the folder something intuitive, like `Week_1`, `HW1`, or similar. For each version below, create a **new** file with the toolbar across the top:

![New file toolbar](/hw/hw1/hello_world_4.png)

#### Version 1 — `hw1V1.cpp`

Create a file named **`hw1V1.cpp`** and type:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, world!" << std::endl;
}
```

Save (**Command+S** on Mac or **Ctrl+S** on Windows), then compile and run this file. You can review the debugger sections above if you need a refresher on compiling from the terminal. When it runs correctly, leave this file as-is and continue.

#### Version 2 — `hw1V2.cpp`

Create a **new** file named **`hw1V2.cpp`** (do not overwrite your Version 1 file). Explore the program a little more: add `using namespace std;` so you can remove the `std::` prefixes. Your code should look like this:

```cpp
#include <iostream>

using namespace std;

int main() {
    cout << "Hello, world!" << endl;
}
```

Save, compile, and run **`hw1V2.cpp`**.

#### Version 3 — `hw1V3.cpp`

Create a **new** file named **`hw1V3.cpp`**. Change the program so it prints `Hello world! Hello CSCI 1300`. The text inside the quotation marks is printed exactly as written (it is case sensitive). Compile and run again.

```cpp
#include <iostream>

using namespace std;

int main() {
    cout << "Hello world! Hello CSCI 1300" << endl;
}
```

<<<HW_ACTION>>>

When you have finished all three **Hello World** programs, **[submit on Gradescope](https://www.gradescope.com/courses/1314704)**. Open the **Homework 1 - Part A** item and upload **these three source files** (names must match **exactly**; no screenshots):

- **`hw1V1.cpp`** — Version 1 (`std::cout`, no `using namespace` yet)
- **`hw1V2.cpp`** — Version 2 (`using namespace std;` and `cout`)
- **`hw1V3.cpp`** — Version 3 (prints `Hello world! Hello CSCI 1300`)


<<<END_HW_ACTION>>>

---
## Part B
---

# How to Write This Program

For this assignment, you will write one complete C++ program in a file named:

```text
hw1b.cpp
```

Every C++ program needs a `main()` function. The `main()` function is where the computer starts running your program.

Your file should begin like this. Please copy and paste the following into your `hw1b.cpp` file.

```cpp
#include <iostream>
#include <string>

using namespace std;

int main() {

    // Write your homework code here

    return 0;
}
```

For this homework, write all of your code inside the curly braces `{ }` of `main()`.

You are **not** expected to write your own functions yet. We will learn more about functions later in the course.


# Problem 1: Arriving at the Farm

The bus finally rolls into Pelican Town, and your farmer steps off carrying a backpack, a few tools, and the deed to an old farm.

Before the day can begin, create variables that describe your farmer and their new life in Stardew Valley.

Make it yours: pick any:

- Farmer name
- Farm name
- Favorite crop
- Whether the farmer has a pet (`true` or `false`)

Every new farmer starts with the same basic resources:

- Starting Gold: 500
- Starting Energy: 100

Print this exact section header:

```text
--- Farmer Profile ---
```

Your output for this section must include these exact labels:

```text
Farmer Name:
Farm Name:
Starting Gold:
Starting Energy:
Favorite Crop:
Has Pet:
```

Example output:

```text
--- Farmer Profile ---
Farmer Name: Juniper
Farm Name: Moonlight Farm
Starting Gold: 500
Starting Energy: 100
Favorite Crop: Parsnip
Has Pet: 1
```

<<<HINT>>>

- Use `string` for names and crop names.
- Use `int` for gold and energy.
- Use `bool` for true/false values.
- When printed with `cout`, `true` may appear as `1` and `false` may appear as `0`.

<<<END_HINT>>>

---

# Problem 2: Visiting Pierre's General Store

With 500 gold in hand, your farmer heads into town and stops at Pierre’s General Store to buy seeds for the first planting season.

Today, parsnip seeds cost 20 gold each.

Calculate:

- Seeds Bought = Starting Gold / Seed Cost
- Gold Left = Starting Gold % Seed Cost

Print this exact section header:

```text
--- Buying Seeds ---
```

Your output for this section must include these exact labels:

```text
Starting Gold:
Seed Cost:
Seeds Bought:
Gold Left:
```

Expected calculated values:

```text
Seeds Bought: 25
Gold Left: 0
```

Example output:

```text
--- Buying Seeds ---
Starting Gold: 500
Seed Cost: 20
Seeds Bought: 25
Gold Left: 0
```

<<<HINT>>>

- Use `/` for division.
- Use `%` for remainder.
- Store the results in variables before printing them.

<<<END_HINT>>>

---

# Problem 3: Planning the Harvest

Back at the farm, your farmer starts thinking ahead. If every seed grows successfully, how much money could the harvest make?

Use these exact values:

- Crops Planted: 25
- Cost Per Seed: 20
- Sell Price Per Crop: 35

Calculate:

- Total Seed Cost = Crops Planted * Cost Per Seed
- Total Revenue = Crops Planted * Sell Price Per Crop
- Total Profit = Total Revenue - Total Seed Cost

Print this exact section header:

```text
--- Crop Profit Calculator ---
```

Your output for this section must include these exact labels:

```text
Crops Planted:
Cost Per Seed:
Sell Price Per Crop:
Total Seed Cost:
Total Revenue:
Total Profit:
```

Expected calculated values:

```text
Total Seed Cost: 500
Total Revenue: 875
Total Profit: 375
```

Example output:

```text
--- Crop Profit Calculator ---
Crops Planted: 25
Cost Per Seed: 20
Sell Price Per Crop: 35
Total Seed Cost: 500
Total Revenue: 875
Total Profit: 375
```

<<<HINT>>>

- Multiplication uses `*`.
- Store each calculation in a separate variable.
- Print both the original values and the calculated values.

<<<END_HINT>>>

---

# Problem 4: Spending Energy on Chores

The rest of the afternoon is spent working around the farm. Your farmer waters crops, chops trees, and breaks rocks to clear space for future planting.

Use these exact values:

- Starting Energy: 100
- Crops Watered: 10
- Energy Per Crop: 2
- Trees Chopped: 3
- Energy Per Tree: 10
- Rocks Broken: 5
- Energy Per Rock: 3

Calculate:

- Energy Used Watering = Crops Watered * Energy Per Crop
- Energy Used Chopping Trees = Trees Chopped * Energy Per Tree
- Energy Used Breaking Rocks = Rocks Broken * Energy Per Rock
- Total Energy Used = Energy Used Watering + Energy Used Chopping Trees + Energy Used Breaking Rocks
- Remaining Energy = Starting Energy - Total Energy Used

Print this exact section header:

```text
--- Energy Tracker ---
```

Your output for this section must include these exact labels:

```text
Starting Energy:
Energy Used Watering:
Energy Used Chopping Trees:
Energy Used Breaking Rocks:
Total Energy Used:
Remaining Energy:
```

Expected calculated values:

```text
Energy Used Watering: 20
Energy Used Chopping Trees: 30
Energy Used Breaking Rocks: 15
Total Energy Used: 65
Remaining Energy: 35
```

Example output:

```text
--- Energy Tracker ---
Starting Energy: 100
Energy Used Watering: 20
Energy Used Chopping Trees: 30
Energy Used Breaking Rocks: 15
Total Energy Used: 65
Remaining Energy: 35
```

<<<HINT>>>

- Calculate each activity separately first.
- Then add the energy values together.
- Remaining energy should be calculated last.

<<<END_HINT>>>

---

# Problem 5: Fixing Pierre's Receipt

Just before heading home for the night, Pierre realizes his receipt-printing program is broken. Since your farmer is learning C++, they offer to help fix it.

Copy this broken code into your file as comments:

```cpp
// int seedCost = 20
// int numberOfSeeds = 5;
// string cropName = Parsnip;
// totalCost = seedCost * numberOfSeeds;
// cout << "You bought " << numberOfSeeds << " " << cropName << " seeds." << endl;
// cout << "Total cost: " << totalCost << endl;
```

Then write a corrected version underneath it.

Use these exact values:

- Seed Cost: 20
- Number of Seeds: 5
- Crop Name: Parsnip

Calculate:

- Total Cost = Seed Cost * Number of Seeds

Print this exact section header:

```text
--- Debugging at Pierre's ---
```

Your output for this section must include these exact labels or phrases:

```text
You bought 5 Parsnip seeds.
Total Cost:
```

Expected calculated value:

```text
Total Cost: 100
```

You must also include at least two comments explaining what you fixed.

Example comments:

```cpp
// Fixed missing semicolon after seedCost.
// Fixed cropName by putting Parsnip inside quotation marks.
```

Example output:

```text
--- Debugging at Pierre's ---
You bought 5 Parsnip seeds.
Total Cost: 100
```

<<<HINT>>>

- Strings need quotation marks.
- Every variable should have a type before it is first used.
- Most C++ statements end with a semicolon.
- `totalCost` should be declared before it is used.

<<<END_HINT>>>

---

# Final Output Requirements

Your program must print all of the following section headers exactly:

```text
--- Farmer Profile ---
[Problem Answer Output]
--- Buying Seeds ---
[Problem Answer Output]
--- Crop Profit Calculator ---
[Problem Answer Output]
--- Energy Tracker ---
[Problem Answer Output]
--- Farm Market Sign ---
[Problem Answer Output]
--- Debugging at Pierre's ---
[Problem Answer Output]
```

and under 

Your program must compile and run without errors.

Submit one file:

```text
hw1b.cpp
```

<<<HW_ACTION>>>

Submit **Part B** on **[Gradescope](https://www.gradescope.com/courses/1314704)** by **Tuesday, June 2, 2026 at 11:59 PM Mountain Time**. Upload **one** file named **`hw1b.cpp`** 

<<<END_HW_ACTION>>>