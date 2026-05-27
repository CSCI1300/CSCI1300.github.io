import React from "react";

export default function StaffCard({ id, role, section, name, email, scheduleLine }) {
  const customPhoto = {
    zach: { defaultSrc: "/zach/ZachImage.png", hoverSrc: "/zach/ZachSDV.png" },
    amanda: { defaultSrc: "/amanda/amandaImage.jpg", hoverSrc: "/amanda/AmandaSVD.png" },
    sashi: { defaultSrc: "/sashi/SashiImage.jpeg" },
    ishneet: { defaultSrc: "/ishneet/ishneet.jpeg" },
    nolan: { defaultSrc: "/nolan/nolan.jpeg" },
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

  const renderTextWithLinks = (text) => {
    const urlPattern = /(https?:\/\/[^\s)]+)/g;
    const parts = String(text).split(urlPattern);
    return parts.map((part, idx) => {
      if (/^https?:\/\//.test(part)) {
        let label = "Link";
        try {
          const parsed = new URL(part);
          label = parsed.hostname.includes("zoom.us") ? "Zoom" : parsed.hostname.replace(/^www\./, "");
        } catch {
          label = "Link";
        }
        return (
          <a key={`${name}-schedule-link-${idx}`} href={part} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
      return <React.Fragment key={`${name}-schedule-text-${idx}`}>{part}</React.Fragment>;
    });
  };

  return (
    <article className="c1300-staff-card">
      <figure className="c1300-staff-photo-wrap">
        {customPhoto ? (
          customPhoto.hoverSrc ? (
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
            <div className="c1300-staff-photo">
              <img
                className="c1300-staff-photo-img c1300-staff-photo-img--default"
                src={customPhoto.defaultSrc}
                alt={`${name} photo`}
                width="128"
                height="128"
              />
            </div>
          )
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
                  {item.label === "Office hours" && item.text.includes("|") ? (
                    <>
                      {item.label}
                      <span className="c1300-staff-sublist">
                        {item.text.split("|").map((slot, slotIdx) => (
                          <span className="c1300-staff-subitem" key={`${item.id}-slot-${slotIdx}`}>
                            {renderTextWithLinks(slot.trim())}
                          </span>
                        ))}
                      </span>
                    </>
                  ) : item.label ? (
                    <>
                      {item.label}: {renderTextWithLinks(item.text)}
                    </>
                  ) : (
                    renderTextWithLinks(item.text)
                  )}
                </span>
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
