import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { ProgressHeader } from '@/components/layout/progress-header';
import { Chip } from '@/components/ui/chip';
import { Typography, Spacing } from '@/constants/theme';
import { useUserStore, Presentation } from '@/store';

const OPTIONS: Presentation[] = [
  'androgynous',
  'masc',
  'soft-masc',
  'gender-queer',
  'gender-fluid',
  'fairy',
  'soft femme',
  'femme',
  'other',
  'high femme queen',
  'tomboi',
  'butch',
];

export default function Step7Screen() {
  const router = useRouter();
  const { presentation, setPresentation, completeOnboarding } = useUserStore();

  const handleContinue = () => {
    completeOnboarding();
    router.replace('/(main)');
  };

  return (
    <ScreenContainer keyboardAvoiding={false}>
      <ProgressHeader currentStep={3} totalSteps={3} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>which presentation do you identify w/ the most rn?</Text>

        <View style={styles.options}>
          {OPTIONS.map((option) => (
            <Chip
              key={option}
              label={option}
              selected={presentation === option}
              large
              onPress={() => setPresentation(option)}
            />
          ))}
        </View>
      </ScrollView>

      <ScreenFooter
        primaryLabel="continue"
        onPrimaryPress={handleContinue}
        primaryDisabled={presentation === null}
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
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
});
