import React, { useState } from "react";
import MeetTheClassPanel from "../components/MeetTheClassPanel.jsx";
import "../styles/csci1300-stardew.css";

/** MTThF lecture days, May 26–July 31, 2026 (inclusive). */
const LECTURE_DATES_ISO = [
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
  "2026-07-20",
  "2026-07-21",
  "2026-07-23",
  "2026-07-24",
  "2026-07-27",
  "2026-07-28",
  "2026-07-30",
  "2026-07-31",
];

/** Shared lecture topic by date (both sections unless overridden in LECTURE_LINKS). */
const LECTURE_TOPICS = {
  // e.g. "2026-05-26": "Introduction & logistics",
};

/* Per-day: { slides?, recording?, topic? } — topic overrides LECTURE_TOPICS[iso] for that section */
const LECTURE_LINKS = { zach: {}, amanda: {} };

function formatLectureDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Part B due dates (Fridays 5:00 pm MT, unless noted). Summer 2026 — adjust names if the syllabus differs. */
const ASSIGNMENT_SCHEDULE = [
  { name: "Homework 0", dueIso: "2026-05-29" },
  { name: "Homework 1", dueIso: "2026-06-05" },
  { name: "Homework 2", dueIso: "2026-06-12" },
  { name: "Homework 3", dueIso: "2026-06-19" },
  { name: "Homework 4", dueIso: "2026-06-26" },
  { name: "Homework 5", dueIso: "2026-07-03" },
  { name: "Homework 6", dueIso: "2026-07-10" },
  { name: "Homework 7", dueIso: "2026-07-17" },
  { name: "Homework 8", dueIso: "2026-07-24" },
  { name: "Midterm exam", dueIso: null, note: "In class; date announced on the course calendar." },
  { name: "Final project (Part B)", dueIso: "2026-07-31", note: "Includes interview sign-up after submission." },
];

function formatAssignmentDue(iso) {
  const d = new Date(`${iso}T12:00:00`);
  const day = d.toLocaleDateString("en-US", { weekday: "long" });
  const rest = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `${day}, ${rest}, 5:00 pm MT`;
}

const TABS = [
  { id: "overview", label: "Overview", icon: "/csci1300-theme/backpack.svg", tip: "Overview" },
  { id: "assignments", label: "Assignments", icon: "/csci1300-theme/tool.svg", tip: "Assignments" },
  { id: "topics", label: "Topics", icon: "/csci1300-theme/map.svg", tip: "Topics" },
  { id: "lectures", label: "Lectures", icon: "/csci1300-theme/bag.svg", tip: "Lectures" },
  { id: "resources", label: "Resources", icon: "/csci1300-theme/heart.svg", tip: "Resources" },
  { id: "meet", label: "Meet the class", icon: "/csci1300-theme/meet.svg", tip: "Meet the class" },
  { id: "policies", label: "Policies", icon: "/csci1300-theme/console.svg", tip: "Policies" },
  { id: "staff", label: "Staff", icon: "/csci1300-theme/avatar.svg", tip: "Staff" },
];

const INSTRUCTORS = [
  {
    id: "zach",
    role: "Instructor",
    section: "Section 300",
    name: "Zachary Kaufman",
    email: "Zachary.Kaufman@colorado.edu",
    scheduleLine:
      "Lecture: Mon · Tue · Thu · Fri · 11:10 am–12:30 pm · ECES 112. Recitation: Wed · 11:10 am–12:30 pm · ECES 112.",
    bioPlaceholder: "[Bio placeholder]",
  },
  {
    id: "amanda",
    role: "Instructor",
    section: "Section 830",
    name: "Amanda Hernandez Sandate",
    email: "Amanda.HernandezSandate@colorado.edu",
    scheduleLine:
      "Lecture: Mon · Tue · Thu · Fri · 2:50–4:10 pm · Meets remotely. Recitation: Wed · 2:50–4:10 pm · Meets remotely.",
    bioPlaceholder: "[Bio placeholder]",
  },
];

