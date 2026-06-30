export const legacyReferenceRules = [
  {
    file: "legacy-web/README.md",
    required: ["reference only", "apps/mobile/dist"],
    message: "Legacy web README must mark the static app as reference-only."
  },
  {
    file: "wrangler.toml",
    required: ['directory = "apps/mobile/dist"'],
    forbidden: ['directory = "legacy-web"'],
    message: "Cloudflare assets must deploy the React Native web build."
  },
  {
    file: "worker/appRoutes.js",
    required: ["/quiz", "/flashcards", "/login", "/register"],
    forbidden: ["legacy-web"],
    message: "Worker routes must serve the shared app shell, not legacy web."
  },
  {
    file: "package.json",
    required: ["npm --prefix apps/mobile run build:web"],
    forbidden: ["-d legacy-web", "legacy-web/index.html"],
    message: "Root scripts must build and serve apps/mobile, not legacy web."
  }
];
