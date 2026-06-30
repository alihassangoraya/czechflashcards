import React from "react";
import { View } from "react-native";
import type { CustomDeck } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { CustomDeckRowActions } from "./CustomDeckRowActions";
import { CustomDeckSelectArea } from "./CustomDeckSelectArea";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";

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
  const countLabel = `${count} ${count === 1 ? t("settings.wordSingular") : t("settings.wordPlural")}`;
  const labels = {
    cancelEdit: t("settings.cancelDeckEdit", { deck: deck.name }),
    deleteDeck: t("settings.deleteDeck", { deck: deck.name }),
    deleteQuestion: t("settings.deleteQuestion"),
    keepDeck: t("settings.keepDeck", { deck: deck.name }),
    renameDeck: t("settings.renameDeck", { deck: deck.name }),
    saveDeck: t("settings.saveDeck", { deck: deck.name })
  };

  return (
    <View style={[styles.customDeckRow, active && styles.customDeckRowActive]}>
      <CustomDeckSelectArea deck={deck} countLabel={countLabel} active={active} editing={editing} editingDeckName={editingDeckName} onSelectDeck={onSelectDeck} onEditingDeckNameChange={onEditingDeckNameChange} onSaveEditDeck={onSaveEditDeck} />
      <CustomDeckRowActions deck={deck} active={active} editing={editing} deleting={deleting} labels={labels} onCancelEditDeck={onCancelEditDeck} onSaveEditDeck={onSaveEditDeck} onStartEditDeck={onStartEditDeck} onRequestDeleteDeck={onRequestDeleteDeck} onCancelDeleteDeck={onCancelDeleteDeck} onConfirmDeleteDeck={onConfirmDeleteDeck} />
    </View>
  );
}
