import React from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, size } from "../../../theme/design";

type Props = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
  selected?: boolean;
  muted?: boolean;
};

export function StudyCardActionButton({ icon, label, muted, onPress, selected, style }: Props) {
  return (
    <Pressable
      style={style}
      onPressIn={(event) => event.stopPropagation()}
      onPress={(event) => {
        event.stopPropagation();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityState={selected == null ? undefined : { selected }}
      accessibilityLabel={label}
    >
      <MaterialIcons name={icon} size={muted ? size.iconMedium : size.icon} color={muted ? colors.actionMuted : colors.action} />
    </Pressable>
  );
}
