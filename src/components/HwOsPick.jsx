import React from "react";
import rehypeSlug from "rehype-slug";
import HandoutMarkdown from "./HandoutMarkdown.jsx";

/**
 * Two native <details> panels so students open only Windows or Mac markdown for one topic (VS Code or debugger).
 */
export default function HwOsPick({
  windowsMd,
  macMd,
  groupLabel,
  windowsSummary,
  macSummary,
  mdComponents,
  windowsSlugPrefix = "hw-os-win-",
  macSlugPrefix = "hw-os-mac-",
  windowsPanelId,
  macPanelId,
}) {
  const winLabel = windowsSummary ?? "Windows";
  const macLabel = macSummary ?? "Mac";

  return (
    <div className="c1300-hw-os-pick" role="group" aria-label={groupLabel}>
      <details id={windowsPanelId} className="c1300-hw-os-pick__panel">
        <summary className="c1300-hw-os-pick__summary">{winLabel}</summary>
        <div className="c1300-hw-os-pick__body">
          <HandoutMarkdown
            markdown={windowsMd}
            mdComponents={mdComponents}
            rehypePlugins={[[rehypeSlug, { prefix: windowsSlugPrefix }]]}
          />
        </div>
      </details>
      <details id={macPanelId} className="c1300-hw-os-pick__panel">
        <summary className="c1300-hw-os-pick__summary">{macLabel}</summary>
        <div className="c1300-hw-os-pick__body">
          <HandoutMarkdown
            markdown={macMd}
            mdComponents={mdComponents}
            rehypePlugins={[[rehypeSlug, { prefix: macSlugPrefix }]]}
          />
        </div>
      </details>
    </div>
  );
}
