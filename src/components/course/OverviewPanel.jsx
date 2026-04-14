import React from "react";
import {
  OVERVIEW,
  SCHEDULE_DAY_TOKENS,
  SECTIONS_AT_GLANCE,
} from "../../config/courseConfig.js";
import SectionScheduleBlock from "./SectionScheduleBlock.jsx";
import { renderInlineParts } from "./renderInlineParts.jsx";

export default function OverviewPanel() {
  return (
    <div className="content-panel">
      <header className="c1300-panel-header">
        <h1>{OVERVIEW.title}</h1>
        <p className="c1300-panel-sub">{OVERVIEW.panelSub}</p>
      </header>
      <p className="c1300-lede">
        {OVERVIEW.ledeLine1Before}{" "}
        <strong>{OVERVIEW.ledeStrong}</strong>.
        <br />
        {OVERVIEW.ledeLine2}
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
              {SECTIONS_AT_GLANCE.map((row) => (
                <tr key={row.section}>
                  <td>{row.section}</td>
                  <td>{row.instructor}</td>
                  <td>{row.gradTa}</td>
                  <td className="c1300-schedule-cell">
                    <SectionScheduleBlock
                      dayTokens={SCHEDULE_DAY_TOKENS.lecture}
                      time={row.lecture.time}
                      place={row.lecture.place}
                    />
                  </td>
                  <td className="c1300-schedule-cell">
                    <SectionScheduleBlock
                      dayTokens={SCHEDULE_DAY_TOKENS.recitation}
                      time={row.recitation.time}
                      place={row.recitation.place}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="c1300-fineprint">{OVERVIEW.officeHoursNote}</p>
      </section>

      <section className="c1300-section" aria-labelledby="overview-desc">
        <h2 id="overview-desc">Course description</h2>
        <p>{renderInlineParts(OVERVIEW.courseDescriptionParts)}</p>
      </section>
    </div>
  );
}
