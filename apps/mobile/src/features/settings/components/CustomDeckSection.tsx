import React from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import { CustomDeckManagement, type CustomDeckManagementProps } from "./CustomDeckManagement";
import { SettingsSection } from "./SettingsSection";

type Props = CustomDeckManagementProps;

export function CustomDeckSection(props: Props) {
  const { t } = useI18n();

  return (
    <SettingsSection icon="folder" title={t("settings.myDecks")} description={t("settings.myDecksDescription")}>
      <CustomDeckManagement {...props} />
    </SettingsSection>
  );
}
