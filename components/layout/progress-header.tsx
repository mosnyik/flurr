import { StyleSheet, View, Text } from 'react-native';
import { usePathname } from 'expo-router';
import { FlurrColors, Spacing, Typography } from '@/constants/theme';

const PROFILE_STEPS = ['step-1', 'step-4', 'step-5', 'step-6', 'step-7', 'step-8'];

interface ProgressHeaderProps {
  title?: string;
}

export function ProgressHeader({ title = 'Profile Builder' }: ProgressHeaderProps) {
  const pathname = usePathname();
  const stepName = pathname.split('/').pop() ?? '';
  const index = PROFILE_STEPS.indexOf(stepName);
  const currentStep = index === -1 ? 1 : index + 1;
  const totalSteps = PROFILE_STEPS.length;
  const progress = currentStep / totalSteps;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.stepText}>
          {currentStep}/{totalSteps}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.bodyMedium,
    fontWeight: '500',
  },
  stepText: {
    ...Typography.bodyMedium,
    color: FlurrColors.gray,
  },
  progressTrack: {
    height: 3,
    backgroundColor: FlurrColors.chipBackground,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: FlurrColors.coral,
    borderRadius: 2,
  },
});
