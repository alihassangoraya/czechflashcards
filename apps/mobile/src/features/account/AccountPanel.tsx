import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MaterialIcons from "../../components/MaterialIcons";
import {
  getFriendCode,
  loadFriendActivity,
  respondToFriendRequest,
  sendFriendRequest,
  type FriendRequest,
  type FriendStreak
} from "../../sync";
import { createSupabaseClient } from "../../sync";
import { colors, radius, size, spacing, typography } from "../../theme/design";

export type AccountStudySummary = {
  deckTotal: number;
  studiedCount: number;
  masteredCount: number;
  learningCount: number;
  dueCount: number;
  customCount: number;
  savedCount: number;
  examLevel: string;
  syncStatus: string;
};

export function AccountPanel({ configured, supabase, accountEmail, studySummary, busy, onAuthenticate, onSignOut }: {
  configured: boolean;
  supabase: ReturnType<typeof createSupabaseClient>;
  accountEmail: string | null;
  studySummary: AccountStudySummary;
  busy: boolean;
  onAuthenticate: (mode: "sign-in" | "sign-up", email: string, password: string, displayName: string) => Promise<string | null>;
  onSignOut: () => Promise<string | null>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [friendCode, setFriendCode] = useState("");
  const [myFriendCode, setMyFriendCode] = useState<string | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<FriendStreak[]>([]);
  const [message, setMessage] = useState("");
  const submit = async (mode: "sign-in" | "sign-up") => {
    if (!email.trim() || !password) {
      setMessage("Enter your email and password.");
      return;
    }
    const error = await onAuthenticate(mode, email, password, displayName);
    setMessage(error || (mode === "sign-up" ? "Account created. Check email confirmation if your project requires it." : "Signed in and syncing this device."));
  };
  const refreshFriends = async () => {
    const activity = await loadFriendActivity(supabase);
    setFriendRequests(activity.requests);
    setFriends(activity.friends);
  };
  useEffect(() => {
    if (!accountEmail) return;
    void getFriendCode(supabase).then(setMyFriendCode);
    void refreshFriends();
  }, [accountEmail, supabase]);
  if (!configured) return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={accountEmail} />
      <Text style={styles.muted}>This build has no Supabase URL or anonymous key. Offline study remains available.</Text>
    </View>
  );
  if (accountEmail) return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={accountEmail} />
      <Text style={styles.rowTitle}>{accountEmail}</Text>
      <Text style={styles.muted}>Your offline reviews, custom words, corrections, settings, and starred words are queued for this account.</Text>
      <View style={styles.friendPanel}>
        <Text style={styles.fieldLabel}>Friend code</Text>
        <Text style={styles.friendCode}>{myFriendCode || "Preparing..."}</Text>
        <TextInput style={styles.input} value={friendCode} onChangeText={setFriendCode} autoCapitalize="none" placeholder="Enter a friend's code" placeholderTextColor={colors.textMuted} />
        <Pressable style={styles.secondaryAction} onPress={async () => {
          setMessage((await sendFriendRequest(supabase, friendCode)) || "Friend request sent.");
          setFriendCode("");
          await refreshFriends();
        }}><Text style={styles.secondaryActionText}>Send friend request</Text></Pressable>
        {friendRequests.map((request) => (
          <View key={request.id} style={styles.friendRow}>
            <Text style={styles.muted}>{request.display_name || request.friend_code} wants to connect.</Text>
            <View style={styles.friendActions}>
              <Pressable style={styles.smallAction} onPress={async () => { setMessage((await respondToFriendRequest(supabase, request.id, true)) || "Friend added."); await refreshFriends(); }}><Text style={styles.secondaryActionText}>Accept</Text></Pressable>
              <Pressable style={styles.smallAction} onPress={async () => { setMessage((await respondToFriendRequest(supabase, request.id, false)) || "Request declined."); await refreshFriends(); }}><Text style={styles.secondaryActionText}>Decline</Text></Pressable>
            </View>
          </View>
        ))}
        {friends.map((friend) => <Text key={friend.friend_code} style={styles.muted}>{friend.display_name || friend.friend_code}: {friend.current_streak ?? 0}-day streak</Text>)}
      </View>
      {Boolean(message) && <Text style={styles.formError}>{message}</Text>}
      <Pressable disabled={busy} style={[styles.dangerButton, busy && styles.disabledButton]} onPress={async () => setMessage((await onSignOut()) || "Signed out. Your local study data remains on this device.")}><Text style={styles.dangerButtonText}>Sign out</Text></Pressable>
    </View>
  );
  return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={accountEmail} />
      <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} placeholder="Display name (for friends, optional)" placeholderTextColor={colors.textMuted} />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="Email" placeholderTextColor={colors.textMuted} />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" placeholderTextColor={colors.textMuted} />
      {Boolean(message) && <Text style={styles.formError}>{message}</Text>}
      <Pressable disabled={busy} style={[styles.primaryButton, busy && styles.disabledButton]} onPress={() => void submit("sign-in")}><Text style={styles.primaryButtonText}>Sign in</Text></Pressable>
      <Pressable disabled={busy} style={[styles.secondaryAction, busy && styles.disabledButton]} onPress={() => void submit("sign-up")}><Text style={styles.secondaryActionText}>Create account</Text></Pressable>
    </View>
  );
}

