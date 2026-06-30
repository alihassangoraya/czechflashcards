import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";

export type EditCardFormValues = { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string };

type EditCardFormProps = {
  card: Card;
  onSubmit: (values: EditCardFormValues) => void;
};

export function EditCardForm({ card, onSubmit }: EditCardFormProps) {
  const { t } = useI18n();
  const [values, setValues] = useState<EditCardFormValues>({
    cz: card.cz,
    en: card.en,
    hi: card.hi,
    ur: card.ur,
    sentence: card.sentence,
    sentenceEn: card.sentenceEn
  });
  const update = (key: keyof EditCardFormValues, value: string) => setValues((current) => ({ ...current, [key]: value }));

  return (
    <View style={styles.form}>
      {[
        ["cz", t("words.czechWord")],
        ["en", t("language.english")],
        ["hi", t("language.hindi")],
        ["ur", t("language.urdu")],
        ["sentence", t("words.czechExample")],
        ["sentenceEn", t("words.englishExample")]
      ].map(([key, label]) => (
        <TextInput key={key} style={[styles.input, key === "ur" && styles.rtl]} value={values[key as keyof EditCardFormValues]} onChangeText={(value) => update(key as keyof EditCardFormValues, value)} placeholder={label} placeholderTextColor={colors.textMuted} />
      ))}
      <Pressable style={styles.primaryButton} onPress={() => onSubmit(values)}>
        <Text style={styles.primaryButtonText}>{t("words.saveCorrection")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus },
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, color: colors.textStrong, padding: spacing.xlPlus, fontSize: typography.bodyLarge },
  rtl: { writingDirection: "rtl", textAlign: "right" },
  primaryButton: { alignItems: "center", backgroundColor: colors.primaryDeep, borderRadius: radius.md, padding: spacing.xlPlus },
  primaryButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold }
});
