import React from "react";
import { Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { CardBackFaceContainer } from "./CardFaceContainer";
import { CardExampleBlock } from "./CardExampleBlock";
import { CardTranslationBlock } from "./CardTranslationBlock";
import { studyCardBackStyles as styles } from "./studyCardBackStyles";
import type { StudyCardBackProps } from "./studyCardBackTypes";
import { StudyCardHint } from "./StudyCardHint";
import { StudyCardRelatedWords } from "./StudyCardRelatedWords";
import { WordDetailsPanel } from "./WordDetailsPanel";

export function StudyCardBack({ current, currentSecondaryMeaning, flipProgress, meaningLanguage, onFlipCard }: StudyCardBackProps) {
  const { t } = useI18n();

  return (
    <CardBackFaceContainer flipProgress={flipProgress} onPress={onFlipCard}>
      <Text style={styles.backWord}>{current.cz}</Text>
      <View style={styles.answer}>
        <CardTranslationBlock card={current} secondaryMeaning={currentSecondaryMeaning} meaningLanguage={meaningLanguage} />
        <CardExampleBlock card={current} />
        <StudyCardRelatedWords card={current} />
        <WordDetailsPanel card={current} />
      </View>
      <StudyCardHint>{t("study.tapCzech")}</StudyCardHint>
    </CardBackFaceContainer>
  );
}
