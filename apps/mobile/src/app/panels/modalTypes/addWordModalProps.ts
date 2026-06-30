import type { AppPanelProps } from "../panelTypes/index";

export type AddWordModalProps = Pick<
  AppPanelProps,
  | "panel"
  | "customCards"
  | "settings"
  | "onSetPanel"
  | "onAddWord"
  | "onDeleteWord"
  | "onOpenCardEditor"
>;
