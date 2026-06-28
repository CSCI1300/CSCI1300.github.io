import GithubSlugger from "github-slugger";
import { splitHw1OsSections } from "./splitHw1OsSections.js";

/**
 * Homework 1 — curated “On this page” (Part B uses `#` headings; ids match `rehype-slug`).
 */
const HW1_MAIN_TOC_TREE = [
  {
    id: "part-a",
    title: "Part A",
    level: 2,
    children: [
      { id: "vs-code-setup", title: "VS Code setup", level: 3, children: [] },
      { id: "debugger-installation", title: "Debugger installation", level: 3, children: [] },
      { id: "hello-world", title: "Hello World", level: 3, children: [] },
    ],
  },
  {
    id: "part-b",
    title: "Part B",
    level: 2,
    children: [
      { id: "how-to-write-this-program", title: "How to Write This Program", level: 3, children: [] },
      { id: "problem-1-arriving-at-the-farm", title: "Problem 1: Arriving at the Farm", level: 3, children: [] },
      {
        id: "problem-2-visiting-pierres-general-store",
        title: "Problem 2: Visiting Pierre's General Store",
        level: 3,
        children: [],
      },
      { id: "problem-3-planning-the-harvest", title: "Problem 3: Planning the Harvest", level: 3, children: [] },
      { id: "problem-4-spending-energy-on-chores", title: "Problem 4: Spending Energy on Chores", level: 3, children: [] },
      { id: "problem-5-fixing-pierres-receipt", title: "Problem 5: Fixing Pierre's Receipt", level: 3, children: [] },
      { id: "final-output-requirements", title: "Final Output Requirements", level: 3, children: [] },
    ],
  },
];

/**
 * Homework 2 — curated “On this page” (Part B `#` problems + Part A `###` exercises).
 */
const HW2_MAIN_TOC_TREE = [
  {
    id: "part-a",
    title: "Part A",
    level: 2,
    children: [
      { id: "string-basics", title: "String Basics", level: 3, children: [] },
      { id: "exercise-1--hw2a1cpp", title: "Exercise 1 — `hw2A1.cpp`", level: 3, children: [] },
      { id: "exercise-2--hw2a2cpp", title: "Exercise 2 — `hw2A2.cpp`", level: 3, children: [] },
      { id: "exercise-3--hw2a3cpp", title: "Exercise 3 — `hw2A3.cpp`", level: 3, children: [] },
    ],
  },
  {
    id: "part-b",
    title: "Part B",
    level: 2,
    children: [
      { id: "how-to-write-this-program", title: "How to Write This Program", level: 3, children: [] },
      { id: "problem-1-the-farm-sign", title: "Problem 1: The Farm Sign", level: 3, children: [] },
      { id: "problem-2-daily-energy-planner", title: "Problem 2: Daily Energy Planner", level: 3, children: [] },
      { id: "problem-3-the-traveling-merchant", title: "Problem 3: The Traveling Merchant", level: 3, children: [] },
      { id: "problem-4-season-crop-report", title: "Problem 4: Season Crop Report", level: 3, children: [] },
      {
        id: "problem-5-fixing-willys-weather-check",
        title: "Problem 5: Fixing Willy's Weather Check",
        level: 3,
        children: [],
      },
      { id: "final-output-requirements", title: "Final Output Requirements", level: 3, children: [] },
    ],
  },
];

/**
 * Homework 3 — curated “On this page” (Part B `#` problems + Part A `###` exercises only).
 */
const HW3_MAIN_TOC_TREE = [
  {
    id: "part-a",
    title: "Part A",
    level: 2,
    children: [
      { id: "exercise-1--hw3a1cpp", title: "Exercise 1 — `hw3A1.cpp`", level: 3, children: [] },
      { id: "exercise-2--hw3a2cpp", title: "Exercise 2 — `hw3A2.cpp`", level: 3, children: [] },
      { id: "exercise-3--hw3a3cpp", title: "Exercise 3 — `hw3A3.cpp`", level: 3, children: [] },
      { id: "exercise-4--hw3a4cpp", title: "Exercise 4 — `hw3A4.cpp`", level: 3, children: [] },
      { id: "exercise-5--hw3a5cpp", title: "Exercise 5 — `hw3A5.cpp`", level: 3, children: [] },
    ],
  },
  {
    id: "part-b",
    title: "Part B",
    level: 2,
    children: [
      { id: "problem-1-weekly-sales-review", title: "Problem 1: Weekly Sales Review", level: 3, children: [] },
      {
        id: "problem-2-the-quarterly-report-header",
        title: "Problem 2: The Quarterly Report Header",
        level: 3,
        children: [],
      },
      { id: "problem-3-annual-sales-target", title: "Problem 3: Annual Sales Target", level: 3, children: [] },
      { id: "problem-4-the-profit-calculator", title: "Problem 4: The Profit Calculator", level: 3, children: [] },
      {
        id: "problem-5-draining-the-opposition-fund",
        title: "Problem 5: Draining the Opposition Fund",
        level: 3,
        children: [],
      },
      { id: "problem-6-targeted-ad-campaign", title: "Problem 6: Targeted Ad Campaign", level: 3, children: [] },
      {
        id: "problem-7-debugging-morriss-commission-calculator",
        title: "Problem 7: Debugging Morris's Commission Calculator",
        level: 3,
        children: [],
      },
      { id: "final-output-requirements", title: "Final Output Requirements", level: 3, children: [] },
    ],
  },
];

