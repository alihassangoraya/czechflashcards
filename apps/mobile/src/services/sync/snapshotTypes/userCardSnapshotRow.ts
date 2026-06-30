export type UserCardSnapshotRow = {
  card_id: string;
  known_streak: number;
  again_count: number;
  due_at: string;
  seen: number | boolean;
};
