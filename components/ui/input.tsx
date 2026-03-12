import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { FlurrColors, BorderRadius, Typography, Spacing, Shadows } from '@/constants/theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label,
  error,
  containerStyle,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={FlurrColors.lightGray}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.label,
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    backgroundColor: FlurrColors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Shadows.card,
  },
  inputFocused: {
    borderColor: FlurrColors.black,
  },
  inputError: {
    borderColor: FlurrColors.coral,
  },
  input: {
    ...Typography.bodyMedium,
    height: 56,
    paddingHorizontal: Spacing.md,
    color: FlurrColors.black,
  },
  errorText: {
    ...Typography.bodySmall,
    color: FlurrColors.coral,
    marginTop: Spacing.xs,
  },
});
