import React from "react";

export default function StaffCard({ id, role, section, name, email, scheduleLine, bioPlaceholder }) {
  const customPhoto = {
    zach: { defaultSrc: "/zach/ZachSDV.png", hoverSrc: "/zach/ZachImage.png" },
    amanda: { defaultSrc: "/amanda/AmandaSVD.png", hoverSrc: "/amanda/amandaImage.jpg" },
  }[id];

  const scheduleItems = String(scheduleLine ?? "")
    .split(/\.\s+/)
    .map((item) => item.trim().replace(/\.$/, ""))
    .filter(Boolean)
    .map((item, idx) => {
      const m = item.match(/^([^:]+):\s*(.+)$/);
      return {
        id: `${name}-schedule-${idx}`,
        label: m ? m[1] : null,
        text: m ? m[2] : item,
      };
    });

  return (
    <article className="c1300-staff-card">
      <figure className="c1300-staff-photo-wrap">
        {customPhoto ? (
          <div className="c1300-staff-photo c1300-staff-photo--swap">
            <img
              className="c1300-staff-photo-img c1300-staff-photo-img--default"
              src={customPhoto.defaultSrc}
              alt={`${name} avatar`}
              width="128"
              height="128"
            />
            <img
              className="c1300-staff-photo-img c1300-staff-photo-img--hover"
              src={customPhoto.hoverSrc}
              alt=""
              aria-hidden="true"
              width="128"
              height="128"
            />
          </div>
        ) : (
          <div className="c1300-staff-photo-placeholder" aria-hidden="true">
            <img
              className="c1300-staff-photo-icon"
              src="/csci1300-theme/avatar.svg"
              alt=""
              width="72"
              height="72"
            />
            <span className="c1300-staff-photo-label">Photo placeholder</span>
          </div>
        )}
      </figure>
      <div className="c1300-staff-body">
        <p className="c1300-staff-role">
          {role} · {section}
        </p>
        <h2 className="c1300-staff-name">{name}</h2>
        <p className="c1300-staff-email">
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        {scheduleItems.length > 0 ? (
          <div className="c1300-staff-schedule" role="group" aria-label="Schedule">
            {scheduleItems.map((item) => (
              <p className="c1300-staff-schedule-item" key={item.id}>
                <span className="c1300-staff-schedule-text">
                  {item.label ? `${item.label}: ${item.text}` : item.text}
                </span>
              </p>
            ))}
          </div>
        ) : null}
        <p className="c1300-staff-bio-line">{bioPlaceholder}</p>
      </div>
    </article>
  );
}
