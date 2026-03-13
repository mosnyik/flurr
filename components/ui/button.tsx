import { ReactNode, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  Animated,
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
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
    >
      <Animated.View
        style={[
          styles.base,
          styles[variant],
          isDisabled && styles.disabled,
          { transform: [{ scale: scaleAnim }] },
          style,
        ]}
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
      </Animated.View>
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
