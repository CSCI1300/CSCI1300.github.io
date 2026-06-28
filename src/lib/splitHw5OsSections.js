const GIT_WIN = "<<<HANDOUT_HW5_GIT_WINDOWS>>>";
const GIT_MAC = "<<<HANDOUT_HW5_GIT_MAC>>>";
const GIT_TAIL = "<<<HANDOUT_HW5_GIT_TAIL>>>";
const SSH_WIN = "<<<HANDOUT_HW5_SSH_WINDOWS>>>";
const SSH_MAC = "<<<HANDOUT_HW5_SSH_MAC>>>";
const SSH_TAIL = "<<<HANDOUT_HW5_SSH_TAIL>>>";

/**
 * If `hw5.md` contains OS split sentinels, returns markdown segments for Windows vs Mac dropdowns.
 * Otherwise returns null (single-pass ReactMarkdown).
 */
export function splitHw5OsSections(text) {
  if (typeof text !== "string" || !text.includes(GIT_WIN)) return null;

  const [beforeGit, restAfterGitWin] = text.split(GIT_WIN);
  if (restAfterGitWin == null) return null;

  const [gitWindows, restAfterGitMac] = restAfterGitWin.split(GIT_MAC);
  if (restAfterGitMac == null) return null;

  const [gitMac, restAfterGitTail] = restAfterGitMac.split(GIT_TAIL);
  if (restAfterGitTail == null) return null;

  const [beforeSsh, restAfterSshWin] = restAfterGitTail.split(SSH_WIN);
  if (restAfterSshWin == null) return null;

  const [sshWindows, restAfterSshMac] = restAfterSshWin.split(SSH_MAC);
  if (restAfterSshMac == null) return null;

  const [sshMac, suffix] = restAfterSshMac.split(SSH_TAIL);
  if (suffix == null) return null;

  return {
    preamble: (beforeGit ?? "").trimEnd(),
    gitWindows: (gitWindows ?? "").trim(),
    gitMac: (gitMac ?? "").trim(),
    beforeSsh: (beforeSsh ?? "").trim(),
    sshWindows: (sshWindows ?? "").trim(),
    sshMac: (sshMac ?? "").trim(),
    suffix: (suffix ?? "").trimStart(),
  };
}
