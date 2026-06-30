import type { CardManagementActionProps } from "./cardManagementActionProps";
import type { CardManagementDataProps } from "./cardManagementDataProps";
import type { CardManagementStateProps } from "./cardManagementStateProps";

export type CardManagementProps =
  CardManagementDataProps &
  CardManagementStateProps &
  CardManagementActionProps;
