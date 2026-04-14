import React from "react";

/** @param {(string | { strong?: string } | { em?: string })[]} parts */
export function renderInlineParts(parts) {
  return parts.map((p, i) => {
    if (typeof p === "string") {
      return <React.Fragment key={i}>{p}</React.Fragment>;
    }
    if (p?.strong != null) {
      return <strong key={i}>{p.strong}</strong>;
    }
    if (p?.em != null) {
      return <em key={i}>{p.em}</em>;
    }
    return null;
  });
}
