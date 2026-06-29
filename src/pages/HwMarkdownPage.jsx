import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CHECKPOINT_HANDOUT_LINK_ENABLED_NUMBERS,
  HOMEWORK_HANDOUT_LINK_ENABLED_NUMBERS,
  HOMEWORK_HANDOUT_PREVIEW_ACCESS,
  OVERVIEW,
  PROJECT_HANDOUT_LINK_ENABLED,
  PROJECT_HANDOUT_PREVIEW_ACCESS,
} from "../config/courseConfig.js";
import HandoutMarkdown from "../components/HandoutMarkdown.jsx";
import HwOsPick from "../components/HwOsPick.jsx";
import { splitHw1OsSections } from "../lib/splitHw1OsSections.js";
import { splitHw5OsSections } from "../lib/splitHw5OsSections.js";
import { extractHomeworkHeadingToc, extractProjectHeadingToc } from "../lib/extractMarkdownHeadingToc.js";
import "../styles/hw-markdown.css";

const DEFAULT_TITLE = "CSCI 1300: Starting Computing";

function parseHwNum(raw) {
  if (raw == null || String(raw).trim() === "") return null;
  const n = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(n) || n < 1 || n > 99) return null;
  if (String(n) !== String(raw).trim()) return null;
  return n;
}

function handoutFileUrl(num) {
  let base = import.meta.env.BASE_URL || "/";
  if (!base.endsWith("/")) base += "/";
  return `${base}hw/hw${num}/hw${num}.md`;
}

function parseCheckpointNum(raw) {
  if (raw == null || String(raw).trim() === "") return null;
  const n = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(n) || n < 1 || n > 3) return null;
  if (String(n) !== String(raw).trim()) return null;
  return n;
}

function projectHandoutFileUrl() {
  let base = import.meta.env.BASE_URL || "/";
  if (!base.endsWith("/")) base += "/";
  return `${base}hw/project/final-proj.md`;
}

function projectCheckpointFileUrl(checkpointNum) {
  let base = import.meta.env.BASE_URL || "/";
  if (!base.endsWith("/")) base += "/";
  return `${base}hw/project/checkpoint-${checkpointNum}.md`;
}

function HwHandoutLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="c1300-hw-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt ? `Enlarged: ${alt}` : "Enlarged image"}
      onClick={onClose}
    >
      <p className="c1300-hw-lightbox__hint">Press Esc or click outside the image to close.</p>
      <button
        type="button"
        className="c1300-hw-lightbox__close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close image preview"
      >
        ×
      </button>
      <img
        src={src}
        alt={alt || ""}
        className="c1300-hw-lightbox__img"
        decoding="async"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function HwHandoutHeader({ heading, rail }) {
  return (
    <header className={rail ? "c1300-hw-handout-rail__header" : "c1300-hw-handout-top"}>
      <div className="c1300-hw-handout-brand">
        <img
          className="c1300-hw-handout-brand__glyph"
          src="/csci1300-theme/backpack.svg"
          width={40}
          height={40}
          alt=""
          decoding="async"
        />
        <div className="c1300-hw-handout-brand__text">
          <p className="c1300-hw-handout-brand__course">{OVERVIEW.title}</p>
          <p className="c1300-hw-handout-brand__term">{OVERVIEW.panelSub}</p>
          <h1 className="c1300-hw-handout-brand__title">{heading}</h1>
        </div>
      </div>
      <nav className="c1300-hw-handout-nav" aria-label="Course navigation">
        <Link to={{ pathname: "/", search: "?tab=assignments" }}>Assignments</Link>
        <span className="c1300-hw-handout-nav__sep" aria-hidden="true">
          ·
        </span>
        <Link to="/">Course home</Link>
      </nav>
    </header>
  );
}

function HwPreviewAccessForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("");

  return (
    <form
      className="c1300-hw-preview-access"
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) return;
        navigate(
          { pathname: location.pathname, search: `?access=${encodeURIComponent(trimmed)}` },
          { replace: true },
        );
      }}
    >
      <label className="c1300-hw-preview-access__label" htmlFor="c1300-hw-handout-access-input">
        Preview access code
      </label>
      <div className="c1300-hw-preview-access__row">
        <input
          id="c1300-hw-handout-access-input"
          className="c1300-hw-preview-access__input"
          type="password"
          name="access"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="c1300-hw-preview-access__btn">
          Open handout
        </button>
      </div>
    </form>
  );
}

