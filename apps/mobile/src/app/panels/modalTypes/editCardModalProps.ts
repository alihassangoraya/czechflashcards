import type { AppPanelProps } from "../panelTypes/index";

export type EditCardModalProps = Pick<
  AppPanelProps,
  "panel" | "editingCard" | "onCloseCardEditor" | "onSaveCorrection"
>;
