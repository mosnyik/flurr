import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FlurrColors, Typography, Spacing } from '@/constants/theme';

export default function ChatsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
      </View>

      <View style={styles.content}>
        <Ionicons name="chatbubbles-outline" size={64} color={FlurrColors.lightGray} />
        <Text style={styles.emptyText}>No chats yet</Text>
        <Text style={styles.emptySubtext}>
          When you match with someone, your conversations will appear here.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FlurrColors.cream,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  title: {
    ...Typography.titleLarge,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyText: {
    ...Typography.bodyLarge,
    fontWeight: '600',
    marginTop: Spacing.lg,
    color: FlurrColors.black,
  },
  emptySubtext: {
    ...Typography.bodyMedium,
    color: FlurrColors.gray,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
