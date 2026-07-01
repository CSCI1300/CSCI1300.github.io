/**
 * Course content and structure. edit here to update the public site without
 * touching panel components. (Dates, links, copy, staff, resources, etc.)
 */

/** Sidebar tabs: id matches panel switch in Csci1300Page.jsx */
export const TABS = [
  { id: "overview", label: "Overview", icon: "/csci1300-theme/backpack.svg", tip: "Overview" },
  { id: "assignments", label: "Assignments", icon: "/csci1300-theme/tool.svg", tip: "Assignments" },
  { id: "topics", label: "Topics", icon: "/csci1300-theme/map.svg", tip: "Topics" },
  { id: "lectures", label: "Lectures", icon: "/csci1300-theme/bag.svg", tip: "Lectures" },
  { id: "resources", label: "Resources", icon: "/csci1300-theme/heart.svg", tip: "Resources" },
  { id: "meet", label: "Meet the class", icon: "/csci1300-theme/meet.svg", tip: "Meet the class" },
  { id: "policies", label: "Policies", icon: "/csci1300-theme/console.svg", tip: "Policies" },
  { id: "staff", label: "Staff", icon: "/csci1300-theme/avatar.svg", tip: "Staff" },
];

export const SCHEDULE_DAY_TOKENS = {
  lecture: ["M", "T", "Th", "F"],
  recitation: ["W"],
};

/** Rows for “Sections at a glance” */
export const SECTIONS_AT_GLANCE = [
  {
    section: "300",
    instructor: "Zachary Kaufman",
    gradTa: "Ishneet Chadha",
    lecture: { time: "11:10 am - 12:30 pm", place: "ECES 112" },
    recitation: { time: "11:10 am - 12:30 pm", place: "ECES 112" },
  },
  {
    section: "830",
    instructor: "Amanda Hernandez Sandate",
    gradTa: "Nolan Brady",
    lecture: {
      time: "2:50 - 4:10 pm",
      place: {
        label: "Zoom",
        url: "https://cuboulder.zoom.us/s/4365597488?omn=4365597488",
      },
    },
    recitation: {
      time: "2:50 - 4:10 pm",
      place: {
        label: "Zoom",
        url: "https://cuboulder.zoom.us/j/2980052323",
      },
    },
  },
];

export const OVERVIEW = {
  title: "CSCI 1300: Starting Computing",
  panelSub: "University of Colorado Boulder · Summer 2026",
  ledeStrong: "Sections 300 and 830",
  ledeLine1Before: "Shared page for",
  ledeLine2: "Lecture and recitation times depend on your section.",
  courseDescriptionParts: [
    "Techniques for writing programs in a higher-level language for problems across many domains. No prior computing or programming background required. Both sections use ",
    { strong: "C++" },
    " and cover variables, control flow, functions, arrays, I/O, classes, and related topics — see the Topics tab.",
  ],
  officeHoursCalendarEmbedSrc:
    "https://calendar.google.com/calendar/embed?height=800&mode=WEEK&showTitle=0&showNav=1&showDate=1&showPrint=0&src=c_a883dab1a6cc8cc23bb2e399caf310213ada244c687b7a0e8fc1e279a17fc3bc%40group.calendar.google.com&ctz=America%2FDenver",
  officeHoursCalendarLink:
    "https://calendar.google.com/calendar/u/0?cid=Y19hODgzZGFiMWE2Y2M4Y2MyM2JiMmUzOTljYWYzMTAyMTNhZGEyNDRjNjg3YjdhMGU4ZmMxZTI3OWExN2ZjM2JjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
};

/** MTThF lecture days, May 26–July 17, 2026 (inclusive). */
export const LECTURE_DATES_ISO = [
  "2026-05-26",
  "2026-05-28",
  "2026-05-29",
  "2026-06-01",
  "2026-06-02",
  "2026-06-04",
  "2026-06-05",
  "2026-06-08",
  "2026-06-09",
  "2026-06-11",
  "2026-06-12",
  "2026-06-15",
  "2026-06-16",
  "2026-06-18",
  "2026-06-19",
  "2026-06-22",
  "2026-06-23",
  "2026-06-25",
  "2026-06-26",
  "2026-06-29",
  "2026-06-30",
  "2026-07-02",
  "2026-07-03",
  "2026-07-06",
  "2026-07-07",
  "2026-07-09",
  "2026-07-10",
  "2026-07-13",
  "2026-07-14",
  "2026-07-16",
  "2026-07-17",
];