const GRADUATE_TAS = [
  {
    id: "ishneet",
    role: "Graduate TA",
    section: "Section 300",
    name: "Ishneet Chadha",
    email: "Ishneet.Chadha@colorado.edu",
    scheduleLine:
      "Recitation with Section 300 (Wed · 11:10 am–12:30 pm · ECES 112). Office hours: [TBA]",
    bioPlaceholder: "[Bio placeholder]",
  },
  {
    id: "cornelius",
    role: "Graduate TA",
    section: "Section 830",
    name: "Cornelius Adejoro",
    email: "Cornelius.Adejoro@colorado.edu",
    scheduleLine:
      "Recitation with Section 830 (Wed · 2:50–4:10 pm · remote). Office hours: [TBA]",
    bioPlaceholder: "[Bio placeholder]",
  },
];

function LectureLinkCell({ url, children }) {
  if (url) {
    return (
      <a href={url} className="c1300-lecture-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <span className="c1300-lecture-tba">—</span>;
}

function StaffCard({ role, section, name, email, scheduleLine, bioPlaceholder }) {
  return (
    <article className="c1300-staff-card">
      <figure className="c1300-staff-photo-wrap">
        <div className="c1300-staff-photo-placeholder" aria-hidden="true">
          <img
            className="c1300-staff-photo-icon"
            src="/csci1300-theme/avatar.svg"
            alt=""
            width="72"
            height="72"
          />
          <span className="c1300-staff-photo-label">Photo placeholder</span>
        </div>
      </figure>
      <div className="c1300-staff-body">
        <p className="c1300-staff-role">
          {role} · {section}
        </p>
        <h2 className="c1300-staff-name">{name}</h2>
        <p className="c1300-staff-email">
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        {scheduleLine ? <p className="c1300-staff-schedule">{scheduleLine}</p> : null}
        <p className="c1300-staff-bio-line">{bioPlaceholder}</p>
      </div>
    </article>
  );
}

export default function Csci1300Page() {
  const [active, setActive] = useState("overview");
  const [lectureTrack, setLectureTrack] = useState("zach");

  return (
    <div className="csci1300-course">
      <div className="csci1300-sky" aria-hidden="true">
        <div className="csci1300-marquee">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="csci1300-clouds">
              <img src="/csci1300-theme/clouds.webp" alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="csci1300-shell">
        <div className="menu__tabs__container" role="tablist" aria-label="Course sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={`menu__tab${active === tab.id ? " menu__tab--active" : ""}`}
              data-tooltip={tab.tip}
              onClick={() => setActive(tab.id)}
            >
              <img className="menu__img" src={tab.icon} alt="" />
              <span className="sr-only">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="main" role="tabpanel">
          {active === "overview" && (
            <div className="content-panel">
              <header className="c1300-panel-header">
                <h1>CSCI 1300: Starting Computing</h1>
                <p className="c1300-panel-sub">University of Colorado Boulder · Summer 2026</p>
              </header>
              <p className="c1300-lede">
                Shared page for <strong>Sections 300 and 830</strong>. Lecture and recitation times
                depend on your section.
              </p>

              <section className="c1300-section" aria-labelledby="overview-sections">
                <h2 id="overview-sections">Sections at a glance</h2>
                <div className="c1300-table-wrap">
                  <table className="c1300-sections-compare">
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Instructor</th>
                        <th>Grad TA</th>
                        <th>Lecture</th>
                        <th>Recitation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>300</td>
                        <td>Zachary Kaufman</td>
                        <td>Ishneet Chadha</td>
                        <td>MTThF 11:10 am–12:30 pm · ECES 112</td>
                        <td>W 11:10 am–12:30 pm · ECES 112</td>
                      </tr>
                      <tr>
                        <td>830</td>
                        <td>Amanda Hernandez Sandate</td>
                        <td>Cornelius Adejoro</td>
                        <td>MTThF 2:50–4:10 pm · Remote</td>
                        <td>W 2:50–4:10 pm · Remote</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="c1300-fineprint">
                  Office hours are [TBA].
                </p>
              </section>

              <section className="c1300-section" aria-labelledby="overview-desc">
                <h2 id="overview-desc">Course description</h2>
                <p>
                  Techniques for writing programs in a higher-level language for problems across
                  many domains. No prior computing or programming background required. Both sections
                  use <strong>C++</strong> and cover variables, control flow, functions, arrays, I/O,
                  classes, and related topics — see the Topics tab.
                </p>
              </section>
            </div>
          )}

          {active === "assignments" && (
            <div className="content-panel">
              <header className="c1300-panel-header">
                <h1>Assignments &amp; grading</h1>
                <p className="c1300-panel-sub">Sections 300 &amp; 830</p>
              </header>

              <section className="c1300-section">
                <h2>Deadlines &amp; structure</h2>
                <p className="c1300-lede">
                  Homework <strong>Part B</strong> is usually due <strong>Fridays at 5:00 pm MT</strong> (see
                  schedule below). Each assignment has <strong>Part A</strong> (recitation, checked in person) and{" "}
                  <strong>Part B</strong> (Gradescope; autograder and possible grading interviews).{" "}
                  <strong>Midterm</strong> and any one-off changes will be announced in class and updated here.
                </p>
              </section>

              <section className="c1300-section">
                <h2>Assignment schedule</h2>
                <p className="c1300-lede">
                  Same expectations for <strong>Sections 300 and 830</strong>. If a due date shifts, this table is
                  the source of truth.
                </p>
                <div className="c1300-table-wrap">
                  <table className="c1300-table-compact">
                    <thead>
                      <tr>
                        <th>Assignment</th>
                        <th>Due</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ASSIGNMENT_SCHEDULE.map((row) => (
                        <tr key={row.name}>
                          <td>{row.name}</td>
                          <td>
                            {row.dueIso ? (
                              formatAssignmentDue(row.dueIso)
                            ) : (
                              <span className="c1300-lecture-tba">TBA</span>
                            )}
                          </td>
                          <td>{row.note ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="c1300-section">
                <h2>Grade breakdown</h2>
                <div className="c1300-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Weight</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Homeworks</td>
                        <td>45%</td>
                        <td>
                          Part A in recitation. Part B on Gradescope; autograder + possible grading
                          interviews.
                        </td>
                      </tr>
                      <tr>
                        <td>Project + exams</td>
                        <td>50%</td>
                        <td>
                          Midterm; final project + interview; checkpoints toward the project.
                        </td>
                      </tr>
                      <tr>
                        <td>Attendance</td>
                        <td>5%</td>
                        <td>Lecture attendance required; in-class quizzes can only help.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="c1300-card-row">
                <section className="c1300-card" aria-labelledby="late">
                  <h2 id="late">Late policy</h2>
                  <p>
                    Except Homework 0, work may be submitted up to <strong>2 days</strong> late for{" "}
                    <strong>80%</strong> of the on-time score. After that, late work needs prior
                    instructor approval.
                  </p>
                </section>
                <section className="c1300-card" aria-labelledby="interview">
                  <h2 id="interview">Grading interviews</h2>
                  <p>
                    [TBA]
                  </p>
                </section>
              </div>

              <section className="c1300-section">
                <h2>Letter cutoffs</h2>
                <div className="c1300-table-wrap">
                  <table className="c1300-table-compact">
                    <thead>
                      <tr>
                        <th>A</th>
                        <th>A−</th>
                        <th>B+</th>
                        <th>B</th>
                        <th>B−</th>
                        <th>C+</th>
                        <th>C</th>
                        <th>C−</th>
                        <th>D</th>
                        <th>F</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>93–100</td>
                        <td>90–92</td>
                        <td>88–89</td>
                        <td>83–87</td>
                        <td>80–82</td>
                        <td>78–79</td>
                        <td>73–77</td>
                        <td>70–72</td>
                        <td>60–69</td>
                        <td>&lt;60</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="c1300-fineprint">Extra credit may be offered during the term.</p>
              </section>
            </div>
          )}

          {active === "topics" && (
            <div className="content-panel">
              <header className="c1300-panel-header">
                <h1>Topics &amp; workload</h1>
                <p className="c1300-panel-sub">Shared curriculum</p>
              </header>
              <p className="c1300-lede">
                Four credits ≈ four hours in class weekly plus roughly <strong>twelve hours</strong>{" "}
                for readings, videos, homework, and interviews. Weekly timing differs by section.
              </p>
              <section className="c1300-section">
                <h2>Syllabus topic list</h2>
                <ul className="c1300-topic-list">
                  <li>Computer architecture and environment</li>
                  <li>Variables, data types, operators</li>
                  <li>Strings: indexing, iteration, comparing</li>
                  <li>Control: if/else, switch, while, for</li>
                  <li>Functions</li>
                  <li>Arrays</li>
                  <li>I/O streams and file I/O</li>
                  <li>Classes and objects; methods</li>
                  <li>Inheritance</li>
                  <li>Vectors</li>
                  <li>Recursion</li>
                  <li>References</li>
                </ul>
              </section>
              <section className="c1300-section">
                <h2>Tools</h2>
                <p>
                  <strong>No required textbook.</strong> <strong>VS Code</strong> is the main IDE.
                </p>
              </section>
            </div>
          )}

          {active === "lectures" && (
            <div className="content-panel content-panel--wide">
              <header className="c1300-panel-header">
                <h1>Lectures</h1>
                <p className="c1300-panel-sub">
                  MTThF · May 26 – July 31, 2026 · slides &amp; recordings by section
                </p>
              </header>

              <div
                className="c1300-lecture-toggle"
                role="tablist"
                aria-label="Lecture materials by instructor"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={lectureTrack === "zach"}
                  className={`c1300-lecture-toggle-btn${lectureTrack === "zach" ? " is-active" : ""}`}
                  onClick={() => setLectureTrack("zach")}
                >
                  Section 300 — Zach
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={lectureTrack === "amanda"}
                  className={`c1300-lecture-toggle-btn${lectureTrack === "amanda" ? " is-active" : ""}`}
                  onClick={() => setLectureTrack("amanda")}
                >
                  Section 830 — Amanda
                </button>
              </div>

              <div className="c1300-table-wrap c1300-lecture-table-wrap">
                <table className="c1300-lecture-table">
                  <thead>
                    <tr>
                      <th className="c1300-col-n">#</th>
                      <th className="c1300-col-date">Date</th>
                      <th className="c1300-col-topic">Topic</th>
                      <th>Slides</th>
                      <th>Recording</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LECTURE_DATES_ISO.map((iso, i) => {
                      const day = LECTURE_LINKS[lectureTrack][iso] || {};
                      const topicText = day.topic ?? LECTURE_TOPICS[iso];
                      return (
                        <tr key={`${lectureTrack}-${iso}`}>
                          <td className="c1300-col-n">{i + 1}</td>
                          <td className="c1300-col-date">{formatLectureDate(iso)}</td>
                          <td className="c1300-col-topic">
                            {topicText ? (
                              topicText
                            ) : (
                              <span className="c1300-lecture-tba">—</span>
                            )}
                          </td>
                          <td>
                            <LectureLinkCell url={day.slides}>Slides</LectureLinkCell>
                          </td>
                          <td>
                            <LectureLinkCell url={day.recording}>Recording</LectureLinkCell>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === "resources" && (
            <div className="content-panel">
              <header className="c1300-panel-header">
                <h1>Resources</h1>
                <p className="c1300-panel-sub">Links and campus support</p>
              </header>

              <div className="c1300-resource-grid">
                <section className="c1300-resource-card">
                  <h2>Course</h2>
                  <ul className="c1300-link-list">
                    <li>
                      <a href="https://canvas.colorado.edu/">Canvas</a>
                      <span className="c1300-link-desc">Announcements grades</span>
                    </li>
                    <li>
                      <a href="https://gradescope.com/">Gradescope</a>
                      <span className="c1300-link-desc">Submit assignments</span>
                    </li>
                    <li>
                      <a href="https://edstem.org/">Ed</a>
                      <span className="c1300-link-desc">Q&amp;A</span>
                    </li>
                    <li>
                      <a href="/CSCI1300-Syllabus-Summer26.pdf">Syllabus PDF</a>
                      <span className="c1300-link-desc">Summer 2026</span>
                    </li>
                    <li>
                      <a href="mailto:csci1300@colorado.edu">csci1300@colorado.edu</a>
                      <span className="c1300-link-desc">Course inbox</span>
                    </li>
                  </ul>
                </section>
                <section className="c1300-resource-card">
                  <h2>Software &amp; habits</h2>
                  <ul className="c1300-link-list">
                    <li>
                      <a href="https://code.visualstudio.com/">VS Code</a>
                      <span className="c1300-link-desc">Primary IDE</span>
                    </li>
                    <li>
                      <span className="c1300-link-strong">Backups</span>
                      <span className="c1300-link-desc">Drive, Dropbox, GitHub, or USB</span>
                    </li>
                  </ul>
                </section>
                <section className="c1300-resource-card c1300-resource-card-wide">
                  <h2>Campus</h2>
                  <ul className="c1300-link-list">
                    <li>
                      <a href="https://www.colorado.edu/counseling/">CAPS</a>
                      <span className="c1300-link-desc">(303) 492-2277</span>
                    </li>
                    <li>
                      <a href="https://www.colorado.edu/disabilityservices/">Disability Services</a>
                      <span className="c1300-link-desc">303-492-8671 · dsinfo@colorado.edu</span>
                    </li>
                    <li>
                      <a href="https://www.colorado.edu/studentconduct/honor-code">Honor Code</a>
                      {" · "}
                      <a href="https://www.colorado.edu/oiec/">OIEC</a>
                      {" · "}
                      <a href="https://www.colorado.edu/dontignoreit/">Don&apos;t Ignore It</a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          )}

          {active === "meet" && <MeetTheClassPanel />}

          {active === "policies" && (
            <div className="content-panel">
              <header className="c1300-panel-header">
                <h1>Policies</h1>
                <p className="c1300-panel-sub">Summary — full syllabus PDF for detail</p>
              </header>
              <p className="c1300-lede">
                <a href="/CSCI1300-Syllabus-Summer26.pdf">CSCI 1300 syllabus (PDF)</a>
              </p>
              <div className="c1300-policy-stack">
                <section className="c1300-card">
                  <h2>Collaboration</h2>
                  <p>
                    Talk through ideas and debugging in words or diagrams. Write your own code. Do
                    not share or copy source, hunt for solutions online, or use undisclosed AI /
                    paywalled answer sites. Cite permitted help in comments. Quizzes and exams are
                    individual unless marked otherwise.
                  </p>
                </section>
                <section className="c1300-card">
                  <h2>Integrity &amp; AI</h2>
                  <p>
                    Work may be checked automatically. Undisclosed outside code or generative AI
                    can violate the Honor Code. Ask your section instructor <em>before</em> you
                    submit if you are unsure.
                  </p>
                </section>
                <section className="c1300-card">
                  <h2>Netiquette</h2>
                  <p>
                    On Ed and in live sessions: write clearly, avoid all-caps “shouting,” stay on
                    topic, and treat everyone with respect.
                  </p>
                </section>
                <section className="c1300-card">
                  <h2>Names &amp; pronouns</h2>
                  <p>Update preferred name and pronouns in the student portal; rosters follow that.</p>
                </section>
              </div>
            </div>
          )}

          {active === "staff" && (
            <div className="content-panel">
              <header className="c1300-panel-header">
                <h1>Staff</h1>
                <p className="c1300-panel-sub">Summer 2026</p>
              </header>

              <h2 className="c1300-staff-section-heading">Instructors</h2>
              <div className="c1300-staff-grid">
                {INSTRUCTORS.map((person) => (
                  <StaffCard key={person.id} {...person} />
                ))}
              </div>

              <h2 className="c1300-staff-section-heading">Graduate teaching assistants</h2>
              <div className="c1300-staff-grid">
                {GRADUATE_TAS.map((person) => (
                  <StaffCard key={person.id} {...person} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
