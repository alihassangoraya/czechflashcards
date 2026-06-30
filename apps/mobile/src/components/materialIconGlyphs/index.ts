import { accountGlyphs } from "./accountGlyphs";
import { actionGlyphs } from "./actionGlyphs";
import { homeGlyphs } from "./homeGlyphs";
import { navigationGlyphs } from "./navigationGlyphs";
import { statusGlyphs } from "./statusGlyphs";
import { studyGlyphs } from "./studyGlyphs";

export const materialIconGlyphs = {
  ...accountGlyphs,
  ...actionGlyphs,
  ...homeGlyphs,
  ...navigationGlyphs,
  ...statusGlyphs,
  ...studyGlyphs,
  "manage-search": 61487
} as const;

export type MaterialIconName = keyof typeof materialIconGlyphs;
