import React from "react";
import { RESOURCE_GROUPS, RESOURCES } from "../../config/courseConfig.js";

export default function ResourcesPanel() {
  return (
    <div className="content-panel">
      <header className="c1300-panel-header">
        <h1>Resources</h1>
        <p className="c1300-panel-sub">{RESOURCES.panelSub}</p>
      </header>

      <div className="c1300-resource-grid">
        {RESOURCE_GROUPS.map((group) => (
          <section
            key={group.title}
            className={`c1300-resource-card${group.wide ? " c1300-resource-card-wide" : ""}`}
          >
            <h2>{group.title}</h2>
            <ul className="c1300-link-list">
              {group.entries.map((entry, i) => {
                if (entry.kind === "link") {
                  return (
                    <li key={`${entry.href}-${i}`}>
                      <a href={entry.href}>{entry.label}</a>
                      <span className="c1300-link-desc">{entry.desc}</span>
                    </li>
                  );
                }
                if (entry.kind === "strong") {
                  return (
                    <li key={`${entry.label}-${i}`}>
                      <span className="c1300-link-strong">{entry.label}</span>
                      <span className="c1300-link-desc">{entry.desc}</span>
                    </li>
                  );
                }
                if (entry.kind === "linkRow") {
                  return (
                    <li key={`linkrow-${i}`}>
                      {entry.links.map((link, j) => (
                        <React.Fragment key={link.href}>
                          {j > 0 ? entry.joiner : null}
                          <a href={link.href}>{link.label}</a>
                        </React.Fragment>
                      ))}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
