import React, { useMemo } from "react";
import { I18nContext } from "./i18nContext";
import { syncI18nDirection } from "./i18nDirectionSync";
import { createI18nValue } from "./i18nValue";

export function I18nProvider({ language, children }: { language?: string | null; children: React.ReactNode }) {
  const value = useMemo(() => createI18nValue(language), [language]);
  syncI18nDirection(value.direction);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
export { useI18n } from "./i18nContext";
