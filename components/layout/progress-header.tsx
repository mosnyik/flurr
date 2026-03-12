import { StyleSheet, View, Text } from 'react-native';
import { FlurrColors, Spacing, Typography } from '@/constants/theme';

interface ProgressHeaderProps {
  title?: string;
  currentStep: number;
  totalSteps: number;
}

export function ProgressHeader({
  title = 'Profile Builder',
  currentStep,
  totalSteps,
}: ProgressHeaderProps) {
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