/** Lecture topic by date (optional; blank dates show —). */
export const LECTURE_TOPICS = {
  "2026-05-26": "Intro to CSCI 1300 + Syllabus",
  "2026-05-28": "Variables, Data Types, and Basic Operations",
  "2026-05-29": "Expressions, arithmetic/logical operators, debugging basics",
  "2026-06-01": "Strings: basics",
  "2026-06-02": "More strings,IO, if-else",
  "2026-06-04": "No class",
  "2026-06-05": "Switch statements and intro to loops",
  "2026-06-08": "Review assignment, nested loops",
  "2026-06-09": "Nested loops, loops with conditionals and strings",
  "2026-06-11": "Functions: definition, parameters, return, scope",
  "2026-06-12": "No class",
  "2026-06-15": "Arrays, arrays + functions, pass-by-value vs pass-by-reference",
  "2026-06-16": "Multi-dimensional arrays, references in functions",
  "2026-06-18": "Exam review",
  "2026-06-19": "No class",
  "2026-06-22": "Exam",
  "2026-07-03": "No class",
};

export const LECTURES = {
  panelSub: "M · T · Th · F · May 26 - July 17, 2026",
  materialsLabel: "Slides & lecture recordings",
  materialsHref:
    "https://o365coloradoedu-my.sharepoint.com/:f:/g/personal/zaka5614_colorado_edu/IgBAZnQPxbw3R7oPXPuGvzEaAW1LoQvrlUCgX9sidzg_4Xw",
};

/**
 * Homework numbers that show a clickable handout link on the Assignments tab. Others show plain
 * “Homework n” (not a link). Add numbers here to publish each handout.
 */
export const HOMEWORK_HANDOUT_LINK_ENABLED_NUMBERS = [1, 2, 3, 4, 5, 6];

/**
 * Soft preview gate (client-side only): if homework N is **not** in `HOMEWORK_HANDOUT_LINK_ENABLED_NUMBERS`
 * but this map has a non-empty string for N, then `/hw/N?access=<that-string>` loads the handout.
 * Set `VITE_HW{N}_HANDOUT_ACCESS` in `.env` / CI before `npm run build` (value is baked into the bundle).
 * Leave empty (`""`) to disable URL preview for that homework entirely.
 */
export const HOMEWORK_HANDOUT_PREVIEW_ACCESS = {
  1: import.meta.env.VITE_HW1_HANDOUT_ACCESS ?? "",
  2: import.meta.env.VITE_HW2_HANDOUT_ACCESS ?? "",
  3: import.meta.env.VITE_HW3_HANDOUT_ACCESS ?? "",
  4: import.meta.env.VITE_HW4_HANDOUT_ACCESS ?? "",
  5: import.meta.env.VITE_HW5_HANDOUT_ACCESS ?? "",
};

/**
 * Final project handout at `public/hw/project/final-proj.md`. When false, use
 * `/project?access=<VITE_PROJECT_HANDOUT_ACCESS>` for staff preview only.
 */
export const PROJECT_HANDOUT_LINK_ENABLED = true;
export const PROJECT_HANDOUT_PREVIEW_ACCESS = import.meta.env.VITE_PROJECT_HANDOUT_ACCESS ?? "";

/**
 * Checkpoint numbers that show a clickable handout link on the Assignments tab. Others show plain
 * “Checkpoint n” (not a link). Add numbers here to publish each checkpoint handout.
 */
export const CHECKPOINT_HANDOUT_LINK_ENABLED_NUMBERS = [1];

