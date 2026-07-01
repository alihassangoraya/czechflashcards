import { darkCompatibilityColorAliases } from "./compatibilityColorAliases";
import type { ColorTokens } from "./colorTypes";
import { darkBrandColors } from "./darkBrandColors";
import { darkIconColors } from "./darkIconColors";
import { darkSurfaceColors } from "./darkSurfaceColors";
import { darkTextColors } from "./darkTextColors";
import { lightColors } from "./lightColors";

export const darkColors: ColorTokens = {
  ...lightColors,
  ...darkBrandColors,
  ...darkSurfaceColors,
  ...darkTextColors,
  ...darkIconColors,
  heroOverlay: "rgba(0,0,0,0.50)",
  stampSurface: "rgba(34,39,34,0.94)",
  ...darkCompatibilityColorAliases
};
