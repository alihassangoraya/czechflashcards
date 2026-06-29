import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../database";
import { colors, radius, size, spacing, typography } from "../../theme/design";

type Values = { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string; tag: string };
type Props = { onSubmit: (values: Values) => void; cards: Card[]; decks: CustomDeck[]; onDelete: (cardId: string) => void };

const deckOptions = ["custom", "daily", "work", "travel", "health", "verbs"];

export function AddWordPanel({ onSubmit, cards, decks, onDelete }: Props) {
  const [values, setValues] = useState<Values>({ cz: "", en: "", hi: "", ur: "", sentence: "", sentenceEn: "", tag: "custom" });
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState("");
  const update = (key: keyof Values, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = () => {
    if (!values.cz.trim() || !values.en.trim()) {
      setError("Add the Czech word and its English meaning first.");
      return;
    }
    setError("");
    onSubmit(values);
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
            <Text style={styles.savedTitle}>Your added words</Text>
            <Text style={styles.savedCount}>{cards.length}</Text>
          </View>
          {cards.slice(0, 12).map((card) => (
            <View key={card.id} style={styles.savedRow}>
              <View style={styles.savedCopy}>
                <Text style={styles.savedWord}>{card.cz}</Text>
                <Text style={styles.savedMeaning}>{card.en}</Text>
              </View>
              <Pressable style={styles.deleteButton} onPress={() => onDelete(card.id)} accessibilityRole="button" accessibilityLabel={`Delete ${card.cz}`}>
                <MaterialIcons name="delete-outline" size={size.iconSmall} color={colors.danger} />
              </Pressable>
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
  const options = [...deckOptions, ...decks.map((deck) => deck.id)];
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
  return decks.find((deck) => deck.id === value)?.name || value.charAt(0).toUpperCase() + value.slice(1);
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
  savedSection: { gap: spacing.smd, borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xlPlus },
  savedHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  savedTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  savedCount: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  savedRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl },
  savedCopy: { flex: 1, gap: spacing.xxs },
  savedWord: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  savedMeaning: { color: colors.textMuted, fontSize: typography.bodySmall },
  deleteButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.dangerSoft }
});
