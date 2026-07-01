import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  deckName: string;
  onDeckNameChange: (value: string) => void;
  onCreateDeck: () => void;
};

export function CustomDeckCreateRow({ deckName, onDeckNameChange, onCreateDeck }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.deckCreateRow}>
      <TextInput style={styles.deckInput} value={deckName} onChangeText={onDeckNameChange} placeholder={t("settings.deckName")} placeholderTextColor={colors.textMuted} returnKeyType="done" onSubmitEditing={onCreateDeck} />
      <Pressable style={styles.addDeckButton} onPress={onCreateDeck} accessibilityRole="button" accessibilityLabel={t("settings.createDeck")}>
        <MaterialIcons name="add" size={size.icon} color={colors.onPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  deckCreateRow: { flexDirection: "row", gap: spacing.lg },
  deckInput: { flex: 1, minHeight: size.actionMinHeight, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surface, color: colors.textStrong, fontSize: typography.body, paddingHorizontal: spacing.xl },
  addDeckButton: { width: size.actionMinHeight, height: size.actionMinHeight, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primaryDeep }
});
