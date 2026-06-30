import type { HomeScreenModel } from "../homeScreenModel";
import type { HomeScreenProps } from "../homeScreenTypes";

export type HomeContentProps = Pick<HomeScreenProps, "deck" | "settings" | "onSelectCategory"> & {
  model: HomeScreenModel;
};
