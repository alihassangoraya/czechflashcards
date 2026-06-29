import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MaterialIcons from "../../components/MaterialIcons";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../database";
import { colors, radius, size, spacing, typography } from "../../theme/design";

type Values = { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string; tag: string };
type Props = { onSubmit: (values: Values) => void; cards: Card[]; decks: CustomDeck[]; onDelete: (cardId: string) => void; onEdit: (card: Card) => void };

const deckOptions = ["a2-focus", "b1-focus", "daily", "extended", "travel", "work", "health", "verbs", "forms", "numbers", "custom"];
const initialValues: Values = { cz: "", en: "", hi: "", ur: "", sentence: "", sentenceEn: "", tag: "custom" };

export function AddWordPanel({ onSubmit, cards, decks, onDelete, onEdit }: Props) {
  const [values, setValues] = useState<Values>(initialValues);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState("");
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const update = (key: keyof Values, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = () => {
    if (!values.cz.trim() || !values.en.trim()) {
      setError("Add the Czech word and its English meaning first.");
      return;
    }
    setError("");
    onSubmit(values);
    setValues(initialValues);
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
        <DeckPicker value={values.tag} decks={decks} onChange={(tag) => update("tag", tag)} />
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

      {cards.length > 0 && (
        <View style={styles.savedSection}>
          <View style={styles.savedHeader}>
            <View style={styles.savedHeaderCopy}>
              <Text style={styles.savedTitle}>Your added words</Text>
              <Text style={styles.savedSubtitle}>Edit details or remove words you added yourself.</Text>
            </View>
            <View style={styles.savedCountPill}>
              <Text style={styles.savedCount}>{cards.length}</Text>
            </View>
          </View>
          {cards.slice(0, 12).map((card) => (
            <View key={card.id} style={styles.savedCard}>
              <View style={styles.savedRow}>
                <View style={styles.savedAccent}>
                  <MaterialIcons name="auto-stories" size={size.iconSmall} color={colors.primaryDeep} />
                </View>
                <View style={styles.savedCopy}>
                  <View style={styles.savedTitleRow}>
                    <Text style={styles.savedWord} numberOfLines={1}>{card.cz}</Text>
                    <View style={styles.savedDeckPill}>
                      <Text style={styles.savedDeckText} numberOfLines={1}>{customCardDeckLabel(card, decks)}</Text>
                    </View>
                  </View>
                  <Text style={styles.savedMeaning} numberOfLines={2}>{card.en}</Text>
                </View>
                <View style={styles.savedActions}>
                  <Pressable
                    style={styles.editButton}
                    onPress={() => {
                      setDeleteCandidateId(null);
                      onEdit(card);
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`Edit ${card.cz}`}
                  >
                    <MaterialIcons name="edit" size={size.iconSmall} color={colors.action} />
                  </Pressable>
                  <Pressable
                    style={[styles.deleteButton, deleteCandidateId === card.id && styles.deleteButtonActive]}
                    onPress={() => setDeleteCandidateId(card.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${card.cz}`}
                  >
                    <MaterialIcons name="delete-outline" size={size.iconSmall} color={colors.danger} />
                  </Pressable>
                </View>
              </View>
              {deleteCandidateId === card.id && (
                <View style={styles.deleteWarning}>
                  <View style={styles.deleteWarningCopy}>
                    <Text style={styles.deleteWarningTitle}>Delete this word?</Text>
                    <Text style={styles.deleteWarningText}>This removes it from your custom words and study queue.</Text>
                  </View>
                  <View style={styles.deleteWarningActions}>
                    <Pressable style={styles.cancelDeleteButton} onPress={() => setDeleteCandidateId(null)} accessibilityRole="button">
                      <Text style={styles.cancelDeleteText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={styles.confirmDeleteButton} onPress={() => confirmDelete(card.id)} accessibilityRole="button">
                      <Text style={styles.confirmDeleteText}>Delete</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function FormSection({ icon, title, required = false, children }: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; title: string; required?: boolean; children: React.ReactNode }) {
  return (
    <View style={styles.formSection}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name={icon} size={size.iconSmall} color={colors.primaryDeep} />
        <Text style={styles.sectionTitle}>{title}</Text>
        {required && <Text style={styles.required}>Required</Text>}
      </View>
      {children}
    </View>
  );
}

function FormField({ label, value, onChangeText, placeholder, autoFocus = false, multiline = false, rtl = false }: { label: string; value: string; onChangeText: (value: string) => void; placeholder: string; autoFocus?: boolean; multiline?: boolean; rtl?: boolean }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={[styles.input, multiline && styles.textarea, rtl && styles.rtl]} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.textMuted} autoFocus={autoFocus} autoCapitalize={rtl ? "none" : "sentences"} multiline={multiline} textAlignVertical={multiline ? "top" : "center"} />
    </View>
  );
}

function DeckPicker({ value, decks, onChange }: { value: string; decks: CustomDeck[]; onChange: (value: string) => void }) {
  const options = Array.from(new Set([...deckOptions, ...decks.map((deck) => deck.id)]));
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deckPicker}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.deckChip, value === option && styles.deckChipActive]} onPress={() => onChange(option)}>
          <Text style={[styles.deckChipText, value === option && styles.deckChipTextActive]}>{deckLabel(option, decks)}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function deckLabel(value: string, decks: CustomDeck[]) {
  return decks.find((deck) => deck.id === value)?.name || ({
    "a2-focus": "A2 Focus",
    "b1-focus": "B1 Focus"
  }[value] || value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase()));
}

function customCardDeckLabel(card: Card, decks: CustomDeck[]) {
  const customDeckIds = new Set(decks.map((deck) => deck.id));
  const tag = card.tags.find((value) => customDeckIds.has(value)) || card.tags.find((value) => value !== "custom") || "custom";
  return deckLabel(tag, decks);
}

const styles = StyleSheet.create({
  root: { gap: spacing.xlPlus },
  intro: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  introIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  introCopy: { flex: 1, gap: spacing.xxs },
  introTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  introText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  formSection: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  sectionTitle: { flex: 1, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  required: { color: colors.primaryDeep, fontSize: typography.caption, fontWeight: typography.weightSemibold },
  field: { gap: spacing.smd },
  fieldLabel: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  input: { minHeight: size.reviewButton, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, color: colors.textStrong, fontSize: typography.body, paddingHorizontal: spacing.xl },
  textarea: { minHeight: size.cardHeight / 5, paddingTop: spacing.xl, paddingBottom: spacing.xl },
  rtl: { writingDirection: "rtl", textAlign: "right" },
  languageRow: { flexDirection: "row", gap: spacing.lg },
  languageField: { flex: 1 },
  deckPicker: { gap: spacing.smd, paddingRight: spacing.xl },
  deckChip: { borderRadius: radius.md, backgroundColor: colors.surfaceMuted, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  deckChipActive: { backgroundColor: colors.primaryDeep },
  deckChipText: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  deckChipTextActive: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  detailsToggle: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.xl },
  detailsToggleCopy: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  detailsToggleText: { color: colors.action, fontSize: typography.body, fontWeight: typography.weightSemibold },
  error: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  submitButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  submitText: { color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  savedSection: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xlPlus },
  savedHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg },
  savedHeaderCopy: { flex: 1, gap: spacing.xxs },
  savedTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  savedSubtitle: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  savedCountPill: { minWidth: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.card, backgroundColor: colors.primarySoft, paddingHorizontal: spacing.smd },
  savedCount: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  savedCard: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.smd },
  savedRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.md },
  savedAccent: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  savedCopy: { flex: 1, gap: spacing.xs },
  savedTitleRow: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  savedWord: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  savedDeckPill: { maxWidth: size.cardHeight / 2, borderRadius: radius.card, backgroundColor: colors.surfaceMuted, paddingHorizontal: spacing.smd, paddingVertical: spacing.xxs },
  savedDeckText: { color: colors.textSoft, fontSize: typography.caption, fontWeight: typography.weightSemibold },
  savedMeaning: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  savedActions: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  editButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.actionSoft },
  deleteButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.dangerSoft },
  deleteButtonActive: { borderWidth: spacing.hairline, borderColor: colors.danger },
  deleteWarning: { gap: spacing.md, borderRadius: radius.sm, backgroundColor: colors.dangerSoft, padding: spacing.lg },
  deleteWarningCopy: { gap: spacing.xxs },
  deleteWarningTitle: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  deleteWarningText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  deleteWarningActions: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.smd },
  cancelDeleteButton: { minHeight: size.cardAction, justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.surface, paddingHorizontal: spacing.lg },
  cancelDeleteText: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  confirmDeleteButton: { minHeight: size.cardAction, justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.danger, paddingHorizontal: spacing.lg },
  confirmDeleteText: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
