import Constants from "expo-constants";

type Extra = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  geminiApiKey?: string;
};

const extra = (Constants.expoConfig?.extra || {}) as Extra;

export const env = {
  supabaseUrl: extra.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: extra.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
  geminiApiKey: extra.geminiApiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY || ""
};
