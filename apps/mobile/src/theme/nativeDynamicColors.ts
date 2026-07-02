import { DynamicColorIOS, Platform } from "react-native";
import { darkColors, lightColors } from "./tokens/colors";
import type { ColorTokens } from "./tokens/colorTypes";

function createDynamicColors(): ColorTokens {
  if (Platform.OS !== "ios") return lightColors;

  return Object.fromEntries(
    Object.keys(lightColors).map((key) => {
      const colorKey = key as keyof typeof lightColors;
      return [
        colorKey,
        DynamicColorIOS({
          light: lightColors[colorKey],
          dark: darkColors[colorKey] || lightColors[colorKey]
        })
      ];
    })
  ) as unknown as ColorTokens;
}

export const nativeDynamicColors = createDynamicColors();