/** Each homework N in this list should have a handout file `public/hw/hw{N}/hw{N}.md` (same N as in "Homework N (Part …)"). */
export const ASSIGNMENT_SCHEDULE = [
  { name: "Homework 1 (Part A)", dueIso: "2026-06-02", note: "Due Tuesday at 11:59PM MT on Gradescope." },
  { name: "Homework 1 (Part B)", dueIso: "2026-06-02", note: "Due Tuesday at 11:59PM MT on Gradescope." },
  { name: "Homework 2 (Part A)", dueIso: "2026-06-03", note: "Due in Wednesday recitation." },
  { name: "Homework 2 (Part B)", dueIso: "2026-06-09", note: "Due Tuesday at 11:59PM MT on Gradescope." },
  { name: "Homework 3 (Part A)", dueIso: "2026-06-10", note: "Due in Wednesday recitation." },
  { name: "Homework 3 (Part B)", dueIso: "2026-06-16", note: "Due Tuesday at 11:59PM MT on Gradescope." },
  { name: "Homework 4 (Part A)", dueIso: "2026-06-17", note: "Due in Wednesday recitation." },
  { name: "Homework 4 (Part B)", dueIso: "2026-06-23", note: "Due Tuesday at 11:59PM MT on Gradescope." },
  { name: "Homework 5 (Part A)", dueIso: "2026-06-24", note: "Due in Wednesday recitation." },
  { name: "Homework 5 (Part B)", dueIso: "2026-06-30", note: "Due Tuesday at 11:59PM MT on Gradescope." },
  { name: "Checkpoint 1", dueIso: "2026-07-01" },
  { name: "Homework 6 (Part A)", dueIso: "2026-07-01", note: "Due in Wednesday recitation." },
  { name: "Homework 6 (Part B)", dueIso: "2026-07-07", note: "Due Tuesday at 11:59PM MT on Gradescope." },
  { name: "Checkpoint 2", dueIso: "2026-07-08" },
  { name: "Homework 7 (Part A)", dueIso: "2026-07-08", note: "Due in Wednesday recitation." },
  { name: "Checkpoint 3", dueIso: "2026-07-12" },
  { name: "Homework 7 (Part B)", dueIso: "2026-07-14", note: "Due Tuesday at 11:59PM MT on Gradescope." },
  { name: "Final project", dueIso: "2026-07-17", note: "Includes interview sign-up after submission." },
];

export const ASSIGNMENTS = {
  panelSub: "Sections 300 & 830",
  /** Opening paragraph above the structured blocks in “Deadlines & structure”. */
  deadlinesIntroLine: [
    "Each homework has two parts: Part A, which you complete in recitation, and Part B, which you submit through Gradescope. ",
    "For most assignments, ",
    { strong: "Part B is due on Tuesday at 11:59PM Mountain Time" },
    ".",
  ],
  /**
   * Scannable items for “Deadlines & structure” (title + body with optional { strong }).
   * Use { strong: "..." } 
   */
  deadlinesStructure: [
    {
      id: "part-a",
      title: "Part A",
      parts: [
        "Part A is completed during your Wednesday recitation, using the same meeting time and format (in the classroom or remote) as listed for your section on the Overview tab. ",
        "Course staff will review your work with you in person during that recitation. ",
        "If you have questions about what to bring or how Part A will be checked, please ask your TA or instructor in advance.",
      ],
    },
    {
      id: "part-b",
      title: "Part B",
      parts: [
        "Please submit Part B through Gradescope. ",
        "Unless the assignment schedule below lists another due date or marks the assignment as TBA, the deadline is ",
        { strong: "Tuesday at 11:59PM Mountain Time" },
        " for that week. ",
        "Most exercises are graded with an autograder. Some assignments may also include a short follow-up with course staff.",
      ],
    },
    {
      id: "project-dates",
      title: "Project and other important dates",
      parts: [
        "Final project checkpoints and the final project due date appear in the assignment schedule when those dates are set. ",
        "Project checkpoints are listed in the assignment schedule so you can track progress through the term. ",
        "If we need to change any deadline, we will announce it clearly in lecture and update this page so that all sections receive the same information.",
      ],
    },
  ],
  scheduleIntroParts: [
    "Same expectations for ",
    { strong: "Sections 300 and 830" },
    ". If a due date shifts, this table is the source of truth.",
  ],
};

