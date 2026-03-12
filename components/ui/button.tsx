import { ReactNode } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { FlurrColors, BorderRadius, Typography, Spacing } from '@/constants/theme';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'cream' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'ghost' ? FlurrColors.white : FlurrColors.black}
        />
      ) : (
        <Text
          style={[
            styles.text,
            (variant === 'primary' || variant === 'ghost') ? styles.textPrimary : styles.textSecondary,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  primary: {
    backgroundColor: FlurrColors.black,
  },
  secondary: {
    backgroundColor: FlurrColors.white,
    borderWidth: 1,
    borderColor: FlurrColors.inputBorder,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: FlurrColors.black,
  },
  cream: {
    backgroundColor: '#F6F4EE',
  },
  ghost: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  disabled: {
    backgroundColor: FlurrColors.disabled,
    borderColor: FlurrColors.disabled,
  },
  text: {
    ...Typography.button,
  },
  textPrimary: {
    color: FlurrColors.white,
  },
  textSecondary: {
    color: FlurrColors.black,
  },
});
