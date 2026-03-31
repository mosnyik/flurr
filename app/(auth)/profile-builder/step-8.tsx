import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { ProgressHeader } from '@/components/layout/progress-header';
import { ArchetypeCard } from '@/components/ui/archetype-card';
import { Typography, Spacing } from '@/constants/theme';
import { useUserStore, Archetype } from '@/store';

const ARCHETYPES: { id: Archetype; icon: string; title: string; description: string }[] = [
  { id: 'nova', icon: '☀', title: 'the steady one', description: 'soft touch, deep care — here for safe love and slow burn.' },
  { id: 'blaze', icon: '✦', title: 'the party girl', description: 'I flirt with the night and find god on the dance floor.' },
  { id: 'jade', icon: '◇', title: 'the hookup romantic', description: 'I want the spark and the story — both can exist.' },
  { id: 'luna', icon: '◑', title: 'the homebody dreamer', description: 'give me candles, playlists, and slow conversations.' },
  { id: 'rio', icon: '◎', title: 'the wild heart', description: 'I chase the feeling — spontaneous, loud, unapologetically here.' },
  { id: 'sage', icon: '△', title: 'the wise one', description: 'I see people clearly and love them anyway.' },
  { id: 'leo', icon: '☆', title: 'the connector', description: 'I bring the group together and make sure everyone eats.' },
  { id: 'sol', icon: '◆', title: 'the lowkey cool', description: 'quiet confidence — I\'m the calm in the corner.' },
  { id: 'zen', icon: '∞', title: 'the curious wanderer', description: 'I follow my gut, not a plan — people are my adventure.' },
  { id: 'indigo', icon: '◈', title: 'the reformed romantic', description: 'once hopeless, now honest — still believe in real connection.' },
];

export default function Step8Screen() {
  const router = useRouter();
  const { archetypes, setArchetypes, completeOnboarding } = useUserStore();

  const toggle = (id: Archetype) => {
    if (archetypes.includes(id)) {
      setArchetypes(archetypes.filter((a) => a !== id));
    } else {
      setArchetypes([...archetypes, id]);
    }
  };

  const handleContinue = () => {
    completeOnboarding();
    router.replace('/(main)');
  };

  return (
    <ScreenContainer keyboardAvoiding={false}>
      <ProgressHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>which vibe(s) best describe you rn?</Text>
        <Text style={styles.subtitle}>Archetype-form</Text>

        <View style={styles.grid}>
          {ARCHETYPES.map((a) => (
            <ArchetypeCard
              key={a.id}
              name={a.id}
              icon={a.icon}
              title={a.title}
              description={a.description}
              selected={archetypes.includes(a.id)}
              onPress={() => toggle(a.id)}
            />
          ))}
        </View>
      </ScrollView>

      <ScreenFooter
        primaryLabel="continue"
        onPrimaryPress={handleContinue}
        primaryDisabled={archetypes.length === 0}
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
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.bodyMedium,
    fontStyle: 'italic',
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
});
