import { borderColors } from "./lightColorGroups/borderColors";
import { brandColors } from "./lightColorGroups/brandColors";
import { heroColors } from "./lightColorGroups/heroColors";
import { surfaceColors } from "./lightColorGroups/surfaceColors";
import { textColors } from "./lightColorGroups/textColors";
import { utilityColors } from "./lightColorGroups/utilityColors";

export const lightSemanticColors = {
  ...brandColors,
  ...surfaceColors,
  ...textColors,
  ...borderColors,
  ...heroColors,
  ...utilityColors
} as const;
