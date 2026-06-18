import { getSupabase } from "./supabase";
import type { Subscription, ActivityItem, Settings } from "./types";

export interface CloudData {
  subscriptions: Subscription[];
  activity: ActivityItem[];
  settings: Settings;
}

const TABLE = "subscriptions_data";

export async function loadCloudData(userId: string): Promise<CloudData | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from(TABLE)
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data?.data) return null;
  return data.data as CloudData;
}

export async function saveCloudData(userId: string, payload: CloudData): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  await sb.from(TABLE).upsert(
    { user_id: userId, data: payload, updated_at: new Date().toISOString() },
    { onConflict: "user_id" }
  );
}
