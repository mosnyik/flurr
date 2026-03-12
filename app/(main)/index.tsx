import { useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MatchCard } from '@/components/ui/match-card';
import { FlurrColors, Spacing, CustomFonts } from '@/constants/theme';
import { useUserStore, MOCK_USERS, getMatches } from '@/store';

export default function HomeScreen() {
  const user = useUserStore();

  const matches = useMemo(() => {
    return getMatches(user, MOCK_USERS);
  }, [user.intention, user.matchPreferences, user.era]);
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>
          hey {user.name || 'there'}, looking to{'\n'}meet ur twin flame?
        </Text>

        <View style={styles.matchList}>
          {matches.map((match) => (
            <MatchCard
              key={match.user.id}
              name={match.user.name}
              pronouns={match.user.pronouns}
              interests={match.user.traits}
              compatibility={match.compatibility}
              imageUrl={match.user.imageUrl}
            />
          ))}
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
});