/**
 * Homework 4 — curated “On this page” (Part B `#` problems + Part A `###` exercises only).
 */
const HW4_MAIN_TOC_TREE = [
  {
    id: "part-a",
    title: "Part A",
    level: 2,
    children: [
      { id: "exercise-1--hw4a1cpp", title: "Exercise 1 — `hw4A1.cpp`", level: 3, children: [] },
      { id: "exercise-2--hw4a2cpp", title: "Exercise 2 — `hw4A2.cpp`", level: 3, children: [] },
      { id: "exercise-3--hw4a3cpp", title: "Exercise 3 — `hw4A3.cpp`", level: 3, children: [] },
      { id: "exercise-4--hw4a4cpp", title: "Exercise 4 — `hw4A4.cpp`", level: 3, children: [] },
    ],
  },
  {
    id: "part-b",
    title: "Part B",
    level: 2,
    children: [
      { id: "how-to-write-this-program", title: "How to Write This Program", level: 3, children: [] },
      { id: "problem-1-weekly-foot-traffic", title: "Problem 1: Weekly Foot Traffic", level: 3, children: [] },
      { id: "problem-2-slogan-analysis", title: "Problem 2: Slogan Analysis", level: 3, children: [] },
      { id: "problem-3-inventory-audit", title: "Problem 3: Inventory Audit", level: 3, children: [] },
      { id: "problem-4-price-analysis", title: "Problem 4: Price Analysis", level: 3, children: [] },
      { id: "problem-5-restock-queue", title: "Problem 5: Restock Queue", level: 3, children: [] },
      { id: "problem-6-profit-trend", title: "Problem 6: Profit Trend", level: 3, children: [] },
      {
        id: "problem-7-debugging-morriss-stock-report",
        title: "Problem 7: Debugging Morris's Stock Report",
        level: 3,
        children: [],
      },
      { id: "final-output-requirements", title: "Final Output Requirements", level: 3, children: [] },
    ],
  },
];

/**
 * Homework 5 — curated “On this page” (Part B `#` problems + Part A setup steps).
 */
const HW5_MAIN_TOC_TREE = [
  {
    id: "part-a",
    title: "Part A",
    level: 2,
    children: [
      { id: "step-1--create-a-github-account", title: "Step 1 — Create a GitHub account", level: 3, children: [] },
      {
        id: "step-2--install-git",
        title: "Step 2 — Install Git",
        level: 3,
        collapsible: true,
        children: [
          { id: "hw5-git-win", title: "Windows", level: 4, children: [] },
          { id: "hw5-git-mac", title: "Mac", level: 4, children: [] },
        ],
      },
      { id: "step-3--tell-git-who-you-are", title: "Step 3 — Tell Git who you are", level: 3, children: [] },
      {
        id: "step-4--create-an-ssh-key-and-link-it-to-github",
        title: "Step 4 — Create an SSH key and link it to GitHub",
        level: 3,
        collapsible: true,
        children: [
          { id: "hw5-ssh-win", title: "Windows", level: 4, children: [] },
          { id: "hw5-ssh-mac", title: "Mac", level: 4, children: [] },
        ],
      },
      { id: "step-5--create-a-repository-on-github", title: "Step 5 — Create a repository on GitHub", level: 3, children: [] },
      {
        id: "step-6--clone-your-repository-to-your-computer",
        title: "Step 6 — Clone your repository to your computer",
        level: 3,
        children: [],
      },
      {
        id: "step-7--the-two-c-exercises",
        title: "Step 7 — The two C++ exercises",
        level: 3,
        children: [
          { id: "exercise-1--hw5a1cpp", title: "Exercise 1 — `hw5A1.cpp`", level: 4, children: [] },
          { id: "exercise-2--hw5a2cpp", title: "Exercise 2 — `hw5A2.cpp`", level: 4, children: [] },
        ],
      },
      { id: "step-8--commit-and-push-your-work", title: "Step 8 — Commit and push your work", level: 3, children: [] },
    ],
  },
  {
    id: "part-b",
    title: "Part B",
    level: 2,
    children: [
      { id: "how-to-write-this-program", title: "How to Write This Program", level: 3, children: [] },
      { id: "new-this-week-vectors", title: "New this week: Vectors", level: 3, children: [] },
      { id: "problem-1-daily-sales-log", title: "Problem 1: Daily Sales Log", level: 3, children: [] },
      { id: "problem-2-best-sales-day", title: "Problem 2: Best Sales Day", level: 3, children: [] },
      { id: "problem-3-regional-sales", title: "Problem 3: Regional Sales", level: 3, children: [] },
      { id: "problem-4-store-announcement", title: "Problem 4: Store Announcement", level: 3, children: [] },
      { id: "problem-5-joja-terminal", title: "Problem 5: Joja Terminal", level: 3, children: [] },
      { id: "problem-6-high-performers", title: "Problem 6: High Performers", level: 3, children: [] },
      {
        id: "problem-7-debugging-morriss-stock-tally",
        title: "Problem 7: Debugging Morris's Stock Tally",
        level: 3,
        children: [],
      },
      { id: "final-output-requirements", title: "Final Output Requirements", level: 3, children: [] },
    ],
  },
];

