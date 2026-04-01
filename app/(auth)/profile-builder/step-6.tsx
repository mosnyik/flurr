import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { ProgressHeader } from '@/components/layout/progress-header';
import { SelectionCard } from '@/components/ui/selection-card';
import { Typography, Spacing } from '@/constants/theme';
import { useUserStore } from '@/store';

export default function Step6Screen() {
  const router = useRouter();
  const { identity, setIdentity } = useUserStore();

  const handleContinue = () => {
    router.push('/(auth)/profile-builder/step-7');
  };

  return (
    <ScreenContainer>
      <ProgressHeader />

      <View style={styles.content}>
        <Text style={styles.title}>do you identify as BIPOC?</Text>

        <View style={styles.options}>
          <SelectionCard
            label="Yes"
            selected={identity === true}
            compact
            onPress={() => setIdentity(true)}
            style={styles.card}
          />
          <SelectionCard
            label="No"
            selected={identity === false}
            compact
            onPress={() => setIdentity(false)}
            style={styles.card}
          />
        </View>
      </View>

      <ScreenFooter
        primaryLabel="let's go!"
        onPrimaryPress={handleContinue}
        primaryDisabled={identity === null}
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
    marginBottom: Spacing.xl,
  },
  options: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignSelf: 'flex-start',
  },
  card: {
    paddingHorizontal: Spacing.xl,
  },
});
