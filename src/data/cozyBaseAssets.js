import base03Idle from "../../sprites/idle/base/free_base_03_idle.png?url";
import base07Idle from "../../sprites/idle/base/free_base_07_idle.png?url";
import base09Idle from "../../sprites/idle/base/free_base_09_idle.png?url";
import baseGrayIdle from "../../sprites/idle/base/free_base_grayscale_idle.png?url";

import pantsBlueIdle from "../../sprites/idle/bottom/free_pants_blue_idle.png?url";
import pantsBrownIdle from "../../sprites/idle/bottom/free_pants_brown_idle.png?url";

import topBlueIdle from "../../sprites/idle/top/free_base_top_blue_idle.png?url";
import topYellowIdle from "../../sprites/idle/top/free_base_top_yellow_idle.png?url";
import topRedIdle from "../../sprites/idle/top/free_base_top_red_idle.png?url";
import topGreenIdle from "../../sprites/idle/top/free_base_top_green_idle.png?url";
import topWhiteIdle from "../../sprites/idle/top/free_base_top_white_idle.png?url";

import eyesBlueIdle from "../../sprites/idle/eyes/free_eyes_blue_idle.png?url";
import eyesBrownIdle from "../../sprites/idle/eyes/free_eyes_brown_idle.png?url";
import eyesGreenIdle from "../../sprites/idle/eyes/free_eyes_green_idle.png?url";

import hairShortRedIdle from "../../sprites/idle/hair/free_hair_short_red_idle.png?url";
import hairShortYellowIdle from "../../sprites/idle/hair/free_hair_short_yellow_idle.png?url";
import hairShortBrownIdle from "../../sprites/idle/hair/free_hair_short_brown_idle.png?url";
import hairMedRedIdle from "../../sprites/idle/hair/free_hair_medium_red_idle.png?url";
import hairMedYellowIdle from "../../sprites/idle/hair/free_hair_medium_yellow_idle.png?url";
import hairMedBrownIdle from "../../sprites/idle/hair/free_hair_mediu_brown__idle.png?url";

import base03Walk from "../../sprites/walk/base/free_base_03_walk.png?url";
import base07Walk from "../../sprites/walk/base/free_base_07_walk.png?url";
import base09Walk from "../../sprites/walk/base/free_base_09_walk.png?url";
import baseGrayWalk from "../../sprites/walk/base/free_base_grayscale_walk.png?url";

import pantsBlueWalk from "../../sprites/walk/bottom/free_pants_blue_walk.png?url";
import pantsBrownWalk from "../../sprites/walk/bottom/free_pants_walk.png?url";

import topBlueWalk from "../../sprites/walk/top/free_base_top_blue_walk.png?url";
import topYellowWalk from "../../sprites/walk/top/free_base_top_yellow_walk.png?url";
import topRedWalk from "../../sprites/walk/top/free_base_top_red_walk.png?url";
import topGreenWalk from "../../sprites/walk/top/free_base_top_green_walk.png?url";
import topWhiteWalk from "../../sprites/walk/top/free_base_top_white_walk.png?url";

import eyesBlueWalk from "../../sprites/walk/eyes/free_eyes_blue_walk.png?url";
import eyesBrownWalk from "../../sprites/walk/eyes/free_eyes_brown_walk.png?url";
import eyesGreenWalk from "../../sprites/walk/eyes/free_eyes_green_walk.png?url";

import hairShortRedWalk from "../../sprites/walk/hair/free_hair_short_red_walk.png?url";
import hairShortYellowWalk from "../../sprites/walk/hair/free_hair_short_yellow_walk.png?url";
import hairShortBrownWalk from "../../sprites/walk/hair/free_hair_short_brown_walk.png?url";
import hairMedRedWalk from "../../sprites/walk/hair/free_hair_medium_red_walk.png?url";
import hairMedYellowWalk from "../../sprites/walk/hair/free_hair_medium_yellow_walk.png?url";
import hairMedBrownWalk from "../../sprites/walk/hair/free_hair_medium_brown_walk.png?url";

import palette1x from "../../sprites/palette/cozyfae_colorsample01_1x.png?url";
import palette4x from "../../sprites/palette/cozyfae_colorsample01_4x.png?url";
import palette8x from "../../sprites/palette/cozyfae_colorsample01_8x.png?url";
import palette16x from "../../sprites/palette/cozyfae_colorsample01_16x.png?url";
import palette32x from "../../sprites/palette/cozyfae_colorsample01_32x.png?url";

export const CELL = 32;

export const IDLE_LAYOUT = { sheetW: 64, sheetH: 96, gridCols: 2, gridRows: 3 };
export const WALK_LAYOUT = { sheetW: 128, sheetH: 96, gridCols: 4, gridRows: 3 };

