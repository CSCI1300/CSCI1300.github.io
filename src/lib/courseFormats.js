/** @param {string} iso YYYY-MM-DD */
export function formatLectureDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** @param {string} iso YYYY-MM-DD */
export function formatAssignmentDue(iso) {
  const d = new Date(`${iso}T12:00:00`);
  const day = d.toLocaleDateString("en-US", { weekday: "long" });
  const rest = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `${day}, ${rest}, 11:59PM MT`;
}
