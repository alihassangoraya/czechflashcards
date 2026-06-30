import React from "react";
import { View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { buildCustomDeckRowLabels } from "./customDeckRowLabels";
import { CustomDeckRowActions } from "./CustomDeckRowActions";
import { CustomDeckSelectArea } from "./CustomDeckSelectArea";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";
import type { CustomDeckRowProps } from "./customDeckRowTypes";

export function CustomDeckRow({ deck, count, active, editing, deleting, editingDeckName, onSelectDeck, onStartEditDeck, onEditingDeckNameChange, onCancelEditDeck, onSaveEditDeck, onRequestDeleteDeck, onCancelDeleteDeck, onConfirmDeleteDeck }: CustomDeckRowProps) {
  const { t } = useI18n();
  const countLabel = `${count} ${count === 1 ? t("settings.wordSingular") : t("settings.wordPlural")}`;
  const labels = buildCustomDeckRowLabels(t, deck);

  return (
    <View style={[styles.customDeckRow, active && styles.customDeckRowActive]}>
      <CustomDeckSelectArea deck={deck} countLabel={countLabel} active={active} editing={editing} editingDeckName={editingDeckName} onSelectDeck={onSelectDeck} onEditingDeckNameChange={onEditingDeckNameChange} onSaveEditDeck={onSaveEditDeck} />
      <CustomDeckRowActions deck={deck} active={active} editing={editing} deleting={deleting} labels={labels} onCancelEditDeck={onCancelEditDeck} onSaveEditDeck={onSaveEditDeck} onStartEditDeck={onStartEditDeck} onRequestDeleteDeck={onRequestDeleteDeck} onCancelDeleteDeck={onCancelDeleteDeck} onConfirmDeleteDeck={onConfirmDeleteDeck} />
    </View>
  );
}
