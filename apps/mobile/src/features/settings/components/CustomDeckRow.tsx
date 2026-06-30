import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  deck: CustomDeck;
  count: number;
  active: boolean;
  editing: boolean;
  deleting: boolean;
  editingDeckName: string;
  onSelectDeck: (deckId: string) => void;
  onStartEditDeck: (deckId: string) => void;
  onEditingDeckNameChange: (value: string) => void;
  onCancelEditDeck: () => void;
  onSaveEditDeck: () => void;
  onRequestDeleteDeck: (deckId: string) => void;
  onCancelDeleteDeck: () => void;
  onConfirmDeleteDeck: (deckId: string) => void;
};

export function CustomDeckRow({ deck, count, active, editing, deleting, editingDeckName, onSelectDeck, onStartEditDeck, onEditingDeckNameChange, onCancelEditDeck, onSaveEditDeck, onRequestDeleteDeck, onCancelDeleteDeck, onConfirmDeleteDeck }: Props) {
  const { t } = useI18n();

  return (
    <View style={[styles.customDeckRow, active && styles.customDeckRowActive]}>
      <Pressable style={styles.deckSelectArea} onPress={() => onSelectDeck(deck.id)} accessibilityRole="button">
        <MaterialIcons name="folder" size={size.iconSmall} color={active ? colors.primaryDeep : colors.textMuted} />
        {editing ? (
          <TextInput style={styles.deckEditInput} value={editingDeckName} onChangeText={onEditingDeckNameChange} autoFocus returnKeyType="done" onSubmitEditing={onSaveEditDeck} />
        ) : (
          <View style={styles.deckCopy}>
            <Text style={styles.customDeckName}>{deck.name}</Text>
            <Text style={styles.customDeckMeta}>{count} {count === 1 ? t("settings.wordSingular") : t("settings.wordPlural")}</Text>
          </View>
        )}
      </Pressable>

      {editing ? (
        <View style={styles.deckActions}>
          <Pressable style={styles.iconAction} onPress={onSaveEditDeck} accessibilityRole="button" accessibilityLabel={t("settings.saveDeck", { deck: deck.name })}>
            <MaterialIcons name="check" size={size.iconSmall} color={colors.success} />
          </Pressable>
          <Pressable style={styles.iconAction} onPress={onCancelEditDeck} accessibilityRole="button" accessibilityLabel={t("settings.cancelDeckEdit", { deck: deck.name })}>
            <MaterialIcons name="close" size={size.iconSmall} color={colors.textMuted} />
          </Pressable>
        </View>
      ) : deleting ? (
        <View style={styles.deleteConfirm}>
          <Text style={styles.deleteText}>{t("settings.deleteQuestion")}</Text>
          <Pressable style={styles.iconAction} onPress={() => onConfirmDeleteDeck(deck.id)} accessibilityRole="button" accessibilityLabel={t("settings.deleteDeck", { deck: deck.name })}>
            <MaterialIcons name="delete-outline" size={size.iconSmall} color={colors.dangerStrong} />
          </Pressable>
          <Pressable style={styles.iconAction} onPress={onCancelDeleteDeck} accessibilityRole="button" accessibilityLabel={t("settings.keepDeck", { deck: deck.name })}>
            <MaterialIcons name="close" size={size.iconSmall} color={colors.textMuted} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.deckActions}>
          {active && <MaterialIcons name="check" size={size.iconSmall} color={colors.success} />}
          <Pressable style={styles.iconAction} onPress={() => onStartEditDeck(deck.id)} accessibilityRole="button" accessibilityLabel={t("settings.renameDeck", { deck: deck.name })}>
            <MaterialIcons name="edit" size={size.iconSmall} color={colors.action} />
          </Pressable>
          <Pressable style={styles.iconAction} onPress={() => onRequestDeleteDeck(deck.id)} accessibilityRole="button" accessibilityLabel={t("settings.deleteDeck", { deck: deck.name })}>
            <MaterialIcons name="delete-outline" size={size.iconSmall} color={colors.dangerStrong} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  customDeckRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingLeft: spacing.xl, paddingRight: spacing.lg, paddingVertical: spacing.smd },
  customDeckRowActive: { borderColor: colors.success },
  deckSelectArea: { flex: 1, minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  deckCopy: { flex: 1, gap: spacing.xxs },
  customDeckName: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  customDeckMeta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightRegular },
  deckEditInput: { flex: 1, minHeight: size.touchTarget, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  deckActions: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  iconAction: { width: size.navAction, height: size.navAction, alignItems: "center", justifyContent: "center" },
  deleteConfirm: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  deleteText: { color: colors.dangerStrong, fontSize: typography.caption, fontWeight: typography.weightSemibold }
});
