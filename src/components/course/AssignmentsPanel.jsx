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
import { formatAssignmentDue } from "../../lib/courseFormats.js";
import { renderInlineParts } from "./renderInlineParts.jsx";

export default function AssignmentsPanel() {
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
        <h2>Assignment schedule</h2>
        <p className="c1300-lede">{renderInlineParts(ASSIGNMENTS.scheduleIntroParts)}</p>
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
