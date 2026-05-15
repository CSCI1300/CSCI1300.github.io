export const HW_HINT_START = "<<<HINT>>>";
export const HW_HINT_END = "<<<END_HINT>>>";

/**
 * Split a markdown segment into normal markdown and optional-hint disclosure bodies.
 *
 * <<<HINT>>>
 * Markdown body (usually a short list)…
 * <<<END_HINT>>>
 */
export function splitHandoutHintSentinels(text) {
  if (typeof text !== "string" || !text.includes(HW_HINT_START)) {
    return [{ type: "markdown", content: text ?? "" }];
  }
  const chunks = [];
  let rest = text ?? "";
  while (rest.length > 0) {
    const startIdx = rest.indexOf(HW_HINT_START);
    if (startIdx === -1) {
      chunks.push({ type: "markdown", content: rest });
      break;
    }
    if (startIdx > 0) {
      chunks.push({ type: "markdown", content: rest.slice(0, startIdx) });
    }
    rest = rest.slice(startIdx + HW_HINT_START.length);
    const endIdx = rest.indexOf(HW_HINT_END);
    if (endIdx === -1) {
      chunks.push({ type: "hint", bodyMd: rest.trim() });
      break;
    }
    chunks.push({ type: "hint", bodyMd: rest.slice(0, endIdx).trim() });
    rest = rest.slice(endIdx + HW_HINT_END.length);
  }
  return chunks;
}
