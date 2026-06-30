import React from "react";
import { Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { CardBackFaceContainer } from "./CardFaceContainer";
import { CardExampleBlock } from "./CardExampleBlock";
import { CardTranslationBlock } from "./CardTranslationBlock";
import { studyCardBackStyles as styles } from "./studyCardBackStyles";
import type { StudyCardBackProps } from "./studyCardBackTypes";
import { StudyCardHint } from "./StudyCardHint";

export function StudyCardBack({ current, currentSecondaryMeaning, flipProgress, meaningLanguage, onFlipCard }: StudyCardBackProps) {
  const { t, textAlign } = useI18n();

  return (
    <CardBackFaceContainer flipProgress={flipProgress} onPress={onFlipCard}>
      <Text style={styles.backWord}>{current.cz}</Text>
      <View style={styles.answer}>
        <CardTranslationBlock card={current} secondaryMeaning={currentSecondaryMeaning} meaningLanguage={meaningLanguage} />
        <CardExampleBlock card={current} />
      </View>
      <StudyCardHint textAlign={textAlign}>{t("study.tapCzech")}</StudyCardHint>
    </CardBackFaceContainer>
  );
}
