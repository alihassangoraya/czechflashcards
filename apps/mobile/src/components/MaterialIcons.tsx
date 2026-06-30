import React from "react";
import { Platform, Text, type TextStyle } from "react-native";
import { materialIconGlyphs, type MaterialIconName } from "./materialIconGlyphs";

const fontFamily = Platform.OS === "ios" ? "Material Icons" : "MaterialIcons";
export type { MaterialIconName };

type Props = {
  name: MaterialIconName;
  size?: number;
  color?: string;
  style?: TextStyle;
};

export function MaterialIcons({ name, size = 24, color = "currentColor", style }: Props) {
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
