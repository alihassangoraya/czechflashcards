import { Linking, Platform } from "react-native";
import type { AuthProvider } from "./syncTypes";
import type { AppSupabaseClient } from "./supabaseClient";

const notConfiguredMessage = "Supabase is not configured for this build.";
const openUrlError = "Could not open the provider sign-in page.";

function redirectTo() {
  return Platform.OS === "web" && typeof window !== "undefined" ? window.location.origin : undefined;
}

export async function signInWithOAuthProvider(supabase: AppSupabaseClient, provider: AuthProvider): Promise<string | null> {
  if (!supabase) return notConfiguredMessage;
  const { data, error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: redirectTo() } });
  if (error) return error.message;
  if (Platform.OS === "web" || !data.url) return null;
  if (!(await Linking.canOpenURL(data.url))) return openUrlError;
  await Linking.openURL(data.url);
  return null;
}
