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

const HEADING_H2_H3 = /^\s*(#{2,3})\s+(.+)$/;

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

  return nestHeadingTocTree(extractH2H3(markdown));
}
