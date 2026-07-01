import React from "react";
import { ResetPasswordScreen } from "../../features/account";
import type { ResetPasswordRouteProps } from "./routeTypes";

export function ResetPasswordRoute({ supabase, showToast, onGoBack, onSetScreen }: ResetPasswordRouteProps) {
  return (
    <ResetPasswordScreen
      supabase={supabase}
      showToast={showToast}
      onBack={onGoBack}
      onDone={() => onSetScreen("account")}
    />
  );
}
