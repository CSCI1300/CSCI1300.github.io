import React from "react";

/** @param {(string | { strong?: string } | { em?: string } | { link?: { href: string, label: string } })[]} parts */
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
    if (p?.link != null) {
      return (
        <a key={i} href={p.link.href} target="_blank" rel="noopener noreferrer">
          {p.link.label}
        </a>
      );
    }
    return null;
  });
}
