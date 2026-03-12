import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/layout/screen-container';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { OTPInput } from '@/components/ui/otp-input';
import { TextLink } from '@/components/ui/text-link';
import { FlurrColors, Typography, Spacing } from '@/constants/theme';

const COUNTDOWN_SECONDS = 10;

export default function VerifyScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (code.length === 4) {
      setIsLoading(true);
      // Simulate verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      router.push('/(auth)/profile-builder/step-1');
    }
  };

  const handleResendCode = useCallback(() => {
    // Handle resend logic
    setCode('');
    setCountdown(COUNTDOWN_SECONDS);
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>enter your code</Text>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Code number</Text>
          <OTPInput
            value={code}
            onChange={setCode}
            onComplete={handleVerify}
            length={4}
          />
        </View>

        {countdown > 0 ? (
          <Text style={styles.countdown}>Resend code in {countdown}s</Text>
        ) : (
          <TextLink variant="coral" onPress={handleResendCode}>
            Resend code
          </TextLink>
        )}
      </View>

      <ScreenFooter
        primaryLabel="Verify code"
        onPrimaryPress={handleVerify}
        primaryDisabled={code.length !== 4}
        primaryLoading={isLoading}
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
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  inputSection: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.label,
    marginBottom: Spacing.sm,
  },
  countdown: {
    ...Typography.bodyMedium,
    color: FlurrColors.gray,
  },
});
