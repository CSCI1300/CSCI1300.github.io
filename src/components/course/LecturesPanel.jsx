import React from "react";
import {
  LECTURE_DATES_ISO,
  LECTURE_LINKS,
  LECTURE_TOPICS,
  LECTURES,
} from "../../config/courseConfig.js";
import { formatLectureDate } from "../../lib/courseFormats.js";
import LectureLinkCell from "./LectureLinkCell.jsx";

export default function LecturesPanel({ lectureTrack, setLectureTrack }) {
  return (
    <div className="content-panel content-panel--wide">
      <header className="c1300-panel-header">
        <h1>Lectures</h1>
        <p className="c1300-panel-sub">{LECTURES.panelSub}</p>
      </header>

      <div
        className="c1300-lecture-toggle"
        role="tablist"
        aria-label="Lecture materials by instructor"
      >
        {LECTURES.tracks.map((track) => (
          <button
            key={track.id}
            type="button"
            role="tab"
            aria-selected={lectureTrack === track.id}
            className={`c1300-lecture-toggle-btn${lectureTrack === track.id ? " is-active" : ""}`}
            onClick={() => setLectureTrack(track.id)}
          >
            {track.label}
          </button>
        ))}
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
                    {topicText ? topicText : <span className="c1300-lecture-tba">—</span>}
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
  );
}
