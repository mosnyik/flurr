import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { ProgressHeader } from '@/components/layout/progress-header';
import { Typography, Spacing, FlurrColors } from '@/constants/theme';

export default function Step3Screen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <ProgressHeader currentStep={3} totalSteps={8} />

      <View style={styles.content}>
        <Text style={styles.title}>step 3</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Coming soon...</Text>
        </View>
      </View>

      <ScreenFooter
        primaryLabel="continue"
        onPrimaryPress={() => router.push('/(auth)/profile-builder/step-4')}
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
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...Typography.bodyLarge,
    color: FlurrColors.lightGray,
  },
});
