import type { CardEditorActionProps } from "./cardEditorActionProps";
import type { CardEditorDataProps } from "./cardEditorDataProps";
import type { CardEditorStateProps } from "./cardEditorStateProps";

export type CardEditorProps =
  CardEditorDataProps &
  CardEditorStateProps &
  CardEditorActionProps;
