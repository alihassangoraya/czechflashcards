import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VITE_", "EXPO_PUBLIC_"]);

  return {
    define: {
      "process.env.EXPO_PUBLIC_SUPABASE_URL": JSON.stringify(env.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || ""),
      "process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY": JSON.stringify(env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ""),
      "process.env.EXPO_PUBLIC_GEMINI_API_KEY": JSON.stringify(env.EXPO_PUBLIC_GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || ""),
      "process.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || ""),
      "process.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ""),
      "process.env.VITE_GEMINI_API_KEY": JSON.stringify(env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "")
    },
    resolve: {
      alias: {
        "react-native": "react-native-web"
      },
      extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".web.jsx", ".web.js", ".jsx", ".js", ".json"]
    },
    build: {
      outDir: "dist",
      emptyOutDir: true
    }
  };
});
