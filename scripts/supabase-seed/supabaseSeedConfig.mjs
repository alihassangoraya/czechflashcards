import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const endpoint = process.env.SUPABASE_REST_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "";

export const seedPath = path.join(root, "packages", "shared", "data", "vocabulary.seed.json");
export const chunkSize = Math.max(1, Number(process.env.SEED_CHUNK_SIZE || 500));
export const baseUrl = endpoint.endsWith("/rest/v1") ? endpoint : `${endpoint.replace(/\/$/, "")}/rest/v1`;
export const supabaseSeedAuth = { endpoint, serviceKey };
