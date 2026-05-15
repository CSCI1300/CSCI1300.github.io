import GithubSlugger from "github-slugger";
import { splitHw1OsSections } from "./splitHw1OsSections.js";

/**
 * Homework 1 — curated “On this page” with hierarchy under Part A and Part B.
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
      { id: "problem-5-opening-the-farm-stand", title: "Problem 5: Opening the Farm Stand", level: 3, children: [] },
      { id: "problem-6-fixing-pierres-receipt", title: "Problem 6: Fixing Pierre's Receipt", level: 3, children: [] },
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

  return nestHeadingTocTree(extractH2H3(markdown));
}
