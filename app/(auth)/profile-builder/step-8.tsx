import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { ProgressHeader } from '@/components/layout/progress-header';
import { Typography, Spacing, FlurrColors } from '@/constants/theme';

export default function Step8Screen() {
  const router = useRouter();

  const handleComplete = () => {
    // Navigate to main app after completing profile
    router.replace('/(main)' as any);
  };

  return (
    <ScreenContainer>
      <ProgressHeader currentStep={8} totalSteps={8} />

      <View style={styles.content}>
        <Text style={styles.title}>you're all set!</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Your profile is ready. Let's find your match!
          </Text>
        </View>
      </View>

      <ScreenFooter
        primaryLabel="let's go"
        onPrimaryPress={handleComplete}
        showBackButton={false}
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
    color: FlurrColors.gray,
    textAlign: 'center',
  },
});
