import { lightCompatibilityColorAliases } from "./compatibilityColorAliases";
import { lightSemanticColors } from "./lightSemanticColors";

export const lightColors = {
  ...lightSemanticColors,
  ...lightCompatibilityColorAliases
} as const;
