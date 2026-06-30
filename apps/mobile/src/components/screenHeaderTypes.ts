import type { ReactNode } from "react";

export type ScreenHeaderProps = {
  title: string;
  backLabel: string;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  trailing?: ReactNode;
  onBack: () => void;
};
