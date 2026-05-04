import React, { useCallback, useEffect, useMemo, useState } from "react";

import { supabase, supabaseConfigured } from "../lib/supabaseClient.js";
import {
  ANIM_SET_OPTIONS,
  AVATAR_BACKDROP_OPTIONS,
  BASE_OPTIONS,
  backdropGradientForId,
  buildBaseComposition,
  CELL,
  EYE_OPTIONS,
  HAIR_COLOR_OPTIONS,
  HAIR_LENGTH_OPTIONS,
  isValidAnimSet,
  isValidBackdropId,
  isValidBaseId,
  isValidEyeId,
  isValidHairColor,
  isValidHairLength,
  isValidPantsId,
  isValidTopColor,
  layoutForAnimSet,
  OUTFIT_COLOR_PRESETS,
  PALETTE_SAMPLES,
  PANTS_OPTIONS,
  TOP_OPTIONS,
} from "../data/cozyBaseAssets.js";

const STORAGE_KEY = "csci1300-meet-the-class-v1";
const MAX_IDENTIKEY_LEN = 64;

function normalizeIdentiKey(raw) {
  return String(raw ?? "")
    .trim()
    .toLowerCase()
    .slice(0, MAX_IDENTIKEY_LEN);
}
const WIZARD_PREVIEW_SCALE = 6.5;
const HERO_CARD_SPRITE_SCALE = 4.25;
const THUMB_SCALE = 2.85;
const BOARD_SPRITE_SCALE = 5.25;
const POSE_PREVIEW_SCALE = 3.25;

const BUILDER_STEPS = [
  { id: "sheet", label: "Motion" },
  { id: "skin", label: "Skin" },
  { id: "pants", label: "Pants" },
  { id: "top", label: "Top" },
  { id: "eyes", label: "Eyes" },
  { id: "hairLength", label: "Hair length" },
  { id: "hairColor", label: "Hair color" },
  { id: "outfit", label: "Outfit color" },
  { id: "backdrop", label: "Backdrop" },
  { id: "pose", label: "Pose" },
];

const HUE_MIN = -120;
const HUE_MAX = 120;
const SAT_MIN = 0;
const SAT_MAX = 200;
const BRIGHT_MIN = 60;
const BRIGHT_MAX = 140;
const LOOP_FRAME_COUNT = 4;
const DEFAULT_PLAY_LOOPS = 3;
const PLAY_STEP_MS = 240;

const OUTFIT_COLOR_DEFAULTS = {
  pantsHue: 0,
  pantsSat: 100,
  pantsBright: 100,
  topHue: 0,
  topSat: 100,
  topBright: 100,
  hairHue: 0,
  hairSat: 100,
  hairBright: 100,
};

const DEFAULT_PROFILE = {
  displayName: "",
  email: "",
  pronouns: "",
  bio: "",
  studyGroup: "",
  section: "",
  extra: "",
  animSet: "idle",
  baseId: "03",
  pantsId: "blue",
  topColor: "blue",
  eyeId: "blue",
  hairLength: "short",
  hairColor: "red",
  ...OUTFIT_COLOR_DEFAULTS,
  backdropId: "blue",
  frameCol: 0,
  frameRow: 0,
};

function computeAnimatedCol(baseCol, tick, animSet, sheetCols) {
  const cols = Math.max(1, Number(sheetCols) || 1);
  const cycleCols = animSet === "walk" ? Math.min(4, cols) : Math.min(2, cols);
  const count = Math.max(1, cycleCols);
  const base = ((Number(baseCol) || 0) % count + count) % count;
  const step = Math.max(0, Number(tick) || 0);
  return (base + (step % count)) % count;
}

function clampHueDeg(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(HUE_MIN, Math.min(HUE_MAX, Math.round(n)));
}

function clampSatPct(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 100;
  return Math.max(SAT_MIN, Math.min(SAT_MAX, Math.round(n)));
}

function clampBrightPct(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 100;
  return Math.max(BRIGHT_MIN, Math.min(BRIGHT_MAX, Math.round(n)));
}

const LAYER_TO_FILTER = { bottom: "pants", top: "top", hair: "hair" };

function filterCssForLayerKey(key, profile) {
  const prefix = LAYER_TO_FILTER[key];
  if (!prefix) return undefined;
  const hue = clampHueDeg(profile[`${prefix}Hue`]);
  const sat = clampSatPct(profile[`${prefix}Sat`]);
  const bright = clampBrightPct(profile[`${prefix}Bright`]);
  if (hue === 0 && sat === 100 && bright === 100) return undefined;
  const parts = [];
  if (hue !== 0) parts.push(`hue-rotate(${hue}deg)`);
  parts.push(`saturate(${sat}%)`);
  parts.push(`brightness(${bright}%)`);
  return parts.join(" ");
}

function layersWithFilters(layers, profile) {
  return layers.map((l) => ({
    ...l,
    filterCss: filterCssForLayerKey(l.key, profile),
  }));
}

function mergeStoredProfile(raw) {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_PROFILE };
  const m = { ...DEFAULT_PROFILE, ...raw };
  m.animSet = isValidAnimSet(m.animSet) ? m.animSet : "idle";
  m.pantsHue = clampHueDeg(m.pantsHue);
  m.pantsSat = clampSatPct(m.pantsSat);
  m.pantsBright = clampBrightPct(m.pantsBright);
  m.topHue = clampHueDeg(m.topHue);
  m.topSat = clampSatPct(m.topSat);
  m.topBright = clampBrightPct(m.topBright);
  m.hairHue = clampHueDeg(m.hairHue);
  m.hairSat = clampSatPct(m.hairSat);
  m.hairBright = clampBrightPct(m.hairBright);
  m.backdropId = isValidBackdropId(m.backdropId) ? m.backdropId : "blue";
  delete m.skinHue;
  delete m.skinSat;
  delete m.skinBright;
  delete m.identikey;
  return m;
}

