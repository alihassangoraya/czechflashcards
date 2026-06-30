import type { HomeScreenModel } from "../models/homeScreenModel";
import type { HomeScreenProps } from "../types/homeScreenTypes";

export type HomeContentProps = Pick<HomeScreenProps, "deck" | "settings" | "onSelectCategory"> & {
  model: HomeScreenModel;
};
