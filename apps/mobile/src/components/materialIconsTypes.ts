import type { TextStyle } from "react-native";
import type { MaterialIconName } from "./materialIconGlyphs";

export type MaterialIconsProps = {
  name: MaterialIconName;
  size?: number;
  color?: string;
  style?: TextStyle;
};
