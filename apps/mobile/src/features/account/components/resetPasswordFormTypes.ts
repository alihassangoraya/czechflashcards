import type { TextStyle, ViewStyle } from "react-native";

export type ResetPasswordFormProps = {
  busy: boolean;
  confirmPassword: string;
  message: string;
  password: string;
  styles: {
    copy: TextStyle;
    formPanel: ViewStyle;
    heading: TextStyle;
  };
  onChangeConfirmPassword: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
};
