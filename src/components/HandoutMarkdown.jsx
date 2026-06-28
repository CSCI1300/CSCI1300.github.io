import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  HANDOUT_ACTION_BODY_STYLE,
  HANDOUT_ACTION_LABEL_STYLE,
  HANDOUT_ACTION_SHELL_STYLE,
} from "../constants/handoutActionCalloutStyles.js";
import { splitHandoutActionSentinels } from "../lib/splitHandoutActionSentinels.js";
import { splitHandoutHintSentinels } from "../lib/splitHandoutHintSentinels.js";
import { splitHandoutWarningSentinels } from "../lib/splitHandoutWarningSentinels.js";

const DEFAULT_REHYPE_PLUGINS = [rehypeSlug];

function flattenActionAndHintChunks(markdown) {
  return splitHandoutActionSentinels(markdown ?? "").flatMap((chunk) =>
    chunk.type === "markdown" ? splitHandoutHintSentinels(chunk.content) : [chunk],
  );
}

function flattenHandoutChunks(markdown) {
  return splitHandoutWarningSentinels(markdown ?? "").flatMap((chunk) =>
    chunk.type === "markdown" ? flattenActionAndHintChunks(chunk.content) : [chunk],
  );
}

/**
 * Renders homework markdown, expanding:
 * - `<<<HW_WARNING>>>` … `<<<END_HW_WARNING>>>` into a critical red warning panel
 * - `<<<HW_ACTION>>>` … `<<<END_HW_ACTION>>>` into the action callout
 * - `<<<HINT>>>` … `<<<END_HINT>>>` into a yellow `<details>` hint panel
 */
export default function HandoutMarkdown({ markdown, mdComponents, rehypePlugins }) {
  const chunks = useMemo(() => flattenHandoutChunks(markdown ?? ""), [markdown]);
  const rp = rehypePlugins ?? DEFAULT_REHYPE_PLUGINS;

  return (
    <>
      {chunks.map((chunk, i) => {
        if (chunk.type === "markdown") {
          return (
            <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} rehypePlugins={rp} components={mdComponents}>
              {chunk.content}
            </ReactMarkdown>
          );
        }
        if (chunk.type === "warning") {
          return (
            <div
              key={i}
              className="c1300-hw-callout c1300-hw-callout--warning"
              data-handout-warning="1"
              role="alert"
              aria-label="Critical project requirement"
            >
              <p className="c1300-hw-callout__warning-label">Warning</p>
              <div className="c1300-hw-callout__body c1300-hw-callout__body--warning">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={rp} components={mdComponents}>
                  {chunk.bodyMd}
                </ReactMarkdown>
              </div>
            </div>
          );
        }
        if (chunk.type === "hint") {
          return (
            <details
              key={i}
              className="c1300-hw-callout c1300-hw-callout--hint"
              data-handout-hint="1"
              aria-label="Optional hints"
            >
              <summary className="c1300-hw-callout__hint-summary">Hints</summary>
              <div className="c1300-hw-callout__body c1300-hw-callout__body--hint">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={rp} components={mdComponents}>
                  {chunk.bodyMd}
                </ReactMarkdown>
              </div>
            </details>
          );
        }
        return (
          <div
            key={i}
            className="c1300-hw-callout c1300-hw-callout--action"
            style={HANDOUT_ACTION_SHELL_STYLE}
            data-handout-action="1"
            role="status"
            aria-label="Action required for this step"
          >
            <p className="c1300-hw-callout__label" style={HANDOUT_ACTION_LABEL_STYLE}>
              Action required
            </p>
            <div className="c1300-hw-callout__body" style={HANDOUT_ACTION_BODY_STYLE}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={rp} components={mdComponents}>
                {chunk.bodyMd}
              </ReactMarkdown>
            </div>
          </div>
        );
      })}
    </>
  );
}
