import React from "react";

export default function LectureLinkCell({ url, children }) {
  if (url) {
    return (
      <a href={url} className="c1300-lecture-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <span className="c1300-lecture-tba">—</span>;
}
