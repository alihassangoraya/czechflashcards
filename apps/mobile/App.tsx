import React, { useMemo } from "react";
import { AppShell } from "./src/app/AppShell";
import { useAppController } from "./src/app/useAppController";
import { AppLoadingScreen } from "./src/components/AppLoadingScreen";
import { createSupabaseClient } from "./src/sync";

export default function App() {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const shellProps = useAppController(supabase);

  if (!shellProps) return <AppLoadingScreen />;

  return <AppShell {...shellProps} />;
}
