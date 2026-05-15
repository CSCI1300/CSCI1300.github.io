export const HW_ACTION_START = "<<<HW_ACTION>>>";
export const HW_ACTION_END = "<<<END_HW_ACTION>>>";

/**
 * Split homework markdown into alternating normal markdown and action callout bodies.
 * Hint blocks (`<<<HINT>>>` … `<<<END_HINT>>>`) are split in a second pass inside `HandoutMarkdown.jsx`.
 * In the `.md` file, wrap submission / “do this” text:
 *
 * <<<HW_ACTION>>>
 * Your **markdown** body…
 * <<<END_HW_ACTION>>>
 */
export function splitHandoutActionSentinels(text) {
  if (typeof text !== "string" || !text.includes(HW_ACTION_START)) {
    return [{ type: "markdown", content: text ?? "" }];
  }
  const chunks = [];
  let rest = text ?? "";
  while (rest.length > 0) {
    const startIdx = rest.indexOf(HW_ACTION_START);
    if (startIdx === -1) {
      chunks.push({ type: "markdown", content: rest });
      break;
    }
    if (startIdx > 0) {
      chunks.push({ type: "markdown", content: rest.slice(0, startIdx) });
    }
    rest = rest.slice(startIdx + HW_ACTION_START.length);
    const endIdx = rest.indexOf(HW_ACTION_END);
    if (endIdx === -1) {
      chunks.push({ type: "action", bodyMd: rest.trim() });
      break;
    }
    chunks.push({ type: "action", bodyMd: rest.slice(0, endIdx).trim() });
    rest = rest.slice(endIdx + HW_ACTION_END.length);
  }
  return chunks;
}
