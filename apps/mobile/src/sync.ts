import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppDatabase } from "./database";
import { env } from "./env";

export type SyncStatus = "guest" | "not-configured" | "idle" | "synced" | "error";

let client: SupabaseClient | null | undefined;

export function createSupabaseClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    client = null;
    return client;
  }
  client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: AsyncStorage
    }
  });
  return client;
}

export async function signInWithPassword(supabase: SupabaseClient | null, email: string, password: string): Promise<string | null> {
  if (!supabase) return "Supabase is not configured for this build.";
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  return error?.message || null;
}

export async function signUpWithPassword(supabase: SupabaseClient | null, email: string, password: string, displayName: string): Promise<string | null> {
  if (!supabase) return "Supabase is not configured for this build.";
  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { display_name: displayName.trim() } }
  });
  return error?.message || null;
}

export async function signOut(supabase: SupabaseClient | null): Promise<string | null> {
  if (!supabase) return "Supabase is not configured for this build.";
  const { error } = await supabase.auth.signOut();
  return error?.message || null;
}

export async function getFriendCode(supabase: SupabaseClient | null): Promise<string | null> {
  if (!supabase) return null;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;
  const { data } = await supabase.from("profiles").select("friend_code").eq("user_id", userData.user.id).maybeSingle();
  return data?.friend_code || null;
}

export async function sendFriendRequest(supabase: SupabaseClient | null, friendCode: string): Promise<string | null> {
  if (!supabase) return "Supabase is not configured for this build.";
  const { error } = await supabase.rpc("send_friend_request", { target_friend_code: friendCode.trim() });
  return error?.message || null;
}

export type FriendRequest = { id: string; friend_code: string; display_name: string | null };
export type FriendStreak = { friend_code: string; display_name: string | null; current_streak: number | null; privacy_level: string };

export async function loadFriendActivity(supabase: SupabaseClient | null): Promise<{ requests: FriendRequest[]; friends: FriendStreak[] }> {
  if (!supabase) return { requests: [], friends: [] };
  const [requestsResult, friendsResult] = await Promise.all([
    supabase.rpc("friend_requests"),
    supabase.rpc("friend_streaks")
  ]);
  return { requests: requestsResult.data || [], friends: friendsResult.data || [] };
}

export async function respondToFriendRequest(supabase: SupabaseClient | null, requestId: string, accept: boolean): Promise<string | null> {
  if (!supabase) return "Supabase is not configured for this build.";
  const { error } = await supabase.rpc("respond_to_friend_request", { request_id: requestId, accept_request: accept });
  return error?.message || null;
}

export async function flushSyncQueue(db: AppDatabase, supabase: SupabaseClient | null): Promise<SyncStatus> {
  if (!supabase) return "not-configured";
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return "guest";

  const rows = await db.getAllAsync<any>("SELECT * FROM sync_queue WHERE synced_at IS NULL ORDER BY id ASC LIMIT 100");
  if (!rows.length) return "idle";

  const payload = rows.map((row) => ({
    user_id: userData.user.id,
    local_id: row.id,
    event_type: row.type,
    payload: JSON.parse(row.payload_json),
    created_at_ms: row.created_at
  }));

  const { error } = await supabase.from("sync_events").insert(payload);
  if (error) return "error";

  const now = Date.now();
  await db.withTransactionAsync(async () => {
    for (const row of rows) {
      await db.runAsync("UPDATE sync_queue SET synced_at = ? WHERE id = ?", now, row.id);
    }
  });
  return "synced";
}

export async function restoreSyncSnapshot(db: AppDatabase, supabase: SupabaseClient | null): Promise<SyncStatus> {
  if (!supabase) return "not-configured";
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return "guest";
  const { data, error } = await supabase.rpc("sync_snapshot");
  if (error || !data) return "error";

  const snapshot = data as Record<string, any[]>;
  const now = Date.now();
  await db.withTransactionAsync(async () => {
    for (const row of snapshot.user_cards || []) {
      await db.runAsync(
        `INSERT INTO user_cards (card_id, known_streak, again_count, due_at, seen, updated_at) VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(card_id) DO UPDATE SET known_streak = excluded.known_streak, again_count = excluded.again_count,
           due_at = excluded.due_at, seen = excluded.seen, updated_at = excluded.updated_at`,
        row.card_id, row.known_streak, row.again_count, Date.parse(row.due_at) || 0, row.seen, Date.parse(row.updated_at) || now
      );
    }
    for (const row of snapshot.custom_cards || []) {
      const card = { id: row.id, cz: row.cz, en: row.en, hi: row.hi, ur: row.ur, sentence: row.sentence, sentenceEn: row.sentence_en, level: row.level, tags: row.tags, source: "custom" };
      await db.runAsync(
        `INSERT OR REPLACE INTO cards (id, cz, en, hi, ur, sentence, sentence_en, level, tags_json, source, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'custom', ?)`,
        card.id, card.cz, card.en, card.hi, card.ur, card.sentence, card.sentenceEn, card.level, JSON.stringify(card.tags), now
      );
      await db.runAsync("INSERT OR REPLACE INTO custom_cards (id, payload_json, deleted_at, synced_at) VALUES (?, ?, NULL, ?)", card.id, JSON.stringify(card), now);
    }
    for (const row of snapshot.saved_cards || []) {
      await db.runAsync("INSERT OR REPLACE INTO saved_cards (card_id, saved_at, synced_at) VALUES (?, ?, ?)", row.card_id, Date.parse(row.saved_at) || now, now);
    }
    for (const row of snapshot.card_overrides || []) {
      await db.runAsync("INSERT OR REPLACE INTO card_overrides (id, payload_json, updated_at, synced_at) VALUES (?, ?, ?, ?)", row.card_id, JSON.stringify(row.payload), Date.parse(row.updated_at) || now, now);
    }
  });
  return "synced";
}
