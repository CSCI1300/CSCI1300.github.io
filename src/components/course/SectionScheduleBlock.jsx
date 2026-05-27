import React from "react";

export default function SectionScheduleBlock({ dayTokens, time, place }) {
  const placeLabel = typeof place === "string" ? place : place?.label;
  const placeUrl = typeof place === "string" ? null : place?.url;

  return (
    <div className="c1300-schedule-block">
      <p className="c1300-schedule-days">
        {dayTokens.map((token, i) => (
          <span key={`${token}-${i}`} className="c1300-schedule-day">
            {token}
          </span>
        ))}
      </p>
      <p className="c1300-schedule-time">{time}</p>
      <p className="c1300-schedule-place">
        {placeUrl ? (
          <a href={placeUrl} target="_blank" rel="noopener noreferrer">
            {placeLabel}
          </a>
        ) : (
          placeLabel
        )}
      </p>
    </div>
  );
}