export const GRADE_BREAKDOWN = [
  {
    component: "Homeworks",
    weight: "45%",
    notes:
      "Part A is completed in recitation. Part B is submitted on Gradescope.",
  },
  {
    component: "Project + exams",
    weight: "50%",
    notes:
      "This category includes your final project, project checkpoints, and any major assessments announced for the term.",
  },
  {
    component: "Attendance",
    weight: "5%",
    notes:
      "Attendance is required and makes up 5% of your final grade. Occasional in-class quizzes can only improve your overall course grade.",
  },
];

export const LETTER_CUTOFFS = [
  { letter: "A", range: "100-93" },
  { letter: "A-", range: "92-90" },
  { letter: "B+", range: "89-88" },
  { letter: "B", range: "87-83" },
  { letter: "B-", range: "82-80" },
  { letter: "C+", range: "79-78" },
  { letter: "C", range: "77-73" },
  { letter: "C-", range: "72-70" },
  { letter: "D", range: "69-60" },
  { letter: "F", range: "<60" },
];

/** String | { strong: string } segments for inline emphasis */
export const LATE_POLICY_SEGMENTS = [
  "Homework assignments may be submitted up to ",
  { strong: "2 days" },
  " late for ",
  { strong: "80%" },
  " of the on-time score. After that, late work needs prior instructor approval.",
];

export const GRADING_INTERVIEWS_PLACEHOLDER = "[TBA]";

export const EXTRA_CREDIT_NOTE = "Extra credit may be offered during the term.";

export const TOPICS = {
  panelSub: "Shared curriculum",
  workloadParts: [
    "This is a 4-credit-hour course. Students are expected to attend lectures and recitations, stay current with course materials, complete assignments on time, and participate in other course-related activities.",
  ],
  syllabusTopics: [
    "Computer architecture and environment",
    "Variables, data types, operators",
    "Strings: indexing, iteration, comparing",
    "Control: if/else, switch, while, for",
    "Functions",
    "Arrays",
    "I/O streams and file I/O",
    "Classes and objects; methods",
    "Inheritance",
    "Vectors",
    "Recursion",
    "References",
  ],
  toolsParts: [
    { strong: "No required textbook." },
    " ",
    { strong: "VS Code" },
    " is the required IDE for this course. To keep support and grading consistent across sections, no other IDEs are allowed.",
  ],
};

export const RESOURCES = {
  panelSub: "Links and campus support",
};

/**
 * Resource groups. entries use:
 * - { kind: "link", href, label, desc }
 * - { kind: "strong", label, desc } (no href)
 * - { kind: "linkRow", links: [{ href, label }], joiner: " · " }
 */
export const RESOURCE_GROUPS = [
  {
    title: "Course",
    wide: false,
    entries: [
      {
        kind: "link",
        href: "https://canvas.colorado.edu/",
        label: "Canvas",
        desc: "Announcements grades",
      },
      {
        kind: "link",
        href: "https://gradescope.com/",
        label: "Gradescope",
        desc: "Submit assignments",
      },
      {
        kind: "link",
        href: "https://discord.gg/PdrDeVHbRY",
        label: "Discord",
        desc: "Q&A and course discussion",
      },
      {
        kind: "link",
        href: "/Summer26_1300_Syllabus.pdf",
        label: "Syllabus PDF",
        desc: "Summer 2026",
      },
    ],
  },
  {
    title: "Software & habits",
    wide: false,
    entries: [
      {
        kind: "link",
        href: "https://code.visualstudio.com/",
        label: "VS Code",
        desc: "Primary IDE",
      },
      {
        kind: "strong",
        label: "Backups",
        desc: "Drive, Dropbox, GitHub, or USB",
      },
    ],
  },
  {
    title: "Campus",
    wide: true,
    entries: [
      {
        kind: "link",
        href: "https://www.colorado.edu/counseling/",
        label: "CAPS",
        desc: "(303) 492-2277",
      },
      {
        kind: "link",
        href: "https://www.colorado.edu/disabilityservices/",
        label: "Disability Services",
        desc: "303-492-8671 · dsinfo@colorado.edu",
      },
      {
        kind: "linkRow",
        joiner: " · ",
        links: [
          {
            href: "https://www.colorado.edu/sccr/students/honor-code-and-student-code-conduct",
            label: "Honor Code",
          },
          { href: "https://www.colorado.edu/oiec/", label: "OIEC" },
          {
            href: "https://www.colorado.edu/dontignoreit/",
            label: "Don't Ignore It",
          },
        ],
      },
    ],
  },
];

