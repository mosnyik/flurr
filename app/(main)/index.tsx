import { useMemo, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MatchCard } from '@/components/ui/match-card';
import { MatchCardSkeleton } from '@/components/ui/match-card-skeleton';
import { FlurrColors, Spacing, CustomFonts, Typography } from '@/constants/theme';
import { useUserStore, getMatches } from '@/store';
import { useRealUsers } from '@/lib/useRealUsers';

export default function HomeScreen() {
  const user = useUserStore();
  const { users: realUsers, loading, refresh } = useRealUsers(user.name);
  const [refreshing, setRefreshing] = useState(false);

  const matches = useMemo(() => {
    return getMatches(user, realUsers);
  }, [user.intention, user.matchPreferences, user.era, realUsers]);

  async function handleRefresh() {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={24} color={FlurrColors.gray} />
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={FlurrColors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={FlurrColors.coral}
            colors={[FlurrColors.coral]}
          />
        }
      >
        {loading && (
          <ActivityIndicator size="small" color={FlurrColors.coral} style={styles.loader} />
        )}
        <Text style={styles.greeting}>
          hey {user.name || 'there'}, looking to{'\n'}meet ur twin flame?
        </Text>

        <View style={styles.matchList}>
          {loading ? (
            [0, 1, 2].map((i) => <MatchCardSkeleton key={i} index={i} />)
          ) : matches.length > 0 ? (
            matches.map((match, index) => (
              <MatchCard
                key={match.user.id}
                name={match.user.name}
                pronouns={match.user.pronouns}
                interests={match.user.traits}
                compatibility={match.compatibility}
                imageUrl={match.user.imageUrl}
                index={index}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No matches yet</Text>
              <Text style={styles.emptyText}>
                We haven't got a match for you right now, check back later
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FlurrColors.cream,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: FlurrColors.chipBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  loader: {
    marginBottom: Spacing.sm,
    alignSelf: 'flex-start',
  },
  greeting: {
    fontFamily: CustomFonts.benguiatBoldItalic,
    fontSize: 28,
    color: FlurrColors.black,
    lineHeight: 36,
    marginBottom: Spacing.xl,
  },
  matchList: {
    paddingBottom: Spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyTitle: {
    ...Typography.titleMedium,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    ...Typography.bodyMedium,
    color: FlurrColors.gray,
    textAlign: 'center',
  },
});
