import React from "react";
import {
  ASSIGNMENT_SCHEDULE,
  ASSIGNMENTS,
  EXTRA_CREDIT_NOTE,
  GRADE_BREAKDOWN,
  GRADING_INTERVIEWS_PLACEHOLDER,
  LATE_POLICY_SEGMENTS,
  LETTER_CUTOFFS,
} from "../../config/courseConfig.js";
import { formatAssignmentDate, formatAssignmentDue } from "../../lib/courseFormats.js";
import { renderInlineParts } from "./renderInlineParts.jsx";

function getHomeworkNumber(name) {
  const match = name.match(/^Homework\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

function buildHomeworkRows(schedule) {
  const byHomework = new Map();
  schedule.forEach((row) => {
    const hwNum = getHomeworkNumber(row.name);
    if (!hwNum) return;
    const existing = byHomework.get(hwNum) || { number: hwNum, partA: null, partB: null };
    if (row.name.includes("Part A")) existing.partA = row;
    if (row.name.includes("Part B")) existing.partB = row;
    byHomework.set(hwNum, existing);
  });
  return [...byHomework.values()].sort((a, b) => a.number - b.number);
}

function buildMajorDateRows(schedule) {
  return schedule.filter((row) => !/^Homework\s+\d+\s+\(Part [AB]\)$/i.test(row.name));
}

export default function AssignmentsPanel() {
  const homeworkRows = buildHomeworkRows(ASSIGNMENT_SCHEDULE);
  const majorDateRows = buildMajorDateRows(ASSIGNMENT_SCHEDULE);

  return (
    <div className="content-panel">
      <header className="c1300-panel-header">
        <h1>Assignments &amp; grading</h1>
        <p className="c1300-panel-sub">{ASSIGNMENTS.panelSub}</p>
      </header>

      <section className="c1300-section" aria-labelledby="assign-deadlines-heading">
        <h2 id="assign-deadlines-heading">Deadlines &amp; structure</h2>
        <p className="c1300-assign-deadlines-intro">
          {renderInlineParts(ASSIGNMENTS.deadlinesIntroLine)}
        </p>
        <div className="c1300-assign-deadlines">
          {ASSIGNMENTS.deadlinesStructure.map((item) => (
            <article key={item.id} className="c1300-assign-deadlines__item">
              <h3 className="c1300-assign-deadlines__title">{item.title}</h3>
              <p className="c1300-assign-deadlines__body">
                {renderInlineParts(item.parts)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="c1300-section">
        <h2>Homework weekly rhythm</h2>
        <p className="c1300-lede">{renderInlineParts(ASSIGNMENTS.scheduleIntroParts)}</p>
        <p className="c1300-fineprint">
          Part A is due during your section's recitation. Part B is due Tuesday at 11:59PM MT on
          Gradescope.
        </p>
        <div className="c1300-table-wrap">
          <table className="c1300-table-compact">
            <thead>
              <tr>
                <th>Homework</th>
                <th>Part A</th>
                <th>Part B</th>
              </tr>
            </thead>
            <tbody>
              {homeworkRows.map((row) => (
                <tr key={`hw-${row.number}`}>
                  <td>{`Homework ${row.number}`}</td>
                  <td>{row.partA?.dueIso ? formatAssignmentDate(row.partA.dueIso) : <span className="c1300-lecture-tba">TBA</span>}</td>
                  <td>{row.partB?.dueIso ? formatAssignmentDate(row.partB.dueIso) : <span className="c1300-lecture-tba">TBA</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="c1300-section">
        <h2>Project dates</h2>
        <div className="c1300-table-wrap">
          <table className="c1300-table-compact">
            <thead>
              <tr>
                <th>Item</th>
                <th>Due</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {majorDateRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.dueIso ? formatAssignmentDue(row.dueIso) : <span className="c1300-lecture-tba">TBA</span>}</td>
                  <td className="c1300-assign-note">{row.note ?? "—"}</td>
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
              {GRADE_BREAKDOWN.map((row) => (
                <tr key={row.component}>
                  <td>{row.component}</td>
                  <td>{row.weight}</td>
                  <td>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="c1300-card-row">
        <section className="c1300-card" aria-labelledby="late">
          <h2 id="late">Late policy</h2>
          <p>{renderInlineParts(LATE_POLICY_SEGMENTS)}</p>
        </section>
        <section className="c1300-card" aria-labelledby="interview">
          <h2 id="interview">Grading interviews</h2>
          <p>{GRADING_INTERVIEWS_PLACEHOLDER}</p>
        </section>
      </div>

      <section className="c1300-section">
        <h2>Letter cutoffs</h2>
        <div className="c1300-table-wrap">
          <table className="c1300-table-compact">
            <thead>
              <tr>
                {LETTER_CUTOFFS.map((col) => (
                  <th key={col.letter}>{col.letter}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {LETTER_CUTOFFS.map((col) => (
                  <td key={col.letter}>{col.range}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="c1300-fineprint">{EXTRA_CREDIT_NOTE}</p>
      </section>
    </div>
  );
}
