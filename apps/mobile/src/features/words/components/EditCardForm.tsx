import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { editCardFields } from "./editCardFields";
import { editCardFormStyles as styles } from "./editCardFormStyles";
import type { EditCardFieldKey, EditCardFormProps, EditCardFormValues } from "./editCardFormTypes";
import { EditCardInput } from "./EditCardInput";

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

  function update(key: EditCardFieldKey, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <View style={styles.form}>
      {editCardFields.map((field) => (
        <EditCardInput key={field.key} fieldKey={field.key} label={field.label || t(field.labelKey)} rtl={field.rtl} value={values[field.key]} onChange={update} />
      ))}
      <Pressable style={styles.primaryButton} onPress={() => onSubmit(values)}>
        <Text style={styles.primaryButtonText}>{t("words.saveCorrection")}</Text>
      </Pressable>
    </View>
  );
}
