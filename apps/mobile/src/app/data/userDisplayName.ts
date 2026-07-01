import type { User } from "@supabase/supabase-js";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function userDisplayName(user: User | null | undefined): string | null {
  const metadata = user?.user_metadata || {};
  const name = clean(metadata.display_name) || clean(metadata.full_name) || clean(metadata.name);
  if (name) return name;
  const emailName = clean(user?.email).split("@")[0]?.trim();
  return emailName || null;
}
