import React from "react";
import { GRADUATE_TAS, INSTRUCTORS, STAFF } from "../../config/courseConfig.js";
import StaffCard from "./StaffCard.jsx";

export default function StaffPanel() {
  return (
    <div className="content-panel">
      <header className="c1300-panel-header">
        <h1>Staff</h1>
        <p className="c1300-panel-sub">{STAFF.panelSub}</p>
      </header>

      <h2 className="c1300-staff-section-heading">{STAFF.instructorsHeading}</h2>
      <div className="c1300-staff-grid">
        {INSTRUCTORS.map((person) => (
          <StaffCard key={person.id} {...person} />
        ))}
      </div>

      <h2 className="c1300-staff-section-heading">{STAFF.tasHeading}</h2>
      <div className="c1300-staff-grid">
        {GRADUATE_TAS.map((person) => (
          <StaffCard key={person.id} {...person} />
        ))}
      </div>
    </div>
  );
}
