import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { ProgressHeader } from '@/components/layout/progress-header';
import { SelectionCard } from '@/components/ui/selection-card';
import { Typography, Spacing } from '@/constants/theme';
import { useUserStore, MatchPreference } from '@/store';

const OPTIONS: { id: MatchPreference; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'romantic-partner', label: 'Romantic partner', icon: 'heart-outline' },
  { id: 'open-to-exploring', label: 'Open to exploring', icon: 'chatbubble-outline' },
  { id: 'relationship', label: 'Relationship', icon: 'people-outline' },
  { id: 'someone-to-go-out-with', label: 'Someone to go out w/', icon: 'wine-outline' },
  { id: 'a-good-time', label: 'A good time', icon: 'happy-outline' },
  { id: 'new-bestie', label: 'A new bestie', icon: 'person-add-outline' },
];

export default function Step4Screen() {
  const router = useRouter();
  const { matchPreferences, setMatchPreferences } = useUserStore();

  const toggleSelection = (id: MatchPreference) => {
    if (matchPreferences.includes(id)) {
      setMatchPreferences(matchPreferences.filter((s) => s !== id));
    } else {
      setMatchPreferences([...matchPreferences, id]);
    }
  };

  return (
    <ScreenContainer keyboardAvoiding={false}>
      <ProgressHeader currentStep={2} totalSteps={3} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          what's missing rn that ur hoping to get from a match?
        </Text>

        <View style={styles.grid}>
          {OPTIONS.map((option) => (
            <SelectionCard
              key={option.id}
              label={option.label}
              iconName={option.icon}
              selected={matchPreferences.includes(option.id)}
              onPress={() => toggleSelection(option.id)}
              style={styles.card}
            />
          ))}
        </View>
      </ScrollView>

      <ScreenFooter
        primaryLabel="continue"
        onPrimaryPress={() => router.push('/(auth)/profile-builder/step-5')}
        primaryDisabled={matchPreferences.length === 0}
        onBackPress={() => router.back()}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    ...Typography.titleMedium,
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  card: {
    width: '47%',
  },
});
