import type { MaterialIconName } from "../../../components/MaterialIcons";
import type { TranslationKey } from "../../../i18n/translations";

export type Category = {
  id: string;
  title: string;
  icon: MaterialIconName;
  color: string;
  count?: number;
};

export type GuideItem = {
  icon: MaterialIconName;
  textKey: TranslationKey;
};