export const PALETTE_SAMPLES = [
  { id: "1x", label: "1x", src: palette1x },
  { id: "4x", label: "4x", src: palette4x },
  { id: "8x", label: "8x", src: palette8x },
  { id: "16x", label: "16x", src: palette16x },
  { id: "32x", label: "32x", src: palette32x },
];

export const AVATAR_BACKDROP_OPTIONS = [
  {
    id: "blue",
    label: "Sky blue",
    gradient: "linear-gradient(180deg, #6a9ebd 0%, #4a7a96 55%, #3d5f78 100%)",
  },
  {
    id: "lavender",
    label: "Lilac",
    gradient: "linear-gradient(180deg, #c4b8e8 0%, #9588c9 50%, #6a5a9c 100%)",
  },
  {
    id: "sunset",
    label: "Sunset",
    gradient: "linear-gradient(180deg, #ffb088 0%, #e86b5c 45%, #a84652 100%)",
  },
  {
    id: "mint",
    label: "Mint",
    gradient: "linear-gradient(180deg, #9fe8c9 0%, #5bc9a4 50%, #3d9a7a 100%)",
  },
  {
    id: "sand",
    label: "Sand",
    gradient: "linear-gradient(180deg, #f0e6c8 0%, #dcc498 50%, #b89a6a 100%)",
  },
  {
    id: "slate",
    label: "Slate",
    gradient: "linear-gradient(180deg, #9eb0c0 0%, #6a7d8c 50%, #4a5866 100%)",
  },
  {
    id: "berry",
    label: "Berry",
    gradient: "linear-gradient(180deg, #e8b8d8 0%, #b878a0 50%, #7a4870 100%)",
  },
  {
    id: "night",
    label: "Night",
    gradient: "linear-gradient(180deg, #4a5a8c 0%, #2c3558 50%, #1a2238 100%)",
  },
];

export function isValidBackdropId(id) {
  return AVATAR_BACKDROP_OPTIONS.some((o) => o.id === id);
}

export function backdropGradientForId(id) {
  const opt = AVATAR_BACKDROP_OPTIONS.find((o) => o.id === id);
  return opt?.gradient ?? AVATAR_BACKDROP_OPTIONS[0].gradient;
}

export const ANIM_SET_OPTIONS = [
  { id: "idle", label: "Idle sheet" },
  { id: "walk", label: "Walk sheet" },
];

export const BASE_OPTIONS = [
  { id: "03", label: "Base 03" },
  { id: "07", label: "Base 07" },
  { id: "09", label: "Base 09" },
  { id: "gray", label: "Grayscale" },
];

export const PANTS_OPTIONS = [
  { id: "blue", label: "Blue pants" },
  { id: "brown", label: "Brown pants" },
];

export const TOP_OPTIONS = [
  { id: "blue", label: "Blue top" },
  { id: "yellow", label: "Yellow top" },
  { id: "red", label: "Red top" },
  { id: "green", label: "Green top" },
  { id: "white", label: "White top" },
];

export const EYE_OPTIONS = [
  { id: "blue", label: "Blue eyes" },
  { id: "brown", label: "Brown eyes" },
  { id: "green", label: "Green eyes" },
];

export const HAIR_LENGTH_OPTIONS = [
  { id: "short", label: "Short hair" },
  { id: "medium", label: "Medium hair" },
];

export const HAIR_COLOR_OPTIONS = [
  { id: "red", label: "Red" },
  { id: "yellow", label: "Yellow" },
  { id: "brown", label: "Brown" },
];

const IDLE_BASE = { "03": base03Idle, "07": base07Idle, "09": base09Idle, gray: baseGrayIdle };
const WALK_BASE = { "03": base03Walk, "07": base07Walk, "09": base09Walk, gray: baseGrayWalk };

const IDLE_PANTS = { blue: pantsBlueIdle, brown: pantsBrownIdle };
const WALK_PANTS = { blue: pantsBlueWalk, brown: pantsBrownWalk };

const IDLE_TOP = {
  blue: topBlueIdle,
  yellow: topYellowIdle,
  red: topRedIdle,
  green: topGreenIdle,
  white: topWhiteIdle,
};
const WALK_TOP = {
  blue: topBlueWalk,
  yellow: topYellowWalk,
  red: topRedWalk,
  green: topGreenWalk,
  white: topWhiteWalk,
};

const IDLE_EYES = { blue: eyesBlueIdle, brown: eyesBrownIdle, green: eyesGreenIdle };
const WALK_EYES = { blue: eyesBlueWalk, brown: eyesBrownWalk, green: eyesGreenWalk };

const IDLE_HAIR = {
  short: { red: hairShortRedIdle, yellow: hairShortYellowIdle, brown: hairShortBrownIdle },
  medium: { red: hairMedRedIdle, yellow: hairMedYellowIdle, brown: hairMedBrownIdle },
};
const WALK_HAIR = {
  short: { red: hairShortRedWalk, yellow: hairShortYellowWalk, brown: hairShortBrownWalk },
  medium: { red: hairMedRedWalk, yellow: hairMedYellowWalk, brown: hairMedBrownWalk },
};

