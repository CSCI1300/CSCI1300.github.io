import React, { useState } from "react";
import MeetTheClassPanel from "../components/MeetTheClassPanel.jsx";
import AssignmentsPanel from "../components/course/AssignmentsPanel.jsx";
import LecturesPanel from "../components/course/LecturesPanel.jsx";
import OverviewPanel from "../components/course/OverviewPanel.jsx";
import PoliciesPanel from "../components/course/PoliciesPanel.jsx";
import ResourcesPanel from "../components/course/ResourcesPanel.jsx";
import StaffPanel from "../components/course/StaffPanel.jsx";
import TopicsPanel from "../components/course/TopicsPanel.jsx";
import { TABS } from "../config/courseConfig.js";
import "../styles/csci1300-stardew.css";

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
          {active === "overview" && <OverviewPanel />}
          {active === "assignments" && <AssignmentsPanel />}
          {active === "topics" && <TopicsPanel />}
          {active === "lectures" && (
            <LecturesPanel lectureTrack={lectureTrack} setLectureTrack={setLectureTrack} />
          )}
          {active === "resources" && <ResourcesPanel />}
          {active === "meet" && <MeetTheClassPanel />}
          {active === "policies" && <PoliciesPanel />}
          {active === "staff" && <StaffPanel />}
        </div>
      </div>
    </div>
  );
}
