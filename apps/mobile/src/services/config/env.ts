import { publicRuntimeConfig } from "./publicRuntimeConfig";

export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || publicRuntimeConfig.supabaseUrl,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || publicRuntimeConfig.supabaseAnonKey,
  geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    "",
  geminiModel: process.env.EXPO_PUBLIC_GEMINI_MODEL ||
    process.env.VITE_GEMINI_MODEL ||
    process.env.GEMINI_MODEL ||
    publicRuntimeConfig.geminiModel
};
