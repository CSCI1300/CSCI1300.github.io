import React from "react";
import { POLICIES } from "../../config/courseConfig.js";
import { renderInlineParts } from "./renderInlineParts.jsx";

function PolicyCard({ section }) {
  return (
    <section className="c1300-card">
      <h2>{section.title}</h2>
      <p>
        {section.parts
          ? renderInlineParts(section.parts)
          : section.body}
      </p>
    </section>
  );
}

export default function PoliciesPanel() {
  return (
    <div className="content-panel">
      <header className="c1300-panel-header">
        <h1>Policies</h1>
        <p className="c1300-panel-sub">{POLICIES.panelSub}</p>
      </header>
      <p className="c1300-lede">
        <a href={POLICIES.syllabusPdfHref}>{POLICIES.syllabusPdfLabel}</a>
      </p>
      <div className="c1300-policy-stack">
        {POLICIES.sections.map((section) => (
          <PolicyCard key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}