function AccountStudyPanel({ summary, accountEmail }: { summary: AccountStudySummary; accountEmail: string | null }) {
  const progress = summary.deckTotal ? summary.masteredCount / summary.deckTotal : 0;
  const badges = [
    { icon: "trending-up" as const, title: "First Step", label: "Study 1 card", unlocked: summary.studiedCount >= 1 },
    { icon: "star" as const, title: "Starred List", label: "Star 5 cards", unlocked: summary.savedCount >= 5 },
    { icon: "check-circle" as const, title: "Due Clear", label: "No due cards", unlocked: summary.deckTotal > 0 && summary.dueCount === 0 },
    { icon: "star" as const, title: "Mastery", label: "Master 10 cards", unlocked: summary.masteredCount >= 10 }
  ];

  return (
    <View style={styles.accountStudyPanel}>
      <View style={styles.accountProfileRow}>
        <View style={styles.accountAvatar}>
          <Text style={styles.accountAvatarText}>Č</Text>
        </View>
        <View style={styles.accountProfileCopy}>
          <Text style={styles.accountProfileName}>{accountEmail ? "Aktivní Student" : "Guest Student"}</Text>
          <Text style={styles.accountProfileMeta}>{summary.studiedCount} studied · {summary.customCount} custom · {summary.savedCount} starred</Text>
        </View>
        <Text style={styles.accountRankPill}>{summary.examLevel} NOVICE</Text>
      </View>

      <View style={styles.accountProgressHeader}>
        <Text style={styles.accountSectionTitle}>Learning Progress</Text>
        <Text style={styles.accountSectionMeta}>{summary.masteredCount} mastered</Text>
      </View>
      <View style={styles.accountProgressTrack}>
        <View style={[styles.accountProgressFill, { width: `${Math.max(3, Math.min(100, progress * 100))}%` }]} />
      </View>
      <View style={styles.accountStatsRow}>
        <AccountStat count={summary.deckTotal} label="Total" color={colors.bohemianBlue} />
        <AccountStat count={summary.masteredCount} label="Mastered" color={colors.success} />
        <AccountStat count={summary.learningCount} label="Learning" color={colors.bohemianGold} />
        <AccountStat count={summary.dueCount} label="Due" color={colors.bohemianRed} />
      </View>

      <Text style={styles.accountBadgeTitle}>Milestones</Text>
      <View style={styles.accountBadges}>
        {badges.map((badge) => (
          <View key={badge.title} style={styles.accountBadgeItem}>
            <View style={[styles.accountBadgeIcon, !badge.unlocked && styles.accountBadgeLocked]}>
              <MaterialIcons name={badge.icon} size={size.iconSmall} color={badge.unlocked ? colors.bohemianGold : colors.textMuted} />
            </View>
            <Text style={[styles.accountBadgeName, !badge.unlocked && styles.accountLockedText]} numberOfLines={1}>{badge.title}</Text>
            <Text style={styles.accountBadgeLabel} numberOfLines={2}>{badge.label}</Text>
          </View>
        ))}
      </View>
      {!accountEmail && <Text style={styles.muted}>Progress is saved on this device · {summary.syncStatus}</Text>}
    </View>
  );
}

