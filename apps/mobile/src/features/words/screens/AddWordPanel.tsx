import React from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import type { AddWordPanelProps } from "../addWordPanelTypes";
import { AddWordForm } from "../components/AddWordForm";
import { AddWordIntro } from "../components/AddWordIntro";
import { CustomWordsList } from "../components/CustomWordsList";
import { useAddWordForm } from "../useAddWordForm";
import { useCustomWordDeletion } from "../useCustomWordDeletion";

export function AddWordPanel({ onSubmit, cards, decks, onDelete, onEdit }: AddWordPanelProps) {
  const { t } = useI18n();
  const form = useAddWordForm({ onSubmit, translate: t });
  const deletion = useCustomWordDeletion({ onDelete, onEdit });

  return (
    <View style={styles.root}>
      <AddWordIntro />
      <AddWordForm form={form} decks={decks} />
      <CustomWordsList
        cards={cards}
        decks={decks}
        deleteCandidateId={deletion.deleteCandidateId}
        onRequestDelete={deletion.setDeleteCandidateId}
        onCancelDelete={() => deletion.setDeleteCandidateId(null)}
        onConfirmDelete={deletion.confirmDelete}
        onEdit={deletion.editWord}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.xlPlus }
});
