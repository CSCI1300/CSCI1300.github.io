import React from "react";
import { LECTURE_DATES_ISO, LECTURE_TOPICS, LECTURES } from "../../config/courseConfig.js";
import { formatLectureDate } from "../../lib/courseFormats.js";

export default function LecturesPanel() {
  return (
    <div className="content-panel content-panel--wide">
      <header className="c1300-panel-header">
        <h1>Lectures</h1>
        <p className="c1300-panel-sub">{LECTURES.panelSub}</p>
      </header>

      <p className="c1300-lecture-materials">
        <a
          className="c1300-lecture-materials-btn"
          href={LECTURES.materialsHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {LECTURES.materialsLabel}
        </a>
      </p>

      <div className="c1300-table-wrap c1300-lecture-table-wrap">
        <table className="c1300-lecture-table">
          <thead>
            <tr>
              <th className="c1300-col-n">#</th>
              <th className="c1300-col-date">Date</th>
              <th className="c1300-col-topic">Topic</th>
            </tr>
          </thead>
          <tbody>
            {LECTURE_DATES_ISO.map((iso, i) => {
              const topicText = LECTURE_TOPICS[iso];
              return (
                <tr key={iso}>
                  <td className="c1300-col-n">{i + 1}</td>
                  <td className="c1300-col-date">{formatLectureDate(iso)}</td>
                  <td className="c1300-col-topic">
                    {topicText ? topicText : <span className="c1300-lecture-tba">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
