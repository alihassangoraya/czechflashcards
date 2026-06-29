import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../components/MaterialIcons";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../database";
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
  const [values, setValues] = useState<AddWordValues>(initialAddWordValues);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState("");
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const update = (key: keyof AddWordValues, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = () => {
    if (!values.cz.trim() || !values.en.trim()) {
      setError("Add the Czech word and its English meaning first.");
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

      <FormSection icon="edit" title="Word" required>
        <FormField label="Czech word" value={values.cz} onChangeText={(value) => update("cz", value)} placeholder="e.g. rozumet" autoFocus />
        <FormField label="English meaning" value={values.en} onChangeText={(value) => update("en", value)} placeholder="e.g. to understand" />
      </FormSection>

      <FormSection icon="folder" title="Deck">
        <WordDeckPicker value={values.tag} decks={decks} onChange={(tag) => update("tag", tag)} />
      </FormSection>

      <AddWordDetailsToggle expanded={showDetails} onToggle={() => setShowDetails((value) => !value)} />

      {showDetails && <AddWordOptionalDetails values={values} onUpdate={update} />}

      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
      <Pressable style={styles.submitButton} onPress={submit} accessibilityRole="button">
        <MaterialIcons name="add" size={size.icon} color={colors.onPrimary} />
        <Text style={styles.submitText}>Add word</Text>
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
