import { accountGlyphs } from "./materialIconGlyphs/accountGlyphs";
import { actionGlyphs } from "./materialIconGlyphs/actionGlyphs";
import { homeGlyphs } from "./materialIconGlyphs/homeGlyphs";
import { navigationGlyphs } from "./materialIconGlyphs/navigationGlyphs";
import { statusGlyphs } from "./materialIconGlyphs/statusGlyphs";
import { studyGlyphs } from "./materialIconGlyphs/studyGlyphs";

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
