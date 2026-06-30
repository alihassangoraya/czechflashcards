import type { HomeHeroProps } from "../components/homeHeroTypes";
import type { HomeScreenModel } from "./homeScreenModel";
import type { HomeScreenProps } from "../types/homeScreenTypes";

type Input = {
  model: HomeScreenModel;
  props: HomeScreenProps;
  wide: boolean;
};

export function buildHomeHeroProps({ model, props, wide }: Input): HomeHeroProps {
  return {
    activeDeckLabel: model.activeDeckLabel,
    examLevel: props.settings.examLevel,
    dueCount: model.dueCount,
    accountEmail: props.accountEmail,
    wide,
    onStartStudy: props.onStartStudy,
    onStartQuiz: props.onStartQuiz,
    onSearch: props.onSearch,
    onAdd: props.onAdd,
    onSettings: props.onSettings,
    onAccount: props.onAccount
  };
}
