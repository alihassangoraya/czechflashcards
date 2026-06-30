import React from "react";
import { StyleSheet, View } from "react-native";
import type { AddWordValues } from "../addWordTypes";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";

type Props = {
  values: AddWordValues;
  onUpdate: (key: keyof AddWordValues, value: string) => void;
};

export function AddWordOptionalDetails({ values, onUpdate }: Props) {
  const { t } = useI18n();

  return (
    <FormSection icon="translate" title={t("words.optionalDetails")}>
      <View style={styles.languageRow}>
        <View style={styles.languageField}><FormField label={t("language.hindi")} value={values.hi} onChangeText={(value) => onUpdate("hi", value)} placeholder={t("words.hindiMeaning")} /></View>
        <View style={styles.languageField}><FormField label={t("language.urdu")} value={values.ur} onChangeText={(value) => onUpdate("ur", value)} placeholder={t("words.urduMeaning")} rtl /></View>
      </View>
      <FormField label={t("words.czechExample")} value={values.sentence} onChangeText={(value) => onUpdate("sentence", value)} placeholder={t("words.czechExamplePlaceholder")} multiline />
      <FormField label={t("words.englishExample")} value={values.sentenceEn} onChangeText={(value) => onUpdate("sentenceEn", value)} placeholder={t("words.englishExamplePlaceholder")} multiline />
    </FormSection>
  );
}

const styles = StyleSheet.create({
  languageRow: { flexDirection: "row", gap: spacing.lg },
  languageField: { flex: 1 }
});
