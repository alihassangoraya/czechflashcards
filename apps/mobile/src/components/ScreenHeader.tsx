import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "./MaterialIcons";
import { colors, size } from "../theme/design";
import { screenHeaderStyles as styles } from "./screenHeaderStyles";
import type { ScreenHeaderProps } from "./screenHeaderTypes";

export function ScreenHeader({ title, backLabel, textAlign, trailing, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Pressable style={styles.backIcon} onPress={onBack} accessibilityRole="button" accessibilityLabel={backLabel}>
          <MaterialIcons name="arrow-back" size={size.iconLarge} color={colors.textStrong} />
        </Pressable>
        <Text style={[styles.title, { textAlign }]}>{title}</Text>
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </View>
  );
}
