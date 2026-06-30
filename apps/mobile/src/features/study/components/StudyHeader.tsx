import React from "react";
import { HeaderIcon } from "../../../components/HeaderIcon";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { useI18n } from "../../../i18n/I18nProvider";

type Props = {
  onBack: () => void;
  onOpenGrammar: () => void;
};

export function StudyHeader({ onBack, onOpenGrammar }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <ScreenHeader
      title={t("app.name")}
      backLabel={t("common.backHome")}
      textAlign={textAlign}
      trailing={<HeaderIcon icon="school" label={t("study.openGrammar")} onPress={onOpenGrammar} />}
      onBack={onBack}
    />
  );
}