function HwTocBranch({ nodes, isRoot }) {
  if (!nodes || nodes.length === 0) return null;
  const listClass = isRoot ? "c1300-hw-toc__list c1300-hw-toc__list--root" : "c1300-hw-toc__list c1300-hw-toc__sublist";
  return (
    <ul className={listClass}>
      {nodes.map((n) => (
        <li key={n.id}>
          {n.collapsible && n.children.length > 0 ? (
            <details className="c1300-hw-toc__details">
              <summary className="c1300-hw-toc__summary">
                <a
                  href={`#${n.id}`}
                  className="c1300-hw-toc__summary-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {n.title}
                </a>
              </summary>
              <HwTocBranch nodes={n.children} />
            </details>
          ) : (
            <>
              <a href={`#${n.id}`}>{n.title}</a>
              {n.children.length > 0 ? <HwTocBranch nodes={n.children} /> : null}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

function openHandoutHashTarget(hash) {
  const id = hash.replace(/^#/, "").trim();
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  document.querySelectorAll(".c1300-hw-toc__details").forEach((details) => {
    if (details.contains(el)) details.open = true;
  });
  if (el.tagName === "DETAILS") {
    el.open = true;
    return;
  }
  el.closest("details")?.setAttribute("open", "");
}

export default function HwMarkdownPage({ project = false, projectCheckpoint = false }) {
  const { hwNum, checkpointNum } = useParams();
  const num = useMemo(() => (project || projectCheckpoint ? null : parseHwNum(hwNum)), [project, projectCheckpoint, hwNum]);
  const checkpoint = useMemo(
    () => (projectCheckpoint ? parseCheckpointNum(checkpointNum) : null),
    [projectCheckpoint, checkpointNum],
  );
  const [phase, setPhase] = useState("loading");
  const [markdown, setMarkdown] = useState("");
  const [lightbox, setLightbox] = useState(null);

  const valid = project || checkpoint != null || num != null;
  const location = useLocation();
  const handoutLinkEnabled = useMemo(() => new Set(HOMEWORK_HANDOUT_LINK_ENABLED_NUMBERS), []);
  const checkpointLinkEnabled = useMemo(
    () => new Set(CHECKPOINT_HANDOUT_LINK_ENABLED_NUMBERS),
    [],
  );

  const accessParam = useMemo(() => {
    const q = new URLSearchParams(location.search);
    return q.get("access")?.trim() ?? "";
  }, [location.search]);

  const handoutUnlocked = useMemo(() => {
    if (!valid) return false;
    if (project) {
      if (PROJECT_HANDOUT_LINK_ENABLED) return true;
      const secret = PROJECT_HANDOUT_PREVIEW_ACCESS;
      if (typeof secret !== "string" || secret.length === 0) return false;
      return accessParam === secret;
    }
    if (checkpoint != null) {
      if (checkpointLinkEnabled.has(checkpoint)) return true;
      const secret = PROJECT_HANDOUT_PREVIEW_ACCESS;
      if (typeof secret !== "string" || secret.length === 0) return false;
      return accessParam === secret;
    }
    if (num == null) return false;
    if (handoutLinkEnabled.has(num)) return true;
    const secret = HOMEWORK_HANDOUT_PREVIEW_ACCESS[num];
    if (typeof secret !== "string" || secret.length === 0) return false;
    return accessParam === secret;
  }, [valid, project, checkpoint, num, handoutLinkEnabled, checkpointLinkEnabled, accessParam]);

  const tocTree = useMemo(() => {
    if (phase !== "ready" || !markdown) return [];
    if (project || checkpoint != null) return extractProjectHeadingToc(markdown);
    return extractHomeworkHeadingToc(markdown, num);
  }, [markdown, phase, num, project, checkpoint]);

  const showRail = phase === "ready" && tocTree.length > 0;

  const hw1Split = useMemo(() => {
    if (num !== 1 || !markdown) return null;
    return splitHw1OsSections(markdown);
  }, [num, markdown]);

  const hw5Split = useMemo(() => {
    if (num !== 5 || !markdown) return null;
    return splitHw5OsSections(markdown);
  }, [num, markdown]);

  useEffect(() => {
    if (phase !== "ready") return;
    openHandoutHashTarget(location.hash);
    const onHash = () => openHandoutHashTarget(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [phase, location.hash, markdown]);

  useEffect(() => {
    if (!valid) {
      setPhase("bad-id");
      return;
    }

    if (!handoutUnlocked) {
      const secret =
        project || checkpoint != null
          ? PROJECT_HANDOUT_PREVIEW_ACCESS
          : (HOMEWORK_HANDOUT_PREVIEW_ACCESS[num] ?? "");
      const previewConfigured = typeof secret === "string" && secret.length > 0;
      setPhase(previewConfigured ? "preview-locked" : "closed");
      setMarkdown("");
      return;
    }

    let cancelled = false;
    setPhase("loading");
    setMarkdown("");

    fetch(
      checkpoint != null
        ? projectCheckpointFileUrl(checkpoint)
        : project
          ? projectHandoutFileUrl()
          : handoutFileUrl(num),
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? "not-found" : `http-${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        setMarkdown(text);
        setPhase("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setPhase(err.message === "not-found" ? "not-found" : "error");
      });

    return () => {
      cancelled = true;
    };
  }, [num, project, checkpoint, valid, handoutUnlocked, accessParam]);

  useEffect(() => {
    if (!valid) {
      document.title = project
        ? `Final project · ${DEFAULT_TITLE}`
        : checkpoint != null
          ? `Final project checkpoint ${checkpoint} · ${DEFAULT_TITLE}`
          : `Homework · ${DEFAULT_TITLE}`;
      return;
    }
    document.title = project
      ? `Final project · ${DEFAULT_TITLE}`
      : checkpoint != null
        ? `Final project checkpoint ${checkpoint} · ${DEFAULT_TITLE}`
        : `Homework ${num} · ${DEFAULT_TITLE}`;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [num, project, checkpoint, valid]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const mdComponents = useMemo(
    () => ({
      a: ({ href, children, ...props }) => {
        const external = typeof href === "string" && /^https?:\/\//i.test(href);
        if (external) {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          );
        }
        return (
          <a href={href} {...props}>
            {children}
          </a>
        );
      },
      img: ({ src, alt, title, node: _node, width, height }) => {
        if (!src) return null;
        const label = alt || title || "Handout figure";
        return (
          <span className="c1300-hw-md-img-wrap">
            <button
              type="button"
              className="c1300-hw-md-img-btn"
              title="Click to enlarge"
              aria-label={`Enlarge: ${label}`}
              onClick={() => setLightbox({ src, alt: alt || title || "" })}
            >
              <img
                src={src}
                alt={alt || ""}
                className="c1300-hw-md-img"
                loading="lazy"
                decoding="async"
                {...(width != null ? { width } : {})}
                {...(height != null ? { height } : {})}
              />
            </button>
          </span>
        );
      },
    }),
    [setLightbox],
  );

  const heading = project
    ? "Final project"
    : checkpoint != null
      ? `Final project checkpoint ${checkpoint}`
      : num != null
        ? `Homework ${num}`
        : "Homework handout";

  return (
    <div className={`c1300-hw-handout-page${showRail ? " c1300-hw-handout-page--with-rail" : ""}`}>
      {showRail ? (
        <div className="c1300-hw-handout-rail" aria-label="Handout outline and course links">
          <HwHandoutHeader heading={heading} rail />
          <aside className="c1300-hw-toc-aside" aria-label="Section navigation">
            <nav className="c1300-hw-toc">
              <p className="c1300-hw-toc__label">On this page</p>
              <HwTocBranch nodes={tocTree} isRoot />
            </nav>
          </aside>
        </div>
      ) : (
        <HwHandoutHeader heading={heading} rail={false} />
      )}

      <main
        className={
          showRail ? "c1300-hw-handout-main c1300-hw-handout-main--with-fixed-toc" : "c1300-hw-handout-main"
        }
      >
        {!valid && (
          <p className="c1300-hw-handout-lede" role="alert">
            That handout link is not valid. Use the Assignments tab — links look like{" "}
            <code className="c1300-hw-handout-code">/hw/1</code>, <code className="c1300-hw-handout-code">/hw/2</code>
            , and so on.
          </p>
        )}

        {valid && phase === "loading" && handoutUnlocked && <p className="c1300-hw-handout-lede">Loading handout…</p>}

        {valid && phase === "closed" && (
          <p className="c1300-hw-handout-lede" role="status">
            {project || checkpoint != null
              ? "The final project handout is not linked on the Assignments page yet."
              : "This homework handout is not linked on the Assignments page yet."}
          </p>
        )}

        {valid && phase === "preview-locked" && (
          <div className="c1300-hw-preview-locked">
            <p className="c1300-hw-handout-lede" role="status">
              {project || checkpoint != null
                ? "This project handout is hidden on the Assignments tab. Enter the access code to view it."
                : "This handout is hidden on the Assignments tab. Enter the access code to view it."}
            </p>
            {accessParam ? (
              <p className="c1300-hw-handout-lede c1300-hw-preview-locked__hint" role="status">
                That access value did not match. 
              </p>
            ) : null}
            <HwPreviewAccessForm />
          </div>
        )}

        {valid && phase === "not-found" && (
          <p className="c1300-hw-handout-lede" role="status">
            {project || checkpoint != null
              ? "This project handout is not posted yet. Check back after it is announced in class."
              : "This handout is not posted yet. Check back after it is announced in class, or confirm the homework number in the assignment schedule."}
          </p>
        )}

        {valid && phase === "error" && (
          <p className="c1300-hw-handout-lede" role="alert">
            We could not load this handout (network or server error). Refresh the page or try again later.
          </p>
        )}

        {valid && phase === "ready" && (
          <div
            className={
              showRail ? "c1300-hw-handout-layout" : "c1300-hw-handout-layout c1300-hw-handout-layout--solo"
            }
          >
            <div className="c1300-hw-handout-doc">
              <article className="c1300-hw-markdown__body">
                {hw1Split ? (
                  <>
                    <HandoutMarkdown markdown={hw1Split.preamble} mdComponents={mdComponents} />
                    <HwOsPick
                      groupLabel="VS Code and compiler setup"
                      windowsSummary="Windows (VS Code, MinGW, extensions)"
                      macSummary="Mac (VS Code, g++)"
                      windowsMd={hw1Split.vsWindows}
                      macMd={hw1Split.vsMac}
                      mdComponents={mdComponents}
                      windowsSlugPrefix="hw1-vscode-win-"
                      macSlugPrefix="hw1-vscode-mac-"
                    />
                    <HandoutMarkdown markdown={hw1Split.dbgTitle} mdComponents={mdComponents} />
                    <HwOsPick
                      groupLabel="Debugger setup"
                      windowsSummary="Windows (gdb)"
                      macSummary="Mac (lldb, CodeLLDB)"
                      windowsMd={hw1Split.dbgWindows}
                      macMd={hw1Split.dbgMac}
                      mdComponents={mdComponents}
                      windowsSlugPrefix="hw1-dbg-win-"
                      macSlugPrefix="hw1-dbg-mac-"
                    />
                    <HandoutMarkdown markdown={hw1Split.suffix} mdComponents={mdComponents} />
                  </>
                ) : hw5Split ? (
                  <>
                    <HandoutMarkdown markdown={hw5Split.preamble} mdComponents={mdComponents} />
                    <HwOsPick
                      groupLabel="Install Git"
                      windowsSummary="Windows"
                      macSummary="Mac"
                      windowsMd={hw5Split.gitWindows}
                      macMd={hw5Split.gitMac}
                      mdComponents={mdComponents}
                      windowsSlugPrefix="hw5-git-win-"
                      macSlugPrefix="hw5-git-mac-"
                      windowsPanelId="hw5-git-win"
                      macPanelId="hw5-git-mac"
                    />
                    <HandoutMarkdown markdown={hw5Split.beforeSsh} mdComponents={mdComponents} />
                    <HwOsPick
                      groupLabel="Create an SSH key"
                      windowsSummary="Windows"
                      macSummary="Mac"
                      windowsMd={hw5Split.sshWindows}
                      macMd={hw5Split.sshMac}
                      mdComponents={mdComponents}
                      windowsSlugPrefix="hw5-ssh-win-"
                      macSlugPrefix="hw5-ssh-mac-"
                      windowsPanelId="hw5-ssh-win"
                      macPanelId="hw5-ssh-mac"
                    />
                    <HandoutMarkdown markdown={hw5Split.suffix} mdComponents={mdComponents} />
                  </>
                ) : (
                  <HandoutMarkdown markdown={markdown} mdComponents={mdComponents} />
                )}
              </article>
            </div>
          </div>
        )}
      </main>
      {lightbox && <HwHandoutLightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}
    </div>
  );
}
