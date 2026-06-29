import React from "react";
import { StyleSheet, View } from "react-native";
import type { AddWordValues } from "../addWordTypes";
import { spacing } from "../../../theme/design";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";

type Props = {
  values: AddWordValues;
  onUpdate: (key: keyof AddWordValues, value: string) => void;
};

export function AddWordOptionalDetails({ values, onUpdate }: Props) {
  return (
    <FormSection icon="translate" title="Optional details">
      <View style={styles.languageRow}>
        <View style={styles.languageField}><FormField label="Hindi" value={values.hi} onChangeText={(value) => onUpdate("hi", value)} placeholder="Hindi meaning" /></View>
        <View style={styles.languageField}><FormField label="Urdu" value={values.ur} onChangeText={(value) => onUpdate("ur", value)} placeholder="Urdu meaning" rtl /></View>
      </View>
      <FormField label="Czech example" value={values.sentence} onChangeText={(value) => onUpdate("sentence", value)} placeholder="Use the word in a Czech sentence" multiline />
      <FormField label="English example" value={values.sentenceEn} onChangeText={(value) => onUpdate("sentenceEn", value)} placeholder="English translation of the example" multiline />
    </FormSection>
  );
}

const styles = StyleSheet.create({
  languageRow: { flexDirection: "row", gap: spacing.lg },
  languageField: { flex: 1 }
});
