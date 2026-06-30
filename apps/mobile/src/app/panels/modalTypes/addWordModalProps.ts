import type { AppPanelProps } from "../panelTypes";

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