function profileForInsert(p) {
  const m = mergeStoredProfile(p);
  const clampStr = (s, max) => String(s ?? "").slice(0, max);
  const animSet = isValidAnimSet(m.animSet) ? m.animSet : "idle";
  const { gridCols, gridRows } = layoutForAnimSet(animSet);
  const fc = Math.max(0, Math.min(gridCols - 1, Number(m.frameCol) || 0));
  const fr = Math.max(0, Math.min(gridRows - 1, Number(m.frameRow) || 0));
  return {
    displayName: clampStr(m.displayName, 200),
    email: clampStr(m.email, 200),
    pronouns: clampStr(m.pronouns, 120),
    bio: clampStr(m.bio, 4000),
    studyGroup: clampStr(m.studyGroup, 4000),
    section: ["", "300", "830"].includes(m.section) ? m.section : "",
    extra: clampStr(m.extra, 4000),
    animSet,
    baseId: isValidBaseId(m.baseId) ? m.baseId : "03",
    pantsId: isValidPantsId(m.pantsId) ? m.pantsId : "blue",
    topColor: isValidTopColor(m.topColor) ? m.topColor : "blue",
    eyeId: isValidEyeId(m.eyeId) ? m.eyeId : "blue",
    hairLength: isValidHairLength(m.hairLength) ? m.hairLength : "short",
    hairColor: isValidHairColor(m.hairColor) ? m.hairColor : "red",
    pantsHue: clampHueDeg(m.pantsHue),
    pantsSat: clampSatPct(m.pantsSat),
    pantsBright: clampBrightPct(m.pantsBright),
    topHue: clampHueDeg(m.topHue),
    topSat: clampSatPct(m.topSat),
    topBright: clampBrightPct(m.topBright),
    hairHue: clampHueDeg(m.hairHue),
    hairSat: clampSatPct(m.hairSat),
    hairBright: clampBrightPct(m.hairBright),
    backdropId: isValidBackdropId(m.backdropId) ? m.backdropId : "blue",
    frameCol: fc,
    frameRow: fr,
  };
}

function SheetLayer({ src, col, row, sheetW, sheetH, scale, filterCss }) {
  const w = CELL * scale;
  const h = CELL * scale;
  return (
    <div
      className="c1300-sprite-layer"
      aria-hidden="true"
      style={{
        width: w,
        height: h,
        backgroundImage: `url(${src})`,
        backgroundSize: `${sheetW * scale}px ${sheetH * scale}px`,
        backgroundPosition: `${-col * CELL * scale}px ${-row * CELL * scale}px`,
        imageRendering: "pixelated",
        filter: filterCss || undefined,
      }}
    />
  );
}

