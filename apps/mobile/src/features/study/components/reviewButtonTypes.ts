import type { StyleProp, ViewStyle } from "react-native";

export type ReviewButtonProps = {
  disabled: boolean;
  style: StyleProp<ViewStyle>;
  label: string;
  interval: string;
  onPress: () => void;
};
