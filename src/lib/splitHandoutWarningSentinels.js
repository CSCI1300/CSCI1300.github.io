export const HW_WARNING_START = "<<<HW_WARNING>>>";
export const HW_WARNING_END = "<<<END_HW_WARNING>>>";

/**
 * Split homework markdown into normal markdown and critical warning callout bodies.
 *
 * <<<HW_WARNING>>>
 * Markdown body…
 * <<<END_HW_WARNING>>>
 */
export function splitHandoutWarningSentinels(text) {
  if (typeof text !== "string" || !text.includes(HW_WARNING_START)) {
    return [{ type: "markdown", content: text ?? "" }];
  }
  const chunks = [];
  let rest = text ?? "";
  while (rest.length > 0) {
    const startIdx = rest.indexOf(HW_WARNING_START);
    if (startIdx === -1) {
      chunks.push({ type: "markdown", content: rest });
      break;
    }
    if (startIdx > 0) {
      chunks.push({ type: "markdown", content: rest.slice(0, startIdx) });
    }
    rest = rest.slice(startIdx + HW_WARNING_START.length);
    const endIdx = rest.indexOf(HW_WARNING_END);
    if (endIdx === -1) {
      chunks.push({ type: "warning", bodyMd: rest.trim() });
      break;
    }
    chunks.push({ type: "warning", bodyMd: rest.slice(0, endIdx).trim() });
    rest = rest.slice(endIdx + HW_WARNING_END.length);
  }
  return chunks;
}
