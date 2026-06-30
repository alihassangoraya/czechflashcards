import React from "react";
import { Pressable, Text } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size } from "../../../theme/design";
import { AddWordDetailsToggle } from "./AddWordDetailsToggle";
import { AddWordOptionalDetails } from "./AddWordOptionalDetails";
import { addWordFormStyles as styles } from "./addWordFormStyles";
import type { AddWordFormProps } from "./addWordFormTypes";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";
import { WordDeckPicker } from "./WordDeckPicker";

export function AddWordForm({ form, decks }: AddWordFormProps) {
  const { t, textAlign } = useI18n();

  return (
    <>
      <FormSection icon="edit" title={t("words.sectionWord")} required>
        <FormField label={t("words.czechWord")} value={form.values.cz} onChangeText={(value) => form.update("cz", value)} placeholder={t("words.czechPlaceholder")} autoFocus />
        <FormField label={t("words.englishMeaning")} value={form.values.en} onChangeText={(value) => form.update("en", value)} placeholder={t("words.englishPlaceholder")} />
      </FormSection>
      <FormSection icon="folder" title={t("words.deck")}>
        <WordDeckPicker value={form.values.tag} decks={decks} onChange={(tag) => form.update("tag", tag)} />
      </FormSection>
      <AddWordDetailsToggle expanded={form.showDetails} onToggle={() => form.setShowDetails((value) => !value)} />
      {form.showDetails && <AddWordOptionalDetails values={form.values} onUpdate={form.update} />}
      {Boolean(form.error) && <Text style={[styles.error, { textAlign }]}>{form.error}</Text>}
      <Pressable style={styles.submitButton} onPress={form.submit} accessibilityRole="button">
        <MaterialIcons name="add" size={size.icon} color={colors.onPrimary} />
        <Text style={styles.submitText}>{t("common.addWord")}</Text>
      </Pressable>
    </>
  );
}
