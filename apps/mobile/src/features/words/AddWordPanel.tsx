import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../components/MaterialIcons";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../theme/design";
import { initialAddWordValues, type AddWordValues } from "./addWordTypes";
import { AddWordDetailsToggle } from "./components/AddWordDetailsToggle";
import { AddWordIntro } from "./components/AddWordIntro";
import { AddWordOptionalDetails } from "./components/AddWordOptionalDetails";
import { CustomWordsList } from "./components/CustomWordsList";
import { FormField } from "./components/FormField";
import { FormSection } from "./components/FormSection";
import { WordDeckPicker } from "./components/WordDeckPicker";

type Props = { onSubmit: (values: AddWordValues) => void; cards: Card[]; decks: CustomDeck[]; onDelete: (cardId: string) => void; onEdit: (card: Card) => void };

export function AddWordPanel({ onSubmit, cards, decks, onDelete, onEdit }: Props) {
  const { t, textAlign } = useI18n();
  const [values, setValues] = useState<AddWordValues>(initialAddWordValues);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState("");
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const update = (key: keyof AddWordValues, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = () => {
    if (!values.cz.trim() || !values.en.trim()) {
      setError(t("words.validationRequired"));
      return;
    }
    setError("");
    onSubmit(values);
    setValues(initialAddWordValues);
    setShowDetails(false);
  };
  const confirmDelete = (cardId: string) => {
    onDelete(cardId);
    setDeleteCandidateId(null);
  };

  return (
    <View style={styles.root}>
      <AddWordIntro />

      <FormSection icon="edit" title={t("words.sectionWord")} required>
        <FormField label={t("words.czechWord")} value={values.cz} onChangeText={(value) => update("cz", value)} placeholder={t("words.czechPlaceholder")} autoFocus />
        <FormField label={t("words.englishMeaning")} value={values.en} onChangeText={(value) => update("en", value)} placeholder={t("words.englishPlaceholder")} />
      </FormSection>

      <FormSection icon="folder" title={t("words.deck")}>
        <WordDeckPicker value={values.tag} decks={decks} onChange={(tag) => update("tag", tag)} />
      </FormSection>

      <AddWordDetailsToggle expanded={showDetails} onToggle={() => setShowDetails((value) => !value)} />

      {showDetails && <AddWordOptionalDetails values={values} onUpdate={update} />}

      {Boolean(error) && <Text style={[styles.error, { textAlign }]}>{error}</Text>}
      <Pressable style={styles.submitButton} onPress={submit} accessibilityRole="button">
        <MaterialIcons name="add" size={size.icon} color={colors.onPrimary} />
        <Text style={styles.submitText}>{t("common.addWord")}</Text>
      </Pressable>

      <CustomWordsList
        cards={cards}
        decks={decks}
        deleteCandidateId={deleteCandidateId}
        onRequestDelete={setDeleteCandidateId}
        onCancelDelete={() => setDeleteCandidateId(null)}
        onConfirmDelete={confirmDelete}
        onEdit={(card) => {
          setDeleteCandidateId(null);
          onEdit(card);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.xlPlus },
  error: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  submitButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  submitText: { color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold }
});
