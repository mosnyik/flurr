import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { ProgressHeader } from '@/components/layout/progress-header';
import { SelectionCard } from '@/components/ui/selection-card';
import { Typography, Spacing, FlurrColors } from '@/constants/theme';
import { useUserStore, MatchPreference } from '@/store';

const OPTIONS: { id: MatchPreference; label: string; icon?: keyof typeof Ionicons.glyphMap; customIcon?: React.ReactNode }[] = [
  { id: 'romantic-partner', label: 'Romantic partner', icon: 'heart-outline' },
  {
    id: 'open-to-exploring',
    label: 'Open to exploring',
    customIcon: <Ionicons name="leaf-outline" size={24} color={FlurrColors.black} style={{ transform: [{ scaleX: -1 }] }} />
  },
  { id: 'relationship', label: 'Relationship', icon: 'lock-closed-outline' },
  { id: 'someone-to-go-out-with', label: 'Someone to go out w/', icon: 'wine-outline' },
  {
    id: 'a-good-time',
    label: 'A good time',
    customIcon: <MaterialCommunityIcons name="emoticon-kiss-outline" size={24} color={FlurrColors.black} />
  },
  { id: 'new-bestie', label: 'A new bestie', icon: 'people-outline' },
];

export default function Step4Screen() {
  const router = useRouter();
  const { intent, setIntent } = useUserStore();

  const toggleSelection = (id: MatchPreference) => {
    if (intent.includes(id)) {
      setIntent(intent.filter((s) => s !== id));
    } else {
      setIntent([...intent, id]);
    }
  };

  return (
    <ScreenContainer keyboardAvoiding={false}>
      <ProgressHeader />

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
              icon={option.customIcon}
              selected={intent.includes(option.id)}
              onPress={() => toggleSelection(option.id)}
              style={styles.card}
            />
          ))}
        </View>
      </ScrollView>

      <ScreenFooter
        primaryLabel="continue"
        onPrimaryPress={() => router.push('/(auth)/profile-builder/step-5')}
        primaryDisabled={intent.length === 0}
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