const HEADING_H2_H3 = /^\s*(#{2,3})\s+(.+)$/;
const HEADING_H1_H2 = /^\s*(#{1,2})\s+(.+)$/;

/** `#` and `##` only (outside fenced code), for final project handout sidebar. */
function extractH1H2(markdown) {
  if (!markdown || typeof markdown !== "string") return [];
  const slugger = new GithubSlugger();
  const lines = markdown.split(/\r?\n/);
  const items = [];
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = HEADING_H1_H2.exec(line);
    if (!m) continue;

    const level = m[1].length;
    const title = m[2].trim().replace(/\s+#+\s*$/, "").trim();
    if (!title) continue;

    const id = slugger.slug(title);
    items.push({ level, title, id });
  }

  return items;
}

/** `##` and `###` only (outside fenced code), for nested TOC on other homework handouts. */
function extractH2H3(markdown) {
  if (!markdown || typeof markdown !== "string") return [];
  const slugger = new GithubSlugger();
  const lines = markdown.split(/\r?\n/);
  const items = [];
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = HEADING_H2_H3.exec(line);
    if (!m) continue;

    const level = m[1].length;
    const title = m[2].trim().replace(/\s+#+\s*$/, "").trim();
    if (!title) continue;

    const id = slugger.slug(title);
    items.push({ level, title, id });
  }

  return items;
}

/**
 * @param {{ level: number, title: string, id: string }[]} flat
 * @returns {{ id: string, title: string, level: number, children: object[] }[]}
 */
export function nestHeadingTocTree(flat) {
  const root = [];
  const stack = [{ level: 0, children: root }];

  for (const item of flat) {
    while (stack.length > 1 && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }
    const parent = stack[stack.length - 1];
    const node = { id: item.id, title: item.title, level: item.level, children: [] };
    parent.children.push(node);
    stack.push(node);
  }

  return root;
}

/**
 * @param {string} markdown
 * @param {number | null} hwNum
 * @returns {{ id: string, title: string, level: number, children: object[] }[]}
 */
export function extractHomeworkHeadingToc(markdown, hwNum) {
  if (!markdown || typeof markdown !== "string") return [];

  if (hwNum === 1 && splitHw1OsSections(markdown)) {
    return HW1_MAIN_TOC_TREE;
  }

  if (hwNum === 2) {
    return HW2_MAIN_TOC_TREE;
  }

  if (hwNum === 3) {
    return HW3_MAIN_TOC_TREE;
  }

  if (hwNum === 4) {
    return HW4_MAIN_TOC_TREE;
  }

  if (hwNum === 5) {
    return HW5_MAIN_TOC_TREE;
  }

  return nestHeadingTocTree(extractH2H3(markdown));
}

/**
 * Final project handout — nest `#` sections with their `##` subsections in the sidebar.
 * @param {string} markdown
 * @returns {{ id: string, title: string, level: number, children: object[] }[]}
 */
export function extractProjectHeadingToc(markdown) {
  if (!markdown || typeof markdown !== "string") return [];
  return nestHeadingTocTree(extractH1H2(markdown));
}
