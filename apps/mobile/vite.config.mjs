import { defineConfig, loadEnv } from "vite";

const vocabularyChunkWarningLimitKb = 3200;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VITE_", "EXPO_PUBLIC_"]);

  return {
    define: {
      "process.env.EXPO_PUBLIC_SUPABASE_URL": JSON.stringify(env.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || ""),
      "process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY": JSON.stringify(env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ""),
      "process.env.EXPO_PUBLIC_GEMINI_API_KEY": JSON.stringify(env.EXPO_PUBLIC_GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || ""),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || ""),
      "process.env.GOOGLE_API_KEY": JSON.stringify(env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY || ""),
      "process.env.GOOGLE_GENERATIVE_AI_API_KEY": JSON.stringify(env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""),
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
      emptyOutDir: true,
      chunkSizeWarningLimit: vocabularyChunkWarningLimitKb,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("vocabulary.seed.json")) return "seed-vocabulary";
            if (id.includes("node_modules/react-native-web") || id.includes("node_modules/react") || id.includes("node_modules/scheduler")) return "vendor-react-native";
            if (id.includes("node_modules/@supabase")) return "vendor-supabase";
            if (id.includes("packages/shared")) return "shared";
          }
        }
      }
    }
  };
});
