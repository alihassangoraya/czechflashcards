import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export function SearchField({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) {
  return (
    <View style={styles.field}>
      <MaterialIcons name="search" size={size.icon} color={colors.actionMuted} />
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={onQueryChange}
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search Czech, English, Hindi, or Urdu"
        placeholderTextColor={colors.textMuted}
        accessibilityLabel="Search vocabulary"
      />
      {Boolean(query) && (
        <Pressable style={styles.clearButton} onPress={() => onQueryChange("")} accessibilityRole="button" accessibilityLabel="Clear search">
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
