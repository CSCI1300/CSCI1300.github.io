/**
 * Course content and structure — edit here to update the public site without
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

/** Rows for “Sections at a glance” (Section 300 first). */
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
    gradTa: "Cornelius Adejoro",
    lecture: { time: "2:50 - 4:10 pm", place: "Remote" },
    recitation: { time: "2:50 - 4:10 pm", place: "Remote" },
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
  officeHoursNote: "Office hours are [TBA].",
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

/** Shared lecture topic by date (both sections unless overridden in LECTURE_LINKS). */
export const LECTURE_TOPICS = {
  // e.g. "2026-05-26": "Introduction & logistics",
  "2026-06-22": "Midterm exam",
  "2026-06-19": "No class (Juneteenth)",
  "2026-07-03": "No class (Independence Day)",
};

/**
 * Per-day: { slides?, recording?, topic? } — topic overrides LECTURE_TOPICS[iso] for that track.
 * Keys must match LECTURES.tracks[].id (e.g. zach, amanda).
 */
export const LECTURE_LINKS = { zach: {}, amanda: {} };

export const LECTURES = {
  panelSub: "M · T · Th · F · May 26 – July 17, 2026 · slides & recordings by section",
  /** Section 300 first */
  tracks: [
    { id: "zach", label: "Section 300 — Zach" },
    { id: "amanda", label: "Section 830 — Amanda" },
  ],
};

/** Part B due dates (Fridays 11:59PM MT, unless noted). */
export const ASSIGNMENT_SCHEDULE = [
  { name: "Homework 0", dueIso: "2026-05-29" },
  { name: "Homework 1", dueIso: "2026-06-05" },
  { name: "Homework 2", dueIso: "2026-06-12" },
  { name: "Homework 3", dueIso: "2026-06-19" },
  { name: "Homework 4", dueIso: "2026-06-26" },
  { name: "Midterm exam", dueIso: "2026-06-22", note: "In class during the regular class period." },
  { name: "Final project checkpoint 1", dueIso: "2026-07-03" },
  { name: "Final project checkpoint 2", dueIso: "2026-07-10" },
  { name: "Final project", dueIso: "2026-07-17", note: "Includes interview sign-up after submission." },
];

export const ASSIGNMENTS = {
  panelSub: "Sections 300 & 830",
  /** Opening paragraph above the structured blocks in “Deadlines & structure”. */
  deadlinesIntroLine: [
    "Each homework has two parts: Part A, which you complete in recitation, and Part B, which you submit through Gradescope. ",
    "For most assignments, ",
    { strong: "Part B is due on Friday at 11:59PM Mountain Time" },
    ". If a different due date applies, or if the date is still to be announced, that will be shown in the assignment schedule table below so you can plan ahead.",
  ],
  /**
   * Scannable items for “Deadlines & structure” (title + body with optional { strong }).
   * Use { strong: "..." } sparingly — mainly for the standard Part B deadline.
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
        { strong: "Friday at 11:59PM Mountain Time" },
        " for that week. ",
        "Most exercises are graded with an autograder. Some assignments may also include a short follow-up with course staff.",
      ],
    },
    {
      id: "midterm-changes",
      title: "Midterm and other important dates",
      parts: [
        "The midterm exam and the final project due date appear in the assignment schedule when those dates are set. ",
        "The midterm is held during the normal class period unless we announce otherwise. Final project checkpoints are also listed in the assignment schedule. ",
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
      "This category includes your midterm exam and final project. Project checkpoints also count toward this category.",
  },
  {
    component: "Attendance",
    weight: "5%",
    notes:
      "Attendance is required and makes up 5% of your final grade. Occasional in-class quizzes can only improve your overall course grade.",
  },
];

export const LETTER_CUTOFFS = [
  { letter: "A", range: "93-100" },
  { letter: "A-", range: "90-92" },
  { letter: "B+", range: "88-89" },
  { letter: "B", range: "83-87" },
  { letter: "B-", range: "80-82" },
  { letter: "C+", range: "78-79" },
  { letter: "C", range: "73-77" },
  { letter: "C-", range: "70-72" },
  { letter: "D", range: "60-69" },
  { letter: "F", range: "<60" },
];

/** String | { strong: string } segments for inline emphasis */
export const LATE_POLICY_SEGMENTS = [
  "Except Homework 0, work may be submitted up to ",
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
    "This 4-credit course meets for about ",
    { strong: "six hours" },
    " each week in lecture and recitation, plus roughly ",
    { strong: "ten hours" },
    " for readings, homework, project work, and interview preparation. Weekly timing differs by section.",
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
    " is the main IDE.",
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
      { kind: "link", href: "https://edstem.org/", label: "Ed", desc: "Q&A" },
      {
        kind: "link",
        href: "/CSCI1300-Syllabus-Summer26.pdf",
        label: "Syllabus PDF",
        desc: "Summer 2026",
      },
      {
        kind: "link",
        href: "mailto:csci1300@colorado.edu",
        label: "csci1300@colorado.edu",
        desc: "Course inbox",
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
            href: "https://www.colorado.edu/studentconduct/honor-code",
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
  syllabusPdfHref: "/CSCI1300-Syllabus-Summer26.pdf",
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
        'On Ed and in live sessions: write clearly, avoid all-caps "shouting," stay on topic, and treat everyone with respect.',
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
      "Lecture: Mon · Tue · Thu · Fri · 11:10 am-12:30 pm · ECES 112. Recitation: Wed · 11:10 am-12:30 pm · ECES 112.",
    bioPlaceholder: "[Bio placeholder]",
  },
  {
    id: "amanda",
    role: "Instructor",
    section: "Section 830",
    name: "Amanda Hernandez Sandate",
    email: "Amanda.HernandezSandate@colorado.edu",
    scheduleLine:
      "Lecture: Mon · Tue · Thu · Fri · 2:50-4:10 pm · Meets remotely. Recitation: Wed · 2:50-4:10 pm · Meets remotely.",
    bioPlaceholder: "[Bio placeholder]",
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
      "Recitation with Section 300 (Wed · 11:10 am-12:30 pm · ECES 112). Office hours: [TBA]",
    bioPlaceholder: "[Bio placeholder]",
  },
  {
    id: "cornelius",
    role: "Graduate TA",
    section: "Section 830",
    name: "Cornelius Adejoro",
    email: "Cornelius.Adejoro@colorado.edu",
    scheduleLine:
      "Recitation with Section 830 (Wed · 2:50-4:10 pm · remote). Office hours: [TBA]",
    bioPlaceholder: "[Bio placeholder]",
  },
];

export const STAFF = {
  panelSub: "Summer 2026",
  instructorsHeading: "Instructors",
  tasHeading: "Graduate teaching assistants",
};
