import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { AddWordDetailsToggleProps } from "./addWordDetailsToggleTypes";

export function AddWordDetailsToggle({ expanded, onToggle }: AddWordDetailsToggleProps) {
  const { t } = useI18n();

  return (
    <Pressable style={styles.toggle} onPress={onToggle} accessibilityRole="button" accessibilityState={{ expanded }}>
      <View style={styles.copy}>
        <MaterialIcons name="library-add" size={size.iconSmall} color={colors.iconAction} />
        <Text style={styles.text}>{t("words.translationsContext")}</Text>
      </View>
      <MaterialIcons name={expanded ? "expand-less" : "expand-more"} size={size.icon} color={colors.iconAction} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.xl },
  copy: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  text: { color: colors.action, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
