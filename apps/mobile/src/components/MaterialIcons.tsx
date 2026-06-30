import React from "react";
import { Platform, Text } from "react-native";
import { materialIconGlyphs, type MaterialIconName } from "./materialIconGlyphs";
import type { MaterialIconsProps } from "./materialIconsTypes";

const fontFamily = Platform.OS === "ios" ? "Material Icons" : "MaterialIcons";
export type { MaterialIconName };

export function MaterialIcons({ name, size = 24, color = "currentColor", style }: MaterialIconsProps) {
  return (
    <Text
      aria-hidden
      style={[
        {
          color,
          fontFamily,
          fontSize: size,
          fontWeight: "400",
          lineHeight: size,
          textAlign: "center"
        },
        style
      ]}
    >
      {String.fromCharCode(materialIconGlyphs[name])}
    </Text>
  );
}
