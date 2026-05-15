const VS_WIN = "<<<HANDOUT_HW1_VS_WINDOWS>>>";
const VS_MAC = "<<<HANDOUT_HW1_VS_MAC>>>";
const DBG_TITLE = "<<<HANDOUT_HW1_DBG_TITLE>>>";
const DBG_WIN = "<<<HANDOUT_HW1_DBG_WINDOWS>>>";
const DBG_MAC = "<<<HANDOUT_HW1_DBG_MAC>>>";
const TAIL = "<<<HANDOUT_HW1_TAIL>>>";

/**
 * If `hw1.md` contains OS split sentinels, returns markdown segments for Windows vs Mac dropdowns.
 * Otherwise returns null (single-pass ReactMarkdown).
 */
export function splitHw1OsSections(text) {
  if (typeof text !== "string" || !text.includes(VS_WIN)) return null;
  const parts = text.split(VS_WIN);
  const preamble = (parts[0] ?? "").trimEnd();
  const rest = parts[1];
  if (rest == null) return null;

  const [vsWin, a] = rest.split(VS_MAC);
  const [vsMac, b] = (a ?? "").split(DBG_TITLE);
  const [dbgTitle, c] = (b ?? "").split(DBG_WIN);
  const [dbgWin, d] = (c ?? "").split(DBG_MAC);
  const [dbgMac, e] = (d ?? "").split(TAIL);

  return {
    preamble: preamble.trimEnd(),
    vsWindows: (vsWin ?? "").trim(),
    vsMac: (vsMac ?? "").trim(),
    dbgTitle: (dbgTitle ?? "").trim(),
    dbgWindows: (dbgWin ?? "").trim(),
    dbgMac: (dbgMac ?? "").trim(),
    suffix: (e ?? "").trimStart(),
  };
}
