import React from "react";
import { TOPICS } from "../../config/courseConfig.js";
import { renderInlineParts } from "./renderInlineParts.jsx";

export default function TopicsPanel() {
  return (
    <div className="content-panel">
      <header className="c1300-panel-header">
        <h1>Topics &amp; workload</h1>
        <p className="c1300-panel-sub">{TOPICS.panelSub}</p>
      </header>
      <p className="c1300-lede">{renderInlineParts(TOPICS.workloadParts)}</p>
      <section className="c1300-section">
        <h2>Syllabus topic list</h2>
        <ul className="c1300-topic-list">
          {TOPICS.syllabusTopics.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="c1300-section">
        <h2>Tools</h2>
        <p>{renderInlineParts(TOPICS.toolsParts)}</p>
      </section>
    </div>
  );
}
