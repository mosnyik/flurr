import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { ProgressHeader } from '@/components/layout/progress-header';
import { EraSlider } from '@/components/ui/era-slider';
import { Typography, Spacing } from '@/constants/theme';
import { useUserStore, Era } from '@/store';

export default function Step5Screen() {
  const router = useRouter();
  const { era, setEra } = useUserStore();

  const handleContinue = () => {
    router.push('/(auth)/profile-builder/step-6');
  };

  return (
    <ScreenContainer>
      <ProgressHeader currentStep={3} totalSteps={3} />

      <View style={styles.content}>
        <Text style={styles.title}>whats ur era?</Text>

        <EraSlider value={era} onValueChange={(v) => setEra(v as Era)} />
      </View>

      <ScreenFooter
        primaryLabel="let's go!"
        onPrimaryPress={handleContinue}
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
});