export function isValidAnimSet(v) {
  return v === "idle" || v === "walk";
}

export function isValidBaseId(v) {
  return v === "03" || v === "07" || v === "09" || v === "gray";
}
export function isValidPantsId(v) {
  return v === "blue" || v === "brown";
}
export function isValidTopColor(v) {
  return v === "blue" || v === "yellow" || v === "red" || v === "green" || v === "white";
}
export function isValidEyeId(v) {
  return v === "blue" || v === "brown" || v === "green";
}
export function isValidHairLength(v) {
  return v === "short" || v === "medium";
}
export function isValidHairColor(v) {
  return v === "red" || v === "yellow" || v === "brown";
}

export function layoutForAnimSet(animSet) {
  return animSet === "walk" ? WALK_LAYOUT : IDLE_LAYOUT;
}

export const OUTFIT_COLOR_PRESETS = [
  {
    id: "natural",
    label: "Natural",
    pantsHue: 0,
    pantsSat: 100,
    pantsBright: 100,
    topHue: 0,
    topSat: 100,
    topBright: 100,
    hairHue: 0,
    hairSat: 100,
    hairBright: 100,
  },
  {
    id: "soft",
    label: "Soft pastels",
    pantsHue: 12,
    pantsSat: 72,
    pantsBright: 108,
    topHue: -10,
    topSat: 68,
    topBright: 108,
    hairHue: 22,
    hairSat: 70,
    hairBright: 105,
  },
  {
    id: "vivid",
    label: "Vivid",
    pantsHue: 0,
    pantsSat: 148,
    pantsBright: 100,
    topHue: 0,
    topSat: 155,
    topBright: 98,
    hairHue: 0,
    hairSat: 142,
    hairBright: 100,
  },
  {
    id: "sunset",
    label: "Warm sunset",
    pantsHue: -8,
    pantsSat: 112,
    pantsBright: 96,
    topHue: 32,
    topSat: 118,
    topBright: 102,
    hairHue: 20,
    hairSat: 122,
    hairBright: 98,
  },
  {
    id: "forest",
    label: "Cool forest",
    pantsHue: 48,
    pantsSat: 82,
    pantsBright: 92,
    topHue: -38,
    topSat: 88,
    topBright: 94,
    hairHue: 28,
    hairSat: 86,
    hairBright: 96,
  },
  {
    id: "mono",
    label: "Muted clothes",
    pantsHue: 0,
    pantsSat: 0,
    pantsBright: 108,
    topHue: 0,
    topSat: 0,
    topBright: 96,
    hairHue: 0,
    hairSat: 38,
    hairBright: 102,
  },
];

/**
 * @returns {{ layers: { key: string, src: string }[], sheetW: number, sheetH: number, gridCols: number, gridRows: number }}
 */
export function buildBaseComposition(p) {
  const animSet = isValidAnimSet(p.animSet) ? p.animSet : "idle";
  const layout = layoutForAnimSet(animSet);
  const baseId = isValidBaseId(p.baseId) ? p.baseId : "03";
  const pantsId = isValidPantsId(p.pantsId) ? p.pantsId : "blue";
  const topColor = isValidTopColor(p.topColor) ? p.topColor : "blue";
  const eyeId = isValidEyeId(p.eyeId) ? p.eyeId : "blue";
  const hairLength = isValidHairLength(p.hairLength) ? p.hairLength : "short";
  const hairColor = isValidHairColor(p.hairColor) ? p.hairColor : "red";

  const walk = animSet === "walk";
  const baseMap = walk ? WALK_BASE : IDLE_BASE;
  const pantsMap = walk ? WALK_PANTS : IDLE_PANTS;
  const topMap = walk ? WALK_TOP : IDLE_TOP;
  const eyeMap = walk ? WALK_EYES : IDLE_EYES;
  const hairMap = walk ? WALK_HAIR : IDLE_HAIR;

  const layers = [
    { key: "base", src: baseMap[baseId] },
    { key: "bottom", src: pantsMap[pantsId] },
    { key: "top", src: topMap[topColor] },
    { key: "eyes", src: eyeMap[eyeId] },
    { key: "hair", src: hairMap[hairLength][hairColor] },
  ];

  return { layers, ...layout };
}

export function buildBaseLayers(p) {
  return buildBaseComposition(p).layers;
}

export const SHEET_W = IDLE_LAYOUT.sheetW;
export const SHEET_H = IDLE_LAYOUT.sheetH;
export const GRID_COLS = IDLE_LAYOUT.gridCols;
export const GRID_ROWS = IDLE_LAYOUT.gridRows;
