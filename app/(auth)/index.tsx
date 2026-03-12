import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { FlurrColors, Typography, Spacing, CustomFonts } from '@/constants/theme';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/welcome-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Text style={styles.brand}>FLURR</Text>
            <Text style={styles.taglinePrefix}>for the</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.tagline}>
              soft queers, shy bois, femmes who flirt with their eyes, etc.
            </Text>
            <Button variant="cream" onPress={() => router.push('/(auth)/intentions')}>
              Sign up
            </Button>
            <Button variant="ghost" onPress={() => router.push('/(auth)/verify')}>
              Coming back to see us? Login
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: FlurrColors.black,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  heroSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: height * 0.12,
  },
  brand: {
    fontFamily: CustomFonts.benguiatBold,
    color: FlurrColors.cream,
    fontSize: height * 0.12,
    textAlign: 'center',
  },
  taglinePrefix: {
    fontFamily: CustomFonts.benguiatBookItalic,
    fontSize: 28,
    color: FlurrColors.white,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  tagline: {
    ...Typography.bodyLarge,
    color: FlurrColors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  footer: {
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
});
