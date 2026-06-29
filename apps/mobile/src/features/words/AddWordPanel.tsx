import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../components/MaterialIcons";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../database";
import { colors, radius, size, spacing, typography } from "../../theme/design";
import { initialAddWordValues, type AddWordValues } from "./addWordTypes";
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
      <View style={styles.intro}>
        <View style={styles.introIcon}><MaterialIcons name="add-circle-outline" size={size.iconMedium} color={colors.primaryDeep} /></View>
        <View style={styles.introCopy}>
          <Text style={styles.introTitle}>Make it yours</Text>
          <Text style={styles.introText}>Core Czech and English fields are required. Add translations and context whenever you have them.</Text>
        </View>
      </View>

      <FormSection icon="edit" title="Word" required>
        <FormField label="Czech word" value={values.cz} onChangeText={(value) => update("cz", value)} placeholder="e.g. rozumet" autoFocus />
        <FormField label="English meaning" value={values.en} onChangeText={(value) => update("en", value)} placeholder="e.g. to understand" />
      </FormSection>

      <FormSection icon="folder" title="Deck">
        <WordDeckPicker value={values.tag} decks={decks} onChange={(tag) => update("tag", tag)} />
      </FormSection>

      <Pressable style={styles.detailsToggle} onPress={() => setShowDetails((value) => !value)} accessibilityRole="button" accessibilityState={{ expanded: showDetails }}>
        <View style={styles.detailsToggleCopy}>
          <MaterialIcons name="library-add" size={size.iconSmall} color={colors.action} />
          <Text style={styles.detailsToggleText}>Translations and context</Text>
        </View>
        <MaterialIcons name={showDetails ? "expand-less" : "expand-more"} size={size.icon} color={colors.action} />
      </Pressable>

      {showDetails && (
        <FormSection icon="translate" title="Optional details">
          <View style={styles.languageRow}>
            <View style={styles.languageField}><FormField label="Hindi" value={values.hi} onChangeText={(value) => update("hi", value)} placeholder="Hindi meaning" /></View>
            <View style={styles.languageField}><FormField label="Urdu" value={values.ur} onChangeText={(value) => update("ur", value)} placeholder="Urdu meaning" rtl /></View>
          </View>
          <FormField label="Czech example" value={values.sentence} onChangeText={(value) => update("sentence", value)} placeholder="Use the word in a Czech sentence" multiline />
          <FormField label="English example" value={values.sentenceEn} onChangeText={(value) => update("sentenceEn", value)} placeholder="English translation of the example" multiline />
        </FormSection>
      )}

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
  intro: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  introIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  introCopy: { flex: 1, gap: spacing.xxs },
  introTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  introText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  languageRow: { flexDirection: "row", gap: spacing.lg },
  languageField: { flex: 1 },
  detailsToggle: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.xl },
  detailsToggleCopy: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  detailsToggleText: { color: colors.action, fontSize: typography.body, fontWeight: typography.weightSemibold },
  error: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  submitButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  submitText: { color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold }
});
