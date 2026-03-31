import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { ProgressHeader } from '@/components/layout/progress-header';
import { Input } from '@/components/ui/input';
import { ChipInput } from '@/components/ui/chip-input';
import { Typography, Spacing } from '@/constants/theme';
import { useUserStore } from '@/store';

export default function Step1Screen() {
  const router = useRouter();
  const { name, pronouns, setName, setPronouns } = useUserStore();

  const handleContinue = () => {
    router.push('/(auth)/profile-builder/step-4');
  };

  const handleAddPronoun = (pronoun: string) => {
    setPronouns([...pronouns, pronoun]);
  };

  const handleRemovePronoun = (index: number) => {
    setPronouns(pronouns.filter((_, i) => i !== index));
  };

  const isValid = name.trim().length > 0 && pronouns.length > 0;

  return (
    <ScreenContainer>
      <ProgressHeader currentStep={1} totalSteps={3} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>what's ur name & pronouns</Text>
        <Text style={styles.subtitle}>this is how we'll intro u to ur match.</Text>

        <Input
          label="First name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          autoCapitalize="words"
        />

        <ChipInput
          label="Pronouns"
          chips={pronouns}
          onAddChip={handleAddPronoun}
          onRemoveChip={handleRemovePronoun}
          placeholder="e.g. they, she, he"
          maxChips={3}
          minChipLength={2}
          maxChipLength={4}
        />
        <Text style={styles.hint}>type a pronoun then press space, comma, or enter to add it</Text>
      </ScrollView>

      <ScreenFooter
        primaryLabel="continue"
        onPrimaryPress={handleContinue}
        primaryDisabled={!isValid}
        onBackPress={() => router.back()}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  title: {
    ...Typography.titleLarge,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodySmall,
    marginBottom: Spacing.xl,
  },
  hint: {
    ...Typography.bodySmall,
    marginTop: -Spacing.sm,
    opacity: 0.5,
  },
});