function BaseCharacterStack({
  layers,
  sheetW,
  sheetH,
  col,
  row,
  scale,
  className,
  role,
  "aria-label": ariaLabel,
}) {
  const px = CELL * scale;
  return (
    <div
      className={className ?? "c1300-classmates__stack"}
      role={role}
      aria-label={ariaLabel}
      style={{
        width: px,
        height: px,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {layers.map((l) => (
        <SheetLayer
          key={l.key}
          src={l.src}
          col={col}
          row={row}
          sheetW={sheetW}
          sheetH={sheetH}
          scale={scale}
          filterCss={l.filterCss}
        />
      ))}
    </div>
  );
}

function ChoiceTile({ selected, onClick, label, children, compact }) {
  return (
    <button
      type="button"
      className={`c1300-classmates__choice c1300-classmates__choice--icon-only${compact ? " c1300-classmates__choice--compact" : ""}${selected ? " c1300-classmates__choice--selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
    >
      <span className="c1300-classmates__choice-thumb">{children}</span>
    </button>
  );
}

function PostedClassmateCard({ profile: raw }) {
  const p = mergeStoredProfile(raw);
  const [cardAnimTick, setCardAnimTick] = useState(0);
  const [cardAnimStepsRemaining, setCardAnimStepsRemaining] = useState(0);
  const isCardAnimating = cardAnimStepsRemaining > 0;
  const backdropStyle = useMemo(
    () => ({ background: backdropGradientForId(p.backdropId) }),
    [p.backdropId],
  );
  const composition = useMemo(() => buildBaseComposition(p), [
    p.animSet,
    p.baseId,
    p.pantsId,
    p.topColor,
    p.eyeId,
    p.hairLength,
    p.hairColor,
  ]);
  const displayLayers = useMemo(
    () => layersWithFilters(composition.layers, p),
    [
      composition.layers,
      p.pantsHue,
      p.pantsSat,
      p.pantsBright,
      p.topHue,
      p.topSat,
      p.topBright,
      p.hairHue,
      p.hairSat,
      p.hairBright,
    ],
  );
  const animatedCol = useMemo(() => {
    const cols = Math.max(1, composition.gridCols || Math.floor(composition.sheetW / CELL) || 1);
    return computeAnimatedCol(p.frameCol, cardAnimTick, p.animSet, cols);
  }, [composition.gridCols, composition.sheetW, p.frameCol, p.animSet, cardAnimTick]);

  useEffect(() => {
    if (!isCardAnimating) return undefined;
    const t = window.setTimeout(() => {
      setCardAnimTick((n) => n + 1);
      setCardAnimStepsRemaining((n) => Math.max(0, n - 1));
    }, PLAY_STEP_MS);
    return () => window.clearTimeout(t);
  }, [isCardAnimating, cardAnimStepsRemaining]);

  const playCardMotionLoop = useCallback(() => {
    setCardAnimTick(0);
    setCardAnimStepsRemaining(DEFAULT_PLAY_LOOPS * LOOP_FRAME_COUNT);
  }, []);

  return (
    <article className="c1300-classmates__card c1300-classmates__card--posted">
      <div className="c1300-classmates__card-sprite">
        <div
          className="c1300-sprite-maker__preview-wrap c1300-classmates__card-sprite-inner c1300-classmates__portrait-wrap c1300-classmates__sprite-stage"
          style={backdropStyle}
        >
          <BaseCharacterStack
            className="c1300-sprite-maker__stack c1300-classmates__stack"
            role="img"
            aria-label={`${p.displayName || "Classmate"} character`}
            layers={displayLayers}
            sheetW={composition.sheetW}
            sheetH={composition.sheetH}
            col={animatedCol}
            row={p.frameRow}
            scale={BOARD_SPRITE_SCALE}
          />
        </div>
      </div>
      <div className="c1300-classmates__card-body">
        <p className="c1300-classmates__card-name">{p.displayName.trim() || "Anonymous"}</p>
        {p.pronouns.trim() ? <p className="c1300-classmates__card-meta">{p.pronouns}</p> : null}
        {p.email.trim() ? (
          <p className="c1300-classmates__card-email">
            <a href={`mailto:${p.email.trim()}`}>{p.email.trim()}</a>
          </p>
        ) : null}
        {p.section ? <p className="c1300-classmates__card-meta">Section {p.section}</p> : null}
        <div className="c1300-classmates__playback-controls c1300-classmates__playback-controls--compact">
          <button
            type="button"
            className="c1300-classmates__playback-btn c1300-classmates__btn-secondary"
            onClick={playCardMotionLoop}
            disabled={isCardAnimating}
          >
            {isCardAnimating ? "Playing..." : "Play"}
          </button>
        </div>
        {p.bio.trim() ? <p className="c1300-classmates__card-bio">{p.bio.trim()}</p> : null}
        {p.studyGroup.trim() ? (
          <div className="c1300-classmates__card-study">
            <span className="c1300-classmates__card-study-label">Study / collab</span>
            {p.studyGroup.trim()}
          </div>
        ) : null}
        {p.extra.trim() ? <p className="c1300-classmates__card-extra">{p.extra.trim()}</p> : null}
      </div>
    </article>
  );
}

export default function MeetTheClassPanel() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [builderStep, setBuilderStep] = useState(0);
  const [builderAnimTick, setBuilderAnimTick] = useState(0);
  const [previewAnimTick, setPreviewAnimTick] = useState(0);
  const [previewAnimStepsRemaining, setPreviewAnimStepsRemaining] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");
  const [boardRows, setBoardRows] = useState([]);
  const [boardLoading, setBoardLoading] = useState(false);
  const [boardError, setBoardError] = useState("");
  const [publishBusy, setPublishBusy] = useState(false);
  const [publishOk, setPublishOk] = useState("");
  const [publishErr, setPublishErr] = useState("");
  /** Required to post; stored in DB for instructors only, not on the public board API. */
  const [identiKey, setIdentiKey] = useState("");
  const [deleteIdentiKey, setDeleteIdentiKey] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteOk, setDeleteOk] = useState("");
  const [deleteErr, setDeleteErr] = useState("");

  const portraitPick = useMemo(
    () => ({
      animSet: profile.animSet,
      baseId: profile.baseId,
      pantsId: profile.pantsId,
      topColor: profile.topColor,
      eyeId: profile.eyeId,
      hairLength: profile.hairLength,
      hairColor: profile.hairColor,
      pantsHue: profile.pantsHue,
      pantsSat: profile.pantsSat,
      pantsBright: profile.pantsBright,
      topHue: profile.topHue,
      topSat: profile.topSat,
      topBright: profile.topBright,
      hairHue: profile.hairHue,
      hairSat: profile.hairSat,
      hairBright: profile.hairBright,
      backdropId: profile.backdropId,
    }),
    [
      profile.animSet,
      profile.baseId,
      profile.pantsId,
      profile.topColor,
      profile.eyeId,
      profile.hairLength,
      profile.hairColor,
      profile.pantsHue,
      profile.pantsSat,
      profile.pantsBright,
      profile.topHue,
      profile.topSat,
      profile.topBright,
      profile.hairHue,
      profile.hairSat,
      profile.hairBright,
      profile.backdropId,
    ],
  );

  const backdropStyle = useMemo(
    () => ({ background: backdropGradientForId(profile.backdropId) }),
    [profile.backdropId],
  );

  const composition = useMemo(() => buildBaseComposition(portraitPick), [portraitPick]);

  const displayLayers = useMemo(
    () => layersWithFilters(composition.layers, profile),
    [
      composition.layers,
      profile.pantsHue,
      profile.pantsSat,
      profile.pantsBright,
      profile.topHue,
      profile.topSat,
      profile.topBright,
      profile.hairHue,
      profile.hairSat,
      profile.hairBright,
    ],
  );
  const animatedBuilderCol = useMemo(() => {
    const cols = Math.max(1, composition.gridCols || Math.floor(composition.sheetW / CELL) || 1);
    return computeAnimatedCol(profile.frameCol, builderAnimTick, profile.animSet, cols);
  }, [composition.gridCols, composition.sheetW, profile.frameCol, profile.animSet, builderAnimTick]);
  const animatedCardPreviewCol = useMemo(() => {
    const cols = Math.max(1, composition.gridCols || Math.floor(composition.sheetW / CELL) || 1);
    return computeAnimatedCol(profile.frameCol, previewAnimTick, profile.animSet, cols);
  }, [composition.gridCols, composition.sheetW, profile.frameCol, profile.animSet, previewAnimTick]);

  useEffect(() => {
    if (!hydrated) return;
    const { gridCols, gridRows } = layoutForAnimSet(profile.animSet);
    setProfile((p) => {
      const fc = Math.min(gridCols - 1, Math.max(0, Number(p.frameCol) || 0));
      const fr = Math.min(gridRows - 1, Math.max(0, Number(p.frameRow) || 0));
      if (fc === p.frameCol && fr === p.frameRow) return p;
      return { ...p, frameCol: fc, frameRow: fr };
    });
  }, [hydrated, profile.animSet]);

  const loadBoard = useCallback(async () => {
    if (!supabase) return;
    setBoardLoading(true);
    setBoardError("");
    const { data, error } = await supabase
      .from("class_profiles_board")
      .select("id, profile")
      .order("created_at", { ascending: false });
    setBoardLoading(false);
    if (error) {
      setBoardError(error.message);
      setBoardRows([]);
      return;
    }
    setBoardRows(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    if (supabaseConfigured) loadBoard();
  }, [loadBoard]);

  useEffect(() => {
    if (!supabaseConfigured) return undefined;
    const onVisible = () => {
      if (document.visibilityState === "visible") loadBoard();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [loadBoard]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProfile((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
  }, [profile, hydrated]);

  const setField = (key) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProfile((p) => ({ ...p, [key]: v }));
  };

  const setOutfitNum = (key) => (e) => {
    setProfile((p) => ({ ...p, [key]: Number(e.target.value) }));
  };

  const buildExportText = useCallback(() => {
    const meta = [
      `Name: ${profile.displayName.trim() || "—"}`,
      `Email: ${profile.email.trim() || "—"}`,
      `Pronouns: ${profile.pronouns.trim() || "—"}`,
      profile.section ? `Section: ${profile.section}` : null,
    ].filter(Boolean);
    const chunks = [meta.join("\n")];
    if (profile.bio.trim()) chunks.push(profile.bio.trim());
    chunks.push(`Study / collab: ${profile.studyGroup.trim() || "—"}`);
    if (profile.extra?.trim()) chunks.push(profile.extra.trim());
    return chunks.join("\n\n");
  }, [profile]);

  const handleCopy = async () => {
    const text = buildExportText();
    try {
      await navigator.clipboard.writeText(text);
      setCopyMsg("Copied.");
    } catch {
      setCopyMsg("Couldn’t copy.");
    }
    setTimeout(() => setCopyMsg(""), 3500);
  };

  const clearSaved = () => {
    if (window.confirm("Clear your saved card?")) {
      setProfile(DEFAULT_PROFILE);
      setBuilderStep(0);
      setIdentiKey("");
      setDeleteIdentiKey("");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  };

  const handlePublish = async () => {
    if (!supabase) return;
    if (!profile.displayName.trim()) {
      setPublishErr("Add a name to post.");
      setPublishOk("");
      return;
    }
    const ik = normalizeIdentiKey(identiKey);
    if (!ik) {
      setPublishErr("Enter your IdentiKey to post.");
      setPublishOk("");
      return;
    }
    setPublishBusy(true);
    setPublishErr("");
    setPublishOk("");
    const payload = profileForInsert(profile);
    const { error } = await supabase.rpc("upsert_class_profile", {
      p_identikey: ik,
      p_profile: payload,
    });
    setPublishBusy(false);
    if (error) {
      setPublishErr(error.message);
      return;
    }
    setIdentiKey("");
    setPublishOk("Your board card is saved.");
    await loadBoard();
    setTimeout(() => setPublishOk(""), 6000);
  };

  const handleDeleteFromBoard = async () => {
    if (!supabase) return;
    const k = normalizeIdentiKey(deleteIdentiKey);
    if (!k) {
      setDeleteErr("Enter the IdentiKey for the card you want removed.");
      setDeleteOk("");
      return;
    }
    if (!window.confirm("Remove the board card for this IdentiKey? This cannot be undone.")) return;
    setDeleteBusy(true);
    setDeleteErr("");
    setDeleteOk("");
    const { data, error } = await supabase.rpc("delete_class_profile_by_identikey", {
      p_identikey: k,
    });
    setDeleteBusy(false);
    if (error) {
      setDeleteErr(error.message);
      return;
    }
    const n = data == null ? 0 : Number(data);
    if (!Number.isFinite(n) || n < 1) {
      setDeleteErr("No card found for that IdentiKey.");
      return;
    }
    setDeleteIdentiKey("");
    setDeleteOk("That card was removed.");
    await loadBoard();
    setTimeout(() => {
      setDeleteOk("");
      setDeleteErr("");
    }, 6000);
  };

  const { gridCols, gridRows } = layoutForAnimSet(profile.animSet);

  const poseCells = useMemo(() => {
    const out = [];
    for (let r = 0; r < gridRows; r += 1) {
      for (let c = 0; c < gridCols; c += 1) {
        out.push({ c, r, key: `${c}-${r}` });
      }
    }
    return out;
  }, [gridCols, gridRows]);

  const thumbStack = (overrides, frameOverride = null) => {
    const pick = { ...portraitPick, ...overrides };
    const comp = buildBaseComposition(pick);
    const layers = layersWithFilters(comp.layers, pick);
    const col = frameOverride?.col ?? profile.frameCol;
    const row = frameOverride?.row ?? profile.frameRow;
    return (
      <BaseCharacterStack
        layers={layers}
        sheetW={comp.sheetW}
        sheetH={comp.sheetH}
        col={col}
        row={row}
        scale={THUMB_SCALE}
      />
    );
  };

  const builderStepMax = BUILDER_STEPS.length - 1;
  const builderStepId = BUILDER_STEPS[builderStep].id;
  const isPreviewAnimating = previewAnimStepsRemaining > 0;

  useEffect(() => {
    const t = window.setInterval(() => {
      setBuilderAnimTick((n) => n + 1);
    }, PLAY_STEP_MS);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (!isPreviewAnimating) return undefined;
    const t = window.setTimeout(() => {
      setPreviewAnimTick((n) => n + 1);
      setPreviewAnimStepsRemaining((n) => Math.max(0, n - 1));
    }, PLAY_STEP_MS);
    return () => window.clearTimeout(t);
  }, [isPreviewAnimating, previewAnimStepsRemaining]);

  const playPreviewMotionLoop = useCallback(() => {
    setPreviewAnimTick(0);
    setPreviewAnimStepsRemaining(DEFAULT_PLAY_LOOPS * LOOP_FRAME_COUNT);
  }, []);

  function renderWizardStep() {
    switch (builderStepId) {
      case "sheet":
        return (
          <>
            <div className="c1300-classmates__choice-row">
              {ANIM_SET_OPTIONS.map((opt) => (
                <ChoiceTile
                  key={opt.id}
                  selected={profile.animSet === opt.id}
                  onClick={() =>
                    setProfile((p) => ({
                      ...p,
                      animSet: opt.id,
                      frameCol: 0,
                      frameRow: 0,
                    }))
                  }
                  label={opt.label}
                >
                  <div className="c1300-classmates__thumb-clip c1300-classmates__thumb-clip--portrait" style={backdropStyle}>
                    {thumbStack(
                      { animSet: opt.id },
                      {
                        col: computeAnimatedCol(0, builderAnimTick, opt.id, opt.id === "walk" ? 4 : 2),
                        row: 0,
                      },
                    )}
                  </div>
                </ChoiceTile>
              ))}
            </div>
          </>
        );
      case "skin":
        return (
          <div className="c1300-classmates__choice-row c1300-classmates__choice-row--scroll">
            {BASE_OPTIONS.map((opt) => (
              <ChoiceTile
                key={opt.id}
                compact
                selected={profile.baseId === opt.id}
                onClick={() => setProfile((p) => ({ ...p, baseId: opt.id }))}
                label={opt.label}
              >
                <div className="c1300-classmates__thumb-clip c1300-classmates__thumb-clip--portrait" style={backdropStyle}>
                  {thumbStack({ baseId: opt.id })}
                </div>
              </ChoiceTile>
            ))}
          </div>
        );
      case "pants":
        return (
          <div className="c1300-classmates__choice-row">
            {PANTS_OPTIONS.map((opt) => (
              <ChoiceTile
                key={opt.id}
                selected={profile.pantsId === opt.id}
                onClick={() => setProfile((p) => ({ ...p, pantsId: opt.id }))}
                label={opt.label}
              >
                <div className="c1300-classmates__thumb-clip c1300-classmates__thumb-clip--portrait" style={backdropStyle}>
                  {thumbStack({ pantsId: opt.id })}
                </div>
              </ChoiceTile>
            ))}
          </div>
        );
      case "top":
        return (
          <div className="c1300-classmates__choice-row c1300-classmates__choice-row--scroll">
            {TOP_OPTIONS.map((opt) => (
              <ChoiceTile
                key={opt.id}
                compact
                selected={profile.topColor === opt.id}
                onClick={() => setProfile((p) => ({ ...p, topColor: opt.id }))}
                label={opt.label}
              >
                <div className="c1300-classmates__thumb-clip c1300-classmates__thumb-clip--portrait" style={backdropStyle}>
                  {thumbStack({ topColor: opt.id })}
                </div>
              </ChoiceTile>
            ))}
          </div>
        );
      case "eyes":
        return (
          <div className="c1300-classmates__choice-row c1300-classmates__choice-row--scroll">
            {EYE_OPTIONS.map((opt) => (
              <ChoiceTile
                key={opt.id}
                compact
                selected={profile.eyeId === opt.id}
                onClick={() => setProfile((p) => ({ ...p, eyeId: opt.id }))}
                label={opt.label}
              >
                <div className="c1300-classmates__thumb-clip c1300-classmates__thumb-clip--portrait" style={backdropStyle}>
                  {thumbStack({ eyeId: opt.id })}
                </div>
              </ChoiceTile>
            ))}
          </div>
        );
      case "hairLength":
        return (
          <div className="c1300-classmates__choice-row">
            {HAIR_LENGTH_OPTIONS.map((opt) => (
              <ChoiceTile
                key={opt.id}
                selected={profile.hairLength === opt.id}
                onClick={() => setProfile((p) => ({ ...p, hairLength: opt.id }))}
                label={opt.label}
              >
                <div className="c1300-classmates__thumb-clip c1300-classmates__thumb-clip--portrait" style={backdropStyle}>
                  {thumbStack({ hairLength: opt.id })}
                </div>
              </ChoiceTile>
            ))}
          </div>
        );
      case "hairColor":
        return (
          <div className="c1300-classmates__choice-row c1300-classmates__choice-row--scroll">
            {HAIR_COLOR_OPTIONS.map((opt) => (
              <ChoiceTile
                key={opt.id}
                compact
                selected={profile.hairColor === opt.id}
                onClick={() => setProfile((p) => ({ ...p, hairColor: opt.id }))}
                label={opt.label}
              >
                <div className="c1300-classmates__thumb-clip c1300-classmates__thumb-clip--portrait" style={backdropStyle}>
                  {thumbStack({ hairColor: opt.id })}
                </div>
              </ChoiceTile>
            ))}
          </div>
        );
      case "outfit":
        return (
          <>
            <div className="c1300-classmates__preset-row" role="group" aria-label="Presets">
              {OUTFIT_COLOR_PRESETS.map((pr) => (
                <button
                  key={pr.id}
                  type="button"
                  className="c1300-classmates__preset-chip c1300-classmates__btn-secondary"
                  onClick={() =>
                    setProfile((p) => ({
                      ...p,
                      pantsHue: pr.pantsHue,
                      pantsSat: pr.pantsSat,
                      pantsBright: pr.pantsBright,
                      topHue: pr.topHue,
                      topSat: pr.topSat,
                      topBright: pr.topBright,
                      hairHue: pr.hairHue,
                      hairSat: pr.hairSat,
                      hairBright: pr.hairBright,
                    }))
                  }
                >
                  {pr.label}
                </button>
              ))}
            </div>
            <div className="c1300-classmates__outfit-layers">
              {[
                { prefix: "pants", title: "Pants" },
                { prefix: "top", title: "Top" },
                { prefix: "hair", title: "Hair" },
              ].map(({ prefix, title }) => (
                <div key={prefix} className="c1300-classmates__outfit-layer">
                  <h4 className="c1300-classmates__outfit-layer-title">{title}</h4>
                  <label className="c1300-classmates__hue-row">
                    <span className="c1300-classmates__hue-label">Hue</span>
                    <input
                      type="range"
                      min={HUE_MIN}
                      max={HUE_MAX}
                      step={5}
                      value={profile[`${prefix}Hue`]}
                      onChange={setOutfitNum(`${prefix}Hue`)}
                    />
                    <span className="c1300-classmates__hue-val">
                      {clampHueDeg(profile[`${prefix}Hue`])}°
                    </span>
                  </label>
                  <label className="c1300-classmates__hue-row">
                    <span className="c1300-classmates__hue-label">Sat</span>
                    <input
                      type="range"
                      min={SAT_MIN}
                      max={SAT_MAX}
                      step={2}
                      value={profile[`${prefix}Sat`]}
                      onChange={setOutfitNum(`${prefix}Sat`)}
                    />
                    <span className="c1300-classmates__hue-val">
                      {clampSatPct(profile[`${prefix}Sat`])}%
                    </span>
                  </label>
                  <label className="c1300-classmates__hue-row">
                    <span className="c1300-classmates__hue-label">Light</span>
                    <input
                      type="range"
                      min={BRIGHT_MIN}
                      max={BRIGHT_MAX}
                      step={2}
                      value={profile[`${prefix}Bright`]}
                      onChange={setOutfitNum(`${prefix}Bright`)}
                    />
                    <span className="c1300-classmates__hue-val">
                      {clampBrightPct(profile[`${prefix}Bright`])}%
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="c1300-classmates__hue-reset c1300-classmates__btn-secondary"
              onClick={() => setProfile((p) => ({ ...p, ...OUTFIT_COLOR_DEFAULTS }))}
            >
              Reset colors
            </button>
            <details className="c1300-classmates__palette-details c1300-classmates__palette-details--inline">
              <summary className="c1300-classmates__palette-summary">Palette reference</summary>
              <p className="c1300-fineprint c1300-classmates__picker-hint">From the asset pack (for pixel work).</p>
              <div className="c1300-classmates__palette-row">
                {PALETTE_SAMPLES.map((pal) => (
                  <figure key={pal.id} className="c1300-classmates__palette-item">
                    <img
                      src={pal.src}
                      alt={`Palette ${pal.label}`}
                      className="c1300-classmates__palette-img"
                      loading="lazy"
                    />
                    <figcaption className="c1300-classmates__palette-cap">{pal.label}</figcaption>
                  </figure>
                ))}
              </div>
            </details>
          </>
        );
      case "backdrop":
        return (
          <div className="c1300-classmates__choice-row c1300-classmates__choice-row--scroll">
            {AVATAR_BACKDROP_OPTIONS.map((opt) => (
              <ChoiceTile
                key={opt.id}
                compact
                selected={profile.backdropId === opt.id}
                onClick={() => setProfile((p) => ({ ...p, backdropId: opt.id }))}
                label={opt.label}
              >
                <div
                  className="c1300-classmates__thumb-clip c1300-classmates__thumb-clip--portrait"
                  style={{ background: opt.gradient }}
                >
                  {thumbStack({})}
                </div>
              </ChoiceTile>
            ))}
          </div>
        );
      case "pose":
        return (
          <>
            <div className="c1300-classmates__mode-toggle" role="group" aria-label="Motion mode">
              {ANIM_SET_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`c1300-classmates__mode-btn${profile.animSet === opt.id ? " is-selected" : ""}`}
                  onClick={() =>
                    setProfile((p) => ({
                      ...p,
                      animSet: opt.id,
                      frameCol: 0,
                      frameRow: 0,
                    }))
                  }
                  aria-pressed={profile.animSet === opt.id}
                >
                  {opt.id === "walk" ? "Walk motion" : "Idle motion"}
                </button>
              ))}
            </div>
            <p className="c1300-classmates__wizard-hint">
              Current mode: <strong>{profile.animSet === "walk" ? "Walk" : "Idle"}</strong> · pose{" "}
              <span className="c1300-classmates__mono">{profile.frameCol},{profile.frameRow}</span>
            </p>
            <div className="c1300-classmates__pose-strip" role="group" aria-label="Pose">
              {poseCells.map(({ c, r, key }) => (
                <button
                  key={key}
                  type="button"
                  className={`c1300-classmates__pose-cell${profile.frameCol === c && profile.frameRow === r ? " is-selected" : ""}`}
                  onClick={() => setProfile((p) => ({ ...p, frameCol: c, frameRow: r }))}
                  aria-pressed={profile.frameCol === c && profile.frameRow === r}
                  title={`${c},${r}`}
                >
                  <div
                    className="c1300-classmates__thumb-clip c1300-classmates__thumb-clip--pose"
                    style={{
                      width: CELL * POSE_PREVIEW_SCALE,
                      height: CELL * POSE_PREVIEW_SCALE,
                      background: backdropGradientForId(profile.backdropId),
                    }}
                  >
                    <BaseCharacterStack
                      layers={displayLayers}
                      sheetW={composition.sheetW}
                      sheetH={composition.sheetH}
                      col={c}
                      row={r}
                      scale={POSE_PREVIEW_SCALE}
                    />
                  </div>
                  <span className="c1300-classmates__pose-num">
                    {c},{r}
                  </span>
                </button>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="content-panel content-panel--wide">
      <header className="c1300-panel-header">
        <h1>Meet the class</h1>
        <p className="c1300-panel-sub">
          Meet your classmates! You can add your card here to introduce yourself!
        </p>
      </header>

      <p className="c1300-lede">
        {supabaseConfigured ? (
          <>
            Pick a pixel avatar, fill in your profile, then use <strong>Post to board</strong> when you want to share.
            Your card saves in this browser until you post.
          </>
        ) : (
          <>
            Pick a pixel avatar and fill in your profile — it all saves in this browser. The shared class board will
            appear here when this site is connected.
          </>
        )}
      </p>

      <div className="c1300-classmates">
        <section className="c1300-classmates__hero" aria-labelledby="meet-card-heading">
          <h2 id="meet-card-heading" className="c1300-classmates__h2">
            Preview
          </h2>
          <article className="c1300-classmates__card c1300-classmates__card--preview">
            <div className="c1300-classmates__card-sprite">
                  <div
                    className="c1300-sprite-maker__preview-wrap c1300-classmates__card-sprite-inner c1300-classmates__portrait-wrap c1300-classmates__sprite-stage c1300-classmates__sprite-stage--hero"
                    style={backdropStyle}
                  >
                    <BaseCharacterStack
                      className="c1300-sprite-maker__stack c1300-classmates__stack"
                      role="img"
                      aria-label={`Character preview, cell ${profile.frameCol} ${profile.frameRow}`}
                      layers={displayLayers}
                      sheetW={composition.sheetW}
                      sheetH={composition.sheetH}
                      col={animatedCardPreviewCol}
                      row={profile.frameRow}
                      scale={HERO_CARD_SPRITE_SCALE}
                    />
                  </div>
                </div>
                <div className="c1300-classmates__card-body">
                  <p className="c1300-classmates__card-name">
                    {profile.displayName.trim() || "Your name"}
                  </p>
                  {profile.pronouns.trim() ? (
                    <p className="c1300-classmates__card-meta">{profile.pronouns}</p>
                  ) : null}
                  {profile.email.trim() ? (
                    <p className="c1300-classmates__card-email">
                      <a href={`mailto:${profile.email.trim()}`}>{profile.email.trim()}</a>
                    </p>
                  ) : null}
                  {profile.section ? (
                    <p className="c1300-classmates__card-meta">Section {profile.section}</p>
                  ) : null}
                  <div className="c1300-classmates__playback-controls c1300-classmates__playback-controls--compact">
                    <button
                      type="button"
                      className="c1300-classmates__playback-btn c1300-classmates__btn-secondary"
                      onClick={playPreviewMotionLoop}
                      disabled={isPreviewAnimating}
                    >
                      {isPreviewAnimating ? "Playing..." : "Play"}
                    </button>
                  </div>
                  {profile.bio.trim() ? (
                    <p className="c1300-classmates__card-bio">{profile.bio.trim()}</p>
                  ) : (
                    <p className="c1300-classmates__card-placeholder">Bio…</p>
                  )}
                  {profile.studyGroup.trim() ? (
                    <div className="c1300-classmates__card-study">
                      <span className="c1300-classmates__card-study-label">Study / collab</span>
                      {profile.studyGroup.trim()}
                    </div>
                  ) : null}
                  {profile.extra.trim() ? (
                    <p className="c1300-classmates__card-extra">{profile.extra.trim()}</p>
                  ) : null}
                </div>
              </article>
        </section>

        <div className="c1300-classmates__builder">
          <section
            className="c1300-classmates__look c1300-classmates__wizard"
            aria-labelledby="meet-look-heading"
          >
            <h2 id="meet-look-heading" className="c1300-classmates__h2">
              Avatar
            </h2>

            <div className="c1300-classmates__wizard-preview">
              <div
                className="c1300-sprite-maker__preview-wrap c1300-classmates__portrait-wrap c1300-classmates__sprite-stage c1300-classmates__sprite-stage--wizard"
                style={backdropStyle}
              >
                <BaseCharacterStack
                  className="c1300-sprite-maker__stack c1300-classmates__stack"
                  role="img"
                  aria-label={`Avatar preview, cell ${profile.frameCol} ${profile.frameRow}`}
                  layers={displayLayers}
                  sheetW={composition.sheetW}
                  sheetH={composition.sheetH}
                  col={animatedBuilderCol}
                  row={profile.frameRow}
                  scale={WIZARD_PREVIEW_SCALE}
                />
              </div>
            </div>

            <nav className="c1300-classmates__wizard-nav" aria-label="Avatar steps">
              <button
                type="button"
                className="c1300-classmates__wizard-btn c1300-classmates__btn-secondary"
                disabled={builderStep <= 0}
                onClick={() => setBuilderStep((s) => Math.max(0, s - 1))}
              >
                Back
              </button>
              <div className="c1300-classmates__wizard-track-block">
                <label className="c1300-classmates__wizard-track-label">
                  <span className="sr-only">Step</span>
                  <input
                    type="range"
                    className="c1300-classmates__wizard-track"
                    min={0}
                    max={builderStepMax}
                    step={1}
                    value={builderStep}
                    onChange={(e) => setBuilderStep(Number(e.target.value))}
                    aria-valuemin={0}
                    aria-valuemax={builderStepMax}
                    aria-valuenow={builderStep}
                    aria-valuetext={BUILDER_STEPS[builderStep].label}
                  />
                </label>
                <p id="meet-wizard-step-title" className="c1300-classmates__wizard-step-line" aria-live="polite">
                  <span className="c1300-classmates__wizard-step-name">
                    {BUILDER_STEPS[builderStep].label}
                  </span>
                  <span className="c1300-classmates__wizard-count-num">
                    {" "}
                    · {builderStep + 1}/{BUILDER_STEPS.length}
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="c1300-classmates__wizard-btn c1300-classmates__btn-secondary"
                disabled={builderStep >= builderStepMax}
                onClick={() => setBuilderStep((s) => Math.min(builderStepMax, s + 1))}
              >
                Next
              </button>
            </nav>

            <div
              className="c1300-classmates__wizard-panel"
              role="region"
              aria-labelledby="meet-wizard-step-title"
            >
              {renderWizardStep()}
            </div>
          </section>

          <section className="c1300-classmates__form-block" aria-labelledby="meet-form-heading">
            <h2 id="meet-form-heading" className="c1300-classmates__h2">
              Profile
            </h2>
            <div className="c1300-classmates__fields">
              <label className="c1300-classmates__field">
                <span className="c1300-classmates__field-name">Name</span>
                <input
                  type="text"
                  autoComplete="name"
                  value={profile.displayName}
                  onChange={setField("displayName")}
                  placeholder="e.g. Alex Chen"
                />
              </label>
              <label className="c1300-classmates__field">
                <span className="c1300-classmates__field-name">Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={profile.email}
                  onChange={setField("email")}
                  placeholder="you@school.edu"
                />
              </label>
              <label className="c1300-classmates__field">
                <span className="c1300-classmates__field-name">Pronouns</span>
                <input
                  type="text"
                  value={profile.pronouns}
                  onChange={setField("pronouns")}
                  placeholder="e.g. they/them"
                />
              </label>
              <label className="c1300-classmates__field">
                <span className="c1300-classmates__field-name">Section</span>
                <select value={profile.section} onChange={setField("section")}>
                  <option value="">Prefer not to say</option>
                  <option value="300">Section 300</option>
                  <option value="830">Section 830</option>
                </select>
              </label>
              <label className="c1300-classmates__field">
                <span className="c1300-classmates__field-name">Bio</span>
                <textarea
                  value={profile.bio}
                  onChange={setField("bio")}
                  rows={4}
                  placeholder="Major, interests, fun fact…"
                />
              </label>
              <label className="c1300-classmates__field">
                <span className="c1300-classmates__field-name">Study / collab</span>
                <textarea
                  value={profile.studyGroup}
                  onChange={setField("studyGroup")}
                  rows={3}
                  placeholder="Study group, async, time zone…"
                />
              </label>
              <label className="c1300-classmates__field">
                <span className="c1300-classmates__field-name">More</span>
                <textarea
                  value={profile.extra}
                  onChange={setField("extra")}
                  rows={2}
                  placeholder="Anything else you want classmates to know"
                />
              </label>
              {supabaseConfigured ? (
                <label className="c1300-classmates__field">
                  <span className="c1300-classmates__field-name">IdentiKey</span>
                  <input
                    type="text"
                    name="identikey"
                    autoComplete="username"
                    spellCheck={false}
                    value={identiKey}
                    onChange={(e) => setIdentiKey(e.target.value)}
                    placeholder="Your CU IdentiKey"
                    maxLength={MAX_IDENTIKEY_LEN}
                  />
                  <span className="c1300-fineprint c1300-classmates__identikey-note">(for student validation)</span>
                </label>
              ) : null}
            </div>

            <div className="c1300-classmates__actions">
              {supabaseConfigured ? (
                <button
                  type="button"
                  className="c1300-sprite-maker__btn"
                  onClick={handlePublish}
                  disabled={publishBusy}
                >
                  {publishBusy ? "Posting…" : "Post to board"}
                </button>
              ) : null}
              <button type="button" className="c1300-sprite-maker__btn" onClick={handleCopy}>
                Copy text
              </button>
              <button type="button" className="c1300-classmates__btn-secondary" onClick={clearSaved}>
                Clear saved
              </button>
            </div>
            {publishOk ? <p className="c1300-classmates__toast">{publishOk}</p> : null}
            {publishErr ? <p className="c1300-classmates__err">{publishErr}</p> : null}
            {copyMsg ? <p className="c1300-classmates__toast">{copyMsg}</p> : null}
          </section>
        </div>

        <section className="c1300-classmates__board" aria-labelledby="class-board-heading">
          <div className="c1300-classmates__board-head">
            <h2 id="class-board-heading" className="c1300-classmates__h2">
              Class board
            </h2>
            {supabaseConfigured ? (
              <button
                type="button"
                className="c1300-classmates__btn-secondary c1300-classmates__board-refresh"
                onClick={() => loadBoard()}
                disabled={boardLoading}
              >
                {boardLoading ? "Loading…" : "Refresh"}
              </button>
            ) : null}
          </div>
          {!supabaseConfigured ? (
            <p className="c1300-classmates__board-note">Class board isn’t connected yet (missing Supabase URL/key in the build).</p>
          ) : null}
          {supabaseConfigured && boardLoading ? (
            <p className="c1300-classmates__board-note">Loading…</p>
          ) : null}
          {boardError ? (
            <p className="c1300-classmates__err" role="alert">
              Couldn’t load posts.{" "}
              <button type="button" className="c1300-classmates__inline-retry" onClick={() => loadBoard()}>
                Try again
              </button>
            </p>
          ) : null}
          {supabaseConfigured && !boardLoading && !boardError && boardRows.length === 0 ? (
            <p className="c1300-classmates__board-note">No posts yet.</p>
          ) : null}
          {supabaseConfigured && boardRows.length > 0 ? (
            <div className="c1300-classmates__board-grid">
              {boardRows.map((row) => (
                <PostedClassmateCard key={row.id} profile={row.profile} />
              ))}
            </div>
          ) : null}
          {supabaseConfigured ? (
            <div className="c1300-classmates__board-delete">
              <h3 className="c1300-classmates__board-delete-title">Delete a card</h3>
              <p className="c1300-fineprint c1300-classmates__board-delete-hint">
                Enter the IdentiKey for the avatar you want removed from the board.
              </p>
              <div className="c1300-classmates__board-delete-row">
                <label className="c1300-classmates__board-delete-field">
                  <span className="sr-only">IdentiKey to delete</span>
                  <input
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    value={deleteIdentiKey}
                    onChange={(e) => setDeleteIdentiKey(e.target.value)}
                    placeholder="IdentiKey"
                    maxLength={MAX_IDENTIKEY_LEN}
                  />
                </label>
                <button
                  type="button"
                  className="c1300-classmates__btn-secondary c1300-classmates__board-delete-btn"
                  onClick={handleDeleteFromBoard}
                  disabled={deleteBusy}
                >
                  {deleteBusy ? "…" : "Delete card"}
                </button>
              </div>
              {deleteOk ? <p className="c1300-classmates__toast c1300-classmates__board-delete-msg">{deleteOk}</p> : null}
              {deleteErr ? (
                <p className="c1300-classmates__err c1300-classmates__board-delete-msg" role="alert">
                  {deleteErr}
                </p>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>

      <p className="c1300-fineprint c1300-classmates__page-credit">
        Pixel base:{" "}
        <a href="https://cozy-fae.itch.io/" target="_blank" rel="noopener noreferrer">
          CozyFae
        </a>{" "}
      </p>
    </div>
  );
}
