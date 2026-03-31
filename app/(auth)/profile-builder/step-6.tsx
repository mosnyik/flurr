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
  const { bipoc, setBipoc } = useUserStore();

  const handleContinue = () => {
    router.push('/(auth)/profile-builder/step-7');
  };

  return (
    <ScreenContainer>
      <ProgressHeader currentStep={3} totalSteps={3} />

      <View style={styles.content}>
        <Text style={styles.title}>do you identify as BIPOC?</Text>

        <View style={styles.options}>
          <SelectionCard
            label="Yes"
            selected={bipoc === true}
            compact
            onPress={() => setBipoc(true)}
            style={styles.card}
          />
          <SelectionCard
            label="No"
            selected={bipoc === false}
            compact
            onPress={() => setBipoc(false)}
            style={styles.card}
          />
        </View>
      </View>

      <ScreenFooter
        primaryLabel="let's go!"
        onPrimaryPress={handleContinue}
        primaryDisabled={bipoc === null}
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
    gap: Spacing.md,
  },
  card: {
    flex: 1,
  },
});