export const POLICIES = {
  panelSub: "Summary — full syllabus PDF for detail",
  syllabusPdfHref: "/Summer26_1300_Syllabus.pdf",
  syllabusPdfLabel: "CSCI 1300 syllabus (PDF)",
  sections: [
    {
      title: "Collaboration",
      body:
        "Talk through ideas and debugging in words or diagrams. Write your own code. Do not share or copy source, hunt for solutions online, or use undisclosed AI / paywalled answer sites. Cite permitted help in comments. Quizzes and exams are individual unless marked otherwise.",
    },
    {
      title: "Integrity & AI",
      parts: [
        "Work may be checked automatically. Undisclosed outside code or generative AI can violate the Honor Code. Ask your section instructor ",
        { em: "before" },
        " you submit if you are unsure.",
      ],
    },
    {
      title: "Netiquette",
      body:
        'On Discord and in live sessions: write clearly, avoid all-caps "shouting," stay on topic, and treat everyone with respect.',
    },
    {
      title: "Names & pronouns",
      body: "Update preferred name and pronouns in the student portal; rosters follow that.",
    },
  ],
};

export const INSTRUCTORS = [
  {
    id: "zach",
    role: "Instructor",
    section: "Section 300",
    name: "Zachary Kaufman",
    email: "Zachary.Kaufman@colorado.edu",
    scheduleLine:
      "Lecture: Mon · Tue · Thu · Fri · 11:10 am-12:30 pm · ECES 112. Recitation: Wed · 11:10 am-12:30 pm · ECES 112. Office hours: Monday · 9:30-11:00 AM | Tuesday · 10:00-11:00 AM | Friday · 9:30-11:00 AM. Office hours location: CSEL (ECCS 114A).",
  },
  {
    id: "amanda",
    role: "Instructor",
    section: "Section 830",
    name: "Amanda Hernandez Sandate",
    email: "Amanda.HernandezSandate@colorado.edu",
    scheduleLine:
      "Lecture: Mon · Tue · Thu · Fri · 2:50-4:10 pm · Meets remotely. Recitation: Wed · 2:50-4:10 pm · Meets remotely. Office hours: Tuesday · 5:00-7:00 PM MT (https://cuboulder.zoom.us/s/4365597488) | Wednesday · 5:00-7:00 PM MT (https://cuboulder.zoom.us/s/4365597488).",
  },
];

export const GRADUATE_TAS = [
  {
    id: "ishneet",
    role: "Graduate TA",
    section: "Section 300",
    name: "Ishneet Chadha",
    email: "Ishneet.Chadha@colorado.edu",
    scheduleLine:
      "Recitation with Section 300 (Wed · 11:10 am-12:30 pm · ECES 112). Office hours: Monday · 11:00 AM-12:00 PM MT (https://cuboulder.zoom.us/j/2388648622) | Tuesday · 11:15 AM-12:15 PM MT (https://cuboulder.zoom.us/j/2388648622) | Friday · 2:15-4:15 PM MT (https://cuboulder.zoom.us/j/2388648622).",
  },
  {
    id: "nolan",
    role: "Graduate TA",
    section: "Section 830",
    name: "Nolan Brady",
    email: "Nolan.Brady@colorado.edu",
    scheduleLine:
      "Recitation: Wed · 2:50-4:10 pm · Remote. Office hours: Tuesday · 12:00-2:00 PM MT (https://cuboulder.zoom.us/j/2980052323) | Thursday · 12:00-2:00 PM MT (https://cuboulder.zoom.us/j/2980052323).",
  },
];

export const UNDERGRADUATE_COURSE_ASSISTANTS = [
  {
    id: "sashi",
    role: "Undergraduate Course Assistant",
    section: "Sections 300 & 830",
    name: "Sashi Wolf",
    email: "Sashi.Wolf@colorado.edu",
    scheduleLine: "Office hours: [TBA]",
  },
];

export const STAFF = {
  panelSub: "Summer 2026",
  instructorsHeading: "Instructors",
  tasHeading: "Graduate teaching assistants",
  ucaHeading: "Undergraduate course assistants",
};
