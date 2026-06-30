import { I18nManager } from "react-native";
import type { TextDirection } from "./i18nCore";

export function syncI18nDirection(direction: TextDirection) {
  const isRtl = direction === "rtl";
  if (I18nManager.isRTL !== isRtl) I18nManager.allowRTL(isRtl);
}
