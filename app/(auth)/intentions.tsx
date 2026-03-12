import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { SelectionCard } from '@/components/ui/selection-card';
import { Typography, Spacing } from '@/constants/theme';
import { useUserStore, Intention } from '@/store';

export default function IntentionsScreen() {
  const router = useRouter();
  const { intention, setIntention } = useUserStore();

  const handleContinue = () => {
    if (intention) {
      router.push('/(auth)/verify');
    }
  };

  const handleSelect = (value: Intention) => {
    setIntention(value);
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>what are your intentions?</Text>

        <View style={styles.options}>
          <SelectionCard
            label="Matchmaking"
            selected={intention === 'matchmaking'}
            showCheckmark={false}
            onPress={() => handleSelect('matchmaking')}
            style={styles.card}
          />
          <SelectionCard
            label="I am an organizer"
            selected={intention === 'organizer'}
            showCheckmark={false}
            onPress={() => handleSelect('organizer')}
            style={styles.card}
          />
        </View>
      </View>

      <ScreenFooter
        primaryLabel="continue"
        onPrimaryPress={handleContinue}
        primaryDisabled={!intention}
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
    ...Typography.titleLarge,
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  options: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  card: {
    flex: 1,
  },
});
