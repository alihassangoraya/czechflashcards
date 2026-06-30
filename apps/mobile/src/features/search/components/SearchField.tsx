import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { SearchFieldProps } from "./searchFieldTypes";

export function SearchField({ query, onQueryChange }: SearchFieldProps) {
  const { t, textAlign, direction } = useI18n();

  return (
    <View style={styles.field}>
      <MaterialIcons name="search" size={size.icon} color={colors.actionMuted} />
      <TextInput
        style={[styles.input, { textAlign, writingDirection: direction }]}
        value={query}
        onChangeText={onQueryChange}
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={t("search.placeholder")}
        placeholderTextColor={colors.textMuted}
        accessibilityLabel={t("search.accessibility")}
      />
      {Boolean(query) && (
        <Pressable style={styles.clearButton} onPress={() => onQueryChange("")} accessibilityRole="button" accessibilityLabel={t("search.clear")}>
          <MaterialIcons name="close" size={size.iconSmall} color={colors.textMuted} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl },
  input: { flex: 1, color: colors.textStrong, fontSize: typography.bodyLarge, paddingVertical: spacing.lg },
  clearButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center" }
});
