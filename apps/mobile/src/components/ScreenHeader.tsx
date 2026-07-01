import React from "react";
import { Pressable, Text, View, type TextStyle, type ViewStyle } from "react-native";
import { MaterialIcons } from "./MaterialIcons";
import { colors, size } from "../theme/design";
import { useI18n } from "../i18n/I18nProvider";
import { screenHeaderStyles as styles } from "./screenHeaderStyles";
import type { ScreenHeaderProps } from "./screenHeaderTypes";

export function ScreenHeader({ title, backLabel, textAlign, trailing, onBack }: ScreenHeaderProps) {
  const { direction } = useI18n();
  const rtl = direction === "rtl";
  const headerDirection = { direction: "ltr" } as ViewStyle;
  const titleDirection = { writingDirection: direction } as TextStyle;
  const titleRow = (
    <View style={[styles.titleRow, rtl && styles.rtlRow]}>
      <Pressable style={styles.backIcon} onPress={onBack} accessibilityRole="button" accessibilityLabel={backLabel}>
        <MaterialIcons name={rtl ? "arrow-forward" : "arrow-back"} size={size.iconLarge} color={colors.iconDefault} />
      </Pressable>
      <Text style={[styles.title, { textAlign }, titleDirection]}>{title}</Text>
    </View>
  );
  const trailingRow = trailing ? <View style={[styles.trailing, rtl && styles.rtlRow]}>{trailing}</View> : null;

  return (
    <View style={[styles.header, headerDirection]}>
      {rtl ? trailingRow : titleRow}
      {rtl ? titleRow : trailingRow}
    </View>
  );
}
