export function assertSupabaseSeedEnv({ endpoint, serviceKey }) {
  if (!endpoint) throw new Error("Set SUPABASE_REST_URL or EXPO_PUBLIC_SUPABASE_URL.");
  if (!serviceKey) throw new Error("Set SUPABASE_SERVICE_ROLE_KEY. Do not use the publishable anon key for seeding.");
}
