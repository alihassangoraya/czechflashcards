import { useState } from "react";
import type { StudySettings } from "../../database";

export function useAppSettingsState() {
  const [settings, setSettingsState] = useState<StudySettings | null>(null);

  return { settings, setSettingsState };
}
