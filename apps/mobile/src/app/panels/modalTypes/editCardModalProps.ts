import type { AppPanelProps } from "../panelTypes";

export type EditCardModalProps = Pick<
  AppPanelProps,
  "panel" | "editingCard" | "onCloseCardEditor" | "onSaveCorrection"
>;