function AccountStat({ count, label, color }: { count: number; label: string; color: string }) {
  return (
    <View style={styles.accountStat}>
      <Text style={[styles.accountStatCount, { color }]}>{count}</Text>
      <Text style={styles.accountStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm },
  rowTitle: { color: colors.textStrong, fontWeight: typography.weightSemibold, fontSize: typography.bodyLarge },
  fieldLabel: { color: colors.textMuted, fontSize: typography.label, fontWeight: typography.weightMedium, textTransform: "uppercase", marginTop: spacing.sm },
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, color: colors.textStrong, padding: spacing.xlPlus, fontSize: typography.bodyLarge },
  formError: { color: colors.dangerStrong, fontWeight: typography.weightBold },
  accountStudyPanel: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  accountProfileRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  accountAvatar: { width: size.headerAction, height: size.headerAction, borderRadius: radius.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft },
  accountAvatarText: { color: colors.primaryDeep, fontSize: size.icon, fontWeight: typography.weightSemibold },
  accountProfileCopy: { flex: 1, minWidth: 0, gap: spacing.xxs },
  accountProfileName: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  accountProfileMeta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular },
  accountRankPill: { overflow: "hidden", borderRadius: radius.md, backgroundColor: colors.mintSoft, color: colors.success, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, fontSize: typography.micro, fontWeight: typography.weightSemibold },
  accountProgressHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg },
  accountSectionTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  accountSectionMeta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  accountProgressTrack: { height: spacing.lg, overflow: "hidden", borderRadius: spacing.sm, backgroundColor: colors.progressTrack },
  accountProgressFill: { height: "100%", borderRadius: spacing.sm, backgroundColor: colors.success },
  accountStatsRow: { flexDirection: "row", justifyContent: "space-between", gap: spacing.md },
  accountStat: { flex: 1, alignItems: "center", gap: spacing.xxs },
  accountStatCount: { fontSize: typography.bodyLarge, fontWeight: typography.weightBold },
  accountStatLabel: { color: colors.textMuted, fontSize: typography.micro, fontWeight: typography.weightMedium },
  accountBadgeTitle: { color: colors.primaryDeep, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  accountBadges: { flexDirection: "row", gap: spacing.md },
  accountBadgeItem: { flex: 1, alignItems: "center", gap: spacing.xxs },
  accountBadgeIcon: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.goldSoft },
  accountBadgeLocked: { backgroundColor: colors.surfaceMuted },
  accountBadgeName: { color: colors.textStrong, fontSize: typography.micro, fontWeight: typography.weightSemibold, textAlign: "center" },
  accountBadgeLabel: { color: colors.textMuted, fontSize: typography.micro, lineHeight: typography.bodySmall, textAlign: "center" },
  accountLockedText: { color: colors.textMuted },
  primaryButton: { alignItems: "center", backgroundColor: colors.primaryDeep, borderRadius: radius.md, padding: spacing.xlPlus },
  primaryButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  secondaryAction: { alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lgPlus, paddingHorizontal: spacing.xlPlus, backgroundColor: colors.surface },
  secondaryActionText: { color: colors.action, fontWeight: typography.weightSemibold },
  dangerButton: { alignItems: "center", backgroundColor: colors.dangerStrong, borderRadius: radius.md, padding: spacing.xlPlus },
  dangerButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  disabledButton: { opacity: 0.45 },
  friendPanel: { gap: spacing.lg, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xlPlus },
  friendCode: { color: colors.textDeep, fontSize: size.iconMedium, fontWeight: typography.weightBold, letterSpacing: 1.5 },
  friendRow: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.surfaceMuted, paddingTop: spacing.lgPlus },
  friendActions: { flexDirection: "row", gap: spacing.lg },
  smallAction: { flex: 1, alignItems: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lg, backgroundColor: colors.surface }
});
