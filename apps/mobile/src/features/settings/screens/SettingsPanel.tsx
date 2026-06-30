import React from "react";
import { SettingsContent } from "../components/SettingsContent";
import type { SettingsPanelProps } from "../settingsPanelTypes";
import { useSettingsPanelModel } from "../hooks/useSettingsPanelModel";
import { useSettingsDraft } from "../hooks/useSettingsDraft";

export function SettingsPanel(props: SettingsPanelProps) {
  const { settings, onChange } = props;
  const { activeDeckLabel } = useSettingsPanelModel(settings);
  const draft = useSettingsDraft(settings, onChange);

  return <SettingsContent {...props} activeDeckLabel={activeDeckLabel} draft={draft} />;
}
