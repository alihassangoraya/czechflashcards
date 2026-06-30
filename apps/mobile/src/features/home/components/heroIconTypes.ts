import type { MaterialIconName } from "../../../components/MaterialIcons";

export type HeroIconProps = {
  icon: MaterialIconName;
  label: string;
  onPress: () => void;
};
