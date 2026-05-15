/**
 * Styles for the ACTION REQUIRED callout (`<<<HW_ACTION>>>` … `<<<END_HW_ACTION>>>` in .md).
 * Optional hints use `<<<HINT>>>` … `<<<END_HINT>>>` — panel colors live in `hw-markdown.css`
 * (`.c1300-hw-callout--hint`).
 *
 * - **Panel shell, label, body text:** edit the exported objects below (inline styles on the
 *   callout in `HandoutMarkdown.jsx`, so they override most page CSS).
 * - **Links and `code` inside the callout:** `src/styles/hw-markdown.css` — selectors under
 *   `.c1300-hw-callout--action` / `.c1300-hw-callout__body` (link + code colors; not the shell box).
 */
/** Flat action callout — `background` / `border` here (inline on shell div). */
export const HANDOUT_ACTION_SHELL_STYLE = {
  margin: "0.9rem 0 1.05rem",
  padding: "0.9rem 1rem 1rem",
  borderRadius: "6px",
  border: "1px solid rgb(232, 190, 190)",
  background: "rgba(247, 234, 234, 0.79)",
  boxShadow: "none",
  color: "rgb(48, 36, 36)",
};

/** Plain uppercase label — no bubble / pill. */
export const HANDOUT_ACTION_LABEL_STYLE = {
  margin: "0 0 0.45rem",
  padding: 0,
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgb(120, 52, 52)",
  border: "none",
  background: "transparent",
  lineHeight: 1.35,
};

/** Body: flat panel, easy to scan. */
export const HANDOUT_ACTION_BODY_STYLE = {
  margin: 0,
  padding: 0,
  borderRadius: 0,
  background: "transparent",
  border: "none",
  color: "rgb(0, 0, 0)",
  fontSize: "0.96rem",
  lineHeight: 1.55,
  fontWeight: 500,
};
