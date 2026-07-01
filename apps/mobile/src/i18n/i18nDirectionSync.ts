import { I18nManager } from "react-native";
import type { TextDirection } from "./i18nCore";

type DirectionManager = typeof I18nManager & {
  swapLeftAndRightInRTL?: (value: boolean) => void;
};

export function syncI18nDirection(direction: TextDirection) {
  const isRtl = direction === "rtl";
  const manager = I18nManager as DirectionManager;
  manager.allowRTL(isRtl);
  manager.forceRTL(isRtl);
  manager.swapLeftAndRightInRTL?.(true);
}
