import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlurrColors, Spacing } from '@/constants/theme';

interface ScreenContainerProps {
  children: ReactNode;
  backgroundColor?: string;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  keyboardAvoiding?: boolean;
}

export function ScreenContainer({
  children,
  backgroundColor = FlurrColors.cream,
  padding = Spacing.lg,
  style,
  keyboardAvoiding = true,
}: ScreenContainerProps) {
  const content = (
    <SafeAreaView style={[styles.container, { backgroundColor }, style]}>
      <View style={[styles.content, { padding }]}>{children}</View>
    </SafeAreaView>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
