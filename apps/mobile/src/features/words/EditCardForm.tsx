import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { colors, radius, spacing, typography } from "../../theme/design";

type Values = { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string };

export function EditCardForm({ card, onSubmit }: { card: Card; onSubmit: (values: Values) => void }) {
  const [values, setValues] = useState<Values>({
    cz: card.cz,
    en: card.en,
    hi: card.hi,
    ur: card.ur,
    sentence: card.sentence,
    sentenceEn: card.sentenceEn
  });
  const update = (key: keyof Values, value: string) => setValues((current) => ({ ...current, [key]: value }));

  return (
    <View style={styles.form}>
      {[
        ["cz", "Czech word"],
        ["en", "English"],
        ["hi", "Hindi"],
        ["ur", "Urdu"],
        ["sentence", "Czech example"],
        ["sentenceEn", "English example"]
      ].map(([key, label]) => (
        <TextInput key={key} style={styles.input} value={values[key as keyof Values]} onChangeText={(value) => update(key as keyof Values, value)} placeholder={label} placeholderTextColor={colors.textMuted} />
      ))}
      <Pressable style={styles.primaryButton} onPress={() => onSubmit(values)}>
        <Text style={styles.primaryButtonText}>Save correction</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus },
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, color: colors.textStrong, padding: spacing.xlPlus, fontSize: typography.bodyLarge },
  primaryButton: { alignItems: "center", backgroundColor: colors.primaryDeep, borderRadius: radius.md, padding: spacing.xlPlus },
  primaryButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold }
});
