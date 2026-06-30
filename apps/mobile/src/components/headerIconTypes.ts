import type { MaterialIconName } from "./MaterialIcons";

export type HeaderIconProps = {
  icon: MaterialIconName;
  label: string;
  onPress: () => void;
  primary?: boolean;
};
